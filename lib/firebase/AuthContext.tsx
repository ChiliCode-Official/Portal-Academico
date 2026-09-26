'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, googleProvider, db } from './config';
import { UserProfile } from './models';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  requestClasses: (classIds: string[]) => Promise<void>;
  isTeacher: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  authError: null,
  clearAuthError: () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  requestClasses: async () => {},
  isTeacher: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      unsubscribeProfile?.();
      unsubscribeProfile = undefined;
      setProfile(null);
      setLoading(true);
      if (!currentUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      // Validar dominio institucional obligatorio (@my.uvm.edu.mx) o correo autorizado de la maestra
      const userEmail = (currentUser.email || '').toLowerCase().trim();
      const isTeacherEmail =
        userEmail === 'lrodricg30@gmail.com' || userEmail === 'xochitl_zapatam@my.uvm.edu.mx';
      const isAllowedDomain = userEmail.endsWith('@my.uvm.edu.mx') || isTeacherEmail;

      if (!isAllowedDomain) {
        setAuthError(
          `Acceso denegado: El correo "${currentUser.email}" no pertenece al dominio institucional (@my.uvm.edu.mx). Por favor inicia sesión con tu cuenta UVM.`
        );
        await fbSignOut(auth);
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setAuthError(null);
      setUser(currentUser);

      // Check / subscribe to user profile in Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      const unsubProfile = onSnapshot(userDocRef, async (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data() as UserProfile);
        } else {
          const isProf = isTeacherEmail;

          const newProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || (isProf ? 'Prof. Xochitl M. Zapata M.' : 'Estudiante UVM'),
            photoURL: currentUser.photoURL,
            role: isProf ? 'teacher' : 'student',
            requestedClassIds: [],
            ...(isProf ? { enrollmentStatus: 'approved' as const } : {}),
            classIds: [],
            onboardingComplete: isProf,
            stampsBalance: 0,
            totalStampsEarned: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          try {
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          } catch (e) {
            console.error('No se pudo guardar el perfil:', e);
            setAuthError('No se pudo guardar tu cuenta en Firebase. Revisa la conexión o las reglas de acceso.');
          }
        }
        setLoading(false);
      }, (error) => {
        console.error('Firestore onSnapshot error:', error);
        setProfile(null);
        setLoading(false);
        setAuthError('No se pudo leer tu cuenta de Firebase. Revisa tu conexión y las reglas de Firestore.');
      });

      unsubscribeProfile = unsubProfile;
    });

    return () => { unsubscribe(); unsubscribeProfile?.(); };
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = (result.user.email || '').toLowerCase().trim();
      const isTeacherEmail =
        email === 'lrodricg30@gmail.com' || email === 'xochitl_zapatam@my.uvm.edu.mx';
      if (!email.endsWith('@my.uvm.edu.mx') && !isTeacherEmail) {
        setAuthError(
          `Acceso denegado: El correo "${result.user.email}" no pertenece al dominio oficial @my.uvm.edu.mx.`
        );
        await fbSignOut(auth);
        setUser(null);
        setProfile(null);
        return;
      }
    } catch (error: unknown) {
      console.error('Google Sign In Error:', error);
      const authFailure = error as { code?: string; message?: string };
      const code = authFailure?.code || '';
      if (code === 'auth/unauthorized-domain') {
        setAuthError(
          'Error de configuración de Firebase (auth/unauthorized-domain): Este dominio (ej. localhost) no está en la lista de dominios autorizados en la Consola de Firebase. Ve a Firebase Console -> Authentication -> Settings -> Authorized domains y añade "localhost".'
        );
      } else if (code === 'auth/popup-blocked') {
        setAuthError(
          'El navegador bloqueó la ventana emergente de Google. Por favor permite las ventanas emergentes (pop-ups) para este sitio.'
        );
      } else if (code === 'auth/cancelled-popup-request') {
        // user clicked again or popup was interrupted
      } else if (code === 'auth/popup-closed-by-user') {
        // user closed popup manually
      } else {
        setAuthError(
          `Error al iniciar sesión con Google (${code || 'desconocido'}): ${authFailure?.message || ''}`
        );
      }
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setProfile(null);
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  const requestClasses = async (classIds: string[]) => {
    if (!user || !profile || profile.onboardingComplete || profile.role !== 'student') return;
    await setDoc(doc(db, 'users', user.uid), {
      requestedClassIds: [...new Set(classIds)],
      enrollmentStatus: 'pending',
      onboardingComplete: true,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  };

  const userEmailLower = user?.email?.toLowerCase().trim();
  const isTeacher =
    (userEmailLower === 'lrodricg30@gmail.com' ||
      userEmailLower === 'xochitl_zapatam@my.uvm.edu.mx') ||
    profile?.role === 'teacher';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        authError,
        clearAuthError: () => setAuthError(null),
        signInWithGoogle,
        signOut,
        requestClasses,
        isTeacher,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, googleProvider, db } from './config';
import { UserProfile, UserRole } from './models';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserClass: (classId: string) => Promise<void>;
  toggleDevRole: () => Promise<void>; // Useful for testing teacher panel easily
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
  updateUserClass: async () => {},
  toggleDevRole: async () => {},
  isTeacher: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      // Validar dominio institucional obligatorio: @my.uvm.edu.mx
      const userEmail = (currentUser.email || '').toLowerCase().trim();
      const isAllowedDomain = userEmail.endsWith('@my.uvm.edu.mx');

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
          // Detect teacher if email includes xochitl or prof
          const isProf = userEmail.includes('xochitl') || userEmail.includes('prof') || userEmail.includes('docente');

          const newProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || 'Estudiante UVM',
            photoURL: currentUser.photoURL,
            role: isProf ? 'teacher' : 'student',
            selectedClassId: 'fisica-101-g1',
            stampsBalance: isProf ? 99 : 5, // starter stamps for testing
            totalStampsEarned: isProf ? 99 : 5,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          try {
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          } catch (e) {
            console.warn('Could not persist profile in Firestore yet, using fallback:', e);
            setProfile(newProfile);
          }
        }
        setLoading(false);
      }, (error) => {
        console.warn('Firestore onSnapshot error:', error);
        // Fallback profile if offline
        const isProf = userEmail.includes('xochitl') || userEmail.includes('prof');
        setProfile({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || 'Estudiante UVM',
          photoURL: currentUser.photoURL,
          role: isProf ? 'teacher' : 'student',
          selectedClassId: 'fisica-101-g1',
          stampsBalance: 5,
          totalStampsEarned: 5,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        setLoading(false);
      });

      return () => unsubProfile();
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = (result.user.email || '').toLowerCase().trim();
      if (!email.endsWith('@my.uvm.edu.mx')) {
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
      throw error;
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

  const updateUserClass = async (classId: string) => {
    if (!user || !profile) return;
    const updated = { ...profile, selectedClassId: classId, updatedAt: new Date().toISOString() };
    setProfile(updated);
    try {
      await setDoc(doc(db, 'users', user.uid), { selectedClassId: classId, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.warn('Error saving selected class to Firestore:', e);
    }
  };

  const toggleDevRole = async () => {
    if (!user || !profile) return;
    const newRole: UserRole = profile.role === 'teacher' ? 'student' : 'teacher';
    const updated = { ...profile, role: newRole, updatedAt: new Date().toISOString() };
    setProfile(updated);
    try {
      await setDoc(doc(db, 'users', user.uid), { role: newRole, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.warn('Error updating role:', e);
    }
  };

  const isTeacher = profile?.role === 'teacher';

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
        updateUserClass,
        toggleDevRole,
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

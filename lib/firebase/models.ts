export type UserRole = 'student' | 'teacher';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  selectedClassId?: string; // Class ID currently enrolled in
  requestedClassIds?: string[];
  classIds?: string[];
  onboardingComplete?: boolean;
  stampsBalance: number;    // Available stamps to spend in teacher shop
  totalStampsEarned: number;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicClass {
  id: string;
  name: string;
  code: string;
  group: string;
  schedule: string;
  classroom: string;
  description?: string;
  teacherEmail: string;
  active: boolean;
}

export interface StampType {
  id: string;
  name: string;
  description: string;
  value: number; // usually 1, 2, etc.
  category: 'participacion' | 'laboratorio' | 'tarea' | 'puntualidad' | 'excelencia';
  icon: string;
  color: string;
}

export interface StampRedemptionCode {
  id: string;
  code: string;         // Unique secret token contained in QR
  stampTypeId: string;
  stampName: string;
  stampValue: number;
  classId: string;
  className: string;
  teacherUid: string;
  teacherEmail: string;
  createdAt: number;
  expiresAt: number;     // Expiration timestamp in ms
  maxClaims?: number;    // Unlimited or finite
  claimedCount: number;
  claimedBy: string[];   // Array of student UIDs who scanned it
  active: boolean;
}

export interface StampClaimHistory {
  id: string;
  studentUid: string;
  studentName: string;
  studentEmail: string;
  classId: string;
  className: string;
  stampTypeId: string;
  stampName: string;
  stampValue: number;
  claimedAt: string;
  qrCodeId: string;
}

export interface ShopPurchase {
  id: string;
  studentUid: string;
  studentName: string;
  studentEmail: string;
  itemId: string;
  itemTitle: string;
  costStamps: number;
  purchasedAt: string;
  status: 'canjeado' | 'utilizado';
}

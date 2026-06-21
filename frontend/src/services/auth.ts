import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../config/firebase";

const ADMIN_EMAILS = import.meta.env.VITE_ADMIN_EMAILS?.split(",").map((e: string) => e.trim()) || [];

export const isAdminEmail = (email: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
};

export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  if (!isAdminEmail(userCredential.user.email)) {
    await signOut(auth);
    throw new Error("Unauthorized: Not an admin user");
  }
  return userCredential.user;
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  if (!isAdminEmail(userCredential.user.email)) {
    await signOut(auth);
    throw new Error("Unauthorized: Not an admin user");
  }
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const getAuthToken = async (): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");
  return await user.getIdToken();
};

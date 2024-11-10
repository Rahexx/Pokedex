'use server';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { cookies } from 'next/headers';

export async function signUpUser(email: string, password: string) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const idToken = await user.getIdToken();
    const cookieStore = await cookies();

    cookieStore.set('token', idToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return true;
  } catch (err) {
    console.error('Sign Up error:', err);
  }

  return false;
}

export const handleLogIn = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await user.getIdToken();

    const cookieStore = await cookies();
    cookieStore.set('token', idToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3,
    });

    return true;
  } catch (err) {
    console.error('Login error:', err);
  }

  return false;
};

export const handleLogOut = async () => {
  try {
    await signOut(auth);
    const cookieStore = await cookies();
    cookieStore.delete('token');

    return true;
  } catch (err) {
    console.error('Problem with loging out:', err);
  }

  return false;
};

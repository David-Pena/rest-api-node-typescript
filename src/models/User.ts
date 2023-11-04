import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDatabase } from '../core/useDatabase';
import { app } from '../core/firebase';

const database = useDatabase().useCollection('users');

const ErrorMessages: Record<string, string> = {
  'auth/user-not-found': 'User does not exist',
  'auth/wrong-password': 'Wrong password',
  'auth/invalid-login-credentials': 'Invalid credentials'
};

export class User {
  public async login (email: string, password: string) {
    try {
      const auth = getAuth(app);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();

      const snapshot = await database.findById(user.uid);
      return { user: snapshot, token };
    } catch (error: any) {
      const { code } = error;
      throw ErrorMessages[code];
    }
  }
}

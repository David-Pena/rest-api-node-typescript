import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDatabase } from '../core/useDatabase';
import { type User as IUser } from '../types/User';
import { app, sdkAdmin } from '../core/firebase';
import { v4 as uuidv4 } from 'uuid';

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

  public async find () {
    try {
      const users = await database.find();
      return users;
    } catch (error: any) {
      throw error.toString();
    }
  }

  public async findOne (id: string) {
    try {
      const user = await database.findById(id);
      return user;
    } catch (error: any) {
      throw error.toString();
    }
  }

  public async create (data: IUser) {
    try {
      const uid = uuidv4();
      await sdkAdmin.auth().createUser({
        uid,
        email: data.email,
        password: data.password
      });

      delete data.password;
      await database.create(data, uid);
    } catch (error: any) {
      throw error.toString();
    }
  }

  public async update (id: string, data: Partial<IUser>) {
    try {
      console.log(id, data);
      await database.update(id, data);
    } catch (error: any) {
      throw error.toString();
    }
  }

  public async remove (id: string) {
    try {
      await database.update(id, { isActive: false });
      return true;
    } catch (error: any) {
      throw error.toString();
    }
  }
}

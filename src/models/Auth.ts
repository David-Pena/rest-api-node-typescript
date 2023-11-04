import { sdkAdmin } from '../core/firebase';

export class Auth {
  public async validateToken (token: string) {
    try {
      return await sdkAdmin.auth().verifyIdToken(token);
    } catch (error) {
      return false;
    }
  }
}

import { Request } from 'express';
import { User as IUser } from '../../interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      userInfo: IUser; // userInfo 타입 추가
      userId: number;
    }
  }
}

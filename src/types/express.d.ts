import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userInfo: { id: number }; // userInfo 타입 추가 
    }
  }
}

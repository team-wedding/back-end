import { StatusCodes } from "http-status-codes";
import * as userService from '../services/userService';
import { Request, Response, NextFunction, RequestHandler } from "express";
import { User as IUser } from '../interfaces/user.interface';

export const signup: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const userInfo = req.body;
  try{
    if(await userService.signup(userInfo)){
      res.status(201).json({message:'가입완료'});
      return;
    }
    res.status(StatusCodes.BAD_REQUEST).json({message:'중복된 이메일입니다.'});
    return;
  }catch(err){
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'});
    return;
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try{
    const tokens = await userService.login(email, password);
    console.log(tokens)
    if(tokens){
      res.header('Authorization', `Bearer ${tokens.accessToken}`);
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true, 
      });
      res.status(StatusCodes.OK).json({message:'로그인'});
      return;
    }
    res.status(StatusCodes.BAD_REQUEST).json({message:'로그인 실패'});
    return;
  }catch(err){
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'});
    return;
  }
}

export const logout: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try{
    const userInfo: IUser = req.userInfo;
    await userService.logout(userInfo)
    res.status(StatusCodes.OK).json({message:'로그아웃'});
    return;
  }catch(err){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'});
    return;
  }
}

export const updateAccessToken: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try{
    const userInfo = req.userInfo;
    const newAccessToken = await userService.updateAccessToken(userInfo)
    res.header('Authorization', `Bearer ${newAccessToken}`);
    res.status(StatusCodes.OK).json({message:'accessToken 재발행 완'});
    return;
  }catch(err){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'});
    return;
  }
}

export const myPage: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try{
    let userInfo:IUser = req.userInfo;
    userInfo = await userService.myPage(userInfo.email as string);
    res.status(StatusCodes.OK).json(userInfo);
    return;
  }catch(err){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'});
    return;
  }
}

export const changePassword: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try{
    const userInfo = req.userInfo;
    const {password, newPassword} = req.body;
    if(await userService.changePassword(userInfo.email as string, password, newPassword)){
      res.status(StatusCodes.OK).json({message:'비밀번호 변경완료'});
      return;
    }
    res.status(StatusCodes.BAD_REQUEST).json({message:'잘못된 요청입니다.'});
    return;
  }catch(err){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'});
    return;
  }
}

export const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try{
    const userInfo = req.userInfo;
    const {password} = req.body;
    if(await userService.deleteUser(userInfo.email as string, password)){
      res.status(StatusCodes.OK).json({message:'탈퇴 되었습니다.'});
      return;
    }
    res.status(StatusCodes.BAD_REQUEST).json({message: '잘못된 정보입니다.'});
    return;
  }catch(err){
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'});
    return;
  }
}
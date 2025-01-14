import { verifyToken, isMatchRefreshToken, localAuth, kakaoAuth } from '../utils/authUtil';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction, RequestHandler } from "express";
import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();

export const authToken: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const accessToken = req.headers.authorization?.split(' ')[1];
    if(!accessToken){
      res.status(StatusCodes.UNAUTHORIZED).json({message:'토큰값 없음.. 확인ㄱㄱ'});
      return;
    }
    let userInfo = await localAuth(accessToken);

    if(!userInfo){
      res.status(StatusCodes.UNAUTHORIZED).json({message:'유효하지 않은 토큰'});
      return;
    }

	  res.header('authorization', `Bearer ${accessToken}`); // 추가부분
    req.userInfo = userInfo
    req.userId = userInfo.id as number; // userId를 req.userId에 저장
    req.body.userId = userInfo.id;
    console.log('authToken req.body:', req.body);
    next()
  }catch(err){
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({messgae:'서버 에러'});
    return;
  }
}

export const kakaoAuthToken: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const kakaoToken = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_ID,
        redirectUri: process.env.REDIRECT_URI,
        code: req.query.code as string,
      })
    })
    if(!kakaoToken){
      res.status(StatusCodes.UNAUTHORIZED).json({message:'kakaoAuthToken Error : kakao에서 accessToken 안넘어옴;;'});
      return;
    }
    let userInfo = await kakaoAuth(kakaoToken);

    if(!userInfo){
      res.status(StatusCodes.UNAUTHORIZED).json({message:'kakaoAuthToken userInfo err'});
      return;
    }
    req.userInfo = userInfo
    next()
  }catch(err){
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({messgae:'kakaoAuthToken 서버 에러'});
    return;
  }
}

export const refreshToken: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    let refreshToken = req.headers.refresh as string;
    refreshToken = refreshToken.split(' ')[1];

    if(!await isMatchRefreshToken(refreshToken)){
      res.status(StatusCodes.FORBIDDEN).json({message:'다시 로그인하세요~'});
      return;
    }
    const userInfo = await verifyToken(refreshToken)
    req.userInfo = userInfo
    req.userId = userInfo.id as number; // userId를 req.userId에 저장
    next()
  }catch(err){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러 in refreshToken'});
    console.log(err);
    return;
  }
}
import crypto from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as tokenRepository from '../repositories/tokenRepository';
import { User as IUser } from '../interfaces/user.interface';
import axios from 'axios';

dotenv.config();

export const localAuth = async (token: string): Promise<IUser> => {
  try{
    const userInfo = await verifyToken(token)
    return userInfo
  }catch(err){
    throw new Error(`localAuth Err: ${(err as Error).message}`);
  }
}

export const kakaoAuth = async (token: any): Promise<IUser> => {
  try{
    const kakaoUserInfo: any = await axios({
      method : "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });
    const userInfo: IUser = {
      email: kakaoUserInfo.data.kakao_account.email,
      name: kakaoUserInfo.data.properties.nickname,
      password: kakaoUserInfo.data.id.toString(),
      provider: "kakao"
    }
    return userInfo
  }catch(err){
    throw new Error(`kakaoAuth Err: ${(err as Error).message}`);
  }
}

export const naverAuth = async (token: any): Promise<IUser> => {
  try{
    const naverUserInfo: any = await axios({
      method : "GET",
      url: "https://openapi.naver.com/v1/nid/me",
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });
    
    console.log(`naverUserInfo : ${JSON.stringify(naverUserInfo.data.response)}`);

    const userInfo: IUser = {
      email: naverUserInfo.data.response.email,
      name: naverUserInfo.data.response.name,
      password: naverUserInfo.data.response.id,
      provider: "naver"
    }
    return userInfo
  }catch(err){
    throw new Error(`kakaoAuth Err: ${(err as Error).message}`);
  }
}

export const createHashPassword = async (userInfo: IUser): Promise<Object> => {
  try{
    const salt = await createRandomSalt();
    const hashPassword = await passwordChangeToHash(userInfo.password as string, salt);
    userInfo.salt = salt;
    userInfo.hashPassword = hashPassword;
    return userInfo
  }catch(err){
    throw new Error(`makeHashPassword Err: ${(err as Error).message}`)
  }  
}

export const isMatchPassword = async (userInfo: IUser, password: string) : Promise<boolean> => {
  try{
    if(userInfo.hashPassword == await passwordChangeToHash(password, userInfo.salt as string)){
      return true
    }
    return false
  }catch(err){
    throw new Error(`isMatchPassword Err: ${(err as Error).message}`)
  }
}

export const createRandomSalt = async (): Promise<string> => {
  const salt = crypto.randomBytes(10).toString('base64');
  return salt
};


export const passwordChangeToHash = async (password: string, salt: string): Promise<string> => { 
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
  return hashPassword
};

export const createAccessToken = async(userInfo: IUser) : Promise<string> => {
  const secreyKey: string = process.env.TOKEN_SECRET_KEY || "";
  try{
    const accessToken = jwt.sign(
      {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email
      },
      secreyKey,
      { expiresIn: '1d' }
    );
    return accessToken;
  }catch(err){
    throw new Error(`createAccessToken Err: ${(err as Error).message}`)
  }
}

export const createRefreshToken = async(userInfo:IUser): Promise<string> => {
  const secreyKey: string = process.env.TOKEN_SECRET_KEY || "";
  try{
    const refreshToken = jwt.sign(
      {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email
      },
      secreyKey,
      { expiresIn: '7d' }
    );
    return refreshToken;
  }catch(err){
    throw new Error(`createRefreshToken Err': ${(err as Error).message}`)
  }
}

export const verifyToken = async (token: string): Promise<IUser> => {
  const secreyKey: string = process.env.TOKEN_SECRET_KEY || "";
  try{
    const jwtPayload = jwt.verify(token, secreyKey) as JwtPayload;
    let userInfo : IUser = {
      id: jwtPayload.id,
      name: jwtPayload.name,
      email: jwtPayload.email}
    return userInfo
  }catch(err){
    throw new Error(`verifyToken Err': ${(err as Error).message}`);
  }
}

export const isMatchRefreshToken = async(token:string): Promise<boolean> => {
  try{
    const refreshTokenInfo = await tokenRepository.selectTokenByToken(token)
    if (token == refreshTokenInfo.token){
      return true
    }else{
      return false
    }
  }catch(err){
    return false
  }
}
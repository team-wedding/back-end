import * as userRepository from '../repositories/userRepository';
import * as tokenRepository from '../repositories/tokenRepository';
import * as authUtil from '../utils/authUtil';
import { User as IUser } from '../interfaces/user.interface';
import generator from 'generate-password';
import {transporter} from '../../config/nodemailerConfig'
import * as dotenv from 'dotenv';

dotenv.config();

export const signup = async (userInfo:any):Promise<boolean> => {
  try{
    if(await userRepository.selectUser(userInfo.email)) {
      return false
    }
    userInfo = await authUtil.createHashPassword(userInfo)
    await userRepository.createUser(userInfo)
    return true;
  }catch(err){
    throw new Error(`userService signup err: ${(err as Error).message}`)
  }
};

export const login = async (email: string, password: string):Promise<any> => {
  try{
    const userInfo = await userRepository.selectUser(email);
    if(userInfo && await authUtil.isMatchPassword(userInfo, password)){
      const accessToken = await authUtil.createAccessToken(userInfo)
      const refreshToken = await authUtil.createRefreshToken(userInfo)
      if (await tokenRepository.selectTokenByUid(userInfo.id)){
        await tokenRepository.deleteToken(userInfo.id)
      }
      await tokenRepository.createToken(userInfo.id, refreshToken);
      return {accessToken: accessToken, refreshToken: refreshToken};
    }
    return false
  }catch(err){
    throw new Error(`userService login Err: ${(err as Error).message}`)
  }
};

export const logout = async(userInfo: Record<string, any>) : Promise<boolean> => {
  try{
    await tokenRepository.deleteToken(userInfo.id)
    return true
  }catch(err){
    throw new Error(`userService logout Err: ${(err as Error).message}`);
  }
}

export const updateAccessToken = async(userInfo: IUser) : Promise<string>=> {
  try{
    const accessToken = await authUtil.createAccessToken(userInfo)
    return accessToken;
  }catch(err){
    throw new Error(`userService updateAccessToken Err: ${(err as Error).message}`)
  }
}

export const changePassword = async(email: string, password: string, newPassword: string) : Promise<boolean> => {
  try{
    const userInfo = await userRepository.selectUser(email);
    if(await authUtil.isMatchPassword(userInfo, password) && password !== newPassword){
      const salt = await authUtil.createRandomSalt()
      const newHashPassword = await authUtil.passwordChangeToHash(newPassword, salt)
      await userRepository.updatePassword(userInfo.id, newHashPassword, salt)
      return true
    }
    return false
  }catch(err){
    throw new Error(`userService changePassword Err: ${(err as Error).message}`)
  }
}

export const resetPassword = async(email: string) : Promise<boolean> => {
  try{
    const userInfo = await userRepository.selectUser(email);
    if(userInfo){
      const tempPassword = generator.generate({ length: 10, numbers: true });
      console.log("tempPassword: %s", tempPassword);

      const info = await transporter.sendMail({
        from: process.env.NODEMAILER_AUTH_USER,
        to: email,
        subject: '우결에서 임시 비밀번호를 발급드립니다.',
        html: 
        "<h1 >우결에서 임시 비밀번호를 알려드립니다.</h1> <h2> 비밀번호 : " + tempPassword + "</h2>"
        +'<h3 style="color: crimson;">임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>'
      });

      console.log("Message sent: %s", info.messageId);

      const salt = await authUtil.createRandomSalt()
      const newHashPassword = await authUtil.passwordChangeToHash(tempPassword, salt)
      await userRepository.updatePassword(userInfo.id, newHashPassword, salt)

      return true
    }
    return false
  }catch(err){
    throw new Error(`userService resetPassword Err: ${(err as Error).message}`)
  }
}

export const changeUserInfo = async(email: string, newName: string, newEmail: string) : Promise<boolean> => {
  try{
    const userInfo = await userRepository.selectUser(email);
    if(newName && newEmail){
      await userRepository.updateAllUserInfo(userInfo.id, newName, newEmail);
      return true
    }
    if(newName){
      await userRepository.updateName(userInfo.id, newName);
      return true
    }
    if(newEmail){
      await userRepository.updateEmail(userInfo.id, newEmail);
      return true
    }

    return false
  }catch(err){
    throw new Error(`userService changeUserInfo Err: ${(err as Error).message}`)
  }
}

export const deleteUser = async(email: string, password:string) : Promise<boolean> => {
  try{
    const userInfo = await userRepository.selectUser(email)
    if(await authUtil.isMatchPassword(userInfo, password)){
      await userRepository.deleteUser(userInfo)
      return true;
    }
    return false
  }catch(err){
    throw new Error(`userService deleteUser Err: ${(err as Error).message}`)
  }
}

export const myPage = async(email: string) : Promise<any> => {
  try{
    let userInfo = await userRepository.selectUser(email)
    userInfo = {...userInfo,
      id: userInfo.id,
      email: userInfo.email,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
      provider: userInfo.provider
    }
    return userInfo
  }catch(err){
    throw new Error(`userService myPage Err: ${(err as Error).message}`)
  }
}

export const kakaoLogin = async (userInfo:any):Promise<any> => {
  try{
    
    let searchedUserInfo = await userRepository.selectUser(userInfo.email);
    
    if(searchedUserInfo) {
      if(searchedUserInfo.provider === "kakao"){
        const accessToken = await authUtil.createAccessToken(searchedUserInfo);
        const refreshToken = await authUtil.createRefreshToken(searchedUserInfo);
        if (await tokenRepository.selectTokenByUid(searchedUserInfo.id)){
          await tokenRepository.deleteToken(searchedUserInfo.id)
        }
        await tokenRepository.createToken(searchedUserInfo.id, refreshToken);
        
        return {accessToken: accessToken, refreshToken: refreshToken}; 
      }
      return false;
    }

    userInfo = await authUtil.createHashPassword(userInfo)
    await userRepository.createUser(userInfo)
    searchedUserInfo = await userRepository.selectUser(userInfo.email);

    const accessToken = await authUtil.createAccessToken(searchedUserInfo);
    const refreshToken = await authUtil.createRefreshToken(searchedUserInfo);
    if (await tokenRepository.selectTokenByUid(searchedUserInfo.id)){
      await tokenRepository.deleteToken(searchedUserInfo.id)
    }
    await tokenRepository.createToken(searchedUserInfo.id, refreshToken);
    
    return {accessToken: accessToken, refreshToken: refreshToken};
  }catch(err){
    throw new Error(`userService signup err: ${(err as Error).message}`);
  }
};

export const naverLogin = async (userInfo:any):Promise<any> => {
  try{
    
    let searchedUserInfo = await userRepository.selectUser(userInfo.email);
    
    if(searchedUserInfo) {
      if(searchedUserInfo.provider === "naver"){
        const accessToken = await authUtil.createAccessToken(searchedUserInfo);
        const refreshToken = await authUtil.createRefreshToken(searchedUserInfo);
        if (await tokenRepository.selectTokenByUid(searchedUserInfo.id)){
          await tokenRepository.deleteToken(searchedUserInfo.id)
        }
        await tokenRepository.createToken(searchedUserInfo.id, refreshToken);
        
        return {accessToken: accessToken, refreshToken: refreshToken}; 
      }
      return false;
    }

    userInfo = await authUtil.createHashPassword(userInfo)
    await userRepository.createUser(userInfo)
    searchedUserInfo = await userRepository.selectUser(userInfo.email);

    const accessToken = await authUtil.createAccessToken(searchedUserInfo);
    const refreshToken = await authUtil.createRefreshToken(searchedUserInfo);
    if (await tokenRepository.selectTokenByUid(searchedUserInfo.id)){
      await tokenRepository.deleteToken(searchedUserInfo.id)
    }
    await tokenRepository.createToken(searchedUserInfo.id, refreshToken);
    
    return {accessToken: accessToken, refreshToken: refreshToken};
  }catch(err){
    throw new Error(`userService signup err: ${(err as Error).message}`);
  }
};
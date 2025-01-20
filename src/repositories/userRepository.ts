import db from '../models';
import { User as IUser } from '../interfaces/user.interface';

export const selectUser = async (email:string) => {
  try{
    const userInfo = await db.User.findOne({ where: { email: email }, raw: true });
    return userInfo
  }catch(err){
    throw new Error(`userRepository selectUser err: ${(err as Error).message}`);
  }
};

export const createUser = async (userInfo:IUser) => {
  try{
    await db.User.create({
      name: userInfo.name,
      email: userInfo.email,
      hashPassword: userInfo.hashPassword,
      provider: userInfo.provider,
      salt: userInfo.salt
    });
  }catch(err){
    throw new Error(`userRepository createUser err: ${(err as Error).message}`);
  }
}

export const deleteUser = async(userInfo:IUser) => {
  try{
    await db.User.destroy({where: {id: userInfo.id}})
    return true
  }catch(err){
    throw new Error(`userReposityro deleteUser err: ${(err as Error).message}`);
  }
};

export const updatePassword = async (id:number, newHashPassword:string, salt:string) => {
  try{
    await db.User.update({
      hashPassword: newHashPassword,
      salt: salt
    },
    {
      where: {id: id}
    });
    return true
  }catch(err){
    throw new Error(`userRepository updatePassword err: ${(err as Error).message}`)
  }
};

export const updateAllUserInfo = async (id:number, newName:string, newEmail:string) => {
  try{
    await db.User.update({
      name: newName,
      email: newEmail
    },
    {
      where: {id: id}
    });
    return true
  }catch(err){
    console.log(err);
    throw new Error(`userRepository updateAllUserInfo err: ${(err as Error).message}`);
  }
};

export const updateName = async (id:number, newName:string) => {
  try{
    await db.User.update({
      name: newName,
    },
    {
      where: {id: id}
    });
    return true
  }catch(err){
    console.log(err);
    throw new Error(`userRepository updateName err: ${(err as Error).message}`);
  }
};

export const updateEmail = async (id:number, newEmail:string) => {
  try{
    await db.User.update({
      email: newEmail
    },
    {
      where: {id: id}
    });
    return true
  }catch(err){
    console.log(err);
    throw new Error(`userRepository updateEmail err: ${(err as Error).message}`);
  }
};
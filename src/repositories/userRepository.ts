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

export const updateUser = async (id:number, newHashPassword:string, salt:string) => {
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
    throw new Error(`userRepository updateUser err: ${(err as Error).message}`)
  }
};
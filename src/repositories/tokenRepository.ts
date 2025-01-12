import db from '../models';

export const createToken = async (id:number, refreshToken: string) => {
  try{
    await db.Token.create({
      userId: id,
      token: refreshToken
    });
    return 
  }catch(err){
    throw new Error(`tokenRepository createToken err: ${(err as Error).message}`)
  }
}

export const deleteToken = async (id: number) => {
  try{
    await db.Token.destroy({
      where: {userId : id}
    })
    return
  }catch(err){
    throw new Error(`tokenRepository deleteToken err: ${(err as Error).message}`)
  }
}

export const selectTokenByUid = async (id:number) => {
  try{
    const tokenInfo = await db.Token.findOne({where: {userId: id}, raw: true});
    return tokenInfo
  }catch(err){
    throw new Error(`tokenRepository selectTokenByUid err: ${(err as Error).message}`)
  }
}

export const selectTokenByToken = async(token: string) => {
  try{
    const refreshTokenInfo = await db.Token.findOne({where: {token: token}, raw: true});
    return refreshTokenInfo
  }catch(err){
    throw new Error(`tokenRepository selectTokenByToken Err: ${(err as Error).message}`);
  }
}
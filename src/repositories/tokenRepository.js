const { Token } = require('../models')

const createToken = async (id, refreshToken) => {
  try{
    await Token.create({
      userId: id,
      token: refreshToken
    });
    return 
  }catch(err){
    throw new Error('tokenRepository createToken err', err)
  }
}

const deleteToken = async (id) => {
  try{
    await Token.destroy({
      where: {userId : id}
    })
    return
  }catch(err){
    throw new Error('tokenRepository deleteToken err', err)
  }
}

const selectTokenByUid = async (id) => {
  try{
    const tokenInfo = await Token.findOne({where: {userId: id}, raw: true});
    return tokenInfo
  }catch(err){
    throw new Error('tokenRepository selectTokenByUid err', err)
  }
}

const selectTokenByToken = async(token) => {
  try{
    const refreshTokenInfo = await Token.findOne({where: {token: token}, raw: true});
    return refreshTokenInfo
  }catch(err){
    throw new Error('tokenRepository selectTokenByToken Err', err)
  }
}

module.exports = {
  createToken,
  deleteToken,
  selectTokenByUid,
  selectTokenByToken
}
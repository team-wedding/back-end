const userRepository = require('../repositories/userRepository')
const tokenRepository = require('../repositories/tokenRepository')
const authUtil = require('../utils/authUtil')

const signup = async (userInfo) => {
  try{
    if(await userRepository.selectUser(userInfo.email)) {
      return false
    }
    userInfo = await authUtil.createHashPassword(userInfo)
    await userRepository.createUser(userInfo)
    return true;
  }catch(err){
    throw new Error('userService signup err', err)
  }
};

const login = async (email, password) => {
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
    throw new Error('userService login Err', err)
  }
};

const logout = async(userInfo) => {
  try{
    await tokenRepository.deleteToken(userInfo.id)
    return true
  }catch(err){
    return "오류나면 어쩔건데"
  }
}

const updateAccessToken = async(userInfo) => {
  try{
    const accessToken = await authUtil.createAccessToken(userInfo)
    return accessToken;
  }catch(err){
    throw new Error('userService updateAccessToken Err', err)
  }
}

const changePassword = async(email, password, newPassword) => {
  try{
    const userInfo = await userRepository.selectUser(email);
    if(await authUtil.isMatchPassword(userInfo, password) && password !== newPassword){
      const salt = await authUtil.createRandomSalt()
      const newHashPassword = await authUtil.passwordChangeToHash(newPassword, salt)
      await userRepository.updateUser(userInfo.id, newHashPassword, salt)
      return true
    }
    return false
  }catch(err){
    throw new Error('userService changePassword Err', err)
  }
}

const deleteUser = async(email, password) => {
  try{
    const userInfo = await userRepository.selectUser(email)
    if(await authUtil.isMatchPassword(userInfo, password)){
      await userRepository.createDelUser(userInfo)
      await userRepository.deleteUser(userInfo)
      return true;
    }
    return false
  }catch(err){
    throw new Error('userService deleteUser Err', err)
  }
}

const myPage = async(email) => {
  try{
    const userInfo = await userRepository.selectUser(email)
    return {
      id: userInfo.id,
      email: userInfo.email,
      gender: userInfo.gender,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
      provider: userInfo.provider
    }
  }catch(err){
    throw new Error('userService myPage Err', err)
  }
}
module.exports = {
  signup,
  login,
  logout,
  updateAccessToken,
  changePassword,
  deleteUser,
  myPage
};

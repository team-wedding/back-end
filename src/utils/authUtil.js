const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const tokenRepository = require('../repositories/tokenRepository');
const userRepository = require('../repositories/userRepository')

dotenv.config();

const localAuth = async (token) => {
  try{
    const userInfo = await verifyToken(token)
    return userInfo
  }catch(err){
    return false
  }
}

const createHashPassword = async (userInfo) => {
  try{
    const salt = await createRandomSalt();
    const hashPassword = await passwordChangeToHash(userInfo.password, salt);
    userInfo.salt = salt;
    userInfo.hashPassword = hashPassword;
    return userInfo
  }catch(err){
    throw new Error('makeHashPassword Err', err)
  }  
}

const isMatchPassword = async (userInfo, password) => {
  try{
    if(userInfo.hashPassword == await passwordChangeToHash(password, userInfo.salt)){
      return true
    }
    return false
  }catch(err){
    throw new Error('isMatchPassword Err', err)
  }
}

const createRandomSalt = async () => {
  const salt = crypto.randomBytes(10).toString('base64');
  return salt
};


const passwordChangeToHash = async (password, salt) => { 
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
  return hashPassword
};

const createAccessToken = async(userInfo) => {
  try{
    const accessToken = jwt.sign(
      {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '1d' }
    );
    return accessToken;
  }catch(err){
    throw new Error('createAccessToken Err', err)
  }
}

const createRefreshToken = async(userInfo) => {
  try{
    const refreshToken = jwt.sign(
      {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: '7d' }
    );
    return refreshToken;
  }catch(err){
    throw new Error('createRefreshToken Err', err)
  }
}

const verifyToken = async (token) => {
  try{
    const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    return userInfo
  }catch(err){
    return false
  }
}

const isMatchRefreshToken = async(token) => {
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

module.exports = {
  createHashPassword,
  isMatchPassword,
  createAccessToken,
  createRefreshToken,
  verifyToken,
  isMatchRefreshToken,
  createRandomSalt,
  passwordChangeToHash,
  localAuth
}
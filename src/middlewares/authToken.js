const { verifyToken, isMatchRefreshToken, localAuth } = require('../utils/authUtil');
const { StatusCodes } = require('http-status-codes');

const authToken = async (req,res,next) => {
  try{
    const accessToken = req.headers.authorization?.split(' ')[1];
    let userInfo = await localAuth(accessToken);
    if(!userInfo){
      return res.status(StatusCodes.UNAUTHORIZED).json({message:'유효하지 않은 토큰'})
    }
	  res.header('authorization', `Bearer ${accessToken}`); // 추가부분
    req.userInfo = userInfo
    next()
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({messgae:'서버 에러'})
  }
}

const refreshToken = async (req,res,next) => {
  try{
    const refreshToken = req.headers.refresh?.split(' ')[1];
    if(!await isMatchRefreshToken(refreshToken)){
      return res.status(StatusCodes.FORBIDDEN).json({message:'다시 로그인하세요~'})
    }
    const userInfo = await verifyToken(refreshToken)
    req.userInfo = userInfo
    next()
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

module.exports = {
  authToken,
  refreshToken,
}
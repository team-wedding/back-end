import express from 'express';
import {signup, login, logout, updateAccessToken, myPage, changePassword, deleteUser, kakaoLogin, naverLogin, changeUserInfo} from '../controllers/userController';
import {signupValidate, loginValidate, changePasswordValidate, changeUserInfoValidate} from '../middlewares/validations';
import { authToken, kakaoAuthToken, refreshToken, naverAuthToken } from '../middlewares/authToken';

const router = express.Router();


router.post('/signup', signupValidate, signup);
router.post('/login', loginValidate, login);
router.delete('/logout', authToken, logout);
router.get('/refresh', refreshToken, updateAccessToken);

router
  .route('/account')
  .get(authToken, myPage)
  .put(authToken, changeUserInfoValidate, changeUserInfo)
  .delete(authToken, deleteUser);

router.put('/account/password', authToken, changePasswordValidate, changePassword);

router.get('/oauth/kakao',kakaoAuthToken, kakaoLogin);
router.get('/oauth/naver',naverAuthToken, naverLogin);

export default router;
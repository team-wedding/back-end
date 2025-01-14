import express from 'express';
import {signup, login, logout, updateAccessToken, myPage, changePassword, deleteUser, kakaoLogin} from '../controllers/userController';
import {signupValidate, loginValidate, changePasswordValidate} from '../middlewares/validations';
import { authToken, kakaoAuthToken, refreshToken } from '../middlewares/authToken';

const router = express.Router();


router.post('/signup', signupValidate, signup);
router.post('/login', loginValidate, login);
router.delete('/logout', authToken, logout);
router.get('/refresh', refreshToken, updateAccessToken);

router
  .route('/account')
  .get(authToken, myPage)
  .put(authToken, changePasswordValidate, changePassword)
  .delete(authToken, deleteUser);

router.get('/oauth/kakao',kakaoAuthToken, kakaoLogin);
export default router;
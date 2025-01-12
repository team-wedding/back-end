import express, {Request, Response, NextFunction} from 'express';
import {signup, login, logout, updateAccessToken, myPage, changePassword, deleteUser} from '../controllers/userController';
import {signupValidate, loginValidate, changePasswordValidate} from '../middlewares/validations';
import { authToken, refreshToken } from '../middlewares/authToken';

const router = express.Router();


router.post('/signup', signupValidate, signup);
router.post('/login', loginValidate, login);
router.delete('/logout', authToken, logout);
router.get('/refresh', refreshToken, updateAccessToken);

router
  .route('/account')
  .get(authToken, myPage)
  .put(authToken, changePasswordValidate, changePassword)
  .delete(authToken, deleteUser)

  export default router;
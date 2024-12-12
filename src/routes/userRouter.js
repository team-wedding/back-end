const express = require('express');
const router = express.Router();
const {signup, login, logout, updateAccessToken, myPage, changePassword, deleteUser} = require('../controllers/userController');
const {signupValidate, loginValidate, changePasswordValidate} = require('../middlewares/validations');
const { authToken, refreshToken } = require('../middlewares/authToken');


router.post('/signup', signupValidate, signup);
router.post('/login', loginValidate, login);
router.delete('/logout', authToken, logout);
router.get('/refresh', refreshToken, updateAccessToken);

router
  .route('/account')
  .get(authToken, myPage)
  .put(authToken, changePasswordValidate, changePassword)
  .delete(authToken, deleteUser)

module.exports = router;
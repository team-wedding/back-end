const { body, validationResult, param } = require('express-validator');
const { StatusCodes} = require('http-status-codes')

const validate = (req,res,next) =>{
  const err = validationResult(req)

  if(err.isEmpty()){
    return next()
  }else{
    console.log(err)
    return res.status(StatusCodes.BAD_REQUEST).json(err.array())
  }
}

const signupValidate = [
  body('name').isString(),
  body('email').isEmail(),
  body('password').isString().isLength({min: 4}),
  body('gender').optional().isIn(['male','femaile']),
  body('provider').isString(),
  validate
];

const loginValidate = [
  body('email').isEmail(),
  body('password').isString(),
  validate
]

const paramValidate = [
  param('id').optional().isInt().toInt(),
  validate
];

const changePasswordValidate = [
  body('password').isString(),
  body('newPassword').isString(),
  validate
]

module.exports = {
  signupValidate,
  loginValidate,
  paramValidate,
  changePasswordValidate
};
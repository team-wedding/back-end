import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult, param } from 'express-validator';
import { StatusCodes} from 'http-status-codes';

export const validate: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
  const err = validationResult(req)

  if(err.isEmpty()){
    return next()
  }else{
    console.log(err)
    res.status(StatusCodes.BAD_REQUEST).json(err.array());
    return;
  }
}

export const signupValidate = [
  body('name').isString(),
  body('email').isEmail(),
  body('password').isString().isLength({min: 4}),
  body('provider').isString(),
  validate
];

export const loginValidate = [
  body('email').isEmail(),
  body('password').isString(),
  validate
]

export const paramValidate = [
  param('id').optional().isInt().toInt(),
  validate
];

export const changePasswordValidate = [
  body('password').isString(),
  body('newPassword').isString(),
  validate
]

export const changeUserInfoValidate = [
  body('newEmail').optional().isEmail(),
  body('newName').optional().isString(),
  validate
]

export const passwordResetValidate = [
  body('email').isEmail(),
  validate
]
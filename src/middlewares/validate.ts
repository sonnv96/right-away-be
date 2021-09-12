import Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import systemConstant from "../config/system-constant";
import { pick } from '../utils';

export const validate = (schema, isAuthenticate: boolean = false) => (req, res, next) => {

  if (isAuthenticate) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, systemConstant.jwtSecret as string, (err: any, user: any) => {
      console.log(err)

      if (err) return res.sendStatus(403)

      req.user = user
    })
  }

  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(res.status(404).json({ message: errorMessage }))
  }
  Object.assign(req, value);
  return next();
};



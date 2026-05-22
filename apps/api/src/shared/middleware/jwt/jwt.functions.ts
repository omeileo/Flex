import jwt from 'jsonwebtoken'

import { JwtPayload } from '../../../api/user/auth/login/login.types'
import { globalErrors } from '../../dictionary/errors.dictionary'
import { env } from '../../functions/envConfig'

const SECRET_KEY = env.JWT_SECRET_KEY
const TOKEN_EXPIRATION = env.JWT_TOKEN_EXPIRATION // Token expiration time, e.g., '1h', '2d', etc.

export const jwtService = {
  generateToken: (payload: JwtPayload): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION })
  },

  verifyToken: (token: string): JwtPayload => {
    try {
      return jwt.verify(token, SECRET_KEY) as JwtPayload
    } catch (error) {
      throw globalErrors.invalidToken.build()
    }
  }
}

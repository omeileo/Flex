import { JwtPayload } from '../../api/user/auth/login/login.types'

declare global {
  namespace Express {
    interface Request {
      userPayload?: JwtPayload
    }
  }
}

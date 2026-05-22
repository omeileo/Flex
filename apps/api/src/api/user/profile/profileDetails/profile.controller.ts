import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { ProfileRoutes } from './profile.routes'
import { profileService } from './profile.service'

const controller = function () {
  const router = express.Router()

  router.get(
    ProfileRoutes.GET.routerPath,
    requestHandler(null, async (req: Request, res: Response) => {
      const { firebaseData } = req.query
      const profile = await profileService.getUserProfile(firebaseData === 'true')

      successResponse(res, StatusCodes.OK, 'Request successful.', profile, 'Your request was successful.')
    })
  )

  router.post(
    ProfileRoutes.UPDATE_FIREBASE_USER_ID.routerPath,
    requestHandler(null, async (req: Request, res: Response) => {
      const { firebaseUserId } = req.body

      await profileService.updateUserFirebaseUserId(firebaseUserId)

      successResponse(res, StatusCodes.OK, 'Request successful.', {}, 'Your request was successful.')
    })
  )

  return router
}

export const profileRouter: Router = controller()

import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getRequestBody } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { updatePersonalInfoRequestValidator } from './personalInfo.middleware'
import './personalInfo.model'
import { PersonalInfoRoutes } from './personalInfo.routes'
import { personalInfoService } from './personalInfo.service'
import { UpdatePersonalInfoRequest } from './personalInfo.types'

const controller = function () {
  const router = express.Router()

  router.put(
    PersonalInfoRoutes.UPDATE.routerPath,
    requestHandler(updatePersonalInfoRequestValidator, async (req: Request, res: Response) => {
      const updatePersonalInfoRequest = getRequestBody<UpdatePersonalInfoRequest>(req)

      await personalInfoService.updateUserPersonalInfo(updatePersonalInfoRequest)

      successResponse(
        res,
        StatusCodes.OK,
        'Request successful.',
        {},
        'Your personal information has been updated successfully.'
      )
    })
  )

  return router
}

export const personalInfoRouter: Router = controller()

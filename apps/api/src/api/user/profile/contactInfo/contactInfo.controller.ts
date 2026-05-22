import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getRequestBody } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { updateContactInfoRequestValidator } from './contactInfo.middleware'
import './contactInfo.model'
import { ContactInfoRoutes } from './contactInfo.routes'
import { contactInfoService } from './contactInfo.service'
import { UpdateContactInfoRequest } from './contactInfo.types'

const controller = function () {
  const router = express.Router()

  router.put(
    ContactInfoRoutes.UPDATE.routerPath,
    requestHandler(updateContactInfoRequestValidator, async (req: Request, res: Response) => {
      const updateContactInfoRequest = getRequestBody<UpdateContactInfoRequest>(req)

      await contactInfoService.updateUserContactInfo(updateContactInfoRequest)

      successResponse(
        res,
        StatusCodes.OK,
        'Request successful.',
        {},
        'Your contact information has been updated successfully.'
      )
    })
  )

  return router
}

export const contactInfoRouter: Router = controller()

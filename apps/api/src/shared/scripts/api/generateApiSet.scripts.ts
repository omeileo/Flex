/* eslint-disable @typescript-eslint/no-unused-vars */
// Step 1: Setup and Imports
import fs from 'fs'
import inquirer from 'inquirer'
import _ from 'lodash'
import path from 'path'

interface Answers {
  apiBasePath: string
  apiName: string
}

// Step 2: Prompt User for Input
async function promptForBasePathAndName(): Promise<Answers> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'apiBasePath',
      message: 'API Base Path:',
      default: 'profile/loyalty-program'
    },
    {
      type: 'input',
      name: 'apiName',
      message: 'API Name:',
      default: 'Loyalty Program'
    }
  ])

  return {
    apiBasePath: answers.apiBasePath,
    apiName: answers.apiName
  }
}

async function main() {
  const answers = await promptForBasePathAndName()
  await createApiFiles(answers)
}

main().catch(console.error)

// Helper function to convert dash-case to camelCase
function toCamelCase(str: string) {
  return str.replace(/-./g, (x) => x[1].toUpperCase())
}

function getCamelCaseSubjectName(apiName: string) {
  return _.camelCase(apiName)
}

function getSentenceCaseSubjectName(apiName: string) {
  return apiName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

const controllerContent = function (answers: Answers) {
  const subjectName = getCamelCaseSubjectName(answers.apiName)
  const sentenceCaseSubjectName = getSentenceCaseSubjectName(answers.apiName)

  return `
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import {
  getQueryParams,
  getQueryParamsAndBody,
  getRequestBody
} from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import {
  delete${sentenceCaseSubjectName}Validator,
  ${subjectName}Validator,
  update${sentenceCaseSubjectName}Validator
} from './${subjectName}.middleware'
import './${subjectName}.model'
import { ${subjectName}Routes } from './${subjectName}.routes'
import { ${subjectName}Service } from './${subjectName}.service'
import {
  Add${sentenceCaseSubjectName}Request,
  ${sentenceCaseSubjectName},
  ${sentenceCaseSubjectName}QueryParam
} from './${subjectName}.types'

const controller = function () {
  const router = express.Router()

  router.post(
    ${subjectName}Routes.ADD.routerPath,
    requestHandler(${subjectName}Validator, async (req: Request, res: Response) => {
      const ${subjectName} = getRequestBody<Add${sentenceCaseSubjectName}Request>(req)

      await ${subjectName}Service.add${sentenceCaseSubjectName}(${subjectName})

      successResponse(
        res,
        StatusCodes.OK,
        'Request successful.',
        {},
        '${answers.apiName} added successfully.'
      )
    })
  )

  router.get(
    ${subjectName}Routes.GET.routerPath,
    requestHandler(null, async (req: Request, res: Response) => {
      const ${subjectName}s =
        await ${subjectName}Service.get${sentenceCaseSubjectName}s()

      successResponse(
        res,
        StatusCodes.OK,
        'Request successful.',
        ${subjectName}s,
        '${answers.apiName}s fetched successfully.'
      )
    })
  )

  router.put(
    ${subjectName}Routes.UPDATE.routerPath,
    requestHandler(update${sentenceCaseSubjectName}Validator,async (req: Request, res: Response) => {
      const update${sentenceCaseSubjectName}Request = getQueryParamsAndBody<
        ${sentenceCaseSubjectName}QueryParam,
        ${sentenceCaseSubjectName}
      >(req)

      await ${subjectName}Service.update${sentenceCaseSubjectName}(
        update${sentenceCaseSubjectName}Request.queryParams.${subjectName}Id,
        update${sentenceCaseSubjectName}Request.body
      )

      successResponse(
        res,
        StatusCodes.OK,
        'Request successful.',
        {},
        '${answers.apiName} updated successfully.'
      )
    })
  )

  router.delete(
    ${subjectName}Routes.DELETE.routerPath,
    requestHandler(delete${sentenceCaseSubjectName}Validator, async (req: Request, res: Response) => {
      const delete${sentenceCaseSubjectName}Request =
        getQueryParams<${sentenceCaseSubjectName}QueryParam>(req)

      await ${subjectName}Service.delete${sentenceCaseSubjectName}(
        delete${sentenceCaseSubjectName}Request.${subjectName}Id
      )

      successResponse(
        res,
        StatusCodes.OK,
        'Request successful.',
        {},
        '${answers.apiName} deleted successfully.'
      )
    })
  )

  return router
}

export const ${subjectName}Router: Router = controller()
  `
}

const docsContent = function (answers: Answers) {
  const subjectName = getCamelCaseSubjectName(answers.apiName)
  const sentenceCaseSubjectName = getSentenceCaseSubjectName(answers.apiName)

  return `
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import {
  ParamsFrom,
  createApiResponses,
  withJWTMiddleware
} from '../../../../__openApiDocs__/functions/openAPI.functions'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'
import { ValidationErrorResponseBody } from '../../../../shared/functions/http/response/errorResponse.model'
import { zodd } from '../../../../shared/functions/zod.functions'
import { ${subjectName}Errors } from './${subjectName}.dictionary'
import {
  ${subjectName}Body,
  ${subjectName}QueryParam
} from './${subjectName}.model'
import { ${subjectName}Routes } from './${subjectName}.routes'

/**
 * Represents the Open API registry docs for the ${answers.apiName} functionality.
 */
export const ${subjectName}Registry = new OpenAPIRegistry()

${subjectName}Registry.registerPath({
  method: 'post',
  path: ${subjectName}Routes.ADD.openApiFullPath,
  tags: ['${answers.apiName}'],
  ...withJWTMiddleware(),
  request: {
    body: {
      description: '${answers.apiName} Request Body',
      required: true,
      content: {
        'application/json': {
          schema: ${subjectName}Body
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: ${subjectName}Body,
      description: 'Successfully Added ${answers.apiName}.',
      statusCode: StatusCodes.OK
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Invalid ${answers.apiName} request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: ${subjectName}Errors.maximum${sentenceCaseSubjectName}sReached.schema,
      description: 'Maximum number of ${answers.apiName}s reached.',
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY
    }
  ])
})

${subjectName}Registry.registerPath({
  method: 'get',
  path: ${subjectName}Routes.GET.openApiFullPath,
  tags: ['${answers.apiName}'],
  ...withJWTMiddleware(),
  responses: createApiResponses([
    {
      result: zodd.array(${subjectName}Body),
      description: 'Successfully Retrieved ${answers.apiName}s.',
      statusCode: StatusCodes.OK
    }
  ])
})

${subjectName}Registry.registerPath({
  method: 'put',
  path: ${subjectName}Routes.UPDATE.openApiFullPath,
  tags: ['${answers.apiName}'],
  ...withJWTMiddleware(),
  request: {
    query: ParamsFrom(${subjectName}QueryParam),
    body: {
      description: 'Update ${answers.apiName} Request Body',
      required: true,
      content: {
        'application/json': {
          schema: ${subjectName}Body
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: ${subjectName}Body,
      description: 'Successfully Updated ${answers.apiName}.',
      statusCode: StatusCodes.OK
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Invalid ${answers.apiName} request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: globalErrors.entityNotFound.schema,
      description: '${answers.apiName} not found.',
      statusCode: StatusCodes.NOT_FOUND
    }
  ])
})

${subjectName}Registry.registerPath({
  method: 'delete',
  path: ${subjectName}Routes.DELETE.openApiFullPath,
  tags: ['${answers.apiName}'],
  ...withJWTMiddleware(),
  request: {
    query: ParamsFrom(${subjectName}QueryParam)
  },
  responses: createApiResponses([
    {
      result: ${subjectName}Body,
      description: 'Successfully Deleted ${answers.apiName}.',
      statusCode: StatusCodes.OK
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Invalid ${answers.apiName} request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: globalErrors.entityNotFound.schema,
      description: '${answers.apiName} not found.',
      statusCode: StatusCodes.NOT_FOUND
    }
  ])
})
  `
}

const dictionaryContent = function (answers: Answers) {
  const subjectName = getCamelCaseSubjectName(answers.apiName)
  const sentenceCaseSubjectName = getSentenceCaseSubjectName(answers.apiName)

  return `
import { StatusCodes } from 'http-status-codes'

import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '../../../../shared/functions/http/response/errorResponse.model'
import { quickErrorResponse } from '../../../../shared/functions/http/response/response.function'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Dictionary of ${answers.apiName} errors.
 */
export const ${subjectName}Errors = {
  maximum${sentenceCaseSubjectName}sReached: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Unprocessable Entity',
        'Maximum number of ${answers.apiName}s reached.',
        [
          {
            field: '${subjectName}s',
            issue: 'limitExceeded',
            description:
              'You have reached the maximum number of ${answers.apiName}s allowed.'
          }
        ],
        'You have reached the maximum number of ${answers.apiName}s allowed, please remove an existing one before adding a new one.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd
        .string()
        .openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Maximum number of ${answers.apiName}s reached.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/${answers.apiBasePath}/add',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: '${subjectName}s',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'You have reached the maximum number of ${answers.apiName}s allowed.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'limitExceeded',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'You cannot add more ${answers.apiName}s.',
        description: 'User-friendly error message'
      })
    })
  }
}
  `
}

const middlewareContent = function (answers: Answers) {
  const subjectName = getCamelCaseSubjectName(answers.apiName)
  const sentenceCaseSubjectName = getSentenceCaseSubjectName(answers.apiName)

  return `
import { validateIncomingApiRequest} from '@/shared/functions/http/validateApiRequest.functions'

import {
  IncomingDelete${sentenceCaseSubjectName}Request,
  Incoming${sentenceCaseSubjectName}Body,
  IncomingUpdate${sentenceCaseSubjectName}Request
} from './${subjectName}.model'

/**
 * Validates the incoming API request for the update ${subjectName} endpoint.
 * @param {Incoming${sentenceCaseSubjectName}Body} request - The incoming update ${subjectName} request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const ${subjectName}Validator = validateIncomingApiRequest(
  Incoming${sentenceCaseSubjectName}Body
)

export const update${sentenceCaseSubjectName}Validator = validateIncomingApiRequest(
  IncomingUpdate${sentenceCaseSubjectName}Request
)

export const delete${sentenceCaseSubjectName}Validator = validateIncomingApiRequest(
  IncomingDelete${sentenceCaseSubjectName}Request
)
  `
}

const modelContent = function (answers: Answers) {
  const subjectName = getCamelCaseSubjectName(answers.apiName)
  const sentenceCaseSubjectName = getSentenceCaseSubjectName(answers.apiName)

  return `
import { commonValidations } from '../../../../shared/functions/commonValidation.functions'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for updating ${answers.apiName} information.
 *
 * This is used to validate the incoming request to the "Update ${answers.apiName}" endpoint.
 */

export const ${subjectName}Body = zodd.object({
  streetAddress: zodd.string().min(1).max(100).openapi({
    example: '123 Main St',
    description: "The user's updated street address"
  }),
  cityId: zodd.number().openapi({
    example: 123,
    description: "The identifier for the user's updated city"
  }),
  countryId: zodd.number().openapi({
    example: 123,
    description: "The identifier for the user's updated country"
  }),
  postalCode: zodd.string().min(1).max(6).openapi({
    example: '12345',
    description: "The user's updated postal code"
  })
})

export const ${subjectName}QueryParam = zodd.object({
  ${subjectName}Id: commonValidations.id.openapi({
    example: '1',
    description: 'The identifier for the ${answers.apiName} to update'
  })
})

/**
 * Represents the incoming request object for updating ${answers.apiName} information.
 *
 * This is used to validate the incoming request to the "Update ${answers.apiName}" endpoint.
 */
export const Incoming${sentenceCaseSubjectName}Body = zodd.object({
  body: ${subjectName}Body
})

/**
 * Represents the incoming request object for updating ${answers.apiName} information.
 *
 * This is used to validate the incoming request to the "Update ${answers.apiName}" endpoint.
 * This object includes the ${answers.apiName} ID in the request parameters.
 */
export const IncomingUpdate${sentenceCaseSubjectName}Request = zodd.object({
  body: ${subjectName}Body,
  query: ${subjectName}QueryParam
})

/**
 * Represents the incoming request object for deleting a ${answers.apiName}.
 *
 * This is used to validate the incoming request to the "Delete ${answers.apiName}" endpoint.
 * This object includes the ${answers.apiName} ID in the request parameters.
 */
export const IncomingDelete${sentenceCaseSubjectName}Request = zodd.object({
  query: ${subjectName}QueryParam
})

/**
 * Represents the response body for the "Update ${answers.apiName}" endpoint.
 *
 * This is returned when the ${answers.apiName} update is successful.
 */
export const Add${sentenceCaseSubjectName}ResponseBody = ${subjectName}Body

/**
 * Represents the response body for the "Update ${answers.apiName}" endpoint.
 *
 * This is returned when the ${answers.apiName} update is successful.
 */
export const Update${sentenceCaseSubjectName}ResponseBody = zodd
  .object({
    message: zodd.string().openapi({
      example: '${answers.apiName} updated successfully',
      description: 'Success message'
    })
  })
  .openapi({
    description: 'Success response',
    example: { message: '${answers.apiName} updated successfully' }
  })
  `
}

const repositoryContent = function (answers: Answers) {
  const subjectName = getCamelCaseSubjectName(answers.apiName)
  const sentenceCaseSubjectName = getSentenceCaseSubjectName(answers.apiName)
  const snakeCaseSubjectName = _.snakeCase(subjectName)

  return `import prisma from '../../../../../prisma/prisma.client'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'
import { env } from '../../../../shared/functions/envConfig'
import { ${subjectName}Errors } from './${subjectName}.dictionary'
import {
  ${sentenceCaseSubjectName},
  Update${sentenceCaseSubjectName}Request
} from './${subjectName}.types'

const ${subjectName}Settings = {
  max${sentenceCaseSubjectName}s: env.MAXIMUM_DELIVERY_ADDRESSES_PER_USER
}

export const ${subjectName}Repository = {
  add${sentenceCaseSubjectName}: async function (
    userId: number,
    new${sentenceCaseSubjectName}: ${sentenceCaseSubjectName}
  ) {
    const ${subjectName}sCount = await prisma.${snakeCaseSubjectName.toLowerCase()}s.count({
      where: {
        user_id: userId
      }
    })

    if (
      ${subjectName}sCount >= ${subjectName}Settings.max${sentenceCaseSubjectName}s
    ) {
      throw ${subjectName}Errors.maximum${sentenceCaseSubjectName}sReached.build()
    }

    const ${subjectName} = await prisma.${snakeCaseSubjectName.toLowerCase()}s.create({
      data: {
        street_address: new${sentenceCaseSubjectName}.streetAddress,
        city_id: new${sentenceCaseSubjectName}.cityId,
        country_id: new${sentenceCaseSubjectName}.countryId,
        postal_code: new${sentenceCaseSubjectName}.postalCode,
        user_id: userId
      }
    })

    if (!${subjectName}) {
      throw globalErrors.entityNotCreated.build('${subjectName}', userId)
    }

    return ${subjectName}
  },

  get${sentenceCaseSubjectName}s: async function (userId: number) {
    const ${subjectName}s = await prisma.${snakeCaseSubjectName.toLowerCase()}s.findMany({
      where: {
        user_id: userId
      },
      take: ${subjectName}Settings.max${sentenceCaseSubjectName}s,
      include: {
        cities: true,
        countries: true
      }
    })

    return ${subjectName}s
  },

  update${sentenceCaseSubjectName}: async function (
    userId: number,
    ${subjectName}Id: number,
    new${sentenceCaseSubjectName}: Update${sentenceCaseSubjectName}Request
  ) {
    const id = Number(${subjectName}Id)
    const ${subjectName} = await this.get${sentenceCaseSubjectName}ById(id)

    const updated${sentenceCaseSubjectName} = await prisma.${snakeCaseSubjectName.toLowerCase()}s.update({
      where: {
        id: ${subjectName}.id
      },
      data: {
        street_address: new${sentenceCaseSubjectName}.streetAddress,
        city_id: new${sentenceCaseSubjectName}.cityId,
        country_id: new${sentenceCaseSubjectName}.countryId,
        postal_code: new${sentenceCaseSubjectName}.postalCode
      }
    })

    if (!updated${sentenceCaseSubjectName}) {
      throw globalErrors.entityNotUpdated.build(
        '${subjectName}',
        \`userId: \${userId} - ${subjectName}Id: \${${subjectName}Id}\`
      )
    }

    return updated${sentenceCaseSubjectName}
  },

  delete${sentenceCaseSubjectName}: async function (
    userId: number,
    ${subjectName}Id: number
  ) {
    const id = Number(${subjectName}Id)
    const ${subjectName} = await this.get${sentenceCaseSubjectName}ById(id)

    const delete${sentenceCaseSubjectName} =
      await prisma.${snakeCaseSubjectName.toLowerCase()}s.delete({
        where: {
          id: ${subjectName}.id
        }
      })

    if (!delete${sentenceCaseSubjectName}) {
      throw globalErrors.entityNotDeleted.build(
        '${subjectName}',
        \`\${userId} - \${${subjectName}Id}\`
      )
    }

    return delete${sentenceCaseSubjectName}
  },

  get${sentenceCaseSubjectName}ById: async function (${subjectName}Id: number) {
    const ${subjectName} = await prisma.${snakeCaseSubjectName.toLowerCase()}s.findFirst({
      where: {
        id: ${subjectName}Id
      }
    })

    if (!${subjectName}) {
      throw globalErrors.entityNotFound.build(
        '${subjectName}'
      )
    }

    return ${subjectName}
  }
}
  `
}

const serviceContent = function (answers: Answers) {
  const subjectName = getCamelCaseSubjectName(answers.apiName)
  const sentenceCaseSubjectName = getSentenceCaseSubjectName(answers.apiName)

  return `
import { getCurrentLoggedInUserOrThrow } from '../../../../shared/appContext.context'
import { ${subjectName}Repository } from './${subjectName}.repository'
import {
  ${sentenceCaseSubjectName},
  Update${sentenceCaseSubjectName}Request
} from './${subjectName}.types'

export const ${subjectName}Service = {
  add${sentenceCaseSubjectName}: async (${subjectName}: ${sentenceCaseSubjectName}) => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    await ${subjectName}Repository.add${sentenceCaseSubjectName}(
      currentUser.userId,
      ${subjectName}
    )

    return
  },

  get${sentenceCaseSubjectName}s: async () => {
    const currentUser = getCurrentLoggedInUserOrThrow()

    const ${subjectName}s =
      await ${subjectName}Repository.get${sentenceCaseSubjectName}s(
        currentUser.userId
      )

    return ${subjectName}s
  },
  
  update${sentenceCaseSubjectName}: async (
    ${subjectName}Id: number,
    update${sentenceCaseSubjectName}Request: Update${sentenceCaseSubjectName}Request
  ) => {
    const currentUser = getCurrentLoggedInUserOrThrow()

    await ${subjectName}Repository.update${sentenceCaseSubjectName}(
      currentUser.userId,
      ${subjectName}Id,
      update${sentenceCaseSubjectName}Request
    )

    return
  },

  delete${sentenceCaseSubjectName}: async (${subjectName}Id: number) => {
    const currentUser = getCurrentLoggedInUserOrThrow()

    await ${subjectName}Repository.delete${sentenceCaseSubjectName}(
      currentUser.userId,
      ${subjectName}Id
    )

    return
  }
}
  `
}

const typesContent = function (answers: Answers) {
  const subjectName = getCamelCaseSubjectName(answers.apiName)
  const sentenceCaseSubjectName = getSentenceCaseSubjectName(answers.apiName)

  return `
import {
  ${subjectName}Body,
  ${subjectName}QueryParam,
  Update${sentenceCaseSubjectName}ResponseBody
} from './${subjectName}.model'

/**
 * Represents the request body for adding ${answers.apiName} Info.
 */
export type Add${sentenceCaseSubjectName}Request = Zod.infer<typeof ${subjectName}Body>

/**
 * Represents the request body for updating ${answers.apiName} Info.
 */
export type Update${sentenceCaseSubjectName}Request = Zod.infer<
  typeof ${subjectName}Body
>

/**
 * Represents the response object returned by the Update ${answers.apiName} Info API.
 */
export type Update${sentenceCaseSubjectName}Response = Zod.infer<
  typeof Update${sentenceCaseSubjectName}ResponseBody
>

/**
 * Represents the response object returned by the Update ${answers.apiName} Info API.
 */
export type ${sentenceCaseSubjectName} = Zod.infer<typeof ${subjectName}Body>

export type ${sentenceCaseSubjectName}QueryParam = Zod.infer<
  typeof ${subjectName}QueryParam
>
  `
}

const routesContent = function (answers: Answers) {
  const subjectName = getCamelCaseSubjectName(answers.apiName)
  const sentenceCaseSubjectName = getSentenceCaseSubjectName(answers.apiName)

  return `
import { createRoute } from '@/shared/functions/http/routes.functions'

export const ${subjectName}BasePath = '/${answers.apiBasePath}'

export const ${subjectName}Routes = {
  ADD: createRoute(${subjectName}BasePath, '/add'),
  GET: createRoute(${subjectName}BasePath, '/get'),
  UPDATE: createRoute(${subjectName}BasePath, '/update'),
  DELETE: createRoute(${subjectName}BasePath, '/delete')
}
  `
}

// Step 3: File Creation Logic
async function createApiFiles(answers: Answers) {
  const baseName = getCamelCaseSubjectName(answers.apiName)
  const basePath = toCamelCase(answers.apiBasePath)
  const fileNames = [
    `${baseName}.controller.ts`,
    `${baseName}.middleware.ts`,
    `${baseName}.repository.ts`,
    `${baseName}.service.ts`,
    `${baseName}.docs.ts`,
    `${baseName}.model.ts`,
    `${baseName}.routes.ts`,
    `${baseName}.types.ts`,
    `${baseName}.dictionary.ts`
  ]

  const fileContents: { [key: string]: string } = {
    [`${baseName}.controller.ts`]: controllerContent(answers),
    [`${baseName}.middleware.ts`]: middlewareContent(answers),
    [`${baseName}.repository.ts`]: repositoryContent(answers),
    [`${baseName}.service.ts`]: serviceContent(answers),
    [`${baseName}.docs.ts`]: docsContent(answers),
    [`${baseName}.model.ts`]: modelContent(answers),
    [`${baseName}.routes.ts`]: routesContent(answers),
    [`${baseName}.types.ts`]: typesContent(answers),
    [`${baseName}.dictionary.ts`]: dictionaryContent(answers)
  }

  fileNames.forEach((fileName) => {
    const filePath = path.join('src', 'api', 'user', basePath, fileName)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    try {
      fs.writeFileSync(filePath, fileContents[fileName], 'utf8')
      console.log(`File ${fileName} written successfully`)
    } catch (error) {
      console.error(`Failed to write to file ${fileName}:`, error)
    }
  })

  // Update openAPIDocumentGenerator.ts
  const openApiDocPath = path.join('src', '__openApiDocs__', 'openAPIDocumentGenerator.ts')
  const newRegistryImport = `import { ${baseName}Registry } from '../api/user/${basePath}/${baseName}.docs';\n`
  const newRegistryEntry = `    ${baseName}Registry,\n`

  let openApiDocContent = fs.readFileSync(openApiDocPath, 'utf8')

  // Add import statement
  openApiDocContent = newRegistryImport + openApiDocContent

  // Add registry entry at the start of the array
  const registriesArrayStart = openApiDocContent.indexOf('const registries = [') + 'const registries = ['.length
  openApiDocContent =
    openApiDocContent.slice(0, registriesArrayStart) +
    '\n' +
    newRegistryEntry +
    openApiDocContent.slice(registriesArrayStart)

  // Ensure there's a comma at the end of the array
  const registriesArrayEnd = openApiDocContent.indexOf(']', registriesArrayStart)
  if (openApiDocContent[registriesArrayEnd - 1] !== ',') {
    openApiDocContent =
      openApiDocContent.slice(0, registriesArrayEnd) + ',' + openApiDocContent.slice(registriesArrayEnd)
  }

  fs.writeFileSync(openApiDocPath, openApiDocContent, 'utf8')
  console.log(`Updated ${openApiDocPath} with new registry`)

  // Update registerRoutes.functions.ts
  const registerRoutesPath = path.join('src', 'api', '__routes__', 'registerRoutes.functions.ts')
  const newRouterImport = `import { ${baseName}Router } from '../user/${basePath}/${baseName}.controller';\n`
  const newBasePathImport = `import { ${baseName}BasePath } from '../user/${basePath}/${baseName}.routes';\n`
  const newRouterEntry = `  app.use(withBasePath(${baseName}BasePath), ${baseName}Router);\n`

  let registerRoutesContent = fs.readFileSync(registerRoutesPath, 'utf8')

  // Add import statements
  registerRoutesContent = newRouterImport + newBasePathImport + registerRoutesContent

  // Add router entry at the top of the registerRoutes function
  const registerRoutesFunctionStart =
    registerRoutesContent.indexOf('export const registerRoutes = (app: Express): void => {') +
    'export const registerRoutes = (app: Express): void => {'.length
  registerRoutesContent =
    registerRoutesContent.slice(0, registerRoutesFunctionStart) +
    '\n' +
    newRouterEntry +
    registerRoutesContent.slice(registerRoutesFunctionStart)

  fs.writeFileSync(registerRoutesPath, registerRoutesContent, 'utf8')
  console.log(`Updated ${registerRoutesPath} with new router`)
}

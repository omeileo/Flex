/*
Zod is a schema creation and validation library for TypeScript. 
It is used to define the schema of the User object.
At the same time, it is extended with OpenAPI annotations.
So that the User object schema can be used to generate OpenAPI documentation.

https://zod.dev/?id=ip-addresses
*/
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const zodd = z

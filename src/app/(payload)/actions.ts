'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap'
import type { ServerFunctionArgs } from 'payload'

export const serverFunction = async function (args: ServerFunctionArgs) {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

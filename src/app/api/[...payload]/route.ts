import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import config from '../../../../payload.config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = REST_GET(config) as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = REST_POST(config) as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DELETE = REST_DELETE(config) as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PATCH = REST_PATCH(config) as any

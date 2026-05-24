import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next'

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.railway.app',
      },
    ],
  },
}

export default withPayload(nextConfig)

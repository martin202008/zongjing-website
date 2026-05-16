import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minimax-algeng-chat-tts.oss-cn-wulanchabu.aliyuncs.com',
      },
    ],
  },
}

export default nextConfig
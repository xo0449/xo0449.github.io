import type { NextConfig } from 'next'

// 사용자 사이트라 루트에 붙는다. basePath가 필요 없다.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig

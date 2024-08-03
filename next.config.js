/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
  },
  poweredByHeader: false,
}

if (process.env.NODE_ENV === 'production') {
  nextConfig.headers = async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self';
              style-src 'self';
              img-src 'self' https://storage.googleapis.com;
              connect-src 'self';
              font-src 'self';
              frame-ancestors 'self';
              form-action 'self';
              object-src 'none';
              base-uri 'self';
              frame-src 'self';
            `
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'ai-pennywise.vercel.app',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig

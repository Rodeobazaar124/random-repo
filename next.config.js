/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'backend-pkl.up.railway.app',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mzwgwhhcivsmswsgqgfw.supabase.co'
            }
        ]
    }
}

module.exports = nextConfig

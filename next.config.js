/** @type {import('next').NextConfig} */
const nextConfig =
{
    async rewrites() {
        return [
            {
                source: '/hello',
                destination: 'https://damasrv.fixip.org/greeting',
            },
        ]
    },
}


module.exports = nextConfig

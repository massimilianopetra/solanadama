/** @type {import('next').NextConfig} */
const nextConfig =
{
    async rewrites() {
        return [
            {
                source: '/api/connect',
                destination: 'https://damasrv.fixip.org/connect',
            },
            {
                source: '/api/confirmtransaction',
                destination: 'https://damasrv.fixip.org/confirmtransaction',
            },
            {
                source: '/api/sendtransaction',
                destination: 'https://damasrv.fixip.org/sendtransaction',
            },
            {
                source: '/api/sendtransactiondevnet',
                destination: 'https://damasrv.fixip.org/sendtransactiondevnet',
            },
        ]
    },
}


module.exports = nextConfig

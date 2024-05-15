/** @type {import('next').NextConfig} */
const nextConfig =
{
    async rewrites() {
        return [
            {
                source: '/connect',
                destination: 'https://damasrv.fixip.org/connect',
            },
            {
                source: '/confirmtransaction',
                destination: 'https://damasrv.fixip.org/confirmtransaction',
            },
            {
                source: '/sendtransaction',
                destination: 'https://damasrv.fixip.org/sendtransaction',
            },
            {
                source: '/sendtransactiondevnet',
                destination: 'https://damasrv.fixip.org/sendtransactiondevnet',
            },
        ]
    },
}


module.exports = nextConfig

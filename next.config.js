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
                source: '/api/confirmtransactiondevnet',
                destination: 'https://damasrv.fixip.org/confirmtransactiondevnet',
            },
            {
                source: '/api/sendtransaction',
                destination: 'https://damasrv.fixip.org/sendtransaction',
            },
            {
                source: '/api/sendtransactiondevnet',
                destination: 'https://damasrv.fixip.org/sendtransactiondevnet',
            },
            {
                source: '/api/sendemail',
                destination: 'https://damasrv.fixip.org/sendemail',
            },
        ]
    },
}


module.exports = nextConfig

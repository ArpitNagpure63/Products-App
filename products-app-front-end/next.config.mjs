/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: false,
            },
        ]
    },
    images: {
        domains: ['cdn.dummyjson.com']
    },
};

export default nextConfig;

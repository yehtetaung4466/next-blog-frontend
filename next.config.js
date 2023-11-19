/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        HOST: process.env.HOST,
    },
    images:{
        remotePatterns:[
            {
                hostname:process.env.HOST,
                // hostname:"localhost",
            }
        ]
    }
};

module.exports = nextConfig;

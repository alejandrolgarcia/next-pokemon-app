/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Esta configuracion nos permite usar imagenes de dominios de internet
    images: {
        domains:['raw.githubusercontent.com']
    }
}

module.exports = nextConfig

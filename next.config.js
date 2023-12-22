/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["tesseract.js", "pdf2json"]
    },
}

module.exports = nextConfig

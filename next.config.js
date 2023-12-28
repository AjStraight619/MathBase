const dynamic = require('next/dynamic');

const remarkMath = dynamic(() => import('remark-math'));
const rehypeKatex = dynamic(() => import('rehype-katex'));


const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["tesseract.js", "pdf2json"]
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
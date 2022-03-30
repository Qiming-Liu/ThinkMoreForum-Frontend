const path = require('path');
const removeImports = require('next-remove-imports')();

module.exports = removeImports({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  swcMinify: true,
  images: {
    domains: ['img.thinkmoreapp.com'],
  },
});

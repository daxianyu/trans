const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  webpack(config) {
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((one) => {
          if (
            one.use &&
            one.use.some(({ loader }) => loader.includes('sass-loader'))
          ) {
            one.use.forEach((l) => {
              if (l.loader && l.loader.includes('sass-loader')) {
                l.options = {
                  ...l.options,
                  url: false, // 💥 这里真正控制 sass-loader 不去处理 url()
                };
              }
            });
          }
        });
      }
    });
    return config;
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

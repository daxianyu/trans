const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  webpack(config) {
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((one) => {
          if (one.use) {
            const uses = Array.isArray(one.use) ? one.use : [one.use];
            uses.forEach((u) => {
              if (
                u.loader &&
                u.loader.includes('css-loader') &&
                u.options
              ) {
                u.options.url = false;
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

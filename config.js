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
            if (
              uses.some((u) =>
                typeof u.loader === 'string' && u.loader.includes('sass-loader')
              )
            ) {
              uses.forEach((l) => {
                if (
                  l &&
                  typeof l.loader === 'string' &&
                  l.loader.includes('sass-loader')
                ) {
                  l.options = {
                    ...l.options,
                    url: false,
                  };
                }
              });
            }
          }
        });
      }
    });

    return config;
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

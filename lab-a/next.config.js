const withSass = require('@zeit/next-sass')

module.exports = {
    publicRuntimeConfig: {
      localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
        ? process.env.LOCALE_SUBPATHS
        : 'none',
    },
    webpack: config => {
      config.resolve.mainFields = ["main", "browser", "module"];
      return config;
    },
}

module.exports = withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    }
})
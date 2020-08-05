const path = require('path')
module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        'alpheios-client-adapters$': path.join(__dirname, 'node_modules/alpheios-core/packages/client-adapters/dist/alpheios-client-adapters.min.js'),
        'alpheios-data-models$': path.join(__dirname, 'node_modules/alpheios-core/packages/data-models/dist/alpheios-data-models.min.js'),
        'alpheios-inflection-tables$': path.join(__dirname, 'node_modules/alpheios-core/packages/inflection-tables/dist/alpheios-inflection-tables.min.js'),
        'alpheios-l10n': path.join(__dirname, 'node_modules/alpheios-core/packages/l10n/dist/alpheios-l10n.min.js')
      }
    }
  },
  chainWebpack: config => {
    config
      .module
      .rule('csv')
      .test(/\.csv$/)
      .use('csv-loader')
      .loader('csv-loader')
      .options({
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      })
      .end()
  }
}

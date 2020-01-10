const webpack = require('webpack')
const webpackConfig = require('../scripts/webpack.config')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const options = {
  contentBase: path.resolve(process.cwd(), 'dist'),
  hot: true,
  host: '0.0.0.0'
}
WebpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, options)

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000')
})

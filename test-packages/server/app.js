const webpack = require('webpack')
const webpackConfig = require('../scripts/webpack.config')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const options = {
  contentBase: path.resolve(process.cwd(), 'dist'),
  hot: true,
  host: 'localhost'
}
WebpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, options)

server.listen(5005, 'localhost', () => {
  console.log('dev server listening on port 5005')
})

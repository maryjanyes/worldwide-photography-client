const webpackMerge = require('webpack-merge')
const webpackCommon = require('../webpack-common.config')

const mode = 'development'

const webpackDevConfig = webpackMerge.merge(webpackCommon(mode), {
    mode,
})

module.exports = webpackDevConfig

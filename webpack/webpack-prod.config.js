const webpackMerge = require('webpack-merge')
const webpackCommon = require('../webpack-common.config')

const mode = 'production'

const webpackDevConfig = webpackMerge.merge(webpackCommon(mode), {
    mode: 'production',
})

module.exports = webpackDevConfig

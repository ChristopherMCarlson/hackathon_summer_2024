const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/hackathon_summer_2024/'
  : '/'
}
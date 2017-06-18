const path = require('path');
const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]

export default {
  // "disableCSSModules": true,
  entry: "src/index.js",
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  proxy: {
    "/api": {
      "target": "http://localhost/PhalApi/Public",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  publicPath: "/",
  "env": {
      "development": {
        "extraBabelPlugins": [
          "dva-hmr",
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true }]
        ]
      },
      "production": {
        "extraBabelPlugins": [
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true}]
        ]
      }
  }
}

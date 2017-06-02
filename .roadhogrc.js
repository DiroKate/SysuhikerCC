const path = require('path');

export default {
  // "disableCSSModules": true,
  "entry": "src/index.js",
  "theme": {
    "@primary-color": "#1DA57A",
    "@link-color": "#1DA57A",
    // "@icon-url": '"/iconfont/iconfont"',
  },
  "proxy": {
    "/api": {
      "target": "http://localhost/PhalApi/Public",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        [
          "import",
          {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime"
      ]
    }
  }
}

'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
     
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    
    proxyTable: {
      // 需求侧预测---exportData
     '/exportCsv': {
      target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
        '^/exportCsv': '/exportCsv'
      }
    },
       // 获取站点
       '/getSites': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/getSites': '/getSites'
        }
      },
      // 主动运维平台---card
      '/card': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/card': '/card'
        }
      },
      // 主动运维平台---table
      '/table': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/table': '/table'
        }
      },
      // 主动运维平台---userPowerPie
      '/usePower': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/usePower': '/usePower'
        }
      },
      // 主动运维平台---sendPowerPie
      '/sendPower': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/sendPower': '/sendPower'
        }
      },
      // 需求侧预测---card
      '/card/forecast': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/card/forecast': '/card/forecast'
        }
      },
      // 需求侧预测---chartLine---实际预测4条线
      '/chart/real/forecast': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chart/real/forecast': '/chart/real/forecast'
        }
      },
      // 需求侧预测---chartLine---现在到未来的1条线
      '/chart/now/forecast': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chart/now/forecast': '/chart/now/forecast'
        }
      },
      // 需求侧预测---chartLine---未来到未来的1条线
      '/chart/future/forecast': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chart/future/forecast': '/chart/future/forecast'
        }
      },
      // 日前调度---调度发电量---card
      '/card/beforeDay': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/card/beforeDay': '/card/beforeDay'
        }
      },
      // 日前调度---调度发电量---charBar
      '/chartBar/beforeDay': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chartBar/beforeDay': '/chartBar/beforeDay'
        }
      },
      // 日前调度---调度发电量---chartLine
      '/chartLine/beforeDay': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chartLine/beforeDay': '/chartLine/beforeDay'
        }
      },
      // 日前监控---调度发电量---card
      '/card/today': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/card/today': '/card/today'
        }
      },
      // 日前监控---调度发电量---charBar
      '/chartBar/today': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chartBar/today': '/chartBar/today'
        }
      },
      // 日前监控---调度发电量---chartLine
      '/chartLine/today': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chartLine/today': '/chartLine/today'
        }
      },
      // 日前调度和日内监控---价格
      '/price': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/price': '/price'
        }
      },
      // 日前调度和日内监控---小时明细---card---价格进入 和 上方进入 /2018-09-07 00:00/2018-09-07 01:00
      '/card/hourlyDetails/price': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/card/hourlyDetails/price': '/card/hourlyDetails/price'
        }
      },
      // 日前调度和日内监控---小时明细---charCustom
      '/hourlyDetails/bar': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/hourlyDetails/bar': '/hourlyDetails/bar'
        }
      },
      // 日前调度和日内监控---小时明细---solarLine
      '/chartLine/solar/now': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chartLine/solar/now': '/chartLine/solar/now'
        }
      },
      // 日前调度和日内监控---小时明细---storageLine
      '/chartLine/store/now': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chartLine/store/now': '/chartLine/store/now'
        }
      },
      // 日前调度和日内监控---小时明细---powerGridLine
      '/chartLine/powerGrid/now': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/chartLine/powerGrid/now': '/chartLine/powerGrid/now'
        }
      },
      // 历史查询---card
      '/card/history': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/card/history': '/card/history'
        }
      },
      // 历史查询---太阳能资产---card
      '/cardSun': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/cardSun': '/cardSun'
        }
      },
      // 历史查询---储能资产---card
      '/cardStorage': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/cardStorage': '/cardStorage'
        }
      },
      // 历史查询---太阳能资产---table
      '/tableSun': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/tableSun': '/tableSun'
        }
      },
      // 历史查询---储能资产---table
      '/tableStorage': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/tableStorage': '/tableStorage'
        }
      },
      // 历史查询---太阳能资产---table---tableLine type: income price powerQuantity
      '/sunLine': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/sunLine': '/sunLine'
        }
      },
      // 历史查询---储能资产---table---tableLine   type: income cycle
      '/storageLine': {
        target: 'http://18.130.150.184:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/storageLine': '/storageLine'
        }
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

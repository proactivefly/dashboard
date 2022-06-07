const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ISPROD = process.env.NODE_ENV === 'production';
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  lintOnSave: false,
  assetsDir: 'static',
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('#', resolve('types'));
  },
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });
    if (ISPROD) {
      config.mode = 'production';
      // 开启gzip压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.ts$|\.html$|\.json$|\.css/,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `${packageName.replace('@', '')}`;
              }
            }
          }
        },
        minimizer: [
          new UglifyPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_console: true, // console
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            }
          })
        ]
      };
      // 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 50000000,
        maxAssetSize: 30000000,
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.ts');
        }
      };
    } else {
      config.mode = 'development';
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `${packageName.replace('@', '')}`;
              }
            }
          }
        }
      };
    }
  },
  css: {
    requireModuleExtension: true,
    extract: false, // 与css hot conflet
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style/index.scss";`
      }
    }
  },
  devServer: {
    port: 8080,
    open: true,
    hotOnly: true,
    proxy: {
      '^/statistics': {
        target: 'http://360-estimate-uat.mapfarm.com/',
        changeOrigin: true
      }
    }
  }
};

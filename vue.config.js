const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置别名
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
  },
  //2.配置跨域
  devServer:{
    //设置代理
    proxy:{
      "/api":{
        // target用于配置你允许访问数据的计算机名称，即是你的api接口的服务器地址
        target: 'https://thegraph.com',
        ws:true,//启用webSocket
        changeOrigin:true,//开启代理跨域
        pathRewrite:{
          '^/api':""
        }
      }
    }
  }
}

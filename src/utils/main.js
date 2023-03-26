import Vue from 'vue'
import copy from './modules/copy.js'
// 方式1
const files = require.context('./modules', false, /.+\.js$/)
// 按模块引入
// files.keys(): 打印出来为['./focus.js','/loadmore.js']
files.keys().forEach(fileName => {
  const directiveConfig = files(fileName) // 获取指令函数
  const directiveName = fileName // 获取指令名
    .replace(/^\.\//, '') // 去除开头的'./'
    .replace(/\.\w+$/, '') // 去除文件扩展名
  Vue.directive(directiveName, directiveConfig.default || directiveConfig)
})


// 方式2
// Vue.directive('copy', copy)

import Vue from 'vue'
import  VueI18n  from 'vue-i18n'
import Moment from 'moment'
import { Locale } from 'vant'

// 引入组件的语言包
import zhCN from 'vant/es/locale/lang/zh-CN'
import enUS from 'vant/es/locale/lang/en-US'
// 引入业务自定义的语言包
const localCN = require('./zh.json') // 简体
const localUS = require('./en.json') // English
// 在这里引入moment了，所以不在main.js引入了
Vue.prototype.$moment = Moment
Vue.use(VueI18n);
// 语言包的类型合并
const messages = {
  'zh_CN': { ...zhCN, ...localCN },
  'en_US': { ...enUS, ...localUS }
}
console.log('messages=',messages)
// localStorage获取当前语言类型(初次本地不存在'lang'字段存储，默认设置为'zh_CN')
const lang = localStorage.getItem('lang') || 'zh_CN'
console.log('初始语言类型', lang);

// 初次加载的语言默认设置
Locale.use(lang, messages[lang])
// 时间类moment语言默认设置
Moment.locale(lang)

export default new VueI18n({
  locale: lang, // set locale 
  messages: messages // set locale messages
});

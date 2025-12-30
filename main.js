/**
 * 应用入口文件
 * 根据 Vue 版本选择不同的初始化方式
 */
import App from './App' // 导入根组件

// #ifndef VUE3
// Vue2 版本的初始化
import Vue from 'vue' // 导入 Vue2
// 引入 Promise 适配器，使 uni-app API 支持 Promise
import './uni.promisify.adaptor'
// 关闭生产环境提示
Vue.config.productionTip = false
// 设置应用类型为小程序
App.mpType = 'app'
// 创建 Vue 实例
const app = new Vue({
	...App // 展开根组件配置
})
// 挂载应用
app.$mount()
// #endif

// #ifdef VUE3
// Vue3 版本的初始化（支持 SSR）
import {
	createSSRApp
} from 'vue' // 导入 Vue3 SSR 创建函数
//创建应用实例
export function createApp() {
	// 创建 SSR 应用实例
	const app = createSSRApp(App)
	return {
		app // 返回应用实例
	}
}
// #endif
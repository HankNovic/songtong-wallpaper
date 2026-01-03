/**
 * 网络请求封装工具
 * 统一处理 API 请求、错误处理和请求头配置
 */

// 导入 API 配置
import apiConfig from './config.js'

// API 基础地址
// 默认给小程序 / App：必须是绝对地址
let BASE_URL = 'https://tea.qingnian8.com/api/bizhi'

// 仅 H5：走同源代理，避免 CORS
// 为了解决跨域，统一走同源代理+vite代理（本地/线上都一致）
/* #ifdef H5 */
BASE_URL = '/api/bizhi'
/* #endif */


// 发送网络请求
export function request(config = {}) {
	// 解构配置参数，设置默认值
	let {
		url, // 请求路径（相对路径）
		data = {}, // 请求参数，默认为空对象
		method = "GET", // 请求方法，默认为GET
		header = {} // 请求头，默认为空对象
	} = config

	// 拼接完整的请求 URL
	url = BASE_URL + url
	// 添加访问密钥到请求头（从配置文件读取）
	header['access-key'] = apiConfig.accessKey

	// 返回 Promise 对象，封装 uni.request
	return new Promise((resolve, reject) => {
		uni.request({
			url, // 完整请求URL
			data, // 请求参数
			method, // 请求方法
			header, // 请求头
			success: res => {
				// 成功响应，根据错误码处理
				if (res.data.errCode === 0) {
					// 请求成功，返回数据
					resolve(res.data)
				} else if (res.data.errCode === 400) {
					// 错误码 400，显示模态对话框提示
					uni.showModal({
						title: "错误提示",
						content: res.data.errMsg,
						showCancel: false
					})
					reject(res.data)
				} else {
					// 其他错误码，显示 Toast 提示
					uni.showToast({
						title: res.data.errMsg,
						icon: "none"
					})
					reject(res.data)
				}
			},
			fail: err => {
				// 请求失败（网络错误等），reject错误信息
				reject(err)
			}
		})
	})
}
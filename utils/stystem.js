/**
 * 系统信息工具函数
 * 用于获取不同平台下的状态栏、导航栏等系统信息
 */

// 同步获取窗口信息，用于获取系统信息
// 微信小程序使用 getWindowInfo API
// #ifdef MP-WEIXIN
const WINDOW_INFO = uni.getWindowInfo()
// #endif
// 其他平台使用 getSystemInfoSync API
// #ifndef MP-WEIXIN
const WINDOW_INFO = uni.getSystemInfoSync()
// #endif

// 获取状态栏高度
export const getStatusBarHeight = () => WINDOW_INFO.statusBarHeight || 10

/**
 * 获取标题栏（胶囊按钮区域）高度
 * 计算方式：胶囊按钮高度 + 上下间距（胶囊按钮顶部到状态栏底部的距离 * 2）
 */
export const getTitleBarHeight = () => {
	// 判断是否支持获取胶囊按钮位置信息
	if (uni.getMenuButtonBoundingClientRect) {
		// 小程序平台：获取胶囊按钮的位置信息
		let {
			top, // 胶囊按钮顶部距离屏幕顶部的距离
			height // 胶囊按钮的高度
		} = uni.getMenuButtonBoundingClientRect()
		// 标题栏高度 = 胶囊按钮高度 + 上下间距（胶囊按钮顶部到状态栏底部的距离 * 2）
		return height + (top - getStatusBarHeight()) * 2
	} else {
		// H5 平台：返回固定值 40px
		return 40
	}
}

/**
 * 获取返回按钮的位置和高度信息
 * 用于自定义导航栏中返回按钮的定位
 */
export const getGobackHeight = () => {
	// 判断是否支持获取胶囊按钮位置信息
	if (uni.getMenuButtonBoundingClientRect) {
		// 小程序平台：使用胶囊按钮的位置信息作为返回按钮位置
		const {
			top, // 返回按钮顶部距离屏幕顶部的距离
			height // 返回按钮的高度
		} = uni.getMenuButtonBoundingClientRect()
		return {
			top,
			height
		}
	} else {
		// H5 平台：返回固定值
		return {
			top: 32, // 顶部距离
			height: 32 // 高度
		}
	}
}

// 获取导航栏总高度（状态栏 + 标题栏）
export const getNavBarHeight = () => getTitleBarHeight() + getStatusBarHeight()

/**
 * 获取左侧图标（Logo）的宽度
 * 用于适配抖音小程序左侧 Logo 的占位
 */
export const getLeftIcon = () => {
	// #ifdef MP-TOUTIAO
	// 抖音小程序：获取自定义按钮（Logo）的位置信息
	const {
		leftIcon: {
			left, // Logo 左侧距离屏幕左侧的距离
			width // Logo 的宽度
		}
	} = tt.getCustomButtonBoundingClientRect()
	// 返回 Logo 右侧的位置（用于设置标题栏的左边距，避免被Logo遮挡）
	return left + parseInt(width)
	// #endif

	// #ifndef MP-TOUTIAO
	// 其他平台：返回 0，不需要左边距
	return 0
	// #endif
}
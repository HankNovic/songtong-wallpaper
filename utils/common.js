// 通用工具函数
// 比较时间戳，返回相对时间描述
export function compareTimestamp(timestamp) {
	// 获取当前时间戳（毫秒）
	const currentTime = new Date().getTime();
	// 计算时间差（毫秒）
	const timeDiff = currentTime - timestamp;

	// 判断时间差范围并返回对应的相对时间描述
	// 1分钟内
	if (timeDiff < 60000) {
		return '1分钟内';
	}
	// 1小时内，返回分钟数
	else if (timeDiff < 3600000) {
		return Math.floor(timeDiff / 60000) + '分钟';
	}
	// 1天内，返回小时数
	else if (timeDiff < 86400000) {
		return Math.floor(timeDiff / 3600000) + '小时';
	}
	// 30天内，返回天数
	else if (timeDiff < 2592000000) {
		return Math.floor(timeDiff / 86400000) + '天';
	}
	// 90天内，返回月数
	else if (timeDiff < 7776000000) {
		return Math.floor(timeDiff / 2592000000) + '月';
	}
	// 超过90天，返回"很久"
	else {
		return "很久";
	}
}

// 缺少必要参数时展示
export function goToHome() {
	uni.showModal({
		title: "提示",
		content: "页面有误将返回首页",
		showCancel: false,
		success: (res) => {
			if (res.confirm) {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
		}
	})
}
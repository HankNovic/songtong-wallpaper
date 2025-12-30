/**
 * API 接口文件
 * 封装所有与后端交互的接口请求
 */
import {
	request
} from "@/utils/request.js"


import {
	wallNewsListMock,
	wallNewsDetailMockA,
	wallNewsDetailMockB,
	wallNewsDetailMockC,
	wallNewsDetailMockD,
} from "./mock";

// 是否拦截并采用写死数据
const USE_MOCK = true

// 模拟 request 行为（保持异步）
function mockRequest(res, delay = 150) {
	return new Promise(resolve => {
		setTimeout(() => resolve(res), delay);
	});
}

// 获取首页轮播图数据
export function apiGetBannr() {
	// 调用请求函数，获取首页轮播图数据
	return request({
		url: "/homeBanner" // 轮播图接口路径
	})
}

// 获取每日随机壁纸
export function apiGetDayRandom() {
	// 调用请求函数，获取每日随机壁纸
	return request({
		url: "/randomWall" // 随机壁纸接口路径
	})
}


// 获取分类中的壁纸列表
export function apiGetClassList(data = {}) {
	// 调用请求函数，获取分类下的壁纸列表
	return request({
		url: "/wallList", // 壁纸列表接口路径
		data
	})
}

// 获取分类列表
export function apiGetclassify(data = {}) {
	// 调用请求函数，获取分类列表
	return request({
		url: "/classify", // 分类列表接口路径
		data
	})
}


// 为壁纸评分
export function apiGetSetupScore(data = {}) {
	return request({
		url: "/setupScore",
		data
	})
}

// 获取壁纸下载记录
export function apiWriteDownload(data = {}) {
	return request({
		url: "/downloadWall",
		data
	})
}

// 获取单张壁纸详情
export function apiDetailWall(data = {}) {
	return request({
		url: "/detailWall",
		data
	})
}

// 获取用户个人信息
export function apiUserInfo(data = {}) {
	return request({
		url: "/userInfo",
		data
	})
}

// 获取我的评分/下载列表
export function apiGetHistoryList(data = {}) {
	return request({
		url: "/userWallList",
		data
	})
}

// 获取公告列表
export function apiGetNotice(data = {}) {

	if (USE_MOCK) {
		return mockRequest(wallNewsListMock);
	}

	// 调用请求函数，获取公告列表
	return request({
		url: "/wallNewsList", // 公告列表接口路径
		data
	})
}


// 获取壁纸资讯公告详情
export function apiNoticeDetail(data = {}) {
	if (USE_MOCK) {
		// 将需要根据 id 返回不同内容，在这里判断
		if (data.id === '65360ea7bd0220d7635bd34b') return mockRequest(wallNewsDetailMockA)
		if (data.id === '653507c6466d417a3718e94b') return mockRequest(wallNewsDetailMockB)
		if (data.id === '6536358ce0ec19c8d67fbe82') return mockRequest(wallNewsDetailMockC)
		if (data.id === '65361e318b0da4ca084e3ce0') return mockRequest(wallNewsDetailMockD)
		// return mockRequest(noticeDetailMock);
	}

	return request({
		url: "/wallNewsDetail",
		data
	})
}

// 搜索壁纸
export function apiSearchData(data = {}) {
	return request({
		url: "/searchWall",
		data
	})
}
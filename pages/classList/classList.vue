<template>
	<!-- 分类列表页面容器 -->
	<view class="classList">
		<!-- 加载状态盒子 -->
		<view class="loadingBox" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<!-- 壁纸网格列表 -->
		<view class="content">
			<navigator class="item" v-for="(item,index) in classList" :key="item._id"
				:url="'/pages/preview/preview?id=' + item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<!-- 数据状态盒子 -->
		<view class="loadingBox" v-if="classList.length || noData">
			<uni-load-more :status="noData ? 'no-more':'loading'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
	// 导入获取分类壁纸列表API
	import {
		apiGetClassList, // 获取分类下的壁纸列表接口
		apiGetHistoryList
	} from '@/api/apis.js'
	import {
		goToHome
	} from '@/utils/common.js'

	// 壁纸列表数据
	const classList = ref([])
	// 定义查询参数对象 data
	const queryParams = {
		pageNum: 1,
		pageSize: 12
	}
	const noData = ref(false)
	let pageName

	// 页面加载时触发。接收分类ID和名称参数，设置导航栏标题并获取壁纸列表
	onLoad(({
		id,
		name,
		type
	}) => {
		// 解构获取路由参数
		// console.log(id, name);

		// 设置查询参数中的类型
		if (type) queryParams.type = type
		// 设置查询参数中的分类ID
		if (id) queryParams.classid = id
		// 缺失关键参数操作
		if (!id && !type) {
			goToHome("页面参数有误")
			return
		}

		pageName = name
		// 设置导航栏标题为分类名称
		uni.setNavigationBarTitle({
			title: name
		})

		// 获取该分类下的壁纸列表
		getClassList()
	})

	// 触底函数
	onReachBottom(() => {
		// console.log("触底了");
		if (noData.value) return
		queryParams.pageNum++
		getClassList()
	})

	// 下拉刷新
	onPullDownRefresh(() => {
		// console.log("下拉刷新了");
		classList.value = []
		getClassList()
		uni.stopPullDownRefresh()
	})


	// 获取壁纸列表
	const getClassList = async () => {
		let res
		// 根据关键参数进行分支调用 api
		if (queryParams.classid) res = await apiGetClassList(queryParams)
		if (queryParams.type) res = await apiGetHistoryList(queryParams)

		// console.log(res.data);
		if (queryParams.pageSize > res.data.length) noData.value = true
		classList.value = [...classList.value, ...res.data]
		// 缓存数据。只有一条，所以用的同步函数，方便
		uni.setStorageSync("storageClassList", classList.value)
		// console.log(classList.value.length);
	}


	// 右上角分享给盆友
	onShareAppMessage((e) => {
		return {
			title: "松桐壁纸 - " + pageName,
			path: "/pages/classList/classList?id=" + queryParams.classid + "&name=" + pageName
		}
	})

	// 右上角分享朋友圈
	onShareTimeline(() => {
		return {
			title: "松桐壁纸 - " + pageName,
			query: "id=" + queryParams.classid + "&name=" + pageName,
			imageUrl: '/static/images/logo2.png'
		}
	})

	// 销毁当前界面,清除缓存
	onUnload(() => {
		uni.removeStorageSync("storageClassList")
	})
</script>

<style lang="scss" scoped>
	.classList {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 5rpx;

			.item {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>
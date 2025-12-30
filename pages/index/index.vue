<template>
	<!-- 首页布局容器 -->
	<view class="homeLayout pageBg">
		<!-- 自定义导航栏 -->
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<!-- 轮播图区域 -->
		<view class="banner">
			<swiper circular autoplay indicator-dots indicator-active-color="#fff"
				indicator-color="rgba(255, 255, 255, .5)">
				<swiper-item v-for="(item,index) in bannerList" :key="item._id">
					<navigator v-if="item.target == 'miniProgram'" :app-id="item.appid" target="miniProgram"
						:url="item.url" class="link">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					<navigator v-else :url="`/pages/classList/classList?${item.url}`" class="link">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告区域 -->
		<view class="notice">
			<!-- 公告图标和文字 -->
			<view class="left">
				<uni-icons type="sound-filled" size="18"></uni-icons>
				<view class="text">
					公告
				</view>
			</view>
			<!-- 公告内容滚动区域 -->
			<view class="center">
				<swiper autoplay interval="4000" duration="300" vertical>
					<swiper-item v-for="(item,index) in noticeList" :key="item._id" @click="goNotice(item._id)">
						{{item.title}}
					</swiper-item>
				</swiper>
			</view>
			<!-- 右侧箭头 -->
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>

		<!-- 每日推荐区域 -->
		<view class="select">
			<common-title>
				<template #name>
					每日推荐
				</template>
				<template #custom>
					<!-- 显示当前日期 -->
					<view class="date">
						<uni-icons type="calendar" size="20"></uni-icons>
						<uni-dateformat :date="Date.now()" format="dd号"></uni-dateformat>
					</view>
				</template>
			</common-title>
			<!-- 每日推荐壁纸横向滚动列表 -->
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="(item,index) in randomList" :key="item._id" @click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 专题精选区域 -->
		<view class="theme">
			<common-title>

				<template #name>专题精选</template>
				<template #custom>
					<!-- 更多链接 -->
					<navigator class="more" url="/pages/classify/classify" open-type="reLaunch">More</navigator>
				</template>

			</common-title>

			<!-- 专题网格列表 -->
			<view class="content">
				<theme-item v-for="(item,index) in classifyList" :key="item._id" :item="item"></theme-item>
				<!-- 更多按钮 -->
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	// 导入API接口函数
	import {
		apiGetBannr, // 获取首页轮播图
		apiGetDayRandom, // 获取每日随机壁纸
		apiGetNotice, // 获取公告列表
		apiGetclassify // 获取分类列表
	} from '@/api/apis.js'

	// 轮播图列表数据
	const bannerList = ref([])
	// 每日随机壁纸列表数据
	const randomList = ref([])
	// 公告列表数据
	const noticeList = ref([])
	// 分类列表数据（专题精选）
	const classifyList = ref([])

	// 获取首页轮播图数据
	const getBannr = async () => {
		let res = await apiGetBannr()
		bannerList.value = res.data
	}

	// 获取每日随机壁纸
	const getDayRandom = async () => {
		let res = await apiGetDayRandom()
		randomList.value = res.data
	}

	// 获取公告列表（仅获取置顶公告）
	const getNotice = async () => {
		let res = await apiGetNotice({
			select: true
		})
		noticeList.value = res.data
		// console.log(res.data)
	}

	// 获取分类列表（仅获取精选分类）
	const getClassify = async () => {
		let res = await apiGetclassify({
			select: true
		})
		classifyList.value = res.data
		// console.log(res.data)
	}

	// 跳转到公告详情页
	function goNotice(id) {
		uni.navigateTo({
			url: "/pages/notice/detail?id=" + id + "&name=公告详情"
		})
	}

	// 跳转到每日推荐的详情页
	function goPreview(id) {
		uni.setStorageSync("storageClassList", randomList.value)
		uni.navigateTo({
			url: "/pages/preview/preview?id=" + id
		})
	}

	// 右上角分享给盆友
	onShareAppMessage((e) => {
		return {
			title: "松桐壁纸，精选分类",
			path: "/pages/classify/classify"
		}
	})

	// 右上角分享朋友圈
	onShareTimeline(() => {
		return {
			title: "松桐壁纸，好看的手机壁纸",
			imageUrl: '/static/images/logo2.png'
		}
	})


	// 页面加载时获取所有数据
	getBannr() // 获取轮播图
	getDayRandom() // 获取每日推荐
	getNotice() // 获取公告
	getClassify() // 获取专题精选
</script>

<style lang="scss" scoped>
	.homeLayout {
		// background-color: pink;

		// min-height: 20rpx;
		// border: 1px solid black;
		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 750rpx;
				height: 340rpx;

				swiper-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;

					.link {
						width: 100%;
						height: 100%;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}

				}
			}
		}

		.notice {
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #f9f9f9;
			margin: 0 auto;
			border-radius: 80rpx;
			display: flex;

			.left {
				width: 140rpx;
				// 弹性布局排列
				display: flex;
				// 水平居中 justify（主轴）
				justify-content: center;
				// 垂直居中 align (交叉轴)
				align-items: center;

				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}

				.text {
					color: $brand-theme-color;
					font-weight: 600;
					font-size: 28rpx;
				}
			}

			.center {
				flex: 1;

				swiper {
					height: 100%;

					&-item {
						height: 100%;
						font-size: 30rpx;
						color: #666;
						overflow: hidden;
						// 使内容不换行
						white-space: nowrap;
						// 当内容太长时，显示成省略号（…）
						text-overflow: ellipsis;
					}
				}
			}

			.right {
				width: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		// 每日推荐
		.select {
			padding-top: 50rpx;

			.content {
				width: 720rpx;
				margin-top: 30rpx;
				margin-left: 30rpx;

				scroll-view {
					white-space: nowrap;

					.box {
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;


						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;

						}
					}

					.box:last-child {
						margin-right: 30rpx;
					}
				}
			}

			.date {
				display: flex;
				align-items: center;
				color: $brand-theme-color;

				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}
			}


		}

		// 专题精选
		.theme {
			padding: 50rpx 0;

			.more {
				color: #888;
				font-size: 30rpx;
			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>
<template>
	<!-- 公告详情页面容器 -->
	<view class="detailLayout" v-if="detail">
		<!-- 标题区域 -->
		<view class="title">
			<!-- 置顶标签 -->
			<view class="tag" v-if="detail.select">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<!-- 标题文字 -->
			<view class="font">{{detail.title}}</view>
		</view>

		<!-- 信息区域（发布者、发布时间） -->
		<view class="info">
			<!-- 发布者 -->
			<view class="item">{{detail.author}}</view>
			<!-- 发布时间 -->
			<view class="item">
				<uni-dateformat :date="detail.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>

		<!-- 公告内容区域 -->
		<view class="content">
			<mp-html :content="detail.content" />
			<!-- <rich-text :nodes="detail.content"></rich-text> -->
		</view>

		<!-- 阅读量显示 -->
		<view class="count">
			阅读 {{detail.view_count}}
		</view>
	</view>
</template>

<script setup>
	import {
		apiNoticeDetail
	} from '@/api/apis.js'

	const detail = ref(null)
	let noticeId
	let pageName

	onLoad(({
		id,
		name
	}) => {
		if (name) {
			uni.setNavigationBarTitle({
				title: name
			})
		}
		noticeId = id
		pageName = name
		getNoticeDetail()
	})

	// 获取壁纸资讯公告详情
	const getNoticeDetail = async () => {
		let res = await apiNoticeDetail({
			id: noticeId
		})
		detail.value = res.data
		// console.log(detail.value);
	}

	// 右上角分享给盆友
	onShareAppMessage((e) => {
		return {
			title: "松桐壁纸 - " + pageName,
			path: "/pages/notice/detail?id=" + noticeId + "&name=" + pageName
		}
	})

	// 右上角分享朋友圈
	onShareTimeline(() => {
		return {
			title: "松桐壁纸 - " + pageName,
			query: "id=" + noticeId + "&name=" + pageName,
			imageUrl: '/static/images/logo2.png'
		}
	})
</script>

<style lang="scss" scoped>
	.detailLayout {
		padding: 30rpx;

		.title {
			font-size: 40rpx;
			color: #111;
			line-height: 1.6em;
			padding-bottom: 30rpx;
			display: flex;

			.tag {
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;
			}

			.font {
				padding-left: 6rpx;
			}
		}

		.info {
			display: flex;
			align-items: center;
			color: #999;
			font-size: 28rpx;

			.item {
				padding-right: 20rpx;
			}
		}

		.content {
			padding: 50rpx 0;
		}

		.count {
			color: #999;
			font-size: 28rpx;
		}
	}
</style>
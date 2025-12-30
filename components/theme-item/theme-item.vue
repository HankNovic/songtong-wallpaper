<template>
	<!-- 主题项容器 -->
	<view class="theme-item">
		<!-- 普通分类项，点击跳转到分类列表页 -->
		<navigator class="box" :url="'/pages/classList/classList?id=' + item._id + '&name=' + item.name" v-if="!isMore">
			<!-- 分类封面图 -->
			<image :src="item.picurl" mode="aspectFill"></image>
			<!-- 底部遮罩层，显示分类名称 -->
			<view class="mask">
				{{item.name}}
			</view>
			<!-- 更新时间标签 -->
			<view class="tab">
				{{compareTimestamp(item.updateTime)}}前更新
			</view>
		</navigator>

		<!-- "更多"按钮，点击跳转到分类页面 -->
		<navigator class="box more" url="/pages/classify/classify" open-type="reLaunch" v-if="isMore">
			<!-- 更多按钮背景图 -->
			<image src="/common/images/preview1.jpg" mode="aspectFill"></image>
			<!-- 遮罩层，显示更多图标和文字 -->
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">
					更多
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	// 导入时间比较工具函数
	import {
		compareTimestamp // 比较时间戳，返回相对时间描述
	} from "@/utils/common.js"

	defineProps({
		isMore: {
			type: Boolean,
			default: false
		},
		item: {
			type: Object,
			default () {
				return {
					name: "默认名称",
					picurl: "/common/images/preview1.jpg",
					updateTime: Date.now() - 1000 * 60 * 60 * 5
				}
			}
		}
	})

	// console.log(item.updateTime);
</script>

<style lang="scss" scoped>
	.theme-item {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			image {
				width: 100%;
				height: 100%;
			}

			.mask {
				height: 70rpx;
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, .2);
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				backdrop-filter: blur(20rpx);
				font-weight: 600;
				font-size: 30rpx;
			}

			.tab {
				position: absolute;
				left: 0;
				top: 0;
				background-color: rgba(250, 129, 90, 0.7);
				backdrop-filter: blur(20rpx);
				color: #fff;
				font-size: 22rpx;
				padding: 6rpx 14rpx;
				border-radius: 0 0 20rpx 0;
				transform: scale(.8);
				transform-origin: left top;
			}
		}

		.box.more {
			.mask {
				width: 100%;
				height: 100%;
				flex-direction: column;
			}

			.text {
				font-size: 28rpx
			}
		}
	}
</style>
<template>
	<!-- 自定义导航栏容器 -->
	<view class="custom-nav-bar">
		<!-- 导航栏固定定位区域 -->
		<view class="navbar">
			<!-- 状态栏占位区域 -->
			<view class="statusBar" :style="{height:getStatusBarHeight() + 'px'}"></view>
			<!-- 标题栏区域，包含标题和搜索按钮 -->
			<view class="titleBar" :style="{height: getTitleBarHeight() + 'px',marginLeft:getLeftIcon() + 'px'}">
				<!-- 导航栏标题 -->
				<view class="title">{{title}}</view>
				<!-- 搜索入口 -->
				<navigator url="/pages/search/search" class="search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		<!-- 导航栏占位填充区域，防止内容被遮挡 -->
		<view class="fill" :style="{height:getNavBarHeight() + 'px'}">
			<!-- 填充占位 -->
		</view>
	</view>
</template>

<script setup>
	/**
	 * 自定义导航栏组件
	 * 适配不同平台的状态栏和标题栏高度，支持自定义标题和搜索功能
	 */
	// 导入系统信息工具函数
	import {
		getStatusBarHeight, // 获取状态栏高度
		getNavBarHeight, // 获取导航栏总高度
		getTitleBarHeight, // 获取标题栏高度
		getLeftIcon // 获取左侧图标宽度
	} from "@/utils/stystem.js"

	// console.log(getStatusBarHeight());
	// console.log(getTitleBarHeight());

	/**
	 * 组件属性定义
	 * @property {String} title - 导航栏标题，默认为"壁纸"
	 */
	defineProps({
		title: {
			type: String,
			default: "壁纸"
		}
	})
</script>

<style lang="scss" scoped>
	.custom-nav-bar {
		.navbar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			background:
				linear-gradient(to bottom, transparent, #fff 400rpx),
				linear-gradient(to right, #beecd8 20%, #f4e2d8);

			.statusBar {
				// border: solid 1px red;
			}

			.titleBar {
				display: flex;
				align-items: center;
				padding: 0 30rpx;
				// border: 1px solid green;

				.title {
					font-size: 42rpx;
					font-weight: 700;
					color: $text-font-color-1;
				}

				.search {
					width: 220rpx;
					height: 50rpx;
					border-radius: 60rpx;
					background: rgba(255, 255, 255, 0.4);
					border: 1rpx solid #fff;
					margin-left: 30rpx;
					color: #999;
					font-size: 28rpx;
					display: flex;
					align-items: center;

					.icon {
						padding-left: 10rpx;
					}

					.text {
						padding-left: 10rpx;
					}
				}
			}


		}

		.fill {}
	}
</style>
<template>
	<!-- 用户中心页面容器 -->
	<view class="userLayout pageBg" v-if="userInfo">
		<view :style="{height:getNavBarHeight() + 'px'}"></view>
		<!-- 用户信息区域 -->
		<view class="userInfo">
			<!-- 用户头像 -->
			<view class="avatar">
				<image src="/static/images/logo2.png" mode="aspectFill"></image>
			</view>
			<!-- 用户IP显示 -->
			<view class="ip">
				{{userInfo.IP}}
			</view>
			<!-- 用户地址显示 -->
			<view class="address">
				来自于：{{userInfo.address.city || userInfo.address.province || userInfo.address.country}}
			</view>
		</view>
		<!-- 功能列表区域 -->
		<view class="section">
			<view class="list">
				<!-- 我的下载入口 -->
				<navigator url="/pages/classList/classList?name=我的下载&type=download">
					<view class="row">
						<view class="left">
							<uni-icons type="star-filled" size="20"></uni-icons>
							<view class="text">
								我的下载
							</view>
						</view>
						<view class="right">
							<view class="text">
								{{userInfo.downloadSize}}
							</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>

				<!-- 我的评分入口 -->
				<navigator url="/pages/classList/classList?name=我的评分&type=score">
					<view class="row">
						<view class="left">
							<uni-icons type="download-filled" size="20"></uni-icons>
							<view class="text">
								我的评分
							</view>
						</view>
						<view class="right">
							<view class="text">
								{{userInfo.scoreSize}}
							</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
				<!-- 联系客服入口 -->
				<view class="row">
					<view class="left">
						<uni-icons type="chat-filled" size="20"></uni-icons>
						<view class="text">
							联系客服
						</view>
					</view>
					<view class="right">
						<view class="text">

						</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- 小程序平台使用客服按钮 -->
					<!-- #ifdef MP -->
					<button class="contact" open-type="contact">联系客服</button>
					<!-- #endif -->

					<!-- 非小程序平台使用拨打电话 -->
					<!-- #ifndef MP -->
					<button class="contact" @click="onContact">拨打电话</button>
					<!-- #endif -->
				</view>
			</view>
		</view>

		<!-- 设置列表区域 -->
		<view class="section">
			<view class="list">
				<!-- 订阅更新入口 -->
				<navigator url="/pages/notice/detail?id=653507c6466d417a3718e94b&name=订阅更新">
					<view class="row">
						<view class="left">
							<uni-icons type="notification-filled" size="20"></uni-icons>
							<view class="text">
								订阅更新
							</view>
						</view>
						<view class="right">
							<view class="text">

							</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
				<!-- 常见问题入口 -->
				<navigator url="/pages/notice/detail?id=6536358ce0ec19c8d67fbe82&name=常见问题">
					<view class="row">
						<view class="left">
							<uni-icons type="flag-filled" size="20"></uni-icons>
							<view class="text">
								常见问题
							</view>
						</view>
						<view class="right">
							<view class="text">

							</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
			</view>
		</view>

		<!-- 加载等待 -->
	</view>
	<view class="loadingBox" v-else>
		<view :style="{height:getNavBarHeight() + 'px'}"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
	import {
		getNavBarHeight
	} from '@/utils/stystem.js'
	import {
		apiUserInfo
	} from '@/api/apis.js'

	const userInfo = ref(null)

	// 拨打电话联系客服,非小程序平台使用此方法
	function onContact() {
		uni.makePhoneCall({
			phoneNumber: "18888888888" // 客服电话号码
		})
	}

	async function getUserInfo() {
		let res = await apiUserInfo()
		// console.log(res)
		userInfo.value = res.data
	}

	getUserInfo()
</script>

<style lang="scss" scoped>
	.userLayout {
		// background-color: pink;

		.userInfo {
			// padding-top: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.avatar {
				height: 160rpx;
				width: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.ip {
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx;
			}

			.address {
				font-size: 28rpx;
				color: #aaa;
			}
		}

		.section {
			width: 690rpx;
			margin: 50rpx auto;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, .05);

			.list {
				.row {
					background-color: #fff;
					position: relative;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 30rpx;
					height: 100rpx;
					border-bottom: 1px solid #eee;

					&:last-child {
						border-bottom: 0;
					}

					.left {
						display: flex;
						align-items: center;

						:deep() {
							.uni-icons {
								color: $brand-theme-color !important;
							}

						}

						.text {
							padding-left: 20rpx;
							color: #666;
						}
					}

					.right {
						display: flex;
						align-items: center;

						.text {
							font-size: 28rpx;
							color: #aaa;
						}
					}
				}

				.contact {
					position: absolute;
					top: 0;
					left: 0;
					height: 100rpx;
					width: 100%;
					opacity: 0;
				}
			}
		}
	}
</style>
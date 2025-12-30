<template>
	<!-- 壁纸预览页面容器 -->
	<!-- v-if：当获取到信息再渲染内容，避免因 null 报错 -->
	<view class="preview" v-if="currentInfo">
		<!-- 壁纸轮播图 -->
		<swiper circular :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<!-- 点击切换遮罩层显示/隐藏 -->
				<image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<!-- 遮罩层，显示控制按钮和信息 -->
		<view class="mask" v-if="maskState">
			<!-- 返回按钮 -->
			<view class="goBack" @click="goBack" v-if="isGoBack"
				:style="{width:getGobackHeight().height + 'px',height:getGobackHeight().height + 'px', top: getGobackHeight().top + 'px',left:getLeftIcon() + 'px'}">
				<uni-icons type="back" size="20" color="#fff"></uni-icons>
			</view>
			<!-- 当前页码显示 -->
			<view class="count">
				{{currentIndex + 1}} / {{classList.length}}
			</view>
			<!-- 当前时间显示 -->
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<!-- 当前日期显示 -->
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd号"></uni-dateformat>
			</view>
			<!-- 底部操作按钮栏 -->
			<view class="footer">
				<!-- 信息按钮 -->
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">
						信息
					</view>
				</view>
				<!-- 评分按钮 -->
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">
						{{currentInfo.score}} 分
					</view>
				</view>
				<!-- 下载按钮 -->
				<view class="box" @click="clickDownload">
					<uni-icons type="download" size="27"></uni-icons>
					<view class="text">
						下载
					</view>
				</view>
			</view>

		</view>

		<!-- 壁纸信息详情弹窗 -->
		<uni-popup ref="infoPopup" type="bottom" :safe-area="false">
			<view class="infoPopup">
				<!-- 弹窗头部 -->
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<!-- 关闭按钮 -->
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<!-- 可滚动内容区域 -->
				<scroll-view scroll-y>
					<view class="content">
						<!-- 壁纸ID行 -->
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text selectable class="value">{{currentInfo._id}}</text>
						</view>

						<!-- 分类行 暂未开发 -->
						<!-- <view class="row">
							<view class="label">分类：</view>
							<text class="value class">明星美女</text>
						</view> -->

						<!-- 发布者行 -->
						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">{{currentInfo.nickname}}</text>
						</view>

						<!-- 评分行 -->
						<view class="row">
							<text class="label">评分：</text>
							<view class='value roteBox'>
								<uni-rate readonly touchable :value="currentInfo.score" size="16" />
								<text class="score">{{currentInfo.score}}分</text>
							</view>
						</view>

						<!-- 摘要行 -->
						<view class="row">
							<text class="label">摘要：</text>
							<view class='value'>
								{{currentInfo.description}}
							</view>
						</view>

						<!-- 标签行 -->
						<view class="row">
							<text class="label">标签：</text>
							<view class='value tabs'>
								<view class="tab" v-for="(item,index) in currentInfo.tabs" :key="index">{{item}}</view>
							</view>
						</view>

						<!-- 版权声明 -->
						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>
						<view class="safe-area-inset-bottom"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 评分弹窗 -->
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<!-- 弹窗头部 -->
				<view class="popHeader">
					<view></view>
					<view class="title">{{isScore ? "已评分过了~" : "壁纸评分"}}</view>
					<!-- 关闭按钮 -->
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<!-- 评分内容区域 -->
				<view class="content">
					<uni-rate allowHalf v-model="userScore" :disabled="isScore" disabled-color="#ffca3e" />
					<view class="text">{{userScore}}分</view>
				</view>
				<!-- 确认按钮 -->
				<view class="footer">
					<button @click="submitScore" :disabled="!userScore || isScore" type="default" size="mini"
						plain>确认评分</button>
				</view>
			</view>

		</uni-popup>
		<!-- {{readImgs}} -->
	</view>
</template>

<script setup>
	// 导入系统信息工具函数
	import {
		getTitleBarHeight, // 获取标题栏高度
		getStatusBarHeight, // 获取状态栏高度
		getLeftIcon, // 获取左侧图标宽度
		getGobackHeight, // 获取返回按钮位置和高度
	} from "@/utils/stystem.js"
	import {
		apiGetSetupScore,
		apiWriteDownload,
		apiDetailWall
	} from "@/api/apis.js"

	// 遮罩层显示状态
	const maskState = ref(true)
	// 信息弹窗组件引用
	const infoPopup = ref(null)
	// 评分弹窗组件引用
	const scorePopup = ref(null);
	// 用户评分值（0-5）
	const userScore = ref(0)
	// 是否显示返回按钮
	const isGoBack = ref(true)
	const classList = ref([])
	// 记录壁纸的 id
	const currentId = ref(null)
	// 记录当前查看的数组索引
	const currentIndex = ref(0)
	// 记录已查看过的数组索引
	let readImgs = []
	// 每张壁纸的具体信息
	const currentInfo = ref(null)
	// 记录该壁纸是否评分过
	const isScore = ref(false)

	onLoad(async (e) => {
		currentId.value = e.id
		// 如果由分享来的用户,没有缓存,即刻网络请求拿到数据
		if (e.type == 'share') {
			let res = await apiDetailWall({
				id: currentId.value
			})
			// console.log(res);
			classList.value = res.data.map(item => {
				return {
					...item,
					picurl: item.smallPicurl.replace("_small.webp", ".jpg")
				}
			})
		}
		currentIndex.value = classList.value.findIndex(item => item._id == currentId.value)
		currentInfo.value = classList.value[currentIndex.value]
		// console.log(currentIndex.value);
		readImgsFun()
	})

	// 左右滑动函数
	function swiperChange(e) {
		currentIndex.value = e.detail.current
		currentInfo.value = classList.value[currentIndex.value]
		// console.log(e);
		readImgsFun()
	}

	// 处理已看过的数组函数
	function readImgsFun() {
		readImgs.push(
			currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
			currentIndex.value,
			currentIndex.value >= classList.value.length ? 0 : currentIndex.value + 1)
		readImgs = [...new Set(readImgs)]

	}

	// 获取缓存数据 & 修改数据
	// [] 是为了适配无数据时map报错 (由分享来的用户没缓存)
	const storageClassList = uni.getStorageSync("storageClassList") || []
	classList.value = storageClassList.map(item => {
		return {
			...item,
			picurl: item.smallPicurl.replace("_small.webp", ".jpg")
		}
	})
	// console.log(classList.value);

	// 抖音小程序有logo会自动变成返回按钮，所以隐藏自定义返回按钮
	// #ifdef MP-TOUTIAO
	isGoBack.value = false
	// #endif

	// 切换遮罩层显示/隐藏状态
	function maskChange() {
		maskState.value = !maskState.value
	}

	// 打开信息弹窗
	const clickInfo = () => {
		infoPopup.value.open();
	}

	// 关闭信息弹窗
	const clickInfoClose = () => {
		infoPopup.value.close();
	}

	// 打开评分弹窗
	const clickScore = () => {
		// 本来想默认展示就是网络请求来的分数
		// userScore.value = currentInfo.value.score
		if (currentInfo.value.userScore) {
			isScore.value = true
			userScore.value = currentInfo.value.userScore
		}
		scorePopup.value.open();
	}

	//  关闭评分弹窗
	const clickScoreClose = () => {
		scorePopup.value.close();
		userScore.value = 0
	}

	// 提交评分
	const submitScore = async () => {
		// console.log(currentInfo.value);
		uni.showLoading({
			title: "提交中..."
		})
		let {
			classid,
			_id: wallId
		} = currentInfo.value
		let res = await apiGetSetupScore({
			classid,
			wallId,
			userScore: userScore.value
		})
		// console.log(res);
		uni.hideLoading()
		if (res.errCode === 0) {
			uni.showToast({
				title: "评分成功",
				icon: "none"
			})
			classList.value[currentIndex.value].userScore = userScore.value
			uni.setStorageSync("storageClassList", classList.value)
			clickScoreClose()
		}

	}

	// 返回上一页
	const goBack = () => {
		uni.navigateBack({
			// 处理由分享进入的用户没有上一页记录问题
			fail: (err) => {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
		})
	}

	// 点击下载
	const clickDownload = async () => {
		// #ifdef H5
		uni.showModal({
			title: "请长按保存壁纸",
			showCancel: false
		})
		// #endif

		// #ifndef H5
		try {
			uni.showLoading({
				title: "下载中...",
				mask: true
			})

			// 记录下载信息
			let {
				classid,
				_id: wallId
			} = currentInfo.value
			let res = await apiWriteDownload({
				classid,
				wallId
			})

			// 如果返回错误(请求频繁),则跳出流程
			if (res.errCode != 0) throw res
			// console.log(res);
			// return

			// 保存图片流程
			uni.getImageInfo({
				src: currentInfo.value.picurl,
				success: (res) => {
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success: (res) => {
							// console.log(res);
							uni.showToast({
								title: "保存成功，请到相册查看",
								icon: "none"
							})
						},
						fail: (res) => {
							// 下载失败反馈
							if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
								uni.showToast({
									title: "保存失败，请重新点击下载",
									icon: "none"
								})
								return
							}
							// return console.log(res);
							// 因为授权原因下载失败反馈
							uni.showModal({
								title: "授权提示",
								content: "需要授权保存相册",
								success: (res) => {
									// console.log(res);
									if (res.confirm) {
										uni.openSetting({
											success: (setting) => {
												// console.log(setting
												// 	.authSetting
												// 	);
												if (setting
													.authSetting[
														'scope.writePhotosAlbum'
													]) {
													uni.showToast({
														title: "获取授权成功",
														icon: "none"
													})
												} else {
													uni.showToast({
														title: "获取授权失败",
														icon: "none"
													})
												}
											}
										})
									}
								}

							})
						},
						complete: () => {
							uni.hideLoading()
						}
					})

				},

			})
		} catch (err) {
			// console.log(err);
			uni.hideLoading()
		}

		// #endif
	}

	// 右上角分享给盆友
	onShareAppMessage((e) => {
		return {
			title: "松桐壁纸",
			path: "/pages/preview/preview?id=" + currentId.value + "&type=share"
		}
	})

	// 右上角分享朋友圈
	onShareTimeline(() => {
		return {
			title: "松桐壁纸",
			query: "id=" + currentId.value + "&type=share",
			imageUrl: '/static/images/logo2.png'
		}
	})
</script>

<style lang="scss" scoped>
	.preview {
		position: relative;
		width: 100vw;
		height: 100vh;
		// background-color: pink;

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
				// 宽度由文字决定
				width: fit-content;
			}

			.goBack {
				margin-left: 30rpx;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 100%;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.count {
				top: 10vh;
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				background-color: rgba(0, 0, 0, .3);
				backdrop-filter: blur(10rpx);


			}

			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				font-weight: 100;
				// 默认行高比字体大，盒子会有额外的“上空白”
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, .3);

			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, .3);
			}

			.footer {
				background-color: rgba(255, 255, 255, .8);
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				border-radius: 60rpx;
				color: #000;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx rgba(0, 0, 0, .1);
				backdrop-filter: blur(20rpx);

				.box {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 2rpx 12rpx;

					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}

		.popHeader {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;

			scroll-view {
				max-height: 60vh;

				.content {
					.row {
						display: flex;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;

						.label {
							color: $text-font-color-3;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}

						.value {
							// 禁止内容决定宽度，让宽度完全由 flex 布局分配。内容溢出会自动换行
							flex: 1;
							width: 0;
						}

						.roteBox {
							display: flex;
							align-items: center;

							.score {
								font-size: 26rpx;
								color: $text-font-color-2;
								padding-left: 10rpx;
							}
						}

						.tabs {
							display: flex;
							flex-wrap: wrap;

							.tab {
								border: 1px solid $brand-theme-color;
								color: $brand-theme-color;
								font-size: 22rpx;
								padding: 10rpx 30rpx;
								border-radius: 40rpx;
								line-height: 1em;
								margin: 0 10rpx 10rpx 0;
							}
						}

						.class {
							color: $brand-theme-color;
						}


					}

					.copyright {
						font-size: 28rpx;
						padding: 20rpx;
						background: #F6F6F6;
						color: #666;
						border-radius: 10rpx;
						margin: 20rpx 0;
						line-height: 1.6em;
					}

				}
			}
		}

		.scorePopup {
			background: #fff;
			padding: 30rpx;
			width: 70vw;
			border-radius: 30rpx;

			.content {
				padding: 30rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					color: #FFCA3E;
					padding-left: 10rpx;
					width: 80rpx;
					line-height: 1em;
					text-align: right;
				}
			}

			.footer {
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
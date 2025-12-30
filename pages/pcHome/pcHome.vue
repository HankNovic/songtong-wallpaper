<template>
	<view class="pc-guard">
		<view class="panel">
			<!-- 左侧：二维码 + 文案 -->
			<view class="left">
				<image v-if="qrSrc" class="qrcode" :src="qrSrc" mode="widthFix"></image>
				<view class="tips">
					<view class="line">请使用手机浏览器，扫描上方二维码预览。</view>
					<view class="line sub">
						PC 浏览器，请打开控制台并切换至手机模式后再次刷新浏览。
					</view>
				</view>

				<view class="actions">
					<button class="btn" type="primary" @click="copyLink">
						复制链接
					</button>
				</view>
			</view>

			<!-- 右侧：手机预览（iframe，仅 H5） -->
			<!-- #ifdef H5 -->
			<view class="right">
				<view class="phone">
					<view class="phone-header">
						<text class="title">移动端预览</text>
					</view>
					<iframe class="phone-body" :src="mobileUrl" frameborder="0"></iframe>
				</view>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script setup>
	// #ifdef H5
	import QRCode from "qrcode";

	const MOBILE_HOME_PAGE = "/pages/index/index";
	const MOBILE_HOME_HASH = "/#/pages/index/index";

	const mobileUrl = ref("");
	const copyUrl = ref("");
	const qrSrc = ref("");

	let redirected = false;

	/**
	 * 判断是否“真实手机环境”
	 * - DevTools 响应式：false
	 * - DevTools 选 iPhone + 刷新：true
	 * - 真手机浏览器：true
	 */
	function isRealMobileEnv() {
		const ua = navigator.userAgent.toLowerCase();
		const isMobileUA =
			ua.includes("mobile") ||
			ua.includes("android") ||
			ua.includes("iphone") ||
			ua.includes("ipad");

		const hasTouch = navigator.maxTouchPoints > 0;

		return isMobileUA && hasTouch;
	}

	function goMobileHome() {
		if (redirected) return;
		redirected = true;
		uni.reLaunch({
			url: MOBILE_HOME_PAGE
		});
	}

	function initUrl() {
		const origin = window.location.origin;
		const url = origin + MOBILE_HOME_HASH;
		mobileUrl.value = url;
		copyUrl.value = url;
	}

	async function genQr() {
		qrSrc.value = await QRCode.toDataURL(copyUrl.value, {
			margin: 1,
			width: 220
		});
	}

	function copyLink() {
		uni.setClipboardData({
			data: copyUrl.value,
			success: () =>
				uni.showToast({
					title: "已复制",
					icon: "success"
				})
		});
	}

	onMounted(async () => {
		// 只在“真实手机环境”下才跳转
		if (isRealMobileEnv()) {
			goMobileHome();
			return;
		}

		// 正常 pcHome 流程
		initUrl();
		await genQr();
	});
	// #endif
</script>



<style lang="scss" scoped>
	.pc-guard {
		width: 100vw;
		height: 100vh;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.panel {
		width: min(1280px, 92vw);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 60px;

	}

	.left {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.qrcode {
		width: 260px;
	}

	.tips {
		margin-top: 18px;
		text-align: center;

		.line {
			font-size: 16px;
			line-height: 26px;
			color: #333;
		}

		.sub {
			margin-top: 6px;
			color: #666;
		}
	}

	.actions {
		margin-top: 18px;

		.btn {
			width: 160px;
		}
	}

	.right {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	.phone {
		width: 360px;
		height: 740px;
		border: 10px solid #111;
		border-radius: 26px;
		overflow: hidden;
		background: #fff;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
	}

	.phone-header {
		height: 48px;
		background: #4aa3ff;
		display: flex;
		align-items: center;
		justify-content: center;

		.title {
			color: #fff;
			font-size: 16px;
			font-weight: 600;
		}
	}

	.phone-body {
		width: 100%;
		height: calc(100% - 54px);
	}

	/* 窄一点的桌面改为上下布局 */
	@media (max-width: 1100px) {
		.panel {
			flex-direction: column;
			gap: 30px;
			padding: 30px 0;
		}
	}
</style>
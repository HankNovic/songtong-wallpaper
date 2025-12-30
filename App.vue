<script>
	/**
	 * 应用根组件
	 * 处理应用的生命周期事件
	 */
	export default {
		onLaunch: function() {
			// 应用启动时的初始化逻辑
			// console.log('App Launch')
			// #ifdef H5
			this.initPcResizeGuard();
			// #endif
		},
		onShow: function() {
			// 应用显示时的处理逻辑
			// console.log('App Show')

		},
		onHide: function() {
			// 应用隐藏时的处理逻辑
			// console.log('App Hide')
			// #ifdef H5
			this.destroyPcResizeGuard();
			// #endif
		},


		methods: {
			initPcResizeGuard() {
				const PC_WIDTH = 1200;
				const PC_HOME = "/pages/pcHome/pcHome";

				// 避免重复 reLaunch：记录上一次是否已判定为 PC 宽屏
				this.__isPcWide__ = false;

				const routeToPcIfNeeded = () => {
					const {
						windowWidth
					} = uni.getSystemInfoSync();
					const isPc = windowWidth >= PC_WIDTH;

					// 已经在 PC_HOME 就不要再跳，避免循环
					const pages = getCurrentPages();
					const last = pages[pages.length - 1];
					const currentRoute = last?.route ? "/" + last.route : "";
					const isOnPcHome = currentRoute === PC_HOME;

					if (isPc && !isOnPcHome && !this.__isPcWide__) {
						this.__isPcWide__ = true;
						uni.reLaunch({
							url: PC_HOME
						});
						return;
					}

					// 窗口变回非宽屏时，允许下次再触发
					if (!isPc) this.__isPcWide__ = false;
				};

				// 防抖：拖动窗口不会频繁触发 reLaunch
				let timer = null;
				this.__pcResizeHandler__ = () => {
					clearTimeout(timer);
					timer = setTimeout(routeToPcIfNeeded, 150);
				};

				// 首次进入立即判断一次
				routeToPcIfNeeded();

				window.addEventListener("resize", this.__pcResizeHandler__);
			},

			destroyPcResizeGuard() {
				if (this.__pcResizeHandler__) {
					window.removeEventListener("resize", this.__pcResizeHandler__);
					this.__pcResizeHandler__ = null;
				}
			}
		}
	};
</script>

<style lang="scss">
	// 引入公共样式文件
	@import "@/common/style/common-style.scss";
</style>
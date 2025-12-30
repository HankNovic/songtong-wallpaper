/**
 * Vite 构建工具配置文件
 * 用于配置 uni-app 项目的构建选项和插件
 */
import {
	defineConfig
} from 'vite'
// uni-app 的 Vite 插件
import uni from '@dcloudio/vite-plugin-uni'
// 自动导入插件，用于自动导入常用的 API
import AutoImport from 'unplugin-auto-import/vite'

// 导出 Vite 配置对象
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'https://tea.qingnian8.com',
				changeOrigin: true,
				secure: true,
				// 把 /api/xxx -> https://tea.qingnian8.com/api/xxx
				rewrite: (path) => path.replace(/^\/api/, '/api'),
			},
		},
	},
	plugins: [
		// uni-app 插件，处理 uni-app 特有的构建逻辑
		uni(),
		// 自动导入插件配置
		// 配置后，可以在代码中直接使用 Vue 和 uni-app 的 API，无需手动 import
		AutoImport({
			imports: [
				// Vue 预设：自动导入 ref, reactive, computed 等 Vue API
				'vue',
				// uni-app 预设：自动导入 uni.request, uni.navigateTo 等 uni-app API
				'uni-app'
			]
		})
	]
})
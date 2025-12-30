<template>
	<!-- 分类页面布局容器 -->
	<view class="classLayout">
		<!-- 自定义导航栏 -->
		<custom-nav-bar title="分类"></custom-nav-bar>
		<!-- 分类网格列表 -->
		<view class="classify">
			<theme-item v-for="(item,index) in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
	// 导入获取分类列表API
	import {
		apiGetclassify // 获取分类列表接口
	} from '@/api/apis.js'

	// 分类列表数据
	const classifyList = ref([])

	//获取分类列表
	const getClassify = async () => {
		let res = await apiGetclassify({
			// select: true
			pageSize: 15
		})
		classifyList.value = res.data
		// console.log(res.data);
	}


	getClassify()
</script>

<style lang="scss" scoped>
	.classLayout {
		// background-color: pink;

		.classify {
			padding: 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
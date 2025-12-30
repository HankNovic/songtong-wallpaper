<template>
	<!-- 通用标题容器 -->
	<view class="common-title">
		<!-- 标题名称插槽 -->
		<view class="name">
			<slot name="name"></slot>
		</view>
		<!-- 自定义内容插槽 -->
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script setup>
	/**
	 * 通用标题组件
	 * 用于展示带标题和自定义内容的标题栏
	 * 使用具名插槽：name（标题内容）、custom（自定义内容）
	 */
</script>

<style lang="scss" scoped>
	.common-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;

		.name {
			font-size: 40rpx;
		}
	}
</style>
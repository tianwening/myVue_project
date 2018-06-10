<!-- html部分 -->
<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goBack"></a>
			<h1 class="mui-title">{{title}}</h1>
		</header>
	</div>
</template>
<!-- script脚本部分 -->
<script>
	export default {
		data(){
			return {

			}
		},
		methods: {
			goBack(){
				this.$router.go(-1);
			}
		},
		props: ["title"]//从父组件中获取title值
	}
</script>
<!-- 样式部分 -->
<style scoped>
	.mui-bar.mui-bar-nav {
		position: relative;
	}
</style>
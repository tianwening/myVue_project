<!-- html部分 -->
<template>
    <div>
    	<!-- 头部 -->
        <mt-header title="我的信息管理系统"></mt-header>
        <transition name="view" mode="out-in">
        	<router-view></router-view>
        </transition>
        <!-- 底部 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" :to="{name: 'home'}">
				<span class="mui-icon icon-shouye"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name: 'member'}">
				<span class="mui-icon icon-huiyuan"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name: 'shopcart'}">
				<span class="mui-icon icon-gouwucheman"><span class="mui-badge">{{num}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name: 'search'}">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">查找</span>
			</router-link>
		</nav>
    </div>
</template>
<!-- script脚本部分 -->
<script>
//导入连接父子组件的中间桥梁
import Connect from "./components/common/connect.js";
//引入localStorage里面存储的数据
import prodsTool from "./components/common/prodsTools.js";

export default {
    data() {
        return {
        	num: prodsTool.getTotalData()
        }
    },
    created(){
    	Connect.$on("shopcartUpdate",pickNum=>{
    		this.num += pickNum;
    	})
    }
}
</script>
<!-- 样式部分 -->
<style>
	.view-enter-active,.view-leave-active {
		transition: opacity 0.5s;
	}
	.view-enter,.view-leave-to {
		opacity: 0;
	}
</style>
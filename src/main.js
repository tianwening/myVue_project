"use strict";

import Vue from "vue";
//引入自己的vue文件，需要渲染的基本组件
import App from "./app.vue";
//引入基本页面下的相关子组件
import Home from "./components/home/home.vue";
import Member from "./components/member/member.vue";
import ShopCart from "./components/shopcart/shopcart.vue";
import Search from "./components/search/search.vue";
import newsList from "./components/news/newsList.vue";
//引入第三方的包
import VueRouter from "vue-router";

//安装插件
Vue.use(VueRouter);

//引入mint-ui
import MintUi from "mint-ui";
import "mint-ui/lib/style.css";

//引入mui的样式文件
import "./static/vendor/mui/dist/css/mui.css";

//引入自己写的样式文件
import "./static/css/global.css";

// 安装插件
Vue.use(MintUi);

//引入axios
import Axios from "axios";
//设定默认的服务器路径
Axios.defaults.baseURL = "http://127.0.0.1/project/datas/";

//挂载在原型上
Vue.prototype.$ajax = Axios;

//创建路由对象并建立路由规则
let router = new VueRouter({
	linkActiveClass: "mui-active",
	routes: [
		{
			path: "/",
			redirect: {name: "home"}
		},
		{
			name: "home",
			path: "/home",
			component: Home
		},
		{
			name: "member",
			path: "/member",
			component: Member
		},
		{
			name: "shopcart",
			path: "/shopcart",
			component: ShopCart
		},
		{
			name: "search",
			path: "/search",
			component: Search
		},
		{
			name: "news.list",
			path: "/news/newsList",
			component: newsList
		}
	]
})


new Vue({
	el: "#app",
	router: router,
	render(c){
		return c(App);
	}
})
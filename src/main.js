"use strict";

import Vue from "vue";
//引入自己的vue文件
import App from "./app.vue";
import Home from "./components/home/home.vue";

//引入第三方的包
import VueRouter from "vue-router";

//安装插件
Vue.use(VueRouter);

//引入mint-ui
import MintUi from "mint-ui";
import "mint-ui/lib/style.css";

//引入mui的样式文件
import "./static/vendor/mui/dist/css/mui.css";

// 安装插件
Vue.use(MintUi);

//引入axios
import Axios from "axios";
//设定默认的服务器路径
Axios.defaults.baseURL = "http://127.0.0.1/project";

//挂载在原型上
Vue.prototype.$ajax = Axios;

//创建路由对象并建立路由规则
let router = new VueRouter({
	routes: [
		{
			path: "/",
			redirect: {name: "home"}
		},
		{
			name: "home",
			path: "/home",
			component: Home
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
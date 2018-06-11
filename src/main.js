"use strict";
//引入vue
import Vue from "vue";
//引入自己的vue文件，需要渲染的基本组件
import App from "./app.vue";
//引入基本页面下的相关子组件
import Home from "./components/home/home.vue";
import Member from "./components/member/member.vue";
import ShopCart from "./components/shopcart/shopcart.vue";
import Search from "./components/search/search.vue";
import NewsList from "./components/news/newsList.vue";
import NavBar from "./components/common/navBar.vue";
import NewsDetail from "./components/news/newsdetail.vue";
import PhotoShare from "./components/photo/photoshare.vue";
import PhotoDetail from "./components/photo/photodetail.vue";
import Comment from "./components/common/comment.vue";
import GoodsList from "./components/goods/goodslist.vue";
import GoodsDetail from "./components/goods/goodsdetail.vue";
import MySwipe from "./components/common/mySwipe.vue";
import GoodsComment from "./components/goods/goodscomment.vue";
//引入第三方的包(vue-router路由)
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

//Axios拦截器操作loadding
Axios.interceptors.request.use(function(config){
    //显示图标
    MintUi.Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function(config){
    //隐藏图标
    MintUi.Indicator.close();
    //获取到config中的data，进行加工
    return config;
});

//挂载在原型上
Vue.prototype.$ajax = Axios;

//引入moment插件
import Moment from "moment";

//引入vue-preview
import VuePreview from "vue-preview";
//安装vue-preview
Vue.use(VuePreview);

//定义全局过滤器
Vue.filter("convertDate", function(value) {
    return Moment(value).format("YYYY-MM-DD");
})
// 定义全局组件
Vue.component("navBar", NavBar);
Vue.component("comment", Comment);
Vue.component("mySwipe",MySwipe);

//创建路由对象并建立路由规则
let router = new VueRouter({
    linkActiveClass: "mui-active",
    routes: [{
            path: "/",
            redirect: { name: "home" }
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
            component: NewsList
        },
        {
            name: "news.Detail",
            path: "/news/newsDetail",
            component: NewsDetail
        },
        {
            name: "photo.share",
            path: "/photo/share",
            component: PhotoShare
        },
        {
            name: "photo.detail",
            path: "/photo/detail/:id",
            component: PhotoDetail
        },
        {
        	name: "goods.list",
        	path: "/goods/list",
        	component: GoodsList
        },
        {
            name: "goods.detail",
            path: "/goods/detail",
            component: GoodsDetail
        },
        {
            name: "goods.comment",
            path: "/goods/comment/:id",
            component: GoodsComment
        },
        {
            name: "goods.showPictures",
            path: "/goods/picturesInfo",
            component: NewsDetail
        }
    ]
})

new Vue({
    el: "#app",
    router: router,
    render(c) {
        return c(App);
    }
})
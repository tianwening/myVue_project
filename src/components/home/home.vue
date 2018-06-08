<!-- html部分 -->
<template>
    <div>
        <!-- home首页轮播图 -->
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="(img,index) in imgs" :key="index">
                <img :src="img.src" :alt="img.name">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 九宫格 -->
        <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link :to="{name: 'news.list'}">
                            <span class="mui-icon mui-icon-home"></span>
                            <div class="mui-media-body">新闻资讯</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-email"></span>
                            <div class="mui-media-body">图文分享</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon icon-shangpin"></span>
                            <div class="mui-media-body">商品展示</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-location"></span>
                            <div class="mui-media-body">留言反馈</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon icon-search"></span>
                            <div class="mui-media-body">搜索资讯</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-phone"></span>
                            <div class="mui-media-body">联系我们</div>
                        </a>
                    </li>
                </ul> 
        </div>
    </div>
</template>
<!-- script脚本部分 -->
<script>
export default {
    data() {
        return {
            imgs: []
        }
    },
    created() {
        this.$ajax.get("luobotu.json", {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(resp => {
            console.log(resp.data)
            this.imgs = resp.data;
        })
    }
}
</script>
<!-- 样式部分 -->
<style>
/*轮播图样式*/
.mint-swipe {
    height: 187px;
}
.mint-swipe img {
    height: 100%;
    width: 100%;
}
/*九宫格样式*/
.mui-table-view.mui-grid-view.mui-grid-9 {
    border: 0;
    margin-top: 0;
}
.mui-icon-home:before,
.mui-icon-email:before,
.icon-shangpin:before,
.mui-icon-location:before,
.icon-search:before,
.mui-icon-phone:before{
    content: "";
}
.mui-icon {
    width: 50px;
    height: 50px;
}
.mui-icon-home {
    background-image: url("../../static/imgs/news.png");
    -webkit-background-size: cover;
    background-size: cover;
}
.mui-icon-email {
    background-image: url("../../static/imgs/picShare.png");
    -webkit-background-size: cover;
    background-size: cover;
}
.icon-shangpin {
    background-image: url("../../static/imgs/goodShow.png");
    -webkit-background-size: cover;
    background-size: cover;
}
.mui-icon-location {
    background-image: url("../../static/imgs/feedback.png");
    -webkit-background-size: cover;
    background-size: cover;
}
.icon-search {
    background-image: url("../../static/imgs/search.png");
    -webkit-background-size: cover;
    background-size: cover;
}
.mui-icon-phone {
    background-image: url("../../static/imgs/callme.png");
    -webkit-background-size: cover;
    background-size: cover;
}
</style>
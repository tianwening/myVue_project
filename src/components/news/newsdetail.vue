<!-- html部分 -->
<template>
    <div class="tmpl">
        <nav-bar :title="title"></nav-bar>
        <div class="news-title">
            <p v-text="newsDetail.title"></p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsDetail.add_time|convertDate}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.content"></div>
    </div>
</template>
<!-- script脚本部分 -->
<script>
export default {
    data() {
        return {
            title: "",
            newsDetail: {}
        }
    },
    created() {
        this.$ajax.get("getNewsDetail/" + this.$route.query.id + ".json").then(resp => {
            this.newsDetail = resp.data;
        })
    },
    beforeRouteEnter(to, from, next) {
        let myTitle = "";
        if(from.name==="news.detail"){
            myTitle = "新闻详情";
        }else if(from.name==="goods.detail"){
            myTitle = "图文详情";
        }
        next(vm=>{
            vm.title = myTitle;
        })
    }
}
</script>
<!-- 样式部分 -->
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}





/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}
</style>
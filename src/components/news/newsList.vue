<template>
    <div>
        <nav-bar title="新闻列表"></nav-bar>
        <!-- 新闻列表页 -->
        <div class="tmp">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="news in newsList" :key="news.id">
                    <router-link :to="{name: 'news.Detail',query: {id: news.id}}">
                        <img class="mui-media-object mui-pull-left" :src="news.img_url">
                        <div class="mui-media-body">
                            <span v-text="news.title"></span>
                            <div class="news-desc">
                                <p>点击数：{{news.click}}</p>
                                <p>发表时间：{{news.add_time|convertDate}}</p> 
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newsList: []
        }
    },
    created() {
        this.$ajax.get("getNewsList.json").then(resp => {
            this.newsList = resp.data;
        }).catch(err => {
            console.log(err);
        })
    }
}
</script>
<style scoped>
.mui-media-body p {
    color: #0bb0f5;
}

.news-desc p:nth-child(1) {
    float: left;
}

.news-desc p:nth-child(2) {
    float: right;
}
.mui-table-view-cell.mui-media {
    width: 100%;
}
</style>
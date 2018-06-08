<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="news in newsList" :key="news.id">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" :src="news.img_url">
                    <div class="mui-media-body">
                        <span v-text="news.title"></span>
                        <div class="news-desc">
                            <p>点击数：{{news.click}}</p>
                            <p>发表时间：{{news.add_time}}</p> 
                        </div>
                    </div>
                </a>
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
</style>
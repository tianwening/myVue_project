<!-- html部分 -->
<template>
    <div>
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="(img,index) in imgs" :key="index">
                <img :src="img.src">
            </mt-swipe-item>
        </mt-swipe>
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
    props: ["url"],
    created(){
    	this.$ajax.get(this.url).then(resp => {
            this.imgs = resp.data;
        });
    }
}
</script>
<!-- 样式部分 -->
<style scoped>
/*轮播图样式*/
.mint-swipe {
    height: 187px;
}
.mint-swipe img {
    height: 100%;
    width: 100%;
}
</style>
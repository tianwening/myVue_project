<!-- html部分 -->
<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(img,index) in imgs" :key="index">
            	<img :src="img.src" :alt="img.name">
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
    created() {
        this.$ajax.get("/datas/luobotu.json", {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(resp=>{
        	console.log(resp.data)
        	this.imgs = resp.data;
        })
    }
}
</script>
<!-- 样式部分 -->
<style>
	.mint-swipe {
		height: 187px;
	}
	.mint-swipe img{
		height: 100%;
		width: 100%;
	}
</style>
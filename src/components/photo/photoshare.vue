<template>
    <div class="tmpl">
        <nav-bar title="图文分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="loadImg(category.id)">{{category.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name: 'photo.detail',params: {id: img.id}}">
                        <!-- 图片懒加载 -->
                        <!-- <img :src="img.img_url"> -->
                        <img v-lazy="img.img_url">
                        <p>
                            <span v-text="img.title"></span>
                        </p>
                    </router-link">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            categorys: [],
            imgs: []
        }
    },
    created(){
    	this.$ajax.get("getimgcategory.json").then(resp=>{
            this.categorys = resp.data;
            this.categorys.unshift({
                title: "全部",
                id: 0
            })
        }).catch(err=>{
            console.log(err);
        });
        this.loadImg(0);
    },
    methods: {
        loadImg(id){
            this.$ajax.get("getImages/"+id+".json").then(resp=>{
                this.imgs = resp.data;
            })
        }
    }
}



</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 10px 0;
}


/*下面的图片*/
.photo-list {
    box-shadow: 0 -1px 6px #ccc;
}
.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}
/*图片懒加载相关样式*/
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>

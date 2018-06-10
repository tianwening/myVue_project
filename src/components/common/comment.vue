<template>
    <div>
        <!-- 评论内容开始 -->
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a herf="javascript:;" @click="goBack">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea></textarea>
                </li>
                <li>
                    <mt-button size="large" type="primary">发表评论按钮</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>{{comments.length}}条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}：{{comment.content}} {{comment.add_time|convertDate}}
                </li>
            </ul>
            <mt-button type="danger" size="large" plain>加载更多按钮</mt-button>
        </div>
        <!-- 评论内容结束 -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            comments: []
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        }
    },
    created(){
        let self = this;
        this.$ajax.get("postComment.php",{
            params: {
                id: self.$route.params.id,
                content: "你好吗"
            }
        }).then(resp=>{
            this.comments = resp.data;
        }).catch(err=>{
            console.log(err);
        })
    }
}
</script>
<style scoped>
/*评论样式 开始*/

.photo-comment>div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment>div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}


/*评论样式 结束*/
</style>
<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="outer-swiper">
            <div class="swiper">
                <img :src="goodsInfo.img_url">
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{goodsInfo.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{goodsInfo.market_price}}</s> 销售价：<span>￥{{goodsInfo.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="subtract">-</span><span>{{pickNum}}</span><span@click="addNum">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <!-- 小球的动画效果 -->
        <transition name="ball"  @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{goodsInfo.goods_no}}</li>
                <li>库存情况：{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间：{{goodsInfo.add_time|convertDate}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="showPicInfo">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="showProdComment">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
// 引入中间连接的桥梁
import Connect from "../common/connect.js";
//引入计算购物车数量和商品信息的相关的API
import prodsTool from "../common/prodsTools.js";

export default {
    data() {
        return {
            pickNum: 0,
            goodsInfo: {},
            isShow: false
        }
    },
    methods: {
        subtract(){
            if(this.pickNum<=0){
                return;
            }
            this.pickNum--;
        },
        addNum(){
            if(this.pickNum>=this.goodsInfo.stock_quantity){
                return;
            }
            this.pickNum++;
        },
        //添加购物车
        addShopcart(){
            Connect.$emit("shopcartUpdate",this.pickNum);
            this.isShow = true;
            prodsTool.addUpdate({
                id: this.goodsInfo.id,
                num: this.pickNum
            });
        },
        afterEnter(){
            this.isShow = false;
        },
        showProdComment(){
            //获取当前商品的id
            let id = this.$route.query.id;
            //编程导航
            this.$router.push({
                name: "goods.comment",
                params: {
                    id: id
                }
            })
        },
        showPicInfo(){
            //获取当前商品的id
            let id = this.$route.query.id;
            //编程导航
            this.$router.push({
                name: "goods.showPictures",
                query: {
                    id: id
                }
            })
        }
    },
    created() {
        let self = this;
        this.$ajax.get("getgoodsinfos.json").then(resp => {
            let result = {};
            resp.data.forEach(function(value) {
                if (value.id == self.$route.query.id) {
                    result = value;
                }
            })
            this.goodsInfo = result;
        }).catch(err => {
            console.log(err);
        })
    }
}
</script>
<style scoped>

.swiper img {
    width: 100%;
    height: 100%;
}
.ball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}




/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul>:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul>:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}




/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}




/*商品参数*/

.product-props ul>:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li>:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
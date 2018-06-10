<template>
    <div class="tmp">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li v-for="(goods,index) in goodsList" :key="goods.id"  class="p-list">
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <img :src="goods.img_url">
                    <div class="pay-calc">
                        <p v-text="goods.title"></p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="sub(index)">-</span>
                            <span>{{goods.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
//引入商品操作工具对象
import prodTools from '../common/prodsTools.js';
//引入向上传播的中间连接器connect
import Connect from "../common/connect.js";

export default {
    data(){
    	return {
    		goodsList: [],
    		prods: []
    	}
    },
    methods: {
    	sub(i){
    		if(this.goodsList[i].num<=1){
    			return;
    		}
    		this.goodsList[i].num--;
    		Connect.$emit("shopcartUpdate",-1);
    		prodTools.addUpdate({
    			id: this.goodsList[i].id,
    			num: -1
    		})
    	},
    	add(i){
    		this.goodsList[i].num++;
    		Connect.$emit("shopcartUpdate",1);
    		prodTools.addUpdate({
    			id: this.goodsList[i].id,
    			num: 1
    		})
    	},
    	del(i){
    		let goods = this.goodsList[i];
    		//删除该元素之前需要先将内存Storage里面对应的属性删除
    		prodTools.deleteData(goods.id);
    		//通知地下的购物车更新
    		Connect.$emit("shopcartUpdate",-goods.num);
    		//从物品列表中将选中的列表删除
    		this.goodsList.splice(i,1);
    	}
    },
    created(){
    	let prods = prodTools.getProds();
    	let result = [];
    	this.$ajax.get("getgoodsInfos.json").then(resp=>{
    		resp.data.forEach(value=>{
    			if(value.id in prods){
    				//给vue实例上的数据对象绑定属性，需要用到$set方法，否则不能生效
    				// value["num"] = prods[value.id];
    				// value["isPicked"] = true;
    				// this.$set(ele,'num',prods[ele.id]);
    				this.$set(value,"num",prods[value.id]);
    				this.$set(value,"isPicked",true);
    				result.push(value);
    			}
    		})
    	})
    	this.goodsList = result;
    },
    computed: {
    	payment(){
    		let num = 0;
    		let sum = 0;
    		this.goodsList.forEach(value=>{
    			//如果开关的转换时开启的
    			if(value.isPicked){
    				sum += value.num*value.sell_price;
    				num += value.num;
    			}
    		})
    		return {
    			num,sum
    		}
    	}
    }
}



</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>

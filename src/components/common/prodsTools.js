let prodsTool = {};
let storage = window.localStorage;
let prods = JSON.parse(storage.getItem('prods')||'{}');

//追加或者更新数据
prodsTool.addUpdate = function(p){
	if(prods[p.id]){
		prods[p.id]+=p.num;
	}else{
		prods[p.id] = p.num;
	}
	this.saveProds(prods);
}
//删除相应的数据
prodsTool.deleteData = function(id){
	delete prods[id];
	this.saveProds(prods);
}
//获取对应id的数据
prodsTool.getProds = function(){
	return JSON.parse(storage.getItem('prods')||'{}');
}
//获取总数
prodsTool.getTotalData = function(){
	let sum = 0;
	for(let id in prods){
		sum += prods[id];
	}
	return sum;
}
prodsTool.saveProds = function(){
	storage.setItem('prods',JSON.stringify(prods));
}

export default prodsTool;

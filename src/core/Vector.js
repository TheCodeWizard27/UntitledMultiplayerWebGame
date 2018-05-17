module.exports = class Vector{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	
	toString(){
		return "x:"+this.x.toString()+"/y:"+this.y;
	}
	clone(){
		return new Vector(this.x,this.y);
	}
};
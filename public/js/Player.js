export default class Player{
	constructor(graphics){
		this._graphics = graphics;
		this._pos = new createjs.Point(0,0);
		this._dir = new createjs.Point(0,1);
		this._markers = [];
		this._markCooldown = 0;
		this._walking = false;
		this._keyBuffer = new Set();
		this._score = 0;
		this._sprite = this._graphics.createPlayer();
	}
	
	mark(){
		if(this._markCooldown <= 0){
			//TODO add Marker shoot code
		}
	}
	
	addKey(key){
		this._keyBuffer.add(key);
	}
	removeKey(key){
		this._keyBuffer.delete(key);
	}
	
	delete(){
		this._graphics.removeSprite(this._sprite);
	}
}
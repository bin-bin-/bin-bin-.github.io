define(function(require,exports,module){

	var jquery=require('jquery');
	(function($,expo){
		var mod={};

		mod.create=function(includes){
			var result=function(){
				this.init.apply(this,arguments);
			}
			result.fn=result.prototype;
			result.fn.init=function(){};

			result.proxy=function(func){return $.proxy(func,this);};
			result.fn.proxy=result.proxy;

			result.include=function(obj){$.extend(this.fn,obj);};
			result.extend=function(obj){$.extend(this,obj);};

			if(includes) result.include(includes);
			return result;
		}
		expo.Controller=mod;
	})(jquery,window);

	module.exports=window.Controller;
})
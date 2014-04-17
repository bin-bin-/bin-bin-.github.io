

define(function(require,exports,module){
	(function(){
		var initializing=false;
		jClass=function(){};
		jClass.extend=function(prop){
			var baseClass=null;
			if(this!==jClass){
				baseClass=this;
			}
			function F(){
				if(!initializing){								//如果不是初始化，执行init函数
					if(baseClass){
						this._superprototype=baseClass.prototype;
					}
					this.init.apply(this,arguments);					
				}
			}
			if(baseClass){
				//通过设置initializing控制是否需要init
				initializing=true;
				F.prototype-new baseClass();
				F.prototype.constructor=F;
				initializing=false;
			}
			F.extend=arguments.callee;

			//对父类同名函数的处理
			for (var name in prop) {
                if (prop.hasOwnProperty(name)) {
                    // 如果此类继承自父类baseClass并且父类原型中存在同名函数name
                    if (baseClass &&
                    typeof (prop[name]) === "function" &&
                    typeof (F.prototype[name]) === "function" &&
                    /\b_super\b/.test(prop[name])) {
                        // 重定义函数name - 
                        // 首先在函数上下文设置this._super指向父类原型中的同名函数
                        // 然后调用函数prop[name]，返回函数结果
                        // 注意：这里的自执行函数创建了一个上下文，这个上下文返回另一个函数，
                        // 此函数中可以应用此上下文中的变量，这就是闭包（Closure）。
                        // 这是JavaScript框架开发中常用的技巧。
                        F.prototype[name] = (function(name, fn) {
                            return function() {
                                this._super = baseClass.prototype[name];
                                return fn.apply(this, arguments);
                            };
                        })(name, prop[name]);
                    } else {
                        F.prototype[name] = prop[name];
                    }
                }
            }
			return F;
		}
	})()
	module.exports=jClass;

})
//继承实现。出自三生石上的文章。关于继承的五篇文章，写的很好














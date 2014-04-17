define(function(require,exports,module){
	var $=require('jquery');
	var Fighter=require('../../lib/Fighter.js');
	var Controller=require('../../lib/Controller.js');
	var helper=require('../../lib/helper.js');
	var logTpl = require('./tpl/log');


	$(function(){



		//构建自己的容器
		var NameFighting=Controller.create({
			//自己的元素
			elements:{
				"#attack":"attack",
				"#defence":"defence",
				"#fight":"fight",
				"#bloodBar":"bloodBar",
				"#box":"box"
			},
			//要绑定的方法
			events:{
				"click #fight":"begin"
			},
			//初始化
			init:function(element){
				this.el=$(element);
				this.refreshElements();
				this.delegateEvents();
			},
			//自己的函数
			begin:function(){
				//新建两个Fighter
				var attackName = $.trim(this.attack.val());
            	var defenceName = $.trim(this.defence.val());

            	var attacker=new Fighter(attackName);
            	var defenceer=new Fighter(defenceName);

            	var log=[];

            	

            	helper.bloodView(this.bloodBar, attackName, attacker.blood, defenceName, defenceer.blood);

            	//然后根据两个对象，输出log
            	var result = helper.fight(attacker,defenceer,log ,this.box);


				//然后控制视图层
				this.box.html(logTpl.render({
	                result: result,
	                log: log
	            }));

				var that=this;
	            var goon = function() {
	                that.box.dequeue('attack');
	            };
	            var queue = (function() {
	                var arr = [];
	                var list = $('.attack-item');
	                list.each(function(i, n) {
	                    arr.push(function() {
	                        $(n).delay(2000).fadeIn('slow', function() {
	                            var logItem = log[i];
	                            that.bloodBar.find('.' + (i % 2 === 0 ? 'defence' : 'attack') + ' .bar').eq(0).width(logItem.left);
	                            if(i === list.length - 1) {
	                                that.box.find('.fight-result').show();
	                            } else {
	                                goon();
	                            }
	                        });
	                    });
	                });
	                return arr;
	            })();

	            this.box.queue('attack', queue);
	            goon();
			},

			//私有
			$:function(selector){
				return $(selector,this.el);
			},
			refreshElements:function(){
				for(var key in this.elements){
					this[this.elements[key]]=this.$(key);
				}
			},
			eventSplitter: /^(\w+)\s*(.*)$/,
			delegateEvents: function(){
	          for (var key in this.events) {
	            var methodName = this.events[key];
	            var method     = this.proxy(this[methodName]);

	            var match      = key.match(this.eventSplitter);
	            var eventName  = match[1], selector = match[2];

	            if (selector === '') {
	              this.el.bind(eventName, method);
	            } else {
	              this.el.delegate(selector, eventName, method);
	            }
	          }
	        }
		})


		new NameFighting("body");
		//初始化一些数据。初始化页面


	})





})











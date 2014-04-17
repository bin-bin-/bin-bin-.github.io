define("dist/app/fight/index",["jquery","../../lib/Fighter.js","..\\..\\lib\\jClass","../../lib/Controller.js","../../lib/helper.js","./tpl/log"],function(a){var b=a("jquery"),c=a("../../lib/Fighter"),d=a("../../lib/Controller"),e=a("../../lib/Helper"),f=a("./tpl/log");b(function(){var a=d.create({elements:{"#attack":"attack","#defence":"defence","#fight":"fight","#bloodBar":"bloodBar","#box":"box"},events:{"click #fight":"begin"},init:function(a){this.el=b(a),this.refreshElements(),this.delegateEvents()},begin:function(){var a=b.trim(this.attack.val()),d=b.trim(this.defence.val()),g=new c(a),h=new c(d),i=[],j={attack:{name:g.name,life:g.blood,blood:g.blood,log:[]},defence:{name:h.name,life:h.blood,blood:h.blood,log:[]}};e.bloodView(this.bloodBar,a,j.attack.life,d,j.defence.life),e.fight(g,h,i,this.box),this.box.html(f.render({result:j,log:i}));var k=this,l=function(){k.box.dequeue("attack")},m=function(){var a=[],c=b(".attack-item");return c.each(function(d,e){a.push(function(){b(e).delay(2e3).fadeIn("slow",function(){var a=i[d];k.bloodBar.find("."+(0===d%2?"defence":"attack")+" .bar").eq(0).width(a.left),d===c.length-1?k.box.find(".fight-result").show():l()})})}),a}();this.box.queue("attack",m),l()},$:function(a){return b(a,this.el)},refreshElements:function(){for(var a in this.elements)this[this.elements[a]]=this.$(a)},eventSplitter:/^(\w+)\s*(.*)$/,delegateEvents:function(){for(var a in this.events){var b=this.events[a],c=this.proxy(this[b]),d=a.match(this.eventSplitter),e=d[1],f=d[2];""===f?this.el.bind(e,c):this.el.delegate(f,e,c)}}});new a("body")})}),define("dist/lib/Fighter",["./jClass"],function(a,b,c){var d=a("./jClass"),e=d.extend({init:function(a){this.name=a,this.blood=this.getBlood(a)},getBlood:function(a){var b=function(a){for(var b=0,c=encodeURIComponent(a).split("%"),d=1,e=c.length;e>d;d++){var f=c[d],g=f[0],h=f[1];g=isNaN(+g)?g.charCodeAt(0):g,h=isNaN(+h)?h.charCodeAt(0):h,b+=0===g||0===h?g+h:g*h}return b},c=0,d=4,e=a.length;if(d>e)for(c=0;d-e>c;c++)a+="一";else e>d&&(a=a.slice(0,d));var f=b(a),g=300;return Math.floor(g+(f-g)/100)},normal:function(){return Math.floor(.5*this.random(60,150))},skill:function(){return Math.floor(1.25*this.random(60,150))},random:function(a,b){return Math.ceil(Math.random()*(b-a)+a)}});c.exports=e}),define("dist/lib/jClass",[],function(a,b,c){!function(){var a=!1;jClass=function(){},jClass.extend=function(b){function c(){a||(d&&(this._superprototype=d.prototype),this.init.apply(this,arguments))}var d=null;this!==jClass&&(d=this),d&&(a=!0,c.prototype-new d,c.prototype.constructor=c,a=!1),c.extend=arguments.callee;for(var e in b)b.hasOwnProperty(e)&&(c.prototype[e]=d&&"function"==typeof b[e]&&"function"==typeof c.prototype[e]&&/\b_super\b/.test(b[e])?function(a,b){return function(){return this._super=d.prototype[a],b.apply(this,arguments)}}(e,b[e]):b[e]);return c}}(),c.exports=jClass}),define("dist/lib/Controller",["jquery"],function(a,b,c){var d=a("jquery");!function(a,b){var c={};c.create=function(b){var c=function(){this.init.apply(this,arguments)};return c.fn=c.prototype,c.fn.init=function(){},c.proxy=function(b){return a.proxy(b,this)},c.fn.proxy=c.proxy,c.include=function(b){a.extend(this.fn,b)},c.extend=function(b){a.extend(this,b)},b&&c.include(b),c},b.Controller=c}(d,window),c.exports=window.Controller}),define("dist/lib/helper",[],function(a,b,c){c.exports={bloodView:function(a,b,c,d,e){var f=a.find(".attack-name").eq(0),g=a.find(".attack .progress").eq(0),h=g.find(".bar").eq(0),i=a.find(".attack .blood-len").eq(0),j=a.find(".defence-name").eq(0),k=a.find(".defence .progress").eq(0),l=k.find(".bar").eq(0),m=a.find(".defence .blood-len").eq(0);f.text(b),i.text(c),g.width(c),h.width(c),j.text(d),m.text(e),k.width(e),l.width(e),a.show()},fight:function(a,b,c,d){if(console.log(d),a.name.indexOf("习近平")>-1||b.name.indexOf("习近平")>-1)return d.html('<div class="fight-result">岂容你造次!</div>'),d.find(".fight-result").eq(0).show(),void 0;for(var e={attack:{name:a.name,life:a.blood,blood:a.blood,log:[]},defence:{name:b.name,life:b.blood,blood:b.blood,log:[]}},f=1,g=0,h=function(b){g=a[b](),e.defence.blood-=g,e.attack.log.push({type:b,hurt:g,left:Math.max(0,e.defence.blood)}),e.defence.blood>0&&(g=a[b](),e.attack.blood-=g,e.defence.log.push({type:b,hurt:g,left:Math.max(0,e.attack.blood)}))};e.attack.blood>0&&e.defence.blood>0;)h(f%3>0?"normal":"skill"),f++;for(e.result=e.attack.blood>0?!0:!1,i=0,len=e.attack.log.length;len>i;i++)item=e.attack.log[i],c[2*i]={attack:!0,from:a.name,to:b.name,type:item.type,hurt:item.hurt,left:item.left};for(i=0,len=e.defence.log.length;len>i;i++)item=e.defence.log[i],c[2*i+1]={from:b.name,to:a.name,type:item.type,hurt:item.hurt,left:item.left};return e}}}),define("dist/app/fight/tpl/log",[],function(){return{render:function(a){var b=[],c=[];for(var d in a)b.push(d),c.push(a[d]);return new Function(b,"var _s=[];_s.push('');for(var index=0; index<log.length;index+=1){var item=log[index];_s.push(' <div class=\"attack-item\">',item.from,'使用 <em class=\"fight-type\">',item.type === 'normal' ? '普通攻击' : '必杀技能','</em>， 造成 <span class=\"fight-hurt\">',item.hurt,'</span>点伤害，',item.to,'剩余血量',item.left,'</div>');}_s.push(' <div class=\"fight-result\">');if(result.result){_s.push(result.defence.name);}else{_s.push(result.attack.name);}_s.push(' 取得了胜利 </div>'); return _s;").apply(null,c).join("")}}});
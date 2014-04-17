
define(function(require,exports,module){
	var jClass=require('./jClass');

	var Fighter=jClass.extend({
		init:function(name){
			//根据name,算出血量
			this.name=name;
			this.blood=this.getBlood(name);
		},
		getBlood:function(name){
			//写一个方法获取一个字符串的数值
			var StringN=function(str){
				var n = 0;
	            var temp = encodeURIComponent(str).split('%');
	            for(var i = 1, len = temp.length; i < len; i++) {
	                var m = temp[i];
	                var p = m[0];
	                var q = m[1];
	                p = isNaN(+p) ? p.charCodeAt(0) : p;
	                q = isNaN(+q) ? q.charCodeAt(0) : q;
	                n += (p === 0 || q === 0) ? p + q : p * q;
	            }
	            return n;
			};
			var i = 0; // 用于循环
            var m = 4; // 最大长度
            var len = name.length;
            if(len < m) {
                for(i = 0; i < m - len; i++) {
                    name += '一';
                }
            } else if(len > m) {
                name = name.slice(0, m);
            }
            var n = StringN(name);
            var base = 300;
            return Math.floor(base + (n - base) / 100);
		},
		//普通攻击
		normal:function(){
			return Math.floor(0.5 * this.random(60, 150));
		},
		//暴击
		skill:function(){
			return Math.floor(1.25 * this.random(60, 150));
		},
		random: function(min, max) {
            return Math.ceil(Math.random() * (max - min) + min);
        }

	})
	module.exports=Fighter;
})










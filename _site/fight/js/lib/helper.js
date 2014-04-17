define(function(require,exports,module){
	module.exports={
		bloodView: function(bloodBar, attackName, attackBlood, defenceName, defenceBlood) {
            var attackNameNode = bloodBar.find('.attack-name').eq(0);
            var attackBloodView = bloodBar.find('.attack .progress').eq(0);
            var attackBloodLen = attackBloodView.find('.bar').eq(0);
            var attackBloodNode = bloodBar.find('.attack .blood-len').eq(0);
            var defenceNameNode = bloodBar.find('.defence-name').eq(0);
            var defenceBloodView = bloodBar.find('.defence .progress').eq(0);
            var defenceBloodLen = defenceBloodView.find('.bar').eq(0);
            var defenceBloodNode = bloodBar.find('.defence .blood-len').eq(0);
            attackNameNode.text(attackName);
            attackBloodNode.text(attackBlood);
            attackBloodView.width(attackBlood);
            attackBloodLen.width(attackBlood);
            defenceNameNode.text(defenceName);
            defenceBloodNode.text(defenceBlood);
            defenceBloodView.width(defenceBlood);
            defenceBloodLen.width(defenceBlood);
            bloodBar.show();
        },
        //这个函数的目的是，根据两个fighter，输出log
		fight:function(attacker,defenceer,log,box){
			//判断有没有习近平
			if(attacker.name.indexOf('习近平')>-1||defenceer.name.indexOf('习近平')>-1){
				box.html('<div class="fight-result">岂容你造次!</div>');
				box.find('.fight-result').eq(0).show();
				return;
			}
			//helper.fight(attacker,defenceer,log ,this.box);				attacker,defenceer是一个对象。log是一个数组。this.box是一个jquery对象

	        var result = {
	            attack: {
	                name: attacker.name,
	                life: attacker.blood,
	                blood: attacker.blood,
	                log: []
	            },
	            defence: {
	                name: defenceer.name,
	                life: defenceer.blood,
	                blood: defenceer.blood,
	                log: []
	            }
	        };

	        var n = 1; // 进攻轮数
	        var hurt = 0; // 伤害值
	        var action = function(type) {
	            //hurt = helper[type]();									//这儿需要修改
	            hurt=attacker[type]();
	            result.defence.blood -= hurt;
	            result.attack.log.push({
	                type: type,
	                hurt: hurt,
	                left: Math.max(0, result.defence.blood) // 对方剩余血量
	            });
	            if(result.defence.blood > 0) {
	                hurt = attacker[type]();
	                result.attack.blood -= hurt;
	                result.defence.log.push({
	                    type: type,
	                    hurt: hurt,
	                    left: Math.max(0, result.attack.blood) // 对方剩余血量
	                });
	            }
	        };

	        while(result.attack.blood > 0 && result.defence.blood > 0) {
	            action(n % 3 > 0 ? 'normal' : 'skill');
	            n++;
	        }
	        result.result = result.attack.blood > 0 ? true : false;

	        for(i = 0, len = result.attack.log.length; i < len; i++) {
                item = result.attack.log[i];
                log[2 * i] = {
                    attack: true,
                    from: attacker.name,
                    to: defenceer.name,
                    type: item.type,
                    hurt: item.hurt,
                    left: item.left
                };
            }
            for(i = 0, len = result.defence.log.length; i < len; i++) {
                item = result.defence.log[i];
                log[2 * i + 1] = {
                    from: defenceer.name,
                    to: attacker.name,
                    type: item.type,
                    hurt: item.hurt,
                    left: item.left
                };
            }
            return result;
		}
	}
})
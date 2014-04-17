(function(){
	var development=true;
	var plugins=[];
	var map=[];

	if(location.href.indexOf('development')>0||location.search.indexOf('seajs-debug')>0){
		development=true;
	}

	if(development){
		plugins.push('nocache');
		var dist='public/js/dist';

		var src='js/';

		map.push(function(url){							//通过map实现映射
			if(url.indexOf(dist)>0){
				console.log(url);
				url=url.replace(dist,src);
				console.log(url);
			}
			return url;
		});
	}

	seajs.development=development;
	seajs.config({
		plugins:plugins,
		map:map,
		alias:{										//通过alias实现别名配置
			jquery:'jquery/jquery.js'						//这儿不需要./
		}
	})
})()
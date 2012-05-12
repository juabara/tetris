/**
 * @author : Renato Seiji Miawaki - reytuty@gmail.com
 * Nessa classe são carregadas as imagens com 2 callbacs possíveis
 * onLoadProgress (float)
 * onComplete (array)
 * 
 * assets deve ser um obj com as propriedades de cada imagem
 * a nome da propriedade será o mesmo nome no indice da array para pegar futuramente
 * ou seja, o id
 * 
 * ex: {logotipo:"http://meulogotipo.com/logo.jpg", background:"http://meubg.com/bg.png"}
 */
function TetrisAssets(assets){
	var me = this;
	this.assets = assets;
	this.onLoadProgress;
	this.onComplete;
	var loaderInfo = {totalToLoad:0,totalLoaded:0};
	this.load = function(){
		var images = [];
		for(var src in me.assets){
			loaderInfo.totalToLoad++;
		};
		if(me.onLoadProgress) me.onLoadProgress(0);
		for(var src in me.assets){
			images[src] = new Image();
	        images[src].onload = function(){
	        	++loaderInfo.totalLoaded;
	        	if(me.onLoadProgress) me.onLoadProgress(loaderInfo.totalLoaded/loaderInfo.totalToLoad);
	            if (loaderInfo.totalLoaded >= loaderInfo.totalToLoad) {
	            	images["_total"] = loaderInfo.totalLoaded;
	                if(me.onComplete) me.onComplete(images);
	            }
	        };
	        images[src].src = me.assets[src];
		};
	};//end load
};

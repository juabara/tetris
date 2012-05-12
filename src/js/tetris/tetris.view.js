/**
 * @author : Renato Seiji Miawaki - reytuty@gmail.com
 * Nessa classe o tetris é desenhado conforme dados da core
 * config = {
 * 				element_id:"id_no_html",
 * 				 
 * 			}
 * TODO: criar área de hit para os botões, porque ele não estarão sempre lá.
 */
function TetrisView(config){
	var me = this;
	this.drawedScreenQuads 	= [];
	this.drawedNextPiece 	= [];
	this.arrayColors		= [];
	
	var loaderInfo = {totalLoaded:0,totalToLoad:0};
	
	/**
	 * objetos para se criar metodos a serem chamados conforme os eventos
	 */
	this.events = {};
	if(!config.hasOwnProperty("element_id")) alert("TetrisView precisa de element_id como atributo de config");
	if(!config.hasOwnProperty("width") || !config.width > 0) config.width = 320;//largura padrão
	if(!config.hasOwnProperty("width") || !config.height > 0) config.height = 480;//largura padrão
	
	if(!config.hasOwnProperty("pieceSize") || !config.pieceSize > 0) config.pieceSize = config.height/20;//largura padrão
	this.config = config;
	var stage = new Kinetic.Stage(config.element_id, config.width, config.height);
	this.messages = new TetrisMessages(config);
	var layerMessages	= this.messages.Layer();
	var layerPanel 		= new Kinetic.Layer();
	var layerPieces 	= new Kinetic.Layer();
	var layerNextPiece	= new Kinetic.Layer();
	var layerWall 		= new Kinetic.Layer();
	var layerBackground	= new Kinetic.Layer();
	
	stage.add(layerBackground);
	stage.add(layerWall);
	stage.add(layerPieces);
	stage.add(layerPanel);
	stage.add(layerMessages);
	
	this.onClientPressRigth;
	this.onClientPressLeft;
	this.onClientPressSpin;
	this.onClientTouchWipeDown;
	this.onClientTouchWipeUp;
	this.clientPressRigth = function(){
		if(me.onClientPressRigth) me.onClientPressRigth();
	};
	this.clientPressLeft = function(){
		if(me.onClientPressLeft) me.onClientPressLeft();
	};
	this.clientPressSpin = function(){
		if(me.onClientPressSpin) me.onClientPressSpin();
	};
	var startTouchInitY = 0;
	var totalMove = 0;
	var debug = ""; 
	this.clientTouchStartScreen = function(e){
		startTouchInitY = e.touches[0].clientY;
		totalMove = 0;
		//debug = "";
		//startTouchInitY = e.touches[0].clientY;
	};
	this.clientTouchMoveScreen = function(e){
		if(!e.touches || !e.touches[0]){
			return;
		}
		//alert("clientTouchMoveScreen:"+e.touches[0].clientY);
		totalMove += (e.touches[0].clientY-startTouchInitY);
		//debug += " || "+e.touches[0].clientY+"-"+startTouchInitY;
		startTouchInitY = e.touches[0].clientY;
		
	};
	this.clientTouchEndScreen = function(){
		if(totalMove > 70){
			me.wipeDownPressed();
		} else if(totalMove < -70){
			if(me.onClientTouchWipeUp) me.onClientTouchWipeUp();
		}
		//alert("mecheu:"+totalMove);
		//alert("debug:"+debug);
		totalMove = 0;
	};
	//hits
	var bgButton 	= new Kinetic.Rect({x:0, y:0, width:config.width, height:config.height, fill: "#FFFFFF", alpha:0});
	var bgHitLeft 	= new Kinetic.Rect({x:0, y:Math.floor(2*config.height/3), width:Math.floor(config.width/3), height:Math.floor(config.height/3), fill: "#FF00FF", alpha:0});
	var bgHitMiddle	= new Kinetic.Rect({x:Math.floor(config.width/3), y:Math.floor(2*config.height/3), width:Math.floor(config.width/3), height:Math.floor(config.height/3), fill: "#00FFFF", alpha:0});
	var bgHitRight 	= new Kinetic.Rect({x:Math.floor(2*config.width/3), y:Math.floor(2*config.height/3), width:Math.ceil(config.width/3), height:Math.floor(config.height/3), fill: "#FFFF00", alpha:0});
	
	bgButton.on("touchstart", this.clientTouchStartScreen);
	bgButton.on("touchmove", this.clientTouchMoveScreen);
	bgButton.on("touchend", this.clientTouchEndScreen);
	
	bgHitLeft.on("mousedown touchstart tap", this.clientPressLeft);
	bgHitMiddle.on("mousedown touchstart tap", this.clientPressSpin);
	bgHitRight.on("mousedown touchstart tap", this.clientPressRigth);
	
	layerPanel.add(bgButton);
	layerPanel.add(bgHitLeft);
	layerPanel.add(bgHitMiddle);
	layerPanel.add(bgHitRight);
	this.hideButtons = function(){
		layerPanel.alpha = 0;
		layerPanel.draw();
		//stage.remove(layerPanel);
	};
	this.wipeDownPressed = function(){
		//alert("wipeDown!");
		if(me.onClientTouchWipeDown) me.onClientTouchWipeDown();
	};
	this.onImagesLoaded = function(images){
		console.log("onImagesLoaded ("+images.length+")", images);
		var direita = new Kinetic.Image({image:images.direita});
		direita.x = config.width - 70;
		direita.y = config.height - 70;
		direita.on("mousedown touchstart tap", me.clientPressRigth);
		layerPanel.add(direita);
		
		var esquerda = new Kinetic.Image({image:images.esquerda});
		esquerda.x = 10;
		esquerda.y = config.height - 70;
		esquerda.on("mousedown touchstart tap", me.clientPressLeft);
		layerPanel.add(esquerda);
		
		var gira = new Kinetic.Image({image:images.gira});
		gira.x = config.width/2-30;
		gira.y = config.height - 72;
		gira.on("mousedown touchstart tap", me.clientPressSpin);
		layerPanel.add(gira);
		layerPanel.draw();
	};
	this.onImagesLoadProgress = function(percent){
		
		if(percent < 1){
			var strTemp = "";
			for(var i = 0; i < 10; i++){
				strTemp += (percent*10 > i) ? "x" : ".";
			}
			console.log("onImagesLoadProgress", strTemp);
			me.messages.writeMessage("["+strTemp+"]", {x:0, y:0});
		} else {
			me.messages.writeMessage("[carregado]", {x:0, y:0}, 400);
		}
		
	};
	//images assets
	var assets = {
		direita:"img/direita.png",
		esquerda:"img/esquerda.png",
		gira:"img/gira.png"
	};
	var assetLoader = new TetrisAssets(assets);
	assetLoader.onComplete = this.onImagesLoaded;
	assetLoader.onLoadProgress = this.onImagesLoadProgress;
	assetLoader.load();
	
	var initX 	= config.width/2-(config.pieceSize*10)/2;
	
	
	this.setColorsIndex = function(arrayColors){
		me.arrayColors = arrayColors;
	};
	this.setGameState = function(core){
		me.clearPieces();
		//layerPieces
		core.gamePanel;
		//desenha a próxima pedra - layerNextPiece
		core.nextPiece;
	};
	var lastArrayData = [[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]];
	/**
	 * Redesenha baseado no data_array enviado
	 */
	this.setGameEcra = function(data_array, currentPiece, nextPiece){
		var context = layerPieces.getContext();
		//console.log("currentPiece:"+currentPiece.piecePoint.x+" , "+currentPiece.piecePoint.y);
		//alert("setGameEcra "+data_array.length+" > "+data_array[0].length);
		for(var i =0; i < data_array.length; i++ ){
			for(var j =0; j < data_array[i].length; j++ ){
				var info = data_array[i][j];
				if(lastArrayData[i][j]!=info){
					lastArrayData[i][j] = info;
					var cor = null;
					var line_color = "#cccccc";
					if(info){
						cor = me.arrayColors[info];
						line_color = "#000000";
					}
					me.drawQuad(context, cor, initX+i*config.pieceSize, j*config.pieceSize, config.pieceSize, config.pieceSize, line_color);
				}
			}
		}

		for(var i =0; i < currentPiece.piece.length; i++ ){
			for(var j =0; j < currentPiece.piece[i].length; j++ ){
				var info = currentPiece.piece[i][j];
				var cor = null;
				if(info){
					cor = me.arrayColors[info];
					me.drawQuad(context, cor, initX+(i+currentPiece.piecePoint.x)*config.pieceSize, (j+currentPiece.piecePoint.y)*config.pieceSize, config.pieceSize, config.pieceSize,"#000000");
					lastArrayData[i+currentPiece.piecePoint.x][j+currentPiece.piecePoint.y] = info;
				}
				
			}
		}
		//alert(config.pieceSize);
		var nextX = initX+config.pieceSize*11;
		var nexty = config.pieceSize*2;
		var nextSize = (config.pieceSize/2);
		
		for(var i =0; i < 4; i++ ){
			for(var j =0; j < 4; j++ ){
				var info = null;
				if(nextPiece.length > i && nextPiece[i].length > j){
					info = nextPiece[i][j];
				}
				var cor = null;
				if(info){
					cor = me.arrayColors[info];
					me.drawQuad(context, cor, nextX+(i)*nextSize, nexty+j*nextSize, nextSize, nextSize,"#000000");
				} else {
					me.drawQuad(context, null, nextX+(i)*nextSize, nexty+j*nextSize, nextSize, nextSize, null);
				}
				
			}
		}
		
	};
	this.reset = function(){
		layerPieces.draw();
	}
	this.clearPieces = function(){
		//clear na tela de peças
		for(var i = 0; i < me.drawedScreenQuads.lenght; i++){
			layerPieces.remove(me.drawedScreenQuads[i]);
		}
		//clear na próxima pedra
		for(var i = 0; i < me.drawedNextPiece.lenght; i++){
			layerNextPiece.remove(me.drawedNextPiece[i]);
		}
	};
	this.drawQuad = function(context, bg_color, x, y, width, height, line_color){
		if(!bg_color){
			//sem cor? então apaga
			context.clearRect(x, y, width, height);
			return;
		}
		context.beginPath();
		context.rect(x, y, width, height);
		context.fillStyle = bg_color;
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = line_color;
		context.stroke();
	};
	this.init = function(){};
		//---------------------- draw wall
		var wallContext = layerWall.getContext();
		var indexWall 	= 0;
		var wallColors 	= ["#110101", "#000000"];
		for(var i =0; i < 20; i++ ){
			indexWall = Math.abs(indexWall-1);
			for(var j =0; j < 10; j++ ){
				indexWall = Math.abs(indexWall-1);
				//desenhando cada linha
				var cor = wallColors[indexWall];
				//me.drawQuad(wallContext, cor, j*24, i*24, 24, 24);
				me.drawQuad(wallContext, cor, initX+j*config.pieceSize, i*config.pieceSize, config.pieceSize, config.pieceSize, "#cccccc");
			}
		}
		var bgContext = layerBackground.getContext();
		me.drawQuad(bgContext, "#110011", 0, 0, config.width, config.height, "#FFFFFF");
	//};
}

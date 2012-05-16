/**
 * @author : Renato Seiji Miawaki - reytuty@gmail.com
 * Nessa classe o tempo de jogo e eventos de teclado é passado e recebido, e faz-se o pedido de updateEcra da view
 */
function TetrisEngine(config){
	var me = this;
	this.config = config;
	this.view 	= new TetrisView(config);
	this.view.events.onClickStart = this.startNewGame;
	this.core 	= new TetrisCore(config);
	this.view.setColorsIndex(this.core.getColors());
	this.level = 0;
	//pontuation
	this.pontuation = {oneLine:20, piece:2, followPiece:4, twoLines:50, threLines:100, fourLines:200};
	this.levelTimes = 600;
	this.startLevelTime = 600;
	this.intervalId;
	this.getEmptyPoints = function(){
		return {linesPoints:0, points:0};
	};
	this.score = this.getEmptyPoints();
	/**
	 * prepara o jogo para inciar
	 */
	this.init = function(){
		me.view.init();
		me.startNewGame();
	};
	this.view.events.onLoad = me.init;
	/**
	 * inicia uma nova jogada jogo
	 */
	this.startNewGame = function(){
		reset();
		startTimer();
	};
	this.pauseGame = function(){
		stopTimer();
	};
	this.unpauseGame = function(){
		startTimer();
	};
	/**
	 * a cada interação no loop, esse evento é chamado.
	 */
	this.onLoopEvent = function(){
		me.core.tick();
	};
	this.newPiece = function(){
		me.score.points += me.pontuation.piece;
		me.view.messages.setScore(me.score.points);
	}
	this.moveDown = function(){
		me.score.points += me.pontuation.followPiece;
	}
	
	this.updateEcra = function(lines){
		if(lines && lines.lines && lines.lines.length > 0){
			var points = [0, me.pontuation.oneLine, me.pontuation.twoLines, me.pontuation.threLines, me.pontuation.fourLines];
			var totalLines = 0;
			var messagesAlert = ["", "line!", "DOBLE lines!", "TREBLE lines!", "Many Fucking Lines!!!!"];
			totalLines = lines.lines.length;
			me.view.messages.writeMessage(messagesAlert[totalLines],{x:200, y:150}, 1000);
			
			me.score.linesPoints += totalLines;
			me.view.messages.setLines(me.score.linesPoints);
			me.score.points += points[totalLines];
			
			var oldLevel = me.level;
			me.level = Math.floor(me.score.points/200);
			if(oldLevel != me.level){
				startTimer();
				if(me.level > 0){
					me.view.hideButtons();
				}
			}
			me.view.messages.setLevel(me.level);
			me.view.messages.setScore(me.score.points);
		}
		
		
		me.view.setGameEcra(me.core.gamePanel, {piece:me.core.currentPiece,piecePoint:{x:me.core.currentX,y:me.core.currentY}}, me.core.nextPiece);
	}
	/**
	 * metodo privado para zerar a tela, pontos, fases e etc.
	 */
	function reset(){
		me.core.newGame();
		me.view.reset();
		me.core.start();
		me.levelTimes = me.startLevelTime;
		stopTimer();
	};
	function startTimer(){
		stopTimer();
		me.levelTimes -= 40;//fica mais r�pido ao passar de level
		me.view.messages.writeMessage("Level UP",{x:200, y:300}, 600);
		me.intervalId = setInterval(me.onLoopEvent, me.levelTimes);
	};
	function stopTimer(){
		if(me.intervalId){
			clearInterval(me.intervalId);
		}
	};
	/**
	 * Recebido o fim de jogo
	 */
	this.gameOver = function(){
		me.view.messages.setLevel(me.level);
		me.view.messages.setScore(me.score.points);
		alert(" Game Over: \n level:"+me.level+" \n score:"+me.score.points+" \n lines:"+me.score.linesPoints);
		//TODO: verificar o que faz no fim do jogo
		stopTimer();
	};
	this.moveRight = function(){
		me.core.moveRight();
	};
	this.moveLeft = function(){
		me.core.moveLeft();
	};
	this.wipeDown = function(){
		me.core.moveDown();
	};
	this.moveRotate = function(){
		me.core.rotatePiece();
	};
	this.pause = function(){
		alert('PAUSE');
	};
	this.core.addEventListener("gameOver", this.gameOver);
	this.core.addEventListener("updateDisplay", this.updateEcra);
	this.core.addEventListener("newPiece", this.newPiece);
	this.core.addEventListener("moveDown", this.moveDown);
	//pegando evento de teclado
	$(window).keyup(function(event) {
		console.log(event);
		console.log(event.keyCode);
		switch(event.keyCode){
			case 39:
				//direita
				me.moveRight();
				break;
			case 37:
				//esquerda
				me.moveLeft();
				break;
			case 32:
				//espa�o
				me.wipeDown();
				break;
			case 40:
				//baixo
				me.moveRotate();
				//me.wipeDown();
				break;
			case 38:
				me.moveRotate();
				break;
			case 80:
				//P
				me.pause();
				break;
			default:
				//espaço
				//alert(event.keyCode);
				//me.moveRotate();
				break;
		}
		
	});
	//agora os eventos do mouse ou touch pegando da view e passando para o core
	
	this.view.onClientPressRigth = this.moveRight;
	this.view.onClientPressLeft = this.moveLeft;
	this.view.onClientPressSpin = this.moveRotate;
	this.view.onClientTouchWipeDown = this.wipeDown;
	this.view.onClientTouchWipeUp = this.pause;
}

/**
 * @author : Renato Seiji Miawaki - reytuty@gmail.com
 * Nessa classe são desenhas as telas de mensagens e tem os metodos para exibi-las
 * 
 */
function TetrisMessages(config){
	var me = this;
	this.config = config;
	
	var layerMessages	= new Kinetic.Layer();
	this.Layer = function(){
		return layerMessages;
	};
	this.getTextBox = function(){
		return new Kinetic.Text({
                text: "",
                textFill: "white",
                fontFamily: "Calibri",
                fontSize: 12,
                padding: 5,
                fill: "black",
                visible: false,
                alpha: 0.75
            });
	};
	//message
	var levelMessage = this.getTextBox();
	levelMessage.setText("level : 0");
    levelMessage.setPosition(50, 30);
    levelMessage.show();
    layerMessages.add(levelMessage);
	var scoreMessage = this.getTextBox();
	scoreMessage.setText("score: 0");
    scoreMessage.setPosition(50, 50);
    scoreMessage.show();
    layerMessages.add(scoreMessage);
	var lineMessage = this.getTextBox();
	lineMessage.setText("lines : 0");
    lineMessage.setPosition(50, 70);
    lineMessage.show();
    layerMessages.add(lineMessage);
	
	var tempMessage = this.getTextBox();
    tempMessage.setPosition(0, 0);
    layerMessages.add(tempMessage);
    
	this.writeMessage = function(message, localPoint, autoHideTime){
        tempMessage.setText(message);
        tempMessage.setPosition(localPoint.x, localPoint.y);
        tempMessage.show();
        tempMessage.getLayer().draw();
        if(autoHideTime) setTimeout(me.hideMessage, autoHideTime);
   };
   this.setScore = function(n){
   		scoreMessage.setText("score: "+n);
   		scoreMessage.getLayer().draw();
   };
   this.setLevel = function(n){
   		levelMessage.setText("level : "+n);
   		levelMessage.getLayer().draw();
   };
   this.setLines = function(n){
   		lineMessage.setText("lines : "+n);
   		lineMessage.getLayer().draw();
   };
    this.hideMessage = function(){
    	tempMessage.setText("");
    	tempMessage.hide();
    	tempMessage.getLayer().draw();
    };
};

/**
 * instancia as classes e inicia
 * 
 */
$(function(){
	$("html").css("overflow", "hidden");

	window.tetrisEngine 	= new TetrisEngine({element_id:"tetris",width:$(window).width(), height:$(window).height()});
	window.tetrisEngine.init();
});

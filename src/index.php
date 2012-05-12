<!DOCTYPE html>
<!--
	@author: Juarez , Renato Miawaki - reytuty@gmail.com, Pedro Paulo Almeida
-->
<html>
	<head>
		<title>Tetris HTML5 Canvas</title>
		<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
		<!--   <script type="text/javascript" src="js/touchwipe.1.1.1.js"></script>
		
		<script src="js/kinetic-v3.8.5.min.js"></script>
		-->
		<script src="js/kinetic-v3.8.5.min.js"></script>
    	<script type="text/javascript" src="js/tetris/messages.view.js?cache=<?php echo time() ?>"></script>
    	<script type="text/javascript" src="js/tetris/assets.view.js?cache=<?php echo time() ?>"></script>
		<script type="text/javascript" src="js/tetris/tetris.view.js?cache=<?php echo time() ?>"></script>
		<script type="text/javascript" src="js/tetris/tetris.core.js?cache=<?php echo time() ?>"></script>
		<script type="text/javascript" src="js/tetris/tetris.engine.js?cache=<?php echo time() ?>"></script>
		<meta name="apple-mobile-web-app-capable" content="no" />
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		
		<script type="text/javascript" src="js/Main.js?cache=<?php echo time() ?>"></script>
		<script>
		/*
		function hideAddressBar()
		{
		  if(!window.location.hash)
		  {
		      if(document.height < window.outerHeight)
		      {
		          document.body.style.height = (window.outerHeight + 50) + 'px';
		      }

		      setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
		  }
		}

		window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
		window.addEventListener("orientationchange", hideAddressBar );
		*/
		</script>
	</head>

	<body style="margin: 0px;"  onmousedown="return false;">
		<div id="tetris"></div>
		
		<EMBED SRC="sound/TetrisA.mid" hidden=true autostart=true loop="true" />
		
	</body>

</html>
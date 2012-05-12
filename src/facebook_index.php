<?php

include_once("src/base_facebook.php");
include_once("src/facebook.php");

$FaceBook = new Facebook(array(
							'appId'  => '260422057378760',
  							'secret' => '99c13be0d558ba7bc836957b694d674f',
							
							));

$token = $FaceBook->getAccessToken();

//var_dump($token);


$user = $FaceBook->getUser();



if ($user) {
  $logoutUrl = $FaceBook->getLogoutUrl();
  $teste = $FaceBook->api("/me");
  //var_dump($teste);
  
  $teste = $FaceBook->api("/me/bingofree:win");
  var_dump($teste);
  ?>
	<img src="https://graph.facebook.com/<?php echo $user; ?>/picture">
<?php
} else {
  $loginUrl = $FaceBook->getLoginUrl();
  header("Location: $loginUrl");
  exit();
}

?>
<!DOCTYPE html>
<!--
	@author: Juarez , Renato Miawaki - reytuty@gmail.com, Pedro Paulo Almeida
-->
<html>
	<head>
		<title>Tetris HTML5 Canvas</title>
		<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
		<!--
		<script type="text/javascript" src="js/kinetic-v3.7.3.min.js"></script>
		<script src="js/kinetic-image-plugin-v1.0.1.js"></script>
		-->
		<script src="http://www.html5canvastutorials.com/libraries/kinetic-v3.8.4.js">
    </script>
    	<script type="text/javascript" src="js/tetris/messages.view.js?vaitomanocu"></script>
		<script type="text/javascript" src="js/tetris/tetris.view.js?vaitomanocu"></script>
		<script type="text/javascript" src="js/tetris/tetris.core.js?vaitomanocu"></script>
		<script type="text/javascript" src="js/tetris/tetris.engine.js?vaitomanocu"></script>
		
		<script type="text/javascript" src="js/Main.js"></script>
	</head>

	<body style="margin: 0px;">
		<div id="tetris"></div>
		<!--
		<EMBED SRC="sound/TetrisA.mid" hidden=true autostart=true loop=-1 />
		-->
	</body>

</html>
/**
 * @author: Juarez
 *  core do tetris
 * 	core.gamePanel objeto com a array do estado atual da tela
 * 	core.nextPiece objeto com a array da proxima peca
 */

function TetrisCore() {
  this.newGame();
  this.events = {};
}

TetrisCore.prototype.newGamePanel = function() {
  var gamePanel = Array(10);
	for (var row = 0; row < gamePanel.length; row++) {
		gamePanel[row] = new Array(20);
	}
	return gamePanel;
};

TetrisCore.prototype.getPieces = function() {
  //line
  var i = this.getEmptyPiece(4);
  i[0][1] = i[1][1] = i[2][1] = i[3][1] = 1;
  //J
  var j = this.getEmptyPiece(3);
  j[0][1] = j[0][2] = j[1][2] = j[2][2] = 2;
  //L
  var l = this.getEmptyPiece(3);
  l[2][0] = l[0][1] = l[1][1] = l[2][1] = 3;
	
  var o = this.getEmptyPiece(4);
  o[1][1] = o[1][2] = o[2][1] = o[2][2] = 4;

  var s = this.getEmptyPiece(3);
  s[1][0] = s[2][0] = s[0][1] = s[1][1] = 5;

  var t = this.getEmptyPiece(3);
  t[1][0] = t[0][1] = t[1][1] = t[2][1] = 6;
	
  var z = this.getEmptyPiece(3);
  z[0][0] = z[1][0] = z[1][1] = z[2][1] = 7;
  var all = [ i, j, l, o, s, t, z ];
  return all;
};

TetrisCore.prototype.getEmptyPiece = function(n) {
  var piece = new Array(n);
  for (var row = 0; row < piece.length; row++) {
    piece[row] = new Array(n);
  }
  return piece;
};

TetrisCore.prototype.getColors = function() {
  var colors = [];
  colors[1] = '#00FFFF'; //cyan
  colors[2] = '#0000FF'; //blue
  colors[3] = '#FFA500'; //orange
  colors[4] = '#FFFF00'; //yellow
  colors[5] = '#00FF00'; //green
  colors[6] = '#FF00FF'; //purple
  colors[7] = '#FF0000'; //red
  return colors;
};

TetrisCore.prototype.randomPiece = function() {
  var index = Math.floor(Math.random() * this.pieces.length);
  return this.pieces[index];
};

TetrisCore.prototype.rotatePiece = function() {
  var originalPiece = this.currentPiece,
      rotatedPiece = this.getEmptyPiece(this.currentPiece.length);
  var newRow = 0;
  var newColumn = 0;
      
  for (var column = 0; column < this.currentPiece[0].length; column++) {
  	newColumn = 0;
    for (var row = this.currentPiece.length -1; row >= 0; row--) {
      rotatedPiece[newRow][newColumn] = this.currentPiece[row][column];
      newColumn++;
    }
    newRow++;
  }

  this.currentPiece = rotatedPiece;

  if (this.collides(this.currentX, this.currentY)) {
    this.currentPiece = originalPiece;
    return;
  }

  this.dispatchEvent("updateDisplay");

};

TetrisCore.prototype.moveLeft = function() {
  var x = this.currentX - 1;
  if (this.collides(x, this.currentY)) return false;
  this.currentX = x;
  this.dispatchEvent("updateDisplay");
  return true;
};

TetrisCore.prototype.moveRight = function() {
  var x = this.currentX + 1;
  if (this.collides(x, this.currentY)) return false;
  this.currentX = x;
  this.dispatchEvent("updateDisplay");
  return true;
};

TetrisCore.prototype.moveDown = function() {
  var y = this.currentY + 1;
  while (!this.collides(this.currentX, y))
    y++;
  this.currentY = y - 1;
  this.dispatchEvent("moveDown");
  this.tick();
};  

TetrisCore.prototype.tick = function() {

  if (!this.running) return;

  var y = this.currentY + 1;

  if (!this.collides(this.currentX, y)) {
    this.currentY = y;
    this.dispatchEvent("updateDisplay");
    return;
  }
  
  if (!this.newPiece()) {
    this.dispatchEvent("gameOver");
    return;
  }
  this.dispatchEvent("newPiece");
  //New piece
  var lines = {lines:this.computeLines()};
  console.log("...lines:"+lines.lines);
  this.dispatchEvent("updateDisplay", [lines]);

};

TetrisCore.prototype.computeLines = function() {
  
  var lines = [],
      row = this.gamePanel[0].length-1;
  
  while (row >= 0) { //for (var row = this.gamePanel[0].length-1; row >= 0; row--) {

    if (this.gamePanel[0][row] 
      	&& this.gamePanel[1][row] 
      	&& this.gamePanel[2][row]
      	&& this.gamePanel[3][row] 
      	&& this.gamePanel[4][row] 
      	&& this.gamePanel[5][row] 
      	&& this.gamePanel[6][row] 
      	&& this.gamePanel[7][row] 
      	&& this.gamePanel[8][row] 
      	&& this.gamePanel[9][row]) {

      lines.push(row);

      for (var column = 0; column < this.gamePanel.length; column++)
        for (var r = row; r >= 0; r--)
          this.gamePanel[column][r] = (r > 0) ? this.gamePanel[column][r - 1] : null;

      continue;
    }

    row--;

  }
  return lines;
};


TetrisCore.prototype.collides = function(x, y) {
  for (var column = this.currentPiece.length - 1; column >= 0 ; column--) {
    for (var row = this.currentPiece[column].length - 1; row >= 0; row--) {
      if (this.currentPiece[column][row] 
          && 
          (
            ((row + y) > 19 || (column + x) > 9 || (column + x) < 0)
            || 
            (
              (column + x >= 0 && column + x <= 9)
              && (row + y <= 19)  
              && (this.gamePanel[column + x][row + y])  
            )
          )) {
        return true;
      }
    }
  }
  return false;
};

TetrisCore.prototype.newPiece = function() {
  for (var column = this.currentPiece.length - 1; column >= 0; column--) {
    for (var row = this.currentPiece[column].length - 1; row >= 0; row--) {
      if (
          (row + this.currentY <= 19)
          && (column + this.currentX <= 9)
          && (column + this.currentX >= 0)
          && !(this.gamePanel[this.currentX + column][this.currentY + row])
      )
        this.gamePanel[this.currentX + column][this.currentY + row] = this.currentPiece[column][row];
    }
  }
  this.currentPiece = this.nextPiece;
  this.nextPiece = this.randomPiece();
  this.currentX = 3;
  this.currentY = 0;

  return !this.collides(this.currentX, this.currentY);
};

TetrisCore.prototype.start = function() {
  this.running = !this.running;
};

TetrisCore.prototype.newGame = function() {
  this.speed = 1000;
  this.running = false;
  this.gamePanel = this.newGamePanel();
  this.pieces = this.getPieces();
  this.colors = this.getColors();
  this.currentPiece = this.randomPiece();
  this.nextPiece = this.randomPiece();
  this.currentX = 3;
  this.currentY = 0;
};

//eventos
TetrisCore.prototype.addEventListener = function(eventName, callback) {
  var evts = this.events,
      callbacks = evts[eventName] = evts[eventName] || [];
  callbacks.push(callback);
};

TetrisCore.prototype.removeEventListener = function(eventName) {
  for(var i = 0; i < this.events.length; ++i) {
    if(this.events[i] == eventName) {
      this.events.splice(i, 1);
      return;
    }
  }
};

TetrisCore.prototype.dispatchEvent = function(eventName, args) {
  var callbacks = this.events[eventName];
  if (!callbacks) return;
  for (var i = 0, l = callbacks.length; i < l; i++)
    callbacks[i].apply(null, args);
};
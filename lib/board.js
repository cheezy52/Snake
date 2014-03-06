(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Board = SnakeGame.Board = function(size) {
    this.snake = new SnakeGame.Snake(this);
    this.grid = Board.buildGrid(size);
  }

  Board.buildGrid = function(size) {
    var grid = [];

    for (var i = 0; i < size; i++) {
      grid[i] = [];
      for (var j = 0; j < size; j++) {
        grid[i][j] = null;
      }
    }
    return grid;
  }

  Board.prototype.render = function() {
    var output = "";
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        if (this.hasApple([i,j])) {
          output += "a";
        } else if (this.snake.contains([i,j])) {
          output += "s";
        } else {
          output += "-";
        }
      }
      output += "\n";
    }
    return output;
  }

  Board.prototype.onBoard = function(pos) {
    return (pos[0] >= 0 && pos[0] < this.grid.length &&
        pos[1] >= 0 && pos[1] < this.grid.length);
  }

  Board.prototype.hasApple = function(pos) {
    return (this.grid[pos[0]][pos[1]] === 'a');
  }

})(this);
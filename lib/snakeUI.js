(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var SnakeUI = SnakeGame.SnakeUI = function(el) {
    this.$el = el;
    $(this.$el).height(SnakeGame.DIM_Y);
    $(this.$el).width(SnakeGame.DIM_X);
    this.board = null;
    this.nextTurnDir = null;
    this.highScores = [1600, 800, 400, 200, 100];
  }

  SnakeUI.prototype.start = function() {
    var game = this;
    this.board = new SnakeGame.Board(SnakeGame.GRID_SIZE);
    this.bindKeyHandlers(this.board);
    this.render();
    alert("Ready...set...")
    this.intervalID = window.setInterval(function() {
      game.step();
    }, 1000/SnakeUI.FPS);
  }

  SnakeUI.FPS = 6;
  SnakeGame.APPLE_FREQ = 0.1;
  SnakeGame.DIM_X = 500;
  SnakeGame.DIM_Y = 500;
  SnakeGame.GRID_SIZE = 20;

  SnakeUI.prototype.bindKeyHandlers = function() {
    var game = this;
    $(window).on('keydown', function(event) {
      switch (event.keyCode) {
      case 38:
        //up arrow
        event.preventDefault();
        game.setNextTurnDir("N");
        break;
      case 37:
        //left arrow
        event.preventDefault();
        game.setNextTurnDir("W");
        break;
      case 40:
        //down arrow
        event.preventDefault();
        game.setNextTurnDir("S");
        break;
      case 39:
        //right arrow
        event.preventDefault();
        game.setNextTurnDir("E");
        break;
      }
    })
  }

  SnakeUI.prototype.setNextTurnDir = function(newDirection) {
    var reverse = (this.board.snake.direction === "N" && newDirection === "S" ||
                  this.board.snake.direction === "W" && newDirection === "E" ||
                  this.board.snake.direction === "S" && newDirection === "N" ||
                  this.board.snake.direction === "E" && newDirection === "W");
    if(!reverse) {
      this.nextTurnDir = newDirection;
    }
  }

  SnakeUI.prototype.render = function() {
    this.clearUI();

    for (var i in this.board.grid) {
      var $row = $('<tr></tr>');
      $row.height(SnakeGame.DIM_Y / SnakeGame.GRID_SIZE);
      for (var j in this.board.grid) {
        $td = $('<td></td>');
        $td.width(SnakeGame.DIM_X / SnakeGame.GRID_SIZE);
        if (this.board.hasApple([i,j])) {
          $td.addClass("apple");
        } else if (this.board.snake.contains([i,j])) {
          $td.addClass("snake");
          if (this.board.snake.headPos()[0] === +i &&
              this.board.snake.headPos()[1] === +j) {
            $td.addClass("head");
            //sadly, the snake's head causes warping issues with the table display :(
            //$td.text(":^)");
          }
        } else {
          $td.addClass("empty");
        }
        $row.append($td);
      }
      $(this.$el).append($row);
    }
    this.renderScores();
  }

  SnakeUI.prototype.clearUI = function() {
    $(this.$el).empty();
    $('h2').remove();
    $('#highscores').empty();
  }

  SnakeUI.prototype.renderScores = function() {
    console.log(this.highScores);
    $score = $('<h2></h2>');
    $score.text("Score: " + this.board.snake.score);
    $(this.$el).before($score);

    $hs = $('#highscores');

    for (var i in this.highScores) {
      $tr = $('<tr></tr>');
      $tr.text(this.highScores[i]);
      $hs.append($tr);
    }

  }

  SnakeUI.prototype.step = function() {
    this.board.snake.turn(this.nextTurnDir);
    var dead = !this.board.snake.move();
    if (dead) {
      window.clearInterval(this.intervalID);
      var highScore = this.handleHighScores(this.board.snake.score);

      var replay = false;
      if (highScore) {
        replay = confirm("HIGH SCORE! Your score: " +
          this.board.snake.score + ". Play again?");
      } else {
        replay = confirm("YOU LOSE! Your score: " +
          this.board.snake.score + ". Play again?");
      }
      if (replay) {
        this.start();
      }
    } else {
      if (Math.random() < SnakeGame.APPLE_FREQ) {
        this.board.addApple();
      }
    this.render();
    }
  }

  SnakeUI.prototype.handleHighScores = function(newScore) {
    if (newScore > this.highScores[this.highScores.length - 1]) {
      this.highScores.pop();
      this.highScores.push(newScore);
      this.highScores.sort(function(a, b) {
        return b - a;
      })
      this.render();
      return true;
    }
    return false;
  }

})(this);
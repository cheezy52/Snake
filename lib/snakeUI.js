(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var SnakeUI = SnakeGame.SnakeUI = function(el) {
    this.$el = el;
    this.board = null;
  }

  SnakeUI.prototype.start = function() {
    var game = this;
    this.board = new SnakeGame.Board(10);
    this.bindKeyHandlers(this.board);
    this.intervalID = window.setInterval(function() {
      game.step();
    }, 500);
  }

  SnakeUI.prototype.bindKeyHandlers = function() {
    var game = this;
    $(window).on('keydown', function(event) {
      switch (event.keyCode) {
      case 38:
        //up arrow
        game.board.snake.turn("N");
        break;
      case 37:
        //left arrow
        game.board.snake.turn("W");
        break;
      case 40:
        //down arrow
        game.board.snake.turn("S");
        break;
      case 39:
        //right arrow
        game.board.snake.turn("E");
        break;
      }
    })
  }

  SnakeUI.prototype.step = function() {
    var dead = !this.board.snake.move();
    if (dead) {
      alert("YOU LOSE");
      window.clearInterval(this.intervalID);
    } else {
      $(this.$el).empty();
      $(this.$el).append("<pre>" + this.board.render() + "</pre>");
    }
  }

})(this);
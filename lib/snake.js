(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Snake = SnakeGame.Snake = function(board, startPos) {
    this.direction = "W";
    this.segments = [[4,4]];
    this.growthTurns = 0;
    this.board = board;
    this.score = 0;
  }

  Snake.prototype.move = function() {
    var newPos = this.getNewHeadPos();

    if (this.loseCondition(newPos)) {
      return false;
    }

    if (this.board.hasApple(newPos)) {
      this.growthTurns += 2;
      this.board.removeApple(newPos);
      this.score += 10;
    }

    this.segments.push(newPos);
    this.score += 1;

    if (this.growthTurns > 0) {
      this.growthTurns -= 1;
    } else {
      this.segments.shift();
    }

    return true;
  }

  Snake.prototype.getNewHeadPos = function() {
    var head = this.segments[this.segments.length - 1];
    switch (this.direction) {
      case "N":
        return [head[0] - 1, head[1]];
        break;
      case "E":
        return [head[0], head[1] + 1];
        break;
      case "S":
        return [head[0] + 1, head[1]];
        break;
      case "W":
        return [head[0], head[1] - 1];
        break;
    }
  }

  Snake.prototype.loseCondition = function(newPos) {
    return (this.eatsSelf(newPos) || !this.board.onBoard(newPos))
  }

  Snake.prototype.addSegment = function(newPos) {
    this.segments.push(newPos);
  }

  Snake.prototype.eatsSelf = function(newPos) {
    return(this.contains(newPos))
  }

  Snake.prototype.turn = function(newDirection) {
    if(newDirection) {
      this.direction = newDirection;
    }
  }

  Snake.prototype.contains = function(pos) {
    for (var i in this.segments) {
      if (this.segments[i][0] === +pos[0] && this.segments[i][1] === +pos[1]) {
        return true;
      }
    }
    return false;
  }

  Snake.prototype.headPos = function() {
    return this.segments[this.segments.length - 1];
  }


})(this);
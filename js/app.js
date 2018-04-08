'use strict';
// Gameboard Square for player/enemies/prizes to stand on
class Square {
  constructor (x = 0, y = 0, row = 0, col = 0, status = 'open', texture = 'grass') {
    this.x = x
    this.y = y
    // Status determines how the player interacts with the square when trying to move onto it.
    this.status = status
    this.texture = texture
    this.row = row
    this.col = col
    this.sprite = `images/block-${texture}.png`
  }
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x * scaleRatio, this.y * scaleRatio, 200 * scaleRatio, 200 * scaleRatio)
  }
}

class Character {
  constructor (character = 'ram', x = 0, y = 0, row = 0, col = 0) {
    this.character = character
    this.x = x
    this.y = y
    this.row = row
    this.col = col
    this.width = 200
    this.height = 200
  }
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x * scaleRatio, this.y * scaleRatio, this.width * scaleRatio, this.height * scaleRatio)
  }

  // Enemy check if it's hit the edge of the map and jumps to other side
  checkEdgeCollision () {
    if ((this.x < edgeBorders[this.row][0]) || (this.x > edgeBorders[this.row][1])) {
      [this.x, this.y] = edgeStartingCoordinates[`${this.row}${this.direction}`]
    };
  }
  // Enemy checks if it's collided w/ player
  checkPlayerCollision () {
    if (
      (this.x + 65 >= player.x) &&
            (this.x <= player.x + 65) &&
            (this.row === player.row)
    ) {
      player.collision = true
      sound.playCollision()
    };
  }
  // Moving the enemies
  moveComputer (dt) {
    if (this.direction === 'r') {
      this.x += this.speed * 2 * dt
      this.y += this.speed * 1 * dt
    } else if (this.direction === 'l') {
      this.x -= this.speed * 2 * dt
      this.y -= this.speed * 1 * dt
    };
  }
  // For updating the Enemy
  update (dt) {
    this.moveComputer(dt)
    this.checkPlayerCollision()
    this.checkEdgeCollision()
  }
// For eating the hotdogs
  consume () {
    this.width = 0
    this.height = 0
    findSquareByRowCol(this.row, this.col).status = 'open'
    score.addPoints(this.points)
    score.addPrizeCount()
  }
  // Move the player
  moveToSquare (newSquare) {
    this.x = newSquare.x
    this.y = newSquare.y
    this.row = newSquare.row
    this.col = newSquare.col
  }
};

class Enemy extends Character {
  constructor (character = 'ram', row = 4, col = 4, direction = 'r', speed = 1, x = 0, y = 0) {
    super(character, x, y, row, col)
    let square = findSquareByRowCol(row, col)
    this.x = square.x
    this.y = square.y
    this.direction = direction
    this.speed = speed
    this.sprite = `images/${character}-${direction}.png`
  }
};

class Player extends Character {
  constructor (character = 'dog', x = 100, y = 450, row = 7, col = 5) {
    super(character, x, y, row, col)
    this.sprite = `images/${character}-r.png`
    this.xMovement = 0
    this.yMovement = 0
    this.collision = false
  }

  resetPosition () {
    let playerLosingSquare = findSquareByRowCol(this.row, this.col)
    this.moveToSquare(findSquareByRowCol(7, 5))
    score.loseLife()
    this.row = 7
    this.col = 5
    playerLosingSquare.status = 'open' // Reset the player's current square to being 'open' so they can move there later.
    this.collision = false // Reset the collision variable to allow the script to continue
  }

  handleInput (input) {
    if (['up', 'down', 'left', 'right'].includes(input)) {
      let rowChange = 0
      let colChange = 0
      switch (input) {
        case 'up':
          rowChange = -1
          break
        case 'down':
          rowChange = +1
          break
        case 'left':
          colChange = -1
          break
        case 'right':
          colChange = +1
          break
      }
      this.sprite = `images/${this.character}-${input[0]}.png`
      let oldSquare = findSquareByRowCol(this.row, this.col)
      let newSquare = findSquareByRowCol((this.row + rowChange), (this.col + colChange))
      if (newSquare) {
        switch (newSquare.status) {
          case 'player':
          case 'open':
            this.moveToSquare(newSquare)
            newSquare.status = 'player'
            oldSquare.status = 'open'
            break
          case 'prize':
            // find the prize listed at this square, consume it
            this.moveToSquare(newSquare)
            allPrizes.find(element => element.col === this.col && element.row === this.row).consume()
            newSquare.status = 'player'
            oldSquare.status = 'open'
            break
          case 'finish':
            this.moveToSquare(newSquare)
            newSquare.status = 'player'
            oldSquare.status = 'open'
            winLevel()
            break
          case 'barrier':
            break
        }
      }
    }
  }
};

// Prizes are collected for extra points
class Prize extends Character {
  constructor (character = 'hotdog1', points = 100, row = 3, col = 4) {
    super(character, row, col)
    let square = findSquareByRowCol(row, col)
    square.status = 'prize'
    this.row = row
    this.col = col
    this.x = square.x
    this.y = square.y
    this.character = character
    this.points = points // Point value
    this.sprite = `images/${character}.png`
  }
};

// Barriers are anything that stops the player from moving onto the square
class Barrier extends Character {
  constructor (character = 'chair', row = 3, col = 4) {
    super(character, row, col)
    let square = findSquareByRowCol(row, col)
    square.status = 'barrier'
    this.x = square.x
    this.y = square.y
    this.character = character
    this.sprite = `images/${character}.png`
    this.width = 200
    this.height = 200
  }
}

// Handles score, levels, lives, prizes, writing to local storage, etc.
let score = {
  score: 0,
  lives: 3,
  level: 1,
  currentWorld: 'House',
  hotdogsEaten: 0,
  highScores: [],

  sortNumbers: function (a, b) {
    return b - a
  },

  addToLocalStorage: function () {
    score.highScores.push(this.score)
    localStorage['scores'] = JSON.stringify(score.highScores)
  },

  updateHighScoreTable: function () {
    if (!localStorage.scores) { localStorage.scores = '["0","0"]' }
    score.highScores = JSON.parse(localStorage['scores']).map(Number)
    while (score.highScores.length < 5) {
      score.highScores.push(0)
    };
    score.highScores.sort(score.sortNumbers)
    document.getElementById('high-scores').innerHTML = `<li class="list-group-item high-score-item">1. ${score.highScores[0]}</li>
        <li class="list-group-item high-score-item">2. ${score.highScores[1]}</li>
        <li class="list-group-item high-score-item">3. ${score.highScores[2]}</li>
        <li class="list-group-item high-score-item">4. ${score.highScores[3]}</li>
        <li class="list-group-item high-score-item">5. ${score.highScores[4]}</li>`
  },
  addLevel: function (addALevel = true) {
    if (addALevel) { this.level++ }
    if (levels[(score.level)].world === 'End') {
      gameOver(true)
    };
    let returnValue = false
    if (score.currentWorld !== levels[(score.level)].world) {
      score.currentWorld = levels[(score.level)].world
      returnValue = true
    } else {
    }
    document.getElementById('level').innerText = `Level ${this.level} | The ${this.currentWorld}`
    return returnValue
  },
  addPoints: function (points) {
    this.score += points
    document.getElementById('score').innerText = this.score
  },
  addPrizeCount: function (points) {
    this.hotdogsEaten += 1
  },
  loseLife: function () {
    this.lives -= 1
    if (this.lives > 0) {
      let livesIcons = '<img src="images/paw.svg" class="top-bar-icon">'.repeat(this.lives)
      document.getElementById('lives').innerHTML = livesIcons
    };
  },
  resetLives: function () {
    this.lives = 3
    let livesIcons = '<img src="images/paw.svg" class="top-bar-icon">'.repeat(this.lives)
    document.getElementById('lives').innerHTML = livesIcons
  },
  resetScore: function () {
    this.score = 0
    this.hotdogsEaten = 0
    document.getElementById('score').innerText = this.score
  },
  resetLevel: function () {
    this.level = 1
    this.currentWorld = 'House'
  }
}

// Handles music and sound effects
let sound = {
  musicPlayer: document.createElement('audio'),
  soundOn: true,

  startMusic: function () {
    if (!localStorage.soundOn) { localStorage.soundOn = 'true' }
    sound.soundOn = Boolean(JSON.parse(localStorage['soundOn']))
    let onOrOff = sound.soundOn ? 'on' : 'off'
    document.getElementById('music-pause').innerHTML = `<img src="images/volume-${onOrOff}.svg" class="top-bar-icon">`
    sound.musicPlayer.src = 'mp3/A_A_Aalto_-_Balloons_Rising.mp3'
    sound.musicPlayer.loop = true
    if (sound.soundOn) {
      sound.musicPlayer.play()
    }
  },
  toggleMusic: function () {
    if (sound.soundOn) {
      sound.soundOn = false
      sound.musicPlayer.pause()
      document.getElementById('music-pause').innerHTML = '<img src="images/volume-off.svg" class="top-bar-icon">'
      localStorage['soundOn'] = JSON.stringify(false)
    } else {
      sound.soundOn = true
      sound.musicPlayer.play()
      document.getElementById('music-pause').innerHTML = '<img src="images/volume-on.svg" class="top-bar-icon">'
      localStorage['soundOn'] = JSON.stringify(true)
    };
  },
  playCollision: function () {
    if (sound.soundOn) {
      var audio = new Audio('mp3/dog-bark.mp3')
      audio.play()
    };
  }
}

// Object Generation Functions
function createSquares () {
  let positionIterator = squarePositions.entries()
  for (let [rowIndex, row] of positionIterator) {
    let rowIterator = row.entries()
    for (let [colIndex, coord] of rowIterator) {
      if (coord[0] !== false) {
        let texture = levels[score.level]['rowTextures'][rowIndex]
        if (texture === 'finish') {
          allSquares.push(new Square(coord[0], coord[1], rowIndex, colIndex, 'finish', texture))
        } else {
          allSquares.push(new Square(coord[0], coord[1], rowIndex, colIndex, 'open', texture))
        }
      }
    }
  };
}

function createEnemies () {
  for (var enemy of levels[(score.level)].enemies) {
    allEnemies.push(new Enemy(enemy.character, enemy.row, enemy.col, enemy.direction, enemy.speed))
  };
}

function createPrizes () {
  for (var prize of levels[(score.level)].prizes) {
    allPrizes.push(new Prize(prize.character, prize.value, prize.row, prize.col))
  };
}

function createBarriers () {
  for (var barrier of levels[(score.level)].barriers) {
    allBarriers.push(new Barrier(barrier.character, barrier.row, barrier.col, barrier.points))
  };
}

// Helper Functions
function findSquareByRowCol (row, col) {
  return allSquares.find(function (element) { return element.col === col && element.row === row })
}

// Listeners for screen swipes and key presses
function allowedKeys (e) {
  var allowedKeys = {
    'ArrowLeft': 'left',
    'ArrowUp': 'up',
    'ArrowRight': 'right',
    'ArrowDown': 'down',
    'KeyW': 'up',
    'KeyA': 'left',
    'KeyS': 'down',
    'KeyD': 'right'
  }
  // Block Arrow Keys from scrolling the page
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
  player.handleInput(allowedKeys[e.code])
}

function startKeyboardListener () {
  document.addEventListener('keydown', allowedKeys)
}

function stopKeyboardListener () {
  document.removeEventListener('keydown', allowedKeys)
}

function startSwipeListener () {
  myRegion.bind(gameBoard, mySwipeGesture, function (e) {
    var directionDegree = e.detail.data[0].currentDirection
    if (directionDegree >= 0 && directionDegree <= 90) { var directionOutput = 'up' } else if (directionDegree >= 90 && directionDegree <= 180) { var directionOutput = 'left' } else if (directionDegree >= 180 && directionDegree <= 270) { var directionOutput = 'down' } else if (directionDegree >= 270 && directionDegree <= 360) { var directionOutput = 'right' }
    player.handleInput(directionOutput)
  })
};

// Major Game Functions
function startGame () {
  var engine = Engine(window)
  document.querySelector('#game-intro').style.display = 'none'
  document.querySelector('#score-panel').style.display = 'flex'
  startSwipeListener()
  startLevel(false, false)
  sound.startMusic()
}

// Change this to stop Level 5 from appearing on game end
function startLevel (worldChange = false, gameRestart = false, levelRestart = false) {
  console.log("StartLevel " + worldChange + gameRestart + levelRestart);
  console.log("Lives " + score.lives);
  if (!gameRestart) {
    if (worldChange) {
      popUpText('phrase-holder', 'The ' + score.currentWorld)
    } else {
      popUpText('phrase-holder', 'Level ' + score.level)
    }
  }
  startKeyboardListener()
  allEnemies = []
  allSquares = []
  allBarriers = []
  allPrizes = []
  // This fixes a bug that had enemies in the same row rendering in the same space on game reset
  if (levelRestart) {
    setTimeout(() => {
      createSquares()
      createEnemies()
      createBarriers()
      createPrizes()
      player = new Player('dog')
    }, 10)
  } else {
    createSquares()
    createEnemies()
    createBarriers()
    createPrizes()
    player = new Player('dog')
  }
}

function winLevel () {
  score.addPoints(1000)
  const worldChange = score.addLevel() // Returns true if the new level is in a new world
  stopKeyboardListener()
  setTimeout(() => {
    startLevel(worldChange, false)
  }, 2000)
}

function restartGame () {
  score.resetLevel()
  score.resetLives()
  score.resetScore()
  score.addLevel(false)
  setTimeout(startLevel(true, true), 2000)
}

function gameOver (win = false) { // Used for winning and losing the game
  if (win) {
    score.addPoints(10000)
    score.addPoints(5000 * score.lives)
  }
  stopKeyboardListener()
  score.addToLocalStorage()
  score.updateHighScoreTable()
  gameOverModal(win)
};

// Decorator text for level changes, game over, etc.
function popUpText (elementId, string) {
  let textHolder = document.getElementById(elementId)
  textHolder.style.display = 'flex'
  textHolder.innerHTML = '<span class="success-phrase">' + string + '</span>'
  setTimeout(function () {
    textHolder.style.display = 'none'
  }, 4000)
}

// Popup for stats and further options when the game ends. Handles win and loss.
function gameOverModal (gameWon = false) {
  if (gameWon) {
    let lifeString = (score.lives > 1) ? 'lives' : 'life'
    document.getElementById('modalHeader').innerText = `You Win!`
    document.getElementById('modalBody').innerText = `Hotdogs eaten: ${score.hotdogsEaten} x 100 = ${score.hotdogsEaten * 100} Points
        Levels cleared: ${score.level - 1} x 1000 = ${(score.level - 1) * 1000} Points
        Lives remaining: ${score.lives} x 5000 = ${score.lives * 5000} Points
        End of Game Bonus = 10,000 Points
        You earned ${score.score} points and finished with ${score.lives} ${lifeString}. Great Job!`
    document.getElementById('modalButtons').innerHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Run Through the Field!</button>
        <button type="button" class="btn btn-primary" onclick="restartGame();" data-dismiss="modal">Play Again</button>`
  } else {
    document.getElementById('modalHeader').innerText = `Game Over`
    document.getElementById('modalBody').innerText = `Hotdogs eaten: ${score.hotdogsEaten} x 100 = ${score.hotdogsEaten * 100} Points
        Levels cleared: ${score.level - 1} x 1000 = ${(score.level - 1) * 1000} Points
        You finished with ${score.score} points. Give it another run!`
    document.getElementById('modalButtons').innerHTML = `<button type="button" class="btn btn-primary" data-dismiss="modal">Play Again</button>`
  }
  $('#gameOverModal').modal({ backdrop: 'static', keyboard: false })
}

// Setting global variables
let allEnemies = []
let allSquares = []
let allPrizes = []
let allBarriers = []
let player = {}
score.updateHighScoreTable()
document.getElementById('music-pause').addEventListener('click', sound.toggleMusic)
document.getElementById('game-start-btn').addEventListener('click', startGame)

// Add Swipe functionality to game
var gameBoard = document.getElementById('game-board')
var myRegion = new ZingTouch.Region(gameBoard)
var mySwipeGesture = new ZingTouch.Swipe({
  numInputs: 1,
  maxRestTime: 100,
  escapeVelocity: 0.15
})

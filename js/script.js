let gameContainer = document.querySelector(".game-container");
let scoreContainer = document.querySelector(".score-container");

let foodX, foodY;
let headX = 12,
  headY = 12;
let velocityX = 0,
  velocityY = 0;

let snakeBody = [];

let score = 0;
//  #Step-2 ==============  this function is needed to genarate food
function genarateFood() {
  foodX = Math.floor(Math.random() * 25) + 1;
  foodY = Math.floor(Math.random() * 25) + 1;
  //   console.log(foodX);

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeBody[i][1] == foodY && snakeBody[i][0] == foodX) {
      genarateFood();
    }
  }
}

// ===================================================================

function gameOver() {
  headX = 12;
  headY = 12;
  genarateFood();
  velocityX = 0;
  velocityY = 0;
  alert("Game Over");
  snakeBody = [];
}

//  #Step-1 ============== firstly this function is needed to render the game
function renderGame() {
  let updatedGame = `<div class="food" style="grid-area:${foodY}/${foodX};"></div>`; // this sets the position of the food

  if (foodX == headX && foodY == headY) {
    snakeBody.push([foodX, foodY]);
    genarateFood();
    score += 1;
  }
  if (velocityX==0 && velocityY ==0) {
    scoreContainer.innerHTML = "press any (left,right,up or down) key to start";
  } else {
    scoreContainer.innerHTML = "Score  :  " + score;
  }

  snakeBody.pop();

  headX += velocityX;
  headY += velocityY;

  snakeBody.unshift([headX, headY]);

  if (headX == 0 || headY == 0 || headX == 26 || headY == 26) {
    gameOver();
  }

  for (let i = 1; i < snakeBody.length; i++) {
    if (
      (snakeBody[0],
      [0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1])
    ) {
      gameOver();
    }
  }

  for (let i = 0; i < snakeBody.length; i++) {
    updatedGame += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`; // Step-3 ============= this is the head
  }

  gameContainer.innerHTML = updatedGame;
}
// ===================================================================

genarateFood(); // this genarates the food
setInterval(renderGame, 150); // this function renders the game

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  let key = e.key;
  if (key == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (key == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (key == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (key == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
});

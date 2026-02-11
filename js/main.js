var c = document.getElementById("myArkanoid");
var ctx = c.getContext("2d");

var radius = 10;
var puntoX = c.width / 2;
var puntoY = c.height - 10;

var dx = 2;
var dy = -2;

var paddleX = c.width / 2;
var paddleY = c.height - 10;
var paddleW = 60;
var paddleH = 12;

var rightMove = false;
var leftMove = false;

var brickRows = 3;
var brickColumns = 5;

var brickWidth = 60;
var brickHeight = 20;

var brickPadding = 12;
var brickOfSetTop = 30;
var brickOfSetLeft = 100;

var bricks = [];

for (let i = 0; i < brickColumns; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickRows; j++) {
        bricks[i][j] = { x: 0, y: 0, drawBrick: true }
    }

}

var score = 0;
var lives = 3;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);



function keyDownHandler(e) {

    if (e.keyCode == 37) {
        leftMove = true;
    } else {
        if (e.keyCode == 39) {
            rightMove = true;
        }
    }

}

function keyUpHandler(e) {
    if (e.keyCode == 37) {
        leftMove = false;
    } else {
        if (e.keyCode == 39) {
            rightMove = false;
        }
    }
}

function mouseMoveHandler(e) {
    var mouseRelativeX = e.clientX - c.offsetLeft;
    if (mouseRelativeX > 0 && mouseRelativeX < c.width) {
        paddleX = mouseRelativeX - paddleW / 2;
    }
}

console.log("mi variable puntoX es : " + puntoX);
console.log("mi variable puntoY es : " + puntoY);
console.log("mi variable radius es : " + radius);

function drawBall() {
    ctx.beginPath();
    ctx.arc(puntoX, puntoY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#00c9ccff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleW, paddleH);
    ctx.fillStyle = "#ffae00ff";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let i = 0; i < brickColumns; i++) {

        for (let j = 0; j < brickRows; j++) {
            if (bricks[i][j].drawBrick) {
                var bx = (i * (brickWidth + brickPadding)) + brickOfSetLeft;
                var by = (j * (brickHeight + brickPadding)) + brickOfSetTop;
                bricks[i][j].x = bx;
                bricks[i][j].y = by;
                ctx.beginPath();
                ctx.rect(bx, by, brickWidth, brickHeight);
                ctx.fillStyle = "#ff00e6ff";
                ctx.fill();
                ctx.closePath();
            }
        }

    }
}

function detectHits() {
    for (let i = 0; i < brickColumns; i++) {

        for (let j = 0; j < brickRows; j++) {
            var brick = bricks[i][j];
            if (bricks[i][j].drawBrick) {
                if (puntoX > brick.x && puntoX < brick.x + brickWidth
                    && puntoY > brick.y && puntoY < brick.y + brickHeight) {
                    dy = -dy;
                    brick.drawBrick = false;

                    score++;
                    if (score == brickColumns * brickRows) {
                        alert("Eres el mejor");
                    }
                }
            }
        }

    }

}

function drawScore() {

    ctx.font = "18px Arial";
    ctx.fillStyle = "#cc0099ff";
    ctx.fillText("score: " + score, 10, 20)

}

function drawLives() {

    ctx.font = "18px Arial";
    ctx.fillStyle = "#cc0099ff";
    ctx.fillText("lives: " + lives, c.width - 100, 20);

}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawPaddle();
    drawBall();
    drawBricks();
    detectHits();
    drawScore();
    drawLives();

    if (puntoX + dx > c.width - radius || puntoX + dx < radius) {
        dx = -dx;
    }

    if (puntoY + dy < radius) {
        dy = -dy;
    } else {
        if (puntoY + dy > c.height - radius) {
            if (puntoX > paddleX && puntoX < paddleX + paddleW) {
                dy = -dy;
            } else {
                lives--;
                if (lives < 1) {
                    gameOver();
                    return;
                } else {
                    puntoX = c.width / 2;
                    puntoY = c.height - 10;
                    dx = 2;
                    dy = -2;
                    paddleX = c.width / 2;
                }
            }
        }

    }




    if (leftMove && paddleX > 0) {
        paddleX -= 8;
    }

    if (rightMove && paddleX < (c.width - paddleW)) {
        paddleX += 8;
    }


    puntoX += dx;
    puntoY += dy;

    requestAnimationFrame(draw);
}


function gameOver() {
    document.getElementById("myArkanoidGameOver").style.display = "block";
}





draw();
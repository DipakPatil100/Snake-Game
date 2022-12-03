// Assigned all Variables & Constant 
let direction = {x: 0, y: 0};
const foodSound = new Audio('sound/food.mp3');
const gameOverSound = new Audio('sound/gameover.mp3');
const moveSound = new Audio('sound/move.mp3');
const musicSound = new Audio('sound/music.mp3');
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [
    {x: 9, y: 9}
];
food = {x: 12, y: 14};
let score = 0;

// Game Functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime); 
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snakeArr){
    // If you crash into yourself
    for(let i=1; i<snakeArr.length; i++){
        if(snakeArr[i].x ===snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    // If you crash into a wall
    if(snakeArr[0].x >=18 || snakeArr[0].x<=0 || snakeArr[0].y >=18 || snakeArr[0].y<=0){
        return true;
    }
    return false;
}
function gameEngine() {
    //part 1: Updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        direction = {x: 0, y: 0};
        alert("Game Over! press enter to play again");
        snakeArr = [{x: 9, y: 9}];
        // musicSound.play();
        score = 0;
    }

    // If you eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        speed += 0.3;
        score++;
        scoreBox.innerHTML = "Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x+direction.x, y: snakeArr[0].y+direction.y});
        let a=2;
        let b=16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }

    //Moving the snake
    for(let i=snakeArr.length-2; i>=0; i--){
        // snakeArr[i+1] = snakeArr[i];   //normal
        snakeArr[i+1] = {...snakeArr[i]};  // define as in object
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    //part 2: render the food and snake
    board.innerHTML = "";
    // Display the Snake
    snakeArr.forEach((e, index)=>{       //This will add block when we eat food and store their x & y cord in array object
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

//For rendering screeen
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    direction = {x: 0, y: 1};  // Game Start;
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow Up");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("Arrow Left");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrow Right");
            direction.x = 1;
            direction.y = 0;
            break;
    
        default:
            break;
    }
})
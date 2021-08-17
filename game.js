
let treasuresFound = 0;
let movecount = 0;
let wincheck = 0;
let highscore = 0;
let initial = 0;
let initial2 = 0;

function createTable() {
    let body = document.body
    let gameBoard = document.getElementById("game")
    gameBoard.style.width = '100px'
    gameBoard.style.border = '1px solid black'

    for( let i = 0; i < 20; i++) {
        let tr = gameBoard.insertRow();
        for(let j = 0; j < 20; j++) {
            let td = tr.insertCell();
            td.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0\u00A0'));
            td.style.border = '1px solid black';
            // Associate coordinates to each cell
            td.x = j;
            td.y = i;
        }
    }
    body.appendChild(gameBoard)
    originalTable = gameBoard
}

function generateGameBoard() {
    treasureCount = 40;
    let gameBoard = [];
    // Generate game board
    for(let i=0; i<20; i++) {
        gameBoard[i] = new Array(20);
    }
    // Populate game board
    for(let i=0; i<20; i++) {
        for(let j =0; j < 20; j++) {
            gameBoard[i][j] = 0;
        }
    }
    // Randomly select 40 treasures
    while(treasureCount > 0) {
        randomRow = Math.floor(Math.random() * 20)
        randomColumn = Math.floor(Math.random() * 20)
        if(gameBoard[randomColumn][randomRow] == 0) {
            gameBoard[randomColumn][randomRow] = 1;
            treasureCount -=1;
        }
    }
    return gameBoard;
}

window.onload = function() {
    createTable()
    gameBoard = generateGameBoard()
}

function goalCheck() {
    if(treasuresFound == 20 && wincheck == 0) {
        wincheck = 1;
        alert("Congratulations! You found 20 treasures in " + movecount + "moves! Click reset to play again or find the remaining 20 treasures!")
        // Check for initial high score entry, then check if new high score is smaller than the local storage high score
        if(initial == 0) {
            localStorage.setItem("highscore", movecount)
            document.getElementById("hs").innerHTML = "High Score (20 treasures): " + localStorage.getItem("highscore")+ " Moves";
            initial = 1
        } else if(initial == 1 && movecount <= localStorage.getItem("highscore")) {
            localStorage.setItem("highscore", movecount)
            document.getElementById("hs").innerHTML = "High Score (20 treasures): " + localStorage.getItem("highscore")+ " Moves";
        }
    } else if(treasuresFound == 40 && wincheck == 1) {
        wincheck = 2;
        alert("Congratulations! You found 40 treasures in " + movecount + " moves! Click reset to play again!")
        if(initial2 == 0) {
            localStorage.setItem("highscore2", movecount)
            document.getElementById("hs2").innerHTML = "High Score (40 treasures): " + localStorage.getItem("highscore2")+ " Moves";
        } else if(initial2 == 0 && movecount <= localStorage.getItem("highscore2")){
            localStorage.setItem("highscore2", movecount)
            document.getElementById("hs2").innerHTML = "High Score (40 treasures): " + localStorage.getItem("highscore2")+ " Moves";
        }
    }
}

function clearScores() {
    localStorage.setItem("highscore2", 0)
    localStorage.setItem("highscore", 0)
    document.getElementById("hs").innerHTML = "High Score (20 treasures): None";
    document.getElementById("hs2").innerHTML = "High Score (40 treasures): None";
}

let canvas = document.getElementById("game")
canvas.addEventListener('click', function(e) {
    e.preventDefault();
    var td = e.target;
    // console.log(td.y)
    // console.log(td.x)
    correct = checkCell(gameBoard, td.x, td.y)
    // console.log(correct)
    if(correct == 1) {
        td.style.backgroundColor = 'green'
    } else if (correct == 0) {
        td.style.backgroundColor = 'red'
    } else {
        // do nothing
    }
    movecount += 1;
    goalCheck()
    // console.log(treasuresFound)
    document.getElementById("score").innerHTML = "Score: " + treasuresFound
    document.getElementById("moves").innerHTML = "Moves: " + movecount;
})

function checkCell(gameBoard, x,y) {
    if(gameBoard[y][x] == 1){
        // Assign board value to 2 to prevent cheating
        gameBoard[y][x] = 2;
        treasuresFound++;
        return 1;
    } else if (gameBoard[y][x] == 0){
        return 0;
    } else {
        return 2;
    }
}

function resetGame() {
    let table = document.getElementById("game")
    for(let i = 0; i < 20; i++) {
        for(let j = 0; j < 20; j++) {
            table.rows[i].cells[j].style.backgroundColor = 'lightgray';
        }
    }
    gameBoard = generateGameBoard()
    treasuresFound = 0;
    movecount = 0;
    wincheck = 0;
    initial = 0;
    initial2= 0;
    document.getElementById("score").innerHTML = "Score: " + treasuresFound
    document.getElementById("moves").innerHTML = "Moves: " + movecount;
}

function revealAnswer() {
    let table = document.getElementById("game")
    for(let i = 0; i < 20; i++) {
        for(let j = 0; j < 20; j++){
            if(gameBoard[j][i] == 1) {
                table.rows[j].cells[i].style.backgroundColor = 'blue';
            }
        }
    }
}
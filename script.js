// Declaring variables
var row, column;  // Will contain "coordinates"for a specific cell
var cpuEnabled = true;  // Set this to false to play against a human

var playerSymbol; // It will Store the symbol of the player 
var enemySymbol; // It will store the symbol of the enemy
var win;  // TRUE if somebody won the game
var turn=0; // Number of the current turn


// The function is called automatically when the game starts 
$(document).ready(function() {
  // fadeIn(500);
  // Intro screen buttons
  console.log("Hello");
  $("#choose-x").on("click", function() {
    playerSymbol = "𝒳";
    enemySymbol = "𝒪";
    // $("#button-id").on("click", function() {
   $("#button-click-sound")[0].play();
    

    $("#intro-screen").fadeOut(500, showEnemyScreen);
  });
  $("#choose-o").on("click", function() {
    playerSymbol = "𝒪";
    enemySymbol = "𝒳";
    $("#button-click-sound")[0].play();
    $("#intro-screen").fadeOut(500, showEnemyScreen);
  });
  
  // Enemy screen buttons
  $("#choose-human").on("click", function() {
    cpuEnabled = false;
    $("#button-click-sound")[0].play();

    // This will fade the present screen , show the game screen and start the game 
    $("#enemy-screen").fadeOut(300, showGameScreen);
    restartGame();
  });
  $("#choose-cpu").on("click", function() {
    cpuEnabled = true;
    $("#button-click-sound")[0].play();
    $("#enemy-screen").fadeOut(300, showGameScreen);
    restartGame();
  });
  
  
  // Game screen buttons
  $("#restart").on("click", function() {
    restartGame();
  });
  $(".cell").on("click", function() {
    // If nobody has won yet and clicked cell is empty
    if(!win && this.innerHTML === "") {
      if(turn%2 === 0) { // Even number = player turn
        putSymbol(this, playerSymbol);
        $("#button-click-sound")[0].play();
      }
      else { // Odd number = enemy turn
        $("#button-click-sound-3")[0].play();
        putSymbol(this, enemySymbol);
      }
    }
  });
});


/******  FUNCTIONS  ******/



function showGameScreen() {
  $("#game-screen").fadeIn(300);
}
function showEnemyScreen() {
  $("#enemy-screen").fadeIn(300);
}


/* Sets everything to its default value */

function restartGame() {
  turn = 0;
  win = false;
  $(".cell").text("");
  $(".cell").removeClass("wincell");
  $(".cell").removeClass("cannotuse");
  $(".cell").removeClass("player-two");
  $("#restart").removeClass("btn-green");
  $("#turn-indicator").text("Player 1's turn");

}

// Inserts a symbol in the clicked cell
function putSymbol(element, symbol) {
  element.innerHTML = symbol;
  
  if(symbol === enemySymbol)
    $("#" + element.id).addClass("player-two"); // Color enemy symbol differently
  $("#" + element.id).addClass("cannotuse");  // Show a "disabled" cursor on already occupied cells
  
  checkWinConditions(element,cpuEnabled);
  turn++;
  if(turn%2 === 0) {
    $("#turn-indicator").text("Player 1's turn");
  }
  else {
    if(cpuEnabled===true){
      $("#turn-indicator").text("CPU's turn");
    }
    else{
      $("#turn-indicator").text("Player 2's turn");

    }
  }
  // Game end - If somebody has won or all cells are filled
  if(win || turn > 8) {
    $("#button-click-sound-2")[0].play();

    $("#restart").addClass("btn-green");  // Highlights "restart" button
    $(".cell").addClass("cannotuse");  // Tells visually you can't interact anymore with the game grid
    // $("#turn-indicator").addClass("transparent");

  }
  else if(cpuEnabled && turn%2 !== 0) {
    setTimeout(cpuTurn, 1000); // For some delay 
  }
}




function cpuTurn() {
  var foundEmpty = false;
  
  while(!foundEmpty) {
    var row = Math.floor(Math.random() * 3);
    var column = Math.floor(Math.random() * 3);
    var cell = document.getElementById("cell"+row+column);
    if( cell.textContent === "" ) {
      foundEmpty = true;
    }
  }
  
  cell.click();
}

// function displayWinner(win,cpuEnabled){

//   if(turn%2!=0) {
    // $("#turn-indicator").text("Player 1 WINS");
//   }
//   else {
//     if(cpuEnabled===true){
//       $("#turn-indicator").text("CPU' Wins");
//     }
//     else{
//       $("#turn-indicator").text("Player 2 WINS");

//     }
//   }
// }

/* Check if there's a winning combination in the grid (3 equal symbols in a row/column/diagonal) */
function checkWinConditions(element,cpuEnabled) {
  // Retrieve cell coordinates from clicked button id
  row = element.id[4];
  column = element.id[5];
  
  // 1) VERTICAL (check if all the symbols in clicked cell's column are the same)
  
  win = true;
  for(var i=0; i<3; i++) {
    if($("#cell" + i + column).text() !== element.innerHTML) {
      win = false;
    }
  }
  if(win) {
    for(var i=0; i<3; i++) {
      // Highlight the cells that form a winning combination
      $("#cell" + i + column).addClass("wincell");
    }
    // $("#turn-indicator").text("WINS");
    // displayWinner(win,cpuEnabled);
    return; // Exit from the function, to prevent "win" to be set to false by other checks
  }
  
  // 2) HORIZONTAL (check the clicked cell's row)
  
  win = true;
  for(var i=0; i<3; i++) {
    if($("#cell" + row + i).text() !== element.innerHTML) {
      win = false;
    }
  }
  if(win) {
    for(var i=0; i<3; i++) {
      $("#cell" + row + i).addClass("wincell");
    }
    $("#turn-indicator").text("WINS");

    return;
  }
  
  // 3) MAIN DIAGONAL (for the sake of simplicity it checks even if the clicked cell is not in the main diagonal)
  
  win = true;
  for(var i=0; i<3; i++) {
    if($("#cell" + i + i).text() !== element.innerHTML) {
      win = false;
    }
  }
  if(win) {
    for(var i=0; i<3; i++) {
      $("#cell" + i + i).addClass("wincell");
    }
    $("#turn-indicator").text("WINS");

    return;
  }
  
  // 3) SECONDARY DIAGONAL
  
  win = false;
  if($("#cell02").text() === element.innerHTML) {
    if($("#cell11").text() === element.innerHTML) {
      if($("#cell20").text() === element.innerHTML) {
        win = true;
        $("#cell02").addClass("wincell");
        $("#cell11").addClass("wincell");
        $("#cell20").addClass("wincell");
  
      }
    }
  }
}

// Javascript ends


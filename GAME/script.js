var playerOne = "Player 1"
var playerTwo= "Player 2"

var currentPlayer = -1;
var currentPlayerName= ""
var table = document.querySelectorAll("table tr");
var button = document.querySelectorAll("td button");
var restartbutton = document.querySelector(".restartbutton");


function colorMatchCheck(one,two,three,){
  return (one===two && one===three && one !== ' ' && one !== undefined);
}

function checkforX(rowIndex, colIndex) {
  const rows = document.querySelectorAll("table tr");
  const row = rows[rowIndex];
  if (!row) return "";
  
  const cells = row.querySelectorAll("td");
  const cell = cells[colIndex];
  if (!cell) return "";


  const button = cell.querySelector("button");
  return button ? button.textContent : "";
}
function reportwin(rowIndex, colIndex, winmethod){
  console.log(currentPlayerName + " won starting from " + rowIndex+ " "+ colIndex)
  if (winmethod== "horizontal"){
    console.log("Horizontal win")
    button[rowIndex*3+colIndex].style.backgroundColor= 'green'
    button[rowIndex*3+(colIndex+1)].style.backgroundColor= 'green'
    button[rowIndex*3+(colIndex+2)].style.backgroundColor= 'green'
  }

  else if (winmethod== "vertical"){
    console.log("Vertical win")
    button[rowIndex*3+colIndex].style.backgroundColor= 'green'
    button[(rowIndex+1)*3+colIndex].style.backgroundColor= 'green'
    button[(rowIndex+2)*3+colIndex].style.backgroundColor= 'green'
  }
  else if (winmethod== "leftdiagonal"){
    console.log("Left diagonal win")
    button[rowIndex*3+colIndex].style.backgroundColor= 'green'
    button[(rowIndex+1)*3+(colIndex-1)].style.backgroundColor= 'green'
    button[(rowIndex+2)*3+(colIndex-2)].style.backgroundColor= 'green'
  }
  else{
    console.log("Right diagonal win")
    button[rowIndex*3+colIndex].style.backgroundColor= 'green'
    button[(rowIndex+1)*3+(colIndex+1)].style.backgroundColor= 'green'
    button[(rowIndex+2)*3+(colIndex+2)].style.backgroundColor= 'green'
  }

}


//Begining of the horizontal win check
function horizontalWinCheck() {
  for (var row = 0; row <= 2; row++) {
    for (var col = 0; col <= 2; col++) {
      if (colorMatchCheck(checkforX(row,col), checkforX(row,col+1) ,checkforX(row,col+2))) {
        reportwin(row,col,"horizontal")
        return true;
      }
    }
  }
}
// End of the horizontal win check


//Begining of the Vertical win check
function verticalWinCheck() {
  for (var row = 0; row <= 2; row++) {
    for (var col = 0; col <= 2; col++) {
      if (colorMatchCheck(checkforX(row,col), checkforX(row+1,col) ,checkforX(row+2,col))) {
        console.log('vertical win');
        reportwin(row,col, "vertical")
        return true;
      }
    }
  }
}
// End of the Vertical win check


//Begining of the right diagonal win check
function rightDiagonalCheck() {
  for (var row = 0; row <= 2; row++) {
    for (var col = 0; col <= 2; col++) {
      if (colorMatchCheck(checkforX(row,col), checkforX(row+1,col+1) ,checkforX(row+2,col+2))) {
        console.log('Diagonal win');
        reportwin(row,col, "rightdiagonal")
        return true;
      }
    }
  }
}
// End of the right diagonal win check



//Begining of the left diagonal win check
function leftDiagonalCheck() {
  for (var row = 0; row <= 2; row++) {
    for (var col = 0; col <= 2; col++) {
      if (colorMatchCheck(checkforX(row,col), checkforX(row+1,col-1) ,checkforX(row+2,col-2))) {
        console.log('Left Diagonal win');
        reportwin(row,col, "leftdiagonal")
        return true;
      }
    }
  }
}
// End of the left diagonal win check



//Game End
function gameEnd(winningPlayer) {
      
      
      document.querySelector("h1").textContent = winningPlayer + " won!!";
      document.querySelector("h1").style.fontSize = "40px";
      document.querySelector("h1").style.color= "green";
      document.querySelectorAll("td button").forEach(el => {
        el.disabled= true
      }) 

      document.querySelectorAll("h3").forEach(el => {
        el.textContent= "Refresh your browser or click restart to play again!"
        el.style.fontSize = "20px";
      });


    }

// Loop through and check for empty text
function hasFreeSpaces(){
  for (let btn of button) {
    if (btn.textContent.trim() === "") {
      return true; // found at least one free space
    }
  }
 
  return false //no free space
}

// Loop through and check for empty text (alternate method)
// function hasFreeSpaces() {
//   let emptyCount = Array.from(button).filter(btn => btn.textContent.trim() === "").length;

//   if (emptyCount > 0) {
//     return true
//   }
//   else{
//     return false // no free spaces
//   }

// }


//Clicking operations
function mouseclick(currentPlayer, i){
  if (currentPlayer == 1){
    button[i].innerHTML = "<H1 style='color:black; font-size: 40px;'>X</H1>"
    button[i].setAttribute('disabled', 'disabled');
  }
  
  else{
    button[i].innerHTML = "<H1 style='color:black; font-size: 40px;'>O</H1>"
    button[i].setAttribute('disabled', 'disabled');
  }

  if (horizontalWinCheck() | verticalWinCheck() | rightDiagonalCheck()| leftDiagonalCheck()) {
    gameEnd(currentPlayerName);
  }
  
}


//Game Execution
document.querySelector('h3').textContent= playerOne+": it is your turn, please play (click a button)";
currentPlayer = currentPlayer* -1;



for (let i = 0; i <=8;  i++) {
  
  button[i].addEventListener('click', function(){  

    if (currentPlayer == 1){
      currentPlayerName= playerOne;
      document.querySelector('h3').textContent= playerTwo+": it is your turn, please play (click a button)";
    }
    else{
      currentPlayerName = playerTwo;
      document.querySelector('h3').textContent= playerOne+": it is your turn, please play (click a button)";
    }
    mouseclick(currentPlayer, i);
    currentPlayer= currentPlayer*-1
    
    if(!hasFreeSpaces() && !horizontalWinCheck() && !verticalWinCheck() && !rightDiagonalCheck() && !leftDiagonalCheck()){
      document.querySelector('h3').textContent= "No winner!";

    }

  })
}



//Restart button
restartbutton.addEventListener('click', function(){
  button.forEach(el => {
    el.textContent= " "
    el.disabled= false
    el.style.removeProperty("background-color");
    
  })


  currentPlayer= 1
  document.querySelector('h3').removeAttribute("style")
  document.querySelector('h3').textContent= playerOne+": it is your turn, please play (click a button)";
  document.querySelector("h1").textContent = "Welcome to my Tic Tac Toe game";
  document.querySelector("h1").removeAttribute("style")
})


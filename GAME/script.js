
var playerOne = prompt("Player One: Enter your name, you will be X")
var playerTwo = prompt("Player Two: Enter your name, you will be Y")

var table = $('table tr')
var button = $('button')
var restartbutton = $('.c')

var squares = $('button')

// Clear Squares Function
function colorMatchCheck(one,two,three,){
  return (one===two && one===three && one !== ' ' && one !== undefined);
}

function checkforX(rowindex, colindex){
    return table.eq(rowindex).find('td').eq(colindex).find('button').text();

}

function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

//begining of the horizontal win check
function horizontalWinCheck() {
  for (var row = 0; row <= 2; row++) {
    for (var col = 0; col <= 2; col++) {
      if (colorMatchCheck(checkforX(row,col), checkforX(row,col+1) ,checkforX(row,col+2))) {
        console.log('horiz');
        reportWin(row,col)
        
        return true;
      }else {
        continue;
      }
    }
  }
}
// End of the horizontal win check

function gameEnd(winningPlayer) {
  for (var col = 0; col <= 2; col++) {
    for (var row = 0; row <= 2; row++) {
      $('h3').fadeOut('fast');
      // $('h1').fadeOut('fast');
      $('.b').text(winningPlayer+" has won! Refresh your browser or click restart to play again!").css("fontSize", "50px")
    }
  }
}

var currentPlayer = 1;
var currentName = playerOne;

function clearBoard() {
  for (var index = 0; index <=8; index++) {
      squares[index].textContent = ' ';
      squares[index].removeAttribute('disabled')
    $('.b').text('Welcome to my Tic Tac Toe game').css("fontSize", "32px")
    $('h3').fadeIn('fast').text(playerOne+": it is your turn, please play");

  }
  currentPlayer = 1;
  mouseclick(currentPlayer)
}

restartbutton.on('click',clearBoard)



function mouseclick(playerindex){
  
  for (let i = 0; i <=8;  i++) {
  button[i].addEventListener('click', function(){  

 

    if (playerindex === 1){
      button[i].innerHTML = "<H1 style='color:black; font-size: 40px; '>X</H1>"
      button[i].setAttribute('disabled', 'disabled');
    button[i].style = 'background-color', 'white';
    
    
    }
  

  
    
    else{
      button[i].innerHTML = "<H1 style='color:black; font-size: 40px;'>Y</H1>"
      button[i].setAttribute('disabled', 'disabled');
  button[i].style = 'background-color', 'white';



    }
    
    
 })

}
if (horizontalWinCheck()) {
    gameEnd(currentName);

  }
  
}


// Mouse Over, mouse out and player X
for (let index = 0; index <=8; index++) {
    button[index].addEventListener('mouseover', function(){
    button[index].style.backgroundColor= 'grey'
})
button[index].addEventListener('mouseout', function(){
button[index].style.backgroundColor= 'white'
})

}

//The real coding part


$('h3').text(playerOne+": it is your turn, please play");



for (let i = 0; i <=8; i++) {
button[i].addEventListener('click',function(){

  button[i].innerHTML = "<H1 style='color:black; font-size: 40px;'>X</H1>"
  button[i].setAttribute('disabled', 'disabled');
  button[i].style = 'background-color', 'white';
 
  

  
  
    currentPlayer = currentPlayer * -1 ;
  
})
}



  button.on('click', function(){
  

  if (currentPlayer === 1) {
    currentName = playerOne;
    $('h3').text(currentName+": it is your turn, please play");
    mouseclick(currentPlayer)
    

  }


  
  else{
    currentName = playerTwo
    $('h3').text(currentName+": it is your turn, please play");
    mouseclick(currentPlayer)
    
    
  
    
  }
  
  
  
})

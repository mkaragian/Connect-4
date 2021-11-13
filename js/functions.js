"use strict";

var game = {
    plays : "P1",
    moves : 0,
    cells : [],
    winner : false
};

game.cells[0]=[null,null,null,null,null,null,null];
game.cells[1]=[null,null,null,null,null,null,null];
game.cells[2]=[null,null,null,null,null,null,null];
game.cells[3]=[null,null,null,null,null,null,null];
game.cells[4]=[null,null,null,null,null,null,null];
game.cells[5]=[null,null,null,null,null,null,null];

function newGame() {

}

function play(row,column) {
    document.getElementById("p"+row+"_"+column).disabled=true;
    document.getElementById("p"+row+"_"+column).innerHTML= "<img src='images/red_player.png' width='100' height='100'>";
    game.moves++;
    document.getElementById("infobox").innerHTML="Move "+game.moves+ ". Player " + game.plays+"<br>";
    changePlayerTurn();
    getPlayerTurn();
    if(isDraw()) {
        console.log("ITS A DRAW LMAO");
    }
}

function getPlayerTurn() {
    return game.plays;
}

function isValidMove(row,column) {
    if(game.cells[row,column]==null) {
        return true;
    }else{
        return false;
    }
}

function isDraw() {
    if(game.moves==42) {
        return true;
    }
}

function changePlayerTurn() {
    if(game.plays=="P1") {
        game.plays="P2";
    }else{
        game.plays="P1";
    }
}
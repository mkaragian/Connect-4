"use strict";

var game = {
    plays : "P1",
    moves : 0,
    cells : []
};

var winsP1=0;
var winsP2=0;
var draws=0;

game.cells[0]=["white","white","white","white","white","white","white"];
game.cells[1]=["white","white","white","white","white","white","white"];
game.cells[2]=["white","white","white","white","white","white","white"];
game.cells[3]=["white","white","white","white","white","white","white"];
game.cells[4]=["white","white","white","white","white","white","white"];
game.cells[5]=["white","white","white","white","white","white","white"];


function newGame() {
   var x = Math.floor(Math.random()*2);
   if(x==0) {
       game.plays="P1";
   }else{
       game.plays="P2";
   }
   game.moves=0;
   for(let i=0;i<6;i++) {
       for(let j=0;j<7;j++) {
           game.cells[i][j]="white";
           document.getElementById("p"+i+"_"+j).innerHTML=" ";
           document.getElementById("p"+i+"_"+j).classList.remove("blinking");
           document.getElementById("p"+i+"_"+j).disabled=false;
       }
   }
   document.getElementById("infobox").innerHTML=" ";
   document.getElementById("infobox2").innerHTML="<h3>Wins/Draws</h3><br>";
   document.getElementById("infobox2").innerHTML+="Wins Player 1: "+winsP1+"<br>";
   document.getElementById("infobox2").innerHTML+="Wins Player 2: "+winsP2+"<br>";
   document.getElementById("infobox2").innerHTML+="Draws: "+draws;
   
}

function play(row,column) {

    for(let i=5;i>-1;i--) {
        if(game.cells[i][column]=="white") {
            row=i;
            break;
        }
    }

    document.getElementById("p"+row+"_"+column).disabled=true;
    
    if(game.plays=="P1"){
        document.getElementById("p"+row+"_"+column).innerHTML= "<img src='images/red_player.png' width='100' height='100'>";
    }

    if(game.plays=="P2") {
        document.getElementById("p"+row+"_"+column).innerHTML= "<img src='images/yellow_player2.png' width='100' height='100'>";
    }

    game.cells[row][column]=game.plays;
    game.moves++;

    var empty_cells=42-game.moves;
    document.getElementById("infobox").innerHTML+="Move "+game.moves+ ". Player " + game.plays+ ". Empty Cells: "+empty_cells+"<br>";

    if(hasPlayerWon()) {
        disableButtons();
        document.getElementById("infobox").innerHTML+="<br>";
        document.getElementById("infobox").innerHTML+="<b>Winner is"+" "+game.plays+". Congratulations!!!</b>";

        if(getPlayerTurn()=="P1") {
            winsP1++;
        }else{
            winsP2++;
        }
    }

    if(isDraw()) {
        document.getElementById("infobox").innerHTML+="<br>";
        document.getElementById("infobox").innerHTML+="It is a Draw!!";
        draws++;
    }

    

    changePlayerTurn();
    getPlayerTurn();

}

function getPlayerTurn() {
    return game.plays;
}

function isValidMove(row,column) {
    if(game.cells[row,column]=="white") {
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

function horizontalWin() {
    for(let row=0;row<6;row++) {
        for(let col=0;col<4;col++) {
            if(game.cells[row][col]!="white") {
                if(game.cells[row][col] == game.cells[row][col+1] && game.cells[row][col] == game.cells[row][col+2] && game.cells[row][col] == game.cells[row][col+3]) {

                    for(let j=col;j<col+4;j++) {
                        document.getElementById("p"+row+"_"+j).className="blinking";
                    }
                    return true;
                }
            }
        }
    }
    return false;
}

function verticalWin() {
    for(let col=0;col<7;col++) {
        for(let row=0;row<3;row++) {
            if(game.cells[row][col]!="white") {
                if(game.cells[row][col] == game.cells[row+1][col] && game.cells[row][col] == game.cells[row+2][col] && game.cells[row][col] == game.cells[row+3][col]) {

                    for(let i=row;i<row+4;i++) {
                        document.getElementById("p"+i+"_"+col).className="blinking";
                    }
                    return true;
                }
            }
        }
    }
    return false;
}

function diagonialWin() {
    for(let col=0;col<4;col++) {
        for(let row=0;row<3;row++) {
            if(game.cells[row][col]!="white") {
                if(game.cells[row][col] == game.cells[row+1][col+1] && game.cells[row][col] == game.cells[row+2][col+2] && game.cells[row][col] == game.cells[row+3][col+3]) {

                    document.getElementById("p"+row+"_"+col).className="blinking";
                    document.getElementById("p"+(row+1)+"_"+(col+1)).className="blinking";
                    document.getElementById("p"+(row+2)+"_"+(col+2)).className="blinking";
                    document.getElementById("p"+(row+3)+"_"+(col+3)).className="blinking";

                    return true;
                }
            }
        }
    }

    for(let col=0;col<4;col++) {
        for(let row=5;row>2;row--) {
            if(game.cells[row][col]!="white") {
                if(game.cells[row][col] == game.cells[row-1][col+1] && game.cells[row][col] == game.cells[row-2][col+2] && game.cells[row][col] == game.cells[row-3][col+3]) {

                    document.getElementById("p"+row+"_"+col).className="blinking";
                    document.getElementById("p"+(row-1)+"_"+(col+1)).className="blinking";
                    document.getElementById("p"+(row-2)+"_"+(col+2)).className="blinking";
                    document.getElementById("p"+(row-3)+"_"+(col+3)).className="blinking";


                    return true;
                }
            }
        }
    }
    return false;
}

function hasPlayerWon() {
    if(horizontalWin() || verticalWin() || diagonialWin()) {
        return true;
    }
}

function disableButtons() {
    for(var i=0;i<6;i++) {
        for(var j=0;j<7;j++) {
            document.getElementById("p"+i+"_"+j).disabled=true;
        }
    }
}


/*Google Pie Chart*/
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Result', 'Amount'],
        ['Player 1 Wins',winsP1],
        ['Player 2 Wins',winsP2],
        ['Draws',draws],
    ]);

    var options = {
        title: 'Results',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
}
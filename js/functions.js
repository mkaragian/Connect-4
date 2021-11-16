"use strict";

var game = {
    plays : "Player_1",
    moves : 0,
    cells : []
};

var winsPlayer_1=0;
var winsPlayer_2=0;
var draws=0;

game.cells[0]=["white","white","white","white","white","white","white"];
game.cells[1]=["white","white","white","white","white","white","white"];
game.cells[2]=["white","white","white","white","white","white","white"];
game.cells[3]=["white","white","white","white","white","white","white"];
game.cells[4]=["white","white","white","white","white","white","white"];
game.cells[5]=["white","white","white","white","white","white","white"];

var newGameDate = new Date();

function beforeStart() {
    for(let i=0;i<6;i++) {
        for(let j=0;j<7;j++) {
            document.getElementById("p"+i+"_"+j).disabled=true;
        }
    }
}

function newGame() {
    newGameDate = new Date();
    var x = Math.floor(Math.random()*2);
    if(x==0) {
        game.plays="Player_1";
    }else{
        game.plays="Player_2";
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
    document.getElementById("infobox").innerHTML+=game.plays+" plays first<br>";
    document.getElementById("infobox2").innerHTML="<h3>Wins/Draws</h3><br>";
    document.getElementById("infobox2").innerHTML+="Wins Player_1: "+winsPlayer_1+"<br>";
    document.getElementById("infobox2").innerHTML+="Wins Player_2: "+winsPlayer_2+"<br>";
    document.getElementById("infobox2").innerHTML+="Draws: "+draws;
   
}

var prev_time = 0;

function play(row,column) {

    var time=new Date();   //Edo pataei to koumpi
    if(game.moves==0) {
        var num = time.getTime()/1000 - newGameDate.getTime()/1000;
        console.log(num.toPrecision(4)+" "+"seconds");
    }

    if(game.moves>0) {
        var num = time.getTime()/1000-prev_time;
        console.log(num.toPrecision(4)+" "+"seconds");
    } 

    for(let i=5;i>-1;i--) {
        if(isValidMove(i,column)) { //isValidMove
            prev_time=(time.getTime())/1000;
            row=i;
            break;
        }
    }

    document.getElementById("p"+row+"_"+column).disabled=true;
    
    if(game.plays=="Player_1"){
        document.getElementById("p"+row+"_"+column).innerHTML= "<img src='images/red_player.png' width='100' height='100'>";
    }

    if(game.plays=="Player_2") {
        document.getElementById("p"+row+"_"+column).innerHTML= "<img src='images/yellow_player.png' width='100' height='100'>";
    }

    game.cells[row][column]=game.plays;
    game.moves++;

    var empty_cells=42-game.moves;
    document.getElementById("infobox").innerHTML+="Move "+game.moves+". "+game.plays+ ".  Empty Cells: "+empty_cells+". Time: "+num.toPrecision(4)+"s"+"<br>";

    if(hasPlayerWon()) {    //hasPlayerWon
        disableButtons();
        document.getElementById("infobox").innerHTML+="<br>";
        document.getElementById("infobox").innerHTML+="<b>Winner is"+" "+game.plays+". Congratulations!!!</b>";

        if(getPlayerTurn()=="Player_1") {
            winsPlayer_1++;
        }else{
            winsPlayer_2++;
        }
    }

    if(isDraw()) {  //isDraw
        document.getElementById("infobox").innerHTML+="<br>";
        document.getElementById("infobox").innerHTML+="<b>It is a Draw!!</b>";
        draws++;
    }
    changePlayerTurn();

}

function getPlayerTurn() {
    return game.plays;
}

function isValidMove(row,column) {
    if(game.cells[row][column]=="white") {
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
    if(game.plays=="Player_1") {
        game.plays="Player_2";
    }else{
        game.plays="Player_1";
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
    //return false;
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
        ['Player_1 Wins',winsPlayer_1],
        ['Player_2 Wins',winsPlayer_2],
        ['Draws',draws],
    ]);

    var options = {
        title: 'Results',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
}
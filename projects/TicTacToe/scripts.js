class GameClass {
    constructor() {
        this.movesArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
        this.locked = true;
        this.player1Char = "X";
        this.player2Char = "O";
        this.computerChar = "O";
        this.isOver = false;
        this.turnToPlay = "X";
        this.compStats = 0;
        this.playerStats = 0;
        this.tiesStats = 0;
    }

    move(index, letter) {
        this.movesArray[index] = letter;
        var idDiv = "#" + index;
        var asd = $(document.getElementById(idDiv));
        $(idDiv).html("<h1>" + letter + "</h1>");
        if (letter === "X")
            this.turnToPlay = "0";
        else
            this.turnToPlay = "X";
    }
}
var iter = 0;
var game = new GameClass();

var reset = function() {
    $(".board").css("display", "none");
    $(".welcomeScreen").css("display", "block");
    game = new GameClass();
    game.playerStats = 0;
    game.compStats = 0;
    game.tiesStats = 0;
    //var statsP = "Victories:" + game.playerStats + " Defeats:" + game.compStats + " Ties:" + game.tiesStats;
    // $("#statsP").html(statsP);
    newGame(game);
}
var chooseLetter = function(letter) {
    if (letter == "O") {
        game.computerChar = "X";
        game.player1Char = "O"
    }

    $(".board").css("display", "block");
    $(".welcomeScreen").css("display", "none");


}

var newGame = function(elem) {
    $(".box").each(function(k, element) {
        $(this).html("");
    }, this);
    game.movesArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    var computerStartFirst = rand([true, false]);
    if (computerStartFirst) {
        game.move(rand(game.movesArray), game.computerChar);
    }



    syncGame();
}

var syncGame = function() {
    $(".box").each(function(k, element) {
        if (game.movesArray[k] === "X" || game.movesArray[k] === "O")
            $(this).html("<h1>" + game.movesArray[k] + "</h1>");
    }, this);
    var statsP = "Victories:" + game.playerStats + " Defeats:" + game.compStats + " Ties:" + game.tiesStats;
    $("#statsP").html(statsP);

}


var userCallMove = function(elem) {
    var idElem = elem.id;
    var tmp = idElem.split("");
    if (game.movesArray[tmp[1]] == "X" || game.movesArray[tmp[1]] == "O")
        return;
    game.movesArray[tmp[1]] = game.player1Char;
    game.move(tmp[1], game.player1Char);
    var move = minimax(game.movesArray, game.computerChar);
    game.move(move.index, game.computerChar);
    if (checkWin(game.movesArray, game.player1Char)) {
        setTimeout(function() {
            alert("Player won!!");
            game.playerStats++;
            newGame();
            return;
        }, 400);
    } else if (checkWin(game.movesArray, game.computerChar)) {
        setTimeout(function() {
            alert("Computer Won!!");
            game.compStats++;
            newGame();
            return;
        }, 400);

    } else if (getAvaiableMoves(game.movesArray).length <= 0) {
        setTimeout(function() {
            alert("Is a Tie!!");
            game.tiesStats++;
            newGame();
            return;
        }, 400);
        return;
    }

}
var rand = function(list) {
    var tmp = list[Math.floor(Math.random() * list.length)];
    return tmp;
}


var getAvaiableMoves = function(movesArray) {
    return movesArray.filter(s => s != "X" && s != "O");
}
var checkWin = function(movesArray, player) {
    if ((movesArray[0] == player && movesArray[1] == player && movesArray[2] == player) ||
        (movesArray[3] == player && movesArray[4] == player && movesArray[5] == player) ||
        (movesArray[6] == player && movesArray[7] == player && movesArray[8] == player) ||
        (movesArray[0] == player && movesArray[3] == player && movesArray[6] == player) ||
        (movesArray[1] == player && movesArray[4] == player && movesArray[7] == player) ||
        (movesArray[2] == player && movesArray[5] == player && movesArray[8] == player) ||
        (movesArray[0] == player && movesArray[4] == player && movesArray[8] == player) ||
        (movesArray[6] == player && movesArray[4] == player && movesArray[2] == player)) {

        return true;
    }
    return false;
}

function minimax(reboard, player) {
    iter++;
    let avaiableMoves = getAvaiableMoves(reboard);
    if (checkWin(reboard, game.player1Char)) {
        return {
            score: -10
        };
    } else if (checkWin(reboard, game.computerChar)) {
        return {
            score: 10
        };
    } else if (avaiableMoves.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < avaiableMoves.length; i++) {
        var move = {};
        move.index = reboard[avaiableMoves[i]];
        reboard[avaiableMoves[i]] = player;

        if (player == game.computerChar) {
            var g = minimax(reboard, game.player1Char);
            move.score = g.score;
        } else {
            var g = minimax(reboard, game.computerChar);
            move.score = g.score;
        }
        reboard[avaiableMoves[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    var posMoves = [];
    if (player === game.computerChar) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }

    }

    for (var i = 0; i < moves.length; i++) {
        if (moves[i].score == moves[bestMove].score) {
            posMoves.push(moves[i]);
        }
    }
    return rand(posMoves);
}
var game = {
    status: false,
    strict: false,
    moves: [],
    length: 0,
    index: 0,
    timeSpeed: 1300,
    lock: true,


}
game.init = function() {
    this.lastPush = $('#0');
    this.moves = [];
    this.timeSpeed = 1300;
    this.index = 0;
    this.length = 0;
    this.lock = false;
};
var frequencies = [330, 260, 220, 400];

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function resetTimers() {
    clearInterval(game.seqHndl);
    clearInterval(game.flHndl);
    clearTimeout(game.toHndl);
    clearTimeout(game.toHndlFl);
    clearTimeout(game.toHndlSt);
};


var duration = 500;


function beep(freq) {
    if (!audioCtx)
        alert("Sorry your browser does not support this Audio Library :(");
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = 0.2; //sound
    oscillator.frequency.value = frequencies[freq]; //frequency
    oscillator.type = 'triangle'; //type

    oscillator.start();

    setTimeout(
        function() {
            oscillator.stop();
        },
        duration
    );
};



$(function() {

    $("#btnOnOff").click(function() {
        if (game.status == false) {
            game.init();
            turnGameOn();
            $('.screenMov').text('00');
            $('.divTag').removeClass('clkbl').addClass('unclkbl');
            resetTimers();
            stopGoodTones();
            stopErrTone();
            game.status == true;
        } else {
            resetTimers();
            stopGoodTones();
            stopErrTone();
            $('.screenMov').text('');
            turnGameOff();
            game.status == false
        }
        /**on off button */
    });

    $('#btnStart').mousedown(function() {
        if (game.status) {
            $('#btnStart').css({ "backgroundColor": "yellow" });
        }
    });
    $('#btnStart').mouseup(function() {
        if (game.status) {
            $('#btnStart').css({ "backgroundColor": "darkgoldenrod" });
            turnGameOff();
            turnGameOn();
            startNewGame();
        }

    });

    $('#btnStrict').click(function() {
        if (game.status) {
            if (game.strict) {
                $('#btnStrict').css({ "backgroundColor": "darkblue" });
                game.strict = false;
            } else {
                game.strict = true;
                $('#btnStrict').css({ "backgroundColor": "blue" });
            }
        }
    });

    function pushMove(pushDivColor) {
        if (!game.lock) {
            clearTimeout(game.toHndl);
            var pushNr = pushDivColor.attr('id');
            if (pushNr == game.moves[game.index] &&
                game.index < game.moves.length) {

                playGoodTone(pushNr);
                game.lastPush = pushDivColor;
                game.index++;
                if (game.index < game.moves.length) {
                    game.toHndl = setTimeout(notifyError, 5 * game.timeSpeed);
                } else if (game.index == 20) {
                    $('.divTag').removeClass('clkbl').addClass('unclkbl');
                    game.toHndl = setTimeout(notifyWin, game.timeSpeed);
                } else {
                    $('.divTag').removeClass('clkbl').addClass('unclkbl');
                    addRandMove();
                }
            } else {
                $('.divTag').removeClass('clkbl').addClass('unclkbl');
                notifyError(pushDivColor);
            }
        }
    }

    $('.divTag').mousedown(function() {
        pushMove($(this));
    });

    $('*').mouseup(function(e) {
        e.stopPropagation();
        if (!game.lock)
            stopGoodTones();
    });

});

function setTimeStep() {
    if (game.length < 4)
        return 1300;
    if (game.length < 8)
        return 1000;
    if (game.length < 12)
        return 700;
    return 500;
}
var addRandMove = function() {
    game.moves.push(Math.floor(Math.random() * 4));
    game.length++;
    game.TimeSpeed = setTimeStep();
    game.toHndl = setTimeout(playMoves, 500);
}

function startNewGame() {
    resetTimers();
    stopGoodTones();
    stopErrTone();
    $('.screenMov').text('00');
    game.init();
    addRandMove();

}

function displayMovesCount() {
    let p = (game.length < 10) ? '0' : '';
    $('.screenMov').text(p + (game.length + ''));
}
var errOsc = audioCtx.createOscillator();
errOsc.type = 'triangle';
errOsc.frequency.value = 110;
errOsc.start(0.0);
var errNode = audioCtx.createGain();
errOsc.connect(errNode);
errNode.gain.value = 0;
errNode.connect(audioCtx.destination);

var ramp = 0.05;
var vol = 0.5;

// create Oscillators
var oscillators = frequencies.map(function(frq) {
    var osc = audioCtx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = frq;
    osc.start(0.0); //delay optional parameter is mandatory on Safari
    return osc;
});

var gainNodes = oscillators.map(function(osc) {
    var g = audioCtx.createGain();
    osc.connect(g);
    g.connect(audioCtx.destination);
    g.gain.value = 0;
    return g;
});

function playGoodTone(num) {
    gainNodes[num].gain
        .linearRampToValueAtTime(vol, audioCtx.currentTime + ramp);
    game.currPush = $('#' + num);
    game.currPush.addClass('light');
};


function stopGoodTones() {
    if (game.currPush)
        game.currPush.removeClass('light');
    gainNodes.forEach(function(g) {
        g.gain.linearRampToValueAtTime(0, audioCtx.currentTime + ramp);
    });
    game.currPush = undefined;
    game.currOsc = undefined;
};

function playErrTone() {
    errNode.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + ramp);
};

function stopErrTone() {
    errNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + ramp);
};

function notifyError(pushDivColor) {
    game.lock = true;
    $(".divTag").addClass("clkbl").removeClass("unclkbl");
    playErrTone();
    if (pushDivColor)
        pushDivColor.addClass('light');
    game.toHndl = setTimeout(function() {
        stopErrTone();
        stopGoodTones();
        if (pushDivColor)
            pushDivColor.removeClass('light');
        game.toHndlSt = setTimeout(function() {
            if (game.strict)
                startNewGame();
            else
                playMoves();
        }, 1000);
    }, 1000);
    displayMovesCount();
}

function notifyWin() {
    var cnt = 0;
    var last = game.lastPush.attr('id');
    game.seqHndl = setInterval(function() {
        playGoodTone(last);
        game.toHndl = setTimeout(stopGoodTones, 80);
        cnt++;
        if (cnt === 8) {
            clearInterval(game.seqHndl);
        }
    }, 160);
    displayMovesCount();
}

function playMoves() {

    var i = 0;
    $(".divTag").addClass("unclkbl").removeClass("clkbl");
    game.index = 0;
    game.seqHndl = setInterval(function() {
        displayMovesCount();
        game.lock = true;
        playGoodTone(game.moves[i]);
        game.toHndl = setTimeout(stopGoodTones, game.timeSpeed / 2 - 10);
        i++;
        if (i === game.length) {
            clearInterval(game.seqHndl);
            $(".divTag").addClass("clkbl").removeClass("unclkbl");
            game.lock = false;
            game.toHndl = setTimeout(notifyError, 5 * game.timeSpeed);
        }
    }, game.timeSpeed);

}
var turnGameOn = function() {

    $('#btnOnOff').css({ "backgroundColor": "red" });
    $(".screenMov").text("00");
    game.status = true;
    //$(".divTag").addClass("clkbl").removeClass("unclkbl");
}
var turnGameOff = function() {

    game.status = false;
    $('#btnOnOff').css({ "backgroundColor": "darkred" });
    $(".screenMov").text("");
    $(".divTag").addClass("unclkbl").removeClass("clkbl");
    $('#btnStart').css({ "backgroundColor": "darkgoldenrod" });
    game.strict = false;
    $('#btnStrict').css({ "backgroundColor": "darkblue" });
    $(".divTag").removeClass('light');
}
var display = document.querySelector('#time');
var minWork = 25;
var minBreak = 5;
var intervalId;
var flagIsWorking = true;

function startTimer(duration) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;

    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        //console.log(diff);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
        var drawAngle = (duration - diff) * 360 / duration;
        //var drawAngle = 360;
        if (flagIsWorking)
            drawCircle(drawAngle, "rgb( 0,222,0 )");
        else
            drawCircle(drawAngle, "rgb( 222,0,0 )");
        if (diff <= 0) {
            callStopClock(minBreak);
            flagIsWorking = !flagIsWorking;
            if (flagIsWorking)
                startClock(minWork);
            else
                startClock(minBreak);


        }
    };
    // we don't want to wait a full second before the timer starts

    timer();
    intervalId = setInterval(timer, 1000);

}
var setDisplay = function(min, seg) {
        display = document.querySelector('#time');
        if (min < 10)
            display.textContent = "0" + min + ":" + seg;
        else
            display.textContent = min + ":" + seg;

    }
    /*
    window.onload = function() {
        var fiveMinutes = 60 * 1;
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    }*/

var drawCircle = function(degrees, color) {

    var start_degrees = 270;
    var start_angle = (Math.PI / 180) * start_degrees;
    var end_degrees = degrees + 270;
    var end_angle = (Math.PI / 180) * end_degrees;
    var canvas = document.getElementById("canvas_context");
    var canvas_context = canvas.getContext("2d");
    canvas_context.beginPath();
    canvas_context.lineWidth = 4;
    canvas_context.arc(112, 113, 99, start_angle, end_angle, false);
    canvas_context.strokeStyle = color; // "rgb( 0,222,0 )";
    canvas_context.stroke();

}
var addbreakTime = function() {
    if (minBreak >= 99)
        return;
    minBreak++;
    var timedisplay = document.querySelector('#minTimerBreak');
    timedisplay.textContent = minBreak + ":" + "00";

}
var addWorkTime = function() {
    if (minWork >= 99)
        return;
    minWork++;
    var timedisplay = document.querySelector('#minTimerWork');
    timedisplay.textContent = minWork + ":" + "00";
    setDisplay(minWork, "00");

}
let restBreakTime = function() {
    if (minBreak <= 1)
        return;
    minBreak--;
    var timedisplay = document.querySelector('#minTimerBreak');
    timedisplay.textContent = minBreak + ":" + "00";

}
var restWorkTime = function() {
    if (minWork <= 1)
        return;
    minWork--;
    var timedisplay = document.querySelector('#minTimerWork');

    setDisplay(minWork, "00");
    timedisplay.textContent = minWork + ":" + "00";

}
var startClock = function(dur = minWork) {

    var canvas = document.getElementById("canvas_context");
    var canvas_context = canvas.getContext("2d");
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);
    display = document.querySelector('#time');
    runningFlag = true;
    $("#stopButtom").css("display", "block");
    $("#startButtom").css("display", "none");
    $(".clocks").css("display", "none");
    startTimer(60 * dur);

}
var stopClock = function() {
    clearInterval(intervalId);

    var canvas = document.getElementById("canvas_context");
    var canvas_context = canvas.getContext("2d");
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);
    //drawCircle(360, "rgb( 255,255,255 )");
    $("#stopButtom").css("display", "none");
    $("#startButtom").css("display", "block");
    $(".clocks").css("display", "block");
    setDisplay(minWork, "00");
    flagIsWorking = true;
}

var callStopClock = function(min = minWork) {
    clearInterval(intervalId);

    var canvas = document.getElementById("canvas_context");
    var canvas_context = canvas.getContext("2d");
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);
    //drawCircle(360, "rgb( 255,255,255 )");
    $("#stopButtom").css("display", "none");
    $("#startButtom").css("display", "block");
    $(".clocks").css("display", "block");
    setDisplay(min, "00");
}
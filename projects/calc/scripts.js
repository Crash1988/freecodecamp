var mrc = 0;

function c(val) {
    document.getElementById("d").value = val;
}

function getMrc() {
    v(mrc);
}

function setMrc() {
    try {
        c(eval(document.getElementById("d").value));
        mrc = eval(document.getElementById("d").value);
    } catch (e) {
        c('Error')
    }
}


function clearMrc() {
    mrc = 0;
}

function v(val) {

    if (document.getElementById("d").value === "0") {
        document.getElementById("d").value = "";
        if (val === ".")
            document.getElementById("d").value = "0";

    }

    document.getElementById("d").value += val;

}

function e() {
    try {
        c(eval(document.getElementById("d").value));
    } catch (e) {
        c('Error')
    }
}
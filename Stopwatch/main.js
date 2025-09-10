let seconds = 0;
let minutes = 0;
let intervalId;
let container = document.getElementById('timer');

reset();

function checkFormat(num){
    return num < 10 ? `0${num}` : num;
}

function timer(){
    seconds ++;
    
    if(seconds >= 60){
        seconds = 0;
        minutes ++;
    }

    container.innerHTML = `<h2>${checkFormat(minutes)} : ${checkFormat(seconds)}</h2>`;
}

function start(){
    if(!intervalId){
        intervalId = setInterval(timer, 1000);
    }
}

function stop(){
    clearInterval(intervalId);
    intervalId = null;
}

function reset(){
    stop();
    seconds = 0;
    minutes = 0;
    container.innerHTML = "<h2>00 : 00</h2>";
}
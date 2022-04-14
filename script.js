/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
    document.getElementById("fullscreen-expand").style.display = "none";
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    document.getElementById("fullscreen-exit").style.display = "inline-block";
}

/* Close fullscreen */
function closeFullscreen() {
    document.getElementById("fullscreen-exit").style.display = "none";
    document.getElementById("fullscreen-exit").blur();
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    document.getElementById("fullscreen-expand").style.display = "inline-block";
}

function clockTime() {
    date = new Date();
    timeHour = date.getHours();
    timeHour = timeHour<10 ? '0'+timeHour : timeHour;
    timeMinute = date.getMinutes();
    timeMinute = timeMinute<10 ? '0'+timeMinute : timeMinute;
    //if (timeHour >= 0 && timeHour <= 9) { timeHour = "0"+timeHour; }
    //if (timeMinute >= 0 && timeMinute <= 9) { timeMinute = "0"+timeMinute; }
    document.getElementById("timer-time").value = timeHour+":"+timeMinute;
    var clockInterval = setTimeout(clockTime, 20000);
}

var countdownRunning = false;
function submitTime() {
    timerTime = document.getElementById("timer-time").value.split(":");

    counterInterval("start", timerTime)

    document.getElementById("timer-input").style.display = "none";
    document.getElementById("timer-countdown").style.display = "block";
}

function submitPlusTime(additionalTime) {
    date = new Date();
    date.setMinutes( date.getMinutes() + additionalTime);
    timeHour = date.getHours();
    timeHour = timeHour<10 ? '0'+timeHour : timeHour;
    timeMinute = date.getMinutes();
    timeMinute = timeMinute<10 ? '0'+timeMinute : timeMinute;
    document.getElementById("timer-time").value = timeHour+":"+timeMinute;
}

function counterInterval(action, timerTime) {
    var timerCounter = null;
    targetDateTime = new Date();
    targetDateTime.setHours(timerTime[0]);
    targetDateTime.setMinutes(timerTime[1]);
    targetDateTime.setSeconds(0)
    if (action == "start") {
        countdownRunning = true;
        timerCounter = setInterval(function(){
            now = new Date();

            difference = targetDateTime.getTime() - now.getTime();

            var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            hours = hours<10 ? '0'+hours : hours;
            var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            minutes = minutes<10 ? '0'+minutes : minutes;
            var seconds = Math.floor((difference % (1000 * 60)) / 1000);
            seconds = seconds<10 ? '0'+seconds : seconds;

            if (difference < 0 || isNaN(difference)) {
                document.getElementById("time-countdown").innerHTML = "YOU&nbsp;DID&nbsp;IT!";
                confetti({spread: 125});
                clearInterval(timerCounter);
                countdownRunning = false;
                showContentSections();
            } else {
                console.log(hours + ":" + minutes + ":" + seconds);
                document.getElementById("time-countdown").innerHTML = hours + ":" + minutes + ":" + seconds;
            }				
        }, 1000);
    } else if (action == "stop") {
        countdownRunning = false;
        clearInterval(timerCounter);
    }			
}

function resetTime() {
    counterInterval("stop", 0);
    document.getElementById("timer-input").style.display = "block";
    document.getElementById("timer-countdown").style.display = "none";
    showContentSections();
}

var timeout;
document.onmousemove = function(){
    if (document.getElementById("header").style.opacity != "0.75" || document.getElementById("footer").style.opacity != "1" || document.getElementById("content").style.opacity != "1") {
        showContentSections();
    }
    if (countdownRunning == true) {
        showContentSections();
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            hideContentSections();
        }, 1000);
    }
}

var onloadTimeout;
window.onload = function(){
    if (document.getElementById("header").style.opacity != "0.75" || document.getElementById("footer").style.opacity != "1" || document.getElementById("content").style.opacity != "1") {
        showContentSections();
    }
    if (countdownRunning == true) {
        showContentSections();
        clearTimeout(onloadTimeout);
        onloadTimeout = setTimeout(function(){
            hideContentSections();
        }, 5000);
    }
    clockTime();
}

function showContentSections() {
    document.getElementById("header").style.opacity = "0.75";
    document.getElementById("footer").style.opacity = "1";
    document.getElementById("content").style.opacity = "1";
}
function hideContentSections() {
    if (countdownRunning == true) {
        document.getElementById("header").style.opacity = "0";
        document.getElementById("footer").style.opacity = "0";
        document.getElementById("content").style.opacity = "0";
    }
}
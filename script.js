const color = ["green", "red", "yellow", "blue"];

let cpu = [];
let user = [];
let randomNumber;
let randomColor;
let started = false;

// Detect if the user is on mobile
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Change title text based on device
if (isMobile) {
  $("#level-title").text("Tap Anywhere to Start");
} else {
  $("#level-title").text("Press Any Key to Start");
}

// Desktop: Start game when a key is pressed
$(document).keypress(function () {
  if (!started && !isMobile) {
    started = true;
    sequence();
  }
});

// Mobile: Start game when user taps the screen or title
$(document).on("touchstart click", function () {
  if (!started && isMobile) {
    started = true;
    sequence();
  }
});

$(".btn").click(function () {
  let item = $(this);
  item.addClass("pressed");
  setTimeout(function () {
    item.removeClass("pressed");
  }, 100);

  let colorSelected = item.attr("id");
  user.push(colorSelected);
  sound(colorSelected);
  checkAnswer();
});

function sequence() {
  user = [];
  randomNumber = Math.floor(Math.random() * 4);
  randomColor = color[randomNumber];
  cpu.push(randomColor);

  $(`#${randomColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${randomColor}`).removeClass("pressed");
  }, 200);

  sound(randomColor);
}

function checkAnswer() {
  let userLastIndex = user.length - 1;
  if (cpu[userLastIndex] === user[userLastIndex]) {
    if (cpu.length === user.length) {
      setTimeout(() => {
        sequence();
      }, 1000);
    }
  } else {
    restartGame();
  }
}

function restartGame() {
  $("#level-title").text("Game Over");
  setTimeout(function () {
    if (isMobile) {
      $("#level-title").text("Tap Anywhere to Start");
    } else {
      $("#level-title").text("Press Any Key to Start");
    }
  }, 1000);
  cpu = [];
  user = [];
  started = false;
  sound("wrong");
}

function sound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

const colors = ["green", "red", "yellow", "blue"]

let cpu = []
let user = []
let started = false
let level = 0
let titleResetTimeout = null

$(document).on("keydown", function () {
    if (started) {
        return
    }

    startGame()
})

$(".btn").on("click", function () {
    if (!started) {
        return
    }

    let item = $(this)
    animatePress(item, 100)
    let colorSelected = item.attr("id")
    user.push(colorSelected)
    sound(colorSelected)
    checkAnswer()
})

function startGame() {
    if (titleResetTimeout) {
        clearTimeout(titleResetTimeout)
        titleResetTimeout = null
    }

    started = true
    cpu = []
    user = []
    level = 0
    sequence()
}

function sequence() {
    user = []
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    cpu.push(randomColor)
    level = cpu.length
    $("#level-title").text(`Level ${level}`)
    animatePress($(`#${randomColor}`), 200)
    sound(randomColor)
}

function animatePress(item, duration) {
    item.addClass("pressed")
    setTimeout(function () {
        item.removeClass("pressed")
    }, duration)
}

function checkAnswer() {
    let userLastIndex = user.length - 1
    if (cpu[userLastIndex] === user[userLastIndex]) {
        if (cpu.length === user.length) {
            setTimeout(function () {
                sequence()
            }, 1000)
        }
    } else {
        restartGame()
    }
}

function restartGame() {
    $("#level-title").text("Game Over")
    $("body").addClass("game-over")
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200)
    sound("wrong")
    cpu = []
    user = []
    started = false
    level = 0
    titleResetTimeout = setTimeout(function () {
        if (!started) {
            $("#level-title").text("Press A Key to Start")
        }
    }, 1000)
}

function sound(color) {
    let audio = new Audio("sounds/" + color + ".mp3")
    audio.play()
}

const color = ["green","red","yellow","blue"]

let cpu = []
let user = []
let randomNumber
let randomColor
let colorSound
let started=false

$(document).keypress(function (){
    if (!started){
        started=true
        sequence()
    }
})

$(".btn").click(function(){
    let item=$(this)
    item.addClass("pressed")
    setTimeout(function(){
        item.removeClass("pressed")
    },100)
    let colorSelected = item.attr("id")
    user.push(colorSelected)
    sound(colorSelected)
    checkAnswer()
})

function sequence(){
    user=[]
    randomNumber=Math.floor(Math.random()*4)
    randomColor=color[randomNumber]
    cpu.push(randomColor)

    $(`#${randomColor}`).addClass("pressed")
    setTimeout(function(){
        $(`#${randomColor}`).removeClass("pressed")
    },200)
}

function checkAnswer(){
    let userLastIndex=(user.length)-1
    if(cpu[userLastIndex]===user[userLastIndex]){
        if(cpu.length===user.length){
            setTimeout(() => {
                sequence()
            },1000)
        }
    }    
    else {
        restartGame()
    }
}

function restartGame(){
    $("#level-title").text("Game Over")
    setTimeout(function(){
        $("#level-title").text("Press A Key to Start")
    },1000)
    cpu=[]
    user=[]
    started=false
    sound("wrong")
}

function sound(color){
    let audio = new Audio("sounds/"+color+".mp3")
    audio.play()
}
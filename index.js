
let colors = ['red' , 'blue' , 'green' , 'yellow'];

let gamePattern = [];

let userClickedPattern = [];

let start = false;

let level = 0;

document.addEventListener('keypress' , function(event){

    if(!start){
        const gameStart = document.querySelector('h2');

        gameStart.innerText = 'Game Started';

        gameStart.style.color = 'green';

        const insertedBefore = document.querySelector('.container');

        const parent = document.querySelector('body');

        parent.insertBefore( gameStart , insertedBefore);

        start = true;
        
        setTimeout(() => {
           nextSequence(); 
        }, 2000);;
    }
});


function nextSequence(){

    level++;

    const levelIndication = document.querySelector('h2');

    levelIndication.innerText = (`level  ${level}`);

    levelIndication.style.color = 'White';

    const colorSelectorIndex = Math.floor(Math.random()*4)

    gamePattern.push(colors[colorSelectorIndex]);

    const colorValue = colors[colorSelectorIndex];

    animation(colorValue);

    sound(colorValue);
}

const clicked = document.querySelector('.container');

// here i used event bubbling to avoid looping over divs;

clicked.addEventListener('click' , function(event){

    const element = event.target.className;
    
    // console.log(element.target);

    if( element !== 'container' && start){

        userClickedPattern.push(element);
        checkAnswer(userClickedPattern.length-1);
        animation(element);
        sound(element);
    }

});

// this will check if pushed color by user is matched or not
function checkAnswer(currentIndex){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if( userClickedPattern[currentIndex] === gamePattern[currentIndex]){

        if( userClickedPattern.length === gamePattern.length ){
            userClickedPattern = [];
            setTimeout(() => {
                nextSequence()
            }, 500);
        }

    }
    else{
        const position = document.querySelector('h2');
        position.innerText = "GAME OVER";
        position.style.color = 'black';

        sound('wrong');

        const bodyColor = document.querySelector('body');

        bodyColor.style.backgroundColor = 'red';
        
        start = false;
        level = 0;

        gamePattern = [];
        
        setTimeout(() => {
           position.remove(); 
            bodyColor.style.backgroundColor = 'rgb(54, 69, 79)';
        }, 500);
        
        const parent = document.querySelector('body');

        const beforeWhom = document.querySelector('.container');

        const newH2 = document.createElement('h2');
        newH2.innerText = 'Press Any Key To Start';

        setTimeout(() => {
            parent.insertBefore(newH2 , beforeWhom);
        }, 1500);
    }
}

function animation(colorValue){

    const effectOnBox = document.querySelector(`.${colorValue}`);

    effectOnBox.classList.add(`${colorValue}_click`);

    setTimeout(() => {
       effectOnBox.classList.remove(`${colorValue}_click`); 
    }, 300);
}


function sound(color){
    const audio = new Audio(`/sounds/${color}.mp3`);
    audio.play();
}
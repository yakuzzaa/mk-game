const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
//player objects
player1 = {
    player: 1,
    name: "Scorpion",
    hp:100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ['kunai'],
    attack: function (){
        console.log(name + "Fight...")
    },
    lose: false,
}

player2 = {
    player: 2,
    name: "Subzero",
    hp:100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ['frozen sword'],
    attack: function (){
        console.log(name + "Fight...")
    },
    lose:false,
}
//function for creating DOM element with class
function createElement(tag, className){
    const $tag = document.createElement(tag);
    if (className){
        $tag.classList.add(className);
    }
    return $tag;
}
//function for creating player model
function CreatePlayer(objectPlayer){
    const $player = createElement('div','player'+objectPlayer.player);
    const $progressbar = createElement('div','progressbar');
    const $character = createElement('div','character');
    const $image1 = createElement('img');
    const $life = createElement('div','life');
    const $name = createElement('div','name');


    $image1.src = objectPlayer.img;
    $life.style.width= '100%';
    $name.innerText = objectPlayer.name;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($image1);

    return $player;

}

function playerLose(name){
    const $loseTitle = createElement('div','loseTitle');
    $loseTitle.innerText = name + ' wins';

    return $loseTitle;
}

//function that changing life at player models

function changeHp(player){
    const $playerLife = document.querySelector('.player'+ player.player + ' .life');
    if (player.hp <= 0){
        player.hp = 0;
        player.lose = true;
        //$arenas.appendChild(playerLose(player.name));
        $randomButton.disabled =true;



    }
    else{
        player.hp -= Math.floor(Math.random()*20);
        if (player.hp <=0){
            player.hp = 0;
            player.lose = true
            //$arenas.appendChild(playerLose(player.name))
            $randomButton.disabled =true;
        }

    }
    console.log(player.hp);
    $playerLife.style.width = player.hp +'%';
}
//function for checking who is winner in game session
function checkingWhoWinner(player1,player2){
    changeHp(player1);
    changeHp(player2);
    if (player1.lose === true){
        $arenas.appendChild(playerLose(player2.name));
        //$randomButton.disabled =true;
    }
    else if (player2.lose === true){
        $arenas.appendChild(playerLose(player1.name));
        //$randomButton.disabled =true;
    }
    else{

    }

}
// test button
$randomButton.addEventListener('click', function (){
    console.log("Running");
    checkingWhoWinner(player1,player2);
})
$arenas.appendChild(CreatePlayer(player1));
$arenas.appendChild(CreatePlayer(player2));

//поменять функцию playerLose на playerWins








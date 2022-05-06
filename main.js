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

function playerWins(name){
    const $loseTitle = createElement('div','loseTitle');
    if (name){
        $loseTitle.innerText = name + ' wins';
    }
    else{
        $loseTitle.innerText = 'draw';
    }

    return $loseTitle;
}
//random function for changing player life
function GetRandom(size){
    return Math.floor(Math.random()*size);
}
//function that changing life at player models
function changeHp(player){
    const $playerLife = document.querySelector('.player'+ player.player + ' .life');
    player.hp -=GetRandom(20);
    if (player.hp <= 0){
        player.hp = 0;
    }
    $playerLife.style.width = player.hp +'%';
}

// test button
$randomButton.addEventListener('click', function (){
    //checkingWhoWinner(player1,player2);
    changeHp(player1);
    changeHp(player2);
    if (player1.hp === 0 || player2.hp ===0){
        if (player1.hp === 0 && player1.hp < player2.hp){
            $arenas.appendChild(playerWins(player2.name));
        }
        else if (player2.hp === 0 && player2.hp < player1.hp){
            $arenas.appendChild(playerWins(player1.name));
        }
        else if (player1.hp === 0 && player2.hp === 0){
            $arenas.appendChild(playerWins());
        }
        $randomButton.disabled =true;
    }

})
$arenas.appendChild(CreatePlayer(player1));
$arenas.appendChild(CreatePlayer(player2));










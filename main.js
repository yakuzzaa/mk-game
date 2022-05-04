const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
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

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if (className){
        $tag.classList.add(className);
    }
    return $tag;
}



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
    $loseTitle.innerText = name + ' lose';

    return $loseTitle;
}


function changeHp(player){
    const $playerLife = document.querySelector('.player'+ player.player + ' .life');
    player.hp -=20;
    $playerLife.style.width = player.hp +'%';

    if (player.hp <0){
       $arenas.appendChild(playerLose(player.name));
    }
}
$randomButton.addEventListener('click', function (){
    console.log("Running");
    changeHp(player1);
    changeHp(player2);
})
$arenas.appendChild(CreatePlayer(player1));
$arenas.appendChild(CreatePlayer(player2));










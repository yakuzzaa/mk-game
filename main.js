player1 = {
    name: "Scorpion",
    hp:100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ['kunai'],
    attack: function (){
        console.log(name + "Fight...")
    },
}

player2 = {
    name: "Subzero",
    hp:100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ['frozen sword'],
    attack: function (){
        console.log(name + "Fight...")
    },
}


function CreatePlayer(classPlayer,objectPlayer){
    const $arenas = document.querySelector('.arenas');
    const $player = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $image1 = document.createElement('img');
    const $life = document.createElement('div');
    const $name = document.createElement('div');

    $life.classList.add('life');
    $player.classList.add(classPlayer);
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $name.classList.add('name');
    $image1.src = objectPlayer.img;
    $life.style.width= '100%';
    $name.innerText = objectPlayer.name;
    $life.innerText = objectPlayer.hp;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($image1);

    $arenas.appendChild($player);

}

CreatePlayer('player1',player1);
CreatePlayer('player2',player2);









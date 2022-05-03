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


function CreatePlayer(){
    const $arenas = document.querySelector('.arenasarena1');
    const $player1 = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $image1 = document.createElement('img');
    const $life = document.createElement('div');
    const $name = document.createElement('div');

    $life.classList.add('life');
    $player1.classList.add('player1');
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $name.classList.add('name');
    $image1.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';
    $life.style.width= '100%';
    $name.innerText = "SCORPION"

    $player1.appendChild($progressbar);
    $player1.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($image1);

    $arenas.appendChild($player1);

}

CreatePlayer();










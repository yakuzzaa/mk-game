const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];



//player objects
player1 = {
    player: 1,
    name: "Scorpion",
    hp:100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ['kunai'],
    changeHp,
    elHp,
    renderHp,
    attack,
}

player2 = {
    player: 2,
    name: "Subzero",
    hp:100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ['frozen sword'],
    changeHp,
    elHp,
    renderHp,
    attack,
}

//function for printing 'fight'
function attack(){
    console.log(this.name + "Fight...");
}

//function that decides how much hp points to subtract
function changeHp(change){
    const solution = getRandomArbitrary(0,2);
    if (solution > 0){
        this.hp -= change;
        if (this.hp <= 0){
            this.hp = 0;
        }
    }
}

//function for creating variable for $playerLife dom element
function elHp(){
    return document.querySelector('.player'+ this.player + ' .life');
}

//function for render change in hp
function renderHp(){
    return this.elHp().style.width = this.hp +'%';
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

//function that output who win
function playerWins(name){
    const $wonTitle = createElement('div','wonTitle');
    if (name){
        $wonTitle.innerText = name + ' wins';
    }
    else{
        $wonTitle.innerText = 'draw';
    }

    return $wonTitle;
}

//random function for changing player life
function getRandom(size){
    return Math.floor(Math.random()*size);
}
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


//function for adding button for window reload
function createReloadButton(){
    const $reloadWrap =createElement('div','reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText ='Restart';
    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
    $reloadButton.addEventListener('click', function(){
        window.location.reload();
    })
}


function enemyAttack(){
    const hit = ATTACK[getRandom(3)];
    const defence =  ATTACK[getRandom(3)];
    return {
        value:getRandom(HIT[hit]),
        hit,
        defence,
    }
}

// проверяет у кого из игроков нулевое здоровье и выводит сообщение о выйгрыше игрока
function checker(){
    if (player1.hp === 0 || player2.hp ===0){
        if (player1.hp === 0 && player1.hp < player2.hp){
            $arenas.appendChild(playerWins(player2.name));
            createReloadButton();
        }
        else if (player2.hp === 0 && player2.hp < player1.hp){
            $arenas.appendChild(playerWins(player1.name));
            createReloadButton();
        }
        else if (player1.hp === 0 && player2.hp === 0){
            $arenas.appendChild(playerWins());
            createReloadButton();
        }
        $randomButton.disabled =true;
    }
}

/**
 * Функция каоторая формирует парамаетры защиты и атаки игрока
 * @param $formFight
 * @returns {{hit: string, defence: string, value: number}}
 */
function playerAttack($formFight){
    const attack = {
        value: 0,
        hit: "",
        defence: "",
    };
    if ($formFight){
        for (let item of $formFight){
            if (item.checked ===true && item.name === 'hit'){
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }
            if (item.checked ===true && item.name === 'defence'){
                attack.defence = item.value;
            }
            item.checked = false;
        }
    }

    return attack;
}
$formFight.addEventListener('submit',function (e){
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = playerAttack($formFight);
    console.log("enemy attack:", enemy.hit,enemy.value,"enemy defence", enemy.defence);
    console.log("i attack:", attack.hit,attack.value, "i defence", attack.defence);
    if (enemy.hit !== attack.defence){
        player1.changeHp(enemy.value);
        player1.renderHp();
    }
    if (attack.hit !== enemy.defence){
        player2.changeHp(attack.value);
        player2.renderHp();
    }

   checker();


})


$arenas.appendChild(CreatePlayer(player1));
$arenas.appendChild(CreatePlayer(player2));










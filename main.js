import {createElement,getRandom, getTime} from "./utils";
import {HIT,ATTACK,LOGS} from "./constants";
import Player from "./Player";

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');


//player objects
const player1 = new Player( {
    player: 1,
    name: "Scorpion",
    hp:100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    rootSelector: 'arenas',
});

const player2 = new Player( {
    player: 2,
    name: "Subzero",
    hp:100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    rootSelector: 'arenas',
});

//function for printing 'fight'
function attack(){
    console.log(this.name + "Fight...");
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
function showResult(){
    if (player1.hp === 0 || player2.hp ===0){
        if (player1.hp === 0 && player1.hp < player2.hp){
            generateLogs('end',player2,player1);
            $arenas.appendChild(playerWins(player2.name));
            createReloadButton();
        }
        else if (player2.hp === 0 && player2.hp < player1.hp){
            generateLogs('end',player1,player2);
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



/**
 * генерируем логи игры
 * @param type тип лога
 * @param player1 атакующий игрок
 * @param player2 игрок, получающий урон
 * @param damage урон
 */
function  generateLogs(type,player1,player2,damage){
    let text;
    let el;
    const formattedDate = getTime();
    switch(type){
        case 'hit':
            text = LOGS[type][getRandom(type.length)]
                .replace('[playerKick]',player1.name)
                .replace('[playerDefence]',player2.name);
            el = `<p>${formattedDate}${text} -${damage.value} [${player2.hp}/100]</p>`;
            break;
        case 'defence':
            text = LOGS[type][getRandom(type.length)]
                .replace('[playerKick]',player1.name)
                .replace('[playerDefence]',player2.name);
            el = `<p>${formattedDate}${text}</p>`;
            break;
        case 'start':
            text = LOGS[type].replace('[time]',formattedDate)
                .replace('[player1]', player1.name)
                .replace('[player2]',player2.name);
            el = `<p>${text}</p>`;
            break;
        case 'end':
            text = LOGS[type][getRandom(type.length)].replace('[playerWins]',player1.name).replace('[playerLose]', player2.name);
            el = `<p>${formattedDate}${text}</p>`;
            break;
        default:
            text = LOGS['draw'];
    }

    $chat.insertAdjacentHTML("afterbegin",el);
}
//Старт игры

$formFight.addEventListener('submit',function (e){
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = playerAttack($formFight);
    console.log("enemy attack:", enemy.hit,enemy.value,"enemy defence", enemy.defence);
    console.log("i attack:", attack.hit,attack.value, "i defence", attack.defence);
    if (enemy.hit !== attack.defence){
        player1.changeHp(enemy.value);
        player1.renderHp();
        generateLogs('hit',player2,player1,enemy);
    }else if(enemy.hit === attack.defence){
        generateLogs('defence',player2,player1);
    }
    if (attack.hit !== enemy.defence){
        player2.changeHp(attack.value);
        player2.renderHp();
        generateLogs('hit',player1,player2,attack);
    }else if(attack.hit === enemy.defence){
        generateLogs('defence',player1,player2);
    }

    showResult();


})

function init(){
    player1.CreatePlayer();
    player2.CreatePlayer();


    generateLogs('start',player1,player2);
}
init();

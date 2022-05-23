const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};


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


function  generateLogs(type,player1,player2){
    let text;
    switch(type){
        case 'hit':
            text = logs[type][getRandom(type.length)].replace('[playerKick]',player1.name).replace('[playerDefence]',player2.name);
            break;
        case 'defence':
            text = logs[type][getRandom(type.length)].replace('[playerKick]',player1.name).replace('[playerDefence]',player2.name);
            break;
        case 'start':
            const date = ''+new Date().getHours() +':' + ''+new Date().getMinutes();
            text = logs[type].replace('[time]',date).replace('[player1]', player1.name). replace('[player2]',player2.name);
            break;
        case 'end':
            text = logs[type][getRandom(type.length)].replace('[playerWins]',player1.name).replace('[playerLose]', player2.name);
            break;
        default:
            text = logs['draw'];
    }
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML("afterbegin",el);
}
generateLogs('start',player1,player2);
$formFight.addEventListener('submit',function (e){
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = playerAttack($formFight);
    console.log("enemy attack:", enemy.hit,enemy.value,"enemy defence", enemy.defence);
    console.log("i attack:", attack.hit,attack.value, "i defence", attack.defence);
    if (enemy.hit !== attack.defence){
        player1.changeHp(enemy.value);
        player1.renderHp();
        generateLogs('hit',player2,player1);
    }else if(enemy.hit === attack.defence){
        generateLogs('defence',player2,player1);
    }
    if (attack.hit !== enemy.defence){
        player2.changeHp(attack.value);
        player2.renderHp();
        generateLogs('hit',player1,player2);
    }else if(attack.hit === enemy.defence){
        generateLogs('defence',player1,player2);
    }

   showResult();


})


$arenas.appendChild(CreatePlayer(player1));
$arenas.appendChild(CreatePlayer(player2));










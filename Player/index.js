import {createElement} from "../utils";

class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    changeHp = (change) => {
        this.hp -= change;
        if (this.hp <= 0){
            this.hp = 0;
        }
    }


    elHp = () => {
        return document.querySelector(`.${this.selector} .life`);
    }


    renderHp = () =>{
        return this.elHp().style.width = this.hp +'%';
    }

    CreatePlayer = () => {
        const $player = createElement('div',this.selector);
        const $progressbar = createElement('div','progressbar');
        const $character = createElement('div','character');
        const $image1 = createElement('img');
        const $life = createElement('div','life');
        const $name = createElement('div','name');


        $image1.src = this.img;
        $life.style.width= this.hp + '%';
        $name.innerText = this.name;

        $player.appendChild($progressbar);
        $player.appendChild($character);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($image1);
        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);
        return $player;

    }
}

export default Player;
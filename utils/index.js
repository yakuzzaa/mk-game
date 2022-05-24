//random function for changing player life
export const getRandom = (size) => {
    return Math.floor(Math.random()*size);
}
export function createElement(tag, className){
    const $tag = document.createElement(tag);
    if (className){
        $tag.classList.add(className);
    }
    return $tag;
}

/**
 * Возвращаем текущее время
 * @returns {string}
 */
export const getTime = () =>{
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${hours < 10 ? `0${hours}`:hours}:${minutes < 10 ? `0${minutes}`:minutes}:${seconds < 10 ? `0${seconds}`:seconds} `;
    return formattedDate;
}
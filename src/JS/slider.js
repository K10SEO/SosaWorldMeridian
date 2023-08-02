const slider = document.querySelector(".slider")
const sliderShowBox = slider.querySelector(".image-box")
const sliderImg = slider.querySelectorAll(".image-box > img")
const sliderImgLength = sliderImg.length

let startPoint = 0;
let endPoint = 0;

// image 클론 생성
for(let i = 1; i <= sliderImgLength;){
    const img = new Image();
    img.src = `/src/assets/월드메홈${i}.jpg`

    if (i === 1){
        sliderShowBox.appendChild(img)
    }else {
        sliderShowBox.prepend(img)
    }

    i++;
}

// slider offset
let curIndex = 1;
function offset(curIndex){
    return 25 * curIndex
} 

// edit css for move slider
function moveSetting (offset, num){
    sliderShowBox.setAttribute('style', `transform: translateX(${!!offset ? -offset : 0}%); transition: ${!!num ? num : null}s;`)

    sliderShowBox.removeEventListener('mousedown', onScrollStart);
    sliderShowBox.removeEventListener('mouseup', eventStart);
    sliderShowBox.removeEventListener('touchstart', onScrollStart);
    sliderShowBox.removeEventListener('touchend', eventStart)

    setTimeout(() => {
        bindEvents();
    }, 2000)
}

// moved slider function
function eventStart (e){
    endPoint = getClientX(e);
    if(startPoint > endPoint){
        curIndex++;
        if(curIndex <= sliderImgLength){
            moveSetting(offset(curIndex), 2);
        }else{
            moveSetting();
            curIndex = 1;
            setTimeout(() => {
                moveSetting(25, 2);
            }, 0);
        }
    }else {
        curIndex--;
        if (curIndex > 0){
            moveSetting(offset(curIndex), 2);
        }else{
            curIndex = sliderImgLength + 1;
            moveSetting(offset(curIndex));
            curIndex--;
            setTimeout(() => {
                moveSetting(offset(curIndex), 2);
            }, 0);
        };
    };
};

// get the slider location
function getClientX(e) {
    const isTouches = e.touches ? true : false;
    return isTouches ? e.touches[0].clientX : e.clientX;
};

// slider pointer starter and block the bubbling
function onScrollStart (e){
    e.preventDefault();
    startPoint = getClientX(e);
}

// slider move event add
function bindEvents (){
    sliderShowBox.addEventListener('mousedown', onScrollStart);
    sliderShowBox.addEventListener('mouseup', eventStart);
    sliderShowBox.addEventListener('touchstart', onScrollStart);
    sliderShowBox.addEventListener('touchend', eventStart);
};
bindEvents();

// client width check and edit
function watchWidth (){
    let clientWidth = this.window.innerWidth  * 4;
    sliderShowBox.setAttribute('style', `width: ${clientWidth}px`);
}

window.addEventListener("resize", watchWidth);

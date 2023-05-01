const main = document.querySelector('.main-content')
const slide = main.querySelector('.slide-wrap')
const slideList = slide.querySelector('.slide-list')
let slideContent = slide.querySelectorAll('.slide-content')
const slideLen = slideContent.length;
console.log(slideLen)
let slideWidth = slideList.clientWidth;

// slideList.style.width = slideWidth * (slideLen) + "px";

let curIndex = 1;

const pagination = document.querySelector(".slide-pagination")

for (let i = 0; i < slideLen; i++) {
    if (i === 0){
        pagination.innerHTML += `<li class="active">•</li>`
    } else {
        pagination.innerHTML += `<li>•</li>`
    }
}

const paginationItem = document.querySelectorAll(".slide-pagination > li")

// 첫번째, 마지막 슬라이드 복사
const firstSlide = slideContent[0];
const lastSlide = slideContent[slideContent.length -1];
const firstElem = document.createElement("li");
const lastElem = document.createElement("li");

// lastSlide.classList.forEach((c) => lastElem.classList.add(c));
// lastElem.innerHTML = lastSlide.innerHTML;

// firstSlide.classList.forEach((c) => firstElem.classList.add(c));
// firstElem.innerHTML = firstSlide.innerHTML;

lastElem.classList.add("slide-content","item2")
firstElem.classList.add("slide-content","item1")

slideContent[0].before(lastElem);
slideContent[slideLen - 1].after(firstElem);

slideContent = slide.querySelectorAll('.slide-content')

let offset = slideWidth;
slideContent.forEach((i) => {
    i.setAttribute("style", `transform: translateX(${-offset}px);`)
});

function nextSlide(){
    curIndex++;
    if (curIndex <= slideLen) { 
        const offset = slideWidth * curIndex;
        slideContent.forEach((i)=> {
            i.setAttribute("style", `transition: ${1}s; transform: translateX(${-offset}px);`)
        });
        paginationItem.forEach((i) => i.classList.remove("action"));
        paginationItem[curIndex - 1].classList.add("active");
    } else {
        curIndex = 0;
        let offset = slideWidth * curIndex;
        slideContent.forEach((i) => {
            i.setAttribute("style", `transform: translateX(${-offset}px);`)
        });
        curIndex++;
        offset = slideWidth * curIndex;
        setTimeout(() => {
            slideContent.forEach((i) => {
                i.setAttribute("style", `transition: ${1}s; transform: translateX(${-offset}px);`)
            });
        }, 0);
        paginationItem.forEach((i) => {
            i.classList.remove("action")
        });
        paginationItem[curIndex - 1].classList.add("active")
    }
}

let startPoint = 0;
let endPoint = 0;

slide.addEventListener("mousedown", (e) => {
    console.log(e.pageX)
    startPoint = e.pageX;
});

slide.addEventListener("mouseup", (e) => {
    endPoint = e.pageX;
    if (startPoint < endPoint) {
        // prevMove();
    } else if (startPoint > endPoint) {
        nextSlide()
    }
})
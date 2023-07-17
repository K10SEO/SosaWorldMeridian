const main = document.querySelector('.warp')
const slide = main.querySelector('.slide-wrap')
const slideList = slide.querySelector('.slide-list')

const slideImg = [
    "/src/image/월드메홈.jpg",
    "/src/image/월드메홈2.jpg"
]

const slideItem = slideImg.map((item, key)=> {
    const slideI = document.createElement("li")
    slideI.classList.add("slide-content", `item${key + 1}`)
    slideI.setAttribute("style", `background-image: url(${item})`)
    slideList.prepend(slideI)
    return slideI;
})

let slideContent = slide.querySelectorAll('.slide-content')
const slideLen = slideContent.length;

let curIndex = 1; // 슬라이드 초기 페이지 수
let timer = 100; // 이벤트 실행 제어를 위한 세팅값

// 페이지네이션 속성 부여
const pagination = document.querySelector(".slide-pagination")

for (let i = 0; i < slideLen; i++) {
    if (i === 0){
        pagination.innerHTML +=`<li class="active">•</li>`
    } else {
        pagination.innerHTML += `<li>•</li>`
    }
}

// 첫번째, 마지막 슬라이드 복사
const firstSlide = slideContent[0].cloneNode(true);
const lastSlide = slideContent[slideContent.length - 1].cloneNode(true);

slideList.insertBefore(lastSlide, slideContent[0]);
slideList.prepend(firstSlide);

slideContent = slide.querySelectorAll('.slide-content')
const paginationItem = document.querySelectorAll(".slide-pagination > li")

// 슬라이드 시, 페이지네이션 변경 
function pageCheck(curIndex) {
    if(!curIndex) {
        return false
    }else {
        paginationItem.forEach((i) => i.classList.remove("active"));
        paginationItem[curIndex - 1].classList.add("active");
    }
}

// 슬라이드 처리 속성 변경 함수
function contentStyle (offset,curIndex,num) {
    slideContent.forEach((i) => {
        i.style.transform = `translateX(${!!offset ? -offset + '%' : 0})`
        i.style.transition = `${!!num ? num : null}s`
    })
    pageCheck(curIndex)
}

// 슬라이드 1 설정
let offset = 100 * curIndex;
contentStyle(offset)

// 정방향 슬라이드 함수
function nextSlide(){
    timer = 1;
    curIndex++;
    if (curIndex <= slideLen) {
        const offset = 100 * curIndex;
        contentStyle(offset, curIndex, 2)
    } else{
        contentStyle() 
        curIndex = 1;
        offset = 100;
        setTimeout(() => {
            contentStyle(offset, curIndex, 2);
        }, 1);
    }
}

// 역방향 슬라이드 함수
function backSlide() {
    timer = 1;
    curIndex--;
    if (curIndex > 0) {
        const offset = 100 * curIndex;
            contentStyle(offset, curIndex, 2)
    } else {
        curIndex = slideLen + 1;
        let offset = 100 * curIndex;
        contentStyle(offset)
        curIndex--;
        offset = 100 * curIndex;
        setTimeout(() => {
                contentStyle(offset, curIndex, 2)
        }, 0);
    }
}

// 이벤트 제어를 위한 함수
function timerPlus(){
    setTimeout(()=>{
        timer = 100; // 슬라이드 종료 시, 타이머 값 100으로 변경
    }, 2000) // 슬라이드 transition 시간을 기다림
}

// 페이지네이션 클릭 이벤트
for (let i = 0; i < slideLen; i++) {
    paginationItem[i].addEventListener("click", () => {
        curIndex = i + 1;
        const offset = 100 * curIndex;
        contentStyle(offset, curIndex)
    })
}

// 마우스 드래그 이벤트
// 마우스 드래그 시작 위치 이벤트
slide.addEventListener("mousedown", (e) => {
    startPoint = e.pageX; // 드래그 시작 위치 
});

slide.addEventListener("mouseup", (e) => {
    endPoint = e.pageX; // 드래그 끝 위치
    if (timer !== 100) {
        return false
    } else if (startPoint > endPoint) {
        nextSlide() // 왼쪽으로 드래그 경우 실행
    } else if (startPoint < endPoint) {
        backSlide() // 오른쪽으로 드래그 경우 실행
    }
    timerPlus()
})

// 모바일 터치 드래그 이벤트
slide.addEventListener("touchstart", (e)=>{
    startPoint = e.touches[0].pageX; // 터치가 시작되는 위치
});

slide.addEventListener("touchend", (e) => {
    endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치
    if (timer !== 100) {
        return false
    } else if (startPoint > endPoint) {
        nextSlide(); // 왼쪽으로 스와이프 된 경우
    } else if (startPoint < endPoint) {
        backSlide(); // 오른쪽으로 스와이프 된 경우
    }
    timerPlus()
})

// 기본적으로 슬라이드 루프 시작하기  
// let loopInterval = setInterval(() => {
//     nextSlide();
// }, 5000)

function stopLoop (){
    clearInterval(loopInterval)
}
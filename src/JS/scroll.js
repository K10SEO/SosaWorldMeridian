
const menuWarp = document.querySelector('.menu-list')
const mainContent = document.querySelector('.main-content')
const menuList = menuWarp.querySelectorAll('li')
const contents = mainContent.querySelectorAll('li')
const menuLen = menuList.length
const topIcon = document.querySelector('#top-icon')
const mobileLi = document.querySelectorAll('.mobileMenuList > li')

// 메뉴 스크롤
function goToScroll (offset){
    window.scrollTo({top: offset - 100, behavior: 'smooth'})
}

// 스크롤 이벤트
for (let i = 0; i < menuLen; i++) {
    
    menuList[i].addEventListener("click", () => {
        let offset = contents[i].offsetTop
        goToScroll(offset)
    })

    mobileLi[i].addEventListener("click", () => {
        let offset = contents[i].offsetTop
        goToScroll(offset)
    })
}

// top 아이콘 화면 노출 이벤트
let contentOffset = (mainContent.offsetTop) - 700;

window.addEventListener("scroll", () => {
    if(window.scrollY >= contentOffset) {
        topIcon.classList.remove("ir-hidden")
        topIcon.classList.add("top-icon")
    } else if (window.scrollY < contentOffset) {
        topIcon.classList.remove("top-icon")
        topIcon.classList.add("ir-hidden")
    }
})

// top 아이콘 클릭시 상단 이동 이벤트
topIcon.addEventListener("click", () => {
    window.scrollTo({top:0, behavior: 'smooth' })
})

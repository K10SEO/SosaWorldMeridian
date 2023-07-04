const mobileIcon = document.querySelector(".menu-icon")
const mobileMenu = document.querySelector(".mobile-menu")



function dropMenu (){
    let dropCount = mobileMenu.classList[1];

    if( dropCount == "drop"){
        mobileMenu.classList.remove("drop")
        mobileMenu.classList.add("reverse")

    } else {
        mobileMenu.classList.remove("reverse")
        mobileMenu.classList.add("drop")

    }
}

mobileIcon.addEventListener("click", dropMenu)
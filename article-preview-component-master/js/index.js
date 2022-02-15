let socialmedia = document.querySelector(".card__sharebutton--active")
let button = document.querySelector(".card__button")
let toggle = true

button.addEventListener('click', function(){
    if (toggle == true){
        socialmedia.style.display = "flex"
        return toggle = false
    }
    else{
        socialmedia.style.display = "none" 
        return toggle = true
    }
})




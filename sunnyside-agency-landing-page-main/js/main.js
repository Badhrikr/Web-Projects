let arrowButton = document.querySelector('.orange__picture_arrow')
let scrolView = document.querySelector('.card')

arrowButton.addEventListener('click', function(){
    scrolView.scrollIntoView({behavior: "smooth"})
})
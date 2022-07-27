const arrowBtns = document.querySelectorAll(".card__arrowbtn")
const questions = document.querySelectorAll(".card__question")
const messages = document.querySelectorAll(".card__answer")

messages[1].classList.add('card__revealed__answer')
questions[1].classList.add('card__question-fw-modifier')

arrowBtns.forEach((arrowBtn,i) =>{
    arrowBtn.addEventListener('click',()=>{
        messages[1].classList.remove('card__revealed__answer')
        questions[1].classList.remove('card__question-fw-modifier')
        messages[i].classList.toggle('card__showanswer')
        questions[i].classList.toggle('card__question-fw')
    })
})


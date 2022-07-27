const arrowBtns = document.querySelectorAll(".card__arrowbtn")
const questions = document.querySelectorAll(".card__question")
const messages = document.querySelectorAll(".card__answer")

arrowBtns.forEach(arrowBtn =>{
    arrowBtn.addEventListener('click',()=>{
        messages.forEach(message =>{
            message.classList.toggle('card__showanswer')
        })
        questions.forEach(question => {
            question.classList.toggle('card__question-fw')
        })
    })
})
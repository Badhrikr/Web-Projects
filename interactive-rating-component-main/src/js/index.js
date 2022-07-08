const rating = document.querySelectorAll(".card__btn")
const submitBtn = document.querySelector(".subbtn")
const result = document.querySelector("body")

for(let i=0;i < rating.length;i++){
  rating[i].addEventListener('click',function(){
    console.log(rating[i].value)

    submitBtn.addEventListener('click', function(){
      result.innerHTML = `<div class="container ratings">
      <img src="./assets/images/illustration-thank-you.svg" alt="A Star logo">
      <div class="ratings__result">You selected ${rating[i].textContent}  out of 5</div>
      <div class="card__content ratings__content">
        <h1 class="card__heading ratings__heading">Thank you!</h1>
        <p class="card__description ratings__description">We appreciate you taking the time to give a rating. If you ever need more support, 
          don’t hesitate to get in touch!</p>      
      </div>
    </div>`
    })
  })
}
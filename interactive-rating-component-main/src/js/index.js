const ratings = document.querySelector(".btn1");
const result = document.querySelector("body")

// for(let i = 0; i < ratings.length; i++){
//     ratingsNo = ratings[i].textContent
//     console.log(ratingsNo)
// }

ratings.addEventListener('click',function(){
    console.log("hello")
    result.innerHTML = `<div class="container ratings">
    <img src="./assets/images/illustration-thank-you.svg" alt="A Star logo">
    <div class="ratings__result">You selected ${ratings.textContent}  out of 5</div>
    <div class="card__content ratings__content">
      <h1 class="card__heading ratings__heading">Thank you!</h1>
      <p class="card__description ratings__description">We appreciate you taking the time to give a rating. If you ever need more support, 
        don’t hesitate to get in touch!</p>      
    </div>
  </div>
  <footer>
    <div class="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
      Coded by <a href="https://www.linkedin.com/in/badhrikr22/" target="_blank">Badhri Kesava Raja S M</a>.
    </div>
  </footer>`
})
const wrapper = document.querySelector(".wrapper")
const ratings = document.querySelector(".ratings")
const rating = document.querySelectorAll(".card__btn")
const submitBtn = document.querySelector(".subbtn")
const result = document.querySelector(".rate")

for(let i=0;i < rating.length;i++){
  rating[i].addEventListener('click',function(){
    console.log(rating[i].value)

    submitBtn.addEventListener('click', function(){
      result.textContent = rating[i].value;
      ratings.style.display = "flex"
      wrapper.style.display = "none"
    })
  })
}
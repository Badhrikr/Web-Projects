let toggler = document.getElementsByClassName("togglerbutton");
let media = document.getElementsByClassName("card__sharebutton--active");

toggler.addEventListener('click', () =>{
    if(media.style.display === 'none'){
        media.style.display = 'block';
    }
    else{
        media.style.display = 'none';
    }
})
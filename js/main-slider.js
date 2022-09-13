const mainSlider = document.querySelector('.main-slider');
const slides = document.querySelectorAll('.main-slider .slide');
let active = document.querySelector('.main-slider .slide.active');



let indexOfActiveElement = () => {
    for(let i=0; i<slides.length; i++){
        if(Array.from(slides[i].classList).find(className => className == 'active')){
            return i;
        }
    }
}



for(let i=0; i<slides.length; i++){

    
    slides[i].addEventListener('mouseenter', function myF(){
        
        if(!(Array.from(slides[i].classList).find(className=> className == 'active'))){

            slides[indexOfActiveElement()].classList.remove('active');
            slides[i].classList.add('active');
            
        } else {
            
        }
    });
}



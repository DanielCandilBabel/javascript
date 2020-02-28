const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */

for (let index = 1; index < 6; index++) {
    const element = "images/pic" + index + ".jpg";
    const newImage = document.createElement('img');
    newImage.setAttribute('src', element);
    thumbBar.appendChild(newImage);
    newImage.addEventListener("click", function(){
        displayedImage.setAttribute('src',element);
    })
}

btn.addEventListener('click',function(){

    if(btn.getAttribute('class')==='dark'){
        btn.setAttribute('class', 'light');
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    }
    else{
        btn.setAttribute('class', 'dark');
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }



})

/* Wiring up the Darken/Lighten button */

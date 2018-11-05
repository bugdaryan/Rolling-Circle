let button=document.createElement('button');
button.type="button";
button.innerHTML="click me";
button.style="font-size:30; background: red; color:white; border-radius:8px; float:right;";
button.addEventListener('click',onButtonClick);
document.body.appendChild(button);

let buttonClicked=false;
function onButtonClick(){
    if(!buttonClicked){
        buttonClicked=true;
        startCircle();
    }
}

function startCircle(){

}
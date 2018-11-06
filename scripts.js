document.body.onload=function init(){
    document.body.style="box-sizing:border-box;"

    let bigCircle=document.createElement('div');
    bigCircle.style=`
    margin-left:150px;
    margin-top:50px;
    width: 500px;
    height: 500px;
    border-radius: 100%;
    color: gray;
    border:solid gray 16px;
    box-sizing:inherit`;
    document.body.appendChild(bigCircle);

    let smallCircle=document.createElement('div');
    smallCircle.id='smallCircle'
    smallCircle.style=`
    width: 100px;
    height: 100px;
    border-radius: 100%;
    color: yellow;
    position:absolute;
    top:0;
    left:0;
    z-index=1;
    border:solid yellow 6px;
    box-sizing:inherit;`;
    document.body.appendChild(smallCircle);

    let startButton=document.createElement('button');
    startButton.type="button";
    startButton.innerHTML="click me";
    startButton.style=`
    font-size:30; 
    background: red; 
    color:white; 
    border-radius:8px; 
    position:absolute;
    right:40px;
    top:40px;
    box-sizing:inherit;
    outline:none;`;
    startButton.addEventListener('click',onStartButtonClick);
    document.body.appendChild(startButton);

    let stopButton=document.createElement('button');
    stopButton.type="button";
    stopButton.innerHTML="STOP";
    stopButton.style=`
    font-size:30; 
    background: red; 
    color:white; 
    border-radius:8px; 
    position:absolute;
    right:40px;
    top:100px;
    box-sizing:inherit;
    outline:none;`;
    stopButton.addEventListener('click',onStopButtonClick);
    document.body.appendChild(stopButton);
}

const points=new Array(200);
let startButtonClicked=false;
let intervalId;

function onStartButtonClick(){
    if(!startButtonClicked){
        startButtonClicked=true;
        startCircle();
    }
}

function onStopButtonClick(){
    startButtonClicked=false;
    clearInterval(intervalId);
}

function startCircle(){
    
    createPoints(points);
    const circle=document.getElementById('smallCircle');
    let i=0;
    intervalId=setInterval(frame,5);
    function frame(){
        if(i>=points.length)
            i=0;
        circle.style.left=`${points[i].x-50}px`
        circle.style.top=`${points[i].y-50}px`
        i++;
    }
}

function createPoints(arr)
{
    const radius =250;
    const x0=150;
    const y0=50;
    let coef=1;
    for(let i=0;i<arr.length;i++){
        let angle = coef*Math.PI*2;
        let x = x0+radius+Math.cos(angle)*radius;
        let y = y0+radius+Math.sin(angle)*radius;
        arr[i]={x:x,y:y};
        coef-=1/arr.length;
    }
}
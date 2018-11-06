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
    box-sizing:inherit;
    transform: translate(350px,250px);`;
    document.body.appendChild(smallCircle);

    let button=document.createElement('button');
    button.type="button";
    button.innerHTML="click me";
    button.style=`
    font-size:30; 
    background: red; 
    color:white; 
    border-radius:8px; 
    position:absolute;
    right:40px;
    top:40px;
    box-sizing:inherit;
    outline:none;`;
    button.addEventListener('click',onButtonClick);
    document.body.appendChild(button);
}

const points=new Array(200);
let buttonClicked=false;
function onButtonClick(){
    if(!buttonClicked){
        buttonClicked=true;
        startCircle();
    }
}

function startCircle(){
    
    createPoints(points);
    // points_holder=document.getElementById('points_holder');
    // for(let i=0;i<points.length;i++)
    // {
    //     let point=document.createElement('div');
    //     point.style=`
    //     position:absolute;
    //     width:5px;
    //     height:5px;
    //     box-sizing:inherit;
    //     z-index:2;
    //     top:0;
    //     left:0;
    //     border:solid red 2px;
    //     border-radius:100%;
    //     transform:translate(${points[i].x+3}px,${points[i].y-5}px);
    //     `
    //     points_holder.appendChild(point);
    // }
    const circle=document.getElementById('smallCircle');
    let i=0;
    while(true){
        circle.style.left=`${points[i].x}px`
        circle.style.top=`${points[i].y}px`
        i++;
        i%=points.length;
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
document.body.onload=()=>{
    // setting box-sizing to border-box, to include its border width to its size
    document.body.style="box-sizing:border-box;"

    //creating big circle
    const bigCircle=document.createElement('div');

    //setting style
    bigCircle.style=`
    margin-left:150px; /* adding space from left and top for small circle to roll */
    margin-top:50px;
    width: 500px;  /* setting width and height */
    height: 500px;
    border-radius: 100%;  /* setting border-radius to 100%, to make it circle */
    border:solid black 16px;  /* setting type, color and width of border */
    box-sizing:inherit`;  // setting box-sizing to inherit from body, again to include its border width to its size
    document.body.appendChild(bigCircle);  //and appending to DOM tree

    const smallCircle=document.createElement('div');  //now creating small circle
    smallCircle.id='smallCircle'  //setting id, we will need to accses it later
    smallCircle.style=` 
    width: 100px;
    height: 100px;
    border-radius: 100%;
    position:absolute; 
    top:250;
    left:600;
    z-index=1; /* setting z-index to 1 because we want it to be on the big circle , not under, by default its 0,  */
    border:solid blue 6px;
    box-sizing:inherit;`;
    document.body.appendChild(smallCircle);

    const startButton=document.createElement('button');  //creating start button
    startButton.type="button";  //setting type
    startButton.id="startButton" //setting id
    startButton.innerHTML="START"; //inner text
    startButton.style=` /* style is pretty much the same */
    font-size:30; 
    background: green; 
    color:white; 
    border-radius:8px; 
    position:absolute;
    right:40px;
    top:40px;
    box-sizing:inherit;
    outline:none;`;
    startButton.addEventListener('click',onStartButtonClick); //adding onStartButtonClick listener on click event, 
    document.body.appendChild(startButton); //appending to tree

    const stopButton=document.createElement('button'); //adding stop button (i was bored)
    stopButton.type="button";
    stopButton.id="stopButton"
    stopButton.innerHTML="STOP";
    stopButton.style=`
    font-size:30; 
    background: gray; 
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

const points=new Array(200);  //this will be the points on our big circle, where will go our small circle
points[0]=-1; //setting first element to -1, so that later we can check if its empty or not (first element of points cant be -1 in any case, because elements of points will be objects not numbers)
let startButtonClicked=false; // some flag to turn on and off when start button is pressed
let intervalId;  // some interval id to clear and store interval in it
let lastPositionIndex=0; // last index of small circle, when he was stopped
const frameSpeed=10;  // and rolling speed, smaller is faster

//function that will be called, when start button is clicked
function onStartButtonClick(){
    if(!startButtonClicked){  //checking if it was clecked before
        document.getElementById("startButton").style.background="gray" //setting background to gray
        document.getElementById("stopButton").style.background="red"  //and red
        startButtonClicked=true; //setting flag, so our function wont do the same thing in a row
        startCircle();  // calling function to start rolling a circle
    }
}

//this function is called, when stop button is clicked
function onStopButtonClick(){  
    startButtonClicked=false; //resetting our flag
    document.getElementById("startButton").style.background="green"
    document.getElementById("stopButton").style.background="gray"
    clearInterval(intervalId); //and clearing interval, so that our circle stops rolling 
}

//this function is called when circle is about to roll
function startCircle(){
    if(points[0]===-1) //if first element is -1, it means points is empty, otherwise we already have poits we need
        createPoints(points); // getting points
    const circle=document.getElementById('smallCircle'); // getting small circle
    let i=lastPositionIndex; // in case if we already started and stopped circle, we simply take the last index, and continue from it 
    intervalId=setInterval(frame,frameSpeed); //setting interval, and storing in intervalId, so that later we can clear it
    
    //this function will be rolling circle
    function frame(){
        if(i>=points.length) //checking if i is grather or equal to our points length
            i=0;
        circle.style.left=`${points[i].x-50}px` //changing circles left and top positions
        circle.style.top=`${points[i].y-50}px`
        i++; 
        lastPositionIndex=i; //saving last index, in case of we stop at any moment
    }
}

//this function will create points on our big circle
function createPoints(arr) 
{
    const radius =250; //our big circle is 500x500, so its radius is 250, (i know i know, hard coding, bad practice)
    const x0=150; // now we had a margin from left on 150px
    const y0=50; // and from top on 50px, we have to add them above
    let coef=1; // setting some coeficent, so that we can compute radians
    for(let i=0;i<arr.length;i++){
        const radian = coef*Math.PI*2; // getting our radian
        const x = x0+radius+Math.cos(radian)*radius; // now adding x0 and radius to cos(radian)* radius, will give us some x on our big circle
        const y = y0+radius+Math.sin(radian)*radius; // same here
        arr[i]={x:x,y:y}; // now putting them in array
        coef-=1/arr.length; // and subtracting from coef 1/arr.length (our loop will do arr.length times, so arr.length*1/arr.lenght=1, and coef at the end will be 0, means we will be there, where we started)
    }
}
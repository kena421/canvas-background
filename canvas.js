
var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var mouse = {
    x:undefined,
    y:undefined
}

const maxRadius = 50;
const startRadius = 6;
const interactDistance = 60;
const maxSpeedX = 10;
const maxSpeedY = 10;
const numCircle = 1000;
const colorArray = [
    '#F3FEB0',
    '#FEA443',
    '#705E78',
    '#A5AAA3',
    '#812F33',
    // '#ffaa33',
    // '#99ffaa',
    // '#00ff00',
    // '#4411aa',
    // '#994451',
    // '#474278',
    // 'afc454',
    // 'red',
    // 'black',
    // 'blue',
    // 'grey',
    // 'green',
    // 'violet'

]

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x,y,dx,dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.originalRadius = radius;
    this.color = color;
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y,this.radius, 0, Math.PI*2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill()
        
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
        this.dx = -this.dx;
        if(this.y + radius > innerHeight || this.y - this.radius < 0)
            this.dy = -this.dy;        
        this.x+=this.dx;
        this.y += this.dy;

        //interactivity with mouse
        if(Math.abs(mouse.x - this.x) < interactDistance && Math.abs(mouse.y - this.y) < interactDistance && this.radius < maxRadius) {
            this.radius += 1;
        }
        else if(this.radius > this.originalRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];
function init(){
    circleArray = [];
    for (var i=0; i < numCircle; i++){
    
        var x = Math.random()*(innerWidth-2*radius)+radius;
        var y = Math.random()*(innerHeight-2*radius)+radius;
        var dx = (Math.random()-0.5)*maxSpeedX;
        var dy = (Math.random()-0.5)*maxSpeedY;
        var radius = Math.random()*startRadius+2; 
        var colorIndex = parseInt(Math.random()*colorArray.length)
        var color = colorArray[colorIndex];
        var circle = new Circle(x,y,dx,dy,radius,color);
        circleArray.push(circle);
        
    }
}

init();



function animate(){
    requestAnimationFrame(animate);    
    
    c.clearRect(0,0,innerWidth, innerHeight);
    for(let circle of circleArray){
        circle.update();
    }

    
}
animate();
// select the DOM Elements
const canvas = document.querySelector("canvas");
const colors = document.querySelector(".colors");
const colorI = document.querySelector(".input_color");
const lineSize = document.querySelector(".input_line");
const blackColor = document.querySelector(".color-black");
const rainbowColor = document.querySelector(".color-rainbow");

// create the canvas Object
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;

// initial variables
let isDrawing = false;
let custom = false;
let lastX = lastY = hue = 0;
let preColor = blackColor;


// color changing function
colors.addEventListener("click", (e) => {
     if(e.target.className === "colors") return;
     custom = false;

     // add the active class
     e.target.classList.add("color_active");
     if (e.target === rainbowColor) custom = true;
     
     // change the stroke color to the selected color from the background color
     const bgColor = window.getComputedStyle(e.target ,null).getPropertyValue('background-color');
     ctx.strokeStyle = bgColor;

     // add Animation
     e.target.style.transform = 'translateY(2px)';
     preColor.style.transform = 'translateY(-2px)';
     
     // store the current target in memory
     if(preColor) preColor.classList.remove("color_active");
     preColor = e.target;
})

// line width function
lineSize.addEventListener("input", (e) => {
     ctx.lineWidth = e.target.value;
})

// custom color input
colorI.addEventListener("input", (e) => {
     ctx.strokeStyle = e.target.value;
     custom = false;
})

// main drawing function
function draw(e) {
     if(!isDrawing) return;

     if (custom) ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    
     ctx.beginPath();
     ctx.moveTo(lastX, lastY);
     ctx.lineTo(e.offsetX, e.offsetY);
     ctx.stroke();
     [lastX, lastY] = [e.offsetX, e.offsetY];   
     hue++;
}


// all DOM events
canvas.addEventListener('mousedown', (e) => {
     isDrawing = true;
     [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
   
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let color = "#000000";
let size = 10;

// color picker event listener
document.getElementById("color-picker").addEventListener("change", (event) => {
  color = event.target.value;
});

// size slider event listener
document.getElementById("size-slider").addEventListener("change", (event) => {
  size = event.target.value;
});

document.getElementById("clear-button").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
  let isDrawing = false;
let lastX = 0;
let lastY = 0;

// mouse event listeners for drawing on the canvas
canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    const x = event.offsetX;
    const y = event.offsetY;
    drawLine(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
// fetch tip of the day from API
fetch("https://api.adviceslip.com/advice")
  .then(response => response.json())
  .then(data => {
    const tipElement = document.getElementById("tip");
    tipElement.textContent = data.slip.advice;
  })
  .catch(error => console.error(error));


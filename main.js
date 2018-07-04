const $canvas = document.querySelector('#main_game')
const ctx = $canvas.getContext('2d')

resizeCanvas()
window.addEventListener('resize', () => {
  resizeCanvas()
  drawGrid(size)
})

$canvas.addEventListener('contextmenu', () => {
  event.preventDefault()
})

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

window.addEventListener('mousemove', event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

const size = 15
drawGrid(size)

function drawGrid(size) {
  const lineWidth = 1
  for (let i = 0; i < $canvas.width / size; i++) {
    drawLine({ x: i * size, y: 0 }, { x: i * size, y: $canvas.height }, lineWidth)
  }
  for (let i = 0; i < $canvas.height / size; i++) {
    drawLine({ x: 0, y: i * size }, { x: $canvas.width, y: i * size }, lineWidth)
  }
}

function drawLine(start, end, size) {
  ctx.beginPath();
  ctx.lineWidth = size
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function drawPixel(x, y, size, color) {
  ctx.fillStyle = color
  ctx.fillRect(x * size, y * size, size, size)
}

function distance(start, end) {
  return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))
}

function resizeCanvas() {
  $canvas.width = window.innerWidth
  $canvas.height = window.innerHeight
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRGB(red, green, blue, alpha) {
  return `rgb(${red}, ${green}, ${blue}, ${alpha === undefined ? 1 : alpha})`
}

function normalize(value, min, max) {
  return (value - min) / (max - min)
}
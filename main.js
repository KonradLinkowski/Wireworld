const $canvas = document.querySelector('#main_game')
const ctx = $canvas.getContext('2d')

resizeCanvas()
window.addEventListener('resize', resizeCanvas)

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

window.addEventListener('mousemove', event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
  // console.log(mouse)
  drawWhiteAroundMouse(size)
})


const size = 10
drawRandomPixels(size)
function animate() {
  // drawRandomPixels(size)
  requestAnimationFrame(animate)
}
animate()

function drawRandomPixels(size) {
  const x = $canvas.width / size
  const y = $canvas.height / size
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      ctx.fillStyle = getRandomColor()
      drawPixel(i, j, size)
    }
  }
}

function drawWhiteAroundMouse(size) {
  let range = 10
  let pos = { x: Math.floor(mouse.x / size), y: Math.floor(mouse.y / size) }
  for (let i = pos.x - range + 1; i <  pos.x + range; i++) {
    for (let j = pos.y - range + 1; j < pos.y + range; j++) {
      let dist = distance(pos, { x: i, y: j})
      if (dist <= range) {
        ctx.fillStyle = getRandomColor() //getRGB(255, 255, 255, (1 - normalize(dist, 0, range)))
        drawPixel(i, j, size)
      }
    }
  }
}

function drawPixel(x, y, size) {
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
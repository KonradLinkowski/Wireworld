const x = 200, y = 200
let grid = new Array(x).fill(null).map(el => new Array(y).fill(0))
for (let i = 1; i < 19; i++) {
  for (let j = 1; j < 19; j++) {
    if (i == 1 || i == 18 || j == 1 || j == 18 || i == j || 19 - i == j) {
      grid[i][j] = 1
    }
  }
}
grid[1][2] = 2
drawMap(grid)
let mousePressed = false
window.addEventListener('mousedown', event => {
  const pos = { x: Math.floor(mouse.x / size), y: Math.floor(mouse.y / size) }
  if (grid[pos.x][pos.y] == 0 && event.button == 0) {
    grid[pos.x][pos.y] = 1
    mousePressed = true
  }
  else if (grid[pos.x][pos.y] == 1 && event.button == 2) {
    grid[pos.x][pos.y] = 0
  }
  else if (grid[pos.x][pos.y] == 1 && event.button == 0) {
    grid[pos.x][pos.y] = 2
  }
  drawMap(grid)
})

window.addEventListener('mouseup', event => {
  mousePressed = false
})

window.addEventListener('mousemove', event => {
  const pos = { x: Math.floor(mouse.x / size), y: Math.floor(mouse.y / size) }
  if (mousePressed) {
    if (grid[pos.x][pos.y] == 0) {
      grid[pos.x][pos.y] = 1
    }
  }
})

function iteration(map) {
  let grid = copyGrid(map)
  // console.log(grid[1][2])
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      switch (map[i][j]) {
        case 1:
        let count = calcHeads(map, i, j)
        if (count == 2 || count == 1) {
          grid[i][j] = 2
        }
        break
        case 2:
        grid[i][j] = 3
        break
        case 3:
        grid[i][j] = 1
        break
      }
    }
  }
  return grid
}

function drawMap(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      switch (map[i][j]) {
        case 0:
        drawPixel(i, j, size, getRGB(255, 255, 255))
        break
        case 1:
        drawPixel(i, j, size, getRGB(255, 255, 0))
        break
        case 2:
        drawPixel(i, j, size, getRGB(255, 0, 0))
        break
        case 3:
        drawPixel(i, j, size, getRGB(0, 0, 255))
        break
      }
    }
  }
  drawGrid(size)
}

function copyGrid(grid) {
  let newGrid = []
  for (let i = 0; i < grid.length; i++){
    newGrid.push([])
    for (let j = 0; j < grid[0].length; j++) {
      newGrid[i].push(grid[i][j])
    }
  }
  // console.log(newGrid)
  return newGrid
}

function calcHeads(map, x, y) {
  let count = 0
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (map[i][j] == 2) {
        count++
      }
    }
  }
  return count
}

function animate() {
  grid = iteration(grid)
  drawMap(grid)
  requestAnimationFrame(animate)
}
animate()
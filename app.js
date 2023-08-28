const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const side = 50

const getRandomRGBA = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = Math.random().toFixed(1)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

let x = 350;
let y = 350;
let dir = '';

const keyMapping = {
  'up': () => {
    y -= 10
    if (y < -50) y = 800
  },
  'left': () => {
    x -= 10
    if (x < -50) x = 800
  },
  'down': () => {
    y += 10
    if (y > 800) y = -50
  },
  'right': () => {
    x += 10
    if (x > 800) x = -50
  }
}

const dirMapping = {
  'w': () => { dir = 'up' },
  'a': () => { dir = 'left' },
  's': () => { dir = 'down' },
  'd': () => { dir = 'right' }
}

document.addEventListener('keydown', e => {
  if (!dirMapping[e.key]) return

  dirMapping[e.key]()

  update()
})

function update() {
  if (!keyMapping[dir]) return

  keyMapping[dir]()

  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 750, 750)  

  ctx.fillStyle = getRandomRGBA()
  
  ctx.fillRect(x, y, side, side)
  ctx.strokeRect(x, y, side, side)

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 17);
      };
}());

window.requestAnimationFrame(update);

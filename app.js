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

// document.addEventListener('keydown', () => {
//   const x = Math.floor(Math.random() * 750);
//   const y = Math.floor(Math.random() * 750);

//   ctx.fillStyle = getRandomRGBA()

//   ctx.fillRect(x, y, side, side)
//   ctx.strokeRect(x, y, side, side)
// });

let x = 350;
let y = 350;

const keyMapping = {
  'w': () => { y -= 10 },
  's': () => { y += 10 },
  'd': () => { x += 10 },
  'a': () => { x -= 10 }
}

document.addEventListener('keydown', e => {
  if (!keyMapping[e.key]) return

  keyMapping[e.key]()

  ctx.fillStyle = getRandomRGBA()

  ctx.fillRect(x, y, side, side)
  ctx.strokeRect(x, y, side, side)
})

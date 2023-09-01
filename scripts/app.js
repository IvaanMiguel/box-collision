import Box from './Box.class.js'
import Controller from './Controller.class.js';

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomRGBA = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = Math.random().toFixed(1)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const canvas = document.getElementById('canvas')
export const ctx = canvas.getContext('2d')

const playerSpeed = 10
const playerWidth = 50
const playerHeight = 50
let playerX = canvas.width / 2 - playerWidth / 2
let playerY = canvas.height / 2 - playerHeight / 2

const targetWidth = 25
const targetHeight = 25
let targetX = canvas.width / 2 + 75
let targetY = canvas.height / 2 + 75

const obstacleWidth = 500
const obstacleHeight = 75
const obstacleX = canvas.width / 2 - obstacleWidth / 2
const obstacleY = 75 - obstacleHeight / 2

const player = new Box({
  x: playerX,
  y: playerY,
  width: playerWidth,
  height: playerHeight,
  speed: playerSpeed,
  color: 'lightblue'
})

player.controller = new Controller(player)

const target = new Box({
  x: targetX,
  y: targetY,
  width: targetWidth,
  height: targetHeight,
  speed: 5,
  color: 'red'
})

const obstacles = []
obstacles.push(new Box({
  x: obstacleX,
  y: 700,
  width: 200,
  height: 25
}))

obstacles.push(new Box({
  x: obstacleX,
  y: obstacleY,
  width: obstacleWidth,
  height: obstacleHeight,
  color: 'black'
}))

obstacles.push(new Box({
  x: obstacleX,
  y: obstacleY,
  width: 50,
  height: 500,
  color: 'black'
}))

obstacles.push(new Box({
  x: 600,
  y: 200,
  width: 50,
  height: 500,
  color: 'black'
}))

function repaintCanvas() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 750, 750)  
}

function update() {
  repaintCanvas()

  obstacles.forEach(obstacle => obstacle.paint())

  player.controller.update()

  obstacles.forEach(obstacle => player.checkCollisionWith(obstacle))

  player.paint()

  if (player.isCollidingWith(target)) {
    let targetColliding = false

    do {
      target.x1 = getRandomBetween(0, canvas.width - targetWidth)
      target.y1 = getRandomBetween(0, canvas.height - targetHeight)

      for (let i = 0; i < obstacles.length; i++) {
        if (target.isCollidingWith(obstacles[i])) {
          targetColliding = true
          break
        }

        targetColliding = false
      }
    } while (targetColliding)
  }

  target.paint()

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 17)
      };
}())

window.requestAnimationFrame(update)

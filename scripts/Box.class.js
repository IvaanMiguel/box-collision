import { ctx } from './app.js'

class Box {
  constructor(props = { x, y, width, height, speed, color }) {
    this.x1 = props.x
    this.y1 = props.y
    this.x2 = props.x + props.width
    this.y2 = props.y + props.height
    this.width = props.width
    this.height = props.height
    this.speed = props.speed || 0
    this.color = props.color || 'black'
  }

  set x1(x) {
    this._x1 = x
    this.x2 = x + this.width
  }

  get x1() { return this._x1 }

  set y1(y) {
    this._y1 = y
    this.y2 = y + this.height
  }

  get y1() { return this._y1 }

  paint() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x1, this.y1, this.width, this.height)
  }

  isCollidingWith(box) {
    return this.x1 < box.x2 && this.x2 > box.x1 &&
        this.y1 < box.y2 && this.y2 > box.y1
  }

  checkCollisionWith(box) {
    if (this.isCollidingWith(box)) {
      if (!this.controller) return

      switch (this.controller.direction) {
        case 'up':
          this.y1 = box.y2
          break;
        
        case 'left':
          this.x1 = box.x2
          break;
  
        case 'down':
          this.y1 = box.y1 - this.height
          break;
        
        case 'right':
          this.x1 = box.x1 - this.width
          break;
      }
  
      this.controller.invertDirection()
    }
  }
}

export default Box

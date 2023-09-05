import { canvas } from './app.js'
import pauseScreen from './PauseScreen.js'

class Controller {
  constructor(inst, keys = { up: 'w', left: 'a', down: 's', right: 'd' }) {
    this.inst = inst

    this.direction = ''
    this.keys = keys

    this._dirMapping = {
      [this.keys.up]: () => { this.direction = 'up' },
      [this.keys.left]: () => { this.direction = 'left' },
      [this.keys.down]: () => { this.direction = 'down' },
      [this.keys.right]: () => { this.direction = 'right' }
    }

    this._mapKeys()

    document.body.addEventListener('keydown', e => {
      if (!this._dirMapping[e.key] || pauseScreen.isVisible) return

      this._dirMapping[e.key]()
    })
  }

  _mapKeys() {
    const inst = this.inst

    this._keyMapping = {
      'up': () => {
        inst.y1 = (inst.y1 - inst.speed < -inst.height) ? canvas.height : inst.y1 - inst.speed
      },
      'left': () => {
        inst.x1 = (inst.x1 - inst.speed < -inst.width) ? canvas.width : inst.x1 - inst.speed
      },
      'down': () => {
        inst.y1 = (inst.y1 + inst.speed > canvas.height) ? -inst.height : inst.y1 + inst.speed
      },
      'right': () => {
        inst.x1 = (inst.x1 + inst.speed > canvas.width) ? -inst.width : inst.x1 + inst.speed
      }
    }
  }

  update() {
    if (this.direction != '') this._keyMapping[this.direction]()
  }

  invertDirection() {
    switch (this.direction){ 
      case 'up':
        this.direction = 'down'
        break;
      
      case 'left':
        this.direction = 'right'
        break;
      
      case 'down':
        this.direction = 'up'
        break;

      case 'right':
        this.direction = 'left'
        break;
    }
  }
}

export default Controller

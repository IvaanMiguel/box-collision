import { ctx } from './app.js'

let inst

class PlayerScore {
  constructor() {
    if (inst) throw new Error('Cannot instance player score more than once.')

    this.score = 0
    
    inst = this
  }

  get score() { return this._score } 

  set score(score) { this._score = score }

  paint() {
    ctx.fillStyle = 'black'
    ctx.font = '20px Sans-serif'

    ctx.fillText(`Score: ${this.score}`, 20, 30)
  }
}

const playerScore = new PlayerScore()

export default playerScore

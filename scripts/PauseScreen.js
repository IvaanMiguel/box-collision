import { canvas, ctx } from './app.js'

let inst

class PauseScreen {
  constructor() {
    if (inst) throw new Error('Cannot instance pause screen more than once.')

    this.isVisible = false
    this.pauseKey = 'Space'
    this.pauseText = 'Paused'

    inst = this
  }

  set isVisible(bool) { this._isVisible = bool }

  get isVisible() { return this._isVisible }

  paint() {
    ctx.fillStyle = 'rgba(227, 227, 227, .05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'black'
    ctx.font = '40px Sans-serif'

    const textMetrics = ctx.measureText(this.pauseText)
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

    ctx.fillText('Paused', canvas.width / 2 - textMetrics.width / 2, canvas.height / 2 + textHeight / 2)
  }
}

const pauseScreen = new PauseScreen()

export default pauseScreen

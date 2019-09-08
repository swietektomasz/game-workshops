import * as PIXI from 'pixi.js'

let app, blob

function init() {
  app = new PIXI.Application({ height: 200, width: 400, backgroundColor: 0x1099bb })
  document.body.appendChild(app.view)

  app.loader.add('sprites.json').load(setup)
}

function setup() {
  blob = new PIXI.Sprite.from('blob.png')
  blob.x = app.screen.width / 2
  blob.y = app.screen.height / 2

  app.stage.addChild(blob)
}

init()

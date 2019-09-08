import * as PIXI from 'pixi.js'

let app, player, ground, blob

function init() {
  app = new PIXI.Application({ height: 200, width: 400, backgroundColor: 0x1099bb })
  document.body.appendChild(app.view)
  app.loader.add('sprites.json').load(setup)
}

init()

function setup() {
  const groundTexture = PIXI.Texture.from('groundtile.png')
  ground = new PIXI.TilingSprite(groundTexture, app.screen.width, groundTexture.height)
  ground.y = app.screen.height - ground.height

  app.stage.addChild(ground)

  const anim = []

  for (let i = 1; i < 8; i++) {
    anim.push(PIXI.Texture.from(`run-0${i}.png`))
  }
  player = new PIXI.AnimatedSprite(anim)
  player.x = 50
  player.y = app.screen.height - ground.height - player.height
  player.animationSpeed = 0.2
  player.play()

  app.stage.addChild(player)

  blob = new PIXI.Sprite.from('blob.png')
  blob.height = 16
  blob.width = 16
  blob.x = app.screen.width - blob.width
  blob.y = app.screen.height - ground.height - blob.height

  app.stage.addChild(blob)
}

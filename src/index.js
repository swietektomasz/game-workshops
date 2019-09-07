import * as PIXI from 'pixi.js'
import { keyboard } from './keyboard'
import { rectangleCollisionCheck } from './collision'

const app = new PIXI.Application({ height: 200, width: 400, backgroundColor: 0x1099bb })
document.body.appendChild(app.view)

app.loader.add('sprites.json').load(setup)

let player, ground, blob, scoreText
let score = 0

function setup() {
  const groundTexture = PIXI.Texture.from('groundtile.png')
  ground = new PIXI.TilingSprite(groundTexture, app.screen.width, groundTexture.height)
  ground.y = app.screen.height - ground.height

  app.stage.addChild(ground)

  const anim = []

  for (let i = 1; i < 8; i++) {
    anim.push(PIXI.Texture.from(`run-spritesheet_0${i}.png`))
  }
  player = new PIXI.AnimatedSprite(anim)

  player.x = 50
  player.y = app.screen.height - ground.height - player.height
  player.animationSpeed = 0.2
  player.play()
  player.vx = 0
  player.vy = 0
  player.jumping = false
  app.stage.addChild(player)

  let jump = keyboard('Space')

  let jumpParabole = [5, 3, 1, -2, -4, -5]
  jump.press = () => {
    let counter = 0
    if (!player.jumping) {
      player.jumping = true
      const flyer = setInterval(() => {
        player.vy = jumpParabole[counter]
        counter++
      }, 200)
      setTimeout(function() {
        player.vy = 0
        player.y = app.screen.height - ground.height - player.height
        player.jumping = false
        clearInterval(flyer)
      }, 1300)
    }
  }

  blob = new PIXI.Sprite.from('blob.png')
  blob.height = 16
  blob.width = 16
  blob.x = app.screen.width - blob.width
  blob.y = app.screen.height - ground.height - blob.height
  blob.vx = 2
  app.stage.addChild(blob)

  scoreText = new PIXI.Text(score, { fontFamily: 'Arial', fontSize: 16 })
  scoreText.x = 10
  scoreText.y = 10

  app.stage.addChild(scoreText)

  app.ticker.add(delta => play(delta))
}

function createObstacle() {
  if (score % 200 === 0) {
    blob.x = app.screen.width - blob.width
    blob.y = app.screen.height - ground.height - blob.height
    blob.vx = Math.random() * 4 + 2
  }
}

function play() {
  score++
  scoreText.text = `Your score: ${score}`

  createObstacle()
  player.y -= player.vy
  ground.tilePosition.x -= 1
  blob.x -= blob.vx

  if (rectangleCollisionCheck(player, ground)) {
    player.vy = 0
    player.jumping = false
  }
  if (rectangleCollisionCheck(player, blob)) {
    app.stop()
  }
}

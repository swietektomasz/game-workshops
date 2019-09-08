import * as PIXI from 'pixi.js'
import { keyboard } from './keyboard'
import { rectangleCollisionCheck } from './collision'

let app, player, ground, blob, scoreText, controlsText, startButton, resetButton, score;

function init() {
  score = 0;
  app = new PIXI.Application({ height: 200, width: 400, backgroundColor: 0x1099bb })
  document.body.replaceChild(app.view, document.body.childNodes[0])
  start()
}

init();

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
  player.vx = 0
  player.vy = 0
  player.jumping = false
  app.stage.addChild(player)

  let jump = keyboard('Space')

  let jumpParabole = [3, 2, 1, -1, -2, -3]
  jump.press = () => {
    let counter = 0
    if (!player.jumping) {
      player.jumping = true
      player.animationSpeed = 0
      player.vy = jumpParabole[0]
      const flyer = setInterval(() => {
        player.vy = jumpParabole[counter]
        counter++
      }, 100)
      setTimeout(function() {
        player.animationSpeed = 0.2
        player.vy = 0
        player.y = app.screen.height - ground.height - player.height
        player.jumping = false
        clearInterval(flyer)
      }, 800)
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

  controlsText = new PIXI.Text('Press space to jump', { fontFamily: 'Arial', fontSize: 16 })
  controlsText.x = 240
  controlsText.y = 10

  app.stage.addChild(scoreText)
  app.stage.addChild(controlsText)

  app.ticker.add(delta => play(delta))
}

function createObstacle() {
  if (score % 200 === 0) {
    blob.x = app.screen.width - blob.width
    blob.y = app.screen.height - ground.height - blob.height
    blob.vx = Math.random() * 4 + 2
  }
}

function start() {
  startButton = new PIXI.Sprite.from('play.png')
  startButton.buttonMode = true
  startButton.interactive = true
  startButton.height = 50
  startButton.width = 100
  startButton.x = app.screen.width / 2 - startButton.width / 2
  startButton.y = app.screen.height / 2 - startButton.height / 2

  startButton.on('click', () => {
    app.loader.add('sprites.json').load(setup)
    app.stage.removeChild(startButton)
  })
  app.stage.addChild(startButton)
}

function finish() {
  let finishText = new PIXI.Text('You lost, restart?', { fontFamily: 'Arial', fontSize: 16 })
  finishText.x = app.screen.width / 2 - finishText.width / 2
  finishText.y = 50

  resetButton = new PIXI.Sprite.from('restart.png')
  resetButton.buttonMode = true
  resetButton.interactive = true
  resetButton.height = 50
  resetButton.width = 100
  resetButton.x = app.screen.width / 2 - resetButton.width / 2
  resetButton.y = app.screen.height / 2 - resetButton.height / 2

  resetButton.on('click', () => {
    init();
  })

  app.stage.addChild(resetButton, finishText)
  app.stop()
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
    finish()
  }
}

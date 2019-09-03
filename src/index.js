import * as PIXI from 'pixi.js'
import { keyboard } from './keyboard'
import { rectangleCollisionCheck } from './collision'

const app = new PIXI.Application({ backgroundColor: 0x1099bb })
document.body.appendChild(app.view)

app.loader
  .add('Player/sprites.json')
  .add('Tileset/sprites.json')
  .load(setup)

let player, tiledGround

function setup() {
  const anim = []

  for (let i = 0; i < 8; i++) {
    anim.push(PIXI.Texture.from(`run-spritesheet_0${i}.png`))
  }
  player = new PIXI.AnimatedSprite(anim)

  player.x = app.screen.width / 2 - 50
  player.y = app.screen.height / 2 - 50
  player.anchor.set(0.5)
  player.animationSpeed = 0.3
  player.play()
  player.vx = 0
  player.vy = 0
  app.stage.addChild(player)

  const ground = PIXI.Texture.from('groundtile.png')
  tiledGround = new PIXI.TilingSprite(ground, app.screen.width, ground.height)
  tiledGround.y = app.screen.height - ground.height

  app.stage.addChild(tiledGround)

  let left = keyboard('ArrowLeft'),
    up = keyboard('ArrowUp'),
    right = keyboard('ArrowRight'),
    down = keyboard('ArrowDown')

  left.press = () => {
    player.vx = -5
  }
  left.release = () => {
    player.vx = 0
  }

  up.press = () => {
    player.vy = -5
  }
  up.release = () => {
    player.vy = 0
  }

  right.press = () => {
    player.vx = 5
  }
  right.release = () => {
    player.vx = 0
  }

  down.press = () => {
    player.vy = 5
  }
  down.release = () => {
    player.vy = 0
  }

  app.ticker.add(delta => play(delta))
}

function play(delta) {
  player.y += delta

  if (rectangleCollisionCheck(player, tiledGround)) {
    player.y = tiledGround.y - player.height / 2
  }

  player.y += player.vy
}

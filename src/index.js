import * as PIXI from 'pixi.js'
import { keyboard } from './keyboard'

const app = new PIXI.Application({ backgroundColor: 0x1099bb })
document.body.appendChild(app.view)

app.loader.add('Player/sprites.json').load(setup)

let player, state

function setup() {
  const anim = []

  for (let i = 0; i < 8; i++) {
    anim.push(PIXI.Texture.from(`run-spritesheet_0${i}.png`))
  }
  player = new PIXI.AnimatedSprite(anim)

  player.x = app.screen.width / 2
  player.y = app.screen.height / 2
  player.anchor.set(0.5)
  player.animationSpeed = 0.2
  player.play()
  player.vx = 0
  player.vy = 0
  app.stage.addChild(player)

  let left = keyboard('ArrowLeft'),
    up = keyboard('ArrowUp'),
    right = keyboard('ArrowRight'),
    down = keyboard('ArrowDown')

  left.press = () => {
    player.vx = -5
    player.vy = 0
  }
  left.release = () => {
    if (!right.isDown && player.vy === 0) {
      player.vx = 0
    }
  }

  up.press = () => {
    player.vy = -5
    player.vx = 0
  }
  up.release = () => {
    if (!down.isDown && player.vx === 0) {
      player.vy = 0
    }
  }

  right.press = () => {
    player.vx = 5
    player.vy = 0
  }
  right.release = () => {
    if (!left.isDown && player.vy === 0) {
      player.vx = 0
    }
  }

  down.press = () => {
    player.vy = 5
    player.vx = 0
  }
  down.release = () => {
    if (!up.isDown && player.vx === 0) {
      player.vy = 0
    }
  }

  state = play

  app.ticker.add(delta => gameLoop(delta))
}

function gameLoop(delta) {
  state(delta)
}

function play() {
  player.x += player.vx
  player.y += player.vy
}

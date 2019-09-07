export class Player {
  constructor(runningSprite, inAirSprite) {
    this.running = runningSprite
    this.inAir = inAirSprite
    this.x = 50
    this.y = 50
    this.anchor.set(0.5)
    this.animationSpeed = 0.3
    this.play()
    this.vx = 0
    this.vy = 0
  }
}

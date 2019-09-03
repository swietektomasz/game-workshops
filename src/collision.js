export function rectangleCollisionCheck(r1, r2) {
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy

  hit = false

  r1.centerX = r1.x + r1.width / 2
  r1.centerY = r1.y + r1.height / 2
  r2.centerX = r2.x + r2.width / 2
  r2.centerY = r2.y + r2.height / 2

  r1.halfWidth = r1.width / 2
  r1.halfHeight = r1.height / 2
  r2.halfWidth = r2.width / 2
  r2.halfHeight = r2.height / 2

  vx = r1.centerX - r2.centerX
  vy = r1.centerY - r2.centerY

  combinedHalfWidths = r1.halfWidth + r2.halfWidth
  combinedHalfHeights = r1.halfHeight + r2.halfHeight

  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true
    } else {
      hit = false
    }
  } else {
    hit = false
  }

  return hit
}

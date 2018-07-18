import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

const redZ = new Mesh(
  new BoxGeometry(1, 1, 256),
  new MeshBasicMaterial({
    color: 0xff0000,
  })
)
redZ.position.x = 256
redZ.position.z = 128

const redY = new Mesh(
  new BoxGeometry(1, 256, 1),
  new MeshBasicMaterial({
    color: 0xff0000,
  })
)
redY.position.x = 256
redY.position.y = 128

const greenX = new Mesh(
  new BoxGeometry(256, 1, 1),
  new MeshBasicMaterial({
    color: 0x00ff00,
  })
)
greenX.position.y = 256
greenX.position.x = 128

const greenZ = new Mesh(
  new BoxGeometry(1, 1, 256),
  new MeshBasicMaterial({
    color: 0x00ff00,
  })
)
greenZ.position.y = 256
greenZ.position.z = 128

const blueX = new Mesh(
  new BoxGeometry(256, 1, 1),
  new MeshBasicMaterial({
    color: 0x0000ff,
  })
)
blueX.position.z = 256
blueX.position.x = 128

const blueY = new Mesh(
  new BoxGeometry(1, 256, 1),
  new MeshBasicMaterial({
    color: 0x0000ff,
  })
)
blueY.position.z = 256
blueY.position.y = 128

export default [redY, redZ, greenX, greenZ, blueX, blueY]

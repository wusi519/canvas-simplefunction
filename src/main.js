let canvas = document.getElementById('canvas')
let content = canvas.getContext('2d')
let using = false
let lastPoint = {x: undefined, y: undefined}
let wipe = false
let eraserEnabled = false

eraser.onclick = function () {
  eraserEnabled = !eraserEnabled
}
window.onresize = function () {
  let pageWidth = document.documentElement.clientWidth
  let pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}
window.onresize(undefined)


function drawLine(x1, y1, x2, y2) {
  content.beginPath()
  content.moveTo(x1, y1)
  content.lineTo(x2, y2)
  content.lineWidth = 5
  content.closePath()
  content.stroke()
}

canvas.onmousedown = function (aaa) {
  let x = aaa.clientX
  let y = aaa.clientY
  if (eraserEnabled) {
    wipe = true
    if (wipe) {
      content.clearRect(x - 5, y - 5, 10, 10)
    }
  } else {
    using = true
    lastPoint = {x: x, y: y}
  }

}
canvas.onmousemove = function (aaa) {
  let x = aaa.clientX
  let y = aaa.clientY
  if (eraserEnabled) {
    if (wipe) {
      content.clearRect(x - 5, y - 5, 10, 10)
    }
  } else {
    if (using) {
      let newPoint = {x: x, y: y}
      drawLine(lastPoint.x, lastPoint.y, x, y)
      lastPoint = newPoint
    }
  }

}
canvas.onmouseup = function (aaa) {
  using = false
  wipe = false
}
let canvas = document.getElementById('canvas')
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
let context = canvas.getContext('2d')
let useBrush = false
let lastPoint = {x: undefined, y: undefined}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  context.lineWidth = 10
}

canvas.onmousedown = function (e) {
  useBrush = true
  let x = e.clientX
  let y = e.clientY
  lastPoint = {x: x, y: y}
}
canvas.onmousemove = function (e) {
  let x = e.clientX
  let y = e.clientY
  let newPoint = {x: x, y: y}
  if (useBrush === true) {
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
  }
  lastPoint = newPoint
}
canvas.onmouseup = function (aaa) {
  useBrush = false
}
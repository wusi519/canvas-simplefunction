let canvas = document.getElementById('canvas')
let eraser = document.getElementById('eraser')
let brush = document.getElementById('brush')

autoSetCanvasSize(canvas)
listenToUser(canvas)


function listenToUser(canvas) {
  let context = canvas.getContext('2d')
  let useBrush = false
  let eraserClicked = false
  let eraserUsing = false
  let lastPoint = {x: undefined, y: undefined}

  brush.onclick = function () {
    eraserClicked = false
    brush.classList.add('active')
    eraser.classList.remove('active')
  }
  eraser.onclick = function () {
    eraserClicked = true
    eraser.classList.add('active')
    brush.classList.remove('active')
  }

  function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.lineWidth = 10
  }

  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function (e) {
      useBrush = true
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if (eraserClicked) {
        eraserUsing = true
        if (eraserUsing) {
          context.clearRect(x - 5, y - 5, 10, 10)
        }
      } else {
        lastPoint = {x: x, y: y}
      }
    }
    canvas.ontouchmove = function (e) {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      let newPoint = {x: x, y: y}
      if (eraserClicked) {
        if (eraserUsing) {
          context.clearRect(x - 5, y - 5, 10, 10)
        }
      } else {
        if (useBrush === true) {
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        }
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      useBrush = false
      eraserUsing = false
    }
  } else {
    canvas.onmousedown = function (e) {
      useBrush = true
      let x = e.clientX
      let y = e.clientY
      if (eraserClicked) {
        eraserUsing = true
        if (eraserUsing) {
          context.clearRect(x - 5, y - 5, 10, 10)
        }
      } else {
        lastPoint = {x: x, y: y}
      }
    }
    canvas.onmousemove = function (e) {
      let x = e.clientX
      let y = e.clientY
      let newPoint = {x: x, y: y}
      if (eraserClicked) {
        if (eraserUsing) {
          context.clearRect(x - 5, y - 5, 10, 10)
        }
      } else {
        if (useBrush === true) {
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        }
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (aaa) {
      useBrush = false
      eraserUsing = false
    }
  }
}

function autoSetCanvasSize() {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    let pageWidth = document.documentElement.clientWidth
    let pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
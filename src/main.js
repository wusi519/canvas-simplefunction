let canvas = document.getElementById('canvas')

let eraser = document.getElementById('eraser')
let brush = document.getElementById('brush')
let clear = document.getElementById('clear')

let black = document.getElementById('black')
let red = document.getElementById('red')
let green = document.getElementById('green')
let blue = document.getElementById('blue')

let thin = document.getElementById('thin')
let thick = document.getElementById('thick')

let download = document.getElementById('download')


autoSetCanvasSize(canvas)
listenToUser(canvas)


function listenToUser(canvas) {
  let context = canvas.getContext('2d')
  let useBrush = false
  let eraserClicked = false
  let eraserUsing = false
  let lastPoint = {x: undefined, y: undefined}
  let lineWidth = 5

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
  clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
  black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
  }
  red.onclick = function () {
    context.fillStyle = '#DC143C'
    context.strokeStyle = '#DC143C'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
  }
  green.onclick = function () {
    context.fillStyle = '#228B22'
    context.strokeStyle = '#228B22'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
  }
  blue.onclick = function () {
    context.fillStyle = '#008080'
    context.strokeStyle = '#008080'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
  }

  thin.onclick = function () {
    lineWidth = 5
  }
  thick.onclick = function () {
    lineWidth = 15
  }

  download.onclick = function () {
    let url = canvas.toDataURL('image/png')
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download='my picture'
    a.target='_blank'
    a.click()
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

  function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.lineWidth = lineWidth
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
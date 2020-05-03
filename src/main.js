let canvas = document.getElementById('canvas')

let content = canvas.getContext('2d')
let painting = false
let lastPoint= {x:undefined,y:undefined}

window.onresize = function () {
  let pageWidth = document.documentElement.clientWidth
  let pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight

}
window.onresize(undefined)


function drawLine(x1,y1,x2,y2) {
  content.beginPath();
  content.moveTo(x1,y1);
  content.lineTo(x2,y2);
  content.lineWidth=5;
 content.closePath();
  content.stroke();
 }

canvas.onmousedown = function (aaa) {
painting=true
  let x = aaa.clientX
  let y = aaa.clientY
  lastPoint={x:x,y:y}
}
canvas.onmousemove = function (aaa) {
  if(painting){
    let x = aaa.clientX
    let y = aaa.clientY
    let newPoint={x:x,y:y}
    drawLine(lastPoint.x,lastPoint.y,x,y)
    lastPoint=newPoint
  }
}
canvas.onmouseup = function (aaa) {
  painting = false
}
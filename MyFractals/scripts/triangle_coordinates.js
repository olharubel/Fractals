import { drawCoordinatesSystem } from "./coordinates_system.js";
import { Matrix } from "./matrix.js";

const buttons = document.querySelectorAll('button');

const canvas = document.querySelector('.canvas-affine');

var koef = 20;
var scale_affine = 100;
let nIntervId;
const ctx = canvas.getContext('2d');
let triangleMatrix;
var count = 0;

//функція для зчитування координат трикутника
function readCoordinates() {
  var ax_str = document.querySelector('#AX').value;
  var ay_str = document.querySelector('#AY').value;

  var bx_str = document.querySelector('#BX').value;
  var by_str = document.querySelector('#BY').value;

  if (ax_str == '' || ay_str == '' || bx_str == '' || by_str == '') {
    var x = document.querySelector("#popup-error-empty").classList.toggle("active");
    return;
  }

  var ax = parseInt(ax_str);
  var ay = parseInt(ay_str);

  var bx = parseInt(bx_str);
  var by = parseInt(by_str);

  var [cx, cy] = calculateThirdCoordinate(ax, ay, bx, by);

  ay = -ay;
  by = -by;
  cy = -cy;

  if ((ax == bx && ay == by) ||
    (ax == cx && ay == cy) ||
    (bx == cx && by == cy)) {
    var x = document.querySelector("#popup-error").classList.toggle("active");
    document.getElementById("AX").value = ''
    document.getElementById("AY").value = ''
    document.getElementById("BX").value = ''
    document.getElementById("BY").value = ''
    return;
  }

  else {
    return [ax, ay, bx, by, cx, cy];
  }
}

//подія для старту руху трикутника
document.getElementById("start").addEventListener("click", function () {
  count = 0;
  if (readCoordinates()) {

    var [ax, ay, bx, by, cx, cy] = readCoordinates();

    writeCoordinateC(cx, cy);
    var [ox, oy] = findTriangleCentre(ax, ay, bx, by, cx, cy)
    triangleMatrix = [
      [ax, ay, 1],
      [bx, by, 1],
      [cx, cy, 1]
    ];

    drawCoordinatesSystem(koef);
    drawTriangle(triangleMatrix);


    if (!nIntervId) {
      nIntervId = setInterval(function () {

        count++;

        if(count > 60){
          clearInterval(nIntervId);
          nIntervId = null;
        }
        triangleMatrix = moveTriangle(triangleMatrix, ox, oy);

        [ox, oy] = findTriangleCentre(triangleMatrix[0][0], triangleMatrix[0][1],
          triangleMatrix[1][0], triangleMatrix[1][1], triangleMatrix[2][0], triangleMatrix[2][1])

        drawCoordinatesSystem(koef);
        drawTriangle(triangleMatrix);

      }, 400);
    }
  }
})

//подія для зупинки руху трикутника
document.getElementById("stop").addEventListener("click", function () {
  clearInterval(nIntervId);
  nIntervId = null;
});

//подія для зменшення масштабу
document.getElementById("minus").addEventListener("click", function () {
  if (koef >= 14) {
    var scale_text = document.getElementById("scale-affine");
    scale_affine -= 10;
    scale_text.innerHTML = "Масштаб: " + (scale_affine) + "%";

    koef = koef - 2;
    drawCoordinatesSystem(koef);
  }
});

//подія для збільшення масштабу
document.getElementById("plus").addEventListener("click", function () {
  if (koef < 30) {
    var scale_text = document.getElementById("scale-affine");
    scale_affine += 10;
    scale_text.innerHTML = "Масштаб: " + (scale_affine) + "%";
    koef += 2;
    drawCoordinatesSystem(koef);
  }
});

//функція для обчислення координат третьої вершини трикутника
function calculateThirdCoordinate(ax, ay, bx, by) {
  var dX = bx - ax;
  var dY = by - ay;
  var cx = (Math.cos(60 * Math.PI / 180.0) * dX - Math.sin(60 * Math.PI / 180.0) * dY) + ax;
  var cy = (Math.sin(60 * Math.PI / 180.0) * dX + Math.cos(60 * Math.PI / 180.0) * dY) + ay;

  return [cx, cy];
}

//функція для відмальовування трикутника
function drawTriangle(triangleMatrix) {
  ctx.beginPath();
  ctx.moveTo(triangleMatrix[0][0] * koef, triangleMatrix[0][1] * koef);
  ctx.lineTo(triangleMatrix[1][0] * koef, triangleMatrix[1][1] * koef);
  ctx.stroke();
  ctx.lineTo(triangleMatrix[2][0] * koef, triangleMatrix[2][1] * koef);
  ctx.stroke();
  ctx.lineTo(triangleMatrix[0][0] * koef, triangleMatrix[0][1] * koef);
  ctx.stroke();
}

//функція для руху трикутника
function moveTriangle(triangleMatrix, ox, oy) {
  const angle = 10 * (Math.PI / 180);

  let toTriangleCentreMatrix = [
    [1, 0, 0],
    [0, 1, 0],
    [-ox, -oy, 1]
  ];

  let backMatrix = [
    [1, 0, 0],
    [0, 1, 0],
    [ox, oy, 1]
  ];

  let rotationMatrix = [
    [Math.cos(angle), Math.sin(angle), 0],
    [-Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1]
  ];

  let translationMatrix = [
    [1, 0, 0],
    [0, 1, 0],
    [1, 0, 1]
  ];

  var res = multiplyMatrices(triangleMatrix, toTriangleCentreMatrix);

  res = multiplyMatrices(res, rotationMatrix);
  res = multiplyMatrices(res, backMatrix);
  res = multiplyMatrices(res, translationMatrix);
  return res;
}

//функція для знаходження центру трикутника
function findTriangleCentre(ax, ay, bx, by, cx, cy) {
  var ox = (ax + bx + cx) / 3;
  var oy = (ay + by + cy) / 3;
  return [ox, oy];
}

//функція для запису координат третьої вершини трикутника
function writeCoordinateC(cx, cy) {
  var cx_text = document.getElementById("CX");
  cx_text.innerHTML = "";
  var num = Number(cx);
  var roundedString = num.toFixed(3);
  var cx_rounded = Number(roundedString);
  cx_text.innerHTML = cx_rounded;

  var cy_text = document.getElementById("CY");
  cy_text.innerHTML = "";
  num = Number(cy);
  roundedString = num.toFixed(3);
  var cy_rounded = Number(roundedString);
  cy_text.innerHTML = cy_rounded;
}

//множення матриць
const multiplyMatrices = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
    throw new Error('arguments should be in 2-dimensional array format');
  }
  let x = a.length,
    z = a[0].length,
    y = b[0].length;
  if (b.length !== z) {

    throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
  }
  let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
  let product = new Array(x);
  for (let p = 0; p < x; p++) {
    product[p] = productRow.slice();
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        product[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return product;
}

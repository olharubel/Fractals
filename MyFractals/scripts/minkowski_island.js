import { drawDashedLine } from './pythagoras_tree.js';

var myCanvas = document.getElementsByClassName("fractal-canvas")[0];
const width = myCanvas.width = 700;
const height = myCanvas.height = 550;
var ctx = myCanvas.getContext("2d");


//функція для відмальовування острову Мінковського
export function drawMinkowskiIsland(a, b, iteration, angle, side) {

  const dropdowns = document.querySelectorAll('.dropdown');
  ctx.strokeStyle = dropdowns[2].innerText;
  if (dropdowns[1].innerText === 'Пунктирна') {
    drawDashedLine([10, 10]);
  }

  ctx.translate(a.x, a.y)
  ctx.rotate(-angle);

  let len = side

  a.x = 0
  a.y = 0
  b.x = a.x + len
  b.y = a.y

  if (iteration == 1) {

    ctx.beginPath()

    ctx.moveTo(a.x, a.y)

    ctx.lineTo(b.x, b.y)
    ctx.stroke()

    ctx.stroke()

    return;

  }

  let p1 = {
    x: a.x + len * 0.4,
    y: a.y + len * (-0.2)
  }

  let [hx, hy] = [p1.x - a.x, p1.y - a.y]
  let hypotenuse = Math.sqrt(hx * hx + hy * hy)

  var katet_a = 0.2 * len
  var katet_b = 0.4 * len

  angle = Math.asin(katet_a / hypotenuse)

  var angle2 = Math.asin(katet_a / hypotenuse) + Math.asin(katet_b / hypotenuse)

  let p = {
    x: hypotenuse,
    y: 0
  }

  let p2 = {
    x: p.x,
    y: p.y + hypotenuse
  }

  side = hypotenuse

  if (iteration > 1) {
    drawMinkowskiIsland(a, p, iteration - 1, angle, side)
    drawMinkowskiIsland(p, p2, iteration - 1, -angle2, side)
    drawMinkowskiIsland(p2, b, iteration - 1, angle2, side)

  }

}



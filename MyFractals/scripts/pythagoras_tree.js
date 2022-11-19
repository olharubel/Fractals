var myCanvas = document.getElementsByClassName("fractal-canvas")[0];
myCanvas.width = 600;
myCanvas.height = 550;
var ctx = myCanvas.getContext("2d");

//функція для встановлення стилю лінії фрактала
export function drawDashedLine(pattern) {
  ctx.beginPath();
  ctx.setLineDash(pattern);

}

//функція для відмальовування дерева Піфагора
export function drawTree(startX, startY, iteration, angle, side) {

  const dropdowns = document.querySelectorAll('.dropdown');
  ctx.strokeStyle = dropdowns[2].innerText;
  if (dropdowns[1].innerText === 'Пунктирна') {
    drawDashedLine([10, 10]);
  }

  ctx.beginPath();
  ctx.save();

  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI / 180);

  ctx.moveTo(0, 0);

  var ax = 0;
  var ay = 0;

  var bx = 0 + side;
  var by = 0;

  var cx = 0 + side;
  var cy = 0 + side;

  var dx = 0;
  var dy = 0 + side;

  ctx.lineTo(bx, by);
  ctx.stroke();
  ctx.lineTo(cx, cy);
  ctx.stroke();
  ctx.lineTo(dx, dy);
  ctx.stroke();
  ctx.lineTo(ax, ay);
  ctx.stroke();

  startX = -side / 2;
  startY = -side / 2;

  var prev_side = side;
  side = side / Math.sqrt(2);


  if (iteration <= 1) {
    ctx.restore();
    return;
  }
  drawTree(startX, startY, iteration - 1, -45, side);

  startX = bx;
  startY = by - prev_side;
  drawTree(startX, startY, iteration - 1, 45, side);

  ctx.restore();
}


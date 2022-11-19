import {drawTree} from './pythagoras_tree.js';
import {drawMinkowskiIsland} from './minkowski_island.js';

export function pressApplyBtn() {
const buttons = document.querySelectorAll('button');

//подія для старту відмальовування фракталу
buttons[0].addEventListener("click", function() {
    var fractal_type = document.querySelector('.selected').innerHTML;

    var side = 100;

    var myCanvas = document.getElementsByClassName("fractal-canvas")[0];
  
     myCanvas.width = 700;
     myCanvas.height = 550;
    

    const x =  document.querySelector('#X').value;;
    const y = document.querySelector('#Y').value;;

    var degree = 0;

    var startingPoints = {
      p1 : {
        x: x,
        y: y
      },
      p2:{
        x : 100,
        y: 0
      },
      p3:{
        x : 100,
        y: 100
      },
      p4:{
        x : 0,
        y: 100
      }
    }
      
     const iteration_amount = document.querySelector('#iteration-amount').value;

      switch (fractal_type) {
        case 'Дерево Піфагора':
            
          drawTree(x, y, iteration_amount, degree, side);
           
          break;
        
        case 'Острів Мінковського':
          side = 200;
          drawMinkowskiIsland(startingPoints.p1, startingPoints.p2, iteration_amount, degree, side)
          drawMinkowskiIsland(startingPoints.p2, startingPoints.p3, iteration_amount, -90*Math.PI/180, side)
          drawMinkowskiIsland(startingPoints.p3, startingPoints.p4, iteration_amount, -90*Math.PI/180, side)
          drawMinkowskiIsland(startingPoints.p4, startingPoints.p1, iteration_amount, -90*Math.PI/180, side)
           
          break;
      }
  });
}

//функція для завантаження зображення фрактала
export function pressDownloadBtn() {
    document.querySelector('#download-button').addEventListener('click', ()=> {
    var canvas = document.querySelector(".fractal-canvas");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    
    var element = document.createElement('a');
    var filename = 'fractal.png';
    element.setAttribute('href', image);
    element.setAttribute('download', filename);
  
    element.click();
  })
}

//функція для скидання введених значень для побудови фракталу
export function pressResetBtn() {
  document.querySelector('#reset-button').addEventListener('click', ()=> {
     document.getElementById("X").value = ''
     document.getElementById("Y").value = ''
     document.getElementById("iteration-amount").value = ''
})
}
     
  
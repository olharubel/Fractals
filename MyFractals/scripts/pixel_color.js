import {rgb_to_hsl, hsl_to_rgb} from './HSL_transform.js';
import {rgb_to_cmyk, cmyk_to_rgb} from './CMYK_transform.js';


var myCanvas = document.getElementsByClassName("canvas-image");
var display =  document.querySelector('#display-color');

var ctx1 = myCanvas[0].getContext("2d",  { willReadFrequently: true });
var ctx2 = myCanvas[1].getContext("2d",  { willReadFrequently: true });

//функція для визначення кольору пікселя
export function getPixelColor(imgSrc) {
    let r,g,b;
    var hsl_text =  document.getElementById("HSL");
    var cmyk_text =  document.getElementById("CMYK");
   myCanvas[0].addEventListener(
    "click",function(event) {
    var canvasGapLeft = myCanvas[0].offsetLeft;
    var canvasGapTop = myCanvas[0].offsetTop;
    var actualX = Math.floor(event.pageX - canvasGapLeft);
    var actualY = Math.floor(event.pageY - canvasGapTop);
    var pixelData = ctx1.getImageData(actualX, actualY, 1, 1);
    var data = pixelData.data;
    
    var pixelColor = "rgba(" + data[0] + ", " + + data[1] + ", "
    + data[2] + ", " + data[3] + ")";
    display.style.backgroundColor = pixelColor;
    r = data[0];
    g = data[1];
    b = data[2];
    var [h,s,l] = rgb_to_hsl(r, g, b);

    writeHSL(h,s,l);
    
    var [c,m,y,k] = rgb_to_cmyk(r, g, b);
    writeCMYK(c,m,y,k);

   })

   myCanvas[1].addEventListener(
    "click",function(event) {
    var canvasGapLeft = myCanvas[1].offsetLeft;
    var canvasGapTop = myCanvas[1].offsetTop;
    var actualX = Math.floor(event.pageX - canvasGapLeft);
    var actualY = Math.floor(event.pageY - canvasGapTop);
    var pixelData = ctx2.getImageData(actualX, actualY, 1, 1);
    var data = pixelData.data;
    var pixelColor = "rgba(" + data[0] + ", " + + data[1] + ", "
    + data[2] + ", " + data[3] + ")";
    display.style.backgroundColor = pixelColor;
    r = data[0];
    g = data[1];
    b = data[2];

    var [h,s,l] = rgb_to_hsl(r, g, b);
    writeHSL(h,s,l);
    var [c,m,y,k] = rgb_to_cmyk(r, g, b);
    writeCMYK(c,m,y,k);

   })

   return [r, g, b];
}

//функція запису значень HSL
function writeHSL(h,s,l){
    var hsl_text =  document.getElementById("HSL");
    hsl_text.innerHTML = "";
    var num = Number(h);
    var roundedString = num.toFixed(1);
    var h_rounded = Number(roundedString); 

    hsl_text.innerHTML += "H: " + h_rounded + " ";
    num = Number(s*100);
    roundedString = num.toFixed(1);
    var s_rounded = Number(roundedString); 

    hsl_text.innerHTML += "S: " + s_rounded + "% ";
    num = Number(l*100);
    var roundedString = num.toFixed(1);
    var l_rounded = Number(roundedString); 
    hsl_text.innerHTML += "L: " + l_rounded + "%";
}

//функція запису значень CMYK
function writeCMYK(c,m,y,k){
    var cmyk_text =  document.getElementById("CMYK");
    cmyk_text.innerHTML = "";

    var num = Number(c*100);
    var roundedString = num.toFixed(1);
    var c_rounded = Number(roundedString); 

    cmyk_text.innerHTML += "C: " + c_rounded + "% ";
    
   
    num = Number(m*100);
    roundedString = num.toFixed(1);
    var m_rounded = Number(roundedString); 

    cmyk_text.innerHTML += "M: " + m_rounded + "% ";

    num = Number(y*100);
    roundedString = num.toFixed(1);
    var y_rounded = Number(roundedString);

    cmyk_text.innerHTML += "Y: " + y_rounded + "% ";

    num = Number(k*100);
    roundedString = num.toFixed(1);
    var k_rounded = Number(roundedString);

    cmyk_text.innerHTML += "K: " + k_rounded + "% ";
 
}
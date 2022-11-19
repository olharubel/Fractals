import { cmyk_to_rgb, rgb_to_cmyk } from './CMYK_transform.js';
import {hsl_to_rgb, rgb_to_hsl} from './HSL_transform.js';
import {uploadImage, drawImages} from './upload_image.js';

var myCanvas = document.getElementsByClassName("canvas-image");
myCanvas[0].width = 400;
myCanvas[0].height = 550;
var ctx2 = myCanvas[1].getContext("2d",  { willReadFrequently: true });
var totalWidth = 400;
var totalHeight = 550;

//функція для визначення коефіцієнту зміни яскравості
function getSliderValue() {
    var slider = document.getElementById("myRange");
    var v = slider.value;
    v = parseInt(v);
    return v;
}

//функція для зміни яскравості
function changeBrightness(value){
 
    var imageData = ctx2.getImageData(0, 0, totalWidth, totalHeight);  
    var r, g, b, a;
    var data = imageData.data;

    for(var i = 0; i+3 < data.length; i+=4) {
    r = imageData.data[i];
    g = imageData.data[i+1];
    b = imageData.data[i+2];
    a = imageData.data[i+3];

    var [h,s,l] = rgb_to_hsl(r,g,b);
    if( h > 210 && h <= 270){
    var l2 = value/100;
    var [r1, g1, b1] = hsl_to_rgb(h,s,l2);
    imageData.data[i] = r1;
    imageData.data[i+1] = g1;
    imageData.data[i+2] = b1;
    }
}

ctx2.putImageData(imageData, 0, 0); 

}
  
//функція для застосування зміни яскравості
export function pressApplyBtn() {
    document.querySelector('#color-button').addEventListener('click', ()=> {
        drawImages();
        var value = getSliderValue();
       changeBrightness(value);
       
  })
}

//функція для завантаження зображення зі зміною яскравості
export function pressDownloadBtn() {
    document.querySelector('#download-button-color').addEventListener('click', ()=> {
    var canvas = myCanvas[1];
    
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    
    var element = document.createElement('a');
    var filename = 'resultImage.png';
    element.setAttribute('href', image);
    element.setAttribute('download', filename);
  
    element.click();
  })
}

import { cmyk_to_rgb, rgb_to_cmyk } from "./CMYK_transform.js";
import { hsl_to_rgb , rgb_to_hsl} from "./HSL_transform.js";

const myCanvas = document.getElementsByClassName('canvas-image')[0];
const myCanvas2 = document.getElementsByClassName('canvas-image')[1];
const width = myCanvas.width = 400;
const height = myCanvas.height = 550;
var totalWidth = 400;
var totalHeight = 550;
myCanvas2.width = 400;
myCanvas2.height = 550;
const ctx = myCanvas.getContext("2d");
const ctx2 = myCanvas2.getContext("2d");
const image = new Image();

//функція для завантаження зображення
export function uploadImage() {
    const uploader = document.querySelector('#uploader');
    uploader.addEventListener('change', (e) => {
        const myFile = uploader.files[0];
        
        image.src = URL.createObjectURL(myFile);
        image.onload = function(){
 
            console.log('image uploaded');
           
            drawImages();
        
        }
    })
}

//функція для відмальовування зображень
export function drawImages(){
    var hRatio = myCanvas.width / image.width ;
    var vRatio = myCanvas.height / image.height;
    var ratio  = Math.min ( hRatio, vRatio );
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx2.clearRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.drawImage(image, 0,0, image.width, 
        image.height, 0,0,image.width*ratio, image.height*ratio);
    drawImageHSL(image, ratio);
   

    ctx2.drawImage(image, 0,0, image.width, 
         image.height, 0,0,image.width*ratio, image.height*ratio);
    drawImageCMYK(image, ratio);
}

//функція для переходу від RGB to HSL і навпаки
function drawImageHSL(ratio){
    var imageData = ctx.getImageData(0, 0, totalWidth, totalHeight);  
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    var r, g, b, a;
    var data = imageData.data;

    for(var i = 0; i+3 < data.length; i+=4) {
    r =  data[i];
    g =  data[i+1];
    b =  data[i+2];
    a =  data[i+3];

    var [h,s,l] = rgb_to_hsl(r,g,b);
    var [r1,g1,b1] = hsl_to_rgb(h,s,l);

    data[i] = r1;
    data[i+1] = g1;
    data[i+2] = b1;
   
}

ctx.putImageData(imageData, 0, 0); 
}

//функція для переходу від RGB to CMYK і навпаки
function drawImageCMYK(ratio){
    var imageData = ctx2.getImageData(0, 0, totalWidth, totalHeight);  
    ctx2.clearRect(0, 0, myCanvas.width, myCanvas.height);
    var r, g, b, a;
    var data = imageData.data;

    for(var i = 0; i+3 < data.length; i+=4) {
    r =  data[i];
    g =  data[i+1];
    b =  data[i+2];
    a =  data[i+3];

    var [c,m,y, k] = rgb_to_cmyk(r,g,b);
    var [r1,g1,b1] = cmyk_to_rgb(c,m,y, k);

    data[i] = r1;
    data[i+1] = g1;
    data[i+2] = b1;
   
}

ctx2.putImageData(imageData, 0, 0); 

}
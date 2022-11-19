//перетворення колірної моделі rgb в колірну модель hsl
export function rgb_to_hsl(r, g, b) {
    r = r/255;
    g = g/255;
    b = b/255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);

    if (r != null && g != null && b != null){
        let h;
        if(max == min){
            h = 0;
        }else if(max == r && g >= b){
         h = 60 * (g - b)/(max - min) + 0;
        }else if(max == r && g < b){
         h = 60 * (g - b)/(max - min) + 360;
        }else if(max == g){
         h = 60 * (b - r)/(max - min) + 120;
        } else if(max == b){
         h = 60 * (r - g)/(max - min) + 240;
        }

        let l = 0.5*(max+min);
     
        let s;
        if(l == 0 || max == min){
         s = 0;
        }else if(l > 0 && l <= 0.5){
         s = (max - min)/(max + min);
        }else if(l > 0.5){
         s = (max - min)/(2 - (max + min));
        }

        return [h, s, l];
    }
    
}
 
//перетворення колірної моделі hsl в колірну модель rgb
export function hsl_to_rgb(h, s, l) {
     
    let c, h_t, x;
    
        c = (1 - Math.abs(2*l - 1))*s;
   
        var temp = h;
       
        x = c*(1- Math.abs((temp/60) % 2 - 1));

        let m = l - c/2;

        let r1, g1, b1;
        if(h == null){
            r1 = 0;
            g1 = 0;
            b1 = 0;
        }else if(h >=0 && h < 60){
            r1 = c;
            g1 = x;
            b1 = 0;
        }else if(h >=60 && h < 120){
            r1 = x;
            g1 = c;
            b1 = 0;
        }else if(h >=120 && h < 180){
            r1 = 0;
            g1 = c;
            b1 = x;
        }else if(h >=180 && h < 240){
            r1 = 0;
            g1 = x;
            b1 = c;
        }else if(h >=240 && h < 300){
            r1 = x;
            g1 = 0;
            b1 = c;
        }else if(h >=300 && h_t < 360){
            r1 = c;
            g1 = 0;
            b1 = x;
        }

        let r, g, b;
        r = (r1 + m)*255;
        g = (g1 + m)*255;
        b = (b1 + m)*255;

        return [r,g,b];
     
}
//перетворення колірної моделі rgb в колірну модель cmyk
export function rgb_to_cmyk(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    let c, m, y, k;

    if (r != null && g != null && b != null) {
        let c_t = 1 - r;
        let m_t = 1 - g;
        let y_t = 1 - b;
        k = Math.min(c_t, m_t, y_t);

        if (k == 1) {
            c = 0;
            m = 0;
            y = 0
        } else {
            c = (c_t - k) / (1 - k);
            m = (m_t - k) / (1 - k);
            y = (y_t - k) / (1 - k);
        }

    }
    return [c, m, y, k];
}

//перетворення колірної моделі cmyk в колірну модель rgb
export function cmyk_to_rgb(c, m, y, k) {

    let r = 255 * (1 - c) * (1 - k);
    let g = 255 * (1 - m) * (1 - k);
    let b = 255 * (1 - y) * (1 - k);

    return [r, g, b];
}


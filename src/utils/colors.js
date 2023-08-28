
const getContrast = (hexA, hexB) => {
    const getRGB = (hex) => {
        return {
            r: parseInt(hex.substring(1, 3), 16),
            g: parseInt(hex.substring(3, 5), 16),
            b: parseInt(hex.substring(5, 7), 16)
        }
    }
    const getRelativeLuminance = (rgb) => {
        const normalize = (color) => {
            color /= 255;
            return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4);
        }
        const normalized = {
            r: normalize(rgb.r),
            g: normalize(rgb.g),
            b: normalize(rgb.b)
        }
        return 0.2126 * normalized.r + 0.7152 * normalized.g + 0.0722 * normalized.b;
    }
    const rgbA = getRGB(hexA);
    const rgbB = getRGB(hexB);
    const luminanceA = getRelativeLuminance(rgbA);
    const luminanceB = getRelativeLuminance(rgbB);

    return (Math.max(luminanceA, luminanceB) + 0.05) / (Math.min(luminanceA, luminanceB) + 0.05);
}

export {
    getContrast
}

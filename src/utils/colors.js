
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

const opacities = [
    "opacity-[.01]",
    "opacity-[.02]",
    "opacity-[.03]",
    "opacity-[.04]",
    "opacity-[.05]",
    "opacity-[.06]",
    "opacity-[.07]",
    "opacity-[.08]",
    "opacity-[.09]",
    "opacity-[.10]",
    "opacity-[.11]",
    "opacity-[.12]",
    "opacity-[.13]",
    "opacity-[.14]",
    "opacity-[.15]",
    "opacity-[.16]",
    "opacity-[.17]",
    "opacity-[.18]",
    "opacity-[.19]",
    "opacity-[.20]",
    "opacity-[.21]",
    "opacity-[.22]",
    "opacity-[.23]",
    "opacity-[.24]",
    "opacity-[.25]",
    "opacity-[.26]",
    "opacity-[.27]",
    "opacity-[.28]",
    "opacity-[.29]",
    "opacity-[.30]",
    "opacity-[.31]",
    "opacity-[.32]",
    "opacity-[.33]",
    "opacity-[.34]",
    "opacity-[.35]",
    "opacity-[.36]",
    "opacity-[.37]",
    "opacity-[.38]",
    "opacity-[.39]",
    "opacity-[.40]",
    "opacity-[.41]",
    "opacity-[.42]",
    "opacity-[.43]",
    "opacity-[.44]",
    "opacity-[.45]",
    "opacity-[.46]",
    "opacity-[.47]",
    "opacity-[.48]",
    "opacity-[.49]",
    "opacity-[.50]",
    "opacity-[.51]",
    "opacity-[.52]",
    "opacity-[.53]",
    "opacity-[.54]",
    "opacity-[.55]",
    "opacity-[.56]",
    "opacity-[.57]",
    "opacity-[.58]",
    "opacity-[.59]",
    "opacity-[.60]",
    "opacity-[.61]",
    "opacity-[.62]",
    "opacity-[.63]",
    "opacity-[.64]",
    "opacity-[.65]",
    "opacity-[.66]",
    "opacity-[.67]",
    "opacity-[.68]",
    "opacity-[.69]",
    "opacity-[.70]",
    "opacity-[.71]",
    "opacity-[.72]",
    "opacity-[.73]",
    "opacity-[.74]",
    "opacity-[.75]",
    "opacity-[.76]",
    "opacity-[.77]",
    "opacity-[.78]",
    "opacity-[.79]",
    "opacity-[.80]",
    "opacity-[.81]",
    "opacity-[.82]",
    "opacity-[.83]",
    "opacity-[.84]",
    "opacity-[.85]",
    "opacity-[.86]",
    "opacity-[.87]",
    "opacity-[.88]",
    "opacity-[.89]",
    "opacity-[.90]",
    "opacity-[.91]",
    "opacity-[.92]",
    "opacity-[.93]",
    "opacity-[.94]",
    "opacity-[.95]",
    "opacity-[.96]",
    "opacity-[.97]",
    "opacity-[.98]",
    "opacity-[.99]",
    "opacity-[1.00]"
]

const getOpacity = (float) => {
    return opacities[Math.round(float * 100) - 1];
}

export {
    getContrast,
    opacities,
    getOpacity
}

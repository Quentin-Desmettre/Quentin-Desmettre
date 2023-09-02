
const downloadTxtFile = (file, fileName) => {
    const element = document.createElement("a");
    element.href = file;
    element.download = fileName;
    element.click();
    element.remove();
};

export {
    downloadTxtFile
}

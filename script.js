let pad = document.querySelector('.pad');
let clear_pad = document.querySelector('.clear-pad');
let pixelCount = 18;
const padObserver = new ResizeObserver(() => {
        resizePad();
        resizePixels();
    });
padObserver.observe(document.body);
clear_pad.addEventListener('click', () => {
    
});
populatePixels();
function resizePad() {
    let clear_pad_measurements = window.getComputedStyle(clear_pad);
    let button_margin_height = parseFloat(clear_pad_measurements.marginTop) +
    parseFloat(clear_pad_measurements.marginBottom);
    let available_height = document.body.clientHeight - 
    (button_margin_height + parseFloat(clear_pad_measurements.height));
    if (available_height > document.body.clientWidth) {
        let measurement = document.body.clientWidth - 1 + 'px';
        pad.style.width = measurement;
        pad.style.height = measurement;
     } else {
        let measurement = available_height + 'px';
        pad.style.height = measurement;
        pad.style.width = measurement;
    }
}
function resizePixels() {
    document.querySelectorAll('.pad-pixel').forEach((element) => {
        let padDimensions = window.getComputedStyle(pad);
        let widthWithoutBorders = parseFloat(padDimensions["width"]) - parseFloat(padDimensions.borderWidth) * 2;
        let desiredWidth = (widthWithoutBorders / pixelCount);
        element.style.width = desiredWidth + 'px';
    });
}
function populatePixels() {
    for (let i = 0; i < pixelCount**2; i++) {
        let padPixel = document.createElement('div');
        padPixel.classList.add('pad-pixel');
        pad.appendChild(padPixel);
    }
    resizePixels();
}
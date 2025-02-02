let pad = document.querySelector('.pad');
let pad_container = document.querySelector('.pad-container');
let clear_pad = document.querySelector('.clear-pad');
let pixelCount = 16;
const padObserver = new ResizeObserver(() => {
    console.log("resized");
    resizePad();
    resizePixels();
});
clear_pad.addEventListener('click',() => {
    let padPixel = document.createElement('div');
    padPixel.classList.add('pad-pixel');
    pad.appendChild(padPixel);
    resizePixels();
});
padObserver.observe(document.body);

function resizePad() {
    let clear_pad_measurements = window.getComputedStyle(clear_pad);
    let button_margin_height = parseFloat(clear_pad_measurements.marginTop) +
    parseFloat(clear_pad_measurements.marginBottom);
    let available_height = document.body.clientHeight - 
    (button_margin_height + parseFloat(clear_pad_measurements.height));
    console.log(available_height + "and width is " + document.body.clientWidth);
    if (available_height > document.body.clientWidth) {
        let measurement = document.body.clientWidth + 'px';
        pad.style.width = measurement;
        pad.style.height = measurement;
        console.log("set pad width to " + document.body.clientWidth);
    } else {
        let measurement = available_height + 'px';
        pad.style.height = measurement;
        pad.style.width = measurement;
        console.log("Set pad height to " + available_height);
    }
}
function resizePixels() {
    document.querySelectorAll('.pad-pixel').forEach((element) => {
        let desiredWidth = (pad.clientWidth / pixelCount) + 'px';
        element.style.minWidth = desiredWidth;
        console.log(element.style.minWidth);
        console.log(desiredWidth);
    });
}
function populatePixels() {
    for (let i = 0; i < 18; i++) {
        let padPixel = document.createElement('div');
        padPixel.classList.add('pad-pixel');
        pad.appendChild(padPixel);
    }
    resizePixels();
}
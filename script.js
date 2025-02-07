let pad = document.querySelector('.pad');
let clear_pad = document.querySelector('.clear-pad');
let pixelCount = 16;
let setResizingFalse;
const padObserver = new ResizeObserver(() => {

        clearTimeout(setResizingFalse);
        setResizingFalse = setTimeout(() => {
            resizePad();
            resizePixels(); 
        },100);

    });
padObserver.observe(document.body);
clear_pad.addEventListener('click', () => {
    let max = 30;
    let desiredSize = Number(prompt(`What is your desired grid size? (max is ${max})`));
    if (!isNaN(desiredSize) && desiredSize <= max) {
        pixelCount = desiredSize
        populatePixels();
    }
});
pad.addEventListener('click', recolorPixel,{capture:true});
populatePixels();
function recolorPixel(event) {
    function getRandomColor(min,max) {
        return Math.random() * (max-min) + min;
    }
    event.stopPropagation();
    let target = event.target;
    if (!(target.classList.contains('pad-pixel'))) return;
    
    let red = getRandomColor(0,255);
    let green = getRandomColor(0,255);
    let blue = getRandomColor(0,255);
    let backGround = target.style.backgroundColor;
    let rgbaRegex = /^rgba\((?<red>[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]), (?<green>[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]), (?<blue>[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]), (?<alpha>0\.[0-9][1-9]?|1)\)$/;
    let match = backGround.match(rgbaRegex);
    let alpha = 0.1;
    if (match!=null) {
        let match = backGround.match(rgbaRegex);
        alpha = Number(match.groups.alpha) + 0.1;
        console.log(alpha);
    }
    target.style.backgroundColor = `rgba(${red} ${green} ${blue} / ${alpha})`;
}
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
    pad.replaceChildren();
    for (let i = 0; i < pixelCount**2; i++) {
        let padPixel = document.createElement('div');
        padPixel.classList.add('pad-pixel');
        pad.appendChild(padPixel);
    }
    resizePixels();
}
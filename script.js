let pad = document.querySelector('.pad');
let pad_container = document.querySelector('.pad-container');
let pixelCount = 16;
const padObserver = new ResizeObserver(() => {
    console.log("resized");
    resizePad();
    resizePixels();
});
document.querySelector('.clear-pad').addEventListener('click',() => {
    let padPixel = document.createElement('div');
    padPixel.classList.add('pad-pixel');
    pad.appendChild(padPixel);
    resizePixels();
});
padObserver.observe(document.body);

function resizePad() {
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
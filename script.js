let pad = document.querySelector('.pad');
for (let i = 0; i < 16; i++) {
    let padPixel = document.createElement('div');
    padPixel.classList.add('pad-pixel');
    pad.appendChild(padPixel);
}
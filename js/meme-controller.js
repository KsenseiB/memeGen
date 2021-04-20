'use strict';


function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    drawImgFromlocal()
    resizeCanvas();
    // renderGallery();
    // renderCanvas();
}

function renderCanvas() {

    gCtx.save()
    gCtx.restore()
}

function renderGallery() {
    let imgs = getImgs();
    let strHTML = imgs.map((img) => {
        return `<img class="gall-img" data-imgId="img-${ img.id }"
		src="${ img.url }" onclick="onDrawImg('${ img.id }')">`
    });
    let elGalleryContainer = document.querySelector('.gallery-container');
    elGalleryContainer.innerHTML = strHTML.join('');
}

function onIncreaseFont() {
    changeFont('increase');
}

function onDecreaseFont() {
    changeFont('decrease');
}

function drawText(input, idx) {
    // var canvasCenterX = gElCanvas.width / 2;
    // var canvasCenterY = gElCanvas.height / 2;
    const lineX = gMeme.lines[idx].posX;
    const lineY = gMeme.lines[idx].posY;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = `${gMeme.lines[idx].size}px ${gMeme.lines[idx].family}`;
    gCtx.textAlign = gMeme.lines[idx].align;
    gCtx.fillText('', lineX, lineY);
    gCtx.fillText(input.value, gMeme.lines[idx].posX, gMeme.lines[idx].posY);
    gCtx.strokeText('', lineX, lineY);
    gCtx.strokeText(input.value, gMeme.lines[idx].posX, gMeme.lines[idx].posY);
    // gMeme.lines.forEach(line => {
    //     gCtx.lineWidth = 2;
    //     gCtx.strokeStyle = 'black';
    //     gCtx.fillStyle = 'white';
    //     gCtx.font = `${line.size}px ${line.family}`;
    //     gCtx.textAlign = line.align;
    //     gCtx.fillText('', line.posX, line.posY);
    //     gCtx.fillText(input.value, line.posX, line.posY);
    //     gCtx.strokeText('', line.posX, line.posY);
    //     gCtx.strokeText(input.value, line.posX, line.posY);
    // })
    gCtx.save();

}

function onSetColor() {
    var fillColor = document.querySelector('.text-color').value;
    console.log(fillColor)
    var oulineColor = document.querySelector('.ouline-color').value;
    gCtx.fillStyle = `${ fillColor }`;
    gCtx.strokeStyle = `${ oulineColor }`;
}

function drawImgFromlocal() {
    var img = new Image()
    img.src = './css/imgs/15.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,x end,y end
    }
}

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

// TODO change the canvas to img size, not opposite
function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

// TODOS
function onRowUp() {}

function onRowDown() {}

function onDrawImg(imgId) {
    drawImg();
}

function onSetFont(selectedFont) {

}

// function resizeCanvas() {

//     var canvas = document.getElementById('my-canvas');
//     ctx = canvas.getContext('2d');

//     var deviceWidth = window.innerWidth;;
//     canvasWidth = Math.min(600, deviceWidth - 20);
//     canvasHeight = Math.min(480, deviceWidth - 20);

//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;
// }


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    reader.readAsDataURL(ev.target.files[0])
}
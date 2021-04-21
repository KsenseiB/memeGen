'use strict';


function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gElTextCanvas = document.getElementById('text-canvas');
    gCtx = gElCanvas.getContext('2d');
    gTextCtx = gElTextCanvas.getContext('2d');
    drawImgFromlocal()
    resizeCanvas();
    renderGallery();
}



function renderGallery() {
    let imgs = getImgs();
    let strHTML = imgs.map((img) => {
        return `<img class="gall-img" src="${ img.url }" onclick="onDrawImg('${ img.id }')">`
    });
    let elGalleryContainer = document.querySelector('.gallery-container');
    elGalleryContainer.innerHTML = strHTML.join('');
}

function onIncreaseFont() {
    onChangesize('increase');
}

function onDecreaseFont() {
    onChangesize('decrease');
}

function onDrawText(input, idx) {
    // var canvasCenterX = gElCanvas.width / 2;
    // var canvasCenterY = gElCanvas.height / 2;
    gTextCtx.clearRect(0, 0, gElTextCanvas.width, gElTextCanvas.height)

    gMeme.lines.forEach((line, index) => {
        const text = index === idx ? input.value : null
        gTextCtx.lineWidth = 2;
        gTextCtx.strokeStyle = 'black';
        gTextCtx.fillStyle = 'white';
        gTextCtx.font = `${line.size}px ${line.family}`;
        gTextCtx.textAlign = line.align;
        if (text) {
            gTextCtx.fillText(text, line.posX, line.posY);
            gTextCtx.strokeText(text, line.posX, line.posY);
            line.txt = text
        } else {
            gTextCtx.fillText(line.txt, line.posX, line.posY);
            gTextCtx.strokeText(line.txt, line.posX, line.posY);
        }
    })
}

function onSetColor() {
    var fillColor = document.querySelector('.text-color').value;
    console.log(fillColor)
    var oulineColor = document.querySelector('.ouline-color').value;
    gCtx.fillStyle = `${ fillColor }`;
    gCtx.strokeStyle = `${ oulineColor }`;
}

function drawImgFromlocal() {
    var img = new Image();
    img.src = './css/imgs/15.jpg';
    img.onload = () => {
        img.onload = () => {
            gElCanvas.height = img.height;
            gElTextCanvas.height = img.height;
            gCtx.drawImage(img, 0, 0, gElCanvas.width, img.height);
        }
    }
}

function downloadImg(elLink) {
    let imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

// TODO change the canvas to img size, not opposite
function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function resizeCanvas() {
    let elContainer = document.querySelector('.canvas-container')
    gElTextCanvas.top = elContainer.offsetTop
    gElTextCanvas.left = elContainer.offsetLeft + 50

    gElCanvas.width = elContainer.offsetWidth
    gElTextCanvas.width = gElCanvas.width
    gElCanvas.height = elContainer.offsetHeight
    gElTextCanvas.height = gElCanvas.height
}


function onToggleGallery(action) {
    if (action === 'hide') hideGallery();
    if (action === 'show') showGallery();
}

// TODOS
function onRowUp() {}

function onRowDown() {}

function onDrawImg(imgId) {
    console.log('onDrawImg, imgId:', imgId);
    drawImg(imgId);
}



function onSetFont(selectedFont) {
    console.log(selectedFont)
    gMeme.lines[0].family = selectedFont;
    gMeme.lines[1].family = selectedFont;
}

function renderCanvas() {
    gCtx.save()
    gCtx.restore()
}

// function resizeCanvas() {

//     var canvas = document.getElementById('my-canvas');
//     ctx = canvas.getContext('2d');

//     var deviceWidth = window.innerWidth;;
//     canvasWidth = Math.min(250, deviceWidth - 20);
//     canvasHeight = Math.min(250, deviceWidth - 20);
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
'use strict';

function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gElTextCanvas = document.getElementById('text-canvas');
    gCtx = gElCanvas.getContext('2d');
    gTextCtx = gElTextCanvas.getContext('2d');
    // resizeCanvas();
    // renderCanvas();
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
    onChangeSize('increase');
}

function onDecreaseFont() {
    onChangeSize('decrease');
}

function onRemoveLine(line) {
    let textBox = document.querySelectorAll('input[type=text]');
    if (line === 0) {
        textBox[0].value = '';
        gMeme.lines[0].txt = '';
    }
    if (line === 1) {
        textBox[1].value = '';
        gMeme.lines[1].txt = '';
    }
}

function onDrawText(input, idx) {
    gTextCtx.clearRect(0, 0, gElTextCanvas.width, gElTextCanvas.height)

    gMeme.lines.forEach((line, index) => {
        const text = (index === idx ? input.value : null);
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

function onSetFont(selectedFont) {
    let textBox = document.querySelectorAll('input[type=text]');
    textBox.value = '';
    gMeme.lines[0].family = selectedFont;
    gMeme.lines[1].family = selectedFont;
}

function onSetColor(color) {
    var fillColor = document.querySelector('.text-color').value;
    console.log(fillColor)
    var oulineColor = document.querySelector('.ouline-color').value;
    gTextCtx.fillStyle = `${ fillColor }`;
    gTextCtx.strokeStyle = `${ oulineColor }`;
}

function onAlign(alignVal) {
    if (alignVal === 'R') align('right');
    if (alignVal === 'C') align('center');
    if (alignVal === 'L') align('left');
}

function onChangeSize(action) {
    // yes this is very טרחני and the best I could figure out for now without going lost in my code and it doesnt work❤️
    let fontSizeTop = gMeme.lines[0].size;
    console.log(fontSizeTop)
    let fontSizeZero = gMeme.lines[1].size;
    if (action === 'increase') {
        fontSizeTop += 10;
        fontSizeZero += 10;
    }
    if (action === 'decrease') {
        if (fontSize <= 4) return;
        else {
            fontSizeTop -= 10;
            fontSizeZero -= 10;
        };
    }
    onDrawText(); //need rerendeing function for canvas+txt
}


function downloadImg(elLink) {
    let imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

// TODO change the canvas to img size, not opposite
function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onToggleGallery(action) {
    if (action === 'hide') hideGallery();
    if (action === 'show') showGallery();
}

function onDrawImg(imgId) {
    console.log('onDrawImg function - imgId:', imgId);
    onToggleGallery('hide');
    drawImg(imgId);
}

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

// TODOS
function onRowUp() {}

function onRowDown() {}

function renderCanvas() {
    // gCtx.save()
    // gCtx.restore()
}


//not used, canvas is hidden in the begginning anyway

// function drawImgFromlocal() {
//     var img = new Image();
//     img.src = './css/imgs/15.jpg';
//     img.onload = () => {
//         img.onload = () => {
//             gElCanvas.height = img.height;
//             gElTextCanvas.height = img.height;
//             gCtx.drawImage(img, 0, 0, gElCanvas.width, img.height);
//         }
//     }
// }

// function resizeCanvas() {
//     var deviceWidth = window.innerWidth;;
//     canvasWidth = Math.min(250, deviceWidth - 20);
//     canvasHeight = Math.min(250, deviceWidth - 20);
//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;
// }
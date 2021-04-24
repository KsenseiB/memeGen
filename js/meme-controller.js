'use strict';
var gElCanvas;

function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
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
    removeLine(line);
}

function onDrawText(input, idx) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    drawImg(gImgId);
    setTimeout(() => {
        gMeme.lines.forEach((line, index) => {
            const text = (index === idx ? input.value : null);
            gCtx.lineWidth = 2;
            gCtx.strokeStyle = line.outlineColor;
            gCtx.fillStyle = line.color;
            gCtx.font = `${line.size}px ${line.family}`;
            gCtx.textAlign = line.align;
            if (text) {
                gCtx.fillText(text, line.posX, line.posY);
                gCtx.strokeText(text, line.posX, line.posY);
                line.txt = text
            } else {
                gCtx.fillText(line.txt, line.posX, line.posY);
                gCtx.strokeText(line.txt, line.posX, line.posY);
            }
        })
    }, 1);
}

function onSetFont(selectedFont) {
    let textBox = document.querySelectorAll('input[type=text]');
    textBox.value = '';
    gMeme.lines[0].family = selectedFont;
    gMeme.lines[1].family = selectedFont;
    onDrawText()
}

function onSetColor(type) {
    var fillColor = document.querySelector('.text-color').value;
    console.log(fillColor)
    var lineColor = document.querySelector('.ouline-color').value;

    gMeme.lines.forEach((line) => {
        if (type === 'fill') {
            line.color = fillColor
        } else {
            line.outlineColor = lineColor;
        }
    })

    onDrawText()
}

function onAlign(alignVal) {
    if (alignVal === 'R') align('end');
    if (alignVal === 'C') align('center');
    if (alignVal === 'L') align('start');
}

function onChangeSize(action) {
    let fontSizeTop = gMeme.lines[0].size;
    let fontSizeBottom = gMeme.lines[1].size;
    if (action === 'increase') {
        fontSizeTop += 4;
        fontSizeBottom += 4;
    }
    if (action === 'decrease') {
        if (fontSizeTop <= 16) {
            return;
        } else {
            fontSizeTop -= 4;
            fontSizeBottom -= 4;
        };
    }

    gMeme.lines[0].size = fontSizeTop;
    gMeme.lines[1].size = fontSizeBottom;

    onDrawText();
}

function onToggleGallery(action) {
    if (action === 'hide') hideGallery();
    if (action === 'show') showGallery();
}

function onDrawImg(imgId) {
    gImgId = imgId;
    onToggleGallery('hide');
    drawImg(imgId);
}


function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
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
        const lastId = gImgs.length
        gImgs.push({
            id: lastId
        })
        gImgId = lastId;
    }
    reader.readAsDataURL(ev.target.files[0])
}


// TODOS
function onRowUp() {

}

function onRowDown() {}

// function renderCanvas() {
//     // gCtx.save()
//     // gCtx.restore()
// }

// function resizeCanvas() {
//     var deviceWidth = window.innerWidth;;
//     canvasWidth = Math.min(250, deviceWidth - 20);
//     canvasHeight = Math.min(250, deviceWidth - 20);
//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;
// }
// 
// TODO change the canvas to img size, not opposite
// function renderImg(img) {
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }
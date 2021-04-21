'use strict';
var gElCanvas;
var gElTextCanvas;
var gCtx;
var gTextCtx;
var gText;
var gCurrLine;

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [{
    id: 1,
    url: 'css/imgs/1.jpg',
    keywords: ['monkey']
}, {
    id: 2,
    url: 'css/imgs/2.jpg',
    keywords: ['puppies']
}, {
    id: 3,
    url: 'css/imgs/3.jpg',
    keywords: ['baby', 'puppy']
}, {
    id: 4,
    url: 'css/imgs/4.jpg',
    keywords: ['cat', 'computer']
}, {
    id: 5,
    url: 'css/imgs/5.jpg',
    keywords: ['success', 'child']
}, {
    id: 6,
    url: 'css/imgs/6.jpg',
    keywords: ['dude']
}, {
    id: 7,
    url: 'css/imgs/7.jpg',
    keywords: ['surprise mf']
}, {
    id: 8,
    url: 'css/imgs/8.jpg',
    keywords: ['charlie', 'creep']
}, ];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
            txt: '',
            size: 30,
            family: 'Impact',
            align: 'center',
            color: 'red',
            posX: 50,
            posY: 50
        },
        {
            txt: '',
            size: 30,
            family: 'Impact',
            align: 'center',
            color: 'red',
            posX: 50,
            posY: 150
        }
    ]
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs
}

function drawImg(idx) {
    let img = new Image();
    img.src = gImgs[idx].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onChangesize(action) {
    let fontSize = gMeme.lines[gMeme.selectedLineIdx].size;
    if (action === 'increase') {
        fontSize += 3;
    }
    if (action === 'decrease') {
        if (fontSize <= 4) return;
        else fontSize -= 3;
    }
    onDrawText();
}

function hideGallery() {
    var elGallery = document.querySelector('.gallery-container');
    var elMain = document.querySelector('.main');
    elGallery.style.display = ("none");
    elMain.style.display = ("flex");
}

function showGallery() {
    var elGallery = document.querySelector('.gallery-container');
    var elMain = document.querySelector('.main');
    elGallery.style.display = ("flex");
    elMain.style.display = ("none");
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}
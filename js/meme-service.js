'use strict';
var gCtx;
var gImgId;

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
    }, {
        id: 9,
        url: 'css/imgs/9.jpg',
        keywords: ['charlie', 'creep']
    }, {
        id: 10,
        url: 'css/imgs/10.jpg',
        keywords: ['charlie', 'creep']
    }, {
        id: 11,
        url: 'css/imgs/11.jpg',
        keywords: ['charlie', 'creep']
    }, {
        id: 12,
        url: 'css/imgs/12.jpg',
        keywords: ['charlie', 'creep']
    }, {
        id: 13,
        url: 'css/imgs/13.jpg',
        keywords: ['charlie', 'creep']
    }, {
        id: 14,
        url: 'css/imgs/14.jpg',
        keywords: ['charlie', 'creep']
    }, {
        id: 15,
        url: 'css/imgs/15.jpg',
        keywords: ['charlie', 'creep']
    }, {
        id: 16,
        url: 'css/imgs/16.jpg',
        keywords: ['charlie', 'creep']
    }, {
        id: 17,
        url: 'css/imgs/17.jpg',
        keywords: ['charlie', 'creep']
    }, {
        id: 18,
        url: 'css/imgs/18.jpg',
        keywords: ['charlie', 'creep']
    },

];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
            txt: '',
            size: 30,
            family: 'Impact',
            align: 'center',
            color: 'white',
            outlineColor: 'black',
            posX: 125,
            posY: 50
        },
        {
            txt: '',
            size: 30,
            family: 'Impact',
            align: 'center',
            color: 'white',
            outlineColor: 'black',
            posX: 125,
            posY: 230
        }
    ]
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs
}

function removeLine(line) {
    let textBox = document.querySelectorAll('input[type=text]');
    if (line === 0) {
        textBox[0].value = '';
        gMeme.lines[0].txt = '';
    }
    if (line === 1) {
        textBox[1].value = '';
        gMeme.lines[1].txt = '';
    }
    onDrawText();
}

function drawImg(idx) {
    let img = new Image();
    // Need to select the actual index which is -1 the data we got
    const imgIndex = parseInt(idx) - 1
    img.src = gImgs[imgIndex].url;
    console.log(img.src)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function align(alignVal) {
    gMeme.lines[0].align = alignVal;
    gMeme.lines[1].align = alignVal;
    onDrawText();
}

function hideGallery() {
    var elGallery = document.querySelector('.gallery-container');
    var elMain = document.querySelector('.main');
    elGallery.style.display = 'none';
    elMain.style.display = 'flex';
    document.querySelector('.gallery-headline').style.display = 'none';
}

function showGallery() {
    var elGallery = document.querySelector('.gallery-container');
    var elMain = document.querySelector('.main');
    elGallery.style.display = ('flex');
    elMain.style.display = 'none';
    document.querySelector('.gallery-headline').style.display = 'block';
    clearCanvas();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    clearTxtBox();
    setTimeout(() => { drawImg(gImgId) }, 1);
}

function clearTxtBox() {
    let textBox = document.querySelectorAll('input[type=text]');
    textBox[0].value = '';
    textBox[1].value = '';
}
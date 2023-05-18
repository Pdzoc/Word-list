let size = 20;
let p = document.querySelector('#area');
let div = document.querySelector('div');
let span = document.querySelector('span');
let clearBtn = document.querySelector('#clear');
let genBtn = document.querySelector('#generate');
let saveBtn = document.querySelector('#save');
let sortBtn = document.querySelector('#sort');
let select = document.querySelector('select');
let monoBtn = document.querySelector('#mono');
let aside = document.querySelector('aside');
let monospaceMode = false;
span.innerText = size;
p.style.fontSize = size + 'px';
div.style.fontSize = size + 'px';

let wordsSet = [];

function clear() {
    div.innerText = ""
}

clearBtn.addEventListener('click', clear);

function resizeText(flag) {
    if (flag) {
        ++size;
    }
    else {
        --size;
    }
    span.innerText = size;
    p.style.fontSize = size + 'px';
    div.style.fontSize = size + 'px';
}

function generate() {
    div.innerText = "";
    let res = p.innerText.toLowerCase().match(/[a-z]+-?[a-z]+/gi);
    wordsSet = [...new Set(res)]
    printList();
}

genBtn.addEventListener('click', generate)

document.getElementById('inputfile').addEventListener('change', function () {
    div.innerText = "";
    p.innerText = "";
    
    let reader = new FileReader();
    reader.onload = () => {
        let data = reader.result;
        wordsSet = [...new Set(data.toLowerCase().match(/[a-z]+-?[a-z]+/gi))]
        printList();

    }
    reader.readAsText(this.files[0]);
})

function printList() {
    if(wordsSet.length<1) return;
    wordsSet.forEach(el => {
        let w = document.createElement('span');
        w.innerText = el;
        div.appendChild(w);
        div.appendChild(document.createElement('br'))
    })
    aside.innerText = wordsSet.length + ' words';
}

function save() {
    if (div.innerHTML.includes('span')) {
        var blob = new Blob([div.innerText], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "list.txt");
    }
    else {
        div.innerText = 'First create a list';
    }
}

saveBtn.addEventListener('click', save);

function sort() {
    div.innerHTML = "";
    if(select.value==1) {
        wordsSet.sort();
    }
    else if(select.value==2) {
        wordsSet.sort().reverse();
    }
    else if(select.value==3) {
        wordsSet.sort();
        wordsSet.sort((a,b) => {
            if(a.charAt(0) == b.charAt(0) && a.length < b.length) {return -1}
            else if(a.charAt(0) == b.charAt(0) && a.length > b.length) {return 1}
            else return 0
        })
    }
    else if(select.value==4) {
        wordsSet.sort();
        wordsSet.sort((a,b) => {
            if(a.charAt(0) == b.charAt(0) && a.length < b.length) {return 1}
            else if(a.charAt(0) == b.charAt(0) && a.length > b.length) {return -1}
            else return 0
        })
    }
    else if(select.value==5) {
        wordsSet.sort().reverse();
        wordsSet.sort((a,b) => {
            if(a.charAt(0) == b.charAt(0) && a.length < b.length) {return -1}
            else if(a.charAt(0) == b.charAt(0) && a.length > b.length) {return 1}
            else return 0
        })
    }
    else if(select.value==6) {
        wordsSet.sort().reverse();
        wordsSet.sort((a,b) => {
            if(a.charAt(0) == b.charAt(0) && a.length < b.length) {return 1}
            else if(a.charAt(0) == b.charAt(0) && a.length > b.length) {return -1}
            else return 0
        })
    }
    else if(select.value==7) {
        wordsSet.sort((a,b) => a.length - b.length);
    }
    else if(select.value==8) {
        wordsSet.sort((a,b) => a.length - b.length).reverse();
    }
    else if(select.value==9) {
        wordsSet.sort((a,b) => Math.random() > .5)
    }

    printList();
}

sortBtn.addEventListener('click', sort);

function handleMonospace() {
    monospaceMode = !monospaceMode;

    if(monospaceMode) {
        monoBtn.style.background = 'darkgreen';
        div.style.fontFamily = 'monospace';
    }
    else {
        monoBtn.style.background = '';
        div.style.fontFamily = '';
    }
}

monoBtn.addEventListener('click', handleMonospace)

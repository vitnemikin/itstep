// Цвет страницы...
let btnColorPage = document.getElementById('btnColorPage');  

btnColorPage.addEventListener('click', (ev) => {
    let promp = prompt('Введите цвет:');
    document.body.style.backgroundColor = `${promp}`;
});

// Цвет заголовка...
let btnColorH1 = document.getElementById('btnColorH1');

btnColorH1.addEventListener('click', (ev) => {
    let promp = prompt('Введите цвет:');
    let h1 = document.querySelector('h1');
    h1.style.color = `${promp}`;
});

// Шрифт...
let btnFontFamily = document.getElementById('btnFontFamily');

btnFontFamily.addEventListener('click', (ev) => {
    let promp = prompt('Введите текст:');
    let p = document.querySelector('p');
    p.style.fontFamily = `${promp}`;
});

// Добавить список...
let btnAddUl = document.getElementById('btnAddUl');

btnAddUl.addEventListener('click', (ev) => {
    let promp = prompt('Введите текст:');
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.textContent = promp;
    ul.append(li);
});



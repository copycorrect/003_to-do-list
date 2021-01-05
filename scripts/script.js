let d = document;
let addButton = d.querySelector('.button__add');
let noteList = d.querySelector('.note__list');

let base = [
    {
        key: 0,
        text: 'hello',
        checked: true
    },
    {
        key: 1,
        text: 'kitty',
        checked: true
    },
    {
        key: 2,
        text: 'hi',
        checked: false
    }
]

let deleteItem = () => {
    noteList.querySelectorAll('li').forEach(item => {
        item.querySelector('.delete').onclick = () => {
            noteList.removeChild(item);
        }
    })
}

let addListItem = (id, text = '', check) => {
    let li = d.createElement("li");
    let noteLabelCheckbox = `<div><input type="checkbox" ${check} id="${id}"><label for="${id}"></label></div>`;
    let noteTextContent = `<div class="content"><span contenteditable="true">${text}</span></div>`;
    let noteButtonDelete = `<div class="delete">&#10006;</div>`;
    li.innerHTML = noteLabelCheckbox + noteTextContent + noteButtonDelete;
    noteList.appendChild(li);
}

let createList = () => {
    if (!base.length) {
        addListItem(0);
    }
    for (let i = 0; i < base.length; i++) {
        let check = base[i].checked ? 'checked' : '';
        addListItem(base[i].key, base[i].text, check);
    }
}

let addItem = () => {
    let i = 0;
    addButton.onclick = () => {
        i++;
        addListItem(i);
        deleteItem();
    }
/*
    d.querySelectorAll('.button__add').forEach(item => {
        let i = 0;
        item.onclick = () => {
            i++;
            addListItem(i);
            deleteItem();
        }
    })
*/
}

deleteItem();
createList();
addItem();

// проверяем базу,
// если она пуста рисуем пустой ли с айди 0,
// если что-то есть рисуем ли из базы



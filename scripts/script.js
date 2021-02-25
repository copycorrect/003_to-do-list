let d = document;
let addButtonNote = d.querySelector('.button__note');

let base = [
    {
        id: 0,
        title: 'Title All Me',
        notes: [
            {
                key: 0,
                text: 'hello',
                checked: false
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
            },
            {
                key: 3,
                text: 'ddddd',
                checked: false
            }

        ]
    },
    {
        id: 1,
        title: 'All Me',
        notes: [
            {
                key: 0,
                text: 'joi',
                checked: true
            },
            {
                key: 1,
                text: 'me',
                checked: true
            },
            {
                key: 2,
                text: 'lona',
                checked: false
            }

        ]
    },
    {
        id: 2,
        title: 'Me',
        notes: [
            {
                key: 0,
                text: 'fl;',
                checked: true
            },
            {
                key: 1,
                text: 'mffe',
                checked: true
            },
            {
                key: 2,
                text: 'dddddddd',
                checked: true
            }

        ]
    }
];

let notesContainer = d.querySelector('.notes__container');

let addListNote = (id, title) => {

    let noteTitle = `<div class="note__title" contenteditable="true">${title}</div>`;

    let list = `<ul class="note__list"></ul>`;

    let buttons = `<div class="buttons">
         <button class="button button__add">Add Item</button>
         <button class="button">???????</button>
     </div>`;

    let section = d.createElement("section");
    section.classList.add('note', `id-${id}`);
    section.innerHTML = noteTitle + list + buttons;

    notesContainer.append(section);


}

let addListItem = (idNote, id, text = '', check = '') => {
    let noteSection = d.querySelector(`.id-${idNote}`);
    let noteList = noteSection.querySelector('.note__list');
    let li = d.createElement("li");
    let noteLabelCheckbox = `<div><input type="checkbox" ${check} id="list-${idNote}-${id}"><label for="list-${idNote}-${id}"></label></div>`;
    let noteTextContent = `<div class="content"><span contenteditable="true">${text}</span></div>`;
    let noteButtonDelete = `<div class="delete">&#10006;</div>`;
    li.innerHTML = noteLabelCheckbox + noteTextContent + noteButtonDelete;
    noteList.appendChild(li);
    addItem(idNote);
    deleteItem();
}

let deleteItem = () => {
    let notes = d.querySelectorAll('.note');
    notes.forEach(note => {
        let noteList = note.querySelector('.note__list');
        noteList.querySelectorAll('li').forEach(item => {
            item.querySelector('.delete').onclick = () => {
                noteList.removeChild(item);
                if (noteList.querySelectorAll('li').length === 0) {
                    let id = note.className.slice(-1);
                    addListItem(id, 0)
                }
            }
        })
    })

}

let addItem = (id) => {
    let note = d.querySelector(`.id-${id}`);
    let noteList = note.querySelectorAll('.note__list li');
    let i = noteList.length;
    note.querySelector('.button__add').onclick = () => {
        addListItem(id, i);
        i++;
        checked();
    }
}

let createList = (idNote) => {
    let noteList = base[idNote].notes;

    if (!noteList.length) {
        addListItem(idNote, 0);
    }
    for (let i = 0; i < noteList.length; i++) {
        let check = noteList[i].checked ? 'checked' : '';
        addListItem(idNote, noteList[i].key, noteList[i].text, check);
    }
}

let addNote = () => {
    let i = base.length ? base.length : 1;

    addButtonNote.onclick = () => {

        addListNote(`${i}`, 'New');
        addListItem(`${i}`, 0);
        i++;

    }
}
addNote();

let createNote = () => {
    if (!base.length) {
        addListNote('0', 'No all');
        addListItem('0', 0);
    }
    for (let i = 0; i < base.length; i++) {
        addListNote(base[i].id, base[i].title);
        createList(i);
    }
}
createNote();

let checked = () => {
    let notes = d.querySelectorAll('.note__list');

    notes.forEach(note => {

        let list = note.querySelectorAll('li');

        let muchChecked = 0;
        //создаем переменую которая будет отвечать за кол-во чекнутых ли

        list.forEach(li => {

            let input = li.querySelector('input[type=checkbox]');


            if (input.checked) {

                // muchChecked--;
                note.appendChild(li);

            }
            if (!input.checked) {
                muchChecked++;
            }

            input.addEventListener('change', function () {


                if (!input.checked) {

                    if (muchChecked === 0){
                        note.prepend(li);
                    } else{
                        note.querySelectorAll('li')[muchChecked - 1].after(li);
                    }
                    muchChecked++;

                }
                if (input.checked) {

                    note.appendChild(li);
                    muchChecked--;

                }
            });
        });

    });
};
checked();



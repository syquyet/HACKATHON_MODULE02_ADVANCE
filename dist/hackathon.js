"use strict";
const note = [];
renderNotes();
function hadleAddNote() {
    const getData = localStorage.getItem("notes");
    const notesDB = getData ? JSON.parse(getData) : [];
    const titleElement = document.querySelector("#titel-input");
    const inputContent = document.querySelector("#input-content");
    const erorrTitle = document.querySelector("#erorr-title");
    const erorrContent = document.querySelector("#erorr-content");
    if (titleElement.value === "") {
        erorrTitle.textContent = "*nhập tiêu đề cho ghi chú";
        return;
    }
    if (inputContent.value === "") {
        erorrContent.textContent = "*nhập nội dumh ghi chú";
        return;
    }
    else {
        erorrTitle.textContent = "";
        erorrContent.textContent = "";
        const note = {
            title: titleElement.value,
            content: inputContent.value,
        };
        notesDB.push(note);
        localStorage.setItem("notes", JSON.stringify(notesDB));
        renderNotes();
    }
    titleElement.value = "";
    inputContent.value = "";
}
function renderNotes() {
    const getData = localStorage.getItem("notes");
    const notesDB = getData ? JSON.parse(getData) : [];
    const listNotes = document.querySelector(".list-note");
    let result = "";
    notesDB.forEach((note, index) => {
        result += `<div class="note-content">
    <h6>${note.title}</h6>
    <p>${note.content}</p>
    <div id="delete-note">
      <i class="fa-regular fa-trash-can" onclick="handleDelete(${index})"></i>
    </div>
    </div>`;
    });
    listNotes.innerHTML = result;
}
function handleDelete(indexData) {
    const getData = localStorage.getItem("notes");
    const notesDB = getData ? JSON.parse(getData) : [];
    notesDB.forEach((note, index) => {
        if (index === indexData) {
            notesDB.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notesDB));
        }
    });
    renderNotes();
}

type Note = {
  title: string;
  content: string;
};
const note: Note[] = [];
renderNotes();
// thêm ghi chú mới
function hadleAddNote() {
  const getData = localStorage.getItem("notes");
  const notesDB = getData ? JSON.parse(getData) : [];
  const titleElement = document.querySelector(
    "#titel-input"
  ) as HTMLInputElement;
  const inputContent = document.querySelector(
    "#input-content"
  ) as HTMLInputElement;
  //   validate cho ô input
  const erorrTitle = document.querySelector("#erorr-title") as HTMLElement;
  const erorrContent = document.querySelector("#erorr-content") as HTMLElement;
  if (titleElement.value === "") {
    erorrTitle.textContent = "*nhập tiêu đề cho ghi chú";
    return;
  }
  if (inputContent.value === "") {
    erorrContent.textContent = "*nhập nội dumh ghi chú";
    return;
  } else {
    erorrTitle.textContent = "";
    erorrContent.textContent = "";
    const note: Note = {
      title: titleElement.value,
      content: inputContent.value,
    };
    // thêm ghi chú va đẩy lên local store
    notesDB.push(note);
    localStorage.setItem("notes", JSON.stringify(notesDB));
    renderNotes();
  }
  titleElement.value = "";
  inputContent.value = "";
}
// hiển thị ghi chú
function renderNotes() {
  const getData = localStorage.getItem("notes");
  const notesDB = getData ? JSON.parse(getData) : [];
  const listNotes = document.querySelector(".list-note") as HTMLElement;
  let result = "";
  notesDB.forEach((note: Note, index: number) => {
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
// xóa ghi chú
function handleDelete(indexData: number) {
  const getData = localStorage.getItem("notes");
  const notesDB = getData ? JSON.parse(getData) : [];
  notesDB.forEach((note: Note, index: number) => {
    if (index === indexData) {
      notesDB.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesDB));
    }
  });
  renderNotes();
}

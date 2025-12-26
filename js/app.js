import { IndexedDBAdapter } from "./storage/IndexedDBAdapter.js";
import { BoardService } from "./board/boardService.js";
import { renderBoard } from "./board/boardUI.js";
import { pickImage } from "./media/imagePicker.js";
import { recordAudio } from "./media/audioRecorder.js";

const storage = new IndexedDBAdapter();
const service = new BoardService(storage);
const boardEl = document.getElementById("board");

const menuBtn = document.getElementById("menuBtn");
const menuContent = document.getElementById("menuContent");

const board = await service.load();
renderBoard(board, boardEl);
window.recordAudio = recordAudio; // expose for UI

document.getElementById("imageInput").onchange = async e => {
  const file = e.target.files[0];
  await service.addCard({
    id: crypto.randomUUID(),
    image: file
  });
  renderBoard(service.board, boardEl, service);
};

document.getElementById("addTextBtn").onclick = async () => {
  const text = document.getElementById("textInput").value;
  if (!text) return;

  await service.addCard({
    id: crypto.randomUUID(),
    text
  });
  document.getElementById("textInput").value = "";
  renderBoard(service.board, boardEl, service);
};

document.getElementById("recordBtn").onclick = async () => {
  const audio = await recordAudio();
  await service.addCard({
    id: crypto.randomUUID(),
    audio
  });
  renderBoard(service.board, boardEl, service);
};

document.getElementById("addTextBtn").onclick = async () => {
  const text = document.getElementById("textInput").value;
  if (!text) return;
  await service.addCard({ type: "text", text });
  renderBoard(service.board, boardEl);
};


menuBtn.onclick = () => {
  menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
};

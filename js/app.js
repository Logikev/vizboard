import { IndexedDBAdapter } from "./storage/IndexedDBAdapter.js";
import { BoardService } from "./board/boardService.js";
import { renderBoard } from "./board/boardUI.js";
import { pickImage } from "./media/imagePicker.js";
import { recordAudio } from "./media/audioRecorder.js";

const storage = new IndexedDBAdapter();
const service = new BoardService(storage);
const boardEl = document.getElementById("board");

const board = await service.load();
renderBoard(board, boardEl);

document.getElementById("imageInput").onchange = async e => {
  const card = await pickImage(e.target.files[0]);
  await service.addCard(card);
  renderBoard(service.board, boardEl);
};

document.getElementById("recordBtn").onclick = async () => {
  const card = await recordAudio();
  await service.addCard(card);
  renderBoard(service.board, boardEl);
};

document.getElementById("addTextBtn").onclick = async () => {
  const text = document.getElementById("textInput").value;
  if (!text) return;
  await service.addCard({ type: "text", text });
  renderBoard(service.board, boardEl);
};

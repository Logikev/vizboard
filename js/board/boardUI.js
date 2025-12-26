export function renderBoard(board, container) {
  container.innerHTML = "";
  board.cards.forEach(card => {
    const el = document.createElement("div");
    el.className = "card";

    if (card.type === "image") {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(card.blob);
      el.appendChild(img);
    }

    if (card.type === "text") {
      el.textContent = card.text;
    }

    if (card.type === "audio") {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.loop = true;
      audio.src = URL.createObjectURL(card.blob);
      el.appendChild(audio);
    }

    container.appendChild(el);
  });
}
 
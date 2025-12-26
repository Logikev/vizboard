export function renderBoard(board, container, service) {
  container.innerHTML = "";

  board.cards.forEach(card => {
    const el = document.createElement("div");
    el.className = "card";

    // 🎧 AUDIO (TOP)
    if (card.audio) {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.loop = true;
      audio.src = URL.createObjectURL(card.audio);
      el.appendChild(audio);

      const rerecord = document.createElement("button");
      rerecord.textContent = "Re-record";
      rerecord.onclick = async () => {
        const newAudio = await window.recordAudio();
        await service.updateCard(card.id, { audio: newAudio });
        renderBoard(service.board, container, service);
      };
      el.appendChild(rerecord);
    }

    // ✍️ TEXT (MIDDLE)
    if (card.text) {
      const p = document.createElement("p");
      p.textContent = card.text;
      el.appendChild(p);
    }

    // 🖼 IMAGE (BOTTOM)
    if (card.image) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(card.image);
      el.appendChild(img);
    }

    // ❌ DELETE
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = async () => {
      await service.deleteCard(card.id);
      renderBoard(service.board, container, service);
    };
    el.appendChild(del);

    container.appendChild(el);
  });
}

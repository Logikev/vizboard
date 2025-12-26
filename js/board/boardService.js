export class BoardService {
  constructor(storage) {
    this.storage = storage;
    this.board = { cards: [] };
  }

  async load() {
    this.board = await this.storage.load();
    return this.board;
  }

  async addCard(card) {
    this.board.cards.push(card);
    await this.storage.save(this.board);
  }
}

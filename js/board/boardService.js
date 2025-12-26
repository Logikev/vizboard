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

  async updateCard(cardId, updates) {
    const card = this.board.cards.find(c => c.id === cardId);
    Object.assign(card, updates);
    await this.storage.save(this.board);
  }

  async deleteCard(cardId) {
    this.board.cards = this.board.cards.filter(c => c.id !== cardId);
    await this.storage.save(this.board);
  }
}

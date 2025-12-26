import { StorageAdapter } from "./StorageAdapter.js";

export class IndexedDBAdapter extends StorageAdapter {
  constructor() {
    super();
    this.dbName = "vizboard-db";
    this.store = "boards";
  }

  async db() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, 1);
      req.onupgradeneeded = e =>
        e.target.result.createObjectStore(this.store);
      req.onsuccess = e => resolve(e.target.result);
      req.onerror = reject;
    });
  }

  async save(board) {
    const db = await this.db();
    const tx = db.transaction(this.store, "readwrite");
    tx.objectStore(this.store).put(board, "main");
  }

  async load() {
    const db = await this.db();
    const tx = db.transaction(this.store);
    return new Promise(res =>
      tx.objectStore(this.store).get("main").onsuccess = e =>
        res(e.target.result || { cards: [] })
    );
  }
}

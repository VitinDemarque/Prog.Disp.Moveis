import { Item } from "../models/Item";

export default class ItemService {
  static generateId(): string {
    return Date.now().toString();
  }

  static add(items: Item[], title: string): Item[] {
    const newItem: Item = { id: this.generateId(), title };
    return [...items, newItem];
  }

  static update(items: Item[], updatedItem: Item): Item[] {
    return items.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
  }

  static delete(items: Item[], itemId: string): Item[] {
    return items.filter(item => item.id !== itemId);
  }
}

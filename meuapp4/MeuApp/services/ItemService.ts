import { Item } from "../models/Item";

export default class ItemService {
  static add(items: Item[], newItem: Item): Item[] {
    return [...items, newItem];
  }

  static update(items: Item[], updatedItem: Item): Item[] {
    return items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
  }

  static delete(items: Item[], id: string): Item[] {
    return items.filter((item) => item.id !== id);
  }
}

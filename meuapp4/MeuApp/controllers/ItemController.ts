import { Alert } from "react-native";
import { Item } from "../models/Item";
import ItemService from "../services/ItemService";

export default class ItemController {
  static addItem(
    items: Item[],
    title: string,
    onUpdate: (newItems: Item[]) => void
  ) {
    if (!title.trim()) {
      Alert.alert("Erro", "Digite um título");
      return;
    }
    const updated = ItemService.add(items, title.trim());
    onUpdate(updated);
  }

  static updateItem(
    items: Item[],
    item: Item | null,
    title: string,
    onUpdate: (newItems: Item[]) => void
  ) {
    if (!item || !title.trim()) {
      Alert.alert("Erro", "Digite um título");
      return;
    }
    const updated = ItemService.update(items, { ...item, title: title.trim() });
    onUpdate(updated);
  }

  static deleteItem(
    items: Item[],
    item: Item | null,
    onUpdate: (newItems: Item[]) => void
  ) {
    if (!item) return;
    const updated = ItemService.delete(items, item.id);
    onUpdate(updated);
  }
}

import React, { useState } from "react";
import { Item } from "./models/Item";
import ItemController from "./controllers/ItemController";
import ItemView from "./views/ItemView";

export default function App() {
  const [items, setItems] = useState<Item[]>([
    { id: "1", title: "Item Exemplo 1" },
    { id: "2", title: "Item Exemplo 2" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [inputText, setInputText] = useState("");

  const closeModal = () => {
    setInputText("");
    setEditingItem(null);
    setModalVisible(false);
  };

  const openAddModal = () => {
    setInputText("");
    setEditingItem(null);
    setModalVisible(true);
  };

  const openEditModal = (item: Item) => {
    setInputText(item.title);
    setEditingItem(item);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (editingItem) {
      ItemController.updateItem(items, editingItem, inputText, setItems);
    } else {
      ItemController.addItem(items, inputText, setItems);
    }
    closeModal();
  };

  const handleDelete = () => {
    ItemController.deleteItem(items, editingItem, setItems);
    closeModal();
  };

  return (
    <ItemView
      items={items}
      modalVisible={modalVisible}
      editingItem={editingItem}
      inputText={inputText}
      setInputText={setInputText}
      openAddModal={openAddModal}
      openEditModal={openEditModal}
      closeModal={closeModal}
      handleSave={handleSave}
      handleDelete={handleDelete}
    />
  );
}

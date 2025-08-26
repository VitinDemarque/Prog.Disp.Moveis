import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { Item } from "../models/Item";

type Props = {
  items: Item[];
  modalVisible: boolean;
  editingItem: Item | null;
  inputText: string;
  setInputText: (text: string) => void;
  openAddModal: () => void;
  openEditModal: (item: Item) => void;
  closeModal: () => void;
  handleSave: () => void;
  handleDelete: () => void;
};

const ItemView = ({
  items,
  modalVisible,
  editingItem,
  inputText,
  setInputText,
  openAddModal,
  openEditModal,
  closeModal,
  handleSave,
  handleDelete,
}: Props) => {
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openEditModal(item)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>

      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text>Adicionar Item</Text>
      </TouchableOpacity>

      <FlatList data={items} renderItem={renderItem} keyExtractor={item => item.id} />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.dialog}>
            <Text style={styles.modalTitle}>
              {editingItem ? "Editar Item" : "Novo Item"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite o título"
              value={inputText}
              onChangeText={setInputText}
            />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              {editingItem && (
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Text style={[styles.buttonText, styles.deleteButtonText]}>
                    Excluir
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>
                  {editingItem ? "Salvar" : "Adicionar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemView;

// ⚠️ Este é o ÚNICO bloco de estilos. Não pode ter outro!
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  addButton: {
    backgroundColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialog: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20 },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: {
    backgroundColor: "#ddd",
    padding: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: { fontSize: 14, fontWeight: "500" },
  deleteButton: { backgroundColor: "#ffebee" },
  deleteButtonText: { color: "#d32f2f" },
});

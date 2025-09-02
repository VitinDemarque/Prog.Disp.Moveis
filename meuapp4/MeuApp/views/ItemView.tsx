import React from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";  
import {Appbar,Button,Card,Dialog,Portal,TextInput,Provider as PaperProvider,} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera"; 
import { Item } from "../models/Item";

type Props = {
  items: Item[];
  modalVisible: boolean;
  editingItem: Item | null;
  inputText: string;
  setInputText: (text: string) => void;
  inputImage: string | null;            
  setInputImage: (uri: string | null) => void;
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
  inputImage,
  setInputImage,
  openAddModal,
  openEditModal,
  closeModal,
  handleSave,
  handleDelete,
}: Props) => {

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setInputImage(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const permissionResult = await Camera.requestCameraPermissionsAsync();

    if (permissionResult.status !== "granted") {
      alert("Permissão para usar a câmera é necessária!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setInputImage(result.assets[0].uri);
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <Card style={styles.card} onPress={() => openEditModal(item)}>
      <Card.Title title={item.title} />
      {item.imageUri && (
        <Card.Cover source={{ uri: item.imageUri }} style={{ height: 120 }} />
      )}
    </Card>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="TABELA" />
        </Appbar.Header>

        <Button
          mode="contained"
          style={styles.addButton}
          onPress={openAddModal}
        >
          Adicionar Item
        </Button>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        <Portal>
          <Dialog visible={modalVisible} onDismiss={closeModal}>
            <Dialog.Title>
              {editingItem ? "Editar Item" : "Novo Item"}
            </Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Título"
                mode="outlined"
                value={inputText}
                onChangeText={setInputText}
                style={{ marginBottom: 10 }}
              />

              <Button
                mode="outlined"
                onPress={pickImage}
                style={{ marginBottom: 10 }}
              >
                Escolher da Galeria
              </Button>

              <Button
                mode="outlined"
                onPress={pickFromCamera}
                style={{ marginBottom: 10 }}
              >
                Abrir Câmera
              </Button>

              {inputImage && (
                <Image
                  source={{ uri: inputImage }}
                  style={{
                    width: 120,
                    height: 120,
                    marginTop: 10,
                    alignSelf: "center",
                    borderRadius: 8,
                  }}
                />
              )}
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={closeModal}>Cancelar</Button>
              {editingItem && (
                <Button textColor="red" onPress={handleDelete}>
                  Excluir
                </Button>
              )}
              <Button onPress={handleSave}>
                {editingItem ? "Salvar" : "Adicionar"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default ItemView;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  addButton: {
    margin: 16,
    borderRadius: 8,
    paddingVertical: 6,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
});

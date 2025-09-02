import { Alert, InteractionManager } from "react-native";
import { Item } from "../models/Item";
import ItemService from "../services/ItemService";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

export default class ItemController {
  static addItem(
    items: Item[],
    title: string,
    imageUri: string | null, 
    onUpdate: (newItems: Item[]) => void
  ) {
    if (!title.trim()) {
      InteractionManager.runAfterInteractions(() => {
        Alert.alert("Erro", "Digite um título");
      });
      return;
    }

    const updated = ItemService.add(items, {
      id: Date.now().toString(),
      title: title.trim(),
      imageUri: imageUri || undefined,
    });
    onUpdate(updated);
  }

  static updateItem(
    items: Item[],
    item: Item | null,
    title: string,
    imageUri: string | null, 
    onUpdate: (newItems: Item[]) => void
  ) {
    if (!item || !title.trim()) {
      InteractionManager.runAfterInteractions(() => {
        Alert.alert("Erro", "Digite um título");
      });
      return;
    }

    const updated = ItemService.update(items, {
      ...item,
      title: title.trim(),
      imageUri: imageUri || item.imageUri, 
    });
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

export const pickImage = async (setImageUri: (uri: string) => void) => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    InteractionManager.runAfterInteractions(() => {
      alert("Permissão para interagir a galeria é necessária!");
    });
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setImageUri(result.assets[0].uri);
  }
};

export const pickFromCamera = async (setImageUri: (uri: string) => void) => {
  const permissionResult = await Camera.requestCameraPermissionsAsync();

  if (permissionResult.status !== "granted") {
    InteractionManager.runAfterInteractions(() => {
      alert("Permissão para usar a câmera é necessária!");
    });
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setImageUri(result.assets[0].uri);
  }
};

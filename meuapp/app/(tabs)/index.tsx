import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  View,
  Alert, 
  KeyboardAvoidingView, 
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [data, setData] = useState([
    { id: '1', title: 'Item 1', description: 'Primeiro item da lista', image: '' },
    { id: '2', title: 'Item 2', description: 'Segundo item da lista', image: '' },
    { id: '3', title: 'Item 3', description: 'Terceiro item da lista', image: '' },
    { id: '4', title: 'Item 4', description: 'Quarto item da lista', image: '' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewError, setPreviewError] = useState(false);

  const addItem = () => {
    if (!title.trim()) return; // não adiciona se título vazio
    const newItem = {
      id: Date.now().toString(),
      title,
      description,
      image: imageUrl,
    };
    setData((prev) => [...prev, newItem]);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setPreviewError(false); //
    setModalVisible(false);
  };

  //Handler com validação visível para o usuário
  const handleAddPress = () => {
    if (!title.trim()) {
      Alert.alert('Título obrigatório', 'Preencha o título do item para adicionar.');
      return;
    }
    addItem();
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#000000ff', dark: '#1D3D47' }}
        headerImage={
          <Image
        
            source={require('@/assets/images/corinthians2.png')}
            style={styles.reactLogo}
            
          />
        }
      >
        {/* Cabeçalho */}
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>

        {/* FlatList */}
        <ThemedView style={{ marginTop: 16, marginBottom: 80 }}>
          <ThemedText type="subtitle">Minha Lista de Itens</ThemedText>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <ThemedView style={styles.itemContainer}>
                <ThemedText type="defaultSemiBold" style={styles.itemTitle}>
                  {item.title}
                </ThemedText>
                <ThemedText>{item.description}</ThemedText>
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    contentFit="cover" 
                  />
                ) : null}
              </ThemedView>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum item ainda. Toque em “Adicionar Item”.</Text>
            }
            showsVerticalScrollIndicator={false} 
          />
        </ThemedView>
      </ParallaxScrollView>

      {/* Botão fixo */}
      <TouchableOpacity style={styles.fixedButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Adicionar Item</Text>
      </TouchableOpacity>

      {/* Modal de Adição */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ width: '100%' }}
          >
            <View style={styles.modalContent}>
              <ThemedText type="subtitle" style={{ color: 'black' }}>
                Novo Item
              </ThemedText>

              <TextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
              />
              <TextInput
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              <TextInput
                placeholder="URL da Imagem"
                value={imageUrl}
                onChangeText={(t) => {
                  setImageUrl(t);
                  setPreviewError(false);
                }}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

              {/* Preview da imagem digitada */}
              {imageUrl ? (
                <View style={styles.previewBox}>
                  <Text style={styles.previewLabel}>Prévia da imagem</Text>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.previewImage}
                    contentFit="cover"
                    onError={() => setPreviewError(true)}
                  />
                  {previewError ? (
                    <Text style={styles.previewError}>
                      Não foi possível carregar a imagem dessa URL.
                    </Text>
                  ) : null}
                </View>
              ) : null}

              <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
                {/* Usar o handler com validação visível */}
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setPreviewError(false); 
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  // ITENS DA LISTA
  itemContainer: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: '#0095ffff',
  },
  // destaque do título
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  itemImage: {
    marginTop: 8,
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  reactLogo: {
    height: 250,
    width: 1244,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  // BOTAO ADC ITEM FIXO NA TELA
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff0000ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  // TEXTO DO BOTAO ADC ITEM
  buttonText: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // PARTE DE TRAZ DO BACKGROUND DE DENTRO DO BOTAO ADC ITEM
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  // BACKGROUND DE DENTRO DO BOTAO ADC ITEM
  modalContent: {
    backgroundColor: '#ffffffff',
    borderRadius: 12,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000ff',
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    backgroundColor: '#fff',
  },
  // caixa de prévia da imagem
  previewBox: {
    marginTop: 12,
  },
  previewLabel: {
    fontSize: 12,
    marginBottom: 6,
    color: '#222',
  },
  previewImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  previewError: {
    marginTop: 6,
    fontSize: 12,
    color: '#b00020',
  },
  // BOTAO ADICIONAR DENTRO DO ADICIONAR ITEM
  addButton: {
    backgroundColor: '#1D3D47',
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  // TEXTO DO BOTAO ADICIONAR DENTRO DO ADC ITEM
  addButtonText: {
    color: '#ffffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  // BOTAO DE CANCELAR DENTRO DO DE ADC ITEM
  cancelButton: {
    marginTop: 10,
    padding: 12,
    alignItems: 'center',
  },
  // TEXTO DO BOTAO DE CANCELAR
  cancelButtonText: {
    color: '#1D3D47',
    fontWeight: '600',
    fontSize: 14,
  },
  // estado vazio da lista
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    opacity: 0.7,
  },
});

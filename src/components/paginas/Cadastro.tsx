import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUserStore } from './userStore'; // Importe o store
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    width: '100%',
  },
});

 const Cadastro = ({ route, navigation }: any) => {
    //const userStore = useUserStore(); // Obtenha o store
    const [name, setUsuario] = useState('');
    const { onGoBack, id } = route.params;

    const carregarTela = async () => {
      if (id) {
        const response = await axios.get(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}`);
        setUsuario(response.data.name);
      }
    };
    useEffect(() => {
      carregarTela();
    }, []);

    const handleRegister = async () => {
      try {
  
        if(!id) {
          await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet`, {
              name: name,
          });
          alert('Cadastro Efetuado!');
        } else {
          await axios.put(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}`, {
              name: name,
          });
          alert('Tamagochi atualizado!');
        }
        
        onGoBack();
        navigation.goBack();
      } catch (error) {
        console.error('Erro ao registrar:', error);
      }
    };

  return (
    <View style={styles.container}>
      <Text>Nome do tamagochi:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setUsuario}
        placeholder="Nome do Tamagochi"
      />

      <Button title="Salvar" onPress={handleRegister} />

    </View>
  );
};
export default Cadastro;

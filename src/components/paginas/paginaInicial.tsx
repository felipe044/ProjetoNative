import { background } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaginaInicial = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

   // Função para fazer fazer o processo de login
   const handleCadastro = async () => {
    try {
      const response = await axios.post(
      `https://tamagochiapi-clpsampedro.b4a.run/login`,
      {email:username
      ,password:password,});
      
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Listar');
    } catch (error) {
        alert('Erro! Email ou senha inválidos');
    }
  };

  //ir para pagina de cadastro
  const handleCadastroPress = () => {
    navigation.navigate('CadastroUsuario');
};

  return (
      <View style={styles.container}>
        <ImageBackground source={require('/Users/felipebarcelos/ProjetoReactNative/assets/foto.jpg')} style={styles.background}/>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <Button title="Entrar" onPress={handleCadastro} />
      <Button title="Criar Conta" onPress={handleCadastroPress} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FF6B6B',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    //marginTop: -100,
    paddingHorizontal: 10,
},
    background: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
    }
});

export default PaginaInicial;

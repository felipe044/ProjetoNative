import { background } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet } from 'react-native';

const PaginaInicial = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aqui você pode implementar a lógica para autenticar o usuário
    console.log('Username:', username);
    console.log('Password:', password);
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
      <Button title="Entrar" onPress={handleLogin} />
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

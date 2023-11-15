import React, { useState } from 'react';
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

 const CadastroUsuario = ({ navigation }: any) => {
    const userStore = useUserStore(); // Obtenha o store
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');
    const [confirmPassword, setConfirmacaoSenha] = useState('');
  
  
      // valida se as duas senhas são iguais
    const handleRegister = async () => {
      if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
          // Esse try armazena senha e email no Async e solicita o registro para a API
      try {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await axios.post(
          `https://tamagochiapi-clpsampedro.b4a.run/register`,
          {
            email,
            password,
          }
        );
        // Alertas para informar se foi ou não realizado o cadastro
        alert('Registro bem-sucedido!');
        navigation.navigate('PaginaInicial');
      } catch (error) {
        alert('Este email já está cadastrado');
      }
    };

  return (
    <View style={styles.container}>
      <Text>Nome de Usuário:</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Digite seu usuário"
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        keyboardType="email-address"
      />

      <Text>Senha:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <Text>Confirmação de Senha:</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmacaoSenha}
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};
export default CadastroUsuario;

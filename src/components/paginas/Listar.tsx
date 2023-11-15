
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
//import LogoutButton from '../App';
import styled from 'styled-components/native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Button = styled.TouchableOpacity`
  background-color: #0C1111;
  padding: 10px 20px; 
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const ContainerAnimal = styled.View`
    display: flex;
    flex-direction: row;
    padding: 10px;
    width: 80%;
    margin: 10%;
    background: blue;
    border-radius: 14px;
    justify-content: space-between;
`

const ContainerButtonAnimal = styled.TouchableOpacity`
    background: #ffffff;
    padding: 14px;
    margin-bottom: 10px;
`

const TitleAnimal = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: black;
`
const Listar = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState([]);

  const carregarLista = async () =>{ 

    setLoading(true);
    const response = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pets');
    setAnimals(response.data?.pets || []);
    setLoading(false);

  }
  useEffect(() => {

    carregarLista();}, []);

  const HandleRegister = async () =>{
    navigation.navigate('Cadastro')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={() => {navigation.navigate('Cadastro',{onGoBack: () => {
                carregarLista();
            }
        })
      }}>
        <ButtonText>Cadastrar PET</ButtonText>
      </Button>
      
    {loading == false && animals.length == 0 && <Text>Nenhum tamagochi encontrado nesse usuário.</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={animals}
          style={{width:"100%"}}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <ContainerAnimal>
                
                <View>
                    <TitleAnimal>{item.name}</TitleAnimal>
                    <ContainerButtonAnimal style={{ marginTop: 20 }} onPress={() => navigation.navigate('Brincar', { id: item.id })} >
                        <TitleAnimal>Brincar</TitleAnimal>
                    </ContainerButtonAnimal>
                </View>
                

                <View>
                    <ContainerButtonAnimal onPress={() => {
                        navigation.navigate('Cadastro', {id: item.id,onGoBack: () => carregarLista(),})
                    }} >
                        <TitleAnimal>Editar</TitleAnimal>
                    </ContainerButtonAnimal>

                    <ContainerButtonAnimal onPress={async () => {
                        await axios.delete(`https://tamagochiapi-clpsampedro.b4a.run/pet/${item.id}`)
                        carregarLista();
                    }} >
                        <TitleAnimal>Deletar</TitleAnimal>
                    </ContainerButtonAnimal>
                </View>
            </ContainerAnimal>
          )}
        />
      )}


    </View>
  );
};

export default Listar;

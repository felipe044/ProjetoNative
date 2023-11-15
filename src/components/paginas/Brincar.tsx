import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Stats = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const StatText = styled.Text`
  margin-right: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Brincar = ({ route }: any) => {
  const [pet, setPet] = useState<any | null>(null)
  const { onGoBack, id } = route.params;

  const carregarTela = async () => {
    if(id) {
        const response = await axios.get(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}`);
        setPet(response.data);
    }
  }

  useEffect(() => {
    carregarTela();
  }, [])

  const handlebrincar = async () => {
    const response = await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}/play`);
    setPet(response.data);
  };

  const handleAlimentar = async () => {
    const response = await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}/food`);
    setPet(response.data);
  };

  const handleDescansar = async () => {
    const response = await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}/rest`);
    setPet(response.data);
  };

  return (
    <Container>
      <Heading>Tamagochi</Heading>
      <Stats>
        {pet && <StatText>Fome: {pet.foodLevel.toFixed(2)}%</StatText>}
        {pet && <StatText>Felicidade: {pet.funLevel.toFixed(2)}%</StatText>}
        {pet && <StatText>Energia: {pet.restLevel.toFixed(2)}%</StatText>}

      </Stats>
      <ButtonContainer>
        <Button title="Brincar" onPress={handlebrincar} />
        <Button title="Alimentar" onPress={handleAlimentar} />
        <Button title="Descansar" onPress={handleDescansar} />
      </ButtonContainer>
    </Container>
  );
};

export default Brincar;

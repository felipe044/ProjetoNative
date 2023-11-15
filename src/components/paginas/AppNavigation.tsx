import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroUsuario from './CadastroUsuario';
import PaginaInicial from './paginaInicial';
import Cadastro from './Cadastro';
import Listar from './Listar';
import Brincar from './Brincar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PaginaInicial">
        <Stack.Screen name="PaginaInicial" component={PaginaInicial} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Listar" component={Listar} />
        <Stack.Screen name="Brincar" component={Brincar} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;

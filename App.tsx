import React from "react";
import { Text } from "react-native";
import CadastroUsuario from "./src/components/paginas/CadastroUsuario";
import PaginaInicial from "./src/components/paginas/paginaInicial";
import AppNavigation from "./src/components/paginas/AppNavigation";
import Cadastro from "./src/components/paginas/Cadastro";
import Brincar from "./src/components/paginas/Brincar";


function App(): JSX.Element {
 // return <Home />;
    return (
        <AppNavigation></AppNavigation>
    );
}
export default App;
// user: felipe@teste.com
// senha: 12345678
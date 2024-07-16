import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Header from "./components/Header";

import { ListaGeralContextProvider } from "./src/Context/ListaGeralContext";

import { createStackNavigator } from "@react-navigation/stack";

import Principal from "./src/Pages/Principal";

import Bebidas from "./src/Pages/Bebidas";
import HigienePessoal from "./src/Pages/HigienePessoal";
import Hortifruti from "./src/Pages/Hortifruti";
import Temperos from "./src/Pages/Temperos";
import Mercearia from "./src/Pages/Mercearia";
import Acougue from "./src/Pages/Acougue";
import Limpeza from "./src/Pages/Limpeza";
import Carrinho from "./src/Pages/Carrinho";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ListaGeralContextProvider>
        <StatusBar
          backgroundColor="#4B0082" // Cor de fundo da barra de status
          barStyle="light-content" // Estilo do texto (pode ser 'dark-content' ou 'light-content')
          translucent={false} // Se a barra de status deve ser translúcida
        />
        <Header />
        <Stack.Navigator initialRouteName="Principal">
          <Stack.Screen name="Principal" component={Principal} />
          <Stack.Screen name="Carrinho" component={Carrinho} />
          <Stack.Screen name="Limpeza" component={Limpeza} />
          <Stack.Screen name="Bebidas" component={Bebidas} />
          <Stack.Screen name="Higiene Pessoal" component={HigienePessoal} />
          <Stack.Screen name="Hortifruti" component={Hortifruti} />
          <Stack.Screen name="Temperos" component={Temperos} />
          <Stack.Screen name="Mercearia" component={Mercearia} />
          <Stack.Screen name="Açougue" component={Acougue} />

        </Stack.Navigator>
      </ListaGeralContextProvider>
    </NavigationContainer>
  );
}


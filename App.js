import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Header from "./components/Header";

import { ListaGeralContextProvider } from "./src/Context/ListaGeralContext";

import { createStackNavigator } from "@react-navigation/stack";

import Principal from "./src/Pages/Principal";

import Carrinho from "./src/Pages/Carrinho";
import CategoryScreen from "./src/Pages/CategoryScreen";

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
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="Carrinho" component={Carrinho} />
        </Stack.Navigator>
      </ListaGeralContextProvider>
    </NavigationContainer>
  );
}


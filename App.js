import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import Header from "./components/Header";

import { ListaContextProvider } from "./src/Context/ListaContext";
import { LimpezaContextProvider } from "./src/Context/LimpezaContext";
import { BebidasContextProvider } from "./src/Context/BebidasContext";
import { HigieneContextProvider } from "./src/Context/HigienePessoalContext";
import { HortifrutiContextProvider } from "./src/Context/HortifrutiContext";
import { TemperosContextProvider } from "./src/Context/TemperosContext";
import { CarrinhoContextProvider } from "./src/Context/CarrinhoContext";
import { createStackNavigator } from "@react-navigation/stack";

import Principal from "./src/Pages/Principal";
import Limpeza from "./src/Pages/Limpeza";
import Bebidas from "./src/Pages/Bebidas";
import HigienePessoal from "./src/Pages/HigienePessoal";
import Hortifruti from "./src/Pages/Hortifruti";
import Temperos from "./src/Pages/Temperos";
import Carrinho from "./src/Pages/Carrinho";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ListaContextProvider>
        <BebidasContextProvider>
          <HigieneContextProvider>
            <LimpezaContextProvider>
              <HortifrutiContextProvider>
                <TemperosContextProvider>
                  <CarrinhoContextProvider>
                    <Header />
                    <Stack.Navigator initialRouteName="Principal">
                      <Stack.Screen name="Principal" component={Principal} />
                      <Stack.Screen name="Limpeza" component={Limpeza} />
                      <Stack.Screen name="Bebidas" component={Bebidas} />
                      <Stack.Screen
                        name="HigienePessoal"
                        component={HigienePessoal}
                      />
                      <Stack.Screen name="Hortifruti" component={Hortifruti} />
                      <Stack.Screen name="Temperos" component={Temperos} />
                      <Stack.Screen name="Carrinho" component={Carrinho} />
                    </Stack.Navigator>
                    {/*  
          <Routes /> */}
                  </CarrinhoContextProvider>
                </TemperosContextProvider>
              </HortifrutiContextProvider>
            </LimpezaContextProvider>
          </HigieneContextProvider>
        </BebidasContextProvider>
      </ListaContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BebidasContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useBebidasContext = () => {
  return useContext(BebidasContext);
};

export const BebidasContextProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([
    {
      tipo: "Bebidas",
      produto: "Água Mineral",
      valor: 1.99,
      quantidade: 1,
      cart: false,
    },
    {
      tipo: "Bebidas",
      produto: "Energético",
      valor: 9.8,
      quantidade: 1,
      cart: false,
    },
    {
      tipo: "Bebidas",
      produto: "Cerveja Lata",
      valor: 2.69,
      quantidade: 1,
      cart: false,
    },
    {
      tipo: "Bebidas",
      produto: "Coca-Cola 2L",
      valor: 8.0,
      quantidade: 1,
      cart: false,
    },
    {
      tipo: "Bebidas",
      produto: "Coca-Cola Latinha",
      valor: 3.99,
      quantidade: 1,
      cart: false,
    },
  ]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("bebidas");
        if (storedData) {
          setBebidas(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    loadAsyncData();
  }, []);

  // Atualizar o AsyncStorage sempre que a lista for alterada
  useEffect(() => {
    const saveAsyncData = async () => {
      try {
        await AsyncStorage.setItem("bebidas", JSON.stringify(bebidas));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [bebidas]);

  return (
    <BebidasContext.Provider value={{ bebidas, setBebidas }}>
      {children}
    </BebidasContext.Provider>
  );
};

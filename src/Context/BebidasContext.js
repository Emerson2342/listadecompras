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
    { tipo: "Bebidas", produto: "Leite", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Café", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Água Mineral", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Energético", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Cerveja", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Refrigerantes", valor: 0, quantidade: 1 },
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

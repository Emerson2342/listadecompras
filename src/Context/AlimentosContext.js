import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AlimentosContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useAlimentosContext = () => {
  return useContext(AlimentosContext);
};

export const AlimentosContextProvider = ({ children }) => {
  const [alimentos, setAlimentos] = useState([
    { tipo: "Alimentos", produto: "Arroz", valor: 0, quantidade: 1 },
    { tipo: "Alimentos", produto: "Feijão", valor: 0, quantidade: 1 },
    { tipo: "Alimentos", produto: "Açúcar", valor: 0, quantidade: 1 },
    { tipo: "Alimentos", produto: "Café", valor: 0, quantidade: 1 },
    { tipo: "Alimentos", produto: "Ovo", valor: 0, quantidade: 1 },
    { tipo: "Alimentos", produto: "Macarrão", valor: 0, quantidade: 1 },
    { tipo: "Alimentos", produto: "Nescau", valor: 0, quantidade: 1 },
    { tipo: "Alimentos", produto: "Toddy", valor: 0, quantidade: 1 },
    { tipo: "Alimentos", produto: "Biscoito", valor: 0, quantidade: 1 },
  ]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("alimentos");
        if (storedData) {
          setAlimentos(JSON.parse(storedData));
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
        await AsyncStorage.setItem("alimentos", JSON.stringify(alimentos));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [alimentos]);

  return (
    <AlimentosContext.Provider value={{ alimentos, setAlimentos }}>
      {children}
    </AlimentosContext.Provider>
  );
};

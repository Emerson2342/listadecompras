import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TemperosContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useTemperosContext = () => {
  return useContext(TemperosContext);
};

export const TemperosContextProvider = ({ children }) => {
  const [temperos, setTemperos] = useState([
    { tipo: "Temperos", produto: "Alho", valor: 0, quantidade: 1 },
    { tipo: "Temperos", produto: "Cebola", valor: 0, quantidade: 1 },
    { tipo: "Temperos", produto: "Salsinha", valor: 0, quantidade: 1 },
    { tipo: "Temperos", produto: "Cebolinha", valor: 0, quantidade: 1 },
    { tipo: "Temperos", produto: "Orégano", valor: 0, quantidade: 1 },
    { tipo: "Temperos", produto: "Páprica", valor: 0, quantidade: 1 },
    { tipo: "Temperos", produto: "Cominho", valor: 0, quantidade: 1 },
    { tipo: "Temperos", produto: "Cúrcuma", valor: 0, quantidade: 1 },
    { tipo: "Temperos", produto: "Erva-Doce", valor: 0, quantidade: 1 },
    { tipo: "Temperos", produto: "Canela", valor: 0, quantidade: 1 },
  ]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("temperos");
        if (storedData) {
          setTemperos(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    loadAsyncData();
  }, []);

  // Atualizar o AsyncStorage sempre que a temperos for alterada
  useEffect(() => {
    const saveAsyncData = async () => {
      try {
        await AsyncStorage.setItem("temperos", JSON.stringify(temperos));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [temperos]);

  return (
    <TemperosContext.Provider value={{ temperos, setTemperos }}>
      {children}
    </TemperosContext.Provider>
  );
};

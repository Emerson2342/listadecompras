import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MerceariaContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useMerceariaContext = () => {
  return useContext(MerceariaContext);
};

export const MerceariaContextProvider = ({ children }) => {
  const [mercearia, setMercearia] = useState([
    { tipo: "Mercearia", produto: "Arroz", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Feijão", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Macarrão", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Açúcar", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Leite", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Café", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Óleo", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Ovos", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Polvilho", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Maizena", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Café", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Leite Condensado", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Creme de Leite", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Toddy", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Maionese", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Catchup", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Queijo ", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Presunto", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Manteiga", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Margarina", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Requeijão", valor: 0, quantidade: 1 },
    { tipo: "Mercearia", produto: "Iorgute", valor: 0, quantidade: 1 },
  ]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("mercearia");
        if (storedData) {
          setMercearia(JSON.parse(storedData));
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
        await AsyncStorage.setItem("mercearia", JSON.stringify(mercearia));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [mercearia]);

  return (
    <MerceariaContext.Provider value={{ mercearia, setMercearia }}>
      {children}
    </MerceariaContext.Provider>
  );
};

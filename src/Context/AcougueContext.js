import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AcougueContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useAcougueContext = () => {
  return useContext(AcougueContext);
};

export const AcougueContextProvider = ({ children }) => {
  const [acougue, setAcougue] = useState([
    { tipo: "Acougue", produto: "Picanha", valor: 48.99, quantidade: 1 },
    { tipo: "Acougue", produto: "Carne de Sol", valor: 25.99, quantidade: 1 },
    {
      tipo: "Acougue",
      produto: "Paleta Sem Osso",
      valor: 28.99,
      quantidade: 1,
    },
    {
      tipo: "Acougue",
      produto: "Paleta Com Osso",
      valor: 23.99,
      quantidade: 1,
    },
    { tipo: "Acougue", produto: "Músculo", valor: 20.99, quantidade: 1 },
    { tipo: "Acougue", produto: "Bife", valor: 23.99, quantidade: 1 },
    { tipo: "Acougue", produto: "Acém", valor: 23.99, quantidade: 1 },
    { tipo: "Acougue", produto: "Costela Bovina", valor: 19.99, quantidade: 1 },
    { tipo: "Acougue", produto: "Carne Moída", valor: 22.0, quantidade: 1 },
    { tipo: "Acougue", produto: "Frango Inteiro", valor: 9.8, quantidade: 1 },
    {
      tipo: "Acougue",
      produto: "Coxa e Sobrecoxa",
      valor: 11.99,
      quantidade: 1,
    },
    { tipo: "Acougue", produto: "Asinha", valor: 15.0, quantidade: 1 },
    { tipo: "Acougue", produto: "Coxinha", valor: 17.0, quantidade: 1 },
    {
      tipo: "Acougue",
      produto: "Frango a Passarinho",
      valor: 11.0,
      quantidade: 1,
    },
    {
      tipo: "Acougue",
      produto: "Linguiça de Frango",
      valor: 13.99,
      quantidade: 1,
    },
    { tipo: "Acougue", produto: "Salsicha", valor: 20.98, quantidade: 1 },
    { tipo: "Acougue", produto: "Bacon", valor: 23.99, quantidade: 1 },
  ]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("acougue");
        if (storedData) {
          setAcougue(JSON.parse(storedData));
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
        await AsyncStorage.setItem("acougue", JSON.stringify(acougue));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [acougue]);

  return (
    <AcougueContext.Provider value={{ acougue, setAcougue }}>
      {children}
    </AcougueContext.Provider>
  );
};

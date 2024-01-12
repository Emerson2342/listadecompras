import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LimpezaContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useLimpezaContext = () => {
  return useContext(LimpezaContext);
};

export const LimpezaContextProvider = ({ children }) => {
  const [limpeza, setLimpeza] = useState([
    {
      tipo: "Limpeza",
      produto: "Água Sanitária",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Limpeza",
      produto: "Sabão em pó",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Limpeza",
      produto: "Amaciante",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Limpeza",
      produto: "Detergente",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Limpeza",
      produto: "Desinfetante",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Limpeza",
      produto: "Palha de aço",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Limpeza",
      produto: "Bucha de pia",
      valor: 0,
      quantidade: 1,
    },
  ]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("limpeza");
        if (storedData) {
          setLimpeza(JSON.parse(storedData));
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
        await AsyncStorage.setItem("limpeza", JSON.stringify(limpeza));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [limpeza]);

  return (
    <LimpezaContext.Provider value={{ limpeza, setLimpeza }}>
      {children}
    </LimpezaContext.Provider>
  );
};

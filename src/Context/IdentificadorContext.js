import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IdentificadorContext = createContext();

export const useIdentificadorContext = () => {
  return useContext(IdentificadorContext);
};

export const IdentificadorContextProvider = ({ children }) => {
  const [identificador, setIdentificador] = useState(100);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("identificador");
        if (storedData) {
          setIdentificador(parseInt(storedData, 10));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    loadAsyncData();
  }, []);

  // Atualizar o AsyncStorage sempre que o identificador for alterado
  useEffect(() => {
    const saveAsyncData = async () => {
      try {
        await AsyncStorage.setItem("identificador", identificador.toString());
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [identificador]);

  return (
    <IdentificadorContext.Provider value={{ identificador, setIdentificador }}>
      {children}
    </IdentificadorContext.Provider>
  );
};

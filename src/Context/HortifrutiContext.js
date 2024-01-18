import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HortifrutiContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useHortifrutiContext = () => {
  return useContext(HortifrutiContext);
};

export const HortifrutiContextProvider = ({ children }) => {
  const [hortifruti, setHortifruti] = useState([
    { tipo: "Hortifruti", produto: "Alface Crespa", valor: 2.5, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Alface Liso", valor: 4.5, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Cenoura", valor: 9.99, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Couve", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Couve-Flor", valor: 9.99, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Cheiro-Verde", valor: 1.49, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Tomate", valor: 3.89, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Pepino", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Cebola", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Batata", valor: 2.99, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Beterraba", valor: 6.99, quantidade: 1 },
    {
      tipo: "Hortifruti",
      produto: "Pimentão Vermelho",
      valor: 0,
      quantidade: 1,
    },
    { tipo: "Hortifruti", produto: "Pimentão Verde", valor: 0, quantidade: 1 },
    {
      tipo: "Hortifruti",
      produto: "Pimentão Vermelho",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Hortifruti",
      produto: "Pimentão Amarelo",
      valor: 0,
      quantidade: 1,
    },
    { tipo: "Hortifruti", produto: "Maçã", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Banana", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Laranja", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Morango", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Goiaba", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Mamão", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Limão", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Melancia", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Uva", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Abacaxi", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Manga", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Abacate", valor: 0, quantidade: 1 },
  ]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("hortifruti");
        if (storedData) {
          setHortifruti(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    loadAsyncData();
  }, []);

  // Atualizar o AsyncStorage sempre que a hortifruti for alterada
  useEffect(() => {
    const saveAsyncData = async () => {
      try {
        await AsyncStorage.setItem("hortifruti", JSON.stringify(hortifruti));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [hortifruti]);

  return (
    <HortifrutiContext.Provider value={{ hortifruti, setHortifruti }}>
      {children}
    </HortifrutiContext.Provider>
  );
};

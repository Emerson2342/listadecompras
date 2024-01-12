import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HigieneContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useHigieneContext = () => {
  return useContext(HigieneContext);
};

export const HigieneContextProvider = ({ children }) => {
  const [higiene, setHigiene] = useState([
    {
      tipo: "Higiene Pessoal",
      produto: "Creme Dental",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Higiene Pessoal",
      produto: "Papel Higiênico",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Higiene Pessoal",
      produto: "Escova de Dente",
      valor: 0,
      quantidade: 1,
    },
    { tipo: "Higiene Pessoal", produto: "Sabonete", valor: 0, quantidade: 1 },
    {
      tipo: "Higiene Pessoal",
      produto: "Bucha de Banho",
      valor: 0,
      quantidade: 1,
    },
    { tipo: "Higiene Pessoal", produto: "Shampoo", valor: 0, quantidade: 1 },
    {
      tipo: "Higiene Pessoal",
      produto: "Condicionador",
      valor: 0,
      quantidade: 1,
    },
    {
      tipo: "Higiene Pessoal",
      produto: "Creme de pele",
      valor: 0,
      quantidade: 1,
    },
    { tipo: "Higiene Pessoal", produto: "Absorvente", valor: 0, quantidade: 1 },
  ]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("higiene");
        if (storedData) {
          setHigiene(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    loadAsyncData();
  }, []);

  // Atualizar o AsyncStorage sempre que a higiene for alterada
  useEffect(() => {
    const saveAsyncData = async () => {
      try {
        await AsyncStorage.setItem("higiene", JSON.stringify(higiene));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [higiene]);

  return (
    <HigieneContext.Provider value={{ higiene, setHigiene }}>
      {children}
    </HigieneContext.Provider>
  );
};

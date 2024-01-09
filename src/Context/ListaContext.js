import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListaContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useListaContext = () => {
  return useContext(ListaContext);
};

export const ListaContextProvider = ({ children }) => {
  const [lista, setLista] = useState([
    { tipo: "Limpeza", produto: "Água Sanitária", valor: 0, quantidade: 1 },
    { tipo: "Limpeza", produto: "Sabão em pó", valor: 0, quantidade: 1 },
    { tipo: "Limpeza", produto: "Amaciante", valor: 0, quantidade: 1 },
    { tipo: "Limpeza", produto: "Detergente", valor: 0, quantidade: 1 },
    { tipo: "Limpeza", produto: "Desinfetante", valor: 0, quantidade: 1 },
    { tipo: "Limpeza", produto: "Palha de aço", valor: 0, quantidade: 1 },
    { tipo: "Limpeza", produto: "Bucha de pia", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Leite", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Café", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Água Mineral", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Energético", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Cerveja", valor: 0, quantidade: 1 },
    { tipo: "Bebidas", produto: "Refrigerantes", valor: 0, quantidade: 1 },
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
      produto: "Escola de Dente",
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
    { tipo: "Hortifruti", produto: "Alface Cresto", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Alface Liso", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Cenoura", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Couve", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Couve-Flor", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Repolho", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Pepino", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Cebola", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Batata", valor: 0, quantidade: 1 },
    { tipo: "Hortifruti", produto: "Beterraba", valor: 0, quantidade: 1 },
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
        const storedData = await AsyncStorage.getItem("lista");
        if (storedData) {
          setLista(JSON.parse(storedData));
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
        await AsyncStorage.setItem("lista", JSON.stringify(lista));
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [lista]);

  return (
    <ListaContext.Provider value={{ lista, setLista }}>
      {children}
    </ListaContext.Provider>
  );
};

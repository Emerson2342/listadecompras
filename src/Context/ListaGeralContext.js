import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListaGeralContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useListaGeralContext = () => {
  return useContext(ListaGeralContext);
};

export const ListaGeralContextProvider = ({ children }) => {
  const [identificador, setIdentificador] = useState(100);
  const [listaGeral, setListaGeral] = useState([
    {
      id: 1,
      tipo: "Acougue",
      produto: "Picanha",
      valor: 48.99,
      quantidade: 1,
      cart: false,
    },

    {
      id: 2,
      tipo: "Acougue",
      produto: "Carne de Sol",
      valor: 25.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 3,
      tipo: "Acougue",
      produto: "Paleta Sem Osso",
      valor: 28.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 4,
      tipo: "Acougue",
      produto: "Paleta Com Osso",
      valor: 23.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 5,
      tipo: "Acougue",
      produto: "Músculo",
      valor: 20.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 6,
      tipo: "Acougue",
      produto: "Bife",
      valor: 23.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 7,
      tipo: "Acougue",
      produto: "Acém",
      valor: 23.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 8,
      tipo: "Acougue",
      produto: "Costela Bovina",
      valor: 19.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 9,
      tipo: "Acougue",
      produto: "Carne Moída",
      valor: 22.0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 10,
      tipo: "Acougue",
      produto: "Frango Inteiro",
      valor: 9.8,
      quantidade: 1,
      cart: false,
    },
    {
      id: 11,
      tipo: "Acougue",
      produto: "Coxa e Sobrecoxa",
      valor: 11.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 12,
      tipo: "Acougue",
      produto: "Asinha",
      valor: 15.0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 13,
      tipo: "Acougue",
      produto: "Frango a Passarinho",
      valor: 11.0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 14,
      tipo: "Acougue",
      produto: "Linguiça de Frango",
      valor: 13.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 15,
      tipo: "Acougue",
      produto: "Salsicha",
      valor: 20.98,
      quantidade: 1,
      cart: false,
    },
    {
      id: 16,
      tipo: "Acougue",
      produto: "Bacon",
      valor: 23.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 17,
      tipo: "Limpeza",
      produto: "Água Sanitária",
      valor: 3.49,
      quantidade: 1,
      cart: false,
    },
    {
      id: 18,
      tipo: "Bebidas",
      produto: "Água Mineral",
      valor: 1.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 19,
      tipo: "Bebidas",
      produto: "Energético",
      valor: 9.8,
      quantidade: 1,
      cart: false,
    },
    {
      id: 20,
      tipo: "Bebidas",
      produto: "Cerveja Lata",
      valor: 2.69,
      quantidade: 1,
      cart: false,
    },
    {
      id: 21,
      tipo: "Bebidas",
      produto: "Coca-Cola 2L",
      valor: 8.0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 22,
      tipo: "Bebidas",
      produto: "Coca-Cola Latinha",
      valor: 3.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 23,
      tipo: "Higiene Pessoal",
      produto: "Creme Dental",
      valor: 5.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 24,
      tipo: "Higiene Pessoal",
      produto: "Papel Higiênico",
      valor: 9.8,
      quantidade: 1,
      cart: false,
    },
    {
      id: 25,
      tipo: "Higiene Pessoal",
      produto: "Escova de Dente",
      valor: 4.9,
      quantidade: 1,
      cart: false,
    },
    {
      id: 26,
      tipo: "Higiene PEssoal",
      produto: "Sabonete",
      valor: 2.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 27,
      tipo: "Higiene Pessoal",
      produto: "Bucha de Banho",
      valor: 4.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 28,
      tipo: "Higiene Pessoal",
      produto: "Shampoo",
      valor: 0,
      quantidade: 1,
    },
    {
      id: 29,
      tipo: "Higiene Pessoal",
      produto: "Condicionador",
      valor: 13.0,
      quantidade: 1,
    },
    {
      id: 30,
      tipo: "Higiene Pessoal",
      produto: "Desodorante",
      valor: 9.9,
      quantidade: 1,
    },

    {
      id: 31,
      tipo: "Higiene Pessoal",
      produto: "Creme de pele",
      valor: 9.99,
      quantidade: 1,
    },
    {
      id: 32,
      tipo: "Higiene Pessoal",
      produto: "Absorvente",
      valor: 12.9,
      quantidade: 1,
    },

    {
      id: 33,
      tipo: "Hortifruti",
      produto: "Alface Crespa",
      valor: 2.5,
      quantidade: 1,
    },
    {
      id: 34,
      tipo: "Hortifruti",
      produto: "Alface Liso",
      valor: 4.5,
      quantidade: 1,
    },
    {
      id: 35,
      tipo: "Hortifruti",
      produto: "Cenoura",
      valor: 9.99,
      quantidade: 1,
    },
    { id: 36, tipo: "Hortifruti", produto: "Couve", valor: 0, quantidade: 1 },
    {
      id: 37,
      tipo: "Hortifruti",
      produto: "Couve-Flor",
      valor: 9.99,
      quantidade: 1,
    },
    {
      id: 38,
      tipo: "Hortifruti",
      produto: "Cheiro-Verde",
      valor: 1.49,
      quantidade: 1,
    },
    {
      id: 39,
      tipo: "Hortifruti",
      produto: "Tomate",
      valor: 3.89,
      quantidade: 1,
    },
    { id: 40, tipo: "Hortifruti", produto: "Pepino", valor: 0, quantidade: 1 },
    { id: 41, tipo: "Hortifruti", produto: "Cebola", valor: 0, quantidade: 1 },
    {
      id: 42,
      tipo: "Hortifruti",
      produto: "Batata",
      valor: 2.99,
      quantidade: 1,
    },
    {
      id: 43,
      tipo: "Hortifruti",
      produto: "Beterraba",
      valor: 6.99,
      quantidade: 1,
    },
    {
      id: 44,
      tipo: "Hortifruti",
      produto: "Pimentão Vermelho",
      valor: 0,
      quantidade: 1,
    },
    {
      id: 45,
      tipo: "Hortifruti",
      produto: "Pimentão Verde",
      valor: 0,
      quantidade: 1,
    },
    {
      id: 46,
      tipo: "Hortifruti",
      produto: "Pimentão Vermelho",
      valor: 0,
      quantidade: 1,
    },
    {
      id: 47,
      tipo: "Hortifruti",
      produto: "Pimentão Amarelo",
      valor: 0,
      quantidade: 1,
    },
    { id: 48, tipo: "Hortifruti", produto: "Maçã", valor: 0, quantidade: 1 },
    { id: 49, tipo: "Hortifruti", produto: "Banana", valor: 0, quantidade: 1 },
    { id: 50, tipo: "Hortifruti", produto: "Laranja", valor: 0, quantidade: 1 },
    { id: 51, tipo: "Hortifruti", produto: "Morango", valor: 0, quantidade: 1 },
    { id: 52, tipo: "Hortifruti", produto: "Goiaba", valor: 0, quantidade: 1 },
    { id: 53, tipo: "Hortifruti", produto: "Mamão", valor: 0, quantidade: 1 },
    { id: 54, tipo: "Hortifruti", produto: "Limão", valor: 0, quantidade: 1 },
    {
      id: 55,
      tipo: "Hortifruti",
      produto: "Melancia",
      valor: 0,
      quantidade: 1,
    },
    { id: 56, tipo: "Hortifruti", produto: "Uva", valor: 0, quantidade: 1 },
    { id: 57, tipo: "Hortifruti", produto: "Abacaxi", valor: 0, quantidade: 1 },
    { id: 58, tipo: "Hortifruti", produto: "Manga", valor: 0, quantidade: 1 },
    { id: 59, tipo: "Hortifruti", produto: "Abacate", valor: 0, quantidade: 1 },
    {
      id: 60,
      tipo: "Limpeza",
      produto: "Sabão em pó",
      valor: 7.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 61,
      tipo: "Limpeza",
      produto: "Amaciante",
      valor: 7.89,
      quantidade: 1,
      cart: false,
    },
    {
      id: 62,
      tipo: "Limpeza",
      produto: "Detergente",
      valor: 1.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 63,
      tipo: "Limpeza",
      produto: "Desinfetante",
      valor: 5.99,
      quantidade: 1,
      cart: false,
    },
    {
      id: 64,
      tipo: "Limpeza",
      produto: "Esponja de Lã de Aço",
      valor: 1.79,
      quantidade: 1,
      cart: false,
    },
    {
      id: 65,
      tipo: "Limpeza",
      produto: "Bucha de pia",
      valor: 2.79,
      quantidade: 1,
      cart: false,
    },
    {
      id: 66,
      tipo: "Mercearia",
      produto: "Arroz",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 67,
      tipo: "Mercearia",
      produto: "Feijão",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 68,
      tipo: "Mercearia",
      produto: "Macarrão",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 69,
      tipo: "Mercearia",
      produto: "Açúcar",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 70,
      tipo: "Mercearia",
      produto: "Leite",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 71,
      tipo: "Mercearia",
      produto: "Café",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 72,
      tipo: "Mercearia",
      produto: "Óleo",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 73,
      tipo: "Mercearia",
      produto: "Ovos",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 74,
      tipo: "Mercearia",
      produto: "Polvilho",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 75,
      tipo: "Mercearia",
      produto: "Maizena",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 76,
      tipo: "Mercearia",
      produto: "Café",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 77,
      tipo: "Mercearia",
      produto: "Leite Condensado",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 78,
      tipo: "Mercearia",
      produto: "Creme de Leite",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 79,
      tipo: "Mercearia",
      produto: "Toddy",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 80,
      tipo: "Mercearia",
      produto: "Maionese",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 81,
      tipo: "Mercearia",
      produto: "Catchup",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 82,
      tipo: "Mercearia",
      produto: "Queijo ",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 83,
      tipo: "Mercearia",
      produto: "Presunto",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 84,
      tipo: "Mercearia",
      produto: "Manteiga",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 85,
      tipo: "Mercearia",
      produto: "Margarina",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 86,
      tipo: "Mercearia",
      produto: "Requeijão",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 87,
      tipo: "Mercearia",
      produto: "Iorgute",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 88,
      tipo: "Temperos",
      produto: "Alho",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 89,
      tipo: "Temperos",
      produto: "Cebola",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 90,
      tipo: "Temperos",
      produto: "Salsinha",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 91,
      tipo: "Temperos",
      produto: "Cebolinha",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 92,
      tipo: "Temperos",
      produto: "Orégano",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 93,
      tipo: "Temperos",
      produto: "Páprica",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 94,
      tipo: "Temperos",
      produto: "Cominho",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 95,
      tipo: "Temperos",
      produto: "Cúrcuma",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 96,
      tipo: "Temperos",
      produto: "Erva-Doce",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
    {
      id: 97,
      tipo: "Temperos",
      produto: "Canela",
      valor: 0,
      quantidade: 1,
      cart: false,
    },
  ]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("listaGeral");
        const storedIdentificador = await AsyncStorage.getItem("identificador");
        if (storedData) {
          setListaGeral(JSON.parse(storedData));
        }
        if (storedIdentificador) {
          setIdentificador(Number(storedIdentificador));
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
        await AsyncStorage.setItem("listaGeral", JSON.stringify(listaGeral));
        await AsyncStorage.setItem("identificador", identificador.toString());
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [listaGeral, identificador]);

  return (
    <ListaGeralContext.Provider
      value={{ listaGeral, setListaGeral, identificador, setIdentificador }}
    >
      {children}
    </ListaGeralContext.Provider>
  );
};

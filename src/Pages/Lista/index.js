import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";

import ModalEditarNome from "../../../components/Modal/EditarNome";
import ModalEditarValor from "../../../components/Modal/EditarValor";
import ModalProdutoRemovidoCarrinho from "../../../components/Modal/ProdutoRemovidoCarrinho";
import ModalConfirmarApagarCarrinho from "../../../components/Modal/ConfirmarApagarCarrinho";
import ModalCarrinhoApagado from "../../../components/Modal/CarrinhoLimpo";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useListaGeralContext } from "../../Context/ListaGeralContext";
import { MotiView } from "moti";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function Lista({ navigation }) {
  const { listaGeral, setListaGeral } = useListaGeralContext();
  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(0);
  const [modalProdutoRemovido, setModalProdutoRemovido] = useState(false);
  const [confirmarApagarCarrinhoVisible, setConfirmarApagarcarrinhoVisible] =
    useState(false);
  const [carrinhoApagadoVisible, setCarrinhoApagadoVisible] = useState(false);

  const [carrinho, setCarrinho] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorCarrinho, setValorCarrinho] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#4B0082",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 30,
      },
      headerTitleAlign: "center",
    });
  }, []);
  useEffect(() => {
    const carrinhoFiltrado = listaGeral
      .filter((item) => item.cart == true)
      .sort((a, b) => a.produto.localeCompare(b.produto));
    setCarrinho(carrinhoFiltrado);
  }, [listaGeral]);

  useEffect(() => {
    let totalCarrinho = 0;
    let totalLista = 0;

    const carrinhoFiltrado = carrinho.filter((item) => item.selected == true);

    carrinho.forEach((item) => {
      totalLista += item.valor * (item.quantidade || 1);
    });
    setValorTotal(totalLista);

    carrinhoFiltrado.forEach((item) => {
      totalCarrinho += item.valor * (item.quantidade || 1);
    });

    setValorCarrinho(totalCarrinho);
  }, [carrinho]);

  const editarNome = (item) => {
    setItemToEdit(item.id);
    setModalVisibleNome(true);
  };

  const editarValor = (item) => {
    setItemToEdit(item.id);
    setModalVisibleValor(true);
  };

  const removerItem = (id) => {
    setListaGeral((listaAntiga) => {
      return listaAntiga.map((item) => {
        if (item && item.id === id) {
          setModalProdutoRemovido(true);
          return { ...item, cart: false };
        }
        return item;
      });
    });
  };

  const handleSelected = (id) => {
    setListaGeral((listaAntiga) => {
      return listaAntiga.map((item) => {
        if (item && item.id === id) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
    });
  };

  const handleConfimar = () => {
    carrinho.length > 0
      ? setConfirmarApagarcarrinhoVisible(true)
      : setCarrinhoApagadoVisible(true);
  };

  const limparLista = () => {
    setListaGeral((listaAntiga) => {
      return listaAntiga.map((item) => {
        return { ...item, cart: false, selected: false };
      });
    });
  };

  const aumentarQuantidade = (id) => {
    setListaGeral((listaAntiga) => {
      return listaAntiga.map((item) => {
        if (item.id === id) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
    });
  };

  const diminuirQuantidade = (id) => {
    setListaGeral((listaAntiga) => {
      return listaAntiga.map((item) => {
        if (item.id === id) {
          const novaQuantidade = Math.max(1, item.quantidade - 1);
          return { ...item, quantidade: novaQuantidade };
        }
        return item;
      });
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <MotiView
        style={
          item.selected
            ? [styles.listaContainer, { backgroundColor: "#FFB347" }]
            : styles.listaContainer
        }
        from={{ rotateX: "90deg", opacity: 1 }}
        animate={{ rotateX: "0deg", opacity: 1 }}
        transition={{ type: "spring", duration: 5000 + index * 90 }}
      >
        <View style={styles.superior}>
          {item.produto && item.produto.trim() !== "" && (
            <TouchableOpacity
              style={{ width: "60%" }}
              onPress={() => editarNome(item)}
            >
              <Text style={styles.nomeProduto} numberOfLines={1}>
                {" "}
                {index + 1} - {item.produto}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.unidadeProduto}
            onPress={() => editarValor(item)}
          >
            <Text style={styles.textUnidade}>
              Unidade {""}
              R$
              {(item.valor * 1 || 0).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inferior}>
          <View style={styles.editarProduto}>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => handleSelected(item.id, item, index)}
            >
              {item.selected ? (
                <MaterialCommunityIcons
                  name="cart-check"
                  size={25}
                  color="#9932CC"
                />
              ) : (
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={25}
                  color="#9932CC"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => removerItem(item.id)}
            >
              <MaterialCommunityIcons
                name="playlist-remove"
                size={25}
                color="red"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.quantidade}>
            <TouchableOpacity
              style={styles.aumentar}
              onPress={() => aumentarQuantidade(item.id)}
            >
              <AntDesign
                color={"#2f6f68"}
                size={23}
                name="up"
                style={{ textAlign: "center" }}
              />
            </TouchableOpacity>

            <View style={styles.multiplicar}>
              <Text style={styles.textMultiplicar}>
                {carrinho[index].quantidade || 1}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.diminuir}
              onPress={() => diminuirQuantidade(item.id)}
            >
              <AntDesign
                size={23}
                color={"#2f6f68"}
                name="down"
                style={{ textAlign: "center" }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.valorFinal}>
            {item.valor !== undefined && (
              <View>
                <View>
                  <Text style={styles.textTotal}>
                    R$
                    {(
                      item.valor * (carrinho[index].quantidade || 1)
                    ).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </MotiView>
    );
  };

  const createHtml = () => {
    let order = 1;

    let itemsHtml = carrinho
      .map(
        (item) => `
      <div style="display: flex; flex-direction: row; border-bottom: 1px solid #ddd; padding: 5px;">
        <p style="width: 15%; text-align: center;">${order++}</p>
        <p style="width: 50%; color: #0099cd;">${item.produto}</p>
        <p style="width: 20%; text-align: center; color: #f47f00;">${
          item.quantidade
        }</p>
      </div>
    `
      )
      .join("");

    return `
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
          body {font-family: 'Courier New'; width: 80%; height: 80%; border: 3px solid #4B0082; border-radius: 5px; padding: 5px; margin: 5% 10%;}
          p {font-size: 18px; margin: 5px;}
          h1 {text-align: center; font-size: 30px; color: #fff; width: 70%; margin-left: 15%; background-color: #4B0082; border-radius: 5px;}
        </style>
      </head>
      <body>
        <h1>Lista de Compras</h1>    
        <div> 
          <div style="display: flex; flex-direction: row; border-bottom: 1px dashed #000; padding: 5px;">
            <p style="width: 15%; text-align: center;">Ord</p>
            <p style="width: 50%; text-align: center;">Produto</p>
            <p style="width: 20%; text-align: center;">Quantidade</p>
          </div>
          ${itemsHtml}
        </div>
      </body>
      </html>
    `;
  };

  const createPdf = async () => {
    try {
      const nomeDoArquivo = "Lista de Compras.pdf";
      const { uri } = await Print.printToFileAsync({
        html: createHtml(),
        base64: false,
      });

      const novoEndereco = `${FileSystem.documentDirectory}${nomeDoArquivo}`;

      await FileSystem.moveAsync({
        from: uri,
        to: novoEndereco,
      });

      console.log("PDF salvo em:", novoEndereco);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(novoEndereco);
      }
    } catch (error) {
      console.error("Erro ao gerar ou compartilhar o  PDF:", error);
      alert("Erro ao gerar ou compartilhar o  PDF:", error);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {carrinho.length > 0 ? (
          <FlatList
            data={carrinho}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
          />
        ) : (
          <Text style={styles.textVazio}>Lista está vazia!</Text>
        )}
      </View>
      <TouchableOpacity onPress={createPdf}>
        <Text>Create PDF</Text>
      </TouchableOpacity>
      <View style={styles.resumo}>
        <View style={styles.resumoContent}>
          <Text style={styles.textText}>VALOR TOTAL DA LISTA</Text>
          <Text style={[styles.textTotal, { fontSize: 20 }]}>
            R${" "}
            {valorTotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
      <View style={styles.resumo}>
        <View style={[styles.resumoContent, { borderTopWidth: 0 }]}>
          <Text style={styles.textText}>VALOR TOTAL DO CARRINHO</Text>
          <Text style={[styles.textTotal, { fontSize: 20 }]}>
            R${" "}
            {valorCarrinho.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleConfimar()}
        onLongPress={() => alert(JSON.stringify(carrinho, null, 2))}
      >
        <Text style={styles.buttonText}>Limpar Lista</Text>
      </TouchableOpacity>
      <Modal visible={modalVisibleNome} animationType="fade" transparent={true}>
        <ModalEditarNome
          handleClose={() => setModalVisibleNome(false)}
          id={itemToEdit}
        />
      </Modal>

      <Modal
        visible={modalVisibleValor}
        animationType="fade"
        transparent={true}
      >
        <ModalEditarValor
          handleClose={() => setModalVisibleValor(false)}
          id={itemToEdit}
        />
      </Modal>

      <Modal
        visible={modalProdutoRemovido}
        animationType="fade"
        transparent={true}
      >
        <ModalProdutoRemovidoCarrinho
          handleClose={() => {
            setModalProdutoRemovido(false);
          }}
        />
      </Modal>

      <Modal
        visible={confirmarApagarCarrinhoVisible}
        animationType="fade"
        transparent={true}
      >
        <ModalConfirmarApagarCarrinho
          handleClose={() => setConfirmarApagarcarrinhoVisible(false)}
          limparLista={() => limparLista()}
          carrinhoApagadoVisible={() => setCarrinhoApagadoVisible(true)}
        />
      </Modal>

      <Modal
        visible={carrinhoApagadoVisible}
        animationType="fade"
        transparent={true}
      >
        <ModalCarrinhoApagado
          handleClose={() => {
            setCarrinhoApagadoVisible(false);
          }}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 530,
    width: "95%",
    alignSelf: "center",
  },
  listaContainer: {
    height: 70,
    borderColor: "#9932CC",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 3,
    padding: 5,
    backgroundColor: "#ffffff",
  },
  textMultiplicar: {
    color: "#000",
    textAlign: "center",
    fontSize: 25,
    justifyContent: "center",
    height: 40,
  },
  textUnidade: {
    color: "#2f6f68",
    fontSize: 15,
    width: "100%",
    textAlign: "right",
  },
  textTotal: {
    color: "#0099cd",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4B0082",
    borderRadius: 5,
    padding: 15,
    alignSelf: "center",
    elevation: 18,
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  superior: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inferior: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nomeProduto: {
    color: "#0045b1",
    fontSize: 20,
  },
  unidadeProduto: {
    flexDirection: "row",
    width: "40%",
  },
  editarProduto: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  quantidade: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "30%",
  },
  valorFinal: {
    width: "30%",
    alignItems: "flex-end",
  },
  aumentar: {
    width: "30%",
  },
  multiplicar: {
    width: "30%",
  },
  diminuir: {
    width: "30%",
  },
  resumo: {
    alignSelf: "center",
    flexDirection: "row",
  },
  resumoContent: {
    alignItems: "flex-end",
    width: "90%",
    borderTopWidth: 1,
  },
  textText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#f47f00",
  },
  textVazio: {
    top: 150,
    width: "80%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#4B0082",
  },
});

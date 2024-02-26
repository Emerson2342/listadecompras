import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
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

export default function Carrinho() {
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

  useEffect(() => {
    const carrinhoFiltrado = listaGeral
      .filter((item) => item.cart === true)
      .sort((a, b) => a.produto.localeCompare(b.produto));
    setCarrinho(carrinhoFiltrado);
  }, [listaGeral]);

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

  const handleConfimar = () => {
    carrinho.length > 0
      ? setConfirmarApagarcarrinhoVisible(true)
      : setCarrinhoApagadoVisible(true);
  };

  const limparLista = () => {
    setListaGeral((listaAntiga) => {
      return listaAntiga.map((item) => {
        return { ...item, cart: false };
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

  useEffect(() => {
    let total = 0;
    carrinho.forEach((item) => {
      total += item.valor * (item.quantidade || 1);
    });
    setValorTotal(total);
  }, [carrinho]);

  const renderItem = ({ item, index }) => (
    <View style={styles.listaContainer}>
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
            onPress={() => removerItem(item.id)}
          >
            <MaterialCommunityIcons name="cart-remove" size={25} color="red" />
          </TouchableOpacity>
        </View>

        <View style={styles.quantidade}>
          <TouchableOpacity
            style={styles.aumentar}
            onPress={() => aumentarQuantidade(item.id)}
          >
            <AntDesign
              color={"#86c694"}
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
              color={"#86c694"}
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
    </View>
  );

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
          <Text style={styles.textVazio}>Carrinho está vazio!</Text>
        )}
      </View>

      <View style={styles.resumo}>
        <View style={styles.resumoContent}>
          <Text style={styles.textText}>TOTAL</Text>
          <Text style={[styles.textTotal, { fontSize: 30 }]}>
            R${" "}
            {valorTotal.toLocaleString("pt-BR", {
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
        <Text style={styles.buttonText}>Esvaziar Carrinho</Text>
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
    color: "#123d4e",
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

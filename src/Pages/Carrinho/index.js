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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useListaGeralContext } from "../../Context/ListaGeralContext";

export default function Carrinho() {
  const { listaGeral, setListaGeral } = useListaGeralContext();

  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(0);
  const [modalProdutoRemovido, setModalProdutoRemovido] = useState(false);

  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carrinhoFiltrado = listaGeral.filter((item) => item.cart === true);
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

  const limparLista = () => {
    setListaGeral((listaAntiga) => {
      return listaAntiga.map((item) => {
        setModalProdutoRemovido(true);
        return { ...item, cart: false };
      });
    });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.listaContainer}>
      <View style={styles.superior}>
        {item.produto && item.produto.trim() !== "" && (
          <TouchableOpacity
            style={{ width: "80%" }}
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
          <View>
            <Text style={styles.textUnidade}>Unidade</Text>
          </View>
          <Text style={styles.textUnidade}>
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
            <MaterialIcons name="close" size={30} color="red" />
          </TouchableOpacity>
        </View>

        <View style={styles.quantidade}>
          <TouchableOpacity
            style={styles.aumentar}
            onPress={() => handleIncrement(index)}
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
            onPress={() => handleDecrement(index)}
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
          <Text style={styles.text}>Carrinho está vazio!</Text>
        )}
      </View>

      <View style={styles.resumo}>
        <View style={styles.resumoContent}>
          <Text style={styles.textText}>TOTAL</Text>
          <Text style={[styles.textTotal, { fontSize: 30 }]}>
            R${" "}
            {total.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => limparLista()}>
        <Text style={styles.buttonText}>Limpar Carrinho</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 15,
    height: 500,
    backgroundColor: "#ffffffff",
    elevation: 17,
    borderColor: "#9932CC",
    borderWidth: 1,
  },
  listaContainer: {
    height: 80,
    borderColor: "#9932CC",
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 5,
    marginVertical: 5,
    paddingLeft: 5,
    paddingRight: 5,
    elevation: 30,
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    top: 150,
    color: "#4B0082",
    textAlign: "center",
  },
  textLista: {
    color: "#0045b1",
    fontSize: 20,
    height: "60%",
  },

  textMultiplicar: {
    color: "#123d4e",
    textAlign: "center",
    fontSize: 30,
    justifyContent: "center",
    height: 50,
  },
  textUnidade: {
    color: "#2f6f68",
    fontSize: 15,
  },
  textTotal: {
    color: "#0099cd",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B0082",
    borderRadius: 8,
    padding: 15,
    alignSelf: "center",
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  superior: {
    width: "100%",
    height: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inferior: {
    width: "100%",
    height: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nomeProduto: {
    color: "#0045b1",
    fontSize: 20,
  },
  unidadeProduto: {
    width: "20%",
    alignItems: "flex-end",
  },
  editarProduto: {
    // backgroundColor: "#fafa",
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
    margin: 10,
    width: "93%",
    flexDirection: "row",
  },
  resumoContent: {
    alignItems: "flex-end",
    width: "100%",
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

    // backgroundColor: "#4B0082",
    fontSize: 40,
    fontWeight: "bold",
    color: "#4B0082",
  },
});

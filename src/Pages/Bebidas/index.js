import React, { useState, useEffect } from "react";
import ModalAdicionar from "../../../components/Modal/modalAdicionar";
import ModalEditarNome from "../../../components/Modal/modalEditarNome";
import ModalEditarValor from "../../../components/Modal/modalEditarValor";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useBebidasContext } from "../../Context/BebidasContext";
import { useNavigation } from "@react-navigation/native";

import { useCarrinhoContext } from "../../Context/CarrinhoContext";

export default function Bebidas() {
  const navigation = useNavigation();

  const { bebidas, setBebidas } = useBebidasContext();
  const { carrinho, setCarrinho } = useCarrinhoContext();

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [indexDoItemAEditar, setIndexDoItemAEditar] = useState(null);
  const [columns, setColumns] = useState(1);

  const [novoItem, setNovoItem] = useState({
    produto: "",
    valor: "",
    quantidade: 1,
    carrinho: false,
  });

  const addItem = () => {
    setModalVisibleAdd(true);
  };
  const editarNome = (index) => {
    setIndexDoItemAEditar(index);
    setModalVisibleNome(true);
  };

  const editarValor = (index) => {
    setIndexDoItemAEditar(index);
    setModalVisibleValor(true);
  };

  const removerItem = (indexToRemove) => {
    // Criar um novo array excluindo o item com o índice indexToRemove
    const novoArray = bebidas.filter((_, index) => index !== indexToRemove);

    // Atualizar o estado com o novo array
    setBebidas(novoArray);
  };

  const addAoCarrinho = (index) => {
    const item = bebidas[index];

    if (item.valor !== "" && item.valor !== 0) {
      // Verificar se o produto já existe no carrinho
      const produtoExistente = carrinho.find(
        (itemCarrinho) => itemCarrinho.produto === item.produto
      );

      if (produtoExistente) {
        Alert.alert("", "Produto já existe no carrinho", [{ text: "Ok" }]);
      } else {
        // Criar uma cópia do objeto antes de modificar
        const itemCarrinho = { ...item, cart: "Carrinho" };

        // Adicionar o objeto modificado ao carrinho
        setCarrinho([...carrinho, itemCarrinho]);

        setNovoItem("", "");
        Alert.alert("", "Produto adicionado ao carrinho", [{ text: "Ok" }]);
        console.log(carrinho);
      }
    } else {
      Alert.alert("", "Produto sem preço", [{ text: "Ok" }]);
    }
  };

  const confirmar = (indexToRemove) => {
    Alert.alert("", "Deseja apagar o item da bebidas?", [
      { text: "Não", onPress: () => console.log("Cancelado Exclusão") },
      { text: "Sim", onPress: () => removerItem(indexToRemove) },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.bebidasContainer}>
      <View style={styles.produtoContainer}>
        <TouchableOpacity onPress={() => editarNome(index)}>
          <Text style={styles.textProduto} numberOfLines={1}>
            {index + 1} - {item.produto}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editarValor(index)}>
          <Text style={styles.textPreco}>
            R${" "}
            {(item.valor * (1 || 1)).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => addAoCarrinho(index)}
        >
          <MaterialIcons name="shopping-cart" size={24} color="#6495ED" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => confirmar(index)}
        >
          <MaterialIcons
            style={{ top: -2 }}
            name="close"
            size={26}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.imgCarrinho}></View>
      <View style={styles.container}>
        <FlatList
          data={bebidas}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Configura o número de colunas
        />
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={addItem} style={styles.button}>
          <Text style={styles.buttonText}>Adicionar Novos Itens</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Carrinho")}
        >
          <Text style={styles.buttonText}>Itens do Carrinho</Text>
          <Image
            style={{ right: -10 }}
            source={require("../../Imagens/carrinhoPrincipal.png")}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisibleAdd} animationType="slide" transparent={true}>
        <ModalAdicionar
          handleClose={() => setModalVisibleAdd(false)}
          tipo="Bebidas"
          addItem={setBebidas}
        />
      </Modal>

      <Modal
        visible={modalVisibleNome}
        animationType="slide"
        transparent={true}
      >
        <ModalEditarNome
          handleClose={() => setModalVisibleNome(false)}
          tipo="Bebidas"
          indexDoItemAEditar={indexDoItemAEditar}
        />
      </Modal>

      <Modal
        visible={modalVisibleValor}
        animationType="slide"
        transparent={true}
      >
        <ModalEditarValor
          handleClose={() => setModalVisibleValor(false)}
          tipo="Bebidas"
          indexDoItemAEditar={indexDoItemAEditar}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 530,
    backgroundColor: "#fafafa",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    elevation: 17,
    borderColor: "#9932CC",
    borderWidth: 1,
  },
  bebidasContainer: {
    borderColor: "#9932CC",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    marginLeft: 10,
    width: "45%",
    elevation: 30,
    backgroundColor: "#ffffff",
  },

  textProduto: {
    color: "#0045b1",
    fontSize: 16,
    marginLeft: 3
  },
  textPreco: {
    fontWeight: "bold",
    color: "#4b0",
    fontSize: 17,
    marginLeft: 3
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,

  },

  button: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B0082",
    borderRadius: 8,
    padding: 15,
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    elevation: 9,
  },
  imgCarrinho: {
    position: "absolute",
    right: 20,
    top: 480,
    zIndex: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  infoContainer: {
    position: "absolute",
    top: 530,
    width: "100%",
  },
});

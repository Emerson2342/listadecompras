import React, { useState, useEffect } from "react";
import ModalItem from "../../../components/Modal";
import ModalValor from "../../../components/Modal/modalValor";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTemperosContext } from "../../Context/TemperosContext";
import { useNavigation } from "@react-navigation/native";

import { useCarrinhoContext } from "../../Context/CarrinhoContext";

export default function Temperos() {
  const navigation = useNavigation();

  const { temperos, setTemperos } = useTemperosContext();
  const { carrinho, setCarrinho } = useCarrinhoContext();

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [indexDoItemAEditar, setIndexDoItemAEditar] = useState(null);

  const [novoItem, setNovoItem] = useState({
    produto: "",
    valor: "",
    quantidade: 1,
    carrinho: false,
  });

  const addItem = () => {
    setModalVisibleAdd(true);
  };

  const editarValor = (index) => {
    setIndexDoItemAEditar(index);
    setModalVisibleValor(true);
  };

  const removerItem = (indexToRemove) => {
    // Criar um novo array excluindo o item com o índice indexToRemove
    const novoArray = temperos.filter((_, index) => index !== indexToRemove);

    // Atualizar o estado com o novo array
    setTemperos(novoArray);
  };

  /*  const addAoCarrinho = (index) => {
    const item = temperos[index];
    if (item.valor !== "" && item.valor !== 0) {
      setCarrinho([...carrinho, item]);

      setNovoItem("", "");
      Alert.alert("", "Produto adicionado ao carrinho", [{ text: "Ok" }]);
      console.log(carrinho);
    } else {
      Alert.alert("", "Produto sem preço", [{ text: "Ok" }]);
    }
  }; */

  const addAoCarrinho = (index) => {
    const item = temperos[index];

    if (item.valor !== "" && item.valor !== 0) {
      // Criar uma cópia do objeto antes de modificar
      const itemCarrinho = { ...item, cart: "Carrinho" };

      // Adicionar o objeto modificado ao carrinho
      setCarrinho([...carrinho, itemCarrinho]);

      setNovoItem("", "");
      Alert.alert("", "Produto adicionado ao carrinho", [{ text: "Ok" }]);
      console.log(carrinho);
    } else {
      Alert.alert("", "Produto sem preço", [{ text: "Ok" }]);
    }
  };

  const confirmar = (indexToRemove) => {
    Alert.alert("", "Deseja apagar o item da temperos?", [
      { text: "Não", onPress: () => console.log("Cancelado Exclusão") },
      { text: "Sim", onPress: () => removerItem(indexToRemove) },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.temperosContainer}>
      <View style={styles.produtoContainer}>
        <Text style={styles.textProduto}>
          {index + 1} - {item.produto}
        </Text>
        <View>
          <Text style={styles.textPreco}>
            R$ {""}
            {(item.valor * (1 || 1)).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => addAoCarrinho(index)}
        >
          <MaterialIcons name="shopping-cart" size={24} color="#613128" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => editarValor(index)}
        >
          <FontAwesome name="dollar" size={20} color="green" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => confirmar(index)}
        >
          <MaterialIcons name="close" size={26} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View>
      <View style={styles.imgCarrinho}></View>
      <View style={styles.container}>
        <FlatList
          data={temperos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Configura o número de colunas
        />
      </View>
      <View style={{ top: 10 }}>
        <TouchableOpacity onPress={addItem} style={styles.button}>
          <Text style={styles.buttonText}>Adicionar Novos Itens</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: "center", top: 10 }}
          onPress={() => navigation.navigate("Carrinho")}
        >
          <Image source={require("../../Imagens/carrinho.png")} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={exibirTemperos} style={styles.button}>
          <Text style={styles.buttonText}>Mostrar Itens</Text>
        </TouchableOpacity> */}
      </View>
      <Modal visible={modalVisibleAdd} animationType="fade" transparent={true}>
        <ModalItem
          handleClose={() => setModalVisibleAdd(false)}
          tipo="Temperos"
          addItem={setTemperos}
        />
      </Modal>

      <Modal
        visible={modalVisibleValor}
        animationType="fade"
        transparent={true}
      >
        <ModalValor
          handleClose={() => setModalVisibleValor(false)}
          tipo="Temperos"
          indexDoItemAEditar={indexDoItemAEditar}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 400,
    backgroundColor: "#fafafa",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    elevation: 17,
    borderColor: "#000",
    borderWidth: 1,
  },
  temperosContainer: {
    //backgroundColor: "#f2e6ff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    marginLeft: 10,
    width: "45%",
    elevation: 30,
    backgroundColor: "#ffffff",
  },

  textProduto: {
    color: "#0045b1",
    top: -10,
    fontSize: 17,
  },
  textPreco: {
    fontWeight: "bold",
    color: "#0099cd",
    fontSize: 17,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    bottom: -10,
  },

  button: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8000ff",
    borderRadius: 8,
    padding: 15,
    alignSelf: "center",
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
});

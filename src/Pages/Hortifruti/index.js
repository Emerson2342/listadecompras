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
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useHortifrutiContext } from "../../Context/HortifrutiContext";

import { useCarrinhoContext } from "../../Context/CarrinhoContext";

export default function Hortifruti() {
  const { hortifruti, setHortifruti } = useHortifrutiContext();
  const { carrinho, setCarrinho } = useCarrinhoContext();

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [indexDoItemAEditar, setIndexDoItemAEditar] = useState(null);

  const [novoItem, setNovoItem] = useState({
    produto: "",
    valor: "",
    quantidade: 1,
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
    const novoArray = hortifruti.filter((_, index) => index !== indexToRemove);

    // Atualizar o estado com o novo array
    setHortifruti(novoArray);
  };

  const addAoCarrinho = (index) => {
    const item = hortifruti[index];
    if (item.valor !== "" && item.valor !== 0) {
      setCarrinho([...carrinho, item]);
      setNovoItem("", "");
      Alert.alert("", "Produto adicionado ao carrinho", [{ text: "Ok" }]);
      console.log(carrinho);
    } else {
      Alert.alert("", "Produto sem preço", [{ text: "Ok" }]);
    }
  };

  const exibirHortifruti = () => {
    const mensagem = hortifruti
      .map((item, index) => {
        return `Tipo: ${item.tipo}\nProduto: ${item.produto}\nValor: R$ ${item.valor}\nQuantidade: ${item.quantidade}\n`;
      })
      .join("\n");

    Alert.alert("Informações dos Itens", mensagem);
  };

  const confirmar = (indexToRemove) => {
    Alert.alert("", "Deseja apagar o item da hortifruti?", [
      { text: "Não", onPress: () => console.log("Cancelado Exclusão") },
      { text: "Sim", onPress: () => removerItem(indexToRemove) },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.hortifrutiContainer}>
      <View style={styles.produtoContainer}>
        <Text style={styles.textProduto}>
          {index + 1} - {item.produto}
        </Text>
        <View style={styles.precoContainer}>
          <Text style={styles.textPreco}>R${item.valor}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => addAoCarrinho(index)}
        >
          <MaterialIcons name="shopping-cart" size={24} color="green" />
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
      <View style={styles.container}>
        <FlatList
          data={hortifruti}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Configura o número de colunas
        />
      </View>

      <TouchableOpacity style={[styles.button, { top: 430 }]} onPress={addItem}>
        <Text style={styles.buttonText}>Adicionar Itens</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { top: 500 }]}
        onPress={exibirHortifruti}
      >
        <Text style={styles.buttonText}>Mostrar Itens</Text>
      </TouchableOpacity>

      <Modal visible={modalVisibleAdd} animationType="fade" transparent={true}>
        <ModalItem
          handleClose={() => setModalVisibleAdd(false)}
          tipo="Hortifruti"
          addItem={setHortifruti}
        />
      </Modal>

      <Modal
        visible={modalVisibleValor}
        animationType="fade"
        transparent={true}
      >
        <ModalValor
          handleClose={() => setModalVisibleValor(false)}
          tipo="Hortifruti"
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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  hortifrutiContainer: {
    backgroundColor: "#f2e6ff",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    marginLeft: 10,
    width: "45%",
  },

  textProduto: {
    fontSize: 17,
  },
  textPreco: {
    fontSize: 15,
    color: "blue",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },

  button: {
    top: 410,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8000ff",
    borderRadius: 8,
    padding: 15,
    alignSelf: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
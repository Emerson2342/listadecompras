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
import { useNavigation } from "@react-navigation/native";
import { useListaGeralContext } from "../../Context/ListaGeralContext";

export default function Limpeza() {
  const navigation = useNavigation();

  const { identificador, listaGeral, setListaGeral } = useListaGeralContext();

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(0);

  const [limpeza, setLimpeza] = useState([]);

  useEffect(() => {
    const listaLimpeza = listaGeral.filter((item) => item.tipo === "Limpeza");
    setLimpeza(listaLimpeza);
  }, [listaGeral]);

  const editarNome = (item) => {
    setItemToEdit(item.id);
    setModalVisibleNome(true);
  };

  const editarValor = (item) => {
    setItemToEdit(item.id);
    setModalVisibleValor(true);
  };

  const removerItem = (indexToRemove) => {
    // Criar um novo array excluindo o item com o índice indexToRemove
    const novoArray = listaGeral.filter((_, index) => index !== indexToRemove);

    // Atualizar o estado com o novo array
    setListaGeral(novoArray);
  };

  const addAoCarrinho = (id) => {
    setListaGeral((listaAntiga) => {
      return listaAntiga.map((item) => {
        if (item.id === id) {
          if (item.cart) {
            Alert.alert("", "O Produto já está no carrinho");
          } else Alert.alert("", "Produto adicionado ao carrinho!");
          return { ...item, cart: true };
        }
        return item;
      });
    });
  };

  const confirmar = (indexToRemove) => {
    Alert.alert("", "Deseja apagar o item da limpeza?", [
      { text: "Não", onPress: () => console.log("Cancelado Exclusão") },
      { text: "Sim", onPress: () => removerItem(indexToRemove) },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.limpezaContainer}>
      <TouchableOpacity onPress={() => editarNome(item)}>
        <Text style={styles.textProduto} numberOfLines={1}>
          {index + 1} - {item.produto}
        </Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => addAoCarrinho(item.id)}
        >
          <MaterialIcons name="shopping-cart" size={24} color="#6495ED" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editarValor(item)}>
          <Text style={styles.textPreco}>
            R${" "}
            {(item.valor * (1 || 1)).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
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
          data={limpeza}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => setModalVisibleAdd(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar Novos Itens</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Carrinho")}
          onLongPress={() => alert(JSON.stringify(listaGeral, null, 2))}
        >
          <Text style={styles.buttonText}>Itens do Carrinho</Text>
          <Image
            style={{ right: -10 }}
            source={require("../../Imagens/carrinhoPrincipal.png")}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisibleAdd} animationType="fade" transparent={true}>
        <ModalAdicionar
          handleClose={() => setModalVisibleAdd(false)}
          tipo={"Limpeza"}
        />
      </Modal>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 530,
    alignItems: "center",
    backgroundColor: "#ffffffff",
    elevation: 17,
    borderColor: "#9932CC",
    borderWidth: 1,
  },
  limpezaContainer: {
    borderColor: "#9932CC",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    marginLeft: 10,
    width: "45%",
    elevation: 30,
    backgroundColor: "#ffffff",
    height: 60,
  },

  textProduto: {
    color: "#0045b1",
    fontSize: 16,
    marginLeft: 3,
  },
  textPreco: {
    fontWeight: "bold",
    color: "#4b0",
    fontSize: 17,
    marginLeft: 3,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    //  backgroundColor: "#cece",
    alignItems: "center",
    height: "85%",
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
});

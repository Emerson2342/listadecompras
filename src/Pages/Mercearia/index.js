import React, { useState, useEffect } from "react";
import ModalAdicionar from "../../../components/Modal/AdicionarNovoProduto";
import ModalEditarNome from "../../../components/Modal/EditarNome";
import ModalEditarValor from "../../../components/Modal/EditarValor";
import ModalAddCarrinho from "../../../components/Modal/AddCarrinho";
import ModalProdutoRemovidoCarrinho from "../../../components/Modal/ProdutoRemovidoCarrinho"
import ModalApagarProduto from "../../../components/Modal/ApagarProduto";
import ModalProdutoRemovido from "../../../components/Modal/ProdutoRemovido";
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
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from 'react-native-vector-icons'
import { useNavigation } from "@react-navigation/native";
import { useListaGeralContext } from "../../Context/ListaGeralContext";

export default function Mercearia() {
  const navigation = useNavigation();
  const { identificador, listaGeral, setListaGeral } = useListaGeralContext();

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [modalAddCarrinhoVisible, setModalAddCarrinhoVisible] = useState(false);
  const [modalRemovidoCarrinho, setModalRemovidoCarrinho] = useState(false);
  const [modalApagarProdutoVisible, setModalApagarProdutoVisible] = useState(false);
  const [ModalProdutoRemovidoVisible, setProdutoRemovidoVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(0);

  const [Mercearia, setMercearia] = useState([]);

  useEffect(() => {
    const listaMercearia = listaGeral.filter((item) => item.tipo === "Mercearia")
      .sort((a, b) => a.produto.localeCompare(b.produto));
    setMercearia(listaMercearia);
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
      const novaLista = listaAntiga.filter((item) => item.id !== id);
      setProdutoRemovidoVisible(true);
      return novaLista;
    });
  };

  const addAoCarrinho = (id) => {
    setListaGeral((listaAntiga) => {
      return listaAntiga.map((item) => {
        if (item.id === id) {
          item.cart ? setModalRemovidoCarrinho(true) : setModalAddCarrinhoVisible(true)
          return { ...item, cart: !item.cart };
        }
        return item;
      });
    });
  };

  const confirmar = (id) => {
    setItemToEdit(id)
    setModalApagarProdutoVisible(true)
  };


  const renderItem = ({ item, index }) => (
    <View style={styles.MerceariaContainer}>
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
          <MaterialCommunityIcons name={item.cart ? "cart" : 'cart-variant'} size={24} color="#4B0082" />
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
          onPress={() => confirmar(item.id)}
        >
          <MaterialIcons
            style={{ top: -2 }}
            name="delete-forever"
            size={24}
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
          data={Mercearia}
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
          onLongPress={() => alert(JSON.stringify(Mercearia, null, 2))}
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
          tipo={"Mercearia"}

        />
      </Modal>

      <Modal visible={modalApagarProdutoVisible} animationType="fade" transparent={true}>
        <ModalApagarProduto
          handleClose={() => setModalApagarProdutoVisible(false)}
          removerItem={() => removerItem(itemToEdit)}
          item={itemToEdit}
        />
      </Modal>

      <Modal
        visible={ModalProdutoRemovidoVisible}
        animationType="fade"
        transparent={true}
      >
        <ModalProdutoRemovido
          handleClose={() => setProdutoRemovidoVisible(false)} />
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

      <Modal
        visible={modalAddCarrinhoVisible}
        animationType="fade"
        transparent={true}
      >
        <ModalAddCarrinho
          handleClose={() => setModalAddCarrinhoVisible(false)}
        />
      </Modal>

      <Modal
        visible={modalRemovidoCarrinho}
        animationType="fade"
        transparent={true}
      >
        <ModalProdutoRemovidoCarrinho
          handleClose={() => setModalRemovidoCarrinho(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 560,
    width: "95%",
    alignSelf: "center",
  },
  MerceariaContainer: {
    borderColor: "#9932CC",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: "48%",
    // elevation: 30,
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

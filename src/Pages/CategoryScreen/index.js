import React, { useState, useEffect } from "react";
import ModalAdicionar from "../../../components/Modal/AdicionarNovoProduto";
import ModalEditarNome from "../../../components/Modal/EditarNome";
import ModalEditarValor from "../../../components/Modal/EditarValor";
import ModalAddCarrinho from "../../../components/Modal/AddCarrinho";
import ModalProdutoRemovidoCarrinho from "../../../components/Modal/ProdutoRemovidoCarrinho";
import ModalApagarProduto from "../../../components/Modal/ApagarProduto";
import ModalProdutoRemovido from "../../../components/Modal/ProdutoRemovido";
import ModalSemPreco from "../../../components/Modal/SemPreco";
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
import {
  MaterialIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import { useListaGeralContext } from "../../Context/ListaGeralContext";

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: category,
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
  }, [navigation]);

  const { listaGeral, setListaGeral } = useListaGeralContext();

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [modalAddCarrinhoVisible, setModalAddCarrinhoVisible] = useState(false);
  const [modalRemovidoCarrinho, setModalRemovidoCarrinho] = useState(false);
  const [modalApagarProdutoVisible, setModalApagarProdutoVisible] =
    useState(false);

  const [modalAvisoPreco, setModalAvisoPreco] = useState(false);
  const [ModalProdutoRemovidoVisible, setProdutoRemovidoVisible] =
    useState(false);
  const [itemToEdit, setItemToEdit] = useState(0);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const categoryList = listaGeral
      .filter((item) => item.tipo === category)
      .sort((a, b) => a.produto.localeCompare(b.produto));
    setCategoryList(categoryList);
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

  const addAoCarrinho = (id, item) => {
    item.valor <= 0
      ? setModalAvisoPreco(true)
      : setListaGeral((listaAntiga) => {
          return listaAntiga.map((item) => {
            if (item.id === id) {
              item.cart
                ? setModalRemovidoCarrinho(true)
                : setModalAddCarrinhoVisible(true);
              return { ...item, cart: !item.cart };
            }
            return item;
          });
        });
  };

  const confirmar = (id) => {
    setItemToEdit(id);
    setModalApagarProdutoVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity onPress={() => editarNome(item)}>
        <Text style={styles.textProduto} numberOfLines={1}>
          {index + 1} - {item.produto}
        </Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => addAoCarrinho(item.id, item)}
        >
          <MaterialCommunityIcons
            name={item.cart ? "cart" : "cart-variant"}
            size={24}
            color="#4B0082"
          />
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
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <FlatList
          data={categoryList}
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
          <Text style={styles.buttonText}>Adicionar Novo Produto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Lista")}
          onLongPress={() => alert(JSON.stringify(categoryList, null, 2))}
        >
          <Text style={styles.buttonText}>Itens da Lista</Text>
          <Image
            style={{ right: "-30%" }}
            source={require("../../Imagens/list.png")}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisibleAdd} animationType="fade" transparent={true}>
        <ModalAdicionar
          handleClose={() => setModalVisibleAdd(false)}
          tipo={category}
        />
      </Modal>

      <Modal
        visible={modalApagarProdutoVisible}
        animationType="fade"
        transparent={true}
      >
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
          handleClose={() => setProdutoRemovidoVisible(false)}
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

      <Modal visible={modalAvisoPreco} animationType="fade" transparent={true}>
        <ModalSemPreco handleClose={() => setModalAvisoPreco(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 560,
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  categoryContainer: {
    borderColor: "#9932CC",
    borderWidth: 1,
    borderRadius: 3,
    marginLeft: "2%",
    marginRight: "2%",
    marginVertical: 3,
    width: "46%",
    backgroundColor: "#fff",
    height: 65,
    elevation: 3,
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
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
    height: "85%",
  },

  button: {
    marginTop: "2%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B0082",
    borderRadius: 8,
    padding: 15,
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

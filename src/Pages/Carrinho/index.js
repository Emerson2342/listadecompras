import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useCarrinhoContext } from "../../Context/CarrinhoContext";
import { useListaContext } from "../../Context/ListaContext";

export default function Carrinho() {
  const { carrinho, setCarrinho } = useCarrinhoContext();

  const [incrementos, setIncrementos] = useState({});

  const exibirCarrinho = () => {
    const mensagem = carrinho
      .map((item, index) => {
        return `Produto: ${item.produto}\nPreço: R$ ${item.valor}\nQuantidade: ${item.quantidade}\n`;
      })
      .join("\n");

    Alert.alert("Informações dos Itens", mensagem);
  };

  const removerItem = (indexToRemove) => {
    // Criar um novo array excluindo o item com o índice indexToRemove
    const novoArray = carrinho.filter((item, index) => index !== indexToRemove);

    // Atualizar o estado com o novo array
    setCarrinho(novoArray);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const confirmarApagarItem = (index) => {
    Alert.alert("", "Deseja apagar o item da lista?", [
      { text: "Não", onPress: () => console.log("Cancelado Exclusão") },
      { text: "Sim", onPress: () => removerItem(index) },
    ]);
  };

  const confirmarApagarCarrinho = (index) => {
    Alert.alert("", "Deseja apagar todos os itens do carrinho?", [
      { text: "Não", onPress: () => console.log("Cancelada Exclusão") },
      { text: "Sim", onPress: () => limparCarrinho() },
    ]);
  };
  const handleIncrement = (index) => {
    setIncrementos((prevIncrementos) => ({
      ...prevIncrementos,
      [index]: (prevIncrementos[index] || 1) + 1,
    }));
  };

  const handleDecrement = (index) => {
    setIncrementos((prevIncrementos) => ({
      ...prevIncrementos,
      [index]: Math.max((prevIncrementos[index] || 0) - 1, 0),
    }));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.listaContainer}>
      <View style={styles.produto}>
        {item.produto && item.produto.trim() !== "" && (
          <Text style={styles.textLista}>
            {index + 1} - {item.produto}
          </Text>
        )}
        <View style={styles.edit}>
          <TouchableOpacity>
            <MaterialIcons name="mode-edit" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContent}
            onPress={() => confirmarApagarItem(index)}
          >
            <MaterialIcons name="clear" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quantidade}>
        <TouchableOpacity
          style={styles.aumentar}
          onPress={() => handleIncrement(index)}
        >
          <AntDesign size={25} name="upcircleo" />
        </TouchableOpacity>

        <View style={styles.multiplicar}>
          <Text style={styles.textMultiplicar}>{incrementos[index] || 1}</Text>
        </View>

        <TouchableOpacity
          style={styles.diminuir}
          onPress={() => handleDecrement(index)}
        >
          <AntDesign size={25} name="downcircleo" />
        </TouchableOpacity>
      </View>

      {item.valor !== undefined && (
        <View style={styles.valor}>
          <View style={styles.unidade}>
            <Text style={styles.textUnidade}>Unidade R${item.valor}</Text>
          </View>

          <View style={styles.total}>
            <Text style={styles.textTotal}>
              R${item.valor * (incrementos[index] || 1)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={carrinho}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1} // Configura o número de colunas
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { top: 500 }]}
        onPress={exibirCarrinho}
      >
        <Text style={styles.buttonText}>Mostrar Carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { top: 430 }]}
        onPress={confirmarApagarCarrinho}
      >
        <Text style={styles.buttonText}>Limpar Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 15,
    maxHeight: 400,
    backgroundColor: "#fff",
  },
  listaContainer: {
    height: 80,
    backgroundColor: "#f2e6ff",
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  edit: {
    height: "40%",
    flexDirection: "row",
    backgroundColor: "#000",
    //justifyContent: "space-between",
  },
  textLista: {
    fontSize: 15,
    height: "60%",
  },
  produto: {
    width: "40%",
    backgroundColor: "#ccc",
  },
  quantidade: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "25%",
    backgroundColor: "#dada",
  },
  textMultiplicar: {
    fontSize: 20,
  },
  valor: {
    width: "35%",
    backgroundColor: "#cccc",
  },
  textUnidade: {
    fontSize: 15,
  },
  textTotal: {
    fontSize: 20,
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

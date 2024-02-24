import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const data = [
  { id: "1", category: "Limpeza" },
  // { id: "2", category: "Bebidas" },
  //{ id: "3", category: "Higiene Pessoal" },
  //{ id: "4", category: "Hortifruti" },
  //{ id: "5", category: "Temperos" },
  //{ id: "6", category: "Mercearia" },
  //{ id: "7", category: "Açougue" },
  // Adicione mais itens conforme necessário
];

const imageMapping = {
  Limpeza: require("../../Imagens/limpeza.jpg"),
  //  Bebidas: require("../../Imagens/bebidas.jpg"),
  // "Higiene Pessoal": require("../../Imagens/higienePessoal.jpg"),
  //Hortifruti: require("../../Imagens/hortifruti.jpg"),
  //Temperos: require("../../Imagens/temperos.jpg"),
  //Mercearia: require("../../Imagens/mercearia.jpg"),
  //Açougue: require("../../Imagens/acougue.jpg"),
};

export default function Principal() {
  const navigation = useNavigation();

  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.lista}
      onPress={() => navigateToPage(item.category)}
    >
      <ImageBackground source={imageMapping[item.category]} style={styles.img}>
        <Text style={styles.text}>{item.category}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2} // Pode ajustar o número de colunas conforme necessário
        />
      </View>

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
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    margin: 0,
    backgroundColor: "#ffff",
    alignItems: "center",
  },
  lista: {
    margin: 3,
    height: 120,
    justifyContent: "center",
  },
  text: {
    color: "#363636",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  img: {
    height: 105,
    width: 169,
    borderRadius: 7,
    overflow: "hidden",
    borderColor: "#9932CC",
    borderWidth: 3,
  },
  button: {
    marginTop: -150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B0082",
    borderRadius: 8,
    padding: 15,
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    elevation: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    left: -10,
  },
});

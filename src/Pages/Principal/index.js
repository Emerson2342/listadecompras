import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useListaGeralContext } from "../../Context/ListaGeralContext";
import { MotiView } from "moti";

const data = [
  { id: "1", category: "Limpeza" },
  { id: "2", category: "Bebidas" },
  { id: "3", category: "Higiene Pessoal" },
  { id: "4", category: "Hortifruti" },
  { id: "5", category: "Temperos" },
  { id: "6", category: "Mercearia" },
  { id: "7", category: "Carnes" },
];

const imageMapping = {
  Limpeza: require("../../Imagens/limpeza.jpg"),
  Bebidas: require("../../Imagens/bebidas.jpg"),
  "Higiene Pessoal": require("../../Imagens/higienePessoal.jpg"),
  Hortifruti: require("../../Imagens/hortifruti.jpg"),
  Temperos: require("../../Imagens/temperos.jpg"),
  Mercearia: require("../../Imagens/mercearia.jpg"),
  Carnes: require("../../Imagens/acougue.jpg"),
};

export default function Principal({ navigation }) {
  const { listaGeral } = useListaGeralContext();
  const [keyAnimation, setKeyAnimation] = useState(1);

  useFocusEffect(
    React.useCallback(() => {
      setKeyAnimation(keyAnimation + 1);

      return () => {
        const timer = setTimeout(() => {
          setKeyAnimation(keyAnimation);
        }, 1000);
        return () => clearTimeout(timer);
      };
    }, [])
  );

  const navigateToPage = (category) => {
    navigation.navigate("Category", { category });
  };
  useEffect(() => {
    navigation.setOptions({
      title: "Seja Bem Vindo(a)",
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

  const renderItem = ({ item, index }) => {
    const index1 = index % 2;
    return (
      <MotiView
        key={keyAnimation}
        from={{ translateX: index1 == 1 ? 100 : -100 }}
        animate={{ translateX: 0 }}
        transition={{ type: "spring", duration: 6300 }}
        style={styles.lista}
      >
        <TouchableOpacity onPress={() => navigateToPage(item.category)}>
          <ImageBackground
            source={imageMapping[item.category]}
            style={styles.img}
          >
            <Text style={styles.text}>{item.category}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </MotiView>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Lista")}
        onLongPress={() => alert(JSON.stringify(listaGeral, null, 2))}
      >
        <Text style={styles.buttonText}>Itens da Lista</Text>

        <Image
          style={{ right: "-30%" }}
          source={require("../../Imagens/list.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lista: {
    margin: "3%",
  },
  text: {
    fontStyle: "italic",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  img: {
    height: 105,
    width: 169,
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "#9932CC",
    borderWidth: 3,
  },
  button: {
    marginBottom: "15%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B0082",
    borderRadius: 8,
    padding: 15,
    width: "70%",
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useListaGeralContext } from "../../Context/ListaGeralContext";
import { MotiView } from "moti";

const data = [
  { id: "1", category: "Limpeza" },
  { id: "2", category: "Bebidas" },
  { id: "3", category: "Higiene Pessoal" },
  { id: "4", category: "Hortifruti" },
  { id: "5", category: "Temperos" },
  { id: "6", category: "Mercearia" },
  { id: "7", category: "Açougue" },

];

const imageMapping = {
  Limpeza: require("../../Imagens/limpeza.jpg"),
  Bebidas: require("../../Imagens/bebidas.jpg"),
  "Higiene Pessoal": require("../../Imagens/higienePessoal.jpg"),
  Hortifruti: require("../../Imagens/hortifruti.jpg"),
  Temperos: require("../../Imagens/temperos.jpg"),
  Mercearia: require("../../Imagens/mercearia.jpg"),
  Açougue: require("../../Imagens/acougue.jpg"),
};

export default function Principal({ navigation }) {
  const { listaGeral } = useListaGeralContext();
  const [keyAnimation, setKeyAnimation] = useState(1);
  const [focusHome, setFocusHome] = useState(true);

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

  //const navigation = useNavigation();

  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
  };

  const renderItem = ({ item, index }) => {

    const index1 = index % 2;
    return (

      <MotiView
        key={keyAnimation}
        from={{ translateX: index1 == 1 ? 100 : -100 }}
        animate={{ translateX: 0 }}
        transition={{ type: 'spring', duration: 6300 }}
        style={styles.lista}
      >
        <TouchableOpacity
          onPress={() => navigateToPage(item.category)}
        >
          <ImageBackground source={imageMapping[item.category]} style={styles.img}>
            <Text style={styles.text}>{item.category}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </MotiView>
    )
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    margin: '3%'
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
    marginBottom: '15%',
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

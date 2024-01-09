import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Principal() {
  const navigation = useNavigation();

  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToPage("Limpeza")}
      >
        <Text style={styles.buttonText}> Limpeza</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToPage("Bebidas")}
      >
        <Text style={styles.buttonText}>Bebidas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToPage("HigienePessoal")}
      >
        <Text style={styles.buttonText}>Higiene Pessoal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToPage("Hortifruti")}
      >
        <Text style={styles.buttonText}>Hortifruti</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToPage("Temperos")}
      >
        <Text style={styles.buttonText}>Temperos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToPage("Carrinho")}
      >
        <Text style={styles.buttonText}>Carrinho</Text>
      </TouchableOpacity>
      {/* Adicione mais TouchableOpacity conforme necessário */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
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

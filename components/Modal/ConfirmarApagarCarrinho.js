import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React from "react";

export default function ModalConfirmarApagarCarrinho({
  handleClose,
  limparLista,
  carrinhoApagadoVisible,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Deseja realmente esvaziar o carrinho ?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleClose()}>
            <Text style={[styles.buttonConfirmarText, { color: "#4B0082" }]}>
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4b0082" }]}
            onPress={() => {
              limparLista();
              handleClose();
              carrinhoApagadoVisible();
            }}
          >
            <Text style={styles.buttonConfirmarText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.7)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //  opacity: "20%",
  },
  content: {
    backgroundColor: "#fff",
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "rgb(75, 0, 130)",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4B0082",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
    borderWidth: 1,
    borderRadius: 7,
    borderBlockColor: "#4B0082",
    width: "45%",
    elevation: 20,
    backgroundColor: "#fff",
  },
  buttonConfirmarText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

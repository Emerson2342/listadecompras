import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { useListaGeralContext } from "../../src/Context/ListaGeralContext";

export default function ModalEditarNome({ handleClose, id }) {
  const { listaGeral, setListaGeral } = useListaGeralContext();

  const [novoItem, setNovoItem] = useState({
    id: id,
    produto: "",
  });

  const alterarProduto = () => {
    const novoProduto = novoItem.produto;

    if (!isNaN(novoProduto) && novoItem.produto.trim() !== "") {
      setListaGeral((listaAntiga) => {
        return listaAntiga.map((item) => {
          if (item.id === novoItem.id) {
            return { ...item, produto: novoItem.produto };
          }
          return item;
        });
      });

      setNovoItem({
        id: 0,
        produto: "",
      });
      handleClose();
    } else {
      Alert.alert("", "Favor digitar um nome válido.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Digite o novo nome do produto</Text>
        <View style={styles.precoInputer}>
          <TextInput
            style={styles.input}
            value={novoItem.produto}
            onChangeText={(text) =>
              setNovoItem({
                ...novoItem,
                produto: text,
              })
            }
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={{ color: "#4B0082", fontWeight: "bold" }}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={() => alterarProduto()}
          >
            <Text style={styles.buttonSaveText}>Alterar nome</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.8)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  input: {
    fontSize: 20,
    textAlign: "center",
    width: "100%",
    color: "#0045b1",
  },
  precoInputer: {
    width: "85%",
    height: 40,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderBlockColor: "#4B0082",
    elevation: 15,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 20,
    marginBottom: 15,
    color: "#4b0082",
  },
  buttonArea: {
    flexDirection: "row",
    width: "85%",
    marginTop: 8,
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
  buttonSave: {
    backgroundColor: "#4B0082",
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

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

export default function ModalEditarValor({ handleClose, id }) {
  const { listaGeral, setListaGeral } = useListaGeralContext();

  const [novoItem, setNovoItem] = useState({
    id: id,
    valor: "",
  });

  const alterarValor = () => {
    if (!isNaN(novoItem.valor) && novoItem.valor.trim() !== "") {
      setListaGeral((listaAntiga) => {
        return listaAntiga.map((item) => {
          if (item.id === novoItem.id) {
            return { ...item, valor: novoItem.valor };
          }
          return item;
        });
      });

      setNovoItem({
        id: 0,
        valor: "",
      });
      handleClose();
    } else {
      Alert.alert("", "Favor digitar um valor válido.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Digite o novo valor do produto</Text>
        <Text style={[styles.titulo, { color: "#0045b1", marginBottom: 10 }]}>
          {novoItem.produto}
        </Text>
        <View style={styles.precoInputer}>
          <Text style={styles.cifra}>R$</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o novo valor"
            value={novoItem.valor ? novoItem.valor.toString() : ""}
            onChangeText={(text) =>
              setNovoItem({
                ...novoItem,
                valor: text.replace(",", "."),
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
            onPress={() => alterarValor()}
          >
            <Text style={styles.buttonSaveText}>Alterar Valor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.9)",
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
    borderColor: "#4B0082",
  },
  input: {
    width: "90%",
    fontSize: 20,
    color: "#4b0",
  },
  titulo: {
    fontSize: 20,
    color: "#4b0082",
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
  cifra: {
    textAlign: "right",
    width: "10%",
    textAlignVertical: "center",
    fontSize: 20,
    color: "#4b0",
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

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import React, { useState } from "react";

import { useListaGeralContext } from "../../src/Context/ListaGeralContext";
import ModalPrecoValido from "./PrecoValido";

export default function ModalEditarValor({ handleClose, id }) {
  const { listaGeral, setListaGeral } = useListaGeralContext();

  const [precoValidoVisible, setPrecoValidoVisible] = useState(false);

  const itemAtual = listaGeral.find((item) => item.id === id);

  const [novoValor, setNovoValor] = useState({
    id: id,
    valor: itemAtual ? itemAtual.valor : 0,
  });

  const alterarValor = () => {
    if (!isNaN(novoValor.valor) && novoValor.valor.trim() !== "") {
      setListaGeral((listaAntiga) => {
        return listaAntiga.map((item) => {
          if (item.id === novoValor.id) {
            return { ...item, valor: novoValor.valor };
          }
          return item;
        });
      });

      setNovoValor({
        id: 0,
        valor: "",
      });
      handleClose();
    } else {
      setPrecoValidoVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Digite o novo valor do produto</Text>
        <Text style={[styles.titulo, { color: "#0045b1", marginBottom: 10 }]}>
          {itemAtual.produto}
        </Text>
        <View style={styles.precoInputer}>
          <Text style={styles.cifra}>R$</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o novo valor"
            value={novoValor.valor ? novoValor.valor.toString() : ""}
            onChangeText={(text) =>
              setNovoValor({
                ...novoValor,
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

      <Modal visible={precoValidoVisible} transparent={true} transition="fade">
        <ModalPrecoValido handleClose={() => setPrecoValidoVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.7)",
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

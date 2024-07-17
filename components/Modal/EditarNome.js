import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { useListaGeralContext } from "../../src/Context/ListaGeralContext";
import ModalProdutoJaCadastrado from "./ProdutoJaCadastrado";
import ModalNomeValido from "./NomeValido";

export default function ModalEditarNome({ handleClose, id }) {
  const { listaGeral, setListaGeral } = useListaGeralContext();

  const [produtoJaCadastrado, setProdutoJaCadastrado] = useState(false);
  const [nomeValidoVisible, setNomeValidoVisible] = useState(false);
  const itemAtual = listaGeral.find((item) => item.id === id);

  const [novoNome, setNovoNome] = useState({
    id: id,
    produto: itemAtual ? itemAtual.produto : "",
  });

  const alterarNome = () => {
    const novoProduto = novoNome.produto.trim();
    const produtoExistente = listaGeral.find(
      (item) => item.produto === novoProduto
    );

    if (produtoExistente) {
      setProdutoJaCadastrado(true);
    } else {
      if (novoProduto !== "") {
        setListaGeral((listaAntiga) => {
          return listaAntiga.map((item) => {
            if (item.id === novoNome.id) {
              return { ...item, produto: novoProduto };
            }
            return item;
          });
        });

        setNovoNome({
          id: 0,
          produto: "",
        });
        handleClose();
      } else {
        setNomeValidoVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Digite o novo nome do produto</Text>
        <View style={styles.precoInputer}>
          <TextInput
            style={styles.input}
            value={novoNome.produto}
            onChangeText={(text) =>
              setNovoNome({
                ...novoNome,
                produto: text,
              })
            }
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={() => handleClose()}>
            <Text style={{ color: "#4B0082", fontWeight: "bold" }}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={() => alterarNome()}
          >
            <Text style={styles.buttonSaveText}>Alterar nome</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={produtoJaCadastrado} transparent={true} transition="fade">
        <ModalProdutoJaCadastrado
          handleClose={() => setProdutoJaCadastrado(false)}
        />
      </Modal>
      <Modal visible={nomeValidoVisible} transparent={true} transition="fade">
        <ModalNomeValido handleClose={() => setNomeValidoVisible(false)} />
      </Modal>
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

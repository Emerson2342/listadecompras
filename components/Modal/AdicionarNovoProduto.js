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
import ModalProdutoJaCadastrado from "./ProdutoJaCadastrado";
import ModalNomeValido from "./NomeValido";
import ModalPrecoValido from "./PrecoValido";

export default function ModalAdicionar({ handleClose, tipo }) {
  const { identificador, setIdentificador, listaGeral, setListaGeral } =
    useListaGeralContext();

  const [produtoJaCadastrado, setProdutoJaCadastrado] = useState(false);
  const [nomeValidoVisible, setNomeValidoVisible] = useState(false);
  const [precoValidoVisible, setPrecoValidoVisible] = useState(false);

  const [novoItem, setNovoItem] = useState({
    id: identificador,
    tipo: tipo,
    produto: "",
    valor: "",
    quantidade: 1,
    cart: false,
    selected: false
  });

  const adicionarItem = () => {
    const nomeItem = novoItem.produto.trim();
    const precoItem =
      novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0;

    if (nomeItem !== "") {
      const produtoExistente = listaGeral.find(
        (item) => item.produto === nomeItem
      );

      if (isNaN(precoItem)) {
        setPrecoValidoVisible(true);
      } else if (produtoExistente) {
        setProdutoJaCadastrado(true);
      } else {
        setListaGeral((prevLista) => [...prevLista, novoItem]);
        setNovoItem({
          id: identificador,
          tipo: tipo,
          produto: "",
          valor: "",
          quantidade: 1,
          cart: false,
        });
        setIdentificador(identificador + 1);
        handleClose();
      }
    } else {
      setNomeValidoVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inputContent}>
          <TextInput
            style={[styles.input, { color: "#0045b1" }]}
            placeholder="Digite um novo produto"
            value={novoItem.produto}
            onChangeText={(text) =>
              setNovoItem({
                id: novoItem.id,
                tipo: novoItem.tipo,
                produto: text,
                valor: novoItem.valor,
                quantidade: 1,
                cart: false,
              })
            }
          />
        </View>

        <View style={styles.inputContent}>
          <Text style={styles.cifra}>R$ {""}</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o preço do produto"
            value={novoItem.valor.toString()}
            onChangeText={(text) =>
              setNovoItem({
                id: novoItem.id,
                tipo: novoItem.tipo,
                produto: novoItem.produto,
                valor: text.replace(",", "."),
                quantidade: 1,
                cart: false,
              })
            }
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonVoltarText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={() => adicionarItem()}
          >
            <Text style={styles.buttonSaveText}>Salvar Item</Text>
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

      <Modal visible={precoValidoVisible} transparent={true} transition="fade">
        <ModalPrecoValido handleClose={() => setPrecoValidoVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.8)",
    // backgroundColor: "rgba(75,0,130,0.3)",
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
    color: "#4b0",
    fontSize: 20,
  },
  inputContent: {
    marginTop: 15,
    width: "85%",
    borderWidth: 1,
    borderColor: "#4B0082",
    borderRadius: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 15,
    backgroundColor: "#fff",
  },
  cifra: {
    textAlign: "right",
    width: "10%",
    textAlignVertical: "center",
    fontSize: 20,
    color: "#4B0",
  },
  buttonArea: {
    flexDirection: "row",
    width: "85%",
    marginTop: 8,
    //alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: "#4B0082",
    elevation: 15,
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
  buttonVoltarText: {
    color: "#4B0082",
    fontWeight: "bold",
  },
});

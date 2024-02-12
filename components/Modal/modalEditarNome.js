import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { useLimpezaContext } from "../../src/Context/LimpezaContext";
import { useBebidasContext } from "../../src/Context/BebidasContext";
import { useHigieneContext } from "../../src/Context/HigienePessoalContext";
import { useHortifrutiContext } from "../../src/Context/HortifrutiContext";
import { useTemperosContext } from "../../src/Context/TemperosContext";
import { useCarrinhoContext } from "../../src/Context/CarrinhoContext";
import { useMerceariaContext } from "../../src/Context/MerceariaContext";
import { useAcougueContext } from "../../src/Context/AcougueContext";

export default function ModalEditarNome({
  handleClose,
  tipo,
  indexDoItemAEditar,
}) {
  const { limpeza, setLimpeza } = useLimpezaContext();
  const { bebidas, setBebidas } = useBebidasContext();
  const { higiene, setHigiene } = useHigieneContext();
  const { hortifruti, setHortifruti } = useHortifrutiContext();
  const { temperos, setTemperos } = useTemperosContext();
  const { carrinho, setCarrinho } = useCarrinhoContext();
  const { mercearia, setMercearia } = useMerceariaContext();
  const { acougue, setAcougue } = useAcougueContext();

  const [novoItem, setNovoItem] = useState({
    tipo: tipo,
    produto: "",
    valor: "",
    quantidade: 1,
  });

  useEffect(() => {
    // Carregar o valor atual do item a ser editado quando o modal é aberto
    if (indexDoItemAEditar !== null && indexDoItemAEditar !== undefined) {
      const itemAEditar =
        tipo === "Limpeza"
          ? limpeza[indexDoItemAEditar]
          : tipo === "Bebidas"
            ? bebidas[indexDoItemAEditar]
            : tipo === "Higiene"
              ? higiene[indexDoItemAEditar]
              : tipo === "Hortifruti"
                ? hortifruti[indexDoItemAEditar]
                : tipo === "Temperos"
                  ? temperos[indexDoItemAEditar]
                  : tipo === "Carrinho"
                    ? carrinho[indexDoItemAEditar] // Adicione mais verificações para outros tipos, se necessário
                    : tipo === "Mercearia"
                      ? mercearia[indexDoItemAEditar]
                      : tipo === "Acougue"
                        ? acougue[indexDoItemAEditar]
                        : null;

      if (itemAEditar) {
        setNovoItem({ ...itemAEditar });
        // setNovoItem({ tipo, produto, valor, quantidade, cart });
      }
    }
  }, [
    indexDoItemAEditar,
    limpeza,
    bebidas,
    higiene,
    hortifruti,
    temperos,
    carrinho,
    mercearia,
    acougue,
    tipo,
  ]);

  const alterarProduto = () => {
    const novoProduto = novoItem.valor;

    if (!isNaN(novoProduto) && novoItem.produto.trim() !== "") {
      // Crie uma cópia da lista correspondente ao tipo
      const novaLista =
        tipo === "Limpeza"
          ? [...limpeza]
          : tipo === "Bebidas"
            ? [...bebidas]
            : tipo === "Higiene"
              ? [...higiene]
              : tipo === "Hortifruti"
                ? [...hortifruti]
                : tipo === "Temperos"
                  ? [...temperos]
                  : tipo === "Carrinho"
                    ? [...carrinho]
                    : tipo === "Mercearia"
                      ? [...mercearia]
                      : tipo === "Acougue"
                        ? [...acougue]
                        : [];

      // Atualize o valor do item específico na cópia da lista
      novaLista[indexDoItemAEditar] = { ...novoItem };

      // Atualize o estado com a nova lista
      if (tipo === "Limpeza") {
        setLimpeza(novaLista);
      } else if (tipo === "Bebidas") {
        setBebidas(novaLista);
      } else if (tipo === "Higiene") {
        setHigiene(novaLista);
      } else if (tipo === "Hortifruti") {
        setHortifruti(novaLista);
      } else if (tipo === "Temperos") {
        setTemperos(novaLista);
      } else if (tipo === "Carrinho") {
        setCarrinho(novaLista);
      } else if (tipo === "Mercearia") {
        setMercearia(novaLista);
      } else if (tipo == "Acougue") {
        setAcougue(novaLista);
      }
      // Adicione mais blocos else if para outros tipos, se necessário

      // Limpe os campos do novo item
      setNovoItem({
        tipo: tipo,
        produto: "",
        valor: "",
        quantidade: 1,
        cart: false,
      });

      // Feche o modal
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
            onPress={alterarProduto}
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

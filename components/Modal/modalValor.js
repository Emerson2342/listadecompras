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

export default function ModalItem({ handleClose, tipo, indexDoItemAEditar }) {
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
    cart: false,
  });

  /* useEffect(() => {
    // Carregar o valor atual do item a ser editado quando o modal é aberto
    if (indexDoItemAEditar !== null && indexDoItemAEditar !== undefined) {
      const itemAEditar = limpeza[indexDoItemAEditar];
      setNovoItem({ ...itemAEditar });
    }
  }, [indexDoItemAEditar, limpeza]);

  const alterarValor = () => {
    const novoValor =
      novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0;

    if (!isNaN(novoValor)) {
      // Crie uma cópia da lista de limpeza
      const novaLista = [...limpeza];

      // Atualize o valor do item específico na cópia da lista
      novaLista[indexDoItemAEditar] = { ...novoItem };

      // Atualize o estado com a nova lista
      setLimpeza(novaLista);

      // Limpe os campos do novo item
      setNovoItem({
        tipo: tipo,
        produto: "",
        valor: "",
        quantidade: 1,
      });

      // Feche o modal
      handleClose();
    } else {
      Alert.alert("", "Favor digitar um valor válido.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }; */
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
    /* const novoValor =
      novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0; */

    const novoProduto =
      novoItem.valor && novoItem.valor.trim() !== ""
        ? parseFloat(novoItem.valor)
        : 0;

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
          ? [...carrinho] // Adicione mais verificações para outros tipos, se necessário
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
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={alterarProduto}
          >
            <Text style={styles.buttonSaveText}>Salvar Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.6)",
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
  },
  input: {
    fontSize: 20,
  },
  precoInputer: {
    flexDirection: "row",
  },
  cifra: {
    fontSize: 20,
  },
  buttonArea: {
    flexDirection: "row",
    width: "85%",
    marginTop: 8,
    //alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
  },
  buttonSave: {
    backgroundColor: "#9932CC",
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

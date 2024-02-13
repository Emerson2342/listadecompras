import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { useLimpezaContext } from "../../src/Context/LimpezaContext";
import { useBebidasContext } from "../../src/Context/BebidasContext";
import { useHigieneContext } from "../../src/Context/HigienePessoalContext";
import { useHortifrutiContext } from "../../src/Context/HortifrutiContext";
import { useTemperosContext } from "../../src/Context/TemperosContext";
import { useMerceariaContext } from "../../src/Context/MerceariaContext";
import { useAcougueContext } from "../../src/Context/AcougueContext";

export default function ModalAdicionar({ handleClose, tipo, addItem }) {
  const { limpeza, setLimpeza } = useLimpezaContext();
  const { bebidas, setBebidas } = useBebidasContext();
  const { higiene, setHigiene } = useHigieneContext();
  const { hortifruti, setHortifruti } = useHortifrutiContext();
  const { temperos, setTemperos } = useTemperosContext();
  const { mercearia, setMercearia } = useMerceariaContext();
  const { acougue, setAcougue } = useAcougueContext();

  const [novoItem, setNovoItem] = useState({
    tipo: tipo,
    produto: "",
    valor: "",
    quantidade: 1,
    cart: false,
  });

  const adicionarItem = () => {
    const nomeItem = novoItem.produto.trim();
    const precoItem =
      novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0;

    if (nomeItem !== "") {
      // Verificar se o produto já existe em alguma lista
      const produtoExistente = [
        ...limpeza,
        ...bebidas,
        ...higiene,
        ...hortifruti,
        ...acougue,
        ...mercearia,
        ...temperos,
        // Adicione outras listas conforme necessário
      ].find((item) => item.produto === nomeItem);

      if (isNaN(precoItem)) {
        Alert.alert("", "Favor digitar um preço válido.", [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed. Digitar um valor válido"),
          },
        ]);
      } else if (produtoExistente) {
        Alert.alert("", "Produto já cadastrado", [
          {
            text: "OK",
            onPress: () => console.log("Ok Pressed. Produto já cadastrado"),
          },
        ]);
      } else {
        // Determine qual função de atualização do estado usar com base no tipo
        const updateStateFunction =
          tipo === "Limpeza"
            ? setLimpeza
            : tipo === "Bebidas"
              ? setBebidas
              : tipo === "Higiene"
                ? setHigiene
                : tipo === "Hortifruti"
                  ? setHortifruti
                  : tipo === "Temperos"
                    ? setTemperos
                    : tipo === "Carrinho"
                      ? setCarrinho
                      : tipo === "Mercearia"
                        ? setMercearia
                        : tipo === "Acougue"
                          ? setAcougue
                          : null;

        if (updateStateFunction) {
          // Se a função de atualização do estado for válida, faça a atualização
          updateStateFunction((prevLista) => [
            ...prevLista,
            { tipo: tipo, ...novoItem },
          ]);
        }

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
      }
    } else {
      Alert.alert("", "Favor digitar um produto.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
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
            value={novoItem.valor.toString()} // Converta o numeral para string
            onChangeText={(text) =>
              setNovoItem({
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
            onPress={adicionarItem}
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

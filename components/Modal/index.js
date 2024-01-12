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
import { useAlimentosContext } from "../../src/Context/AlimentosContext";

export default function ModalItem({ handleClose, tipo, addItem }) {
  const { limpeza, setLimpeza } = useLimpezaContext();
  const { bebidas, setBebidas } = useBebidasContext();
  const { higiene, setHigiene } = useHigieneContext();
  const { hortifruti, setHortifruti } = useHortifrutiContext();
  const { temperos, setTemperos } = useTemperosContext();
  const { alimentos, setAlimentos } = useAlimentosContext();

  const [novoItem, setNovoItem] = useState({
    tipo: tipo,
    produto: "",
    valor: "",
    quantidade: 1,
  });

  const adicionarItem = () => {
    const nomeItem = novoItem.produto.trim();
    const precoItem =
      novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0;

    if (nomeItem !== "") {
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
          ? setCarrinho // Adicione mais verificações para outros tipos, se necessário
          : tipo === "Alimentos"
          ? setAlimentos
          : null;

      if (updateStateFunction) {
        // Se a função de atualização do estado for válida, faça a atualização
        updateStateFunction((prevLista) => [
          ...prevLista,
          { tipo: tipo, ...novoItem },
        ]);
      }

      // Limpe os campos do novo item
      setNovoItem({ tipo: tipo, produto: "", valor: "", quantidade: 1 });

      // Feche o modal
      handleClose();
    } else {
      Alert.alert("", "Favor digitar um produto.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Digite um novo item"
          value={novoItem.produto}
          onChangeText={(text) =>
            setNovoItem({
              tipo: novoItem.tipo,
              produto: text,
              valor: novoItem.valor,
              quantidade: 1,
            })
          }
        />
        <View style={styles.precoInputer}>
          <Text style={styles.cifra}>R$</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o preço do item"
            value={novoItem.valor.toString()} // Converta o numeral para string
            onChangeText={(text) =>
              setNovoItem({
                tipo: novoItem.tipo,
                produto: novoItem.produto,
                valor: text.replace(",", "."),
                quantidade: 1,
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
    backgroundColor: "#8000ff",
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

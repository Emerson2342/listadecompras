import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function ModalProdutoExistenteCarrinho({ handleClose }) {
  const [tempoDecorrido, setTempoDecorrido] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose(); // Chama a função handleClose após 2 segundos
    }, 1000);

    // Atualiza o estado do tempo decorrido a cada segundo
    const intervalId = setInterval(() => {
      setTempoDecorrido((tempoAnterior) => tempoAnterior + 1);
    }, 1000);

    // Limpa os timers se o componente for desmontado antes do timeout
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [handleClose]);

  /*   useEffect(() => {
      const timeoutId = setTimeout(() => {
        () => handleClose();
      }, 2000);
  
      return () => clearTimeout(timeoutId); // Limpa o timer se o componente for desmontado antes do timeout
    }, []); */
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Produto já está no carrinho</Text>
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
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(75, 0, 130)",
  },
  text: {
    fontSize: 20,
    // fontWeight: "bold",
    textAlign: "center",
    color: "#4B0082",
  },
});

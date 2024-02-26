import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

export default function ModalProdutoJaCadastrado({ handleClose }) {
  const [tempoDecorrido, setTempoDecorrido] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose();
    }, 700);

    const intervalId = setInterval(() => {
      setTempoDecorrido((tempoAnterior) => tempoAnterior + 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [() => handleClose()]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Produto já cadastrado!</Text>
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
    textAlign: "center",
    color: "#4B0082",
  },
});

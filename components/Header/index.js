import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";

export default function Header() {
  return <View style={styles.container}></View>;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4B0082",
    paddingTop: 10,
  },
});

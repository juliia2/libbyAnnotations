import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type AddTileProps = {
  onPress: () => void; 
};

export default function AddTile({ onPress }: AddTileProps) {
  return (
    <Pressable onPress={onPress} style={styles.tile}>
      <Text style={styles.text}>+</Text>
      <Text style={styles.text2}>Add File</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 100, 
    height: 100,
    backgroundColor: "#a8c7f7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#3673d6",
  },
    text: {
        fontSize: 24,
        color: "#333",
        fontWeight: "bold",
    },
    text2: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
});

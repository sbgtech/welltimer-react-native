import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonUI from "./ButtonUI";

const Item = ({ name, onPress }) => {
  return (
    <View style={styles.itemView}>
      <Text style={styles.itemText}>{name ? name : "Unknown"}</Text>
      <ButtonUI onPress={onPress} title={"Connect"} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: "#fff",
    margin: 2,
    padding: 8,
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    maxWidth: "70%",
  },
});

export default Item;

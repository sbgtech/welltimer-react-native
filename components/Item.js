import React from "react";
import { Text, View } from "react-native";
import ButtonUI from "./ButtonUI";
import { styles } from "./tabs/style/styles";

const Item = ({ name, onPress, title }) => {
  return (
    <View style={styles.itemView}>
      <Text style={styles.itemText}>{name ? name : "Unknown"}</Text>
      <ButtonUI onPress={onPress} title={title} loading={false} />
    </View>
  );
};

export default Item;

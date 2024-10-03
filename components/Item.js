import React from "react";
import { Text, View } from "react-native";
import ButtonUI from "./ButtonUI";
import { styles } from "./tabs/style/styles";

const Item = ({ name, id, onPress, title, disabled }) => {
  return (
    <View style={styles.itemView}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{name ? name : "Unknown"}</Text>
        <Text style={styles.itemID}>{id ? id : "Unknown"}</Text>
      </View>
      <ButtonUI
        onPress={onPress}
        title={title}
        btnStyle={styles.btnSendText}
        txtStyle={styles.TextSendStyle}
        disabled={disabled}
      />
    </View>
  );
};

export default Item;

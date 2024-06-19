import React from "react";
import { Text, View, Dimensions } from "react-native";
import { styles } from "../style/styles";

const Arrival = (props) => {
  const cardGap = 20;
  const cardWidth = (Dimensions.get("window").width - cardGap * 6) / 2;

  return (
    <View style={[styles.arrivalWrapper, { width: cardWidth }]}>
      <Text style={styles.arrivalName}>{props.name}</Text>
      <Text style={styles.arrivalValue}>{props.value}</Text>
    </View>
  );
};

export default Arrival;

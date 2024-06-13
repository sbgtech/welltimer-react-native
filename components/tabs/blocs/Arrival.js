import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const Arrival = (props) => {
  const cardGap = 20;

  const cardWidth = (Dimensions.get("window").width - cardGap * 6) / 2;

  return (
    <View
      style={[styles.arrivalWrapper, { height: cardWidth, width: cardWidth }]}
    >
      <Text style={styles.arrivalName}>{props.name}</Text>
      <Text style={styles.arrivalValue}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  arrivalWrapper: {
    marginBottom: 12,
    backgroundColor: "white",
    borderRadius: 16,
    shadowOpacity: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  arrivalName: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  arrivalValue: {
    fontSize: 14,
  },
});

export default Arrival;

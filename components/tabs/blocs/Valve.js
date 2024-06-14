import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Switch from "react-native-switch-toggles";

const Valve = (props) => {
  const [isEnabledValve, setIsEnabledValve] = useState(false);
  return (
    <View style={styles.statusWrapper}>
      <Text style={styles.valveTitle}>{props.title}</Text>
      <View style={styles.onOffStatus}>
        <Text style={styles.valveStatus}>
          Status : {isEnabledValve ? <Text>ON</Text> : <Text>OFF</Text>}
        </Text>
        <Switch
          size={30}
          value={isEnabledValve}
          onChange={(value) => setIsEnabledValve(value)}
          activeTrackColor={"#45D058"}
          renderOffIndicator={() => (
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "white" }}>
              OFF
            </Text>
          )}
          renderOnIndicator={() => (
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "white" }}>
              ON
            </Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusWrapper: {
    marginHorizontal: 26,
    marginTop: 16,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#eeeeee",
  },
  valveTitle: {
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  onOffStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Valve;

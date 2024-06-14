import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Switch from "react-native-switch-toggles";

const Valve = (props) => {
  const { width, height } = Dimensions.get("window");
  const scale = width / 400;
  const [isEnabledValve, setIsEnabledValve] = useState(false);
  return (
    <View style={styles.statusWrapper}>
      <Text style={[styles.valveTitle, { fontSize: 28 * scale }]}>
        {props.title}
      </Text>
      <View style={styles.onOffStatus}>
        <Text style={{ fontSize: 16 * scale }}>
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
    // fontSize: 28,
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

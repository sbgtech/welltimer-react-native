import React, { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import Switch from "react-native-switch-toggles";
import { styles } from "../style/styles";

const Valve = (props) => {
  const { width } = Dimensions.get("window");
  const scale = width / 450;
  const [isEnabledValve, setIsEnabledValve] = useState(false);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.valveTitle}>{props.title}</Text>
      <View style={styles.onOffStatus}>
        <Text style={styles.onOffText}>
          Status : {isEnabledValve ? <Text>ON</Text> : <Text>OFF</Text>}
        </Text>
        <Switch
          size={30 * scale}
          value={isEnabledValve}
          onChange={(value) => setIsEnabledValve(value)}
          activeTrackColor={"#45D058"}
          renderOffIndicator={() => (
            <Text
              style={{
                fontSize: 10 * scale,
                fontWeight: "bold",
                color: "white",
              }}
            >
              OFF
            </Text>
          )}
          renderOnIndicator={() => (
            <Text
              style={{
                fontSize: 10 * scale,
                fontWeight: "bold",
                color: "white",
              }}
            >
              ON
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default Valve;

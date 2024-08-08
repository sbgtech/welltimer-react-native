import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import Switch from "react-native-switch-toggles";
import { styles } from "../style/styles";
import { Buffer } from "buffer";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
} from "../../Utils/Constants";
import { Receive } from "../../Utils/Receive";

const Valve = ({ connectedDevice, setLoading, title, status }) => {
  const { width } = Dimensions.get("window");
  const scale = width / 450;
  const [isEnabledValve, setIsEnabledValve] = useState(status);

  // sent data of valve
  const handleSendValveValue = (value) => {
    try {
      const arr = JSON.stringify([1, Number(value)]);
      console.log(arr);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      setIsEnabledValve(value);
      Receive.ACKReceivedData(connectedDevice, { setLoading });
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // Update state when status changes
  useEffect(() => {
    setIsEnabledValve(status);
  }, [status]);

  // Handle switch change
  const handleSwitchChange = (value) => {
    if (value !== isEnabledValve) {
      handleSendValveValue(value);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.valveTitle}>{title}</Text>
      <View style={styles.onOffStatus}>
        <Text style={styles.onOffText}>
          Status : {isEnabledValve ? <Text>ON</Text> : <Text>OFF</Text>}
        </Text>
        <Switch
          size={30 * scale}
          value={isEnabledValve}
          onChange={handleSwitchChange}
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

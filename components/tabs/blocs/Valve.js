import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import Toggle from "react-native-toggle-element";
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
      <View style={styles.onOffStatus}>
        <Text style={styles.valveTitle}>{title}</Text>
        <Toggle
          value={isEnabledValve}
          onPress={(newState) => handleSwitchChange(newState)}
          thumbActiveComponent={<Text style={{ color: "#fff" }}>ON</Text>}
          thumbInActiveComponent={<Text style={{ color: "#fff" }}>OFF</Text>}
          thumbButton={{
            width: 60,
            height: 60,
            radius: 0,
            activeBackgroundColor: "#349E43",
            inActiveBackgroundColor: "#a3a3a3",
          }}
          trackBar={{
            activeBackgroundColor: "#45D058",
            inActiveBackgroundColor: "#ddd",
            borderActiveColor: "#45D058",
            borderInActiveColor: "#ddd",
            borderWidth: 5,
            width: 180,
            height: 40,
            radius: 0,
          }}
        />
      </View>
    </View>
  );
};

export default Valve;

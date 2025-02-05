import React, { useEffect, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import Toggle from "react-native-toggle-element";
import { styles } from "../style/styles";
import { Buffer } from "buffer";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
} from "../../Utils/Constants";
import Toast from "react-native-toast-message";

const Valve = ({ connectedDevice, title, status, fetchDataSettings }) => {
  const { width } = useWindowDimensions();
  const scale =
    width < 600 ? width / 500 : width > 850 ? width / 1000 : width / 750;
  const [isEnabledValve, setIsEnabledValve] = useState(status);

  // sent data of valve
  const handleSendValveValue = async (value) => {
    try {
      const arr = JSON.stringify([3, 1, Number(value)]);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      await connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent successfully",
        visibilityTime: 3000,
      });
      setIsEnabledValve(value);
      await fetchDataSettings();
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
    <View style={styles.valveWrapper}>
      <View style={styles.onOffStatus}>
        <Text style={styles.valveTitle}>{title}</Text>
        <Toggle
          value={isEnabledValve}
          onPress={(newState) => handleSwitchChange(newState)}
          thumbActiveComponent={
            <Text
              style={{
                color: "#fff",
                fontSize: width < 600 ? 14 : width > 980 ? 20 : 16,
              }}
            >
              ON
            </Text>
          }
          thumbInActiveComponent={
            <Text
              style={{
                color: "#fff",
                fontSize: width < 600 ? 14 : width > 980 ? 20 : 16,
              }}
            >
              OFF
            </Text>
          }
          thumbButton={{
            width: width < 600 ? 50 : width > 980 ? 85 : 60,
            height: width < 600 ? 50 : width > 980 ? 85 : 60,
            radius: 0,
            activeBackgroundColor: "#349E43",
            inActiveBackgroundColor: "#a3a3a3",
          }}
          trackBar={{
            activeBackgroundColor: "#45D058",
            inActiveBackgroundColor: "#ddd",
            borderActiveColor: "#45D058",
            borderInActiveColor: "#ddd",
            borderWidth: width < 600 ? 5 : width > 980 ? 7 : 6,
            width: width < 600 ? 140 : width > 980 ? 260 : 180,
            height: width < 600 ? 30 : width > 980 ? 50 : 34,
            radius: 0,
          }}
        />
      </View>
    </View>
  );
};

export default Valve;

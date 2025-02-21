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

const Valve = ({
  connectedDevice,
  title,
  status,
  fetchDataSettings,
  valve,
}) => {
  const { width } = useWindowDimensions();
  const [isEnabledValve, setIsEnabledValve] = useState(status);

  // sent data of valve A
  const handleSendValveValue = async (value) => {
    try {
      let arr;
      if (valve === "A") {
        arr = JSON.stringify([3, 1, Number(value)]);
      }
      if (valve === "B") {
        arr = JSON.stringify([3, 2, Number(value)]);
      }
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
      <View style={styles.onOffStatus(width)}>
        <Text style={styles.valveTitle}>{title}</Text>
        <Toggle
          value={isEnabledValve}
          onPress={(newState) => handleSwitchChange(newState)}
          thumbActiveComponent={
            <Text
              style={{
                color: "#fff",
                fontSize:
                  width < 600 ? 10 : width < 800 ? 10 : width < 950 ? 14 : 18,
              }}
            >
              ON
            </Text>
          }
          thumbInActiveComponent={
            <Text
              style={{
                color: "#fff",
                fontSize:
                  width < 600 ? 10 : width < 800 ? 10 : width < 950 ? 14 : 18,
              }}
            >
              OFF
            </Text>
          }
          thumbButton={{
            width: width < 600 ? 40 : width < 800 ? 38 : width < 950 ? 50 : 60,
            height: width < 600 ? 40 : width < 800 ? 38 : width < 950 ? 50 : 60,
            radius: 50,
            activeBackgroundColor: "#349E43",
            inActiveBackgroundColor: "#a3a3a3",
          }}
          trackBar={{
            activeBackgroundColor: "#45D058",
            inActiveBackgroundColor: "#ddd",
            borderActiveColor: "#45D058",
            borderInActiveColor: "#ddd",
            borderWidth: width < 600 ? 5 : width > 980 ? 7 : 6,
            width:
              width < 600 ? 80 : width < 800 ? 80 : width < 950 ? 100 : 150,
            height: width < 600 ? 35 : width < 800 ? 32 : width < 950 ? 45 : 55,
            radius: 50,
          }}
        />
      </View>
    </View>
  );
};

export default Valve;

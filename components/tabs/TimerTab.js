import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import Timer from "./blocs/Timer";
import { styles } from "./style/styles";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "../Utils/Constants";

const TimerTab = (props) => {
  const [receivedOpenTimer, setReceivedOpenTimer] = useState("");
  const [receivedShutinTimer, setReceivedShutinTimer] = useState("");
  const [receivedAfterflowTimer, setReceivedAfterflowTimer] = useState("");
  const [receivedMandatoryTimer, setReceivedMandatoryTimer] = useState("");

  useEffect(() => {
    receiveData(props.connectedDevice);
  }, []);

  const receiveData = (device) => {
    try {
      device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error(error);
            return false;
          }
          const msg = Buffer.from(characteristic.value, "base64");
          console.log("Received data from timer tab :", msg);
          Toast.show({
            type: "info",
            text1: "Success",
            text2: "Received data : " + msg,
            visibilityTime: 3000,
          });
          if (msg[0] == 123 && msg[msg.length - 2] == 125 && msg[1] == 1) {
            setReceivedOpenTimer(msg[2] * 256 + msg[3]);
            setReceivedShutinTimer(msg[4] * 256 + msg[5]);
            setReceivedAfterflowTimer(msg[6] * 256 + msg[7]);
            setReceivedMandatoryTimer(msg[8] * 256 + msg[9]);
          }
          return true;
        }
      );
    } catch (error) {
      console.error("Error receiving data from device:", error.message);
      return false;
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, styles.marginBottomContainer]}>
        <Timer
          sendData={props.sendData}
          connectedDevice={props.connectedDevice}
          title={"Open timer"}
          address={122}
          totalSec={receivedOpenTimer}
        />
        <Timer
          sendData={props.sendData}
          connectedDevice={props.connectedDevice}
          title={"Shutin timer"}
          address={123}
          totalSec={receivedShutinTimer}
        />
        <Timer
          sendData={props.sendData}
          connectedDevice={props.connectedDevice}
          title={"Afterflow timer"}
          address={124}
          totalSec={receivedAfterflowTimer}
        />
        <Timer
          sendData={props.sendData}
          connectedDevice={props.connectedDevice}
          title={"Mandatory shutin timer"}
          address={125}
          totalSec={receivedMandatoryTimer}
        />
      </View>
    </ScrollView>
  );
};

export default TimerTab;

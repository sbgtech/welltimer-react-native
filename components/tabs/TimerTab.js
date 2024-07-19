import React, { useEffect, useState } from "react";
import { View, ScrollView, Modal, Text, ActivityIndicator } from "react-native";
import Timer from "./blocs/Timer";
import { styles } from "./style/styles";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "../Utils/Constants";
import { Receive } from "../Utils/Receive";

const TimerTab = (props) => {
  const [receivedOpenTimer, setReceivedOpenTimer] = useState("");
  const [receivedShutinTimer, setReceivedShutinTimer] = useState("");
  const [receivedAfterflowTimer, setReceivedAfterflowTimer] = useState("");
  const [receivedMandatoryTimer, setReceivedMandatoryTimer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    Receive.TimerReceivedData(props.connectedDevice, {
      setReceivedOpenTimer,
      setReceivedShutinTimer,
      setReceivedAfterflowTimer,
      setReceivedMandatoryTimer,
      setLoading,
    });
  }, []);

  // const receiveData = async (device) => {
  //   try {
  //     await device?.monitorCharacteristicForService(
  //       UART_SERVICE_UUID,
  //       UART_RX_CHARACTERISTIC_UUID,
  //       (error, characteristic) => {
  //         if (error) {
  //           console.error(error);
  //           return false;
  //         }
  //         const msg = Buffer.from(characteristic.value, "base64");
  //         console.log("Received data from timer tab :", msg);
  //         if (msg[0] == 123 && msg[msg.length - 2] == 125 && msg[1] == 2) {
  //           setReceivedOpenTimer(msg[2] * 256 + msg[3]);
  //           setReceivedShutinTimer(msg[4] * 256 + msg[5]);
  //           setReceivedAfterflowTimer(msg[6] * 256 + msg[7]);
  //           setReceivedMandatoryTimer(msg[8] * 256 + msg[9]);
  //         }
  //         setLoading(false);
  //         return true;
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error receiving data from device:", error.message);
  //     return false;
  //   }
  // };

  return (
    <ScrollView>
      <View style={[styles.container, styles.marginBottomContainer]}>
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Open timer"}
          address={122}
          totalSec={receivedOpenTimer}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Shutin timer"}
          address={123}
          totalSec={receivedShutinTimer}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Afterflow timer"}
          address={124}
          totalSec={receivedAfterflowTimer}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Mandatory shutin timer"}
          address={125}
          totalSec={receivedMandatoryTimer}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.waitingMsg}>Wait</Text>
            <ActivityIndicator color={"#35374B"} size={"large"} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TimerTab;

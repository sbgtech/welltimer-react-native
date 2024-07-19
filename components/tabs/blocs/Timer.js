import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Modal } from "react-native";
import ButtonUI from "../../ButtonUI";
import Toast from "react-native-toast-message";
import { styles } from "../style/styles";
import { Buffer } from "buffer";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "../../Utils/Constants";

const Timer = (props) => {
  const [hourValue, setHourValue] = useState("");
  const [minValue, setMinValue] = useState("");
  const [secValue, setSecValue] = useState("");

  const handleChangeHour = (text) => {
    if (text) {
      setHourValue(text);
    } else {
      setHourValue("");
    }
  };

  const handleChangeMin = (text) => {
    if (text >= 0 && text <= 59) {
      setMinValue(text);
    } else {
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "Minutes must be entre 01 & 59",
        visibilityTime: 3000,
      });
      setMinValue("");
    }
  };

  const handleChangeSec = (text) => {
    if (text >= 0 && text <= 59) {
      setSecValue(text);
    } else {
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "Seconds must be entre 01 & 59",
        visibilityTime: 3000,
      });
      setSecValue("");
    }
  };

  const handleSendTimer = () => {
    try {
      const totalSeconds =
        Number(hourValue) * 3600 + Number(minValue) * 60 + Number(secValue);
      const arr = JSON.stringify([props.address, totalSeconds]);
      console.log(arr);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent to " + props.connectedDevice.name,
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const convertToHMS = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    let remainingSecondsAfterHours = totalSeconds % 3600;
    let minutes = Math.floor(remainingSecondsAfterHours / 60);
    let seconds = remainingSecondsAfterHours % 60;
    setHourValue(hours);
    setMinValue(minutes);
    setSecValue(seconds);
  };

  useEffect(() => {
    convertToHMS(props.totalSec);
  }, [props.totalSec]);
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.valveTitle}>{props.title}</Text>
      </View>

      <View style={styles.rangeWrapper}>
        <View style={styles.containerRange}>
          <TextInput
            style={styles.inputTimer}
            keyboardType="numeric"
            value={hourValue.toString()}
            onChangeText={handleChangeHour}
            maxLength={2}
          />
          <Text style={styles.dotTimer}>:</Text>
          <TextInput
            style={styles.inputTimer}
            keyboardType="numeric"
            value={minValue.toString()}
            onChangeText={handleChangeMin}
            maxLength={2}
          />
          <Text style={styles.dotTimer}>:</Text>
          <TextInput
            style={styles.inputTimer}
            keyboardType="numeric"
            value={secValue.toString()}
            onChangeText={handleChangeSec}
            maxLength={2}
          />
          <ButtonUI
            onPress={() => handleSendTimer()}
            title={"Send"}
            btnStyle={styles.btnSendText}
            txtStyle={styles.TextSendStyle}
          />
        </View>
        {/* <Text>Total seconds : {props.totalSec}</Text> */}
      </View>
    </View>
  );
};

export default Timer;

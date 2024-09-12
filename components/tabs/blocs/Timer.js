import React, { useEffect, useState } from "react";
import { Text, View, TextInput } from "react-native";
import ButtonUI from "../../ButtonUI";
import Toast from "react-native-toast-message";
import { styles } from "../style/styles";
import { Buffer } from "buffer";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
} from "../../Utils/Constants";
import { Receive } from "../../Utils/Receive";

const Timer = ({
  title,
  totalSec,
  connectedDevice,
  address,
  setLoading,
  setTitle,
  onRefresh,
}) => {
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

  const handleSendTimer = async () => {
    try {
      const totalSeconds =
        Number(hourValue) * 3600 + Number(minValue) * 60 + Number(secValue);
      const arr = JSON.stringify([address, totalSeconds]);
      console.log(arr);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      await connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(connectedDevice, { setLoading, setTitle });
      await onRefresh();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  const toHMS = (totalSeconds) => {
    const { formattedHours, formattedMinutes, formattedSeconds } =
      Receive.convertTimersToHMS(totalSeconds);
    setHourValue(formattedHours);
    setMinValue(formattedMinutes);
    setSecValue(formattedSeconds);
  };

  useEffect(() => {
    toHMS(totalSec);
  }, [totalSec]);
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.valveTitle}>{title}</Text>
      </View>

      <View style={styles.rangeWrapper}>
        <View style={styles.containerRange}>
          <TextInput
            style={styles.inputTimer}
            keyboardType="numeric"
            value={hourValue}
            onChangeText={handleChangeHour}
            maxLength={2}
          />
          <Text style={styles.dotTimer}>:</Text>
          <TextInput
            style={styles.inputTimer}
            keyboardType="numeric"
            value={minValue}
            onChangeText={handleChangeMin}
            maxLength={2}
          />
          <Text style={styles.dotTimer}>:</Text>
          <TextInput
            style={styles.inputTimer}
            keyboardType="numeric"
            value={secValue}
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
      </View>
    </View>
  );
};

export default Timer;

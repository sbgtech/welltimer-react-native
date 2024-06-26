import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Modal } from "react-native";
import ButtonUI from "../../ButtonUI";
import Toast from "react-native-toast-message";
import { styles } from "../style/styles";

const Timer = (props) => {
  const [hourValue, setHourValue] = useState("00");
  const [minValue, setMinValue] = useState("00");
  const [secValue, setSecValue] = useState("00");
  const [totalSec, setTotalSec] = useState(0);

  const handleChangeHour = (text) => {
    // const hour = parseInt(text);
    if (text) {
      setHourValue(text);
    } else {
      setHourValue("");
    }
  };

  const handleChangeMin = (text) => {
    // const minute = parseInt(text);
    if (text >= 0 && text <= 59) {
      setMinValue(text);
      console.log("true minute", text);
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
    // const second = parseInt(text);
    if (text >= 0 && text <= 59) {
      setSecValue(text);
      console.log("true minute", text);
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
    const arr = JSON.stringify([props.address, totalSec]);
    props.sendData(props.connectedDevice, arr + "\n");
  };

  useEffect(() => {
    const result =
      Number(hourValue) * 3600 + Number(minValue) * 60 + Number(secValue);
    setTotalSec(result);
  }, [hourValue, minValue, secValue]);
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
        </View>
        <View style={styles.containerBtnText}>
          <ButtonUI
            onPress={() => handleSendTimer()}
            title={"Send"}
            btnStyle={styles.btnSendText}
            txtStyle={styles.TextSendStyle}
            loading={false}
          />
        </View>
        <Text>Hours:{hourValue}</Text>
        <Text>Minutes:{minValue}</Text>
        <Text>Seconds:{secValue}</Text>
        <Text>Total seconds : {totalSec}</Text>
      </View>
    </View>
  );
};

export default Timer;

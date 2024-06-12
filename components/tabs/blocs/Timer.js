import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import ButtonUI from "../../ButtonUI";
import Toast from "react-native-toast-message";

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
    <View style={styles.statusWrapper}>
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
            style={styles.inputRange}
            keyboardType="numeric"
            value={hourValue}
            onChangeText={handleChangeHour}
            maxLength={2}
          />
          <Text style={styles.dotTimer}>:</Text>
          <TextInput
            style={styles.inputRange}
            keyboardType="numeric"
            value={minValue}
            onChangeText={handleChangeMin}
            maxLength={2}
          />
          <Text style={styles.dotTimer}>:</Text>
          <TextInput
            style={styles.inputRange}
            keyboardType="numeric"
            value={secValue}
            onChangeText={handleChangeSec}
            maxLength={2}
          />
        </View>
        <View style={styles.containerRange}>
          <ButtonUI
            onPress={() => handleSendTimer()}
            title={"Send"}
            btnStyle={styles.btnSend}
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

const styles = StyleSheet.create({
  statusWrapper: {
    marginHorizontal: 26,
    marginTop: 16,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#eeeeee",
  },
  valveTitle: {
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  rangeWrapper: {
    backgroundColor: "#ddd",
    padding: 14,
    borderRadius: 14,
  },
  containerRange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  dotTimer: {
    fontSize: 20,
  },
  inputRange: {
    backgroundColor: "#fff",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "grey",
    fontWeight: "bold",
    color: "#7d7d7d",
    fontSize: 16,
    borderRadius: 9,
    width: 55,
    maxWidth: 90,
    height: 55,
    maxHeight: 90,
  },
  btnSend: {
    width: 90,
  },
});

export default Timer;

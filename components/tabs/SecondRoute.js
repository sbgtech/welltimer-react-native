import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import ButtonUI from "../ButtonUI";
import Toast from "react-native-toast-message";

const SecondRoute = () => {
  const [hourValue, setHourValue] = useState("00");
  const [minValue, setMinValue] = useState("00");
  const [secValue, setSecValue] = useState("00");
  const [totalSec, setTotalSec] = useState(0);

  const handleChangeHour = (text) => {
    const hour = parseInt(text);
    setHourValue(hour);
  };

  const handleChangeMin = (text) => {
    const minute = parseInt(text);
    if (minute >= 0 && minute <= 59) {
      setMinValue(minute);
      console.log("true minute", minute);
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
    const second = parseInt(text);
    if (second >= 0 && second <= 59) {
      setSecValue(second);
      console.log("true minute", second);
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

  useEffect(() => {
    const result =
      Number(hourValue) * 3600 + Number(minValue) * 60 + Number(secValue);
    setTotalSec(result);
  }, [hourValue, minValue, secValue]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.statusWrapper}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.valveTitle}>Title</Text>
          </View>

          <View style={styles.rangeWrapper}>
            <View style={styles.containerRange}>
              <TextInput
                style={styles.inputRange}
                keyboardType="numeric"
                value={hourValue.toString()}
                onChangeText={handleChangeHour}
                maxLength={2}
              />
              <TextInput
                style={styles.inputRange}
                keyboardType="numeric"
                value={minValue.toString()}
                onChangeText={handleChangeMin}
                maxLength={2}
              />

              <TextInput
                style={styles.inputRange}
                keyboardType="numeric"
                value={secValue.toString()}
                onChangeText={handleChangeSec}
                maxLength={2}
              />
            </View>
            <View style={styles.containerRange}>
              <ButtonUI
                onPress={() => console.log("min")}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
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
  inputRange: {
    backgroundColor: "#fff",
    padding: 18,
    borderWidth: 1,
    borderColor: "grey",
    fontWeight: "bold",
    color: "#7d7d7d",
    fontSize: 16,
    borderRadius: 9,
    width: 60,
    maxWidth: 90,
    height: 60,
    maxHeight: 90,
  },
  btnSend: {
    width: 90,
  },
});

export default SecondRoute;

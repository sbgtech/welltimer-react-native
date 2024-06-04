import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import ButtonUI from "../ButtonUI";
import Ionicons from "@expo/vector-icons/Ionicons";

const SecondRoute = () => {
  const [value, setValue] = useState("");

  const handleChangeText = (text) => {
    const numericValue = parseInt(text);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 59) {
      setValue(numericValue);
      console.log("true ", numericValue);
      //   setValue(numericValue.toString());
      //   console.log("true", value);
    } else {
      //   Alert.alert("Warning", "Hour must be required and entre 01 & 24");
      console.log("false");
      setValue();
    }
  };

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
                value={value}
                onChangeText={handleChangeText}
                maxLength={2}
              />
              <TextInput
                style={styles.inputRange}
                keyboardType="numeric"
                // value={value}
                // onChangeText={handleChangeText}
                maxLength={2}
              />
              <TextInput
                style={styles.inputRange}
                keyboardType="numeric"
                // value={value}
                // onChangeText={handleChangeText}
                maxLength={2}
              />
            </View>
            <View style={styles.containerRange}>
              <ButtonUI
                onPress={() => console.log("min")}
                title={"Save"}
                btnStyle={styles.btnSend}
              />
            </View>
            <Text>{value}</Text>
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

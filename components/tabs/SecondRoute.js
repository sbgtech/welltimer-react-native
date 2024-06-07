import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import ButtonUI from "../ButtonUI";
import Toast from "react-native-toast-message";
import OpenTimer from "./blocs/OpenTimer";

const SecondRoute = (props) => {
  useEffect(() => {}, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <OpenTimer
          sendData={props.sendData}
          connectedDevice={props.connectedDevice}
          title={"Open timer"}
          address={122}
        />
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
  dotTimer: {
    fontSize: 20,
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

import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import ButtonUI from "../ButtonUI";
import Toast from "react-native-toast-message";
import Timer from "./blocs/Timer";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

const TimerTab = (props) => {
  const { width, height } = Dimensions.get("window");
  const marginBottom = height * 0.05; // Adjust 0.05 as needed for your layout
  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  useEffect(() => {}, []);

  return (
    <ScrollView>
      <View style={[styles.container, { marginBottom: marginBottom }]}>
        <Timer
          sendData={props.sendData}
          connectedDevice={props.connectedDevice}
          title={"Open timer"}
          address={122}
        />
        <Timer
          sendData={props.sendData}
          connectedDevice={props.connectedDevice}
          title={"Shutin timer"}
          address={123}
        />
        <Timer
          sendData={props.sendData}
          connectedDevice={props.connectedDevice}
          title={"Afterflow timer"}
          address={124}
        />
        <Timer
          sendData={props.sendData}
          connectedDevice={props.connectedDevice}
          title={"Mandatory shutin timer"}
          address={125}
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

export default TimerTab;

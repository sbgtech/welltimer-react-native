import React, { useEffect } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import Timer from "./blocs/Timer";
import { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import { styles } from "./style/styles";

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

export default TimerTab;

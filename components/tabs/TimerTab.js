import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import Timer from "./blocs/Timer";
import { styles } from "./style/styles";

const TimerTab = (props) => {
  useEffect(() => {}, []);

  return (
    <ScrollView>
      <View style={[styles.container, styles.marginBottomContainer]}>
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

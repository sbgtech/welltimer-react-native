import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Timer from "./blocs/Timer";
import { styles } from "./style/styles";
import { Receive } from "../Utils/Receive";
import RefreshBtn from "./blocs/RefreshBtn";
import Loading from "./blocs/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const TimerTab = (props) => {
  const [receivedOpenTimer, setReceivedOpenTimer] = useState("");
  const [receivedShutinTimer, setReceivedShutinTimer] = useState("");
  const [receivedAfterflowTimer, setReceivedAfterflowTimer] = useState("");
  const [receivedMandatoryTimer, setReceivedMandatoryTimer] = useState("");
  const [loading, setLoading] = useState(false);

  // Initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Receive.TimerReceivedData(props.connectedDevice, {
          setReceivedOpenTimer,
          setReceivedShutinTimer,
          setReceivedAfterflowTimer,
          setReceivedMandatoryTimer,
          setLoading,
        });
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    if (props.connectedDevice) {
      const cleanup = fetchData();
      return () => cleanup; // Clean up subscription on component unmount or when device changes
    }
  }, [props.connectedDevice]);

  const onRefresh = async () => {
    // call function to send req to device to get data
    Receive.sendReqToGetData(props.connectedDevice, 1);
    // start receiving data
    try {
      await Receive.TimerReceivedData(props.connectedDevice, {
        setReceivedOpenTimer,
        setReceivedShutinTimer,
        setReceivedAfterflowTimer,
        setReceivedMandatoryTimer,
        setLoading,
      });
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.container, styles.marginBottomContainer]}>
        <RefreshBtn onPress={() => onRefresh()} />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Open timer"}
          address={112}
          totalSec={receivedOpenTimer}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Shutin timer"}
          address={113}
          totalSec={receivedShutinTimer}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Afterflow timer"}
          address={114}
          totalSec={receivedAfterflowTimer}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Mandatory shutin timer"}
          address={115}
          totalSec={receivedMandatoryTimer}
        />
      </View>
      <Loading loading={loading} />
    </KeyboardAwareScrollView>
  );
};

export default TimerTab;

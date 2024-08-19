import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Timer from "./blocs/Timer";
import { styles } from "./style/styles";
import { Receive } from "../Utils/Receive";
import RefreshBtn from "./blocs/RefreshBtn";
import Loading from "./blocs/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const TimerTab = (props) => {
  // declare initial states for the 4 timers
  const [receivedOpenTimer, setReceivedOpenTimer] = useState("");
  const [receivedShutinTimer, setReceivedShutinTimer] = useState("");
  const [receivedAfterflowTimer, setReceivedAfterflowTimer] = useState("");
  const [receivedMandatoryTimer, setReceivedMandatoryTimer] = useState("");
  // the loading state, default is false
  const [loading, setLoading] = useState(false);

  // Initial load, call TimerReceivedData function with the corresponding data of timers
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

    // fetcha data if the device is connected
    if (props.connectedDevice) {
      const cleanup = fetchData();
      return () => cleanup; // Clean up subscription on component unmount or when device changes
    }
  }, [props.connectedDevice]);

  // function run when clicking on refresh button
  const onRefresh = async () => {
    // call function to send request to device to get data
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
          setLoading={setLoading}
          onRefresh={onRefresh}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Shutin timer"}
          address={113}
          totalSec={receivedShutinTimer}
          setLoading={setLoading}
          onRefresh={onRefresh}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Afterflow timer"}
          address={114}
          totalSec={receivedAfterflowTimer}
          setLoading={setLoading}
          onRefresh={onRefresh}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Mandatory shutin timer"}
          address={115}
          totalSec={receivedMandatoryTimer}
          setLoading={setLoading}
          onRefresh={onRefresh}
        />
      </View>
      <Loading loading={loading} />
    </KeyboardAwareScrollView>
  );
};

export default TimerTab;

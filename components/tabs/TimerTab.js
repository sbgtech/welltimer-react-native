import React, { useEffect, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import Timer from "./blocs/Timer";
import { styles } from "./style/styles";
import { Receive } from "../Utils/Receive";
import RefreshBtn from "./blocs/RefreshBtn";
import Loading from "./blocs/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const TimerTab = (props) => {
  const { width } = useWindowDimensions();
  // declare initial states for the 4 timers
  const [receivedOpenTimer, setReceivedOpenTimer] = useState("");
  const [receivedShutinTimer, setReceivedShutinTimer] = useState("");
  const [receivedAfterflowTimer, setReceivedAfterflowTimer] = useState("");
  const [receivedMandatoryTimer, setReceivedMandatoryTimer] = useState("");
  // the loading state, default is false
  const [loading, setLoading] = useState(false);
  // title of loading modal
  const [title, setTitle] = useState("");

  const fetchDataTimer = async () => {
    try {
      await Receive.TimerReceivedData(props.connectedDevice, {
        setReceivedOpenTimer,
        setReceivedShutinTimer,
        setReceivedAfterflowTimer,
        setReceivedMandatoryTimer,
        setLoading,
        setTitle,
      });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  };

  // Initial load, call TimerReceivedData function with the corresponding data of timers
  useEffect(() => {
    // fetcha data if the device is connected
    if (props.connectedDevice) {
      const cleanup = fetchDataTimer();
      return () => cleanup; // Clean up subscription on component unmount or when device changes
    }
  }, [props.connectedDevice]);

  // function run when clicking on refresh button
  const onRefreshTimer = () => {
    try {
      setReceivedOpenTimer("");
      setReceivedShutinTimer("");
      setReceivedAfterflowTimer("");
      setReceivedMandatoryTimer("");
      // call function to send request to device to get data
      Receive.sendReqToGetData(props.connectedDevice, 1);
      // start receiving data
      Receive.TimerReceivedData(props.connectedDevice, {
        setReceivedOpenTimer,
        setReceivedShutinTimer,
        setReceivedAfterflowTimer,
        setReceivedMandatoryTimer,
        setLoading,
        setTitle,
      });
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={135} // Space above the keyboard
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      enableResetScrollToCoords={false}
    >
      <View style={styles.container}>
        <RefreshBtn onPress={() => onRefreshTimer()} />
        <View style={styles.timersContainer(width)}>
          <Timer
            connectedDevice={props.connectedDevice}
            title={"Open timer"}
            address1={200}
            address2={201}
            totalSec={receivedOpenTimer}
            setTitle={setTitle}
            fetchDataTimer={fetchDataTimer}
          />
          <Timer
            connectedDevice={props.connectedDevice}
            title={"Shutin timer"}
            address1={202}
            address2={203}
            totalSec={receivedShutinTimer}
            setTitle={setTitle}
            fetchDataTimer={fetchDataTimer}
          />
          <Timer
            connectedDevice={props.connectedDevice}
            title={"Afterflow timer"}
            address1={204}
            address2={205}
            totalSec={receivedAfterflowTimer}
            setTitle={setTitle}
            fetchDataTimer={fetchDataTimer}
          />
          <Timer
            connectedDevice={props.connectedDevice}
            title={"Mandatory shutin timer"}
            address1={206}
            address2={207}
            totalSec={receivedMandatoryTimer}
            setTitle={setTitle}
            fetchDataTimer={fetchDataTimer}
          />
        </View>
      </View>
      <Loading loading={loading} title={title} />
    </KeyboardAwareScrollView>
  );
};

export default TimerTab;

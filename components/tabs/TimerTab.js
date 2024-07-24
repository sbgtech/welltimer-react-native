import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Modal,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Timer from "./blocs/Timer";
import { styles } from "./style/styles";
import Toast from "react-native-toast-message";
import { Receive } from "../Utils/Receive";
import RefreshBtn from "./blocs/RefreshBtn";
import Loading from "./blocs/Loading";

const TimerTab = (props) => {
  const [receivedOpenTimer, setReceivedOpenTimer] = useState("");
  const [receivedShutinTimer, setReceivedShutinTimer] = useState("");
  const [receivedAfterflowTimer, setReceivedAfterflowTimer] = useState("");
  const [receivedMandatoryTimer, setReceivedMandatoryTimer] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State to track refresh

  useEffect(() => {
    setLoading(true);
    Receive.TimerReceivedData(props.connectedDevice, {
      setReceivedOpenTimer,
      setReceivedShutinTimer,
      setReceivedAfterflowTimer,
      setReceivedMandatoryTimer,
      setLoading,
    });
  }, []);

  const onRefresh = () => {
    // Simulate fetching new data for your table
    setRefreshing(true);
    // Perform your async refresh operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2500); // Simulating a delay (remove this in real implementation)
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#35374B", "#35374B", "#55B546"]}
          progressBackgroundColor={"#fff"}
          tintColor={"#35374B"}
        />
      }
    >
      <View style={[styles.container, styles.marginBottomContainer]}>
        <RefreshBtn onPress={() => onRefresh()} />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Open timer"}
          address={122}
          totalSec={receivedOpenTimer}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Shutin timer"}
          address={123}
          totalSec={receivedShutinTimer}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Afterflow timer"}
          address={124}
          totalSec={receivedAfterflowTimer}
        />
        <Timer
          connectedDevice={props.connectedDevice}
          title={"Mandatory shutin timer"}
          address={125}
          totalSec={receivedMandatoryTimer}
        />
      </View>
      <Loading loading={loading} />
    </ScrollView>
  );
};

export default TimerTab;

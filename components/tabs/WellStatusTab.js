import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, useWindowDimensions } from "react-native";
import Arrival from "./blocs/Arrival";
import { styles } from "./style/styles";
import Table from "./blocs/Table";
import RefreshBtn from "./blocs/RefreshBtn";
import { Receive } from "../Utils/Receive";
import Loading from "./blocs/Loading";

const WellStatus = (props) => {
  const { width } = useWindowDimensions();
  // const scale =
  //   width < 600 ? width / 420 : width > 960 ? width / 1300 : width / 900;
  // declare initial states
  // the loading state, default is false
  const [loading, setLoading] = useState(false);
  // title of loading modal
  const [title, setTitle] = useState("");
  // variable for the index of plungerState received from welltimer
  const [plungerStateIndex, setPlungerStateIndex] = useState(null);
  // display the name of plungerState based on the received index
  const plungerState = [
    "POWER UP",
    "SHUTIN",
    "OPEN",
    "AFTERFLOW",
    "MANDATORY",
    "HILINE",
    "LOLINE",
  ];
  // prepare variables to set them the received data
  const [systemClock, setSystemClock] = useState(0);
  const [line, setLine] = useState();
  const [tubing, setTubing] = useState();
  const [casing, setCasing] = useState();
  const [arrivals, setArrivals] = useState([]);
  const [uniqueID, setUniqueID] = useState();
  const [fwVersion, setFwVersion] = useState();
  const [battery, setBattery] = useState();
  const tableHeader = [{ name: "Telemetry data" }];
  const tableData = [
    { column1: "Unique ID", column2: uniqueID },
    { column1: "FW version", column2: fwVersion },
    {
      column1: "Battery voltage (V)",
      column2: battery / 10,
    },
  ];

  const fetchDataWellStatus = async () => {
    try {
      await Receive.WellStatusReceivedData(props.connectedDevice, {
        setPlungerStateIndex,
        setSystemClock,
        setLine,
        setTubing,
        setCasing,
        setArrivals,
        setUniqueID,
        setFwVersion,
        setBattery,
        setLoading,
        setTitle,
      });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  };

  useEffect(() => {
    console.log("this is width", width);
  }, [width]);

  // Initial load, call WellStatusReceivedData function with the corresponding data
  useEffect(() => {
    // fetcha data if the device is connected
    if (props.connectedDevice) {
      const cleanup = fetchDataWellStatus();
      return () => cleanup; // Clean up subscription on component unmount or when device changes
    }
  }, [props.connectedDevice]);

  // get the seconds of systemClock state and convert them to HH:MM:SS format
  // const formattedTimeSystemClock =
  //   systemClock !== null ? Receive.convertToHMS(systemClock) : null;

  // function run when clicking on refresh button
  const onRefreshWellStatus = async () => {
    try {
      // call function to send request to device to get data
      Receive.sendReqToGetData(props.connectedDevice, 0);
      // start receiving data
      await Receive.WellStatusReceivedData(props.connectedDevice, {
        setPlungerStateIndex,
        setSystemClock,
        setLine,
        setTubing,
        setCasing,
        setArrivals,
        setUniqueID,
        setFwVersion,
        setBattery,
        setLoading,
        setTitle,
      });
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, styles.marginBottomContainer]}>
        <RefreshBtn onPress={() => onRefreshWellStatus()} />
        <View style={styles.statusContainer(width)}>
          <View style={styles.statusWrapper(width)}>
            <Text style={styles.statusText(width)}>Plunger state</Text>
            <Text style={styles.statusValue(width)}>
              {plungerState[plungerStateIndex]}
            </Text>
          </View>
          <View style={styles.statusWrapper(width)}>
            <Text style={styles.statusText(width)}>System clock</Text>
            <Text style={styles.statusValue(width)}>
              {systemClock !== null ? Receive.convertToHMS(systemClock) : null}
            </Text>
          </View>
          <View style={styles.statusWrapper(width)}>
            <Text style={styles.statusText(width)}>Line (PSI)</Text>
            <Text style={styles.statusValue(width)}>{line}</Text>
          </View>
          <View style={styles.statusWrapper(width)}>
            <Text style={styles.statusText(width)}>Tubing (PSI)</Text>
            <Text style={styles.statusValue(width)}>{tubing}</Text>
          </View>
          <View style={styles.statusWrapper(width)}>
            <Text style={styles.statusText(width)}>Casing (PSI)</Text>
            <Text style={styles.statusValue(width)}>{casing}</Text>
          </View>
          <View style={styles.emptyStatusWrapper(width)}></View>
        </View>
        <View style={styles.arrivalContainer}>
          <Arrival arrivals={arrivals} />
        </View>
        <View style={styles.telemetryDataContainer}>
          <Table data={tableData} header={tableHeader} />
        </View>
      </View>
      <Loading loading={loading} title={title} />
    </ScrollView>
  );
};

export default WellStatus;

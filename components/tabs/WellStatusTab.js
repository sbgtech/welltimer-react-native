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
  const scale =
    width < 600 ? width / 420 : width > 850 ? width / 1200 : width / 800;
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
  const [arrivals, setArrivals] = useState([
    { name: "Arrival 1", value: 25000 },
    { name: "Arrival 2", value: 14785 },
    { name: "Arrival 3", value: 89523 },
    { name: "Arrival 4", value: 25000 },
    { name: "Arrival 5", value: 41257 },
    { name: "Arrival 6", value: 12896 },
    { name: "Arrival 7", value: 25000 },
    { name: "Arrival 8", value: 42589 },
    { name: "Arrival 9", value: 25000 },
    { name: "Arrival 10", value: 45588 },
    { name: "Arrival 11", value: 25000 },
    { name: "Arrival 12", value: 12348 },
    { name: "Arrival 13", value: 25000 },
    { name: "Arrival 14", value: 25000 },
    { name: "Arrival 15", value: 25000 },
    { name: "Arrival 16", value: 25000 },
    { name: "Arrival 17", value: 75524 },
    { name: "Arrival 18", value: 25000 },
    { name: "Arrival 19", value: 74568 },
    { name: "Arrival 20", value: 56745 },
  ]);
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

  useEffect(() => {
    console.log("this is scale", scale);
  }, [scale]);

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
            <Text style={styles.statusText}>Plunger state</Text>
            <Text style={styles.statusValue}>
              {plungerState[plungerStateIndex]}
            </Text>
          </View>
          <View style={styles.statusWrapper(width)}>
            <Text style={styles.statusText}>System clock</Text>
            <Text style={styles.statusValue}>
              {systemClock !== null ? Receive.convertToHMS(systemClock) : null}
            </Text>
          </View>
          <View style={styles.statusWrapper(width)}>
            <Text style={styles.statusText}>Line (PSI)</Text>
            <Text style={styles.statusValue}>{line}</Text>
          </View>
          <View style={styles.statusWrapper(width)}>
            <Text style={styles.statusText}>Tubing (PSI)</Text>
            <Text style={styles.statusValue}>{tubing}</Text>
          </View>
          <View style={styles.statusWrapper(width)}>
            <Text style={styles.statusText}>Casing (PSI)</Text>
            <Text style={styles.statusValue}>{casing}</Text>
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

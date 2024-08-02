import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import Arrival from "./blocs/Arrival";
import { styles } from "./style/styles";
import Table from "./blocs/Table";
import RefreshBtn from "./blocs/RefreshBtn";
import { Receive } from "../Utils/Receive";
import Loading from "./blocs/Loading";

const SensorsTab = (props) => {
  const [loading, setLoading] = useState(false);
  const [plungerStateIndex, setPlungerStateIndex] = useState(null);
  const plungerState = [
    "POWER UP",
    "SHUTIN",
    "OPEN",
    "AFTERFLOW",
    "MANDATORY",
    "HILINE",
    "LOLINE",
  ];
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

  // Initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Receive.SensorsReceivedData(props.connectedDevice, {
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

  const formattedTime =
    systemClock !== null ? Receive.convertToHMS(systemClock) : null;

  const onRefresh = async () => {
    // call function to send req to device to get data
    Receive.sendReqToGetData(props.connectedDevice, 0);
    // start receiving data
    try {
      await Receive.SensorsReceivedData(props.connectedDevice, {
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
      });
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, styles.marginBottomContainer]}>
        <RefreshBtn onPress={() => onRefresh()} />
        <View style={styles.statusContainer}>
          <View style={styles.statusWrapper}>
            <Text style={styles.statusText}>Plunger state</Text>
            <Text style={styles.statusValue}>
              {plungerState[plungerStateIndex]}
            </Text>
          </View>

          <View style={styles.statusWrapper}>
            <Text style={styles.statusText}>System clock</Text>
            <Text style={styles.statusValue}>
              {formattedTime.hours} : {formattedTime.minutes} :{" "}
              {formattedTime.seconds}
            </Text>
          </View>
          <View style={styles.statusWrapper}>
            <Text style={styles.statusText}>Line (PSI)</Text>
            <Text style={styles.statusValue}>{line}</Text>
          </View>
          <View style={styles.statusWrapper}>
            <Text style={styles.statusText}>Tubing (PSI)</Text>
            <Text style={styles.statusValue}>{tubing}</Text>
          </View>
          <View style={styles.statusWrapper}>
            <Text style={styles.statusText}>Casing (PSI)</Text>
            <Text style={styles.statusValue}>{casing}</Text>
          </View>
        </View>
        <View style={styles.arrivalContainer}>
          <Arrival arrivals={arrivals} />
        </View>
        <View style={styles.telemetryDataContainer}>
          <Table data={tableData} header={tableHeader} />
        </View>
      </View>
      <Loading loading={loading} />
    </ScrollView>
  );
};

export default SensorsTab;

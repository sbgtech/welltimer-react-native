import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, RefreshControl } from "react-native";
import Arrival from "./blocs/Arrival";
import { styles } from "./style/styles";
import Table from "./blocs/Table";
import RefreshBtn from "./blocs/RefreshBtn";
import { Receive } from "../Utils/Receive";
import Loading from "./blocs/Loading";

const SensorsTab = (props) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State to track refresh
  const tableHeader = [{ name: "Telemetry data" }];
  const tableData = [
    { column1: "Unique ID", column2: "2747475587473" },
    { column1: "FW version", column2: "78.78" },
    {
      column1: "Battery voltage (V)",
      column2: "13.4",
    },
  ];

  const onRefresh = () => {
    // Simulate fetching new data for your table
    setRefreshing(true);
    // Perform your async refresh operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2500); // Simulating a delay (remove this in real implementation)
  };

  useEffect(() => {
    // setLoading(true);
    // Receive.SensorsReceivedData(props.connectedDevice, {
    //   setLoading,
    // });
  }, []);

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
        <View style={styles.statusWrapper}>
          <Text style={styles.statusText}>Plunger state</Text>
          <Text style={styles.statusValue}>Afterflow</Text>
        </View>
        <View style={styles.statusWrapper}>
          <Text style={styles.statusText}>System clock</Text>
          <Text style={styles.statusValue}>00:01:12</Text>
        </View>
        <View style={styles.statusWrapper}>
          <Text style={styles.statusText}>Line (PSI)</Text>
          <Text style={styles.statusValue}>1200</Text>
        </View>
        <View style={styles.statusWrapper}>
          <Text style={styles.statusText}>Tubing (PSI)</Text>
          <Text style={styles.statusValue}>1225</Text>
        </View>
        <View style={styles.statusWrapper}>
          <Text style={styles.statusText}>Casing (PSI)</Text>
          <Text style={styles.statusValue}>852</Text>
        </View>
        <View style={styles.arrivalContainer}>
          <Arrival />
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

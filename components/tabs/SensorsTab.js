import React, { useState } from "react";
import { View, ScrollView, Text, RefreshControl } from "react-native";
import Arrival from "./blocs/Arrival";
import Psi from "./blocs/Psi";
import { styles } from "./style/styles";
import Table from "./blocs/Table";

const SensorsTab = () => {
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
    }, 2000); // Simulating a delay (remove this in real implementation)
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#9Bd35A", "#689F38"]}
          // colors prop is for setting the colors of the refresh indicator on Android
          // On iOS, it uses the tintColor prop to set the color of the refresh indicator
        />
      }
    >
      <View style={[styles.container, styles.marginBottomContainer]}>
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
          <Text style={styles.statusValue}>00:01:12</Text>
        </View>
        <View style={styles.statusWrapper}>
          <Text style={styles.statusText}>Tubing (PSI)</Text>
          <Text style={styles.statusValue}>00:01:12</Text>
        </View>
        <View style={styles.statusWrapper}>
          <Text style={styles.statusText}>Casing (PSI)</Text>
          <Text style={styles.statusValue}>00:01:12</Text>
        </View>
        <View style={styles.arrivalContainer}>
          <Arrival />
        </View>
        <View style={styles.telemetryDataContainer}>
          <Table data={tableData} header={tableHeader} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SensorsTab;

import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import Arrival from "./blocs/Arrival";
import Psi from "./blocs/Psi";
import Valve from "./blocs/Valve";
import { styles } from "./style/styles";
import Table from "./blocs/Table";

const SensorsTab = () => {
  const tableHeader = [{ name: "Telemetry data" }];
  const tableData = [
    { column1: "Unique ID", column2: "2747475587473" },
    { column1: "FW version", column2: "78.78" },
    {
      column1: "Battery voltage (V)",
      column2: "13.4",
    },
    {
      column1: "System clock",
      column2: "00:01:12",
    },
  ];

  return (
    <ScrollView>
      <View style={[styles.container, styles.marginBottomContainer]}>
        <View style={styles.statusWrapper}>
          <Text style={styles.statusText}>Status</Text>
          <Text style={styles.statusValue}>05:02:22</Text>
        </View>
        <Valve title={"Valve A"} />
        <Psi title={"Line (PSI)"} value={2000} />
        <Psi title={"Tubing (PSI)"} value={1700} />
        <Psi title={"Casing (PSI)"} value={1200} />
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

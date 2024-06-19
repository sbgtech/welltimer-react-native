import React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import Arrival from "./blocs/Arrival";
import Psi from "./blocs/Psi";
import Valve from "./blocs/Valve";
import { styles } from "./style/styles";

const SensorsTab = () => {
  const { width, height } = Dimensions.get("window");
  const marginBottom = height * 0.05; // Adjust 0.05 as needed for your layout

  return (
    <ScrollView>
      <View style={[styles.container, { marginBottom: marginBottom }]}>
        <Valve title={"Valve A"} />
        <Psi title={"Line (PSI)"} value={2000} />
        <Psi title={"Tubing (PSI)"} value={1700} />
        <Psi title={"Casing (PSI)"} value={1200} />
        <View style={styles.arrivalContainer}>
          <Arrival name={"Arrival 1"} value={"02:40:34"} />
          <Arrival name={"Arrival 2"} value={"01:56"} />
          <Arrival name={"Arrival 3"} value={"02:40:34"} />
          <Arrival name={"Arrival 4"} value={"49:04"} />
          <Arrival name={"Arrival 5"} value={"01:56"} />
          <Arrival name={"Arrival 6"} value={"49:04"} />
          <Arrival name={"Arrival 7"} value={"01:56"} />
          <Arrival name={"Arrival 8"} value={"49:04"} />
          <Arrival name={"Arrival 9"} value={"13:00"} />
          <Arrival name={"Arrival 10"} value={"01:56"} />
          <Arrival name={"Arrival 11"} value={"02:40:34"} />
          <Arrival name={"Arrival 12"} value={"49:04"} />
          <Arrival name={"Arrival 13"} value={"13:00"} />
          <Arrival name={"Arrival 14"} value={"13:00"} />
          <Arrival name={"Arrival 15"} value={"02:40:34"} />
          <Arrival name={"Arrival 16"} value={"49:04"} />
          <Arrival name={"Arrival 17"} value={"01:56"} />
          <Arrival name={"Arrival 18"} value={"13:00"} />
          <Arrival name={"Arrival 19"} value={"02:40:34"} />
          <Arrival name={"Arrival 20"} value={"13:00"} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SensorsTab;

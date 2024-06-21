import React, { useState } from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { styles } from "../style/styles";

const Arrival = () => {
  const dataArray = [
    { name: "Arrival 1", value: "00:09:56" },
    { name: "Arrival 2", value: "00:09:56" },
    { name: "Arrival 3", value: "00:09:56" },
    { name: "Arrival 4", value: "00:09:56" },
    { name: "Arrival 5", value: "00:09:56" },
    { name: "Arrival 6", value: "00:09:56" },
    { name: "Arrival 7", value: "00:09:56" },
    { name: "Arrival 8", value: "00:09:56" },
    { name: "Arrival 9", value: "00:09:56" },
    { name: "Arrival 10", value: "00:09:56" },
    { name: "Arrival 11", value: "00:09:56" },
    { name: "Arrival 12", value: "00:09:56" },
    { name: "Arrival 13", value: "00:09:56" },
    { name: "Arrival 14", value: "00:09:56" },
    { name: "Arrival 15", value: "00:09:56" },
    { name: "Arrival 16", value: "00:09:56" },
    { name: "Arrival 17", value: "00:09:56" },
    { name: "Arrival 18", value: "00:09:56" },
    { name: "Arrival 19", value: "00:09:56" },
    { name: "Arrival 20", value: "00:09:56" },
  ];
  return (
    <ScrollView style={styles.arrivalWrapper}>
      {dataArray.map((data, index) => (
        <View key={index} style={styles.arrivalItems}>
          <Text style={styles.arrivalName}>{data.name} :</Text>
          <Text style={styles.arrivalValue}>{data.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Arrival;

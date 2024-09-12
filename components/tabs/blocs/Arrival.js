import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { styles } from "../style/styles";
import { Receive } from "../../Utils/Receive";

const Arrival = ({ arrivals }) => {
  const formattedTimeArrivals = (value) => {
    if (Number(value) == 65535) {
      return "FAIL";
    } else if (Number(value) == 0) {
      return 0;
    } else {
      return Receive.convertToHMS(value);
    }
  };
  return (
    <ScrollView style={styles.arrivalWrapper} nestedScrollEnabled={true}>
      {arrivals.map((data, index) => {
        // const { formattedHours, formattedMinutes, formattedSeconds } =
        //   formattedTimeArrivals(data.value);
        return (
          <View key={index} style={styles.arrivalItems}>
            <Text style={styles.arrivalName}>{data.name}</Text>
            <Text style={styles.arrivalValue}>
              {formattedTimeArrivals(data.value)}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Arrival;

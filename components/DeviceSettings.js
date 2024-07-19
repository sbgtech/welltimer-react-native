import React from "react";
import { View, StyleSheet } from "react-native";
import TabView from "./tabs/TabView";

const DeviceSettings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TabView navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 1, // Adjust as needed
  },
});

export default DeviceSettings;

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import TabView from "./tabs/TabView";

const DeviceSettings = ({ navigation, route }) => {
  console.log("first", route.params?.initialTab);
  const initialTab = route.params?.initialTab || 0;

  useEffect(() => {
    initialTab == 0;
    console.log("wa");
  }, [route.params?.initialTab]);

  return (
    <View style={styles.container}>
      <TabView navigation={navigation} initialTab={initialTab} />
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

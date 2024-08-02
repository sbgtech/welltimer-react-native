import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import ButtonUI from "../ButtonUI";
import Tab from "./Tab";
import SensorsTab from "./SensorsTab";
import TimerTab from "./TimerTab";
import SettingsTab from "./SettingsTab";
import TestTab from "./TestTab";
import { BleManager } from "react-native-ble-plx";
import { UART_SERVICE_UUID } from "../Utils/Constants";
import { styles } from "./style/styles";
import { Receive } from "../Utils/Receive";

const bleManager = new BleManager();

const TabView = ({ navigation }) => {
  const [connectedDevice, setConnectedDevice] = useState(null);
  const tabs = [
    {
      label: "Well status",
      content: <SensorsTab connectedDevice={connectedDevice} />,
    },
    {
      label: "Timers",
      content: <TimerTab connectedDevice={connectedDevice} />,
    },
    {
      label: "Settings",
      content: <SettingsTab connectedDevice={connectedDevice} />,
    },
    {
      label: "Test",
      content: <TestTab connectedDevice={connectedDevice} />,
    },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
    // sendReq();
  };

  useEffect(() => {
    const checkDeviceConnection = async () => {
      const connectedDevices = await bleManager.connectedDevices([
        UART_SERVICE_UUID,
      ]);
      if (connectedDevices.length > 0) {
        setConnectedDevice(connectedDevices[0]);
        Receive.sendReqToGetData(connectedDevice, activeTab);
      } else {
        Alert.alert(
          "Warning",
          "The device is disconnected",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Canceled"),
              style: "cancel",
            },
            { text: "OK", onPress: () => navigation.navigate("Home") },
          ],
          { cancelable: false }
        );
      }
    };

    checkDeviceConnection();
  }, []);

  useEffect(() => {
    if (connectedDevice) {
      Receive.sendReqToGetData(connectedDevice, activeTab); // Send request whenever activeTab changes
    }
  }, [activeTab, connectedDevice]); // Watch activeTab changes

  const disconnectFromDevice = async () => {
    try {
      if (connectedDevice) {
        await connectedDevice.cancelConnection();
        console.log("Disconnected successfully");
        navigation.navigate("Home");
      } else {
        console.log("No device connected");
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  const handleDisconnect = () => {
    Alert.alert(
      "Disconnect",
      "Are you sure you want to disconnect from the device?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel disconnect"),
          style: "cancel",
        },
        { text: "Disconnect", onPress: () => disconnectFromDevice() },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.deviceBloc}>
        <View>
          <Text style={styles.deviceTitle}>Connected Devices:</Text>
        </View>
        {connectedDevice ? (
          <View key={connectedDevice.id}>
            <Text style={styles.deviceInfo}>Name: {connectedDevice.name}</Text>
            <Text style={styles.deviceInfo}>ID: {connectedDevice.id}</Text>
            <ButtonUI
              onPress={() => handleDisconnect()}
              title={"Disconnect"}
              btnStyle={styles.deviceBtns}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        ) : (
          <Text style={styles.deviceInfo}>No connected devices</Text>
        )}
      </View>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            isActive={index === activeTab}
            onPress={() => handleTabPress(index)}
          />
        ))}
      </View>
      <View style={styles.contentContainer}>{tabs[activeTab].content}</View>
    </View>
  );
};

export default TabView;

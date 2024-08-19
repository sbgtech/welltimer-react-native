import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import ButtonUI from "../ButtonUI";
import Tab from "./Tab";
import WellStatus from "./WellStatusTab";
import TimerTab from "./TimerTab";
import SettingsTab from "./SettingsTab";
import TestTab from "./TestTab";
import { BleManager } from "react-native-ble-plx";
import { UART_SERVICE_UUID } from "../Utils/Constants";
import { styles } from "./style/styles";
import { Receive } from "../Utils/Receive";

const bleManager = new BleManager();

const TabView = ({ navigation }) => {
  // set the connected welltimer to this variable
  const [connectedDevice, setConnectedDevice] = useState(null);
  // the existed pages for config welltimer after connected to it
  const tabs = [
    {
      label: "Well status",
      content: <WellStatus connectedDevice={connectedDevice} />,
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
  // variable used for known the current page, default is the first page (index 0)
  const [activeTab, setActiveTab] = useState(0);

  // function to set active page to the variable when pressing on the page
  const handleTabPress = (index) => {
    setActiveTab(index);
    // sendReq();
  };

  // useEffect used for handling side effects in component like data fetching, event listeners, subscriptions, timers, updating state or manually changing the DOM that can’t be done during rendering
  useEffect(() => {
    // verify the device is connected or not
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
    // if device is connected ,call send requests function to send request to device with the current page input to get data and display them
    if (connectedDevice) {
      Receive.sendReqToGetData(connectedDevice, activeTab);
    }
  }, [activeTab, connectedDevice]); // Send request whenever activeTab changes (call useEffect whenever activeTab changes)

  // function to disconnect the current connected device from BLE
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

  // when clicking on disconnect button, run this function
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
        { text: "Disconnect", onPress: () => disconnectFromDevice() }, // call disconnectFromDevice function
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

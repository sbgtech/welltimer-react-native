import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import ButtonUI from "../ButtonUI";
import Tab from "./Tab";
import SensorsTab from "./SensorsTab";
import TimerTab from "./TimerTab";
import SettingsTab from "./SettingsTab";
import TestTab from "./TestTab";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "../Utils/Constants";
import { styles } from "./style/styles";

const bleManager = new BleManager();

const TabView = ({ navigation }) => {
  const [connectedDevice, setConnectedDevice] = useState([]);
  const tabs = [
    { label: "Well status", content: <SensorsTab /> },
    {
      label: "Timers",
      content: <TimerTab connectedDevice={connectedDevice[0]} />,
    },
    {
      label: "Settings",
      content: <SettingsTab connectedDevice={connectedDevice[0]} />,
    },
    {
      label: "Test",
      content: <TestTab connectedDevice={connectedDevice[0]} />,
    },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const checkDeviceConnection = async () => {
      const connectedDevices = await bleManager.connectedDevices([
        UART_SERVICE_UUID,
      ]);
      if (connectedDevices.length > 0) {
        setConnectedDevice(connectedDevices);
        sendReq();
      }
      //   else {
      //     Alert.alert(
      //       "Warning",
      //       "The device is disconnected",
      //       [
      //         {
      //           text: "Cancel",
      //           onPress: () => console.log("Canceled"),
      //           style: "cancel",
      //         },
      //         { text: "OK", onPress: () => navigation.navigate("Home") },
      //       ],
      //       { cancelable: false }
      //     );
      //   }
    };

    checkDeviceConnection();
  }, [activeTab]);

  // function for sending data
  const sendReq = () => {
    const data = "0x0" + (activeTab + 1) + " \n";
    const buffer = Buffer.from(data, "utf-8");
    connectedDevice[0]?.writeCharacteristicWithResponseForService(
      UART_SERVICE_UUID,
      UART_TX_CHARACTERISTIC_UUID,
      buffer.toString("base64")
    );
    console.log("req sent : ", data);
  };

  //   const sendData = async (data) => {
  //     try {
  //       const buffer = Buffer.from(data, "utf-8");
  //       await connectedDevice[0]?.writeCharacteristicWithResponseForService(
  //         UART_SERVICE_UUID,
  //         UART_TX_CHARACTERISTIC_UUID,
  //         buffer.toString("base64")
  //       );
  //       Toast.show({
  //         type: "success",
  //         text1: "Success",
  //         text2: "Data sent to " + connectedDevice[0].name,
  //         visibilityTime: 3000,
  //       });
  //     } catch (error) {
  //       console.error("Error sending data:", error);
  //     }
  //   };

  const disconnectFromDevice = async () => {
    try {
      if (connectedDevice[0]) {
        await connectedDevice[0].cancelConnection();
        setConnectedDevice([]);
        console.log("Disconnected from device:", connectedDevice[0].name);
        navigation.navigate("Home");
      }
    } catch (error) {
      if (error.message === "Operation was cancelled") {
        // Handle cancellation gracefully (optional)
        console.log("Disconnect operation was cancelled.");
      } else {
        console.error("Error disconnecting from device:", error);
      }
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
        {connectedDevice.length > 0 ? (
          <View key={connectedDevice[0].id}>
            <Text style={styles.deviceInfo}>
              Name: {connectedDevice[0].name}
            </Text>
            <Text style={styles.deviceInfo}>ID: {connectedDevice[0].id}</Text>
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

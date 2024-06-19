import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import SensorsTab from "./tabs/SensorsTab";
import TimerTab from "./tabs/TimerTab";
import TestTab from "./tabs/TestTab";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";
import { styles } from "./tabs/style/styles";

const initialLayout = { width: Dimensions.get("window").width };

const bleManager = new BleManager();

export default function DevicePage() {
  const [connectedDevice, setConnectedDevice] = useState([]);
  const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
  const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

  const { width } = Dimensions.get("window");
  const scale = width / 450;

  const Sensors = () => <SensorsTab />;
  const Timers = () => (
    <TimerTab sendData={sendData} connectedDevice={connectedDevice[0]} />
  );
  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#fff" }} />
  );
  const TestMode = () => <TestTab />;

  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "sensor", title: "Sensors" },
      { key: "timer", title: "Timers" },
      { key: "third", title: "Third" },
      { key: "test", title: "Test" },
    ],
  });

  useEffect(() => {
    console.log("enter page");
    // when page refreshed
    const checkDeviceConnection = async () => {
      const connectedDevices = await bleManager.connectedDevices([
        UART_SERVICE_UUID,
      ]);
      if (connectedDevices.length > 0) {
        setConnectedDevice(connectedDevices);
        console.log("ready to receive data");
        receiveData(connectedDevices[0]);
      }
    };
    checkDeviceConnection();
    // Cleanup function to stop scanning when component unmounts
    return () => {
      console.log("leaving page");
    };
  }, []);

  // function for receiving data
  const receiveData = (device) => {
    device?.monitorCharacteristicForService(
      UART_SERVICE_UUID,
      UART_RX_CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.error(error);
          return;
        }
        const msg = Buffer.from(characteristic.value, "base64").toString(
          "utf-8"
        );
        console.log("Received data:", msg);
      }
    );
  };

  // function for sending data
  const sendData = (device, data) => {
    const buffer = Buffer.from(data, "utf-8");
    device
      ?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      )
      .then((characteristic) => {
        console.log("Sent data: ", data);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Data sent to " + connectedDevice[0].name,
          visibilityTime: 3000,
        });
      })
      .catch((error) => {
        console.error(error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error to send data to " + connectedDevice[0].name,
          visibilityTime: 3000,
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusWrapper}>
        <Text style={styles.statusText}>Status</Text>
        <Text style={styles.statusText}>05:02:22</Text>
      </View>
      <TabView
        navigationState={state}
        renderScene={SceneMap({
          sensor: Sensors,
          timer: Timers,
          third: ThirdRoute,
          test: TestMode,
        })}
        onIndexChange={(index) => setState({ ...state, index })}
        initialLayout={initialLayout}
        scrollEnabled={true}
        swipeEnabled={true}
        animationEnabled={true}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#fff" }}
            tabStyle={{ width: 100 * scale, height: 52 * scale }}
            scrollEnabled={true}
            style={{ backgroundColor: "#35374B" }}
            activeColor="#fff"
            inactiveColor="#b0b0b0"
            pressColor="#fff"
            labelStyle={{ fontSize: 14 * scale }}
          />
        )}
      />
    </View>
  );
}

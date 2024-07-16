import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import SensorsTab from "./tabs/SensorsTab";
import TimerTab from "./tabs/TimerTab";
import TestTab from "./tabs/TestTab";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";
import { styles } from "./tabs/style/styles";
import SettingsTab from "./tabs/SettingsTab";
import ButtonUI from "./ButtonUI";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "./Utils/Constants";

const initialLayout = { width: Dimensions.get("window").width };

const bleManager = new BleManager();

export default function DevicePage({ navigation }) {
  const [connectedDevice, setConnectedDevice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataReceived, setDataReceived] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const { width } = Dimensions.get("window");
  const scale = width / 450;

  const Sensors = () => <SensorsTab />;
  const Timers = () => (
    <TimerTab sendData={sendData} connectedDevice={connectedDevice[0]} />
  );
  const Settings = () => <SettingsTab />;
  const TestMode = () => (
    <TestTab
      // dataArray={dataArray}
      // sendData={sendData}
      connectedDevice={connectedDevice[0]}
    />
  );

  const [index, setIndex] = useState(0);
  const routes = [
    { key: "sensor", title: "Sensors" },
    { key: "timer", title: "Timers" },
    { key: "settings", title: "Settings" },
    { key: "test", title: "Test" },
  ];

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex); // Update state with new index
  };

  useEffect(() => {
    console.log("page number ", index);
    const checkDeviceConnection = async () => {
      const connectedDevices = await bleManager.connectedDevices([
        UART_SERVICE_UUID,
      ]);
      if (connectedDevices.length > 0) {
        setConnectedDevice(connectedDevices);
        sendReq();
      }
    };

    checkDeviceConnection();
  }, [loading, dataReceived, index]);

  const addObject = (data, type) => {
    const newObj = { date: Date.now(), data: data, type: type };
    setDataArray((prevArray) => [...prevArray, newObj]);
  };

  // function for receiving data
  const receiveData = async (device) => {};

  const sendData = async (data) => {
    try {
      const buffer = Buffer.from(data, "utf-8");
      await connectedDevice[0]?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent to " + connectedDevice[0].name,
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // function for sending data
  const sendReq = () => {
    const data = "0x0" + index + " \n";
    const buffer = Buffer.from(data, "utf-8");
    connectedDevice[0]?.writeCharacteristicWithResponseForService(
      UART_SERVICE_UUID,
      UART_TX_CHARACTERISTIC_UUID,
      buffer.toString("base64")
    );
    // Toast.show({
    //   type: "info",
    //   text1: "Info",
    //   text2: "Data sent " + data,
    //   visibilityTime: 3000,
    // });
    console.log("data sent : ", data);
  };

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
          </View>
        ) : (
          <Text style={styles.deviceInfo}>No connected devices</Text>
        )}
        {connectedDevice.length > 0 && (
          <View style={styles.deviceBtnsBloc}>
            <ButtonUI
              onPress={() => navigation.navigate("TestMode")}
              title={"Test mode"}
              btnStyle={styles.deviceBtns}
              txtStyle={styles.TextSendStyle}
              loading={false}
            />
            <ButtonUI
              onPress={() => handleDisconnect()}
              title={"Disconnect"}
              btnStyle={styles.deviceBtns}
              txtStyle={styles.TextSendStyle}
              loading={false}
            />
          </View>
        )}
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          sensor: Sensors,
          timer: Timers,
          settings: Settings,
          test: TestMode,
        })}
        onIndexChange={handleIndexChange}
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
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.waitingMsg}>Wait</Text>
            <ActivityIndicator color={"#35374B"} size={"large"} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

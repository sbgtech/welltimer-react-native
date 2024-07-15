import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { BleManager } from "react-native-ble-plx";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "./Utils/Constants";
import { Buffer } from "buffer";
import { styles } from "./tabs/style/styles";

const bleManager = new BleManager();

const TestMode = () => {
  const [connectedDevice, setConnectedDevice] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    let received = false;
    connectedDevice[0]?.monitorCharacteristicForService(
      UART_SERVICE_UUID,
      UART_RX_CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          return;
        }
        const receivedMessage = Buffer.from(
          characteristic.value,
          "base64"
        ).toString("utf-8");
        console.log(receivedMessage);
        received = true;
      }
    );
    console.log(received);
    if (received) {
      // const receivedMessage = `Message received at ${new Date().toLocaleTimeString()}`;
      setDataList((prevDataList) => [
        ...prevDataList,
        { id: Date.now().toString(), message: "ok" },
      ]);
      setDataReceived(true);
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data received",
        visibilityTime: 3000,
      });
    }
    if (loading) {
      const timer = setTimeout(() => {
        if (!dataReceived) {
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "No data received within 5 seconds",
            visibilityTime: 3000,
          });
          setLoading(false);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }

    checkDeviceConnection();
  }, [loading, dataReceived]);

  const checkDeviceConnection = async () => {
    const connectedDevices = await bleManager.connectedDevices([
      UART_SERVICE_UUID,
    ]);
    if (connectedDevices.length > 0) {
      setConnectedDevice(connectedDevices);
    }
  };

  const sendData = async () => {
    setLoading(true);
    setDataReceived(false);
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "Data sent, waiting for response...",
      visibilityTime: 3000,
    });
    const data = "PING \n";
    const buffer = Buffer.from(data, "utf-8");
    await connectedDevice[0]?.writeCharacteristicWithResponseForService(
      UART_SERVICE_UUID,
      UART_TX_CHARACTERISTIC_UUID,
      buffer.toString("base64")
    );
    setDataList((prevDataList) => [
      ...prevDataList,
      { id: Date.now().toString(), message: data },
    ]);

    // Simulate data reception after a random delay
    // setTimeout(() => {
    //   //   const received = Math.random() > 0.5; // Randomly decide if data is received

    // }, Math.random() * 3000);
  };

  return (
    <View style={styl.container}>
      <Text style={styl.title}>React Native BLE PLX Example</Text>
      {connectedDevice.length > 0 ? (
        <View key={connectedDevice[0].id}>
          <Text style={styles.deviceInfo}>Name: {connectedDevice[0].name}</Text>
          <Text style={styles.deviceInfo}>ID: {connectedDevice[0].id}</Text>
        </View>
      ) : (
        <Text style={styles.deviceInfo}>No connected devices</Text>
      )}
      <Button title="Send Data" onPress={sendData} />
      <FlatList
        data={dataList}
        renderItem={({ item }) => <Text style={styl.item}>{item.message}</Text>}
        keyExtractor={(item) => item.id}
        style={styl.list}
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
};

const styl = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  list: {
    marginTop: 16,
    width: "100%",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default TestMode;

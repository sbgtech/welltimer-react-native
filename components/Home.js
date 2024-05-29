import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Item from "./Item";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
import ButtonUI from "./ButtonUI";
import Toast from "react-native-toast-message";

const bleManager = new BleManager();

export default function Home({ navigation }) {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
  const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

  // const DATA = [
  //   {
  //     id: "1",
  //     title: "200413 Earl 591-4HM",
  //   },
  //   {
  //     id: "2",
  //     title: "P180523 43-0913H - Alonzo",
  //   },
  //   {
  //     id: "3",
  //     title: "160701 Maryle 60-1H",
  //   },
  //   {
  //     id: "4",
  //     title: "190308 Zybach 6010H",
  //   },
  //   {
  //     id: "5",
  //     title: "170403 Jose 1-14H",
  //   },
  //   {
  //     id: "6",
  //     title: "170315 Davis Bussey SA 3H -Jeremy-",
  //   },
  //   {
  //     id: "7",
  //     title: "220803 Renegade Chenille Unit 2H  -Dean-",
  //   },
  //   {
  //     id: "8",
  //     title: "170456 Earl 591-4HM",
  //   },
  //   {
  //     id: "9",
  //     title: "300803 Renegade Chenille",
  //   },
  //   {
  //     id: "10",
  //     title: "170405 Jose 1-14H",
  //   },
  //   {
  //     id: "11",
  //     title: "P180525 43-0913H - Alonzo",
  //   },
  //   {
  //     id: "12",
  //     title: "P180523",
  //   },
  // ];

  useEffect(() => {
    if (scanning) {
      scanForDevices();
    } else {
      bleManager.stopDeviceScan();
    }
    // Cleanup function to stop scanning when component unmounts
    return () => {
      bleManager.stopDeviceScan();
    };
  }, [scanning]);

  const scanForDevices = () => {
    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.error("Error scanning for devices:", error);
        return;
      }
      // if (scannedDevice.name === "WELLTIMER") {
      //   bleManager.stopDeviceScan();
      // }
      // Update the list of devices
      if (!devices.find((d) => d.id === scannedDevice.id)) {
        if (scannedDevice.name) {
          setDevices((prevDevices) => [...prevDevices, scannedDevice]);
        }
      }
      // setDevices((prevDevices) => [...prevDevices, scannedDevice]);
    });
  };

  const connectToDevice = async (selectedDevice) => {
    if (!selectedDevice) return;
    try {
      await selectedDevice
        .connect()
        .then((device) => device.discoverAllServicesAndCharacteristics())
        .then((device) => {
          console.log("Connected to", device.name);
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Connected to " + device.name,
            visibilityTime: 3000,
          });
          setIsConnected(true);
          receiveData(device);
          navigation.navigate("DevicePage");
        });
      // Once connected, you can perform further operations, such as discovering services and characteristics
    } catch (error) {
      console.error("Error connecting to device:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error connecting to device",
        visibilityTime: 3000,
      });
    }
  };

  const sendData = (device, data) => {
    const buffer = Buffer.from(data, "utf-8");
    device
      .writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      )
      .then((characteristic) => {
        console.log("Data sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const receiveData = (device) => {
    device.monitorCharacteristicForService(
      UART_SERVICE_UUID,
      UART_RX_CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.error(error);
          return;
        }
        const data = Buffer.from(characteristic.value, "base64").toString(
          "utf-8"
        );
        console.log("Received data:", data);
      }
    );
  };

  const renderItem = ({ item }) => (
    <Item name={item.name} onPress={() => connectToDevice(item)} />
  );

  return (
    <View style={styles.HomeView}>
      <ButtonUI
        onPress={() => {
          console.log("scan"), setScanning(!scanning);
        }}
        title={scanning ? "Stop Scanning" : "Scan devices"}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.HomeTitle}>Available devices </Text>
        {scanning && <ActivityIndicator size="small" color="#35374B" />}
      </View>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  HomeView: {
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: 10,
  },
  HomeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginHorizontal: 4,
    marginBottom: 10,
  },
});

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Alert,
} from "react-native";
import Item from "./Item";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
import ButtonUI from "./ButtonUI";
import Toast from "react-native-toast-message";
import TestTab from "./tabs/TestTab";

const bleManager = new BleManager();

export default function Home({ navigation }) {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);

  const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
  const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

  // Request Bluetooth permissions
  async function requestBluetoothPermissions() {
    try {
      // Request permissions for Android
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // permission for location
          {
            title: "Bluetooth Permission",
            message:
              "This app requires access to your device's Bluetooth services.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // if bluetooth activate
          console.log("Bluetooth permissions granted");
          // Start scanning for BLE devices
          // bleManager
          //   .connectedDevices(UART_SERVICE_UUID)
          //   .then((peripheralsArray) => {
          //     setIsConnected(false);
          //     setConnectedDevices(
          //       peripheralsArray.map((peripheral) => peripheral.id)
          //     );
          //   });
          if (scanning) {
            scanForDevices();
          } else {
            bleManager.stopDeviceScan();
          }
        } else {
          console.log("Bluetooth permissions denied");
          // Handle permission denied
          Alert.alert(
            "Permission Denied",
            "Bluetooth permission is required to use this app."
          );
        }
        // Request permissions for iOS (no need for explicit permission request)
      } else if (Platform.OS === "ios") {
        // Check if Bluetooth is enabled
        bleManager
          .state()
          .then((state) => {
            if (state === "PoweredOn") {
              console.log("Bluetooth is enabled");
              // Start scanning for BLE devices
              if (scanning) {
                scanForDevices();
              } else {
                bleManager.stopDeviceScan();
              }
            } else {
              console.log("Bluetooth is disabled");
              Alert.alert(
                "Bluetooth Required",
                "Please enable Bluetooth to use this app."
              );
            }
          })
          .catch((error) => {
            // error for bluetooth state
            console.error("Error checking Bluetooth state:", error);
          });
      }
    } catch (error) {
      // error for bluetooth requesting permissions
      console.error("Error requesting Bluetooth permissions:", error);
    }
  }

  useEffect(() => {
    // when page refreshed call requestBluetoothPermissions function
    requestBluetoothPermissions();

    // Cleanup function to stop scanning when component unmounts
    return () => {
      bleManager.stopDeviceScan();
    };
  }, [scanning]);

  // function to scan devices
  const scanForDevices = () => {
    setDevices([]); // empty array
    bleManager.startDeviceScan(
      null,
      { allowDuplicates: false },
      (error, scannedDevice) => {
        if (error) {
          // if error when scanning
          console.error("Error scanning for devices:", error);
          return;
        }
        // If the device is new, add it to the scanned devices list
        if (!devices.includes(scannedDevice.id)) {
          if (scannedDevice.name) {
            // eliminate unknowed devices
            setDevices((prevDevices) => [...prevDevices, scannedDevice]); // push to array any device scanned
          }
        }
      }
    );
  };

  // const handleButtonPress = (device) => {
  //   if (connectedDevices.includes(device.id)) {
  //     bleManager
  //       .cancelDeviceConnection(device.id)
  //       .then(() => {
  //         setConnectedDevices(
  //           connectedDevices.filter((id) => id !== device.id)
  //         );
  //         console.log("Disconnected from device", device.name);
  //       })
  //       .catch((error) => {
  //         console.log("Disconnect error:", error);
  //       });
  //   } else {
  //     connectToDevice(device);
  //     setConnectedDevices([...connectedDevices, device.id]);
  //   }
  // };

  // function allow user to connect to device
  const connectToDevice = async (selectedDevice) => {
    if (!selectedDevice) return; // if not exist any device selected
    try {
      // connect to selected device
      await selectedDevice
        .connect()
        .then((device) => device.discoverAllServicesAndCharacteristics()) // discovering services and characteristics of device
        .then((device) => {
          // success to connect to device
          console.log("Connected to", device.name);
          // showing toast for successfully connected
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Connected to " + device.name,
            visibilityTime: 3000,
          });
          setIsConnected(true); // change the state of isConnceted varibale to true (exist a conection to device)
          // receiveData(device); // ready to receive data from the device
          navigation.navigate("DevicePage"); // navigate to device settings page
          // sendData(
          //   device,
          //   "{ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFG}\n"
          // );
        });
    } catch (error) {
      // error connecting to device
      console.error("Error connecting to device:", error);
      // showing toast for error connected
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error connecting to device",
        visibilityTime: 3000,
      });
    }
  };

  // finction for sending data
  // const sendData = (device, data) => {
  //   const buffer = Buffer.from(data, "utf-8");
  //   device
  //     .writeCharacteristicWithResponseForService(
  //       UART_SERVICE_UUID,
  //       UART_TX_CHARACTERISTIC_UUID,
  //       buffer.toString("base64")
  //     )
  //     .then((characteristic) => {
  //       console.log("Data sent");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // function to receive data from device
  // const receiveData = (device) => {
  //   device.monitorCharacteristicForService(
  //     UART_SERVICE_UUID,
  //     UART_RX_CHARACTERISTIC_UUID,
  //     (error, characteristic) => {
  //       if (error) {
  //         console.error(error);
  //         return;
  //       }
  //       const data = Buffer.from(characteristic.value, "base64").toString(
  //         "utf-8"
  //       );
  //       console.log("Received data:", data);
  //     }
  //   );
  // };

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      onPress={() => connectToDevice(item)}
      title={"Connect"}
    />
  );

  return (
    <View style={styles.HomeView}>
      <ButtonUI
        onPress={() => {
          setScanning(!scanning);
        }}
        title={scanning ? "Stop Scanning" : "Scan devices"}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.HomeTitle}>Available devices </Text>
        {scanning && <ActivityIndicator size="small" color="#35374B" />}
      </View>
      <Text>{connectedDevices}</Text>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        refreshing={false}
        onRefresh={scanForDevices}
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

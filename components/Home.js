import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Item from "./Item";
import { BleManager } from "react-native-ble-plx";
import ButtonUI from "./ButtonUI";
import Toast from "react-native-toast-message";
import { styles } from "./tabs/style/styles";

const bleManager = new BleManager();

export default function Home({ navigation }) {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const discoveredDevices = new Set();

  // Request Bluetooth permissions
  const requestBluetoothPermission = async () => {
    if (Platform.OS === "ios") {
      return true;
    }
    if (
      Platform.OS === "android" &&
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ) {
      const apiLevel = parseInt(Platform.Version.toString(), 10);
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        return (
          result["android.permission.BLUETOOTH_CONNECT"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.BLUETOOTH_SCAN"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.ACCESS_FINE_LOCATION"] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }
    this.showErrorToast("Permission have not been granted");
    return false;
  };

  useEffect(() => {
    // when page refreshed call requestBluetoothPermissions function
    requestBluetoothPermission();
    scanForDevices();

    // Cleanup function to stop scanning when component unmounts
    return () => {
      bleManager.stopDeviceScan();
    };
  }, [scanning]);

  // function to scan devices
  const scanForDevices = () => {
    if (scanning) {
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
          if (scannedDevice && !discoveredDevices.has(scannedDevice.id)) {
            if (scannedDevice.name) {
              discoveredDevices.add(scannedDevice.id);
              setDevices((prevDevices) => [...prevDevices, scannedDevice]);
            }
          }
        }
      );
    }
  };

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
          navigation.navigate("DevicePage"); // navigate to device settings page
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

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      onPress={() => connectToDevice(item)}
      title={"Connect"}
    />
  );

  const handleEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        {/* <Image
          alt="App Logo"
          resizeMode="contain"
          style={{ width: 300, height: 300, opacity: 0.3 }}
          source={require("../assets/ble-scan.png")}
        /> */}
        <Text style={styles.emptyTextHome}> No available devices yet!</Text>
      </View>
    );
  };

  return (
    <View style={styles.HomeView}>
      <ButtonUI
        onPress={() => {
          setScanning(!scanning);
        }}
        title={scanning ? "Stop Scanning" : "Scan devices"}
        loading={false}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.HomeTitle}>Available devices </Text>
        {scanning && <ActivityIndicator size="small" color="#35374B" />}
      </View>
      <FlatList
        contentContainerStyle={{
          flex: 1,
        }}
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        refreshing={false}
        onRefresh={scanForDevices}
        ListEmptyComponent={handleEmpty}
      />
    </View>
  );
}

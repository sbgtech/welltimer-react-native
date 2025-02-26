import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
  useWindowDimensions,
} from "react-native";
import Item from "./Item";
import { BleManager } from "react-native-ble-plx";
import ButtonUI from "./ButtonUI";
import Toast from "react-native-toast-message";
import { styles } from "./tabs/style/styles";
import Login_modal from "./tabs/blocs/Login_modal";

// create new instance for the BleManager module
const bleManager = new BleManager();

export default function Home({ navigation, route }) {
  const { width } = useWindowDimensions();
  // initialize the state of bluetooth in the mobile, default Unknown
  const [bluetoothState, setBluetoothState] = useState("Unknown");
  // create scanning state of the devices, default is not scanning yet
  const [scanning, setScanning] = useState(false);
  // an array of available devices
  const [devices, setDevices] = useState([]);
  // create new Set of the discovered devices to set thems into devices array
  const discoveredDevices = new Set();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [isIndicatorShown, setIsIndicatorShown] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null); // Store selected device
  // const [isAuthenticated, setIsAuthenticated] = useState("");

  // Request Bluetooth permissions
  // Ask user when he open the app to allow and activate position and bluetooth
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
    Alert.alert("Permission have not been granted");
    return false;
  };

  // Initial load
  useEffect(() => {
    // when load this component it check the bluetooth state
    const checkBluetoothState = async () => {
      const state = await bleManager.state();
      setBluetoothState(state);
    };
    checkBluetoothState();
    // Set up a listener for Bluetooth state changes
    const checkState = async () => {
      // read the state of bluetooth with ble plx module and set it into our state
      const subscription = await bleManager.onStateChange((state) => {
        setBluetoothState(state);
        if (state !== "PoweredOn") {
          // if bluetooth or posiition are deactivates, it show an alert to activate them
          Alert.alert(
            "Info",
            "Please make sure to activate Bluetooth and position for better usage."
          );
        }
      }, true);
      return () => subscription.remove(); // Clean up listener on unmount
    };
    checkState();
  }, []);

  useEffect(() => {
    // when page refreshed call requestBluetoothPermissions function
    requestBluetoothPermission();
    // call scanning function
    scanForDevices();
    // Cleanup function to stop scanning when component unmounts
    return () => {
      bleManager.stopDeviceScan();
    };
  }, [scanning]);

  useEffect(() => {
    // Check if parameters exist and update state accordingly
    if (route.params && route.params.scanning) {
      setScanning(false);
      scanForDevices();
    }
  }, [route.params]); // Depend on route.params

  // function to scan devices
  const scanForDevices = () => {
    if (scanning) {
      // if scanning state is true
      setDevices([]); // empty the array
      // call scan function of the ble plx module
      bleManager.startDeviceScan(
        null,
        { allowDuplicates: false },
        (error, scannedDevice) => {
          if (error) {
            // if error when scanning show error alert
            console.log("Error scanning for devices:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: error.message,
              visibilityTime: 3000,
            });
            return;
          }
          // If retrieve an device, add it to the scanned devices list
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

  // Function to handle the login process
  const handleSubmitPIN = async (text) => {
    setPin(text);
    if (text.length === 6) {
      if (text === "123456") {
        setIsIndicatorShown(true);
        setTimeout(async () => {
          Toast.show({
            type: "success",
            text1: "Successfully OTP",
            text2: `Your OTP is ${text}`,
            visibilityTime: 5000,
          });
          setIsIndicatorShown(false);
          setModalVisible(false);
          if (selectedDevice) {
            await connectToDevice(selectedDevice);
          }
        }, 2000);
      } else {
        setModalVisible(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid PIN",
          visibilityTime: 3000,
        });
        setPin("");
      }
    }
  };

  // function to display the modal after clicking connect
  // const verifyLogin = async () => {
  //   if (isAuthenticated) {
  //     navigation.navigate("DeviceSettings", { initialTab: 0 });
  //     // await connectToDevice(item)
  //   } else {
  //     setModalVisible(true);
  //   }
  // };
  // function allow user to connect to device
  const connectToDevice = async (selectedDevice) => {
    if (!selectedDevice) return;
    try {
      setIsButtonDisabled(true); // Disable button before connecting
      // if (!isAuthenticated) {
      //   setModalVisible(true);
      //   return;
      // }
      // connect to selected device
      await selectedDevice
        .connect()
        .then((device) => device.discoverAllServicesAndCharacteristics()) // discovering services and characteristics of device
        .then((device) => {
          // success to connect to device
          console.log("Connected to", device.name);
          // showing toast for successfully connected
          navigation.navigate("DeviceSettings", { initialTab: 0 }); // navigate to device settings page
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
    } finally {
      setIsButtonDisabled(false); // Re-enable button after operation
    }
  };

  useEffect(() => {
    console.log("this is width", width);
  }, [width]);

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      id={item.id}
      onPress={() => {
        // if (isAuthenticated) {
        //   connectToDevice(item); // If logged in, directly connect to the device
        // } else {
        setModalVisible(true); // If not logged in, show the login modal
        setSelectedDevice(item); // Set the device to connect to after login
        // }
      }}
      title={"Connect"}
      disabled={isButtonDisabled}
    />
  );

  const handleEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTextHome(width)}>
          {" "}
          No available devices yet!
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.HomeView}>
      <ButtonUI
        onPress={() => {
          setScanning(!scanning);
        }}
        // onPress={() => {
        //   connectToDevice();
        // }}
        title={scanning ? "Stop Scanning" : "Scan devices"}
        btnStyle={styles.HomeBtnSendText(width)}
        txtStyle={styles.HomeTextSendStyle(width)}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.HomeTitle(width)}>Available devices :</Text>
        <Text style={styles.HomeCountDevices(width)}>({devices.length})</Text>
        {scanning && <ActivityIndicator size="small" color="#0055a4" />}
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
      <Login_modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        // pin={pin}
        // setPin={setPin}
        handleSubmitPIN={handleSubmitPIN}
        isIndicatorShown={isIndicatorShown}
      />
    </View>
  );
}

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Modal,
  ActivityIndicator,
  Dimensions,
  useColorScheme,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { BleManager } from "react-native-ble-plx";
import Moment from "moment";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "./Utils/Constants";
import { Buffer } from "buffer";
import { styles } from "./tabs/style/styles";
import ButtonUI from "./ButtonUI";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

const bleManager = new BleManager();

const TestMode = () => {
  const [connectedDevice, setConnectedDevice] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [message, setMessage] = useState("");
  const { width } = Dimensions.get("window");
  const scale = width / 450;

  const colorScheme = useColorScheme();
  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  useEffect(() => {
    const checkDeviceConnection = async () => {
      const connectedDevices = await bleManager.connectedDevices([
        UART_SERVICE_UUID,
      ]);
      if (connectedDevices.length > 0) {
        setConnectedDevice(connectedDevices);
        //   if (loading) {
        //     const timer = setTimeout(() => {
        //       if (!dataReceived) {
        //         Toast.show({
        //           type: "error",
        //           text1: "Warning",
        //           text2: "No data received within 5 seconds",
        //           visibilityTime: 3000,
        //         });
        //         setLoading(false);
        //       }
        //     }, 5000);
        //     return () => clearTimeout(timer);
        //   }
        //   receiveData();
      }
    };
    checkDeviceConnection();
  }, []);

  // const checkDeviceConnection = async () => {
  //   const connectedDevices = await bleManager.connectedDevices([
  //     UART_SERVICE_UUID,
  //   ]);
  //   if (connectedDevices.length > 0) {
  //     setConnectedDevice(connectedDevices);
  //   }
  // };

  const onMessageChanged = (e) => {
    setMessage(e);
    console.log(e);
  };

  const onSendMessageSubmit = async () => {
    if (message !== "") {
      await sendData(message + "\n");
      setMessage("");
    } else {
      Alert.alert("Warning", "Data required");
    }
  };

  const addObject = (data, type) => {
    const newObj = { date: Date.now(), data: data, type: type };
    setDataArray((prevArray) => [...prevArray, newObj]);
  };

  const receiveData = () => {
    try {
      connectedDevice[0]?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error(error);
            return false;
          }
          const msg = Buffer.from(characteristic.value, "base64").toString(
            "utf-8"
          );
          console.log("Received data from test mode :", msg);
          setLoading(false);
          addObject(msg, "RX");
          Toast.show({
            type: "info",
            text1: "Success",
            text2: "Received data : " + msg,
            visibilityTime: 3000,
          });
          return true;
        }
      );
    } catch (error) {
      console.error("Error receiving data from device:", error.message);
      return false;
    }
  };

  const sendData = async (data) => {
    try {
      setLoading(true);
      setDataReceived(false);
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Data sent, waiting for response...",
        visibilityTime: 3000,
      });
      const buffer = Buffer.from(data, "utf-8");
      await connectedDevice[0]?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      addObject(data, "TX");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.msgViewContainer}>
      <View style={styles.msgView}>
        <Text style={styles.itemType}>{item.type} :</Text>
      </View>
      <View style={styles.msgView}>
        <Text style={styles.itemData}>{item.data}</Text>
      </View>
      <View style={styles.msgView}>
        <Text style={styles.itemDate}>{Moment(item.date).format("lll")}</Text>
      </View>
    </View>
  );

  const handleEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}> No Data present!</Text>
        <Image
          alt="App Logo"
          resizeMode="contain"
          style={{ width: 300, height: 300 }}
          source={require("../assets/no-data.png")}
        />
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.containerTestTab,
        animatedStyles,
        { backgroundColor: colorScheme === "light" ? "#fff" : "#fff" },
        styles.marginBottomContainer,
      ]}
    >
      <View style={styles.box}>
        <View>
          <Text style={styles.testTitle}>Test mode :</Text>
        </View>
        <FlatList
          style={styles.itemsList}
          data={dataArray}
          renderItem={renderItem}
          ListEmptyComponent={handleEmpty}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.testContainer}>
          <TextInput
            style={styles.testInput}
            value={message}
            onChangeText={onMessageChanged}
            placeholder="Message..."
          />
          <ButtonUI
            onPress={async () => await onSendMessageSubmit()}
            title={<Ionicons name="send" size={20} color="white" />}
            btnStyle={styles.btnSend}
            txtStyle={styles.TextSendStyle}
          />
        </View>
        <Modal animationType="slide" transparent={true} visible={loading}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.waitingMsg}>Wait</Text>
              <ActivityIndicator color={"#35374B"} size={"large"} />
            </View>
          </View>
        </Modal>
      </View>
    </Animated.View>
  );
};

export default TestMode;

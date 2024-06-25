import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  useColorScheme,
  FlatList,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import ButtonUI from "../ButtonUI";
import Ionicons from "@expo/vector-icons/Ionicons";
import Moment from "moment";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";
import { styles } from "./style/styles";

const TestTab = (props) => {
  const [message, setMessage] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
  const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

  const { width } = Dimensions.get("window");
  const scale = width / 450;

  const colorScheme = useColorScheme();
  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  const onMessageChanged = (e) => {
    setMessage(e);
    console.log(e);
  };

  const onSendMessageSubmit = async () => {
    if (message !== "") {
      sendData(props.connectedDevice, message + "\n");
      setMessage("");
    } else {
      Alert.alert("Warning", "Data required");
    }
  };

  useEffect(() => {
    receiveData(props.connectedDevice);
  }, []);

  const addObject = (data, type) => {
    // Create a new object
    const newObj = { date: Date.now(), data: data, type: type };
    // Update state by creating a new array with the previous contents plus the new object
    setDataArray((prevArray) => [...prevArray, newObj]);
  };
  // function for receiving data only for testing mode
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
        console.log("Received data from test mode :", msg);
        addObject(msg, "RX"); // Adding a new object to the array
      }
    );
  };

  // function for sending data only for testing mode
  const sendData = (device, data) => {
    const buffer = Buffer.from(data, "utf-8");
    device
      ?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      )
      .then((characteristic) => {
        console.log("Sent data from test mode : ", data);
        addObject(data, "TX");
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Data sent to " + props.connectedDevice.name,
          visibilityTime: 3000,
        });
      })
      .catch((error) => {
        console.error(error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error to send data to " + props.connectedDevice.name,
          visibilityTime: 3000,
        });
      });
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
          source={require("../../assets/no-data.png")}
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
          keyExtractor={(item, index) => index}
        />
        <View style={styles.testContainer}>
          <TextInput
            style={styles.testInput}
            value={message}
            onChangeText={onMessageChanged}
            placeholder="Message..."
          />
          <ButtonUI
            onPress={() => onSendMessageSubmit()}
            title={<Ionicons name="send" size={20 * scale} color="white" />}
            btnStyle={styles.btnSend}
            txtStyle={styles.TextSendStyle}
            loading={false}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default TestTab;

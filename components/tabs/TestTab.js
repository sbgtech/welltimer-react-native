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
  Modal,
  ActivityIndicator,
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
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "../Utils/Constants";

const TestTab = (props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [received, setReceived] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState([]);
  const [dataSent, setDataSent] = useState(false);
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
      await props.sendData(message + "\n");
      setMessage("");
    } else {
      Alert.alert("Warning", "Data required");
    }
  };

  useEffect(() => {}, []);

  const addObject = (data, type) => {
    const newObj = { date: Date.now(), data: data, type: type };
    setDataArray((prevArray) => [...prevArray, newObj]);
  };

  // function for receiving data only for testing mode
  const receiveData = (device) => {
    try {
      device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        async (error, characteristic) => {
          if (error) {
            console.error(error);
            return false;
          }
          const msg = Buffer.from(characteristic.value, "base64").toString(
            "utf-8"
          );
          console.log("Received data from test mode :", msg);
          setLoading(false);
          setReceived(true);
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

  //   function for sending data only for testing mode
  const sendData = async (device, data) => {
    try {
      const buffer = Buffer.from(data, "utf-8");
      await device?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent to " + device.name,
        visibilityTime: 3000,
      });
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
          data={props.dataArray}
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
            title={<Ionicons name="send" size={20 * scale} color="white" />}
            btnStyle={styles.btnSend}
            txtStyle={styles.TextSendStyle}
            loading={false}
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

export default TestTab;

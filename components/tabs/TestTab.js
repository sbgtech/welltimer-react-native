import React, { useCallback, useEffect, useState } from "react";
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
import { Receive } from "../Utils/Receive";
import Loading from "./blocs/Loading";

const TestTab = (props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataReceived, setDataReceived] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [dataArray, setDataArray] = useState([]);
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
      await sendData(props.connectedDevice, message + "\n");
      setMessage("");
    } else {
      Alert.alert("Warning", "Data required");
    }
  };

  useEffect(() => {
    if (loading && !dataReceived) {
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
    if (!isSubscribed) {
      receiveData();
    }
  }, [loading, dataReceived, isSubscribed, props.connectedDevice, receiveData]);

  const addObject = (data, type) => {
    const newObj = { date: Date.now(), data: data, type: type };
    setDataArray((prevArray) => [...prevArray, newObj]);
  };

  // function for receiving data only for testing mode
  const receiveData = useCallback(() => {
    if (!isSubscribed) {
      setIsSubscribed(true);
      Receive.TestReceivedData(props.connectedDevice, {
        setDataArray,
        setLoading,
        setDataReceived,
      });
    }
  }, [isSubscribed]);

  //   function for sending data only for testing mode
  const sendData = async (device, data) => {
    try {
      setLoading(true);
      setDataReceived(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Sent successfully",
        visibilityTime: 3000,
      });
      const buffer = Buffer.from(data, "utf-8");
      await device?.writeCharacteristicWithResponseForService(
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
            title={<Ionicons name="send" size={25 * scale} color="white" />}
            btnStyle={styles.btnSend}
            txtStyle={styles.TextSendStyle}
            loading={false}
          />
        </View>
        <Loading loading={loading} />
      </View>
    </Animated.View>
  );
};

export default TestTab;

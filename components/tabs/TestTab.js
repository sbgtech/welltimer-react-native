import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
  FlatList,
  Image,
  Alert,
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import ButtonUI from "../ButtonUI";
import Ionicons from "@expo/vector-icons/Ionicons";
import Moment from "moment";

const TestTab = (props) => {
  const [message, setMessage] = useState("");

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
      props.sendData(props.connectedDevice[0], message + "\n");
      setMessage("");
    } else {
      Alert.alert("Warning", "Data required");
    }
  };

  useEffect(() => {
    // when page refreshed
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemViewContainer}>
      <View style={styles.itemView}>
        <Text style={styles.itemType}>{item.type} :</Text>
      </View>
      <View style={styles.itemView}>
        <Text style={styles.itemText}>{item.data}</Text>
      </View>
      <View style={styles.itemView}>
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
        styles.container,
        animatedStyles,
        { backgroundColor: colorScheme === "light" ? "#fff" : "#000" },
      ]}
    >
      <View style={styles.box}>
        <View>
          <Text style={styles.testTitle}>Test mode :</Text>
          <View style={styles.deviceBlog}>
            <Text style={styles.deviceTitle}>Connected Devices:</Text>
            {props.connectedDevice.length > 0 ? (
              props.connectedDevice.map((device) => (
                <View key={device.id}>
                  <Text style={styles.deviceInfo}>Name: {device.name}</Text>
                  <Text style={styles.deviceInfo}>ID: {device.id}</Text>
                </View>
              ))
            ) : (
              <Text>No connected devices</Text>
            )}
          </View>
        </View>
        <FlatList
          style={{
            backgroundColor: "#ddd",
            padding: 6,
            marginHorizontal: 5,
            marginVertical: 12,
            borderRadius: 9,
          }}
          data={props.dataArray}
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
            title={<Ionicons name="send" size={20} color="white" />}
            btnStyle={styles.btnSend}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  box: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  testTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  deviceBlog: {
    marginHorizontal: 5,
  },
  deviceTitle: { color: "#7d7d7d", fontWeight: "bold" },
  deviceInfo: { fontSize: 12, color: "#7d7d7d" },
  testContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
  },
  testInput: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 9,
    width: "80%",
    maxWidth: "80%",
    height: 40,
  },
  btnSend: {
    width: 45,
  },
  itemViewContainer: {
    margin: 2,
    backgroundColor: "#fff",
    borderRadius: 9,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
  itemView: {
    justifyContent: "center",
  },
  itemDate: { color: "#7d7d7d", fontSize: 12 },
  itemType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7d7d7d",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#35374B",
  },
});

export default TestTab;

import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import { styles } from "./style/styles";
import { Receive } from "../Utils/Receive";
import ButtonUI from "../ButtonUI";
import Loading from "./blocs/Loading";
import RefreshBtn from "./blocs/RefreshBtn";
import { Buffer } from "buffer";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
} from "../Utils/Constants";
import Toast from "react-native-toast-message";

const StatisticsTab = (props) => {
  // the loading state, default is false
  const [loading, setLoading] = useState(false);
  // title of loading modal
  const [title, setTitle] = useState("");
  // states of arrivals statistics
  const [arrivalsToday, setArrivalsToday] = useState("");
  const [arrivalsWeek, setArrivalsWeek] = useState("");
  const [arrivalsTotal, setArrivalsTotal] = useState("");
  // states of missrun statistics
  const [missrunToday, setMissrunToday] = useState("");
  const [missrunWeek, setMissrunWeek] = useState("");
  const [missrunTotal, setMissrunTotal] = useState("");
  // states of onTime statistics
  const [onTimeToday, setOnTimeToday] = useState("");
  const [onTimeWeek, setOnTimeWeek] = useState("");
  const [onTimeTotal, setOnTimeTotal] = useState("");

  // send "reset" to device to reset arrivals values
  const handleResetArrivals = async () => {
    try {
      const buffer = Buffer.from("RST1 \n", "utf-8");
      await props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent successfully",
        visibilityTime: 3000,
      });
      await fetchDataStatistic();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send "reset" to device to reset missrun values
  const handleResetMissrun = async () => {
    try {
      const buffer = Buffer.from("RST2 \n", "utf-8");
      await props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent successfully",
        visibilityTime: 3000,
      });
      await fetchDataStatistic();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send "reset" to device to reset onTime values
  const handleResetOnTime = async () => {
    try {
      const buffer = Buffer.from("RST3 \n", "utf-8");
      await props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent successfully",
        visibilityTime: 3000,
      });
      await fetchDataStatistic();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // function called in useEffect when load component to fetch data
  const fetchDataStatistic = async () => {
    try {
      await Receive.StatisticsReceivedData(props.connectedDevice, {
        setArrivalsToday,
        setArrivalsWeek,
        setArrivalsTotal,
        setMissrunToday,
        setMissrunWeek,
        setMissrunTotal,
        setOnTimeToday,
        setOnTimeWeek,
        setOnTimeTotal,
        setLoading,
        setTitle,
      });
    } catch (error) {
      console.error("Error in receiving data:", error);
    }
  };

  // Initial load, call fetchData function with the corresponding data
  useEffect(() => {
    // fetcha data if the device is connected
    if (props.connectedDevice) {
      const cleanup = fetchDataStatistic();
      return () => cleanup; // Clean up subscription on component unmount or when device changes
    }
  }, [props.connectedDevice]);

  // function run when clicking on refresh button
  const onRefreshStatistic = async () => {
    try {
      // call function to send request to device to get data
      Receive.sendReqToGetData(props.connectedDevice, 3);
      // start receiving data
      await Receive.StatisticsReceivedData(props.connectedDevice, {
        setArrivalsToday,
        setArrivalsWeek,
        setArrivalsTotal,
        setMissrunToday,
        setMissrunWeek,
        setMissrunTotal,
        setOnTimeToday,
        setOnTimeWeek,
        setOnTimeTotal,
        setLoading,
        setTitle,
      });
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  return (
    <ScrollView>
      <RefreshBtn onPress={() => onRefreshStatistic()} />
      <View style={[styles.wrapper, styles.marginBottomContainer]}>
        <Text style={styles.valveTitle}>Arrival statistics</Text>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>Arrivals today :</Text>
          <TextInput
            style={styles.inputSettingsDisabled}
            value={arrivalsToday.toString()}
            editable={false}
          />
          <Text style={styles.titleSettings}>Arrivals week :</Text>
          <TextInput
            style={styles.inputSettingsDisabled}
            value={arrivalsWeek.toString()}
            editable={false}
          />
          <Text style={styles.titleSettings}>Arrivals total :</Text>
          <TextInput
            style={styles.inputSettingsDisabled}
            value={arrivalsTotal.toString()}
            editable={false}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleResetArrivals()}
              title={"Reset"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>Missrun today :</Text>
          <TextInput
            style={styles.inputSettingsDisabled}
            value={missrunToday.toString()}
            editable={false}
          />
          <Text style={styles.titleSettings}>Missrun week :</Text>
          <TextInput
            style={styles.inputSettingsDisabled}
            value={missrunWeek.toString()}
            editable={false}
          />
          <Text style={styles.titleSettings}>Missrun total :</Text>
          <TextInput
            style={styles.inputSettingsDisabled}
            value={missrunTotal.toString()}
            editable={false}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleResetMissrun()}
              title={"Reset"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>OnTime today (sec) :</Text>
          <TextInput
            style={styles.inputSettingsDisabled}
            value={onTimeToday.toString()}
            editable={false}
          />
          <Text style={styles.titleSettings}>OnTime week (hour) :</Text>
          <TextInput
            style={styles.inputSettingsDisabled}
            value={onTimeWeek.toString()}
            editable={false}
          />
          <Text style={styles.titleSettings}>OnTime total (hour) :</Text>
          <TextInput
            style={styles.inputSettingsDisabled}
            value={onTimeTotal.toString()}
            editable={false}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleResetOnTime()}
              title={"Reset"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        </View>
      </View>
      <Loading loading={loading} title={title} />
    </ScrollView>
  );
};

export default StatisticsTab;

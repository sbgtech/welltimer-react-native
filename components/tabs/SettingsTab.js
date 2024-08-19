import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./style/styles";
import ButtonUI from "../ButtonUI";
import Dropdown from "./blocs/Dropdown";
import { Receive } from "../Utils/Receive";
import Loading from "./blocs/Loading";
import Valve from "./blocs/Valve";
import RefreshBtn from "./blocs/RefreshBtn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Buffer } from "buffer";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
} from "../Utils/Constants";

const SettingsTab = (props) => {
  // declare initial states
  // the loading state, default is false
  const [loading, setLoading] = useState(false);
  // value of valve, default 0 (OFF)
  const [valveA, setValveA] = useState(0);
  // display the name of the productionMethod based on the received index
  const [productionMethodIndex, setProductionMethodIndex] = useState(null);
  const productionMethod = ["Timer mode", "Intermit mode", "Trigger mode"];
  // prepare variables to set them the received data
  const [missrunMax, setMissrunMax] = useState("");
  const [falseArrivalsIndex, setFalseArrivalsIndex] = useState(null);
  const falseArrivals_hiLoMode = ["Disbale", "Enable"];
  const [wellDepth, setWellDepth] = useState("");
  // states of HiLo mode
  const [hiLoModeIndex, setHiLoModeIndex] = useState(null);
  const [hiLoHigh, setHiLoHigh] = useState("");
  const [hiLoLow, setHiLoLow] = useState("");
  // states of LP
  const LP_CP_TP_type = ["Voltage"];
  const [LPTypeIndex, setLPTypeIndex] = useState(null);
  const [LPSensorMax, setLPSensorMax] = useState("");
  const [LPSensorMin, setLPSensorMin] = useState("");
  const [LPVoltageMax, setLPVoltageMax] = useState("");
  const [LPVoltageMin, setLPVoltageMin] = useState("");
  // states of CP
  const [CPTypeIndex, setCPTypeIndex] = useState(null);
  const [CPSensorMax, setCPSensorMax] = useState("");
  const [CPSensorMin, setCPSensorMin] = useState("");
  const [CPVoltageMax, setCPVoltageMax] = useState("");
  const [CPVoltageMin, setCPVoltageMin] = useState("");
  // states of TP
  const [TPTypeIndex, setTPTypeIndex] = useState(null);
  const [TPSensorMax, setTPSensorMax] = useState("");
  const [TPSensorMin, setTPSensorMin] = useState("");
  const [TPVoltageMax, setTPVoltageMax] = useState("");
  const [TPVoltageMin, setTPVoltageMin] = useState("");
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

  // handle change missrunMax value
  const handleChangeMissrunMax = (text) => {
    if (text) {
      setMissrunMax(text);
    } else {
      setMissrunMax("");
    }
  };

  // handle change wellDepth value
  const handleChangeWellDepth = (text) => {
    if (text) {
      setWellDepth(text);
    } else {
      setWellDepth("");
    }
  };

  // handle change hiloHight value
  const handleChangeHiLoHigh = (text) => {
    if (text) {
      setHiLoHigh(text);
    } else {
      setHiLoHigh("");
    }
  };

  // handle change hiloLow value
  const handleChangeHiLoLow = (text) => {
    if (text) {
      setHiLoLow(text);
    } else {
      setHiLoLow("");
    }
  };

  // handle change LPSensorMax value
  const handleChangeLPSensorMax = (text) => {
    if (text) {
      setLPSensorMax(text);
    } else {
      setLPSensorMax("");
    }
  };

  // handle change LPSensorMin value
  const handleChangeLPSensorMin = (text) => {
    if (text) {
      setLPSensorMin(text);
    } else {
      setLPSensorMin("");
    }
  };

  // handle change LPVoltageMax value
  const handleChangeLPVoltageMax = (text) => {
    if (text) {
      setLPVoltageMax(text);
    } else {
      setLPVoltageMax("");
    }
  };

  // handle change LPVoltageMin value
  const handleChangeLPVoltageMin = (text) => {
    if (text) {
      setLPVoltageMin(text);
    } else {
      setLPVoltageMin("");
    }
  };

  // handle change CPSensorMax value
  const handleChangeCPSensorMax = (text) => {
    if (text) {
      setCPSensorMax(text);
    } else {
      setCPSensorMax("");
    }
  };

  // handle change CPSensorMin value
  const handleChangeCPSensorMin = (text) => {
    if (text) {
      setCPSensorMin(text);
    } else {
      setCPSensorMin("");
    }
  };

  // handle change CPVoltageMax value
  const handleChangeCPVoltageMax = (text) => {
    if (text) {
      setCPVoltageMax(text);
    } else {
      setCPVoltageMax("");
    }
  };

  // handle change CPVoltageMin value
  const handleChangeCPVoltageMin = (text) => {
    if (text) {
      setCPVoltageMin(text);
    } else {
      setCPVoltageMin("");
    }
  };

  // handle change TPSensorMax value
  const handleChangeTPSensorMax = (text) => {
    if (text) {
      setTPSensorMax(text);
    } else {
      setTPSensorMax("");
    }
  };

  // handle change TPSensorMin value
  const handleChangeTPSensorMin = (text) => {
    if (text) {
      setTPSensorMin(text);
    } else {
      setTPSensorMin("");
    }
  };

  // handle change TPVoltageMax value
  const handleChangeTPVoltageMax = (text) => {
    if (text) {
      setTPVoltageMax(text);
    } else {
      setTPVoltageMax("");
    }
  };

  // handle change TPVoltageMin value
  const handleChangeTPVoltageMin = (text) => {
    if (text) {
      setTPVoltageMin(text);
    } else {
      setTPVoltageMin("");
    }
  };

  // send array of prod method, missrun max, false arrivals and well depth values to device with their addresses
  const handleSendFirstBloc = async () => {
    try {
      const arr = JSON.stringify([
        111,
        productionMethodIndex,
        109,
        Number(missrunMax),
        110,
        falseArrivalsIndex,
        125,
        Number(wellDepth),
      ]);
      console.log(arr);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, { setLoading });
      onRefresh();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send array of HiLo values to device
  const handleSendHiLo = async () => {
    try {
      const arr = JSON.stringify([
        122,
        hiLoModeIndex,
        123,
        Number(hiLoHigh),
        124,
        Number(hiLoLow),
      ]);
      console.log(arr);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, { setLoading });
      onRefresh();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send array of CP values to device
  const handleSendLP = async () => {
    try {
      const arr = JSON.stringify([
        100,
        LPTypeIndex,
        101,
        Number(LPSensorMax),
        102,
        Number(LPSensorMin),
        116,
        Number(LPVoltageMax * 10),
        117,
        Number(LPVoltageMin * 10),
      ]);
      console.log(arr);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, { setLoading });
      onRefresh();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send array of CP values to device
  const handleSendCP = async () => {
    try {
      const arr = JSON.stringify([
        103,
        CPTypeIndex,
        104,
        Number(CPSensorMax),
        105,
        Number(CPSensorMin),
        118,
        Number(CPVoltageMax * 10),
        119,
        Number(CPVoltageMin * 10),
      ]);
      console.log(arr);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, { setLoading });
      onRefresh();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send array of TP values to device
  const handleSendTP = async () => {
    try {
      const arr = JSON.stringify([
        106,
        TPTypeIndex,
        107,
        Number(TPSensorMax),
        108,
        Number(TPSensorMin),
        120,
        Number(TPVoltageMax * 10),
        121,
        Number(TPVoltageMin * 10),
      ]);
      console.log(arr);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, { setLoading });
      onRefresh();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send "reset" to device to reset arrivals values
  const handleResetArrivals = async () => {
    try {
      const buffer = Buffer.from("RST1 \n", "utf-8");
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, { setLoading });
      onRefresh();
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
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, { setLoading });
      onRefresh();
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
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, { setLoading });
      onRefresh();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // function called in useEffect when load component to fetch data
  const fetchData = async () => {
    try {
      await Receive.SettingsReceivedData(props.connectedDevice, {
        setValveA,
        setProductionMethodIndex,
        setMissrunMax,
        setFalseArrivalsIndex,
        setWellDepth,
        setHiLoModeIndex,
        setHiLoHigh,
        setHiLoLow,
        setLPTypeIndex,
        setLPSensorMax,
        setLPSensorMin,
        setLPVoltageMax,
        setLPVoltageMin,
        setCPTypeIndex,
        setCPSensorMax,
        setCPSensorMin,
        setCPVoltageMax,
        setCPVoltageMin,
        setTPTypeIndex,
        setTPSensorMax,
        setTPSensorMin,
        setTPVoltageMax,
        setTPVoltageMin,
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
      });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  };

  // Initial load, call fetchData function with the corresponding data
  useEffect(() => {
    // fetcha data if the device is connected
    if (props.connectedDevice) {
      const cleanup = fetchData();
      return () => cleanup; // Clean up subscription on component unmount or when device changes
    }
  }, [props.connectedDevice]);

  // function run when clicking on refresh button
  const onRefresh = async () => {
    // call function to send request to device to get data
    Receive.sendReqToGetData(props.connectedDevice, 2);
    // start receiving data
    try {
      await Receive.SettingsReceivedData(props.connectedDevice, {
        setValveA,
        setProductionMethodIndex,
        setMissrunMax,
        setFalseArrivalsIndex,
        setWellDepth,
        setHiLoModeIndex,
        setHiLoHigh,
        setHiLoLow,
        setLPTypeIndex,
        setLPSensorMax,
        setLPSensorMin,
        setLPVoltageMax,
        setLPVoltageMin,
        setCPTypeIndex,
        setCPSensorMax,
        setCPSensorMin,
        setCPVoltageMax,
        setCPVoltageMin,
        setTPTypeIndex,
        setTPSensorMax,
        setTPSensorMin,
        setTPVoltageMax,
        setTPVoltageMin,
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
      });
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      <RefreshBtn onPress={() => onRefresh()} />
      <Valve
        connectedDevice={props.connectedDevice}
        setLoading={setLoading}
        title={"Valve A"}
        status={valveA === 1 ? true : false}
      />

      <View style={[styles.wrapper, styles.marginBottomContainer]}>
        <Text style={styles.valveTitle}>Controller configuration</Text>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>Production method :</Text>
          <Dropdown
            dropdownTitle={"Select mode"}
            list={productionMethod}
            selectedIndex={productionMethodIndex}
            setSelectedIndex={setProductionMethodIndex}
          />
          <Text style={styles.titleSettings}>Missrun max :</Text>
          <TextInput
            style={styles.inputSettings}
            value={missrunMax.toString()}
            onChangeText={handleChangeMissrunMax}
          />
          <Text style={styles.titleSettings}>Detect false arrivals :</Text>
          <Dropdown
            dropdownTitle={"Select option"}
            list={falseArrivals_hiLoMode}
            selectedIndex={falseArrivalsIndex}
            setSelectedIndex={setFalseArrivalsIndex}
          />
          <Text style={styles.titleSettings}>Well depth :</Text>
          <TextInput
            style={styles.inputSettings}
            value={wellDepth.toString()}
            onChangeText={handleChangeWellDepth}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendFirstBloc()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>HiLo mode enable :</Text>
          <Dropdown
            dropdownTitle={"Select option"}
            list={falseArrivals_hiLoMode}
            selectedIndex={hiLoModeIndex}
            setSelectedIndex={setHiLoModeIndex}
          />
          <Text style={styles.titleSettings}>HiLo high Threshold :</Text>
          <TextInput
            style={styles.inputSettings}
            value={hiLoHigh.toString()}
            onChangeText={handleChangeHiLoHigh}
          />
          <Text style={styles.titleSettings}>HiLo low Threshold :</Text>
          <TextInput
            style={styles.inputSettings}
            value={hiLoLow.toString()}
            onChangeText={handleChangeHiLoLow}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendHiLo()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>LP Sensor type :</Text>
          <Dropdown
            dropdownTitle={"Select option"}
            list={LP_CP_TP_type}
            selectedIndex={LPTypeIndex}
            setSelectedIndex={setLPTypeIndex}
          />
          <Text style={styles.titleSettings}>LP Sensor max (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPSensorMax.toString()}
            onChangeText={handleChangeLPSensorMax}
          />
          <Text style={styles.titleSettings}>LP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPSensorMin.toString()}
            onChangeText={handleChangeLPSensorMin}
          />
          <Text style={styles.titleSettings}>LP voltage max (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPVoltageMax.toString()}
            onChangeText={handleChangeLPVoltageMax}
          />
          <Text style={styles.titleSettings}>LP voltage min (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPVoltageMin.toString()}
            onChangeText={handleChangeLPVoltageMin}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendLP()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>CP Sensor type :</Text>
          <Dropdown
            dropdownTitle={"Select option"}
            list={LP_CP_TP_type}
            selectedIndex={CPTypeIndex}
            setSelectedIndex={setCPTypeIndex}
          />
          <Text style={styles.titleSettings}>CP Sensor max (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPSensorMax.toString()}
            onChangeText={handleChangeCPSensorMax}
          />
          <Text style={styles.titleSettings}>CP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPSensorMin.toString()}
            onChangeText={handleChangeCPSensorMin}
          />
          <Text style={styles.titleSettings}>CP voltage max (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPVoltageMax.toString()}
            onChangeText={handleChangeCPVoltageMax}
          />
          <Text style={styles.titleSettings}>CP voltage min (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPVoltageMin.toString()}
            onChangeText={handleChangeCPVoltageMin}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendCP()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>TP Sensor type :</Text>
          <Dropdown
            dropdownTitle={"Select option"}
            list={LP_CP_TP_type}
            selectedIndex={TPTypeIndex}
            setSelectedIndex={setTPTypeIndex}
          />
          <Text style={styles.titleSettings}>TP Sensor max (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPSensorMax.toString()}
            onChangeText={handleChangeTPSensorMax}
          />
          <Text style={styles.titleSettings}>TP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPSensorMin.toString()}
            onChangeText={handleChangeTPSensorMin}
          />
          <Text style={styles.titleSettings}>TP voltage max (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPVoltageMax.toString()}
            onChangeText={handleChangeTPVoltageMax}
          />
          <Text style={styles.titleSettings}>TP voltage min (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPVoltageMin.toString()}
            onChangeText={handleChangeTPVoltageMin}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendTP()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        </View>
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
      <Loading loading={loading} />
    </KeyboardAwareScrollView>
  );
};

export default SettingsTab;

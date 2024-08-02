import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  TextInput,
} from "react-native";
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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State to track refresh
  //
  const [valveA, setValveA] = useState(0);
  //
  const [productionMethodIndex, setProductionMethodIndex] = useState(null);
  const productionMethod = ["Timer mode", "Intermit mode", "Trigger mode"];
  const [missrunMax, setMissrunMax] = useState("");
  const [falseArrivalsIndex, setFalseArrivalsIndex] = useState(null);
  const falseArrivals_hiLoMode = ["Disbale", "Enable"];
  const [wellDepth, setWellDepth] = useState("");
  //
  const [hiLoModeIndex, setHiLoModeIndex] = useState(null);
  const [hiLoHigh, setHiLoHigh] = useState("");
  const [hiLoLow, setHiLoLow] = useState("");
  //
  const LP_CP_TP_type = ["Voltage"];
  const [LPTypeIndex, setLPTypeIndex] = useState(null);
  const [LPSensorMax, setLPSensorMax] = useState("");
  const [LPSensorMin, setLPSensorMin] = useState("");
  const [LPVoltageMax, setLPVoltageMax] = useState("");
  const [LPVoltageMin, setLPVoltageMin] = useState("");
  //
  const [CPTypeIndex, setCPTypeIndex] = useState(null);
  const [CPSensorMax, setCPSensorMax] = useState("");
  const [CPSensorMin, setCPSensorMin] = useState("");
  const [CPVoltageMax, setCPVoltageMax] = useState("");
  const [CPVoltageMin, setCPVoltageMin] = useState("");
  //
  const [TPTypeIndex, setTPTypeIndex] = useState(null);
  const [TPSensorMax, setTPSensorMax] = useState("");
  const [TPSensorMin, setTPSensorMin] = useState("");
  const [TPVoltageMax, setTPVoltageMax] = useState("");
  const [TPVoltageMin, setTPVoltageMin] = useState("");

  const handleChangeMissrunMax = (text) => {
    if (text) {
      setMissrunMax(text);
    } else {
      setMissrunMax("");
    }
  };

  const handleSendSettings = () => {
    console.log("first");
  };

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
        setLoading,
      });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  };
  useEffect(() => {
    if (props.connectedDevice) {
      const cleanup = fetchData();
      return () => cleanup; // Clean up subscription on component unmount or when device changes
    }
  }, [props.connectedDevice]);

  const onRefresh = async () => {
    // call function to send req to device to get data
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
        setLoading,
      });
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  return (
    <KeyboardAwareScrollView
    // refreshControl={
    //   <RefreshControl
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //     colors={["#35374B", "#35374B", "#55B546"]}
    //     progressBackgroundColor={"#fff"}
    //     tintColor={"#35374B"}
    //   />
    // }
    >
      <RefreshBtn onPress={() => onRefresh()} />
      <Valve title={"Valve A"} status={valveA === 1 ? true : false} />

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
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
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
          <TextInput style={styles.inputSettings} value={hiLoHigh.toString()} />
          <Text style={styles.titleSettings}>HiLo low Threshold :</Text>
          <TextInput style={styles.inputSettings} value={hiLoLow.toString()} />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
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
          />
          <Text style={styles.titleSettings}>LP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPSensorMin.toString()}
          />
          <Text style={styles.titleSettings}>LP voltage max (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPVoltageMax.toString()}
          />
          <Text style={styles.titleSettings}>LP voltage min (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPVoltageMin.toString()}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
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
          />
          <Text style={styles.titleSettings}>CP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPSensorMin.toString()}
          />
          <Text style={styles.titleSettings}>CP voltage max (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPVoltageMax.toString()}
          />
          <Text style={styles.titleSettings}>CP voltage min (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPVoltageMin.toString()}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
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
          />
          <Text style={styles.titleSettings}>TP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPSensorMin.toString()}
          />
          <Text style={styles.titleSettings}>TP voltage max (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPVoltageMax.toString()}
          />
          <Text style={styles.titleSettings}>TP voltage min (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPVoltageMin.toString()}
          />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
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

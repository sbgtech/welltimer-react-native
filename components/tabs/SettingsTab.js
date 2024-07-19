import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Modal,
  Text,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { styles } from "./style/styles";
import ButtonUI from "../ButtonUI";
import Dropdown from "./blocs/Dropdown";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "../Utils/Constants";
import { Receive } from "../Utils/Receive";
import Loading from "./blocs/Loading";
import Valve from "./blocs/Valve";
import Psi from "./blocs/Psi";

const SettingsTab = (props) => {
  const [loading, setLoading] = useState(false);
  const list_production_method = [{ title: "Timer mode" }];
  const [missrunMax, setMissrunMax] = useState("");

  const list_detect_false_arrivals = [
    { title: "Disbale" },
    { title: "Enable" },
  ];
  const list_hilo_mode = [{ title: "Disbale" }, { title: "Enable" }];
  const list_lp = [{ title: "Voltage" }];
  const list_cp = [{ title: "Voltage" }];
  const list_tp = [{ title: "Voltage" }];

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

  useEffect(() => {
    // setLoading(true);
    Receive.SettingsReceivedData(props.connectedDevice, {
      setMissrunMax,
      setLoading,
    });
  }, []);

  return (
    <ScrollView>
      <Valve title={"Valve A"} />
      <Psi title={"Line (PSI)"} />
      <Psi title={"Tubing (PSI)"} />
      <Psi title={"Casing (PSI)"} />
      <View style={[styles.wrapper, styles.marginBottomContainer]}>
        <Text style={styles.valveTitle}>Controller configuration</Text>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>Production method :</Text>
          <Dropdown
            dropdownTitle={"Select your choice"}
            list={list_production_method}
          />
          <Text style={styles.titleSettings}>Missrun max :</Text>
          <TextInput
            style={styles.inputSettings}
            value={missrunMax.toString()}
            onChangeText={handleChangeMissrunMax}
          />
          <Text style={styles.titleSettings}>Detect false arrivals :</Text>
          <Dropdown
            dropdownTitle={"Select your choice"}
            list={list_detect_false_arrivals}
          />
          <Text style={styles.titleSettings}>Well depth :</Text>
          <TextInput style={styles.inputSettings} value="" />
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
          <Text style={styles.titleSettings}>Afterflow time (hrs) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>Afterflow time (min) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>Afterflow time (sec) :</Text>
          <TextInput style={styles.inputSettings} value="" />
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
          <Text style={styles.titleSettings}>Open Time (hrs) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>Open Time (min) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>Open Time (sec) :</Text>
          <TextInput style={styles.inputSettings} value="" />
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
          <Text style={styles.titleSettings}>Shutin Time (hrs) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>Shutin Time (min) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>Shutin Time (sec) :</Text>
          <TextInput style={styles.inputSettings} value="" />
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
          <Text style={styles.titleSettings}>Mandatory Time (hrs) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>Mandatory Time (min) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>Mandatory Time (sec) :</Text>
          <TextInput style={styles.inputSettings} value="" />
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
            dropdownTitle={"Select your choice"}
            list={list_hilo_mode}
          />
          <Text style={styles.titleSettings}>HiLo high Threshold :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>HiLo low Threshold :</Text>
          <TextInput style={styles.inputSettings} value="" />
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
          <Dropdown dropdownTitle={"Select your choice"} list={list_lp} />
          <Text style={styles.titleSettings}>LP Sensor max (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>LP Sensor min (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="" />
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
          <Dropdown dropdownTitle={"Select your choice"} list={list_cp} />
          <Text style={styles.titleSettings}>CP Sensor max (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>CP Sensor min (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="" />
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
          <Dropdown dropdownTitle={"Select your choice"} list={list_tp} />
          <Text style={styles.titleSettings}>TP Sensor max (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="" />
          <Text style={styles.titleSettings}>TP Sensor min (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="" />
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
    </ScrollView>
  );
};

export default SettingsTab;

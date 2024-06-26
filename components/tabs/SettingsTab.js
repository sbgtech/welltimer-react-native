import React from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import { styles } from "./style/styles";
import ButtonUI from "../ButtonUI";
import Dropdown from "./blocs/Dropdown";

const SettingsTab = () => {
  const list_production_method = [{ title: "Timer mode" }];
  const list_detect_false_arrivals = [
    { title: "Disbale" },
    { title: "Enable" },
  ];
  const list_hilo_mode = [{ title: "Disbale" }, { title: "Enable" }];
  const list_lp = [{ title: "Voltage" }];
  const list_cp = [{ title: "Voltage" }];
  const list_tp = [{ title: "Voltage" }];
  const handleSendSettings = () => {
    console.log("first");
  };
  return (
    <ScrollView>
      <View
        style={[styles.telemetryDataContainer, styles.marginBottomContainer]}
      >
        <Text style={styles.valveTitle}>Controller configuration</Text>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>Production method :</Text>
          <Dropdown
            dropdownTitle={"Select your choice"}
            list={list_production_method}
          />
          <Text style={styles.titleSettings}>Missrun max :</Text>
          <TextInput style={styles.inputSettings} value="5" />
          <Text style={styles.titleSettings}>Detect false arrivals :</Text>
          <Dropdown
            dropdownTitle={"Select your choice"}
            list={list_detect_false_arrivals}
          />
          <Text style={styles.titleSettings}>Well depth :</Text>
          <TextInput style={styles.inputSettings} value="0" />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
              loading={true}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>Afterflow time (hrs) :</Text>
          <TextInput style={styles.inputSettings} value="0" />
          <Text style={styles.titleSettings}>Afterflow time (min) :</Text>
          <TextInput style={styles.inputSettings} value="1" />
          <Text style={styles.titleSettings}>Afterflow time (sec) :</Text>
          <TextInput style={styles.inputSettings} value="6" />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
              loading={true}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>Open Time (hrs) :</Text>
          <TextInput style={styles.inputSettings} value="0" />
          <Text style={styles.titleSettings}>Open Time (min) :</Text>
          <TextInput style={styles.inputSettings} value="10" />
          <Text style={styles.titleSettings}>Open Time (sec) :</Text>
          <TextInput style={styles.inputSettings} value="12" />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
              loading={true}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>Shutin Time (hrs) :</Text>
          <TextInput style={styles.inputSettings} value="0" />
          <Text style={styles.titleSettings}>Shutin Time (min) :</Text>
          <TextInput style={styles.inputSettings} value="1" />
          <Text style={styles.titleSettings}>Shutin Time (sec) :</Text>
          <TextInput style={styles.inputSettings} value="12" />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
              loading={true}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>Mandatory Time (hrs) :</Text>
          <TextInput style={styles.inputSettings} value="0" />
          <Text style={styles.titleSettings}>Mandatory Time (min) :</Text>
          <TextInput style={styles.inputSettings} value="1" />
          <Text style={styles.titleSettings}>Mandatory Time (sec) :</Text>
          <TextInput style={styles.inputSettings} value="15" />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
              loading={true}
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
          <TextInput style={styles.inputSettings} value="500" />
          <Text style={styles.titleSettings}>HiLo low Threshold :</Text>
          <TextInput style={styles.inputSettings} value="0" />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
              loading={true}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>LP Sensor type :</Text>
          <Dropdown dropdownTitle={"Select your choice"} list={list_lp} />
          <Text style={styles.titleSettings}>LP Sensor max (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="1000" />
          <Text style={styles.titleSettings}>LP Sensor min (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="0" />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
              loading={true}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>CP Sensor type :</Text>
          <Dropdown dropdownTitle={"Select your choice"} list={list_cp} />
          <Text style={styles.titleSettings}>CP Sensor max (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="1000" />
          <Text style={styles.titleSettings}>CP Sensor min (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="0" />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
              loading={true}
            />
          </View>
        </View>
        <View style={[styles.rangeWrapper, styles.settingsSection]}>
          <Text style={styles.titleSettings}>TP Sensor type :</Text>
          <Dropdown dropdownTitle={"Select your choice"} list={list_tp} />
          <Text style={styles.titleSettings}>TP Sensor max (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="1000" />
          <Text style={styles.titleSettings}>TP Sensor min (PSI) :</Text>
          <TextInput style={styles.inputSettings} value="0" />
          <View style={styles.containerBtnText}>
            <ButtonUI
              onPress={() => handleSendSettings()}
              title={"Send"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
              loading={true}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsTab;

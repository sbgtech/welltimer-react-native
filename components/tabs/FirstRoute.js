import React, { useState } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import Switch from "react-native-switch-toggles";
import ButtonUI from "../ButtonUI";
import Ionicons from "@expo/vector-icons/Ionicons";

const FirstRoute = () => {
  const { width, height } = Dimensions.get("window");
  const marginBottom = height * 0.05; // Adjust 0.05 as needed for your layout
  const [isEnabledValveA, setIsEnabledValveA] = useState(false);
  const [isEnabledValveB, setIsEnabledValveB] = useState(false);
  const [selectedOptionLine, setSelectedOptionLine] = useState("voltage");
  const [selectedOptionTubing, setSelectedOptionTubing] = useState("current");
  const [selectedOptionCasing, setSelectedOptionCasing] = useState("current");
  const options = [
    {
      label: "Current",
      value: "current",
    },
    {
      label: "Voltage",
      value: "voltage",
    },
  ];

  return (
    <ScrollView>
      <View style={[styles.container, { marginBottom: marginBottom }]}>
        <View style={styles.statusWrapper}>
          <Text style={styles.valveTitle}>Valve A</Text>
          <View style={styles.onOffStatus}>
            <Text style={styles.valveStatus}>
              Status : {isEnabledValveA ? <Text>ON</Text> : <Text>OFF</Text>}
            </Text>
            <Switch
              size={30}
              value={isEnabledValveA}
              onChange={(value) => setIsEnabledValveA(value)}
              activeTrackColor={"#45D058"}
              renderOffIndicator={() => (
                <Text
                  style={{ fontSize: 10, fontWeight: "bold", color: "white" }}
                >
                  OFF
                </Text>
              )}
              renderOnIndicator={() => (
                <Text
                  style={{ fontSize: 10, fontWeight: "bold", color: "white" }}
                >
                  ON
                </Text>
              )}
            />
          </View>
        </View>
        <View style={styles.statusWrapper}>
          <Text style={styles.valveTitle}>Valve B</Text>
          <View style={styles.onOffStatus}>
            <Text style={styles.valveStatus}>
              Status : {isEnabledValveB ? <Text>ON</Text> : <Text>OFF</Text>}
            </Text>
            <Switch
              size={30}
              value={isEnabledValveB}
              onChange={(value) => setIsEnabledValveB(value)}
              activeTrackColor={"#45D058"}
              renderOffIndicator={() => (
                <Text
                  style={{ fontSize: 10, fontWeight: "bold", color: "white" }}
                >
                  OFF
                </Text>
              )}
              renderOnIndicator={() => (
                <Text
                  style={{ fontSize: 10, fontWeight: "bold", color: "white" }}
                >
                  ON
                </Text>
              )}
            />
          </View>
        </View>
        <View style={styles.statusWrapper}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.valveTitle}>Line (PSI)</Text>
            <Text style={styles.valveTitle}>1500</Text>
          </View>

          <View style={styles.rangeWrapper}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Range :</Text>
            <View style={styles.containerRange}>
              <Text style={styles.labelRange}>Min :</Text>
              <TextInput style={styles.inputRange} value={"5"} />
              <ButtonUI
                onPress={() => console.log("min")}
                title={<Ionicons name="send" size={20} color="white" />}
                btnStyle={styles.btnSend}
              />
            </View>
            <View style={styles.containerRange}>
              <Text style={styles.labelRange}>Max :</Text>
              <TextInput style={styles.inputRange} value={"15"} />
              <ButtonUI
                onPress={() => console.log("max")}
                title={<Ionicons name="send" size={20} color="white" />}
                btnStyle={styles.btnSend}
              />
            </View>
          </View>

          <View style={styles.modeWrapper}>
            <RadioForm formHorizontal={false} animation={true}>
              {options.map((obj) => (
                <RadioButton labelHorizontal={true} key={obj.value}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={obj.value}
                    isSelected={selectedOptionLine === obj.value}
                    onPress={(value) => {
                      setSelectedOptionLine(value);
                      console.log(value);
                    }}
                    borderWidth={2}
                    buttonInnerColor={"#000"}
                    buttonOuterColor={
                      selectedOptionLine === obj.value ? "#000" : "#828282"
                    }
                    buttonSize={18}
                    buttonOuterSize={30}
                    buttonStyle={{}}
                    buttonWrapStyle={{
                      marginBottom: 2,
                    }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={obj.value}
                    labelHorizontal={true}
                    onPress={(value) => {
                      setSelectedOptionLine(value);
                      console.log(value);
                    }}
                    labelStyle={
                      selectedOptionLine === obj.value
                        ? { color: "#000", fontSize: 18 }
                        : { color: "#828282", fontSize: 18 }
                    }
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>

            {selectedOptionLine === "voltage" && (
              <View>
                <View style={styles.inputContainerMin}>
                  <Text style={styles.labelInput}>Min voltage :</Text>
                  <TextInput style={styles.input} value={"5"} />
                  <ButtonUI
                    onPress={() => console.log("min")}
                    title={<Ionicons name="send" size={20} color="white" />}
                    btnStyle={styles.btnSend}
                  />
                </View>
                <View style={styles.inputContainerMax}>
                  <Text style={styles.labelInput}>Max voltage :</Text>
                  <TextInput style={styles.input} value={"15"} />
                  <ButtonUI
                    onPress={() => console.log("max")}
                    title={<Ionicons name="send" size={20} color="white" />}
                    btnStyle={styles.btnSend}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.statusWrapper}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.valveTitle}>Tubing (PSI)</Text>
            <Text style={styles.valveTitle}>2500</Text>
          </View>

          <View style={styles.rangeWrapper}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Range :</Text>
            <View style={styles.containerRange}>
              <Text style={styles.labelRange}>Min :</Text>
              <TextInput style={styles.inputRange} value={"5"} />
              <ButtonUI
                onPress={() => console.log("min")}
                title={<Ionicons name="send" size={20} color="white" />}
                btnStyle={styles.btnSend}
              />
            </View>
            <View style={styles.containerRange}>
              <Text style={styles.labelRange}>Max :</Text>
              <TextInput style={styles.inputRange} value={"15"} />
              <ButtonUI
                onPress={() => console.log("max")}
                title={<Ionicons name="send" size={20} color="white" />}
                btnStyle={styles.btnSend}
              />
            </View>
          </View>

          <View style={styles.modeWrapper}>
            <RadioForm formHorizontal={false} animation={true}>
              {options.map((obj) => (
                <RadioButton labelHorizontal={true} key={obj.value}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={obj.value}
                    isSelected={selectedOptionTubing === obj.value}
                    onPress={(value) => {
                      setSelectedOptionTubing(value);
                      console.log(value);
                    }}
                    borderWidth={2}
                    buttonInnerColor={"#000"}
                    buttonOuterColor={
                      selectedOptionTubing === obj.value ? "#000" : "#828282"
                    }
                    buttonSize={18}
                    buttonOuterSize={30}
                    buttonStyle={{}}
                    buttonWrapStyle={{
                      marginBottom: 2,
                    }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={obj.value}
                    labelHorizontal={true}
                    onPress={(value) => {
                      setSelectedOptionTubing(value);
                      console.log(value);
                    }}
                    labelStyle={
                      selectedOptionTubing === obj.value
                        ? { color: "#000", fontSize: 18 }
                        : { color: "#828282", fontSize: 18 }
                    }
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>

            {selectedOptionTubing === "voltage" && (
              <View>
                <View style={styles.inputContainerMin}>
                  <Text style={styles.labelInput}>Min voltage :</Text>
                  <TextInput style={styles.input} value={"5"} />
                  <ButtonUI
                    onPress={() => console.log("min")}
                    title={<Ionicons name="send" size={20} color="white" />}
                    btnStyle={styles.btnSend}
                  />
                </View>
                <View style={styles.inputContainerMax}>
                  <Text style={styles.labelInput}>Max voltage :</Text>
                  <TextInput style={styles.input} value={"15"} />
                  <ButtonUI
                    onPress={() => console.log("max")}
                    title={<Ionicons name="send" size={20} color="white" />}
                    btnStyle={styles.btnSend}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.statusWrapper}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.valveTitle}>Casing (PSI)</Text>
            <Text style={styles.valveTitle}>3500</Text>
          </View>

          <View style={styles.rangeWrapper}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Range :</Text>
            <View style={styles.containerRange}>
              <Text style={styles.labelRange}>Min :</Text>
              <TextInput style={styles.inputRange} value={"5"} />
              <ButtonUI
                onPress={() => console.log("min")}
                title={<Ionicons name="send" size={20} color="white" />}
                btnStyle={styles.btnSend}
              />
            </View>
            <View style={styles.containerRange}>
              <Text style={styles.labelRange}>Max :</Text>
              <TextInput style={styles.inputRange} value={"15"} />
              <ButtonUI
                onPress={() => console.log("max")}
                title={<Ionicons name="send" size={20} color="white" />}
                btnStyle={styles.btnSend}
              />
            </View>
          </View>

          <View style={styles.modeWrapper}>
            <RadioForm formHorizontal={false} animation={true}>
              {options.map((obj) => (
                <RadioButton labelHorizontal={true} key={obj.value}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={obj.value}
                    isSelected={selectedOptionCasing === obj.value}
                    onPress={(value) => {
                      setSelectedOptionCasing(value);
                      console.log(value);
                    }}
                    borderWidth={2}
                    buttonInnerColor={"#000"}
                    buttonOuterColor={
                      selectedOptionCasing === obj.value ? "#000" : "#828282"
                    }
                    buttonSize={18}
                    buttonOuterSize={30}
                    buttonStyle={{}}
                    buttonWrapStyle={{
                      marginBottom: 2,
                    }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={obj.value}
                    labelHorizontal={true}
                    onPress={(value) => {
                      setSelectedOptionCasing(value);
                      console.log(value);
                    }}
                    labelStyle={
                      selectedOptionCasing === obj.value
                        ? { color: "#000", fontSize: 18 }
                        : { color: "#828282", fontSize: 18 }
                    }
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>

            {selectedOptionCasing === "voltage" && (
              <View>
                <View style={styles.inputContainerMin}>
                  <Text style={styles.labelInput}>Min voltage :</Text>
                  <TextInput style={styles.input} value={"5"} />
                  <ButtonUI
                    onPress={() => console.log("min")}
                    title={<Ionicons name="send" size={20} color="white" />}
                    btnStyle={styles.btnSend}
                  />
                </View>
                <View style={styles.inputContainerMax}>
                  <Text style={styles.labelInput}>Max voltage :</Text>
                  <TextInput style={styles.input} value={"15"} />
                  <ButtonUI
                    onPress={() => console.log("max")}
                    title={<Ionicons name="send" size={20} color="white" />}
                    btnStyle={styles.btnSend}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  statusWrapper: {
    marginHorizontal: 26,
    marginTop: 16,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#eeeeee",
  },
  valveTitle: {
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  onOffStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rangeWrapper: { backgroundColor: "#ddd", padding: 10, borderRadius: 14 },
  modeWrapper: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 14,
    marginTop: 14,
  },
  containerRange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  labelRange: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputRange: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    width: "50%",
    maxWidth: "50%",
    height: 40,
  },
  inputContainerMin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  inputContainerMax: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelInput: {
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    width: "40%",
    maxWidth: "50%",
    height: 40,
  },
  btnSend: {
    width: 38,
  },
});

export default FirstRoute;

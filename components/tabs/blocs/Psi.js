import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import ButtonUI from "../../ButtonUI";
import Ionicons from "@expo/vector-icons/Ionicons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

const Psi = (props) => {
  const [minRangeValue, setMinRangeValue] = useState(7);
  const [maxRangeValue, setMaxRangeValue] = useState(13);
  const [minVoltageValue, setMinVoltageValue] = useState(3);
  const [maxVoltageValue, setMaxVoltageValue] = useState(7);
  const [selectedOption, setSelectedOption] = useState("current");
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
  const handleChangeMinRangeValue = (text) => {
    setMinRangeValue(text);
  };
  const handleChangeMaxRangeValue = (text) => {
    setMaxRangeValue(text);
  };
  const handleChangeMinVoltageValue = (text) => {
    setMinVoltageValue(text);
  };
  const handleChangeMaxVoltageValue = (text) => {
    setMaxVoltageValue(text);
  };
  return (
    <View style={styles.statusWrapper}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.valveTitle}>{props.title}</Text>
        <Text style={styles.valveTitle}>{props.value}</Text>
      </View>

      <View style={styles.rangeWrapper}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Range :</Text>
        <View style={styles.containerRange}>
          <Text style={styles.labelRange}>Min :</Text>
          <TextInput
            style={styles.inputRange}
            value={minRangeValue.toString()}
            onChangeText={handleChangeMinRangeValue}
          />
          <ButtonUI
            onPress={() => console.log(props.title, minRangeValue)}
            title={<Ionicons name="send" size={20} color="white" />}
            btnStyle={styles.btnSend}
          />
        </View>
        <View style={styles.containerRange}>
          <Text style={styles.labelRange}>Max :</Text>
          <TextInput
            style={styles.inputRange}
            value={maxRangeValue.toString()}
            onChangeText={handleChangeMaxRangeValue}
          />
          <ButtonUI
            onPress={() => console.log(props.title, maxRangeValue)}
            title={<Ionicons name="send" size={20} color="white" />}
            btnStyle={styles.btnSend}
          />
        </View>
      </View>

      <View style={styles.modeWrapper}>
        <RadioForm formHorizontal={false} animation={true}>
          {options.map((obj) => (
            <RadioButton labelHorizontal={true} key={obj.value}>
              <RadioButtonInput
                obj={obj}
                index={obj.value}
                isSelected={selectedOption === obj.value}
                onPress={(value) => {
                  setSelectedOption(value);
                  console.log(value);
                }}
                borderWidth={2}
                buttonInnerColor={"#000"}
                buttonOuterColor={
                  selectedOption === obj.value ? "#000" : "#828282"
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
                  setSelectedOption(value);
                  console.log(value);
                }}
                labelStyle={
                  selectedOption === obj.value
                    ? { color: "#000", fontSize: 18 }
                    : { color: "#828282", fontSize: 18 }
                }
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>

        {selectedOption === "voltage" && (
          <View>
            <View style={styles.inputContainerMin}>
              <Text style={styles.labelInput}>Min voltage :</Text>
              <TextInput
                style={styles.input}
                value={minVoltageValue.toString()}
                onChangeText={handleChangeMinVoltageValue}
              />
              <ButtonUI
                onPress={() => console.log(props.title, minVoltageValue)}
                title={<Ionicons name="send" size={20} color="white" />}
                btnStyle={styles.btnSend}
              />
            </View>
            <View style={styles.inputContainerMax}>
              <Text style={styles.labelInput}>Max voltage :</Text>
              <TextInput
                style={styles.input}
                value={maxVoltageValue.toString()}
                onChangeText={handleChangeMaxVoltageValue}
              />
              <ButtonUI
                onPress={() => console.log(props.title, maxVoltageValue)}
                title={<Ionicons name="send" size={20} color="white" />}
                btnStyle={styles.btnSend}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Psi;

import React, { useState } from "react";
import { Text, View, TextInput, Dimensions } from "react-native";
import ButtonUI from "../../ButtonUI";
import Ionicons from "@expo/vector-icons/Ionicons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { styles } from "../style/styles";

const Psi = (props) => {
  const { width } = Dimensions.get("window");
  const scale = width / 450;
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
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.valveTitle}>{props.title}</Text>
      </View>

      <View style={styles.rangeWrapper}>
        <View style={styles.containerRange}>
          <Text style={styles.labelRange}>Min :</Text>
          <TextInput
            style={styles.inputRange}
            value={minRangeValue.toString()}
            onChangeText={handleChangeMinRangeValue}
          />
          <ButtonUI
            onPress={() => console.log(props.title, minRangeValue)}
            title={<Ionicons name="send" size={20 * scale} color="white" />}
            btnStyle={styles.btnSendIcon}
            txtStyle={styles.TextSendStyle}
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
            title={<Ionicons name="send" size={20 * scale} color="white" />}
            btnStyle={styles.btnSendIcon}
            txtStyle={styles.TextSendStyle}
          />
        </View>
      </View>

      <View style={styles.modeWrapper}>
        <RadioForm
          formHorizontal={false}
          animation={true}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {options.map((obj) => (
            <RadioButton
              labelHorizontal={true}
              key={obj.value}
              style={{
                alignItems: "center",
              }}
            >
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
                buttonSize={14 * scale}
                buttonOuterSize={26 * scale}
                buttonStyle={{}}
                buttonWrapStyle={{}}
              />
              <RadioButtonLabel
                obj={obj}
                index={obj.value}
                labelHorizontal={true}
                onPress={(value) => {
                  setSelectedOption(value);
                  console.log(value);
                }}
                labelStyle={[
                  { fontSize: 16 * scale, padding: 10 },
                  selectedOption === obj.value
                    ? {
                        color: "#000",
                      }
                    : {
                        color: "#828282",
                      },
                ]}
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
                title={<Ionicons name="send" size={20 * scale} color="white" />}
                btnStyle={styles.btnSendIcon}
                txtStyle={styles.TextSendStyle}
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
                title={<Ionicons name="send" size={20 * scale} color="white" />}
                btnStyle={styles.btnSendIcon}
                txtStyle={styles.TextSendStyle}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Psi;

import React from "react";
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ButtonUI from "../../ButtonUI";
import { styles } from "../style/styles";
import AntDesign from "@expo/vector-icons/AntDesign";

const Login_modal = ({
  modalVisible,
  setModalVisible,
  pin,
  setPin,
  handleSubmitPIN,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.PINContainer}>
          <View style={styles.PINContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <AntDesign
                name="closesquare"
                size={28}
                color="#0055a4"
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.PINTitle}>Enter PIN</Text>
            <TextInput
              style={styles.PINinput}
              placeholder="Enter your PIN"
              secureTextEntry
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              maxLength={4}
              autoFocus={true}
            />
            <ButtonUI
              onPress={() => handleSubmitPIN()}
              title={"Submit"}
              btnStyle={styles.btnSendText}
              txtStyle={styles.TextSendStyle}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Login_modal;

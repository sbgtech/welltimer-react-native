import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "../style/styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import OtpTextInput from "react-native-otp-textinput";

const Login_modal = ({
  loginModalVisible,
  setLoginModalVisible,
  disconnectDevice,
  // pin,
  // setPin,
  loginIsIndicatorShown,
  handleSubmitPIN,
  onPress,
}) => {
  const { width } = useWindowDimensions();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loginModalVisible}
      onRequestClose={() => setLoginModalVisible(false)}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.PINContainer}>
            <View style={styles.loginContainer(width)}>
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={() => {
                  disconnectDevice();
                }}
              >
                <AntDesign
                  name="closesquare"
                  size={
                    width < 600 ? 28 : width < 800 ? 28 : width < 950 ? 38 : 38
                  }
                  color="#0055a4"
                />
              </TouchableOpacity>
              {!loginIsIndicatorShown ? (
                <Image
                  alt="App Logo"
                  resizeMode="center"
                  style={styles.loginImgDefault(width)}
                  source={require("../../../assets/pin.png")}
                />
              ) : (
                <Image
                  alt="App Logo"
                  resizeMode="center"
                  style={styles.loginImgLoad(width)}
                  source={require("../../../assets/load.gif")}
                />
              )}

              <Text style={styles.otpTitle(width)}>Enter PIN</Text>
              <OtpTextInput
                handleTextChange={handleSubmitPIN} // This will handle OTP input changes
                inputCount={6}
                tintColor={"#0055a4"}
                offTintColor={"#C9C9C9"}
                keyboardType="numeric"
                containerStyle={styles.loginContainerStyle(width)}
                textInputStyle={styles.loginTextInputStyle(width)}
              />
              <TouchableOpacity style={styles.forgotBloc}>
                <Text style={styles.forgotTxt(width)}>Forgot PIN?</Text>
                <TouchableOpacity onPress={onPress}>
                  <Text style={[styles.forgotTxt(width), { color: "#0055a4" }]}>
                    Enter name
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default Login_modal;

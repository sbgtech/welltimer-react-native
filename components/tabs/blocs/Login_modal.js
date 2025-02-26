import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import ButtonUI from "../../ButtonUI";
import { styles } from "../style/styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import OtpTextInput from "react-native-otp-textinput";

const Login_modal = ({
  modalVisible,
  setModalVisible,
  // pin,
  // setPin,
  isIndicatorShown,
  handleSubmitPIN,
}) => {
  const { width } = useWindowDimensions();
  // const [otp, setOtp] = useState("");
  // const [isIndicatorShown, setIsIndicatorShown] = useState(false);

  // // Handle OTP change
  // const handleOtpChange = (text) => {
  //   setPin(text);
  //   // Check if the OTP length is 6, and show alert
  //   if (text.length === 6) {
  //     setIsIndicatorShown(true);
  //     setTimeout(() => {
  //       Toast.show({
  //         type: "success",
  //         text1: "Successfully OTP",
  //         text2: `Your OTP is ${text}`,
  //         visibilityTime: 5000,
  //       });
  //       setIsIndicatorShown(false);
  //     }, 2000);
  //   }
  // };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.PINContainer}>
          <View style={styles.loginContainer(width)}>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            <Image
              alt="App Logo"
              resizeMode="center"
              style={styles.loginImg(width)}
              source={require("../../../assets/pin.png")}
            />
            <Text style={styles.otpTitle(width)}>Enter PIN</Text>
            {/* <TextInput
              style={styles.PINinput(width)}
              placeholder="Enter your PIN"
              secureTextEntry
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              maxLength={4}
              autoFocus={true}
            /> */}
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
              <TouchableOpacity>
                <Text style={[styles.forgotTxt(width), { color: "#0055a4" }]}>
                  Enter name
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <ButtonUI
              onPress={() => setModalVisible(false)}
              title={"Close"}
              btnStyle={styles.btnCloseLogin(width)}
              txtStyle={styles.TextCloseLogin(width)}
            />
            <View>
              {isIndicatorShown && (
                <ActivityIndicator
                  size={50}
                  color={"#d7c300"}
                  style={styles.loadingStyle}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Login_modal;

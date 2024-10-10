import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert, Dimensions } from "react-native";
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
import Toast from "react-native-toast-message";

const SettingsTab = (props) => {
  // declare initial states
  const { height } = Dimensions.get("window");
  // the loading state, default is false
  const [loading, setLoading] = useState(false);
  // title of loading modal
  const [title, setTitle] = useState("");
  // value of valve, default 0 (OFF)
  const [valveA, setValveA] = useState(0);
  // display the name of the productionMethod based on the received index
  const [productionMethodIndex, setProductionMethodIndex] = useState(null);
  const productionMethod = ["Timer mode"];
  // prepare variables to set them the received data
  const [missrunMax, setMissrunMax] = useState("");
  const [falseArrivalsIndex, setFalseArrivalsIndex] = useState(null);
  const falseArrivals_hiLoMode = ["Disable", "Enable"];
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

  // handle change missrunMax value
  const handleChangeMissrunMax = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setMissrunMax("");
      } else {
        setMissrunMax(validText);
      }
    } else {
      setMissrunMax("");
    }
  };

  // handle change wellDepth value
  const handleChangeWellDepth = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setWellDepth("");
      } else {
        setWellDepth(validText);
      }
    } else {
      setWellDepth("");
    }
  };

  // handle change hiloHight value
  const handleChangeHiLoHigh = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setHiLoHigh("");
      } else {
        setHiLoHigh(validText);
      }
    } else {
      setHiLoHigh("");
    }
  };

  // handle change hiloLow value
  const handleChangeHiLoLow = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setHiLoLow("");
      } else {
        setHiLoLow(validText);
      }
    } else {
      setHiLoLow("");
    }
  };

  // handle change LPSensorMax value
  const handleChangeLPSensorMax = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setLPSensorMax("");
      } else {
        setLPSensorMax(validText);
      }
    } else {
      setLPSensorMax("");
    }
  };

  // handle change LPSensorMin value
  const handleChangeLPSensorMin = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setLPSensorMin("");
      } else {
        setLPSensorMin(validText);
      }
    } else {
      setLPSensorMin("");
    }
  };

  // handle change LPVoltageMax value
  const handleChangeLPVoltageMax = (text) => {
    const MAX_VALUE = 9.9;

    if (text) {
      // Remove all non-numeric characters except decimal points
      let validText = text.replace(/[^0-9.]/g, "");

      // Find the position of the first decimal point
      const decimalIndex = validText.indexOf(".");

      // Allow only one digit before and one digit after the decimal point
      if (decimalIndex !== -1) {
        // Keep one digit before the decimal and one after
        validText = validText.substring(0, decimalIndex + 2);
      } else {
        // Ensure only one digit before the decimal point
        validText = validText.substring(0, 1);
      }

      // Remove any additional decimal points
      validText = validText.replace(/\.(?=.*\.)/g, "");

      const numericValue = parseFloat(validText);

      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "The max value must be 9.9",
            visibilityTime: 3000,
          });
          setLPVoltageMax(""); // Clear or reset the value
        } else {
          setLPVoltageMax(validText);
        }
      } else {
        setLPVoltageMax(""); // Clear or reset the value
      }
    } else {
      setLPVoltageMax(""); // Handle empty input case
    }
  };

  // handle change LPVoltageMin value
  const handleChangeLPVoltageMin = (text) => {
    const MAX_VALUE = 10;
    if (text) {
      // Remove all non-numeric characters except decimal points
      let validText = text.replace(/[^0-9.]/g, "");

      // Find the position of the first decimal point
      const decimalIndex = validText.indexOf(".");

      // If there's a decimal point, truncate the string to one decimal place
      if (decimalIndex !== -1) {
        validText = validText.substring(0, decimalIndex + 2); // Keep only one digit after the decimal point
      }

      // Remove any additional decimal points
      validText = validText.replace(/\.(?=.*\.)/g, "");

      const numericValue = parseFloat(validText);

      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 10");
          setLPVoltageMin(""); // Clear or reset the value
        } else {
          setLPVoltageMin(validText);
        }
      } else {
        setLPVoltageMin(""); // Clear or reset the value
      }
    } else {
      setLPVoltageMin(""); // Handle empty input case
    }
  };

  // handle change CPSensorMax value
  const handleChangeCPSensorMax = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setCPSensorMax("");
      } else {
        setCPSensorMax(validText);
      }
    } else {
      setCPSensorMax("");
    }
  };

  // handle change CPSensorMin value
  const handleChangeCPSensorMin = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setCPSensorMin("");
      } else {
        setCPSensorMin(validText);
      }
    } else {
      setCPSensorMin("");
    }
  };

  // handle change CPVoltageMax value
  const handleChangeCPVoltageMax = (text) => {
    const MAX_VALUE = 10;
    if (text) {
      // Remove all non-numeric characters except decimal points
      let validText = text.replace(/[^0-9.]/g, "");

      // Find the position of the first decimal point
      const decimalIndex = validText.indexOf(".");

      // If there's a decimal point, truncate the string to one decimal place
      if (decimalIndex !== -1) {
        validText = validText.substring(0, decimalIndex + 2); // Keep only one digit after the decimal point
      }

      // Remove any additional decimal points
      validText = validText.replace(/\.(?=.*\.)/g, "");

      const numericValue = parseFloat(validText);

      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 10");
          setCPVoltageMax(""); // Clear or reset the value
        } else {
          setCPVoltageMax(validText);
        }
      } else {
        setCPVoltageMax(""); // Clear or reset the value
      }
    } else {
      setCPVoltageMax(""); // Handle empty input case
    }
  };

  // handle change CPVoltageMin value
  const handleChangeCPVoltageMin = (text) => {
    const MAX_VALUE = 10;
    if (text) {
      // Remove all non-numeric characters except decimal points
      let validText = text.replace(/[^0-9.]/g, "");

      // Find the position of the first decimal point
      const decimalIndex = validText.indexOf(".");

      // If there's a decimal point, truncate the string to one decimal place
      if (decimalIndex !== -1) {
        validText = validText.substring(0, decimalIndex + 2); // Keep only one digit after the decimal point
      }

      // Remove any additional decimal points
      validText = validText.replace(/\.(?=.*\.)/g, "");

      const numericValue = parseFloat(validText);

      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 10");
          setCPVoltageMin(""); // Clear or reset the value
        } else {
          setCPVoltageMin(validText);
        }
      } else {
        setCPVoltageMin(""); // Clear or reset the value
      }
    } else {
      setCPVoltageMin(""); // Handle empty input case
    }
  };

  // handle change TPSensorMax value
  const handleChangeTPSensorMax = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setTPSensorMax("");
      } else {
        setTPSensorMax(validText);
      }
    } else {
      setTPSensorMax("");
    }
  };

  // handle change TPSensorMin value
  const handleChangeTPSensorMin = (text) => {
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure the length is 4
      if (validText.length > 4) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "The max value must be 4 digits",
          visibilityTime: 3000,
        });
        setTPSensorMin("");
      } else {
        setTPSensorMin(validText);
      }
    } else {
      setTPSensorMin("");
    }
  };

  // handle change TPVoltageMax value
  const handleChangeTPVoltageMax = (text) => {
    const MAX_VALUE = 10;
    if (text) {
      // Remove all non-numeric characters except decimal points
      let validText = text.replace(/[^0-9.]/g, "");

      // Find the position of the first decimal point
      const decimalIndex = validText.indexOf(".");

      // If there's a decimal point, truncate the string to one decimal place
      if (decimalIndex !== -1) {
        validText = validText.substring(0, decimalIndex + 2); // Keep only one digit after the decimal point
      }

      // Remove any additional decimal points
      validText = validText.replace(/\.(?=.*\.)/g, "");

      const numericValue = parseFloat(validText);

      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 10");
          setTPVoltageMax(""); // Clear or reset the value
        } else {
          setTPVoltageMax(validText);
        }
      } else {
        setTPVoltageMax(""); // Clear or reset the value
      }
    } else {
      setTPVoltageMax(""); // Handle empty input case
    }
  };

  // handle change TPVoltageMin value
  const handleChangeTPVoltageMin = (text) => {
    const MAX_VALUE = 10;
    if (text) {
      // Remove all non-numeric characters except decimal points
      let validText = text.replace(/[^0-9.]/g, "");

      // Find the position of the first decimal point
      const decimalIndex = validText.indexOf(".");

      // If there's a decimal point, truncate the string to one decimal place
      if (decimalIndex !== -1) {
        validText = validText.substring(0, decimalIndex + 2); // Keep only one digit after the decimal point
      }

      // Remove any additional decimal points
      validText = validText.replace(/\.(?=.*\.)/g, "");

      const numericValue = parseFloat(validText);

      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 10");
          setTPVoltageMin(""); // Clear or reset the value
        } else {
          setTPVoltageMin(validText);
        }
      } else {
        setTPVoltageMin(""); // Clear or reset the value
      }
    } else {
      setTPVoltageMin(""); // Handle empty input case
    }
  };

  // send array of prod method, missrun max, false arrivals and well depth values to device with their addresses
  const handleSendFirstBloc = async () => {
    if (missrunMax === "" || wellDepth === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields (Missrun max and Well depth) must be filled",
        visibilityTime: 3000,
      });
      return; // Exit the function if validation fails
    }
    try {
      const arr = JSON.stringify([
        3,
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
      await props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent successfully",
        visibilityTime: 3000,
      });
      await fetchDataSettings();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send array of HiLo values to device
  const handleSendHiLo = async () => {
    if (hiLoHigh === "" || hiLoLow === "") {
      console.log(1);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields (HiLo high and HiLo low) must be filled",
        visibilityTime: 3000,
      });
      return; // Exit the function if validation fails
    } else if (hiLoLow > hiLoHigh) {
      console.log(2);
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "The max value must be more than min value",
        visibilityTime: 3000,
      });
    } else {
      console.log(3);
      try {
        const arr = JSON.stringify([
          3,
          122,
          hiLoModeIndex,
          123,
          Number(hiLoHigh),
          124,
          Number(hiLoLow),
        ]);
        console.log(arr);
        const buffer = Buffer.from(arr + "\n", "utf-8");
        await props.connectedDevice?.writeCharacteristicWithResponseForService(
          UART_SERVICE_UUID,
          UART_TX_CHARACTERISTIC_UUID,
          buffer.toString("base64")
        );
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Data sent successfully",
          visibilityTime: 3000,
        });
        await fetchDataSettings();
      } catch (error) {
        console.log(
          "Error with writeCharacteristicWithResponseForService :",
          error
        );
      }
    }
  };

  // send array of CP values to device
  const handleSendLP = async () => {
    if (
      LPSensorMax === "" ||
      LPSensorMin === "" ||
      LPVoltageMax === "" ||
      LPVoltageMin === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields (LP sensor and LP Voltage) must be filled",
        visibilityTime: 3000,
      });
      return; // Exit the function if validation fails
    }
    try {
      const arr = JSON.stringify([
        3,
        10,
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
      await props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent successfully",
        visibilityTime: 3000,
      });
      await fetchDataSettings();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send array of CP values to device
  const handleSendCP = async () => {
    if (
      CPSensorMax === "" ||
      CPSensorMin === "" ||
      CPVoltageMax === "" ||
      CPVoltageMin === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields (CP sensor and CP Voltage) must be filled",
        visibilityTime: 3000,
      });
      return; // Exit the function if validation fails
    }
    try {
      const arr = JSON.stringify([
        3,
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
      await props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent successfully",
        visibilityTime: 3000,
      });
      await fetchDataSettings();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // send array of TP values to device
  const handleSendTP = async () => {
    if (
      TPSensorMax === "" ||
      TPSensorMin === "" ||
      TPVoltageMax === "" ||
      TPVoltageMin === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields (TP sensor and TP Voltage) must be filled",
        visibilityTime: 3000,
      });
      return; // Exit the function if validation fails
    }
    try {
      const arr = JSON.stringify([
        3,
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
      await props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data sent successfully",
        visibilityTime: 3000,
      });
      await fetchDataSettings();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // function called in useEffect when load component to fetch data
  const fetchDataSettings = async () => {
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
        setTitle,
      });
    } catch (error) {
      console.error("Error in receiving data:", error);
    }
  };

  // Initial load, call fetchData function with the corresponding data
  useEffect(() => {
    // fetcha data if the device is connected
    if (props.connectedDevice) {
      const cleanup = fetchDataSettings();
      return () => cleanup; // Clean up subscription on component unmount or when device changes
    }
  }, [props.connectedDevice]);

  // function run when clicking on refresh button
  const onRefreshSettings = async () => {
    try {
      // call function to send request to device to get data
      Receive.sendReqToGetData(props.connectedDevice, 2);
      // start receiving data
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
        setTitle,
      });
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={height * 0.2} // Space above the keyboard
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      enableResetScrollToCoords={false}
    >
      <RefreshBtn onPress={() => onRefreshSettings()} />
      <Valve
        connectedDevice={props.connectedDevice}
        setLoading={setLoading}
        setTitle={setTitle}
        fetchDataSettings={fetchDataSettings}
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
            keyboardType="numeric"
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
            keyboardType="numeric"
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
            keyboardType="numeric"
          />
          <Text style={styles.titleSettings}>HiLo low Threshold :</Text>
          <TextInput
            style={styles.inputSettings}
            value={hiLoLow.toString()}
            onChangeText={handleChangeHiLoLow}
            keyboardType="numeric"
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
            keyboardType="numeric"
          />
          <Text style={styles.titleSettings}>LP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPSensorMin.toString()}
            onChangeText={handleChangeLPSensorMin}
            keyboardType="numeric"
          />
          <Text style={styles.titleSettings}>LP voltage max (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPVoltageMax.toString()}
            onChangeText={handleChangeLPVoltageMax}
            keyboardType="numbers-and-punctuation"
          />
          <Text style={styles.titleSettings}>LP voltage min (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPVoltageMin.toString()}
            onChangeText={handleChangeLPVoltageMin}
            keyboardType="numbers-and-punctuation"
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
            keyboardType="numeric"
          />
          <Text style={styles.titleSettings}>CP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPSensorMin.toString()}
            onChangeText={handleChangeCPSensorMin}
            keyboardType="numeric"
          />
          <Text style={styles.titleSettings}>CP voltage max (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPVoltageMax.toString()}
            onChangeText={handleChangeCPVoltageMax}
            keyboardType="numbers-and-punctuation"
          />
          <Text style={styles.titleSettings}>CP voltage min (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPVoltageMin.toString()}
            onChangeText={handleChangeCPVoltageMin}
            keyboardType="numbers-and-punctuation"
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
            keyboardType="numeric"
          />
          <Text style={styles.titleSettings}>TP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPSensorMin.toString()}
            onChangeText={handleChangeTPSensorMin}
            keyboardType="numeric"
          />
          <Text style={styles.titleSettings}>TP voltage max (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPVoltageMax.toString()}
            onChangeText={handleChangeTPVoltageMax}
            keyboardType="numbers-and-punctuation"
          />
          <Text style={styles.titleSettings}>TP voltage min (V) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPVoltageMin.toString()}
            onChangeText={handleChangeTPVoltageMin}
            keyboardType="numbers-and-punctuation"
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
      </View>
      <Loading loading={loading} title={title} />
    </KeyboardAwareScrollView>
  );
};

export default SettingsTab;

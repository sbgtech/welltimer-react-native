import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
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
  // the loading state, default is false
  const [loading, setLoading] = useState(false);
  // title of loading modal
  const [title, setTitle] = useState("");
  // value of valve, default 0 (OFF)
  const [valveA, setValveA] = useState(0);
  // display the name of the productionMethod based on the received index
  const [productionMethodIndex, setProductionMethodIndex] = useState(null);
  const productionMethod = ["Timer mode", "Intermit mode", "Trigger mode"];
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
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure there is only one decimal point
      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setMissrunMax("");
        } else {
          setMissrunMax(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setMissrunMax("");
      }
    } else {
      setMissrunMax("");
    }
  };

  // handle change wellDepth value
  const handleChangeWellDepth = (text) => {
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure there is only one decimal point
      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setWellDepth("");
        } else {
          setWellDepth(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setWellDepth("");
      }
    } else {
      setWellDepth("");
    }
  };

  // handle change hiloHight value
  const handleChangeHiLoHigh = (text) => {
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure there is only one decimal point
      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setHiLoHigh("");
        } else {
          setHiLoHigh(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setHiLoHigh("");
      }
    } else {
      setHiLoHigh("");
    }
  };

  // handle change hiloLow value
  const handleChangeHiLoLow = (text) => {
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure there is only one decimal point
      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setHiLoLow("");
        } else {
          setHiLoLow(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setHiLoLow("");
      }
    } else {
      setHiLoLow("");
    }
  };

  // handle change LPSensorMax value
  const handleChangeLPSensorMax = (text) => {
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters

      // Ensure there is only one decimal point

      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setLPSensorMax("");
        } else {
          setLPSensorMax(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setLPSensorMax("");
      }
    } else {
      setLPSensorMax("");
    }
  };

  // handle change LPSensorMin value
  const handleChangeLPSensorMin = (text) => {
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters

      // Ensure there is only one decimal point

      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setLPSensorMin("");
        } else {
          setLPSensorMin(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setLPSensorMin("");
      }
    } else {
      setLPSensorMin("");
    }
  };

  // handle change LPVoltageMax value
  const handleChangeLPVoltageMax = (text) => {
    const MAX_VALUE = 100;
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
          Alert.alert("Warning", "The max value must be 100");
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
    const MAX_VALUE = 100;
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
          Alert.alert("Warning", "The max value must be 100");
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
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure there is only one decimal point
      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setCPSensorMax("");
        } else {
          setCPSensorMax(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setCPSensorMax("");
      }
    } else {
      setCPSensorMax("");
    }
  };

  // handle change CPSensorMin value
  const handleChangeCPSensorMin = (text) => {
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure there is only one decimal point
      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setCPSensorMin("");
        } else {
          setCPSensorMin(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setCPSensorMin("");
      }
    } else {
      setCPSensorMin("");
    }
  };

  // handle change CPVoltageMax value
  const handleChangeCPVoltageMax = (text) => {
    const MAX_VALUE = 100;
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
          Alert.alert("Warning", "The max value must be 100");
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
    const MAX_VALUE = 100;
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
          Alert.alert("Warning", "The max value must be 100");
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
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure there is only one decimal point
      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setTPSensorMax("");
        } else {
          setTPSensorMax(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setTPSensorMax("");
      }
    } else {
      setTPSensorMax("");
    }
  };

  // handle change TPSensorMin value
  const handleChangeTPSensorMin = (text) => {
    const MAX_VALUE = 65535;
    if (text) {
      const validText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      // Ensure there is only one decimal point
      const numericValue = parseFloat(validText);
      // Check if the number is within the range
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_VALUE) {
          Alert.alert("Warning", "The max value must be 65535");
          setTPSensorMin("");
        } else {
          setTPSensorMin(validText);
        }
      } else {
        // If the conversion failed, reset to empty or default value
        setTPSensorMin("");
      }
    } else {
      setTPSensorMin("");
    }
  };

  // handle change TPVoltageMax value
  const handleChangeTPVoltageMax = (text) => {
    const MAX_VALUE = 100;
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
          Alert.alert("Warning", "The max value must be 100");
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
    const MAX_VALUE = 100;
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
          Alert.alert("Warning", "The max value must be 100");
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
  };

  // send array of CP values to device
  const handleSendLP = async () => {
    try {
      const arr = JSON.stringify([
        3,
        100,
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
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
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
            keyboardType="numbers-and-punctuation"
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
            keyboardType="numbers-and-punctuation"
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
            keyboardType="numbers-and-punctuation"
          />
          <Text style={styles.titleSettings}>HiLo low Threshold :</Text>
          <TextInput
            style={styles.inputSettings}
            value={hiLoLow.toString()}
            onChangeText={handleChangeHiLoLow}
            keyboardType="numbers-and-punctuation"
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
            keyboardType="numbers-and-punctuation"
          />
          <Text style={styles.titleSettings}>LP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={LPSensorMin.toString()}
            onChangeText={handleChangeLPSensorMin}
            keyboardType="numbers-and-punctuation"
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
            keyboardType="numbers-and-punctuation"
          />
          <Text style={styles.titleSettings}>CP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={CPSensorMin.toString()}
            onChangeText={handleChangeCPSensorMin}
            keyboardType="numbers-and-punctuation"
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
            keyboardType="numbers-and-punctuation"
          />
          <Text style={styles.titleSettings}>TP Sensor min (PSI) :</Text>
          <TextInput
            style={styles.inputSettings}
            value={TPSensorMin.toString()}
            onChangeText={handleChangeTPSensorMin}
            keyboardType="numbers-and-punctuation"
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

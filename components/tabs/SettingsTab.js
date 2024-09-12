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
      const validText = text.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-decimal characters
      const decimalCount = (validText.match(/\./g) || []).length; // Count occurrences of decimal points
      // Ensure there is only one decimal point
      if (decimalCount <= 1) {
        const numericValue = parseFloat(validText);
        // Check if the number is within the range
        if (!isNaN(numericValue)) {
          if (numericValue > MAX_VALUE) {
            Alert.alert("Warning", "The max value must be 65535");
            setLPVoltageMax("");
          } else {
            setLPVoltageMax(validText);
          }
        } else {
          // If the conversion failed, reset to empty or default value
          setLPVoltageMax("");
        }
      } else {
        // For example, you might want to trim or notify the user
        setLPVoltageMax(validText.substring(0, validText.lastIndexOf(".")));
      }
    } else {
      setLPVoltageMax("");
    }
  };

  // handle change LPVoltageMin value
  const handleChangeLPVoltageMin = (text) => {
    const MAX_VALUE = 100;
    if (text) {
      const validText = text.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-decimal characters
      const decimalCount = (validText.match(/\./g) || []).length; // Count occurrences of decimal points
      // Ensure there is only one decimal point
      if (decimalCount <= 1) {
        const numericValue = parseFloat(validText);
        // Check if the number is within the range
        if (!isNaN(numericValue)) {
          if (numericValue > MAX_VALUE) {
            Alert.alert("Warning", "The max value must be 65535");
            setLPVoltageMin("");
          } else {
            setLPVoltageMin(validText);
          }
        } else {
          // If the conversion failed, reset to empty or default value
          setLPVoltageMin("");
        }
      } else {
        // For example, you might want to trim or notify the user
        setLPVoltageMin(validText.substring(0, validText.lastIndexOf(".")));
      }
    } else {
      setLPVoltageMin("");
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
      const validText = text.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-decimal characters
      const decimalCount = (validText.match(/\./g) || []).length; // Count occurrences of decimal points
      // Ensure there is only one decimal point
      if (decimalCount <= 1) {
        const numericValue = parseFloat(validText);
        // Check if the number is within the range
        if (!isNaN(numericValue)) {
          if (numericValue > MAX_VALUE) {
            Alert.alert("Warning", "The max value must be 65535");
            setCPVoltageMax("");
          } else {
            setCPVoltageMax(validText);
          }
        } else {
          // If the conversion failed, reset to empty or default value
          setCPVoltageMax("");
        }
      } else {
        // For example, you might want to trim or notify the user
        setCPVoltageMax(validText.substring(0, validText.lastIndexOf(".")));
      }
    } else {
      setCPVoltageMax("");
    }
  };

  // handle change CPVoltageMin value
  const handleChangeCPVoltageMin = (text) => {
    const MAX_VALUE = 100;
    if (text) {
      const validText = text.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-decimal characters
      const decimalCount = (validText.match(/\./g) || []).length; // Count occurrences of decimal points
      // Ensure there is only one decimal point
      if (decimalCount <= 1) {
        const numericValue = parseFloat(validText);
        // Check if the number is within the range
        if (!isNaN(numericValue)) {
          if (numericValue > MAX_VALUE) {
            Alert.alert("Warning", "The max value must be 65535");
            setCPVoltageMin("");
          } else {
            setCPVoltageMin(validText);
          }
        } else {
          // If the conversion failed, reset to empty or default value
          setCPVoltageMin("");
        }
      } else {
        // For example, you might want to trim or notify the user
        setCPVoltageMin(validText.substring(0, validText.lastIndexOf(".")));
      }
    } else {
      setCPVoltageMin("");
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
      const validText = text.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-decimal characters
      const decimalCount = (validText.match(/\./g) || []).length; // Count occurrences of decimal points
      // Ensure there is only one decimal point
      if (decimalCount <= 1) {
        const numericValue = parseFloat(validText);
        // Check if the number is within the range
        if (!isNaN(numericValue)) {
          if (numericValue > MAX_VALUE) {
            Alert.alert("Warning", "The max value must be 65535");
            setTPVoltageMax("");
          } else {
            setTPVoltageMax(validText);
          }
        } else {
          // If the conversion failed, reset to empty or default value
          setTPVoltageMax("");
        }
      } else {
        // For example, you might want to trim or notify the user
        setTPVoltageMax(validText.substring(0, validText.lastIndexOf(".")));
      }
    } else {
      setTPVoltageMax("");
    }
  };

  // handle change TPVoltageMin value
  const handleChangeTPVoltageMin = (text) => {
    const MAX_VALUE = 100;
    if (text) {
      const validText = text.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-decimal characters
      const decimalCount = (validText.match(/\./g) || []).length; // Count occurrences of decimal points
      // Ensure there is only one decimal point
      if (decimalCount <= 1) {
        const numericValue = parseFloat(validText);
        // Check if the number is within the range
        if (!isNaN(numericValue)) {
          if (numericValue > MAX_VALUE) {
            Alert.alert("Warning", "The max value must be 65535");
            setTPVoltageMin("");
          } else {
            setTPVoltageMin(validText);
          }
        } else {
          // If the conversion failed, reset to empty or default value
          setTPVoltageMin("");
        }
      } else {
        // For example, you might want to trim or notify the user
        setTPVoltageMin(validText.substring(0, validText.lastIndexOf(".")));
      }
    } else {
      setTPVoltageMin("");
    }
  };

  // send array of prod method, missrun max, false arrivals and well depth values to device with their addresses
  const handleSendFirstBloc = async () => {
    try {
      const arr = JSON.stringify([
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
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, {
        setLoading,
        setTitle,
      });
      await onRefresh();
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
        122,
        hiLoModeIndex,
        123,
        Number(hiLoHigh),
        124,
        Number(hiLoLow),
      ]);
      console.log(arr);
      const buffer = Buffer.from(arr + "\n", "utf-8");
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, {
        setLoading,
        setTitle,
      });
      await onRefresh();
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
      console.log(LPVoltageMax);
      console.log(Number(LPVoltageMax * 10));
      const arr = JSON.stringify([
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
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, {
        setLoading,
        setTitle,
      });
      onRefresh();
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
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, {
        setLoading,
        setTitle,
      });
      await onRefresh();
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
      props.connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      await Receive.ACKReceivedData(props.connectedDevice, {
        setLoading,
        setTitle,
      });
      await onRefresh();
    } catch (error) {
      console.log(
        "Error with writeCharacteristicWithResponseForService :",
        error
      );
    }
  };

  // function called in useEffect when load component to fetch data
  const fetchData = async () => {
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
      console.error("Error in useEffect:", error);
    }
  };

  // Initial load, call fetchData function with the corresponding data
  useEffect(() => {
    // fetcha data if the device is connected
    if (props.connectedDevice) {
      const cleanup = fetchData();
      return () => cleanup; // Clean up subscription on component unmount or when device changes
    }
  }, [props.connectedDevice]);

  // function run when clicking on refresh button
  const onRefresh = async () => {
    try {
      // call function to send request to device to get data
      await Receive.sendReqToGetData(props.connectedDevice, 2);
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
      <RefreshBtn onPress={() => onRefresh()} />
      <Valve
        connectedDevice={props.connectedDevice}
        setLoading={setLoading}
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

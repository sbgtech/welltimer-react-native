import {
  UART_SERVICE_UUID,
  UART_RX_CHARACTERISTIC_UUID,
  UART_TX_CHARACTERISTIC_UUID,
} from "./Constants";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";

export class Receive {
  static async SensorsReceivedData(device, setters) {
    const {
      setPlungerStateIndex,
      setSystemClock,
      setLine,
      setTubing,
      setCasing,
      setArrivals,
      setUniqueID,
      setFwVersion,
      setBattery,
      setLoading,
    } = setters;
    let dataReceived = false; // Flag to track if data is received

    return new Promise((resolve, reject) => {
      // Set loading to true at the start
      setLoading(true);

      // Set a timeout for the operation
      const timeout = setTimeout(() => {
        if (!dataReceived) {
          console.log("Data not received within 5 seconds timer");
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "No received data",
            visibilityTime: 3000,
          });
        }
        reject({ received: false });
      }, 5000);

      // Monitor characteristic for service
      const subscription = device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            clearTimeout(timeout); // Clear timeout on error
            console.log("Characteristic monitoring error:", error);
            setLoading(false);
            reject(error); // Reject the promise
            return;
          }
          //   // Check if data is received
          const str = Buffer.from(characteristic.value, "base64").toString(
            "utf-8"
          );
          console.log("Received data from well status tab :", str);
          const firstIndexValue = str.charAt(0); // Getting the character at index 0
          const pageIndex = str.charAt(1); // Getting the character at index 0
          const lastIndexValue = str[str.length - 2]; // Accessing the last character
          if (
            firstIndexValue == "[" &&
            lastIndexValue == "]" &&
            Number(pageIndex) == 1
          ) {
            const msg = JSON.parse(str);
            setPlungerStateIndex(msg[1]); // get two bytes for plunger state
            setSystemClock(msg[2]); // set value to system clock
            setLine(msg[3]); // set value to line
            setTubing(msg[4]); // set value to tubing
            setCasing(msg[5]); // set value to casing
            const arr1 = msg[6];
            const arr2 = msg[7];
            const arr3 = msg[8];
            const arr4 = msg[9];
            const arr5 = msg[10];
            const arr6 = msg[11];
            const arr7 = msg[12];
            const arr8 = msg[13];
            const arr9 = msg[14];
            const arr10 = msg[15];
            const arr11 = msg[16];
            const arr12 = msg[17];
            const arr13 = msg[18];
            const arr14 = msg[19];
            const arr15 = msg[20];
            const arr16 = msg[21];
            const arr17 = msg[22];
            const arr18 = msg[23];
            const arr19 = msg[24];
            const arr20 = msg[25];
            setArrivals([
              { name: "Arrival 1", value: arr1 },
              { name: "Arrival 2", value: arr2 },
              { name: "Arrival 3", value: arr3 },
              { name: "Arrival 4", value: arr4 },
              { name: "Arrival 5", value: arr5 },
              { name: "Arrival 6", value: arr6 },
              { name: "Arrival 7", value: arr7 },
              { name: "Arrival 8", value: arr8 },
              { name: "Arrival 9", value: arr9 },
              { name: "Arrival 10", value: arr10 },
              { name: "Arrival 11", value: arr11 },
              { name: "Arrival 12", value: arr12 },
              { name: "Arrival 13", value: arr13 },
              { name: "Arrival 14", value: arr14 },
              { name: "Arrival 15", value: arr15 },
              { name: "Arrival 16", value: arr16 },
              { name: "Arrival 17", value: arr17 },
              { name: "Arrival 18", value: arr18 },
              { name: "Arrival 19", value: arr19 },
              { name: "Arrival 20", value: arr20 },
            ]);
            setFwVersion(msg[26]);
            setBattery(msg[27]);
            dataReceived = true; // Mark data as received
            clearTimeout(timeout); // Clear timeout once data is received
            setLoading(false); // Set loading to false
            resolve(true); // Resolve the promise
          }
          if (
            firstIndexValue == "[" &&
            lastIndexValue == "]" &&
            Number(pageIndex) == 5
          ) {
            const jsonString = str.replace(/'/g, '"');
            const msg = JSON.parse(jsonString);
            setUniqueID(msg[1]);
          }
        }
      );
      // Return a function to clean up the subscription
      return () => {
        subscription.remove();
        clearTimeout(timeout);
      };
    }).catch(() => {
      console.log("Error receiving data from device");
      return false; // Return false in case of error
    });
  }

  static async TimerReceivedData(device, setters) {
    const {
      setReceivedOpenTimer,
      setReceivedShutinTimer,
      setReceivedAfterflowTimer,
      setReceivedMandatoryTimer,
      setLoading,
    } = setters;
    let received = false;
    return new Promise((resolve, reject) => {
      setLoading(true);
      const timeout = setTimeout(() => {
        if (!received) {
          console.log("Data not received within 5 seconds timer");
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "No received data",
            visibilityTime: 3000,
          });
        }
        reject({ received: false });
      }, 5000);
      const subscription = device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          clearTimeout(timeout);
          if (error) {
            console.log(error);
            reject(error);
            return;
          }
          const str = Buffer.from(characteristic.value, "base64").toString(
            "utf-8"
          );
          console.log("Received data from timer tab :", str);
          const firstIndexValue = str.charAt(0); // Getting the character at index 0
          const pageIndex = str.charAt(1); // Getting the character at index 0
          const lastIndexValue = str[str.length - 2]; // Accessing the last character
          if (
            firstIndexValue == "[" &&
            lastIndexValue == "]" &&
            Number(pageIndex) == 2
          ) {
            const msg = JSON.parse(str);
            setReceivedOpenTimer(msg[1]);
            setReceivedShutinTimer(msg[2]);
            setReceivedAfterflowTimer(msg[3]);
            setReceivedMandatoryTimer(msg[4]);
            setLoading(false);
            received = true;
            resolve(received);
          }
        }
      );
      // Return a function to clean up the subscription
      return () => {
        subscription.remove();
        clearTimeout(timeout);
      };
    }).catch(() => {
      console.log("Error receiving data from device");
      return false; // Return false in case of error
    });
  }

  static async SettingsReceivedData(device, setters) {
    const {
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
    } = setters;
    let received = false;
    return new Promise((resolve, reject) => {
      setLoading(true);
      const timeout = setTimeout(() => {
        if (!received) {
          console.log("Data not received within 5 seconds settings");
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "No received data",
            visibilityTime: 3000,
          });
        }
        reject({ received: false });
      }, 5000);
      const subscription = device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          clearTimeout(timeout);
          if (error) {
            console.log(error);
            reject(error);
            return;
          }
          const str = Buffer.from(characteristic.value, "base64").toString(
            "utf-8"
          );
          console.log("Received data from settings tab :", str);
          const firstIndexValue = str.charAt(0); // Getting the character at index 0
          const pageIndex = str.charAt(1); // Getting the character at index 0
          const lastIndexValue = str[str.length - 2]; // Accessing the last character
          if (
            firstIndexValue == "[" &&
            lastIndexValue == "]" &&
            Number(pageIndex) == 3
          ) {
            const msg = JSON.parse(str);
            //
            setValveA(msg[1]);
            //
            setProductionMethodIndex(msg[2]);
            setMissrunMax(msg[3]);
            setFalseArrivalsIndex(msg[4]);
            setWellDepth(msg[5]);
            //
            setHiLoModeIndex(msg[6]);
            setHiLoHigh(msg[7]);
            setHiLoLow(msg[8]);
            //
            setLPTypeIndex(msg[9]);
            setLPSensorMax(msg[10]);
            setLPSensorMin(msg[11]);
            setLPVoltageMax(msg[12] / 10);
            setLPVoltageMin(msg[13] / 10);
            //
            setCPTypeIndex(msg[14]);
            setCPSensorMax(msg[15]);
            setCPSensorMin(msg[16]);
            setCPVoltageMax(msg[17] / 10);
            setCPVoltageMin(msg[18] / 10);
            //
            setTPTypeIndex(msg[19]);
            setTPSensorMax(msg[20]);
            setTPSensorMin(msg[21]);
            setTPVoltageMax(msg[22] / 10);
            setTPVoltageMin(msg[23] / 10);
            //
            setLoading(false);
            received = true;
            resolve(received);
          }
        }
      );
      // Return a function to clean up the subscription
      return () => {
        subscription.remove();
        clearTimeout(timeout);
      };
    }).catch(() => {
      console.log("Error receiving data from device");
      return false; // Return false in case of error
    });
  }

  static async TestReceivedData(device, setters) {
    const { setDataArray, setLoading, setDataReceived } = setters;
    try {
      const subscription = device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.log(error);
            return;
          }
          const msg = Buffer.from(characteristic.value, "base64").toString(
            "utf-8"
          );
          console.log("Received data from test tab :", msg);
          if (msg !== "ACK\n") {
            setDataArray((prevArray) => [
              ...prevArray,
              { date: Date.now(), data: msg, type: "RX" },
            ]);
            setLoading(false);
            setDataReceived(true); // Update dataReceived state
          }
        }
      );
      // Return a function to clean up the subscription
      return () => {
        subscription.remove();
        clearTimeout(timeout);
      };
    } catch (error) {
      console.log("No receiving data from device");
      return false;
    }
  }

  static convertToHMS = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    let remainingSecondsAfterHours = totalSeconds % 3600;
    let minutes = Math.floor(remainingSecondsAfterHours / 60);
    let seconds = remainingSecondsAfterHours % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return { formattedHours, formattedMinutes, formattedSeconds };
  };

  // function for sending data
  static sendReqToGetData = (connectedDevice, activeTab) => {
    try {
      const data = "0x0" + (activeTab + 1) + " \n";
      const buffer = Buffer.from(data, "utf-8");
      connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      console.log("req sent : ", data);
    } catch (error) {
      console.log("Error to sent request for receiving data.");
    }
  };

  static async ACKReceivedData(device, setters) {
    const { setLoading } = setters;
    let sent = false;
    return new Promise((resolve, reject) => {
      setLoading(true);
      const timeout = setTimeout(() => {
        if (!sent) {
          console.log("Error to send data");
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "Error to send data",
            visibilityTime: 3000,
          });
        }
        reject({ sent: false });
      }, 20000);
      const subscription = device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          clearTimeout(timeout);
          if (error) {
            console.log(error);
            reject(error);
            return;
          }
          const msg = Buffer.from(characteristic.value, "base64").toString(
            "utf-8"
          );
          if (msg === "ACK\n") {
            setLoading(false);
            sent = true;
            resolve(sent);
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "Data sent successfully",
              visibilityTime: 3000,
            });
          }
        }
      );
      // Return a function to clean up the subscription
      return () => {
        subscription.remove();
        clearTimeout(timeout);
      };
    }).catch(() => {
      console.log("Error receiving ACK");
      return false; // Return false in case of error
    });
  }
}

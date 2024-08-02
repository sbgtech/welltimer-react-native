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
          const msg = Buffer.from(characteristic.value, "base64");
          //   // Step 1: Convert ASCII codes to characters to form a string
          //   let hexString = buffer.toString("ascii").trim();
          //   // Step 2: Remove non-hexadecimal characters
          //   hexString = hexString.replace(/[^0-9a-fA-F]/g, "");
          //   // Step 3: Convert the cleaned hexadecimal string to a list of integers
          //   const msg = [];
          //   for (let i = 0; i < hexString.length - 2; i += 2) {
          //     msg.push(parseInt(hexString.substr(i, 2), 16));
          //   }
          //   console.log("Received data from well status tab1 :", buffer);
          console.log("Received data from well status tab :", msg);

          if (msg[0] === 123 && msg[msg.length - 2] === 125 && msg[1] === 1) {
            // Ensure data is processed only once
            console.log("Data received successfully");
            setPlungerStateIndex(msg[2] * 256 + msg[3]); // get two bytes for plunger state
            setSystemClock(msg[4] * 256 + msg[5]); // set value to system clock
            setLine(msg[6] * 256 + msg[7]); // set value to line
            setTubing(msg[8] * 256 + msg[9]); // set value to tubing
            setCasing(msg[10] * 256 + msg[11]); // set value to casing
            const arr1 = msg[12] * 256 + msg[13];
            const arr2 = msg[14] * 256 + msg[15];
            const arr3 = msg[16] * 256 + msg[17];
            const arr4 = msg[18] * 256 + msg[19];
            const arr5 = msg[20] * 256 + msg[21];
            const arr6 = msg[22] * 256 + msg[23];
            const arr7 = msg[24] * 256 + msg[25];
            const arr8 = msg[26] * 256 + msg[27];
            const arr9 = msg[28] * 256 + msg[29];
            const arr10 = msg[30] * 256 + msg[31];
            const arr11 = msg[32] * 256 + msg[33];
            const arr12 = msg[34] * 256 + msg[35];
            const arr13 = msg[36] * 256 + msg[37];
            const arr14 = msg[38] * 256 + msg[39];
            const arr15 = msg[40] * 256 + msg[41];
            const arr16 = msg[42] * 256 + msg[43];
            const arr17 = msg[44] * 256 + msg[45];
            const arr18 = msg[46] * 256 + msg[47];
            const arr19 = msg[48] * 256 + msg[49];
            const arr20 = msg[50] * 256 + msg[51];
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
            setFwVersion(msg[52] * 256 + msg[53]);
            setBattery(msg[54] * 256 + msg[55]);
            dataReceived = true; // Mark data as received
            clearTimeout(timeout); // Clear timeout once data is received
            setLoading(false); // Set loading to false
            resolve(true); // Resolve the promise
          }
          if (msg[0] === 123 && msg[msg.length - 2] === 125 && msg[1] === 5) {
            setUniqueID(msg.slice(2, 19).toString());
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
          const msg = Buffer.from(characteristic.value, "base64");
          //   // Step 1: Convert ASCII codes to characters to form a string
          //   let hexString = buffer.toString("ascii").trim();
          //   // Step 2: Remove non-hexadecimal characters
          //   hexString = hexString.replace(/[^0-9a-fA-F]/g, "");
          //   // Step 3: Convert the cleaned hexadecimal string to a list of integers
          //   const msg = [];
          //   for (let i = 0; i < hexString.length - 2; i += 2) {
          //     msg.push(parseInt(hexString.substr(i, 2), 16));
          //   }
          //   console.log("Received data from timer tab1 :", buffer);
          console.log("Received data from timer tab :", msg);
          if (msg[0] == 123 && msg[msg.length - 2] == 125 && msg[1] == 2) {
            setReceivedOpenTimer(msg[2] * 256 + msg[3]);
            setReceivedShutinTimer(msg[4] * 256 + msg[5]);
            setReceivedAfterflowTimer(msg[6] * 256 + msg[7]);
            setReceivedMandatoryTimer(msg[8] * 256 + msg[9]);
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
          const msg = Buffer.from(characteristic.value, "base64");
          //   // Step 1: Convert ASCII codes to characters to form a string
          //   let hexString = buffer.toString("ascii").trim();
          //   // Step 2: Remove non-hexadecimal characters
          //   hexString = hexString.replace(/[^0-9a-fA-F]/g, "");
          //   // Step 3: Convert the cleaned hexadecimal string to a list of integers
          //   const msg = [];
          //   for (let i = 0; i < hexString.length - 2; i += 2) {
          //     msg.push(parseInt(hexString.substr(i, 2), 16));
          //   }
          //   console.log("Received data from settings tab1 :", buffer);
          console.log("Received data from settings tab :", msg);
          if (msg[0] == 123 && msg[msg.length - 2] == 125 && msg[1] == 3) {
            //
            setValveA(msg[2] * 256 + msg[3]);
            //
            setProductionMethodIndex(msg[4] * 256 + msg[5]);
            setMissrunMax(msg[6] * 256 + msg[7]);
            setFalseArrivalsIndex(msg[8] * 256 + msg[9]);
            setWellDepth(msg[10] * 256 + msg[11]);
            //
            setHiLoModeIndex(msg[12] * 256 + msg[13]);
            setHiLoHigh(msg[14] * 256 + msg[15]);
            setHiLoLow(msg[16] * 256 + msg[17]);
            //
            setLPTypeIndex(msg[18] * 256 + msg[19]);
            setLPSensorMax(msg[20] * 256 + msg[21]);
            setLPSensorMin(msg[22] * 256 + msg[23]);
            setLPVoltageMax(msg[24] * 256 + msg[25]);
            setLPVoltageMin(msg[26] * 256 + msg[27]);
            //
            setCPTypeIndex(msg[28] * 256 + msg[29]);
            setCPSensorMax(msg[30] * 256 + msg[31]);
            setCPSensorMin(msg[32] * 256 + msg[33]);
            setCPVoltageMax(msg[34] * 256 + msg[35]);
            setCPVoltageMin(msg[36] * 256 + msg[37]);
            //
            setTPTypeIndex(msg[38] * 256 + msg[39]);
            setTPSensorMax(msg[40] * 256 + msg[41]);
            setTPSensorMin(msg[42] * 256 + msg[43]);
            setTPVoltageMax(msg[45] * 256 + msg[46]);
            setTPVoltageMin(msg[47] * 256 + msg[48]);
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
          setDataArray((prevArray) => [
            ...prevArray,
            { date: Date.now(), data: msg, type: "RX" },
          ]);
          setLoading(false);
          setDataReceived(true); // Update dataReceived state
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
    return { hours, minutes, seconds };
  };

  // function for sending data
  static sendReqToGetData = (connectedDevice, activeTab) => {
    const data = "0x0" + (activeTab + 1) + " \n";
    const buffer = Buffer.from(data, "utf-8");
    connectedDevice?.writeCharacteristicWithResponseForService(
      UART_SERVICE_UUID,
      UART_TX_CHARACTERISTIC_UUID,
      buffer.toString("base64")
    );
    console.log("req sent : ", data);
  };
}

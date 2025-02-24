import {
  UART_SERVICE_UUID,
  UART_RX_CHARACTERISTIC_UUID,
  UART_TX_CHARACTERISTIC_UUID,
} from "./Constants";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";

export class Receive {
  // function listen to receive wellName
  static async ReceiveWellName(device, setWellName) {
    // Monitor characteristic for service
    const subscription = device?.monitorCharacteristicForService(
      UART_SERVICE_UUID,
      UART_RX_CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.log("Characteristic monitoring error:", error);
          return;
        }
        // Check if data is received
        const str = Buffer.from(characteristic.value, "base64").toString(
          "utf-8"
        );
        if (str.includes("wellname")) {
          let result = str.split(" ").slice(1).join(" ").trim();
          setWellName(result);
        }
      }
    );
    // Return a function to clean up the subscription
    return () => {
      subscription.remove();
    };
  }

  // function listen to receive data for well status page
  static async WellStatusReceivedData(device, setters) {
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
      setTitle,
    } = setters;
    let dataReceived = false; // Flag to track if data is received

    return new Promise((resolve, reject) => {
      // Set loading to true at the start
      setLoading(true);
      setTitle("Loading...");
      // Set a timeout for the operation
      const timeout = setTimeout(() => {
        if (!dataReceived) {
          console.log("Data not received within 7 seconds in well status");
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "No received data",
            visibilityTime: 3000,
          });
        }
        reject({ received: false });
      }, 7000);

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
          // Check if data is received
          const str = Buffer.from(characteristic.value, "base64").toString(
            "utf-8"
          );
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
            const arrivals = msg.slice(6, 26).map((value, index) => ({
              name: `Arrival ${index + 1}`,
              value,
            }));
            setArrivals(arrivals);
            setFwVersion(parseFloat([msg[26]]) / 10 + "." + Number([msg[27]]));
            setBattery(msg[28]);
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

  // function listen to receive data for timer page
  static async TimerReceivedData(device, setters) {
    const {
      setReceivedOpenTimer,
      setReceivedShutinTimer,
      setReceivedAfterflowTimer,
      setReceivedMandatoryTimer,
      setLoading,
      setTitle,
    } = setters;
    let received = false;
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTitle("Loading...");
      const timeout = setTimeout(() => {
        if (!received) {
          console.log("Data not received within 7 seconds timer");
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "No received data",
            visibilityTime: 3000,
          });
        }
        reject({ received: false });
      }, 7000);
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

  // function listen to receive data for settings page
  static async SettingsReceivedData(device, setters) {
    const {
      setValveA,
      setValveB,
      setProductionMethodIndex,
      setMissrunMax,
      setFalseArrivalsIndex,
      setWellDepth,
      setHiLoModeIndex,
      setHiLoHigh,
      setHiLoLow,
      setHiLoDelay,
      setPidOverrideIndex,
      setPidSP,
      setPidKP,
      setPidKI,
      setPidKD,
      setPidINIT,
      setPidDB,
      setPidLL,
      setAutocatcherIndex,
      setAutocatcherDelay,
      setBValveTwinIndex,
      setReceivedPressureSourceIndex,
      setReceivedPressureMaxPSI,
      setReceivedPressureMinPSI,
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
    } = setters;
    let received = false;
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      setTitle("Loading...");
      const timeout = setTimeout(() => {
        if (!received) {
          console.log("Data not received within 7 seconds settings");
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "No received data",
            visibilityTime: 3000,
          });
        }
        reject({ received: false });
      }, 7000);
      const subscription = await device?.monitorCharacteristicForService(
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
            setValveB(msg[35]);
            //
            setProductionMethodIndex(msg[2]);
            setMissrunMax(msg[3]);
            setFalseArrivalsIndex(msg[4]);
            setWellDepth(msg[5]);
            //
            setHiLoModeIndex(msg[6]);
            setHiLoHigh(msg[7]);
            setHiLoLow(msg[8]);
            setHiLoDelay(msg[39]);
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
            setPidOverrideIndex(msg[24]);
            setPidSP(msg[25]);
            setPidKP(msg[26]);
            setPidKI(msg[27]);
            setPidKD(msg[28]);
            setPidINIT(msg[29]);
            setPidDB(msg[30]);
            setPidLL(msg[31]);
            //
            setAutocatcherIndex(msg[32]);
            setAutocatcherDelay(msg[33]);
            //
            setBValveTwinIndex(msg[34]);
            //
            setReceivedPressureSourceIndex(msg[36]);
            setReceivedPressureMaxPSI(msg[37]);
            setReceivedPressureMinPSI(msg[38]);
            //
            setLoading(false);
            received = true;
            resolve(received);
          }
        }
      );
      // Return a function to clean up the subscription
      return () => {
        subscription.remove(); // unsubscribes from the characteristic updates
        clearTimeout(timeout);
      };
    }).catch(() => {
      console.log("Error receiving data from device");
      return false; // Return false in case of error
    });
  }

  // function listen to receive data for settings page
  static async StatisticsReceivedData(device, setters) {
    const {
      setArrivalsToday,
      setArrivalsWeek,
      setArrivalsTotal,
      setMissrunToday,
      setMissrunWeek,
      setMissrunTotal,
      setOnTimeToday,
      setOnTimeWeek,
      setOnTimeTotal,
      setLoading,
      setTitle,
    } = setters;
    let received = false;
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTitle("Loading...");
      const timeout = setTimeout(() => {
        if (!received) {
          console.log("Data not received within 7 seconds settings");
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Warning",
            text2: "No received data",
            visibilityTime: 3000,
          });
        }
        reject({ received: false });
      }, 7000);
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
          const firstIndexValue = str.charAt(0); // Getting the character at index 0
          const pageIndex = str.charAt(1); // Getting the character at index 0
          const lastIndexValue = str[str.length - 2]; // Accessing the last character
          if (
            firstIndexValue == "[" &&
            lastIndexValue == "]" &&
            Number(pageIndex) == 4
          ) {
            const msg = JSON.parse(str);
            setArrivalsToday(msg[1]);
            setArrivalsWeek(msg[2]);
            setArrivalsTotal(msg[3]);
            setMissrunToday(msg[4]);
            setMissrunWeek(msg[5]);
            setMissrunTotal(msg[6]);
            setOnTimeToday(msg[7]);
            setOnTimeWeek(msg[8]);
            setOnTimeTotal(msg[9]);
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

  // function listen to receive data for test page
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
          // if (msg !== "NACK\n") {
          setDataArray((prevArray) => [
            ...prevArray,
            { date: Date.now(), data: msg, type: "RX" },
          ]);
          setLoading(false);
          setDataReceived(true); // Update dataReceived state
          // }
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

  // function get total seconds in input and return converted time in HH:MM:SS format
  static convertToHMS = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    let remainingSecondsAfterHours = totalSeconds % 3600;
    let minutes = Math.floor(remainingSecondsAfterHours / 60);
    let seconds = remainingSecondsAfterHours % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
  };

  static convertTimersToHMS = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    let remainingSecondsAfterHours = totalSeconds % 3600;
    let minutes = Math.floor(remainingSecondsAfterHours / 60);
    let seconds = remainingSecondsAfterHours % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return { formattedHours, formattedMinutes, formattedSeconds };
  };

  // function for sending data to device (called it into each page)
  static async sendReqToGetData(connectedDevice, activeTab) {
    try {
      const data = "0x0" + (activeTab + 1) + " \n";
      const buffer = Buffer.from(data, "utf-8");
      await connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
    } catch (error) {
      console.log("Error to sent request for receiving data.");
    }
  }

  // function for sending device id and phone type (android or ios)
  static async sendIden(connectedDevice, id) {
    try {
      let data = "";
      if (Platform.OS === "android") {
        data = `BLEID:${id},TYPE:ANDROID \n`;
      } else {
        data = `BLEID:${id},TYPE:IOS \n`;
      }
      const buffer = Buffer.from(data, "utf-8");
      await connectedDevice?.writeCharacteristicWithResponseForService(
        UART_SERVICE_UUID,
        UART_TX_CHARACTERISTIC_UUID,
        buffer.toString("base64")
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // function listen to receive "ACK" from device to stop loading and show "successfully sent", else show "Error to sent data" and the time given for waiting response to stop loading is 20 seconds.
  // static async ACKReceivedData(device, setters) {
  //   const { setLoading, setTitle } = setters;
  //   let sent = false;
  //   return new Promise(async (resolve, reject) => {
  //     setLoading(true);
  //     setTitle("Sending...");
  //     const timeout = setTimeout(() => {
  //       if (!sent) {
  //         console.log("Error to send data");
  //         setLoading(false);
  //         Toast.show({
  //           type: "error",
  //           text1: "Warning",
  //           text2: "Error to send data",
  //           visibilityTime: 3000,
  //         });
  //       }
  //       reject({ sent: false });
  //     }, 20000);
  //     const subscription = await device?.monitorCharacteristicForService(
  //       UART_SERVICE_UUID,
  //       UART_RX_CHARACTERISTIC_UUID,
  //       (error, characteristic) => {
  //         clearTimeout(timeout);
  //         if (error) {
  //           console.log(error);
  //           setLoading(false);
  //           reject(error);
  //           return;
  //         }
  //         const msg = Buffer.from(characteristic.value, "base64").toString(
  //           "utf-8"
  //         );
  //         if (msg === "ACK\n") {
  //           setLoading(false);
  //           sent = true;
  //           resolve(sent);
  //           Toast.show({
  //             type: "success",
  //             text1: "Success",
  //             text2: "Data sent successfully",
  //             visibilityTime: 3000,
  //           });
  //         }
  //       }
  //     );
  //     // Return a function to clean up the subscription
  //     return () => {
  //       setLoading(false);
  //       subscription.remove();
  //       clearTimeout(timeout);
  //     };
  //   }).catch(() => {
  //     console.log("Error receiving ACK");
  //     return false; // Return false in case of error
  //   });
  // }
}

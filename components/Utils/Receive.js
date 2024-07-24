import { UART_SERVICE_UUID, UART_RX_CHARACTERISTIC_UUID } from "./Constants";
import { Buffer } from "buffer";
import Toast from "react-native-toast-message";

export class Receive {
  static async SensorsReceivedData(device, setters) {
    const { setLoading } = setters;
    let received = false;
    const testMode = false;
    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (!received) {
            console.log("Data not received within 5 seconds");
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
        device?.monitorCharacteristicForService(
          UART_SERVICE_UUID,
          UART_RX_CHARACTERISTIC_UUID,
          (error, characteristic) => {
            clearTimeout(timeout); // Clear the timeout once data is received
            if (error) {
              console.error(error);
              reject(error);
              return;
            }
            const msg = Buffer.from(characteristic.value, "base64");
            console.log("Received data from sensors tab :", msg);
            if (
              msg[0] == 123 &&
              msg[msg.length - 2] == 125 &&
              msg[1] == 1 &&
              !testMode
            ) {
              console.log("d5el");
              setLoading(false);
              received = true;
              resolve(received);
            }
          }
        );
      });
    } catch (error) {
      console.log("No receiving data from device");
      return false;
    }
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
    const testMode = false;
    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (!received) {
            console.log("Data not received within 5 seconds");
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
        device?.monitorCharacteristicForService(
          UART_SERVICE_UUID,
          UART_RX_CHARACTERISTIC_UUID,
          (error, characteristic) => {
            clearTimeout(timeout);
            if (error) {
              console.error(error);
              reject(error);
              return;
            }
            const msg = Buffer.from(characteristic.value, "base64");
            console.log("Received data from timer tab :", msg);
            if (
              msg[0] == 123 &&
              msg[msg.length - 2] == 125 &&
              msg[1] == 2 &&
              !testMode
            ) {
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
      });
    } catch (error) {
      console.log("No receiving data from device");
      return false;
    }
  }

  static async SettingsReceivedData(device, setters) {
    const { setMissrunMax, setLoading } = setters;
    let received = false;
    const testMode = false;
    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (!received) {
            console.log("Data not received within 5 seconds");
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
        device?.monitorCharacteristicForService(
          UART_SERVICE_UUID,
          UART_RX_CHARACTERISTIC_UUID,
          (error, characteristic) => {
            clearTimeout(timeout);
            if (error) {
              console.error(error);
              reject(error);
              return;
            }
            const msg = Buffer.from(characteristic.value, "base64");
            received = true;
            console.log("Received data from settings tab :", msg);
            if (
              msg[0] == 123 &&
              msg[msg.length - 2] == 125 &&
              msg[1] == 3 &&
              !testMode
            ) {
              setMissrunMax(msg[4] * 256 + msg[5]);
              setLoading(false);
              received = true;
              resolve(received);
            }
          }
        );
      });
    } catch (error) {
      console.log("No receiving data from device");
      return false;
    }
  }

  static async TestReceivedData(device, setters) {
    const { setDataArray, setLoading, setDataReceived } = setters;
    const testMode = true;
    try {
      device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error(error);
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
    } catch (error) {
      console.log("No receiving data from device");
      return false;
    }
  }
}

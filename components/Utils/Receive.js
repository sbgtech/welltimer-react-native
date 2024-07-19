import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from "./Constants";
import { Buffer } from "buffer";

export class Receive {
  static TimerReceivedData(device, setters) {
    const {
      setReceivedOpenTimer,
      setReceivedShutinTimer,
      setReceivedAfterflowTimer,
      setReceivedMandatoryTimer,
      setLoading,
    } = setters;
    try {
      device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error(error);
            return false;
          }
          const msg = Buffer.from(characteristic.value, "base64");
          console.log("Received data from timer tab :", msg);
          if (msg[0] == 123 && msg[msg.length - 2] == 125 && msg[1] == 2) {
            setReceivedOpenTimer(msg[2] * 256 + msg[3]);
            setReceivedShutinTimer(msg[4] * 256 + msg[5]);
            setReceivedAfterflowTimer(msg[6] * 256 + msg[7]);
            setReceivedMandatoryTimer(msg[8] * 256 + msg[9]);
            setLoading(false);
          }
          return true;
        }
      );
    } catch (error) {
      console.error("Error receiving data from device:", error.message);
      return false;
    }
  }
  static SettingsReceivedData(device, setters) {
    const { setMissrunMax, setLoading } = setters;
    try {
      device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error(error);
            return false;
          }
          const msg = Buffer.from(characteristic.value, "base64");
          console.log("Received data from settings tab :", msg);
          if (msg[0] == 123 && msg[msg.length - 2] == 125 && msg[1] == 3) {
            setMissrunMax(msg[4] * 256 + msg[5]);
            setLoading(false);
          }
          return true;
        }
      );
    } catch (error) {
      console.error("Error receiving data from device:", error.message);
      return false;
    }
  }

  static TestReceivedData(device, setters) {
    const { setDataArray, setLoading } = setters;
    try {
      device?.monitorCharacteristicForService(
        UART_SERVICE_UUID,
        UART_RX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error(error);
            return false;
          }
          const msg = Buffer.from(characteristic.value, "base64").toString(
            "utf-8"
          );
          console.log("Received data from test tab :", msg);
          //   if (msg[0] == 123 && msg[msg.length - 2] == 125 && msg[1] == 3) {
          //     setMissrunMax(msg[4] * 256 + msg[5]);
          setLoading(false);
          setDataArray((prevArray) => [
            ...prevArray,
            { date: Date.now(), data: msg, type: "RX" },
          ]);
          //   }
          return true;
        }
      );
    } catch (error) {
      console.error("Error receiving data from device:", error.message);
      return false;
    }
  }
}

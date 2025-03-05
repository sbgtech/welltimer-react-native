import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import PushNotification, { Importance } from "react-native-push-notification";

const Notifications = () => {
  const [fcmToken, setFcmToken] = useState("");
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    // Create a channel when the app starts (only need to do this once)
    PushNotification.createChannel(
      {
        channelId: "recon-channel", // Unique ID for high-priority notifications
        channelName: "High Priority Notifications", // Channel Name
        channelDescription: "Notifications for important messages", // Description
        playSound: true,
        soundName: "default",
        importance: Importance.HIGH, // Sets the importance for the notifications
        vibrate: true, // Enable vibration
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    if (requestUserPermission()) {
      // return the fcm token for the device
      messaging()
        .registerDeviceForRemoteMessages()
        .then(() => messaging().getToken())
        .then((token) => {
          console.log(token);
          setFcmToken(token);
          Alert.alert("fcm", token);
        })
        .catch((err) => {
          Alert.alert("fcm err", err.message);
        });
    } else {
      console.log("Failed token status", authStatus);
    }

    // check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    //register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Message handled in the foreground!", remoteMessage);
      Alert.alert(
        "New message received",
        `Title: ${remoteMessage.notification.title} & Body: ${remoteMessage.notification.body}`
      );
    });

    return unsubscribe;
  }, []);

  const sendLocalNotification = () => {
    PushNotification.localNotification({
      channelId: "recon-channel", // Use the created channel ID
      title: "High Priority Notification", // Title of the notification
      message: "This is a high priority local notification", // Body of the notification
      playSound: true,
      soundName: "default",
      vibrate: true,
    });
  };

  return (
    <View>
      <Text>Notification</Text>
      <Button title="Send Notification" onPress={sendLocalNotification} />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});

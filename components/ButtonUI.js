import React, { useState } from "react";
import { Text, Pressable, View, ActivityIndicator, Modal } from "react-native";
import { styles } from "./tabs/style/styles";

export default function ButtonUI(props) {
  const [showAlert, setShowAlert] = useState(false);
  const { onPress, title, btnStyle, children, txtStyle, loading } = props;
  const handleSubmit = () => {
    setShowAlert(true);
    onPress();
    setTimeout(() => {
      setShowAlert(false); // Set loading to false after operation completes
    }, 3000); // Simulate 2 seconds of loading
  };
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
          styles.buttonStyle,
          btnStyle,
        ]}
        onPress={loading ? handleSubmit : onPress}
      >
        {children ? (
          children
        ) : (
          <Text style={[styles.buttonTextStyle, txtStyle]}>{title}</Text>
        )}
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={showAlert}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.waitingMsg}>Wait</Text>
            <ActivityIndicator color={"#35374B"} size={"large"} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

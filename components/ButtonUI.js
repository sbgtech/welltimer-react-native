import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function ButtonUI(props) {
  const { onPress, title, btnStyle, children } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
        btnStyle,
      ]}
      onPress={onPress}
    >
      {children ? children : <Text style={styles.textStyle}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    backgroundColor: "#35374B",
  },
  textStyle: {
    color: "#fff",
    fontSize: 16,
    padding: 4,
  },
});

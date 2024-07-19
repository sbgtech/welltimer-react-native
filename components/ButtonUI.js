import React, { useState } from "react";
import { Text, Pressable, View, ActivityIndicator, Modal } from "react-native";
import { styles } from "./tabs/style/styles";

export default function ButtonUI(props) {
  const { onPress, title, btnStyle, children, txtStyle } = props;

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
        onPress={onPress}
      >
        {children ? (
          children
        ) : (
          <Text style={[styles.buttonTextStyle, txtStyle]}>{title}</Text>
        )}
      </Pressable>
    </View>
  );
}

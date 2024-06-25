import React, { useState } from "react";
import { Text, Pressable, View, ActivityIndicator } from "react-native";
import { styles } from "./tabs/style/styles";

export default function ButtonUI(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { onPress, title, btnStyle, children, txtStyle, loading } = props;
  const handleSubmit = () => {
    setIsLoading(true);
    onPress();
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after operation completes
    }, 3000); // Simulate 2 seconds of loading
  };
  return (
    <View>
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={"#000"} size={"small"} />
        </View>
      ) : (
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
      )}
    </View>
  );
}

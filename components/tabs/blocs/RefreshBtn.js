import React from "react";
import { Text, View, Modal, ActivityIndicator } from "react-native";
import { styles } from "../style/styles";
import ButtonUI from "../../ButtonUI";

const RefreshBtn = ({ onPress }) => {
  return (
    <View style={styles.refreshBtnWrapper}>
      <ButtonUI
        onPress={onPress}
        title={"Refresh"}
        btnStyle={styles.refreshBtn}
        txtStyle={styles.TextSendStyle}
      />
    </View>
  );
};

export default RefreshBtn;

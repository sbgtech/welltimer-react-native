import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { styles } from "./style/styles";

const Tab = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tab, isActive ? styles.activeTab : null]}
      onPress={onPress}
    >
      <Text style={styles.tabText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Tab;

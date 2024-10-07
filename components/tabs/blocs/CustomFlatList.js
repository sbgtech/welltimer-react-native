import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const CustomFlatList = ({ data, renderItem }) => {
  return (
    <ScrollView>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => console.log(item)}
        >
          {renderItem({ item })}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default CustomFlatList;

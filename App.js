import { StyleSheet, StatusBar } from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Item from "./components/Item";
import Home from "./components/Home";
// import DevicePage from "./components/DevicePage";
import Toast from "react-native-toast-message";
// import TestMode from "./components/TestMode";
import DeviceSettings from "./components/DeviceSettings";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#35374B"} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#35374B" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Item" component={Item} />
        {/* <Stack.Screen name="TestMode" component={TestMode} /> */}
        {/* <Stack.Screen
          name="DevicePage"
          component={DevicePage}
          options={{
            title: "Device settings",
          }}
        /> */}
        <Stack.Screen
          name="DeviceSettings"
          component={DeviceSettings}
          options={{
            title: "Device settings",
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

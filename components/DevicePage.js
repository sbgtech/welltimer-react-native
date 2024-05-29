import * as React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FirstRoute from "./tabs/FirstRoute";

const First = () => <FirstRoute />;

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: "#fff" }} />;

const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: "#fff" }} />;

const FourthRoute = () => <View style={{ flex: 1, backgroundColor: "#fff" }} />;

const FifthRoute = () => <View style={{ flex: 1, backgroundColor: "#fff" }} />;

const initialLayout = { width: Dimensions.get("window").width };

export default class ScrollableTab extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "First" },
      { key: "second", title: "Second" },
      { key: "third", title: "Third" },
      { key: "fourth", title: "Fourth" },
      { key: "fifth", title: "Fifth" },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusWrapper}>
          <Text style={styles.statusText}>Status</Text>
          <Text style={styles.statusText}>05:02:22</Text>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: First,
            second: SecondRoute,
            third: ThirdRoute,
            fourth: FourthRoute,
            fifth: FifthRoute,
          })}
          onIndexChange={(index) => this.setState({ index })}
          initialLayout={initialLayout}
          scrollEnabled={true}
          swipeEnabled={true}
          animationEnabled={true}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "#fff" }}
              tabStyle={{ width: 100 }}
              scrollEnabled={true}
              style={{ backgroundColor: "#35374B" }}
              activeColor="#fff"
              inactiveColor="#b0b0b0"
              pressColor="#fff"
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

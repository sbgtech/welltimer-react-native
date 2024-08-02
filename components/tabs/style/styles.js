import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const marginBottomAndroid = height * 0.09; // Adjust 0.05 as needed for your layout
const marginBottomIOS = height * 0.05; // Adjust 0.05 as needed for your layout
const scale = width / 450;

export const styles = StyleSheet.create({
  // home.js
  HomeView: {
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: 10,
  },
  HomeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginHorizontal: 4,
    marginBottom: 10,
  },
  HomeCountDevices: {
    fontSize: 16 * scale,
  },
  //item.js
  itemView: {
    backgroundColor: "#fff",
    margin: 2,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 20 * scale,
    fontWeight: "bold",
    maxWidth: "70%",
  },
  // TabView.js
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Customize tab bar border color
  },
  // Tab.js
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14 * scale,
    borderBottomWidth: 4 * scale,
    borderBottomColor: "transparent",
    backgroundColor: "#35374B",
  },
  activeTab: {
    borderBottomColor: "#fff", // Active tab indicator color
    backgroundColor: "#43455E",
  },
  tabText: {
    fontSize: 16 * scale,
    fontWeight: "bold",
    color: "#fff", // Customize tab label color
  },
  // testtab.js
  containerTestTab: {
    flex: 1,
    padding: 16 * scale,
  },
  contentContainer: {
    flex: 1,
  },
  //
  box: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  testTitle: {
    fontSize: 28 * scale,
    fontWeight: "bold",
  },
  deviceBloc: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  deviceBtns: {
    paddingHorizontal: 12 * scale,
    marginRight: 10 * scale,
    marginTop: 6 * scale,
  },
  deviceTitle: { color: "#7d7d7d", fontWeight: "bold", fontSize: 16 * scale },
  deviceInfo: { fontSize: 14 * scale, color: "#7d7d7d" },
  itemsList: {
    backgroundColor: "#fff",
    paddingVertical: 4 * scale,
    marginHorizontal: 5 * scale,
    marginVertical: 16 * scale,
    borderWidth: 0.5,
  },
  testContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4 * scale,
  },
  testInput: {
    backgroundColor: "#ddd",
    paddingVertical: 8 * scale,
    paddingHorizontal: 10 * scale,
    borderWidth: 0.5 * scale,
    width: "85%",
    maxWidth: "85%",
    height: 40 * scale,
  },
  btnSend: {
    width: 40 * scale,
    height: 40 * scale,
  },
  msgViewContainer: {
    marginBottom: 10 * scale,
    marginHorizontal: 6 * scale,
    backgroundColor: "#f7f7f7",
    padding: 4 * scale,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
  msgView: {
    justifyContent: "center",
  },
  itemDate: { color: "#7d7d7d", fontSize: 14 * scale },
  itemType: {
    fontSize: 16 * scale,
    fontWeight: "bold",
    color: "#7d7d7d",
  },
  itemData: {
    fontSize: 18 * scale,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 22 * scale,
    fontWeight: "bold",
    color: "#35374B",
  },
  emptyTextHome: {
    fontSize: 20 * scale,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#b5b5b5",
  },
  // table.js
  tableContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    padding: 10 * scale,
    borderColor: "#D4D4D4",
    borderTopWidth: 1,
    fontSize: 16 * scale,
  },
  tableHeader: {
    backgroundColor: "#35374B",
  },
  tableHeaderText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    padding: 10 * scale,
    fontSize: 16 * scale,
  },
  //button.js
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4 * scale,
    backgroundColor: "#35374B",
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 16,
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  // Laoding.js
  modalContent: {
    backgroundColor: "white",
    padding: 34 * scale,
    alignItems: "center",
  },
  waitingMsg: {
    fontSize: 20 * scale,
    fontWeight: "bold",
    color: "#35374B",
  },
  // settingsTab.js
  titleSettings: {
    fontSize: 16 * scale,
    fontWeight: "bold",
    margin: 4 * scale,
  },
  inputSettings: {
    backgroundColor: "#fff",
    paddingHorizontal: 10 * scale,
    margin: 2 * scale,
    borderWidth: 0.5,
    width: "100%",
    maxWidth: "100%",
    height: 40 * scale,
  },
  settingsSection: { marginBottom: 20 },
  containerBtnText: {
    margin: 2 * scale,
    marginTop: 12 * scale,
    width: "100%",
    maxWidth: "100%",
    height: 40 * scale,
  },
  // dropdown.js
  dropdownButtonStyle: {
    backgroundColor: "#fff",
    borderWidth: 0.5 * scale,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12 * scale,
    width: "100%",
    maxWidth: "100%",
    height: 40 * scale,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
  },
  dropdownMenuStyle: {
    backgroundColor: "#eeeeee",
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#151E26",
  },
  //sensorsTab.js
  marginBottomContainer: {
    marginBottom:
      Platform.OS === "android" ? marginBottomAndroid : marginBottomIOS,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  arrivalContainer: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
    padding: 14 * scale,
    backgroundColor: "#eeeeee",
  },
  telemetryDataContainer: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
    padding: 16 * scale,
    backgroundColor: "#eeeeee",
  },
  statusContainer: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
    padding: 14 * scale,
    backgroundColor: "#eeeeee",
  },
  statusWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 4,
    borderColor: "#D4D4D4",
  },
  statusText: {
    fontSize: 18 * scale,
  },
  statusValue: {
    fontSize: 18 * scale,
  },
  valveTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10 * scale,
    fontSize: 22 * scale,
  },
  onOffStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  onOffText: {
    fontSize: 16 * scale,
  },
  // timer.js
  dotTimer: {
    fontSize: 20 * scale,
  },
  inputTimer: {
    backgroundColor: "#fff",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "grey",
    fontWeight: "bold",
    color: "#7d7d7d",
    fontSize: 16 * scale,
    width: 55 * scale,
    maxWidth: 90,
    height: 45 * scale,
    maxHeight: 90,
  },
  //Arrival.js
  arrivalWrapper: {
    backgroundColor: "#D4D4D4",
    padding: 1 * scale,
    maxHeight: 400 * scale,
  },
  arrivalItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8 * scale,
    marginBottom: 1 * scale,
    backgroundColor: "#f7f7f7",
  },
  arrivalName: {
    fontSize: 18 * scale,
  },
  arrivalValue: {
    fontSize: 16 * scale,
  },
  // RefreshBtn.js
  refreshBtnWrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
  },
  refreshBtn: {
    paddingHorizontal: 12 * scale,
  },
  // many tabs
  wrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 14 * scale,
    padding: 14 * scale,
    backgroundColor: "#eeeeee",
  },
  rangeWrapper: {
    backgroundColor: "#ddd",
    padding: 10 * scale,
  },
  containerRange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 4,
  },
  btnSendText: {
    paddingHorizontal: 12 * scale,
    height: 45 * scale,
    maxHeight: 90,
  },
  TextSendStyle: {
    fontSize: 14 * scale,
    padding: 4 * scale,
  },
});

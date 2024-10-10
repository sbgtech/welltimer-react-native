import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const marginBottomAndroid = height * 0.09; // Adjust 0.05 as needed for your layout
const marginBottomIOS = height * 0.01; // Adjust 0.05 as needed for your layout
const scale = width / 450;

export const styles = StyleSheet.create({
  // home.js
  HomeView: {
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: 10 * scale,
  },
  HomeTitle: {
    fontSize: 26 * scale,
    fontWeight: "bold",
    marginHorizontal: 4 * scale,
    marginBottom: 10 * scale,
  },
  HomeCountDevices: {
    fontSize: 16 * scale,
  },
  //item.js
  itemView: {
    backgroundColor: "#fff",
    margin: 2 * scale,
    padding: 8 * scale,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: {
    margin: 2 * scale,
    width: "70%",
    maxWidth: "70%",
  },
  itemName: {
    fontSize: 20 * scale,
    fontWeight: "bold",
  },
  itemID: {
    fontSize: 10 * scale,
    color: "#9E9E9E",
  },
  // TabView.js
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1 * scale,
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
    fontSize: 14 * scale,
    fontWeight: "bold",
    color: "#fff", // Customize tab label color
  },
  // PIN_modal.js
  PINContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  PINContent: {
    width: "85%",
    padding: 24 * scale,
    backgroundColor: "white",
    alignItems: "center",
    position: "relative",
  },
  PINTitle: {
    fontSize: 24 * scale,
    fontWeight: "bold",
    marginBottom: 24 * scale,
  },
  PINinput: {
    backgroundColor: "#fff",
    paddingHorizontal: 10 * scale,
    marginBottom: 16 * scale,
    borderWidth: 0.5,
    width: "100%",
    maxWidth: "100%",
    height: 40 * scale,
  },
  closeIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  // testtab.js
  containerTestTab: {
    flex: 1,
    padding: 10 * scale,
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
    marginHorizontal: 15 * scale,
    marginVertical: 10 * scale,
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
    width: 55 * scale,
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
  //
  emptyPINContainer: { justifyContent: "center", alignItems: "center" },
  emptyPINText: {
    fontSize: 22 * scale,
    fontWeight: "bold",
    color: "#35374B",
  },
  // table.js
  tableContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 2 * scale,
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    padding: 10 * scale,
    borderColor: "#D4D4D4",
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
    fontSize: 16 * scale,
    padding: 4 * scale,
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
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
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
  inputSettingsDisabled: {
    backgroundColor: "#eeeeee",
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
    fontSize: 16 * scale,
  },
  dropdownButtonArrowStyle: {
    fontSize: 20 * scale,
  },
  dropdownMenuStyle: {
    backgroundColor: "#eeeeee",
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 14 * scale,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8 * scale,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16 * scale,
    fontWeight: "500",
    color: "#151E26",
  },
  //WellStatus.js
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
    borderBottomWidth: 2 * scale,
    paddingVertical: 6 * scale,
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
    fontSize: 24 * scale,
  },
  onOffStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // onOffText: {
  //   fontSize: 16 * scale,
  // },
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
    marginBottom: 2 * scale,
    backgroundColor: "#f7f7f7",
  },
  arrivalName: {
    fontSize: 18 * scale,
  },
  arrivalValue: {
    fontSize: 18 * scale,
  },
  // RefreshBtn.js
  refreshBtnWrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
  },
  refreshBtn: {
    paddingHorizontal: 12 * scale,
    height: 45 * scale,
    maxHeight: 90,
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
    paddingVertical: 4 * scale,
  },
  btnSendText: {
    paddingHorizontal: 12 * scale,
    height: 45 * scale,
    maxHeight: 90,
  },
  TextSendStyle: {
    fontSize: 16 * scale,
    padding: 4 * scale,
  },
});

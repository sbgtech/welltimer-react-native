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
    borderRadius: 9,
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
    borderRadius: 6 * scale,
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
    borderRadius: 9 * scale,
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
    borderRadius: 6 * scale,
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
    borderRadius: 9 * scale,
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
    borderRadius: 14 * scale,
  },
  tableRow: {
    flexDirection: "row",
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    padding: 10 * scale,
    borderColor: "#ccc",
    borderTopWidth: 1,
    fontSize: 16 * scale,
  },
  tableHeader: {
    backgroundColor: "#35374B",
    borderTopStartRadius: 14 * scale,
    borderTopEndRadius: 14 * scale,
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
    paddingVertical: 6,
    backgroundColor: "#35374B",
    borderRadius: 6,
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
    borderRadius: 9 * scale,
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
    borderRadius: 6 * scale,
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
    borderRadius: 6 * scale,
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
    borderRadius: 9,
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
    padding: 16 * scale,
    borderRadius: 14 * scale,
    backgroundColor: "#eeeeee",
  },
  telemetryDataContainer: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
    padding: 16 * scale,
    borderRadius: 14 * scale,
    backgroundColor: "#eeeeee",
  },
  statusWrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
    padding: 16 * scale,
    borderRadius: 14 * scale,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 20 * scale,
  },
  statusValue: {
    fontSize: 18 * scale,
  },
  valveTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10 * scale,
    fontSize: 28 * scale,
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
    borderRadius: 6 * scale,
    width: 55 * scale,
    maxWidth: 90,
    height: 45 * scale,
    maxHeight: 90,
  },
  // psi.js
  rangeText: { fontSize: 22 * scale, fontWeight: "bold" },
  modeWrapper: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 14,
    marginTop: 14,
  },
  labelRange: {
    fontWeight: "bold",
    fontSize: 18 * scale,
  },
  inputRange: {
    backgroundColor: "#fff",
    paddingVertical: 8 * scale,
    paddingHorizontal: 12 * scale,
    borderWidth: 0.5 * scale,
    fontSize: 14 * scale,
    width: 150 * scale,
    height: 40 * scale,
    borderRadius: 6 * scale,
  },
  inputContainerMin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  inputContainerMax: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelInput: {
    fontWeight: "bold",
    fontSize: 16 * scale,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 8 * scale,
    paddingHorizontal: 12 * scale,
    borderWidth: 0.5 * scale,
    fontSize: 14 * scale,
    width: 90 * scale,
    height: 40 * scale,
    borderRadius: 6 * scale,
  },
  btnSendIcon: {
    width: 40 * scale,
    height: 40 * scale,
    borderRadius: 6 * scale,
  },
  //Arrival.js
  arrivalWrapper: {
    backgroundColor: "white",
    borderRadius: 14 * scale,
    padding: 2 * scale,
    maxHeight: 400 * scale,
  },
  arrivalItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12 * scale,
    marginBottom: 4 * scale,
    borderRadius: 14 * scale,
    backgroundColor: "#f7f7f7",
  },
  arrivalName: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 18 * scale,
  },
  arrivalValue: {
    fontSize: 14 * scale,
  },
  // RefreshBtn.js
  refreshBtnWrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
    borderRadius: 14 * scale,
  },
  refreshBtn: {
    paddingHorizontal: 12 * scale,
    borderRadius: 6 * scale,
  },
  // many tabs
  wrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 14 * scale,
    padding: 14 * scale,
    borderRadius: 14 * scale,
    backgroundColor: "#eeeeee",
  },
  rangeWrapper: {
    backgroundColor: "#ddd",
    padding: 10 * scale,
    borderRadius: 14 * scale,
  },
  containerRange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 4,
  },
  btnSendText: {
    paddingHorizontal: 12 * scale,
    borderRadius: 6 * scale,
    height: 45 * scale,
    maxHeight: 90,
  },
  TextSendStyle: {
    fontSize: 14 * scale,
    padding: 4 * scale,
  },
});

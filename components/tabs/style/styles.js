import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const marginBottom = height * 0.05; // Adjust 0.05 as needed for your layout
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
  // testtab.js
  containerTestTab: {
    flex: 1,
    padding: 15,
  },
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
  deviceTitleBtnBloc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deviceTitle: { color: "#7d7d7d", fontWeight: "bold", fontSize: 16 * scale },
  deviceInfo: { fontSize: 14 * scale, color: "#7d7d7d" },
  itemsList: {
    backgroundColor: "#ddd",
    padding: 6,
    marginHorizontal: 5,
    marginVertical: 12,
    borderRadius: 9,
    borderWidth: 0.5,
  },
  testContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
  },
  testInput: {
    backgroundColor: "#ddd",
    paddingVertical: 8 * scale,
    paddingHorizontal: 10 * scale,
    borderWidth: 0.5,
    borderRadius: 9,
    width: "85%",
    maxWidth: "85%",
    height: 40 * scale,
  },
  btnSend: {
    width: 40 * scale,
    height: 40 * scale,
  },
  msgViewContainer: {
    margin: 2,
    backgroundColor: "#fff",
    borderRadius: 9,
    padding: 4,
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
  // table.js
  tableContainer: { flex: 1, backgroundColor: "#fff" },
  tableRow: { flexDirection: "row", borderColor: "#ccc" },
  tableCell: { flex: 1, padding: 10, borderWidth: 1, fontSize: 16 * scale },
  tableHeader: { backgroundColor: "#35374B" },
  tableHeaderText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
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
    borderRadius: 9 * scale,
    width: "100%",
    maxWidth: "100%",
    height: 40 * scale,
  },
  settingsSection: { marginBottom: 20 },
  // dropdown.js
  dropdownButtonStyle: {
    backgroundColor: "#fff",
    borderRadius: 9,
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    width: "100%",
    maxWidth: "100%",
    height: 30,
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
    marginBottom: marginBottom,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  telemetryDataContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 26,
    marginTop: 16,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#eeeeee",
  },
  statusWrapper: {
    marginHorizontal: 26,
    marginTop: 16,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 18 * scale,
  },
  statusValue: {
    fontSize: 18 * scale,
  },
  wrapper: {
    marginHorizontal: 26,
    marginTop: 16,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#eeeeee",
  },
  valveTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
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
  rangeWrapper: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 14,
  },
  rangeText: { fontSize: 22 * scale, fontWeight: "bold" },
  modeWrapper: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 14,
    marginTop: 14,
  },
  containerRange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  containerBtnText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  labelRange: {
    fontWeight: "bold",
    fontSize: 18 * scale,
  },
  inputRange: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
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
  activityIndicator: {
    width: 40 * scale,
    height: 40 * scale,
  },
  //
  arrivalContainer: {
    marginHorizontal: 26,
    marginTop: 16,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#eeeeee",
  },
  arrivalWrapper: {
    // marginBottom: 12,
    backgroundColor: "white",
    borderRadius: 16 * scale,
    padding: 2 * scale,
    // height: 100 * scale,
    maxHeight: 400 * scale,
  },
  arrivalItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12 * scale,
    marginBottom: 4 * scale,
    borderRadius: 12 * scale,
    backgroundColor: "#f7f7f7",
  },
  arrivalName: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20 * scale,
  },
  arrivalValue: {
    fontSize: 14 * scale,
  },
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
    borderRadius: 9,
    width: 55 * scale,
    maxWidth: 90,
    height: 55 * scale,
    maxHeight: 90,
  },
  btnSendText: {
    width: 90 * scale,
    borderRadius: 6 * scale,
  },
  TextSendStyle: {
    fontSize: 14 * scale,
    padding: 4 * scale,
  },
});

import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const marginBottomAndroid = height * 0.09; // Adjust 0.05 as needed for your layout
const marginBottomIOS = height * 0.01; // Adjust 0.05 as needed for your layout
const scale =
  width < 600 ? width / 420 : width > 850 ? width / 1200 : width / 800;

export const styles = {
  // In the most tabs
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // WellStatus.js - statisticsTab.js - TestTab.js
  marginBottomContainer: {
    marginBottom:
      Platform.OS === "android" ? marginBottomAndroid : marginBottomIOS,
  },
  /* ------------------------------ */
  // RefreshBtn.js
  refreshBtnWrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
  },
  // RefreshBtn.js
  refreshBtn: {
    paddingHorizontal: 12 * scale,
    height: 45 * scale,
    maxHeight: 90,
  },
  // WellStatusTab.js
  statusContainer: (width) => ({
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
    padding: 14 * scale,
    backgroundColor: "#eeeeee",
    flexDirection: width > 600 ? "row" : "column",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent:
      width < 600 ? "flex-start" : width > 900 ? "flex-start" : "space-between",
  }),
  // WellStatusTab.js
  statusWrapper: (width) => ({
    flexDirection: width > 600 ? "row" : "row",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent: "space-between",
    alignItems: width > 600 ? "center" : "baseline",
    padding: width > 600 ? 10 : 7,
    backgroundColor: "#fff",
    alignContent: "center",
    margin: width < 600 ? 2 * scale : 4 * scale,
    width: width < 600 ? "auto" : width > 900 ? width * 0.3 : width * 0.43,
  }),
  // WellStatusTab.js
  statusText: {
    fontSize: 18 * scale,
  },
  // WellStatusTab.js
  statusValue: {
    fontSize: 18 * scale,
  },
  // WellStatusTab.js
  arrivalContainer: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
    padding: 14 * scale,
    backgroundColor: "#eeeeee",
  },
  // Arrival.js
  arrivalWrapper: (width) => ({
    padding: 1 * scale,
    maxHeight: width < 900 ? 400 * scale : 250 * scale,
  }),
  arrivalItemsContainer: (width) => ({
    flexDirection: width > 600 ? "row" : "column",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent:
      width < 600 ? "flex-start" : width > 900 ? "flex-start" : "space-between",
  }),
  // Arrival.js
  arrivalItems: (width) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8 * scale,
    margin: width < 600 ? 2 * scale : 4 * scale,
    backgroundColor: "#ffffff",
    width: width < 600 ? "auto" : width > 900 ? width * 0.3 : width * 0.43,
  }),
  // Arrival.js
  arrivalName: {
    fontSize: 18 * scale,
  },
  // Arrival.js
  arrivalValue: {
    fontSize: 18 * scale,
  },
  // WellStatusTab.js
  telemetryDataContainer: {
    marginHorizontal: 26 * scale,
    marginTop: 16 * scale,
    padding: 16 * scale,
    backgroundColor: "#eeeeee",
  },
  // Table.js
  tableContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Table.js
  tableHeader: {
    backgroundColor: "#0055a4",
  },
  // Table.js
  tableHeaderText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    padding: 10 * scale,
    fontSize: 16 * scale,
  },
  // Table.js
  dataTableContainer: (width) => ({
    flexDirection: width > 600 ? "row" : "column",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent: "space-between",
  }),
  // Table.js
  tableRow: (width) => ({
    flexDirection: width > 600 ? "row" : "row",
    justifyContent: "space-between",
    borderTopWidth: 3 * scale,
    borderColor: "#eeeeee",
    width: width < 600 ? "auto" : width > 900 ? width * 0.3 : width * 0.43,
  }),
  // Table.js
  tableCell: {
    padding: 10 * scale,
    borderColor: "#D4D4D4",
    fontSize: 16 * scale,
  },

  /* ------------------------------------------- */
  // TimerTab.js
  timersContainer: (width) => ({
    height: height,
    flexDirection: width > 600 ? "row" : "column",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent: width > 600 ? "space-between" : "flex-start",
    gap: width > 600 ? 40 : 20,
    marginHorizontal: 26 * scale,
    marginTop: width > 600 ? 25 * scale : 15 * scale,
  }),
  // Timer.js
  wrapper: (width) => ({
    padding: 14 * scale,
    backgroundColor: "#eeeeee",
    width: width < 600 ? "auto" : width > 900 ? width * 0.29 : width * 0.44,
  }),

  // Timer.js - statisticsTab.js
  valveTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10 * scale,
    fontSize: 24 * scale,
  },

  // Timer.js- statisticsTab.js - SettingsTab.js
  rangeWrapper: {
    backgroundColor: "#ddd",
    padding: 10 * scale,
  },
  // Timer.js
  containerRange: {
    flexDirection: width > 600 ? "column" : "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: width > 600 ? 14 : 4,
    gap: width > 600 ? 14 : 4,
    padding: width > 600 ? 8 * scale : 0,
  },
  // Timer.js
  timersInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: width > 600 ? 0 : 8,
    width: width > 600 ? "100%" : "auto",
  },
  // Timer.js
  inputTimer: {
    backgroundColor: "#fff",
    textAlign: "center",
    borderWidth: 0.5 * scale,
    borderColor: "grey",
    fontWeight: "bold",
    color: "#7d7d7d",
    fontSize: width < 600 ? 16 * scale : 20 * scale,
    width: width < 600 ? 55 * scale : 60 * scale,
    maxWidth: 90 * scale,
    height: width < 600 ? 45 * scale : 50 * scale,
    maxHeight: 90 * scale,
  },
  // Timer.js
  dotTimer: {
    fontSize: 20 * scale,
    fontWeight: width < 600 ? "normal" : "bold",
  },
  // Timer.js
  TimersbtnContainer: {
    width: width > 600 ? "100%" : "auto",
  },
  // Timer.js - SettingsTab.js
  btnSendText: {
    paddingHorizontal: 12 * scale,
    height: width < 600 ? 45 * scale : 50 * scale,
    maxHeight: 90 * scale,
    width: "100%",
  },
  // Timer.js - SettingsTab.js
  TextSendStyle: {
    fontSize: width < 600 ? 16 * scale : 20 * scale,
    padding: 4 * scale,
  },
  /* ------------------------------------------- */
  // SettingsTab.js
  settingsWrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 14 * scale,
    padding: 14 * scale,
    backgroundColor: "#eeeeee",
    width: "auto",
  },
  // SettingsTab.js
  settingsSectionContainer: (width) => ({
    flexDirection: width > 600 ? "row" : "cloumn",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent:
      width < 600 ? "flex-start" : width > 900 ? "flex-start" : "space-between",
    alignItems: width > 600 ? "flex-start" : "baseline",
    width: "auto",
    gap: width < 600 ? 4 * scale : 18 * scale,
  }),
  // SettingsTab.js
  settingsSection: (width) => ({
    flexDirection: "column",
    justifyContent: "space-between",
    // gap: width < 600 ? 0 * scale : 18 * scale,
    height: width < 600 ? "auto" : width > 900 ? 485 : 485,
    minHeight: width < 600 ? "auto" : width > 900 ? 485 : 485,
    maxHeight: width < 600 ? "auto" : width > 900 ? 485 : 485,
    width: width < 600 ? "100%" : width > 900 ? width * 0.3 : width * 0.43,
    marginBottom: width * 0.01,
    backgroundColor: "#ddd",
    padding: width * 0.01,
  }),
  // SettingsTab.js - StatisticsTab.js
  titleSettings: {
    fontSize: 16 * scale,
    fontWeight: "bold",
    marginVertical: 4 * scale,
  },
  // SettingsTab.js
  inputSettings: {
    backgroundColor: "#fff",
    paddingHorizontal: 10 * scale,
    marginVertical: 2 * scale,
    borderWidth: 0.5 * scale,
    width: "100%",
    maxWidth: "100%",
    height: 40 * scale,
  },
  // SettingsTab.js
  containerBtnText: {
    marginVertical: 12 * scale,
    marginTop: 12 * scale,
    width: "100%",
    maxWidth: "100%",
    height: 40 * scale,
  },
  /* ------------------------------------------- */
  // Valve.js
  valveWrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 14 * scale,
    padding: 14 * scale,
    backgroundColor: "#eeeeee",
    width: "auto",
  },
  // Valve.js
  onOffStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  /* ------------------------------------------- */
  // StatisticsTab.js
  statisticWrapper: {
    marginHorizontal: 26 * scale,
    marginTop: 14 * scale,
    padding: 14 * scale,
    backgroundColor: "#eeeeee",
    width: "auto",
  },
  // StatisticsTab.js
  statisticSectionContainer: (width) => ({
    flexDirection: width > 600 ? "row" : "column",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent: "space-between",
    alignItems: width > 600 ? "center" : "baseline",
    width: "auto",
    gap: width < 600 ? 10 * scale : 24 * scale,
  }),
  // StatisticsTab.js
  statisticSection: (width) => ({
    // width: "100%",
    width: width < 600 ? "100%" : width > 900 ? width * 0.29 : width * 0.43,
  }),
  // StatisticsTab.js
  inputSettingsDisabled: {
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10 * scale,
    margin: 2 * scale,
    borderWidth: 0.5 * scale,
    width: "100%",
    maxWidth: "100%",
    height: 40 * scale,
  },
  /* --------------------------------------- */
  // TestTab.js
  containerTestTab: {
    flex: 1,
    padding: 10 * scale,
  },
  // TestTab.js
  box: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  // TestTab.js
  testTitle: {
    fontSize: 28 * scale,
    fontWeight: "bold",
  },
  // TestTab.js
  itemsList: {
    backgroundColor: "#fff",
    paddingVertical: 4 * scale,
    marginHorizontal: 5 * scale,
    marginVertical: 16 * scale,
    borderWidth: 0.5,
  },
  // TestTab.js
  msgViewContainer: {
    marginBottom: 10 * scale,
    marginHorizontal: 6 * scale,
    backgroundColor: "#f7f7f7",
    padding: 4 * scale,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
  // TestTab.js
  msgView: {
    justifyContent: "center",
  },
  // TestTab.js
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // TestTab.js
  emptyText: {
    fontSize: 22 * scale,
    fontWeight: "bold",
    color: "#0055a4",
  },
  // TestTab.js
  itemType: {
    fontSize: 16 * scale,
    fontWeight: "bold",
    color: "#7d7d7d",
  },
  // TestTab.js
  itemData: {
    fontSize: 18 * scale,
    fontWeight: "bold",
  },
  // TestTab.js
  itemDate: { color: "#7d7d7d", fontSize: 14 * scale },
  // TestTab.js
  testContainer: (width) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: width < 600 ? 6 * scale : 10 * scale,
    padding: 4 * scale,
    height: width < 600 ? 50 * scale : width > 900 ? 60 * scale : 60 * scale,
    width: "100%",
  }),
  // TestTab.js
  testInput: {
    backgroundColor: "#ddd",
    paddingVertical: 8 * scale,
    paddingHorizontal: 10 * scale,
    borderWidth: 0.5 * scale,
    flex: 1,
    height: "100%",
  },
  // TestTab.js
  btnSend: {
    width: width < 600 ? 50 * scale : width > 900 ? 100 * scale : 80 * scale,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  // TestTab.js
  emptyPINContainer: { justifyContent: "center", alignItems: "center" },
  // TestTab.js
  emptyPINText: {
    fontSize: 22 * scale,
    fontWeight: "bold",
    color: "#0055a4",
  },
  /* ----------------------------- */
  // Home.js
  HomeView: {
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: 10 * scale,
  },
  // Home.js
  HomeTitle: {
    fontSize: width < 600 ? 24 * scale : 26 * scale,
    fontWeight: "bold",
    marginHorizontal: 4 * scale,
    marginBottom: 10 * scale,
  },
  // Home.js
  HomeCountDevices: {
    fontSize: width < 600 ? 16 * scale : 20 * scale,
  },
  // Home.js
  emptyTextHome: {
    fontSize: 20 * scale,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#b5b5b5",
  },
  /* ----------------------------------- */
  // Item.js
  itemView: {
    backgroundColor: "#fff",
    margin: 2 * scale,
    padding: 8 * scale,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
  },
  // Item.js
  itemInfo: {
    // margin: 2 * scale,
    // width: "70%",
    // maxWidth: "70%",
  },
  // Item.js
  itemName: {
    fontSize: width < 600 ? 20 * scale : 24 * scale,
    fontWeight: "bold",
  },
  // Item.js
  itemID: {
    fontSize: width < 600 ? 10 * scale : 14 * scale,
    color: "#9E9E9E",
  },
  /* --------------------------- */
  // Tab.js
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14 * scale,
    borderBottomWidth: 4 * scale,
    borderBottomColor: "transparent",
    backgroundColor: "#0055a4",
  },
  // Tab.js
  activeTab: {
    borderBottomColor: "#d7c300", // Active tab indicator color
    backgroundColor: "#0a4b87",
  },
  // Tab.js
  tabText: {
    fontSize: width < 600 ? 14 * scale : 18 * scale,
    fontWeight: "bold",
    color: "#fff", // Customize tab label color
  },
  /* ----------------------------- */
  // PIN_modal.js
  PINContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  // PIN_modal.js
  PINContent: {
    width: "85%",
    padding: 24 * scale,
    backgroundColor: "white",
    alignItems: "center",
    position: "relative",
  },
  // PIN_modal.js
  closeIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  // PIN_modal.js
  PINTitle: {
    fontSize: 24 * scale,
    fontWeight: "bold",
    marginBottom: 24 * scale,
  },
  // PIN_modal.js
  PINinput: {
    backgroundColor: "#fff",
    paddingHorizontal: 10 * scale,
    marginBottom: 16 * scale,
    borderWidth: 0.5 * scale,
    width: "100%",
    maxWidth: "100%",
    height: 40 * scale,
  },
  /* ---------------------------- */
  // TabView.js
  deviceBloc: {
    marginHorizontal: 15 * scale,
    marginVertical: 10 * scale,
  },
  // TabView.js
  wellName: {
    color: "#000",
    fontWeight: "bold",
    fontSize: width < 600 ? 18 * scale : 22 * scale,
    textAlign: "center",
    marginBottom: 2 * scale,
  },
  // TabView.js
  deviceInfo: {
    fontSize: width < 600 ? 14 * scale : 18 * scale,
    color: "#7d7d7d",
  },
  // TabView.js
  deviceBtns: {
    paddingHorizontal: 12 * scale,
    marginRight: 10 * scale,
    marginTop: 6 * scale,
  },
  // TabView.js
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1 * scale,
    borderBottomColor: "#ccc", // Customize tab bar border color
  },
  // TabView.js
  contentContainer: {
    flex: 1,
  },
  /* -------------------------------- */
  // ButtonUI.js
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4 * scale,
    backgroundColor: "#0055a4",
  },
  // ButtonUI.js
  buttonTextStyle: {
    color: "#fff",
    fontSize: 16 * scale,
    padding: 4 * scale,
  },
  /* ------------------------------- */
  // Laoding.js
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
  // Laoding.js
  waitingMsg: {
    fontSize: 20 * scale,
    fontWeight: "bold",
    color: "#000",
  },
  /* -------------------------------- */
  // Dropdown.js
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
  // Dropdown.js
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16 * scale,
  },
  // Dropdown.js
  dropdownButtonArrowStyle: {
    fontSize: 20 * scale,
  },
  // Dropdown.js
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 14 * scale,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8 * scale,
  },
  // Dropdown.js
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16 * scale,
    fontWeight: "500",
    color: "#151E26",
  },
  // Dropdown.js
  dropdownMenuStyle: {
    backgroundColor: "#eeeeee",
  },
};

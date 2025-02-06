import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const marginBottomAndroid = height * 0.09; // Adjust 0.05 as needed for your layout
const marginBottomIOS = height * 0.01; // Adjust 0.05 as needed for your layout
const scale =
  width < 600 ? width / 420 : width > 960 ? width / 1300 : width / 900;

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
    marginHorizontal: 26,
    marginTop: 16,
  },
  // RefreshBtn.js
  refreshBtn: {
    paddingHorizontal: 12,
    height: width < 600 ? 36 : width > 950 ? 44 : 44,
    maxHeight: 90,
  },
  // WellStatusTab.js
  statusContainer: (width) => ({
    marginHorizontal: 26,
    marginTop: 16,
    padding: 14,
    backgroundColor: "#eeeeee",
    flexDirection: width > 600 ? "row" : "column",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent:
      width < 600
        ? "flex-start"
        : width > 950
        ? "space-between"
        : "space-between",
    // gap: width < 600 ? 20 : width > 950 ? 30 : 30,
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
    margin: width < 600 ? 2 : 4,
    width: width < 600 ? "auto" : width > 950 ? width / 3.4 : width / 2.3,
  }),
  // WellStatusTab.js
  emptyStatusWrapper: (width) => ({
    padding: width > 600 ? 0 : 7,
    margin: width < 600 ? 0 : 4,
    width: width < 600 ? "auto" : width > 950 ? width / 3.4 : width / 2.3,
  }),
  // WellStatusTab.js
  statusText: {
    fontSize: width < 600 ? 16 : width > 950 ? 20 : 18,
  },
  // WellStatusTab.js
  statusValue: {
    fontSize: width < 600 ? 16 : width > 950 ? 20 : 18,
  },
  // WellStatusTab.js
  arrivalContainer: {
    marginHorizontal: 26,
    marginTop: 16,
    padding: 14,
    backgroundColor: "#eeeeee",
  },
  // Arrival.js
  arrivalWrapper: (width) => ({
    padding: 1,
    maxHeight: width < 960 ? 400 : 250,
  }),
  arrivalItemsContainer: (width) => ({
    flexDirection: width > 600 ? "row" : "column",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent:
      width < 600
        ? "flex-start"
        : width > 950
        ? "space-between"
        : "space-between",
  }),
  // Arrival.js
  arrivalItems: (width) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    margin: width < 600 ? 2 : 4,
    backgroundColor: "#ffffff",
    width: width < 600 ? "auto" : width > 950 ? width / 3.4 : width / 2.3,
  }),
  // Arrival.js
  emptyArrivalItems: (width) => ({
    margin: width < 600 ? 2 : 4,
    // backgroundColor: "#ffffff",
    width: width < 600 ? "auto" : width > 950 ? width / 3.4 : width / 2.3,
  }),
  // Arrival.js
  arrivalName: {
    fontSize: width < 600 ? 16 : width > 950 ? 20 : 18,
  },
  // Arrival.js
  arrivalValue: {
    fontSize: width < 600 ? 16 : width > 950 ? 20 : 18,
  },
  // WellStatusTab.js
  telemetryDataContainer: {
    marginHorizontal: 26,
    marginTop: 16,
    padding: 14,
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
    padding: 10,
    fontSize: width < 600 ? 16 : width > 950 ? 20 : 18,
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
    borderTopWidth: 3,
    borderColor: "#eeeeee",
    width: width < 600 ? "auto" : width > 950 ? width / 3.4 : width / 2.3,
  }),
  // Table.js
  tableCell: {
    padding: 10,
    borderColor: "#D4D4D4",
    fontSize: width < 600 ? 16 : width > 950 ? 20 : 18,
  },

  /* ------------------------------------------- */
  // TimerTab.js
  timersContainer: (width) => ({
    height: height,
    flexDirection: width > 600 ? "row" : "column",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent: width > 600 ? "space-between" : "flex-start",
    gap: width > 600 ? 30 : 20,
    marginHorizontal: 26,
    marginTop: width > 600 ? 25 : 15,
  }),
  // Timer.js
  wrapper: (width) => ({
    padding: 12,
    backgroundColor: "#eeeeee",
    width: width < 600 ? "auto" : width > 980 ? width / 3.4 : width / 2.3,
  }),

  // Timer.js - statisticsTab.js
  valveTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
    fontSize: width < 600 ? 20 : width > 980 ? 30 : 24,
  },

  // Timer.js- statisticsTab.js - SettingsTab.js
  rangeWrapper: {
    backgroundColor: "#ddd",
    padding: 10,
  },
  // Timer.js
  containerRange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: width > 600 ? 8 : 18,
    // padding: width > 600 ? 8  : 8 ,
  },
  // Timer.js
  timersInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: width > 600 ? 6 : 8,
    // width: "auto",
  },
  // Timer.js
  inputTimer: {
    backgroundColor: "#fff",
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "grey",
    fontWeight: "bold",
    color: "#7d7d7d",
    fontSize: width < 600 ? 15 : width > 950 ? 20 : 17,
    width: width < 600 ? 53 : 57,
    maxWidth: 90,
    height: width < 600 ? 43 : 47,
    maxHeight: 90,
  },
  // Timer.js
  dotTimer: {
    fontSize: 20,
    fontWeight: width < 600 ? "normal" : "bold",
  },
  // Timer.js
  TimersbtnContainer: {
    width: width < 600 ? "auto" : width > 850 ? "30%" : "auto",
  },
  // Timer.js
  // TimerbtnSendText: {
  //   paddingHorizontal: 12,
  //   height: width < 600 ? 45 : 50,
  //   maxHeight: 90,
  //   width: "100%",
  // },
  // Timer.js
  // TimerTextSendStyle: {
  //   fontSize: width < 600 ? 16 : 20,
  //   padding: 4,
  // },
  // Timer.js - SettingsTab.js - Statistics.js
  btnSendText: {
    paddingHorizontal: 12,
    height: width < 600 ? 36 : width > 950 ? 42 : 42,
    maxHeight: 90,
    width: "100%",
  },
  // Timer.js - SettingsTab.js - Statistics.js
  TextSendStyle: {
    fontSize: width < 600 ? 14 : 20,
    padding: 4,
  },
  /* ------------------------------------------- */
  // SettingsTab.js
  settingsWrapper: {
    marginHorizontal: 26,
    marginTop: 14,
    padding: 14,
    backgroundColor: "#eeeeee",
    width: "auto",
  },
  // SettingsTab.js
  settingsSectionContainer: (width) => ({
    flexDirection: width > 600 ? "row" : "cloumn",
    flexWrap: width > 600 ? "wrap" : "nowrap",
    justifyContent:
      width < 600
        ? "flex-start"
        : width > 950
        ? "space-between"
        : "space-between",
    alignItems: width > 600 ? "flex-start" : "baseline",
    width: "auto",
    gap: width < 600 ? 4 : width > 950 ? 14 : 20,
  }),
  // SettingsTab.js
  settingsSection: (width) => ({
    flexDirection: "column",
    justifyContent: "space-between",
    gap: width < 600 ? 8 : 0,
    // height: width < 600 ? "auto" : 450,
    height: width < 600 ? "auto" : width > 950 ? 485 : 470,
    maxHeight: width < 600 ? "auto" : width > 950 ? 485 : 470,
    width: width < 600 ? "100%" : width > 950 ? width / 3.4 : width / 2.3,
    backgroundColor: "#ddd",
    padding: width * 0.01,
    marginBottom: 0,
  }),
  // SettingsTab.js
  emptySettingsSection: (width) => ({
    width: width < 600 ? "100%" : width > 950 ? width / 3.4 : width / 2.3,
    backgroundColor: "#ddd",
  }),
  // SettingsTab.js - StatisticsTab.js
  titleSettings: {
    fontSize: width < 600 ? 16 : width > 950 ? 20 : 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  // SettingsTab.js
  inputSettings: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginVertical: 2,
    borderWidth: 0.5,
    width: "100%",
    maxWidth: "100%",
    height: width < 600 ? 34 : width > 950 ? 40 : 40,
  },
  // SettingsTab.js
  containerBtnText: {
    marginVertical: 4,
    // marginTop: 12 ,
    width: "100%",
    maxWidth: "100%",
    height: 40,
  },
  /* ------------------------------------------- */
  // Valve.js
  valveWrapper: {
    marginHorizontal: 26,
    marginTop: 14,
    // padding: 16,
    paddingHorizontal: width < 600 ? 16 : width > 980 ? 25 : 20,
    paddingVertical: width < 600 ? 14 : width > 980 ? 23 : 18,
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
    marginHorizontal: 26,
    marginTop: 14,
    padding: 14,
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
    gap: width < 600 ? 10 : 14,
  }),
  // StatisticsTab.js
  statisticSection: (width) => ({
    // width: "100%",
    width: width < 600 ? "100%" : width > 900 ? width / 3.4 : width / 2.3,
  }),
  // StatisticsTab.js
  inputSettingsDisabled: {
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    marginVertical: 2,
    borderWidth: 0.5,
    width: "100%",
    maxWidth: "100%",
    height: width < 600 ? 34 : width > 950 ? 40 : 40,
  },
  // Statistics.js
  StatisticContainerBtnText: {
    marginTop: 14,
    width: "100%",
    maxWidth: "100%",
    height: width < 600 ? 34 : width > 950 ? 40 : 40,
  },
  /* --------------------------------------- */
  // TestTab.js
  containerTestTab: {
    flex: 1,
    padding: 10,
  },
  // TestTab.js
  box: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  // TestTab.js
  testTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  // TestTab.js
  itemsList: {
    backgroundColor: "#fff",
    paddingVertical: 4,
    marginHorizontal: 5,
    marginVertical: 16,
    borderWidth: 0.5,
  },
  // TestTab.js
  msgViewContainer: {
    marginBottom: 10,
    marginHorizontal: 6,
    backgroundColor: "#f7f7f7",
    padding: 4,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#0055a4",
  },
  // TestTab.js
  itemType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7d7d7d",
  },
  // TestTab.js
  itemData: {
    fontSize: 18,
    fontWeight: "bold",
  },
  // TestTab.js
  itemDate: {
    color: "#7d7d7d",
    fontSize: 14,
  },
  // TestTab.js
  testContainer: (width) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: width < 600 ? 6 : 10,
    padding: 4,
    height: width < 600 ? 50 : width > 900 ? 60 : 60,
    width: "100%",
  }),
  // TestTab.js
  testInput: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    flex: 1,
    height: "100%",
  },
  // TestTab.js
  btnSend: {
    width: width < 600 ? 50 : width > 900 ? 100 : 80,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  // TestTab.js
  emptyPINContainer: { justifyContent: "center", alignItems: "center" },
  // TestTab.js
  emptyPINText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0055a4",
  },
  /* ----------------------------- */
  // Home.js
  HomeView: (scale) => ({
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: 10 * scale,
  }),
  // Home.js
  HomeTitle: (scale) => ({
    fontSize: width < 600 ? 24 * scale : 26 * scale,
    fontWeight: "bold",
    marginHorizontal: 4 * scale,
    marginBottom: 10 * scale,
  }),
  // Home.js
  HomeCountDevices: (scale) => ({
    fontSize: width < 600 ? 16 * scale : 20 * scale,
  }),
  // Home.js
  emptyTextHome: (scale) => ({
    fontSize: 20 * scale,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#b5b5b5",
  }),
  // Home.js
  HomeBtnSendText: (scale) => ({
    paddingHorizontal: 12 * scale,
    height: width < 600 ? 45 * scale : 50 * scale,
    maxHeight: 90 * scale,
    width: "100%",
  }),
  // Home.js
  HomeTextSendStyle: (scale) => ({
    fontSize: width < 600 ? 16 * scale : 20 * scale,
    padding: 4 * scale,
  }),
  /* ----------------------------------- */
  // Item.js
  itemView: {
    backgroundColor: "#fff",
    margin: 2,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
  },
  // Item.js
  itemInfo: {
    // margin: 2 ,
    // width: "70%",
    // maxWidth: "70%",
  },
  // Item.js
  itemName: {
    fontSize: width < 600 ? 20 : 24,
    fontWeight: "bold",
  },
  // Item.js
  itemID: {
    fontSize: width < 600 ? 10 : 14,
    color: "#9E9E9E",
  },
  /* --------------------------- */
  // Tab.js
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderBottomWidth: 4,
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
    fontSize: width < 600 ? 14 : 18,
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
    padding: 24,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  // PIN_modal.js
  PINinput: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 16,
    borderWidth: 0.5,
    width: "100%",
    maxWidth: "100%",
    height: 40,
  },
  /* ---------------------------- */
  // TabView.js
  deviceBloc: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  // TabView.js
  wellName: {
    color: "#000",
    fontWeight: "bold",
    fontSize: width < 600 ? 18 : 22,
    textAlign: "center",
    marginBottom: 2,
  },
  // TabView.js
  deviceInfo: {
    fontSize: width < 600 ? 14 : 18,
    color: "#7d7d7d",
  },
  // TabView.js
  deviceBtns: {
    paddingHorizontal: 12,
    marginRight: 10,
    marginTop: 6,
  },
  // TabView.js
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
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
    padding: 4,
    backgroundColor: "#0055a4",
  },
  // ButtonUI.js
  buttonTextStyle: {
    color: "#fff",
    fontSize: 16,
    padding: 4,
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
    padding: 34,
    alignItems: "center",
  },
  // Laoding.js
  waitingMsg: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  /* -------------------------------- */
  // Dropdown.js
  dropdownButtonStyle: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    width: "100%",
    maxWidth: "100%",
    height: width < 600 ? 34 : width > 950 ? 40 : 40,
    marginVertical: 2,
  },
  // Dropdown.js
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
  },
  // Dropdown.js
  dropdownButtonArrowStyle: {
    fontSize: 20,
  },
  // Dropdown.js
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  // Dropdown.js
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#151E26",
  },
  // Dropdown.js
  dropdownMenuStyle: {
    backgroundColor: "#eeeeee",
  },
};

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 450;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  arrivalContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 26,
    marginTop: 16,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#eeeeee",
  },
  statusWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  statusText: {
    fontWeight: "bold",
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
  rangeWrapper: { backgroundColor: "#ddd", padding: 10, borderRadius: 14 },
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
  arrivalWrapper: {
    marginBottom: 12,
    backgroundColor: "white",
    borderRadius: 16,
    shadowOpacity: 0.1,
    justifyContent: "center",
    alignItems: "center",
    height: 70 * scale,
    maxHeight: 110,
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
    fontSize: 20,
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
});

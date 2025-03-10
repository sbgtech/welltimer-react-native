// import React, { useState } from "react";
// import {
//   Text,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   StatusBar,
//   View,
// } from "react-native";

// const ReelNotification = ({ message, onDismiss }) => {
//   const [visible, setVisible] = useState(true);
//   const slideAnim = new Animated.Value(-100); // Start offscreen (above)

//   // Slide the notification down
//   const showNotification = () => {
//     Animated.spring(slideAnim, {
//       toValue: 0, // Target position for the notification (0 is at the top)
//       useNativeDriver: true,
//     }).start();
//   };

//   // Hide the notification with a sliding up animation
//   const hideNotification = () => {
//     Animated.spring(slideAnim, {
//       toValue: -100, // Move it offscreen
//       useNativeDriver: true,
//     }).start(() => {
//       setVisible(false); // Hide it completely after animation
//       if (onDismiss) onDismiss(); // Call the dismiss handler if provided
//     });
//   };

//   React.useEffect(() => {
//     if (visible) {
//       showNotification();
//     }
//   }, [visible]);

//   return (
//     visible && (
//       <Animated.View
//         style={[
//           styles.notification,
//           { transform: [{ translateY: slideAnim }] },
//         ]}
//       >
//         <View>
//           <Text style={styles.message}>{message}</Text>
//         </View>
//         <View>
//           <TouchableOpacity
//             onPress={hideNotification}
//             style={styles.dismissButton}
//           >
//             <Text style={styles.dismissText}>Copy PIN</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     )
//   );
// };

// const styles = StyleSheet.create({
//   notification: {
//     position: "absolute",
//     top: -20,
//     left: "5%",
//     right: "5%",
//     backgroundColor: "#fff",
//     padding: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderBottomWidth: 2,
//     borderColor: "#0055a4",
//     zIndex: 1000,
//     borderRadius: 8,
//   },
//   message: {
//     color: "#0055a4",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   dismissButton: {
//     backgroundColor: "#0055a4",
//     padding: 5,
//     borderRadius: 5,
//     height: 28,
//   },
//   dismissText: {
//     color: "#fff",
//     fontSize: 12,
//   },
// });
// export default ReelNotification;

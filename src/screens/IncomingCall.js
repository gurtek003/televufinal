// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import firestore from 'firebase/firestore';

// const IncomingCallScreen = ({ route, navigation }) => {
//   const { callDocID } = route.params;

//   const acceptCall = async () => {
//     await firestore().collection('calls').doc(callDocID).update({
//       status: 'accepted',
//     });
//   };

//   const declineCall = async () => {
    
//     await firestore().collection('calls').doc(callDocID).update({
//       status: 'declined',
//     });
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Incoming Call...</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={acceptCall} style={[styles.button, styles.buttonAccept]}>
//           <Text style={styles.buttonText}>Accept</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={declineCall} style={[styles.button, styles.buttonDecline]}>
//           <Text style={styles.buttonText}>Decline</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   text: {
//     fontSize: 24,
//     marginBottom: 32,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingHorizontal: 30,
//   },
//   button: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//   },
//   buttonAccept: {
//     backgroundColor: 'green',
//   },
//   buttonDecline: {
//     backgroundColor: 'red',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default IncomingCallScreen;

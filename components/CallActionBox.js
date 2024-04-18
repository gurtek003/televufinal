import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";

import Icon from "react-native-vector-icons/MaterialIcons";

const CallActionBox = ({ switchCamera, toggleMute, toggleCamera, endCall }) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const onToggleCamera = () => {
    toggleCamera();
    setIsCameraOn(!isCameraOn);
  };
  const onToggleMicrophone = () => {
    toggleMute();
    setIsMicOn(!isMicOn);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={switchCamera} style={styles.button}>
        <Icon name={"flip-camera-ios"} size={35} color={"white"} />
      </Pressable>
      <Pressable onPress={onToggleCamera} style={styles.button}>
        <Icon
          name={isCameraOn ? "videocam" : "videocam-off"}
          size={35}
          color={"white"}
        />
      </Pressable>
      <Pressable onPress={onToggleMicrophone} style={styles.button}>
        <Icon name={isMicOn ? "mic" : "mic-off"} size={35} color={"white"} />
      </Pressable>
      <Pressable onPress={endCall} style={[styles.button, { backgroundColor: 'red' }]}>
        <Icon name={"call"} size={35} color={"white"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#222",
    borderTopWidth: 2,
    borderColor: "#444",
    borderRadius: 20,
    padding: 10,
    paddingBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 25,
  },
});

export default CallActionBox;

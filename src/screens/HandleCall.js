import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import RoomScreen from "./RoomScreen";
import CallScreen from "./CallScreen";
import JoinScreen from "./JoinScreen";
import IncomingCallScreen from "./IncomingCall"; 

export default function HandleCall() {
  const screens = {
    ROOM: "JOIN_ROOM",
    CALL: "CALL",
    JOIN: "JOIN",
    INCOMING_CALL: "INCOMING_CALL", 
  };

  const [screen, setScreen] = useState(screens.ROOM);
  const [roomId, setRoomId] = useState("");


  let content;

  switch (screen) {
    case screens.ROOM:
      content = <RoomScreen roomId={roomId} setRoomId={setRoomId} screens={screens} setScreen={setScreen} />;
      break;

    case screens.CALL:
      content = <CallScreen roomId={roomId} screens={screens} setScreen={setScreen} />;
      break;

    case screens.JOIN:
      content = <JoinScreen roomId={roomId} screens={screens} setScreen={setScreen} />;
      break;

    case screens.INCOMING_CALL:
      content = <IncomingCallScreen roomId={roomId} onAccept={() => setScreen(screens.CALL)} onDecline={() => setScreen(screens.ROOM)} />;
      break;

    default:
      content = <Text>Wrong Screen</Text>;
  }

  return <SafeAreaView style={styles.container}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Button, View } from "react-native";

import {
 RTCPeerConnection,
 RTCView,
 mediaDevices,
 RTCIceCandidate,
 RTCSessionDescription,
 MediaStream,
} from "react-native-webrtc";
import { db } from "../../firebase";
import {
 addDoc,
 collection,
 doc,
 setDoc,
 getDoc,
 updateDoc,
 onSnapshot,
 deleteField,
} from "firebase/firestore";

import CallActionBox from "../../components/CallActionBox";

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
 },
 video: {
    flex: 1,
 },
 localVideo: {
    position: "absolute",
    top: 50,
    right: 16,
    width: 120,
    height: 180,
 },
 callActionBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
 },
});

const configuration = {
 iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
 ],
 iceCandidatePoolSize: 10,
};

export default function CallScreen({ roomId, screens, setScreen }) {
 const [localStream, setLocalStream] = useState();
 const [remoteStream, setRemoteStream] = useState();
 const [cachedLocalPC, setCachedLocalPC] = useState();

 const [isMuted, setIsMuted] = useState(false);
 const [isOffCam, setIsOffCam] = useState(false);

 useEffect(() => {
    startLocalStream();
 }, []);

 useEffect(() => {
    if (localStream && roomId) {
      startCall(roomId);
    }
 }, [localStream, roomId]);

 //End call button
 async function endCall() {
    if (cachedLocalPC) {
      const senders = cachedLocalPC.getSenders();
      senders.forEach((sender) => {
        cachedLocalPC.removeTrack(sender);
      });
      cachedLocalPC.close();
    }

    const roomRef = doc(db, "room", roomId);
    await updateDoc(roomRef, { answer: deleteField() });

    setLocalStream();
    setRemoteStream(); // set remoteStream to null or empty when callee leaves the call
    setCachedLocalPC();
    // cleanup
    setScreen(screens.ROOM); //go back to room screen
 }

 //start local webcam on your device
 const startLocalStream = async () => {
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? "front" : "environment";
    const videoSourceId = devices.find(
      (device) => device.kind === "videoinput" && device.facing === facing
    );
    const facingMode = isFront ? "user" : "environment";
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500,
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
 };

 const startCall = async (id) => {
    const localPC = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach((track) => {
      localPC.addTrack(track, localStream);
    });

    const roomRef = doc(db, "room", id);
    const callerCandidatesCollection = collection(roomRef, "callerCandidates");
    const calleeCandidatesCollection = collection(roomRef, "calleeCandidates");

    localPC.addEventListener("icecandidate", (e) => {
      if (!e.candidate) {
        console.log("Got final candidate!");
        return;
      }
      addDoc(callerCandidatesCollection, e.candidate.toJSON());
    });

    localPC.ontrack = (e) => {
      const newStream = new MediaStream();
      e.streams[0].getTracks().forEach((track) => {
        newStream.addTrack(track);
      });
      setRemoteStream(newStream);
      console.log('Remote stream set:', newStream);
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    await setDoc(roomRef, { offer, connected: false }, { merge: true });

    onSnapshot(roomRef, (doc) => {
      const data = doc.data();
      if (!localPC.currentRemoteDescription && data.answer) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        localPC.setRemoteDescription(rtcSessionDescription);
      } else {
        setRemoteStream();
      }
    });

    onSnapshot(calleeCandidatesCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
 };

 const switchCamera = () => {
    localStream.getVideoTracks().forEach((track) => track._switchCamera());
 };

 const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
 };

 const toggleCamera = () => {
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsOffCam(!isOffCam);
    });
 };

 return (
  <View style={styles.container}>
     {!remoteStream && (
       <RTCView
         style={styles.video}
         streamURL={localStream && localStream.toURL()}
         objectFit={"cover"}
       />
     )}
 
     {remoteStream && (
       <>
         {console.log('Remote stream URL:', remoteStream && remoteStream.toURL())}
         <RTCView
           style={styles.video}
           streamURL={remoteStream && remoteStream.toURL()}
           objectFit={"cover"}
         />
         {!isOffCam && (
           <RTCView
             style={styles.localVideo}
             streamURL={localStream && localStream.toURL()}
           />
         )}
       </>
     )}
     <View style={styles.callActionBox}>
       <CallActionBox
         switchCamera={switchCamera}
         toggleMute={toggleMute}
         toggleCamera={toggleCamera}
         endCall={endCall}
       />
     </View>
  </View>
 );
 
}

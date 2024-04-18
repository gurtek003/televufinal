import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, query, where, onSnapshot, docChanges } from 'firebase/firestore';
import { firebaseApp } from '../firebase'; 

const firestore = getFirestore(firebaseApp);

// Create the context
const CallContext = createContext();

// Provider component
export const CallProvider = ({ children }) => {
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    // Substitute 'receiverUserId' with the actual logged-in user's ID
    const receiverId = 'receiverUserId';
    const q = query(collection(firestore, 'calls'), where('receiverId', '==', receiverId), where('status', '==', 'ringing'));
    const unsubscribe = onSnapshot(q, snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const callData = change.doc.data();
            // Here we're just setting the entire document, but you can adjust as needed
            setIncomingCall({ id: change.doc.id, ...callData });
          }
        });
      });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  // Handler to reset incoming call state
  const clearIncomingCall = () => setIncomingCall(null);

  return (
    <CallContext.Provider value={{ incomingCall, clearIncomingCall }}>
      {children}
    </CallContext.Provider>
  );
};

// Custom hook to use the call context
export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};

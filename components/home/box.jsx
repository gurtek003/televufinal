import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const Box = ({ children, alignItems }) => {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.blueLineContainer}>
        <View style={styles.blueLine} />
      </View>
      <View style={[{ alignItems }]}>
        {children}
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
  boxContainer: {
     width: 350,
     height: 300,
     backgroundColor: 'white',
     borderRadius: 20,
     ...Platform.select({
       ios: {
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 3 },
         shadowOpacity: 0.5,
         shadowRadius: 4,
       },
       android: {
         elevation: 4,
       },
     }),
 },
 blueLineContainer: {
  alignItems: 'center'
},
 blueLine: {
    height: 5, 
    width:'93%',
    backgroundColor: '#2A81A7',
    borderRadius: 5,
 },

});

export default Box;

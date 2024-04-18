import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Box from '../../components/home/box'; 
import { useNavigation } from '@react-navigation/native'; 
import HandleCall from './HandleCall';

export default function HomeScreen() {
  const numberOfClients = 15;
  const clients = Array.from({length: numberOfClients}, (_, index) => `Client ${index + 1}`);
  const navigation = useNavigation();

  const handleCallButton = async () => { 
    navigation.navigate('HandleCall'); 
  }; 

 return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/TeleVU-Logo2.webp')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.boxContainer}>
        <Box>
          <Text style={styles.heading}>Your Files and Recordings</Text>
          <View style={styles.blackLine} />
        </Box>
      </View>

      <View style={styles.boxContainer}>
        <Box>
          <Text style={styles.heading}>Currently Online</Text>
          <View style={styles.blackLine} />
          {/* ScrollView for text */}
          <ScrollView style={styles.boxScrollView}>
            <View style={styles.clientContainer}>
              <Text style={styles.nameText}>Client 1</Text>
              <TouchableOpacity style={styles.callButton} onPress={handleCallButton}>
                <Text style={styles.callButtonText}>Call</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Box>
      </View>

      <View style={styles.boxContainer}>
        <Box>
          <Text style={styles.heading}>Upcoming Calls</Text>
          <View style={styles.blackLine} />
        </Box>
      </View>

      <View style={styles.boxContainer}>
        <Box>
          <Text style={styles.heading}>Past Calls</Text>
          <View style={styles.blackLine} />
          {/* ScrollView for text */}
          <ScrollView style={styles.boxScrollView}>
          {clients.map((client, index) => (
            <View key={index}>
              <Text key={index} style={styles.nameText}>{client}</Text>
              <View style={styles.line}/>
              </View>
            ))}
          </ScrollView>
        </Box>
      </View>
    </ScrollView>
 );
}

const styles = StyleSheet.create({
 contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
 },
 imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 50,
 },
 logoImage: {
    width: 250,
    height: 100,
 },
 boxContainer: {
  paddingBottom: 20, 
 },
 heading: {
  fontSize: 22,
  fontWeight: '600', 
  color: '#2883AB',
  margin: 10,
 },
 blackLine: {
  height: 1,
  backgroundColor: 'black',
  marginTop: 5, 
  marginBottom: 5, 
 },
 line: {
  height: 0.4,
  backgroundColor: 'black',
 },
 callButton: {
  backgroundColor: 'green',
  paddingVertical: 10,
  paddingHorizontal: 25,
  borderRadius: 5,
 },
 callButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
 nameText: {
  flex: 1,
  fontSize: 20,
  paddingTop: 20,
  paddingBottom: 10,
 },
 boxScrollView: {
   maxHeight: 220, 
   paddingHorizontal: 30, 
 },
 clientContainer: {
  flexDirection: 'row', 
  alignItems: 'center', 
},
});

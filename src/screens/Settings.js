import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
 
const SettingsScreen = () => {
  const [language, setLanguage] = useState('English');
  const [personalData, setPersonalData] = useState('TeleVU Support');
  const [phoneNumber, setPhoneNumber] = useState('+1');
  const [autoAcceptCalls, setAutoAcceptCalls] = useState(false);
  const [defaultResolution, setDefaultResolution] = useState('High Definition (720p)');
  const [videoCodec, setVideoCodec] = useState('None');
  const [recordingProperties, setRecordingProperties] = useState('Basic');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mfaMethod, setMfaMethod] = useState('SMS');
  const [mfaPhoneNumber, setMfaPhoneNumber] = useState('');
 
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [resolutionModalVisible, setResolutionModalVisible] = useState(false);
  const [codecModalVisible, setCodecModalVisible] = useState(false);
  const [propertiesModalVisible, setPropertiesModalVisible] = useState(false);
 
  const renderPicker = (selectedValue, onValueChange, items, modalVisible, setModalVisible) => {
    const picker = (
<Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
        {items.map(item => (
<Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
</Picker>
    );
 
    if (Platform.OS === 'ios') {
      return (
<Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
<View style={styles.iosPickerModal}>{picker}</View>
</Modal>
      );
    }
 
    return picker;
  };
 
  return (
<ScrollView style={styles.container}>
      {/* User Settings Section */}
<View style={styles.section}>
<Text style={styles.sectionTitle}>User Settings</Text>
<TouchableOpacity onPress={() => setLanguageModalVisible(true)} style={styles.pickerTrigger}>
<Text>{language}</Text>
</TouchableOpacity>
        {renderPicker(
          language,
          (itemValue) => setLanguage(itemValue),
          [{ label: 'English', value: 'English' }],
          languageModalVisible,
          setLanguageModalVisible
        )}
<TextInput
          style={styles.input}
          placeholder="Personal Data"
          value={personalData}
          onChangeText={setPersonalData}
        />
<TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
<View style={styles.switchContainer}>
<Text>Auto Accept Calls</Text>
<Switch value={autoAcceptCalls} onValueChange={setAutoAcceptCalls} />
</View>
<TouchableOpacity style={styles.button} onPress={() => alert('Settings saved!')}>
<Text style={styles.buttonText}>Save</Text>
</TouchableOpacity>
</View>
 
      {/* Video Settings Section */}
<View style={styles.section}>
<Text style={styles.sectionTitle}>Video Settings</Text>
<TouchableOpacity onPress={() => setResolutionModalVisible(true)} style={styles.pickerTrigger}>
<Text>{defaultResolution}</Text>
</TouchableOpacity>
        {renderPicker(
          defaultResolution,
          (itemValue) => setDefaultResolution(itemValue),
          [{ label: 'High Definition (720p)', value: 'High Definition (720p)' }],
          resolutionModalVisible,
          setResolutionModalVisible
        )}
<TouchableOpacity onPress={() => setCodecModalVisible(true)} style={styles.pickerTrigger}>
<Text>{videoCodec}</Text>
</TouchableOpacity>
        {renderPicker(
          videoCodec,
          (itemValue) => setVideoCodec(itemValue),
          [{ label: 'None', value: 'None' }],
          codecModalVisible,
          setCodecModalVisible
        )}
<TouchableOpacity onPress={() => setPropertiesModalVisible(true)} style={styles.pickerTrigger}>
<Text>{recordingProperties}</Text>
</TouchableOpacity>
        {renderPicker(
          recordingProperties,
          (itemValue) => setRecordingProperties(itemValue),
          [{ label: 'Basic', value: 'Basic' }],
          propertiesModalVisible,
          setPropertiesModalVisible
        )}
</View>
 
      {/* Password Section```jsx
<View style={styles.section}>
<Text style={styles.sectionTitle}>Password</Text>
<TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={true}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
<TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
<TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
<TouchableOpacity style={styles.button} onPress={() => alert('Password changed!')}>
<Text style={styles.buttonText}>Save</Text>
</TouchableOpacity>
</View>
 
      {/* Multifactor Authentication Section */}
<View style={styles.section}>
<Text style={styles.sectionTitle}>Multifactor Authentication</Text>
<TextInput
          style={styles.input}
          placeholder="MFA Phone Number"
          value={mfaPhoneNumber}
          onChangeText={setMfaPhoneNumber}
        />
<TouchableOpacity style={styles.button} onPress={() => alert('MFA Updated!')}>
<Text style={styles.buttonText}>Update</Text>
</TouchableOpacity>
<Text>Verification Status: Not Verified</Text>
</View>
 
      {/* Device Test Section */}
<View style={styles.section}>
<Text style={styles.sectionTitle}>Device Test</Text>
        {/* Implement your device testing interface here */}
<TouchableOpacity style={styles.deviceButton} onPress={() => alert('Device checked!')}>
<Text>Check Device</Text>
</TouchableOpacity>
</View>
</ScrollView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerTrigger: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2a81a7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deviceButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  iosPickerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
});
 
export default SettingsScreen;
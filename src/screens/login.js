import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, TextInput, TouchableOpacity, Linking, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/login/button';

const LoginScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);


  // reset password 
  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };


  // link to terms
  const handleTermsPress = () => {
    Linking.openURL('https://televu.ca/terms-of-use/');
  };

  // link to policy
  const handlePrivacyPolicyPress = () => {
    Linking.openURL('https://televu.ca/privacy-policy/');
  };
 
  // condition to validate the email address
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  //Handle the login button
  const handleLoginPress = () => {
    if (!isEmailValid) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!password) {
      Alert.alert('Empty Password', 'Please enter your password.');
      return;
    }
  
    if ((email === 'User@gmail.com' && password === 'User') || 
      (email === 'Client@gmail.com' && password === 'Client')) {
    navigation.navigate('Home');
  } else {
    
    Alert.alert('Invalid Credentials', 'Please enter valid email and password.');
  }

  setIsLoginPressed(true);
};


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    <View className="container" style={styles.container}>
      <View className="eye_logo" style={styles.eye_logo}>
        <Image
          source={require('../../assets/logoEye.png')} 
          style={{ width: 70, height: 70 }}
        />
      </View>

      <View className="login" style={styles.login}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        onBlur={validateEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    </View>



      <View style={styles.button}>
        <CustomButton title="Login" onPress={handleLoginPress} />
        <View style={styles.termsContainer}>
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={handleTermsPress}>
            <Text style={styles.terms}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrivacyPolicyPress}>
            <Text style={styles.policy}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <View className="logo" style={styles.logo}>
        <Animated.Image
          source={require('../../assets/TeleVU-Logo.png')} 
          style={[styles.image, { opacity: fadeAnim }]}
        />
        <Text style={styles.footerText}>
          © 2024 TeleVU Innovation Ltd. All Rights Reserved.
        </Text>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  eye_logo: {
    position: 'absolute',
    justifyContent: 'center',
    paddingTop: 90,
    left: 150,
    zIndex: 999,
  },
  logo: {
    flex: 0.8,
    backgroundColor: '#2a81a7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    flex: 1.5, 
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0', 
    borderWidth: 1,
    borderColor: '#2a81a7',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  forgotPassword: {
    color: 'blue',
  },
  terms: {
    color: 'blue',
    paddingRight: 25,
  },
  policy: {
    color: 'blue',
  },
  button: {
    position: 'absolute',
    top: 340,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  image: {
    width: 250, 
    height: 50, 
  },
  validationField: {
    width: '100%',
  },
  footerText: {
    position: 'absolute',
    bottom: 20,
    fontWeight: '600',
    color: 'white',
  }  
});

export default LoginScreen;
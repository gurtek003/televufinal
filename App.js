import React from 'react';
import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { CallProvider } from './components/CallContext'; 
import LoginScreen from './src/screens/login';
import HomeScreen from './src/screens/HomeVU';
import FileScreen from './src/screens/FileVU';
import ChatScreen from './src/screens/ChatVU';
import SettingScreen from './src/screens/Settings';
import HandleCall from './src/screens/HandleCall';
import UserChat from './src/screens/UserChat'
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const navigation = useNavigation();  

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <View>
            <Text>User</Text>
            <Text>User@gmail.com</Text>
          </View>
          <Image
            source={require('./assets/Default_user.jpg')}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
        onPress={handleLogout}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerPosition="right"
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTitle: '', 
      headerTitleAlign: 'center' 
    }}
    drawerContent={props => <CustomDrawer {...props} />}
  >
    <Drawer.Screen 
      name="HomeVU" 
      component={HomeScreen}
    />
    <Drawer.Screen 
      name="FileVU" 
      component={FileScreen}
      options={{ headerTitle: 'Files' }}
    />
    <Drawer.Screen 
      name="ChatVU" 
      component={ChatScreen}
      options={{ headerTitle: 'Chat' }} 
    />
    <Drawer.Screen 
      name="Setting" 
      component={SettingScreen}
      options={{ headerTitle: 'Settings' }}
    />
  </Drawer.Navigator>
);


const App = () => (
  <CallProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="HandleCall" component={HandleCall} />
        <Stack.Screen name="UserChat" component={UserChat} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </CallProvider>
);

export default App;

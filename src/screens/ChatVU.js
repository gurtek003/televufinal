import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();

  // Dummy data for users
  const users = [{ id: 1, name: 'Client' }, { id: 2, name: 'User' }];

  
  const goToChat = (user) => {
    navigation.navigate('UserChat', { userName: user.name });
  };

  // Render each user in a list
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => goToChat(item)}>
      <Text style={styles.username}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userItem: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;

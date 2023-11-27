import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserName } from '../store/userNameSlice';
import { styles } from '../styles/styles.js';

const UserNameScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleUsernameChange = (text) => {
    setUsername(text.slice(0, 20));
  };

  const handleSaveUsername = () => {
    dispatch(setUserName(username));
    navigation.replace('ChatScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter your username'
        value={username}
        onChangeText={handleUsernameChange}
      />
      <Button
        title='Save'
        onPress={handleSaveUsername}
      />
    </View>
  );
};

export default UserNameScreen;

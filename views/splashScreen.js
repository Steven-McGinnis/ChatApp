import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { styles } from '../styles/styles.js';
import { useSelector } from 'react-redux';

const SplashScreen = ({ navigation }) => {
  const userName = useSelector((state) => state.userName.username);

  useEffect(() => {
    setTimeout(() => {
      if (userName === '') {
        navigation.replace('UserNameScreen');
        return;
      }

      navigation.replace('ChatScreen');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/chatlogo.png')} />
    </View>
  );
};

export default SplashScreen;

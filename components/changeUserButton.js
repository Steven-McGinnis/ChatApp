import React, { useEffect } from 'react';
import { View, Button } from 'react-native';

const ChangeUserButton = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: 5 }}>
          <Button
            title='Change User'
            onPress={() => {
              navigation.navigate('UserNameScreen', {
                screen: 'UserNameScreen',
              });
            }}
          />
        </View>
      ),
    });
  }, [navigation]);

  return null;
};

export default ChangeUserButton;

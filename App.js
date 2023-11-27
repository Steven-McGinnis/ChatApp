import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ActivityIndicator } from 'react-native';

import SplashScreen from './views/splashScreen.js';
import ChatScreen from './views/chatScreen.js';
import UserNameScreen from './views/userNameScreen.js';

const Stack = createNativeStackNavigator();
const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator />}
        persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SplashScreen'>
            <Stack.Screen
              name='SplashScreen'
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='ChatScreen'
              component={ChatScreen}
              options={{
                title: 'Chat',
              }}
            />
            <Stack.Screen
              name='UserNameScreen'
              component={UserNameScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { styles } from '../styles/styles.js';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setChatLog } from '../store/chatLogSlice.js';
import ChangeUserButton from '../components/changeUserButton.js';
import ChatBubble from '../components/chatBubble.js';
import { ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatScreen = ({ navigation }) => {
  const chatLog = useSelector((state) => state.chatLog);
  const [currentChatLog, setCurrentChatLog] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userName.username);

  // Set the current chat log to the chat log from the store
  useEffect(() => {
    if (chatLog.length > 0) {
      setCurrentChatLog(chatLog);
    }
  }, []);

  // Time Ping for getting the Chat Log
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRefresh) getChatLog();
    }, 10000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // When the ChatScreen is focused ping the Chat Log
  useFocusEffect(
    React.useCallback(() => {
      getChatLog();
    }, [])
  );

  // Polls the Chat Log API to get the Latest Chat Log
  const getChatLog = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'http://cpsc345final.jayshaffstall.com/get_chats.php',
        {
          method: 'POST',
        }
      );
      const data = await response.json();

      if (data.status === 'error') {
        let errorString = '';
        data.error.forEach((error) => {
          errorString += error + '\n';
        });
        setErrorMessage(errorString);
        return;
      }

      // If the status is not okay, then we have an unexpected response
      if (data.status !== 'okay') {
        setErrorMessage('Unexpected status: ' + data.status);
        return;
      }

      // If there are no messages, then we have an unexpected response
      if (data.messages.length === 0) {
        setErrorMessage('No messages in chat log');
        return;
      }

      data.messages.reverse(); // Invert the array for newest messages on top

      // If the chat log has changed, update the store
      if (
        data.messages.length !== currentChatLog.length ||
        !data.messages.every(
          (msg, i) =>
            msg.name === currentChatLog[i].name &&
            msg.message === currentChatLog[i].message
        )
      ) {
        setCurrentChatLog(data.messages);
        dispatch(setChatLog(data.messages));
      }
    } catch (error) {
      console.error('Error fetching chat logs:', error);
      setErrorMessage('Error fetching chat logs');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (newMessage === '') return;

    const formData = new FormData();
    formData.append('name', userName);
    formData.append('message', newMessage);

    const response = await fetch(
      'http://cpsc345final.jayshaffstall.com/add_chat.php',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (data.status === 'okay') {
      setNewMessage('');
      getChatLog();
      return;
    }

    if (data.status === 'error') {
      let errorString = '';
      data.error.forEach((error) => {
        errorString += error + '\n';
      });
      setErrorMessage(errorString);
      return;
    }
  };

  return (
    <>
      <View style={[styles.container, styles.bottomSpacer]}>
        <ChangeUserButton navigation={navigation} />
        {isLoading && (
          <ActivityIndicator
            size='large'
            color='#0000ff'
          />
        )}

        {errorMessage !== '' && <Text>{errorMessage}</Text>}

        <FlatList
          data={currentChatLog}
          renderItem={({ item }) => (
            <ChatBubble
              message={{ text: item.message, sender: item.name }}
              isOwnMessage={userName === item.name}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          inverted={true}
          ListHeaderComponent={<View style={styles.bottomSpacer} />}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.userNameText}>Messaging As: {userName}</Text>
          <FontAwesome.Button
            name='refresh'
            size={20}
            backgroundColor={autoRefresh ? 'green' : 'red'}
            onPress={() => setAutoRefresh(!autoRefresh)}>
            {autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}
          </FontAwesome.Button>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Enter your message'
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button
          title='Send'
          onPress={sendMessage}
        />
      </View>
    </>
  );
};

export default ChatScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../styles/styles.js';

const ChatBubble = ({ message, isOwnMessage }) => {
  const bubbleStyles = isOwnMessage ? styles.ownBubble : styles.otherBubble;
  const textStyles = isOwnMessage ? styles.ownText : styles.otherText;

  return (
    <View style={[styles.bubbleContainer, bubbleStyles]}>
      <Text style={textStyles}>{message.text}</Text>
      <Text style={styles.senderName}>{message.sender}</Text>
    </View>
  );
};

export default ChatBubble;

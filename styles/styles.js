import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  bubbleContainer: {
    minWidth: '50%',
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  ownBubble: {
    backgroundColor: '#DCF8C6',
    marginLeft: 'auto',
  },
  otherBubble: {
    backgroundColor: '#E5E5EA',
  },
  ownText: {
    color: 'black',
    fontWeight: 'bold',
  },
  otherText: {
    fontWeight: '500',
    color: 'black',
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderColor: '#ccc',
  },
  bottomSpacer: {
    height: 30,
  },
  bottomSpacer1: {
    marginBottom: 20,
  },
  userNameText: {
    marginBottom: 5,
  },
});

// import LocalizedStrings from 'react-native-localization';
// export const strings = new LocalizedStrings({

export const strings = {
    LOADING: 'LOADING...',
    HELLO: 'Hello',
    LOGIN: 'Login',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    SIGNUP: 'SIGN UP',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    FORGOT_PW: 'Forgot password?',
    FIND_PW: 'FIND PASSWORD',
    NAME: 'NAME',
    STATUS_MSG: 'Status message',
    REGISTER: 'REGISTER',
    SEND_LINK: 'Send Link',
    FRIEND: 'Friend',
    MESSAGE: 'Message',
    MY_PROFILE: 'My profile',
    UPDATE: 'Update',
    NO_CONTENT: 'No content',
    ADD_FRIEND: 'ADD',
    DELETE_FRIEND: 'DELETE',
    GO_CHAT: 'GO CHAT',
    SEARCH_USER: 'Search User',
    CHAT: 'CHAT',
    SEND: 'Send',
    WRITE_MESSAGE: 'Write message...',
    ERROR: 'Error',
    FRIEND_ADDED: 'Added to your friend.',
    FRIEND_ALREADY_ADDED: 'Already your friend.',
  }
 

export const getString = (str) => {
  return strings[str];
};

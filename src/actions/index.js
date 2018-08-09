import axios from 'axios';
// const ROOT_URL = 'http://localhost/api';
const ROOT_URL = 'https://itok-chat-app.herokuapp.com';

export const CREATE_USER = "CREATE_USER";
export const USER_AUTH = "USER_AUTH";
export const USER_LOGOUT = "USER_LOGOUT";
export const FETCH_CHATS = "FETCH_CHATS";
export const SEND_CHAT = "SEND_CHAT";

export function createUser(values, callback) {
  const request = axios.post(`${ROOT_URL}/register.php`, values);
  request.then((data) => {
    if (data.data.success) {
      callback();
    }
  });
  return {
    type: CREATE_USER,
    payload: request
  }
}

export function authUser(values) {
  const request = axios.post(`${ROOT_URL}/auth.php`, values);

  return {
    type: USER_AUTH,
    payload: request
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
    payload: {}
  }
}

export function fetchChats(callback) {
  const request = axios.get(`${ROOT_URL}/chat.php`);
  request.then(() => callback());

  return {
    type: FETCH_CHATS,
    payload: request
  };
}

export function sendChat(values) {
  const request = axios.post(`${ROOT_URL}/chat.php`, values);

  return {
    type: SEND_CHAT,
    payload: request
  }
}

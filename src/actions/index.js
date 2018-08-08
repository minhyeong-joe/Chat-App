import axios from 'axios';
const ROOT_URL = 'http://localhost/api';

export const CREATE_USER = "CREATE_USER";
export const USER_AUTH = "USER_AUTH";
export const USER_LOGOUT = "USER_LOGOUT";

export function createUser(values, callback) {
  const request = axios.post(`${ROOT_URL}/register.php`, values)
  .then((data) => {
    if (data.data.success) {
      callback();
    }
    return {
      type: CREATE_USER,
      payload: data
    }
  });
  return {
    type: CREATE_USER,
    payload: request
  }
}

export function authUser(values) {
  const request = axios.post(`${ROOT_URL}/auth.php`, values)
  .then((data)=> {
    return {
      type: USER_AUTH,
      payload: data
    };
  });

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

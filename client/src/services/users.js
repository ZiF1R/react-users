import axios from 'axios';

axios.defaults.headers.common = {
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials': true
};

const baseUrl = '/api/users'; 

const getAllUsers = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const getUser = (data) => {
  const request = axios.get(`${baseUrl}?mail=${data.mail}&password=${data.password}`);
  return request.then(response => response);
};

const addUser = (user) => {
  const request = axios.post(baseUrl, user);
  return request.then(response => response);
}

const blockUser = (user) => {
  const request = axios.put(`${baseUrl}/block/${user.id}`);
  return request.then(response => response.data);
}

const blockAllUsers = () => {
  const request = axios.put(`${baseUrl}/block`);
  return request.then(response => response.data);
}

const unblockUser = (user) => {
  const request = axios.put(`${baseUrl}/unblock/${user.id}`);
  return request.then(response => response.data);
}

const removeUser = (user) => {
  const request = axios.delete(`${baseUrl}/delete/${user.id}`);
  return request.then(response => response.data);
}

const removeAllUsers = () => {
  const request = axios.delete(`${baseUrl}/delete`);
  return request.then(response => response.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllUsers,
  getUser,
  addUser,
  blockUser,
  blockAllUsers,
  unblockUser,
  removeUser,
  removeAllUsers,
};
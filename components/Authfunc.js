import axios from 'axios';
import storeData from './storeData';


export async function auth (params) {
  try {
    const response = await axios.post('http://62.109.17.249:1337/token', new URLSearchParams(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    storeData("access_token", response.data.access_token);
    storeData("refresh_token", response.data.refresh_token);
    storeData("authStatus", response.status);

  } catch (error) {
    storeData("authStatus", error.response.status);
    console.error('Error logging in:', error);
  }
};

export async function reg (params) {
  try {
    const response = await axios.post('http://62.109.17.249:1337/create', params, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    storeData("authStatus", error.response.status);
    console.error('Error logging in:', error);
  }
};
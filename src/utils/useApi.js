import axios from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { useNavigation, useRoute } from '@react-navigation/native';

export const Signup = async (userData, endpoint) => {
  try {
    console.log('success')
    const response = await axios.post(`api/${endpoint}/signup`, userData);
    // const response = await axios.get("/test");
    return response.data;
  } catch (error) {
    console.log("================");
    console.log(error)
    throw error;
  }
};

export const Signin = async (credentials, endpoint) => {
  try {
    console.log("login");
    const response = await axios.post(`api/${endpoint}/login`, credentials);
    // console.log(response);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const Update = async (updateData, endpoint) => {
  try {
    console.log("update");
    // Existing token (obtained from AsyncStorage or login)
    const existingToken = await AsyncStorage.getItem('token');

    // Include token in Authorization header
    const response = await axios.post(`api/${endpoint}/update`, updateData, {
      headers: {
        Authorization: `Bearer ${existingToken}`
      }
    });

    // If the update is successful, you can potentially update the token in AsyncStorage
    if (response.status === 200) {
      // Optionally, if the backend sends a new token for some reason
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }
    } 
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const PostJob = async (jobData, endpoint) => {
  try {
    console.log('success')
    // Existing token (obtained from AsyncStorage or login)
    const existingToken = await AsyncStorage.getItem('token');
    const response = await axios.post(`api/${endpoint}/postJob`, jobData, {
      headers: {
        Authorization: `Bearer ${existingToken}`
      }
    });
    // const response = await axios.get("/test");
    return response.data;
  } catch (error) {
    console.log("================");
    console.log(error)
    throw error;
  }
};

export const Jobs = async (endpoint, role) => {
  try {
    // console.log("jobs");
    // Existing token (obtained from AsyncStorage or login)
    const existingToken = await AsyncStorage.getItem('token');
    console.log(existingToken)
    // Include token in Authorization header
    const response = await axios.get(`api/${endpoint}/shifts`, {
      headers: {
        Authorization: `Bearer ${existingToken}`,
        Role: role
      }
    });
    console.log(response.data.jobData)
    // If the update is successful, you can potentially update the token in AsyncStorage
    if (response.status === 200) {
      // Optionally, if the backend sends a new token for some reason
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }
    } else if (response.status === 401) {
      console.log('Token is expired')
      // navigation.navigate('Home')
    }
    return response.data.jobData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const isTokenInLocalStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token !== null;

  } catch (error) {
    console.error('Error checking for token in localstorage:', error);
    return false;
  }
}
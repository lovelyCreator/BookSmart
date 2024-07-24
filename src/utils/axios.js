import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://95.216.240.153:5000/',
  headers: {
    'Content-Type': 'application/json'
  },
})

export default instance;
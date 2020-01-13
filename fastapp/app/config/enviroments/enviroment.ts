import axios from 'axios';
import { AsyncStorage } from 'react-native';

const token = AsyncStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://192.168.25.3:3001',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export default api;
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const httpRequest = axios.create({
  baseURL: 'http://198.27.114.51:8083',
});

httpRequest.interceptors.request.use(
  async config => {
    await EncryptedStorage.getItem('token').then(token => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
    });
    console.log('Requisição: ', config);
    console.log('Token: ', config.headers.Authorization);
    return config;
  },
  error => {
    console.error('Erro na requisição: ', error);
    return Promise.reject(error);
  },
);

httpRequest.interceptors.response.use(
  response => {
    console.log('Resposta: ', response);
    return response;
  },
  error => {
    console.error('Erro na resposta: ', error);
    return Promise.reject(error);
  },
);

export default httpRequest;

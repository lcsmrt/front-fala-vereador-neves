import axios from 'axios';

const httpRequest = axios.create({
  baseURL: 'http://198.27.114.51:8083',
  // Vai usar cookies http-only?
});

httpRequest.interceptors.request.use(
  config => config,
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

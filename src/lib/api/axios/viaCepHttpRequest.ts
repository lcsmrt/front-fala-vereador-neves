import axios from 'axios';

const viaCepHttpRequest = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

viaCepHttpRequest.interceptors.request.use(
  async config => {
    // console.log('Requisição: ', config);
    return config;
  },
  error => {
    console.error('Erro na requisição: ', error);
    return Promise.reject(error);
  },
);

viaCepHttpRequest.interceptors.response.use(
  response => {
    // console.log('Resposta: ', response);
    return response;
  },
  error => {
    console.error('Erro na resposta: ', error);
    return Promise.reject(error);
  },
);

export default viaCepHttpRequest;

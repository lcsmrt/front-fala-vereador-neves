import axios from 'axios';

const ibgeHttpRequest = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

ibgeHttpRequest.interceptors.request.use(
  async config => {
    // console.log('Requisição: ', config);
    return config;
  },
  error => {
    console.error('Erro na requisição: ', error);
    return Promise.reject(error);
  },
);

ibgeHttpRequest.interceptors.response.use(
  response => {
    // console.log('Resposta: ', response);
    return response;
  },
  error => {
    console.error('Erro na resposta: ', error);
    return Promise.reject(error);
  },
);

export default ibgeHttpRequest;

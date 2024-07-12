import {Alderman} from './alderman';

interface Attachment {
  pk?: number;
  arquivo?: string;
  arquivoNome?: string;

  //  SEPARAR ISSO DEPOIS, TIVE QUE MESCLAR OS OBJETOS TEMPORARIAMENTE
  nome?: string;
  contentType?: string;
  documento?: string;
}

// OBS: ESSE OBJETO NÃO ESTÁ TOTALMENTE MAPEADO
export interface User {
  cep?: string;
  cidade?: string;
  complemento?: string;
  nascimento?: string;
  doc?: string;
  email?: string;
  endereco?: string;
  id?: string;
  nome?: string;
  numero?: string;
  pais?: string;
  sexo?: 'M' | 'F';
  senha?: string;
  telefone?: string;
  tipoDocumento?: 'CPF' | 'CNPJ';
  uf?: string;
  vereador?: Alderman;
  anexo?: Attachment;
  caminhoImagem?: string;
}

export interface Alderman {
  pk?: number;
  criacao?: string;
  modificacao?: string;
  usuarioCriou?: any;
  usuarioModificou?: any;
  ipCriou?: string;
  ipModificou?: string;
  usuarioCriouNome?: string;
  usuarioModificouNome?: string;
  descricao?: string;
  nomeCivil?: string;
  nomePopular?: string;
  sexo?: {
    pk?: number;
    descricao?: string;
    sexo?: string;
  };
  dataNascimento?: string;
  cpf?: string;
  rg?: string;
  titulo?: string;
  email?: string;
  endereco?: string;
  cep?: string;
  municipio?: string;
  uf?: {
    pk?: number;
    descricao?: string;
    siglaUF?: string;
  };
  telefone?: string;
  celular?: string;
  homepage?: string;
  foto?: string;
  usuarioCorrespondente?: any;
  ativo?: boolean;
}

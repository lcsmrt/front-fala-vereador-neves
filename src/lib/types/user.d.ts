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
  vereador?: boolean;
}

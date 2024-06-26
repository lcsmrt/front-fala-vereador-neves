import {Alderman} from '../accessControl/alderman';
import { User } from '../accessControl/user';

interface SolicitationStatus {
  pk?: number;
  descricao?: string;
}

export interface Solicitation {
  pk?: number;
  protocolo?: string;
  assunto?: string;
  conteudo?: string;
  dataHoraCriou?: string;
  dataHoraModificou?: string;
  usuarioAbertura?: User;
  statusSolicitacao?: SolicitationStatus;
  vereador?: Alderman;
  anonimo?: string;
}

export interface SolicitationKpi {
  abertas?: number;
  emAndamento?: number;
  encerradas?: number;
}

export interface SolicitationType {
  pk?: number;
  ciracao?: string;
  modificacao?: string;
  usuarioCriou?: number;
  usuarioModificou?: number;
  usuarioCriouNome?: string;
  usuarioModificouNome?: string;
  ipCriou?: string;
  ipModificou?: string;
  descricao?: string;
  topico?: string;
  selecionado?: boolean;
}

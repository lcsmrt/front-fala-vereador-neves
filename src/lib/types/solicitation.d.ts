import { Alderman } from "./alderman";

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
  usuarioAbertura?: {},
  statusSolicitacao?: SolicitationStatus;
  vereador?: Alderman;
}

export interface SolicitationKpi {
  abertas?: number;
  emAndamento?: number;
  encerradas?: number;
}
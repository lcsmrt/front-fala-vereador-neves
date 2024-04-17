import { Attachment } from "./attachment";

interface MessageOptions {
  pk?: number;
  descricao?: string;
  detalhes?: string;
}

export interface ChatMessage {
  pk?: number;
  origemVereador?: boolean;
  mensagem?: string;
  dataHora?: string;
  lida?: boolean;
  opcaoMensagens?: MessageOptions[];
  anexo?: Attachment;
}
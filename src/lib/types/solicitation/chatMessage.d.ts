import { Document } from "../system/document";
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

export interface ChatMessageFormData {
  mensagem?: string;
  origemVereador?: boolean;
  anonimo?: boolean;
  anexo?: Document;
}
import {Document} from '../system/document';

export interface Attachment {
  pk?: number;
  arquivo?: string;
  arquivoNome?: string;
  doc?: Document;
}

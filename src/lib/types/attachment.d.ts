interface Document {
  nome?: string;
  contentType?: string;
  documento?: string[];
}

export interface Attachment {
  pk?: number;
  arquivo?: string;
  arquivoNome?: string;
  doc?: Document;
}

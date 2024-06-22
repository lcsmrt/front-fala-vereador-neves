/**
 * Função para retornar as iniciais do primeiro e último nome de uma pessoa.
 * @param name Nome completo da pessoa.
 * @returns Iniciais do primeiro e último nome em maiúsculo.
 */

export const getNameInitials = (name: string): string => {
  if (!name) return '';

  const names = name.split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();

  const firstInitial = names[0][0];
  const lastInitial = names[names.length - 1][0];
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

/**
 * Função para retornar o primeiro e o último nome de uma pessoa.
 * @param name Nome completo da pessoa.
 * @returns Primeiro e último nome com a primeira letra em maiúsculo.
 */

export const getFirstAndLastName = (name: string): string => {
  if (!name) return '';

  const names = name.split(' ');
  if (names.length === 1) return names[0];

  return `${names[0]} ${names[names.length - 1]}`;
};

/**
 * Função para transformar um texto em formato de título (cada palavra com a primeira letra maiúscula).
 * @param text Texto a ser transformado.
 * @returns Texto em formato de título.
 */

export const turnIntoTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Função para formatar uma data no padrão dd/mm/yyyy.
 * @param date Objeto Date a ser formatado.
 * @returns Data formatada no padrão dd/mm/yyyy.
 */

export const formatDate = (date: Date | null): string => {
  if (!date) return '';

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

/**
 * Função para reverter uma data no formato dd/mm/yyyy para um objeto Date.
 * @param date Data no formato dd/mm/yyyy.
 * @returns Objeto Date correspondente à data informada.
 */

export const revertDateFormat = (date: string): Date => {
  const [day, month, year] = date.split('/').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Função para mascarar um CPF ou CNPJ.
 * @param value Texto contendo um CPF ou CNPJ. (Não possui validações ainda)
 * @returns CPF ou CNPJ formatado.
 */

export const maksCpfCnpj = (value: string): string => {
  if (!value) return '';

  if (value.length <= 14) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  } else {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }
};

/**
 * Função para mascarar um CEP.
 * @param value Texto contendo um CEP. (Não possui validações ainda)
 * @returns CEP formatado.
 */

export const maskCep = (value: string): string => {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

/**
 * Função para mascarar um número de telefone.
 * @param value Texto contendo um número de telefone. (Não possui validações ainda)
 * @returns Número de telefone formatado.
 */

export const maskPhone = (value: string): string => {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

/**
 * Função para remover caracteres especiais de uma string.
 * @param value Texto a ser limpo.
 * @returns Texto sem caracteres especiais.
 */

export const sanitizeFileName = (text: string): string => {
  let sanitizedText = text.replace(/[^a-zA-Z0-9._-]/g, '_');

  const parts = sanitizedText.split('.');
  if (parts.length > 2) {
    const extension = parts.pop();
    sanitizedText = parts.join('_') + '.' + extension;
  }

  return sanitizedText;
};

/**
 * Função para formatar uma data ISO para o padrão HH:mm.
 * @param date String ISO a ser formatada.
 * @returns Data formatada no padrão HH:mm.
 */

export const isoDateToTime = (isoDate: string): string => {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};
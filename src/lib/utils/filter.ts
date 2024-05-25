/**
 * Filtra opções (objetos) com base em um texto de filtro, ignorando acentos e caracteres especiais.
 * @param options Lista de opções a serem filtradas
 * @param key Chave da opção, define qual propriedade será considerada pelo filtro
 * @param filterText Texto do filtro, ou seja, o que o usuário digitou no campo de busca
 * @returns Lista de opções filtradas
 */

export const filterOptions = <T extends Record<string, any>>(
  options: T[],
  key: string,
  filterText: string,
): T[] => {
  return options.filter(option => {
    if (!option[key]) return false;

    const normalizedOption = option[key]
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const normalizedFilter = filterText
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return normalizedOption.includes(normalizedFilter);
  });
};

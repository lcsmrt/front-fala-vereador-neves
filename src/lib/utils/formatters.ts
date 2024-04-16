export const getNameInitials = (name: string): string => {
  if (!name) return '';

  const names = name.split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();

  const firstInitial = names[0][0];
  const lastInitial = names[names.length - 1][0];
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

export const getFirstAndLastName = (name: string): string => {
  if (!name) return '';

  const names = name.split(' ');
  if (names.length === 1) return names[0];

  return `${names[0]} ${names[names.length - 1]}`;
}

export const turnIntoTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

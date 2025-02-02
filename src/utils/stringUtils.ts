export const capitalise = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const extractIdFromUrl = (url: string): string | null => {
  const regex = /\/people\/(\d+)\/$/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  return null;
};

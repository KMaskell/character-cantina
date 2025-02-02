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

export const formatHeight = (heightStr: string): string => {
  const cm = parseInt(heightStr, 10);
  if (isNaN(cm)) return 'Invalid height';
  
  const inches = cm / 2.54;
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round(inches % 12);
  
  return `${feet}'${remainingInches}" (${cm}cm)`;
};

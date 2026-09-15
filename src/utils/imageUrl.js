export const getImageUrl = (url) => {
  if (!url) return '';
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  if (url.startsWith('http://localhost:8080')) {
    return url.replace('http://localhost:8080', apiUrl);
  }
  if (url.startsWith('/uploads')) {
    return `${apiUrl}${url}`;
  }
  return url;
};

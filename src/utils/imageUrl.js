const FALLBACK_PROJECT_IMAGE = 'https://images.unsplash.com/photo-1541888081622-df8d9c572baf?q=80&w=1200&auto=format&fit=crop';

export const getImageUrl = (url) => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return FALLBACK_PROJECT_IMAGE;
  }

  const trimmed = url.trim();

  // If already a Data URL (base64) or blob URL, return directly
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  // Strip any trailing slashes from API URL (e.g. "https://backend.onrender.com/" -> "https://backend.onrender.com")
  const apiUrl = rawApiUrl.replace(/\/+$/, '');

  // If URL starts with http://localhost:8080 or https://localhost:8080, replace with configured API URL
  if (trimmed.startsWith('http://localhost:8080') || trimmed.startsWith('https://localhost:8080')) {
    return trimmed.replace(/https?:\/\/localhost:8080/, apiUrl);
  }

  // If already absolute http/https URL (Unsplash, external hosting, etc.)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // If relative path like "/uploads/..." or "uploads/..."
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${apiUrl}${cleanPath}`;
};

export const getFallbackImage = () => FALLBACK_PROJECT_IMAGE;

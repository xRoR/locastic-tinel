export const BASE_URL = process.env.NODE_ENV === 'production'
  ? (window as any).__RUNTIME_CONFIG__.API_URL
  : 'http://localhost:3001';

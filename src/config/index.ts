export const BASE_URL = process.env.NODE_ENV === 'production'
  ? (window as any).__RUNTIME_CONFIG__.API_URL
  : 'http://192.168.5.32:3001';

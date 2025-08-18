export const API = {
  baseURL: process.env.BACKEND_URL || 'http://localhost:4000/api',
};

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API.baseURL}${path}`;
  
  console.log('🔗 API URL:', url);
  console.log('🔄 API Request:', {
    url,
    method: init?.method || 'GET',
    body: init?.body ? JSON.parse(init.body as string) : null
  });
  
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {})
      },
      cache: 'no-store',
    });

    console.log('📥 API Response Status:', res.status);
    
    const text = await res.text();
    console.log('📄 Response Preview:', text.substring(0, 100));
    
    // Si la respuesta contiene HTML (error 404/500), significa que el backend no está configurado
    if (text.includes('<!DOCTYPE html>') || text.includes('<html>')) {
      throw new Error(`❌ Backend Error: La ruta ${path} no existe o el servidor backend no está configurado correctamente`);
    }
    
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: ${text}`);
    }
    
    return JSON.parse(text) as T;
    
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
}
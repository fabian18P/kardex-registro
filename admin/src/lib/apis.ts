// src/lib/api.ts
export const API = {
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
};

export async function apiFetch<T>(path: string, init?: RequestInit) {
  const res = await fetch(`${API.baseURL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}
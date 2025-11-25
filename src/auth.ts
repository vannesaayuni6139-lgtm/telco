export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
};

const USERS_KEY = 'telco_users_v1';
const SESSION_KEY = 'telco_session_v1';

import { ADMIN_EMAIL } from './config';

const USE_BACKEND = typeof import.meta !== 'undefined' && import.meta.env?.VITE_USE_BACKEND === 'true';
const API_BASE = USE_BACKEND ? (import.meta.env.VITE_API_BASE || 'http://localhost:4000') : undefined;

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return `h${Math.abs(hash)}`;
}

export function registerUser(params: { email: string; password: string; name: string }): { ok: true } | { ok: false; error: string } {
  if (USE_BACKEND) {
    // When backend is enabled, frontend should use async API calls directly.
    return { ok: false, error: 'Backend registration requires async fetch (use /api/auth/register).' };
  }

  const users = readUsers();
  const email = params.email.trim().toLowerCase();
  if (users.some(u => u.email === email)) {
    return { ok: false, error: 'Email already registered' };
  }
  const newUser: StoredUser = {
    id: `u_${Date.now()}`,
    email,
    passwordHash: simpleHash(params.password),
    name: params.name.trim() || email.split('@')[0],
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  writeUsers(users);
  return { ok: true };
}

export function loginUser(params: { email: string; password: string; remember?: boolean }): { ok: true; user: Omit<StoredUser, 'passwordHash'> } | { ok: false; error: string } {
  if (USE_BACKEND) {
    return { ok: false, error: 'Backend login requires async fetch (use /api/auth/login).' };
  }

  const users = readUsers();
  const email = params.email.trim().toLowerCase();
  const candidate = users.find(u => u.email === email);
  if (!candidate) return { ok: false, error: 'Invalid email or password' };
  if (candidate.passwordHash !== simpleHash(params.password)) return { ok: false, error: 'Invalid email or password' };
  const session = { userId: candidate.id, ts: Date.now() };
  if (params.remember) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  const { passwordHash, ...publicUser } = candidate;
  return { ok: true, user: publicUser };
}

export function getCurrentUser(): Omit<StoredUser, 'passwordHash'> | null {
  if (USE_BACKEND) {
    // For backend mode, callers should call /api/auth/me using fetch (async).
    return null;
  }

  const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as { userId: string };
    const users = readUsers();
    const found = users.find(u => u.id === session.userId);
    if (!found) return null;
    const { passwordHash, ...publicUser } = found;
    return publicUser;
  } catch {
    return null;
  }
}

export function logoutUser(): void {
  if (USE_BACKEND) {
    try {
      fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch {
      // ignore network errors
    }
    return;
  }

  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function ensureDemoUser(): void {
  if (USE_BACKEND) {
    // backend will ensure demo admin exists on server startup
    return;
  }

  const users = readUsers();
  const email = ADMIN_EMAIL;
  const exists = users.some(u => u.email === email);
  if (!exists) {
    const demo: StoredUser = {
      id: 'u_demo',
      email,
      passwordHash: simpleHash('Admin123'),
      name: 'Admin Demo',
      createdAt: new Date().toISOString(),
    };
    users.push(demo);
    writeUsers(users);
  }
}



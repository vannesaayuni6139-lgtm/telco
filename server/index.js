const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, 'data.json');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@telco.dev';
const PORT = process.env.PORT || 4000;

function loadData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return { users: [] };
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function findUserByEmail(email) {
  const data = loadData();
  return data.users.find(u => u.email === email.toLowerCase());
}

function findUserById(id) {
  const data = loadData();
  return data.users.find(u => u.id === id);
}

function createUser({ email, passwordHash, name, role }) {
  const data = loadData();
  const id = `u_${Date.now()}`;
  const user = { id, email: email.toLowerCase(), passwordHash, name, role, createdAt: new Date().toISOString() };
  data.users.push(user);
  saveData(data);
  return user;
}

// Ensure demo admin exists
(function ensureAdmin() {
  const data = loadData();
  const exists = data.users.some(u => u.email === ADMIN_EMAIL);
  if (!exists) {
    const hash = bcrypt.hashSync('Admin123', 10);
    const user = { id: 'u_admin', email: ADMIN_EMAIL, passwordHash: hash, name: 'Admin Demo', role: 'admin', createdAt: new Date().toISOString() };
    data.users.push(user);
    saveData(data);
    console.log('Demo admin created:', ADMIN_EMAIL);
  }
})();

const app = express();
app.use(express.json());
app.use(cookieParser());
// Allow Vite dev server origins for local development – accept both localhost and 127.0.0.1
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
);

function signToken(user) {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next) {
  const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function adminOnly(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
}

// Register
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
  if (findUserByEmail(email)) return res.status(400).json({ error: 'Email already registered' });
  const passwordHash = bcrypt.hashSync(password, 10);
  // role: admin only when email matches ADMIN_EMAIL
  const role = email.toLowerCase() === ADMIN_EMAIL ? 'admin' : 'user';
  const user = createUser({ email, passwordHash, name: name || email.split('@')[0], role });
  const token = signToken(user);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  const { passwordHash: _, ...publicUser } = user;
  res.status(201).json({ user: publicUser });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
  const user = findUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'Invalid email or password' });
  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: 'Invalid email or password' });
  const token = signToken(user);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  const { passwordHash: _, ...publicUser } = user;
  res.json({ user: publicUser });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

// Me
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = findUserById(req.user.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { passwordHash: _, ...publicUser } = user;
  res.json({ user: publicUser });
});

// Admin - list users
app.get('/api/users', authMiddleware, adminOnly, (req, res) => {
  const data = loadData();
  const list = data.users.map(u => {
    const { passwordHash, ...pu } = u;
    return pu;
  });
  res.json({ users: list });
});

// Admin - delete user
app.delete('/api/users/:id', authMiddleware, adminOnly, (req, res) => {
  const id = req.params.id;
  const data = loadData();
  const idx = data.users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.users.splice(idx, 1);
  saveData(data);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`);
});

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Auth response with token and user data
 */
export async function registerUser(userData) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.detail || 'Registration failed')
  }

  return await res.json()
}

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Auth response with token and user data
 */
export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.detail || 'Login failed')
  }

  return await res.json()
}

/**
 * Get current user info
 * @returns {Promise<Object>} User data
 */
export async function getCurrentUser() {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error('Failed to get user info')
  }

  return await res.json()
}

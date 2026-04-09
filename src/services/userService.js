const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Fetch user profile from backend
 * @returns {Promise<Object>} User profile data
 */
export async function getUserProfile() {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status}`)
  }

  return await res.json()
}

/**
 * Update user profile
 * @param {Object} data - Profile data to update
 * @returns {Promise<Object>} Response
 */
export async function updateUserProfile(data) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error(`Failed to update profile: ${res.status}`)
  }

  return await res.json()
}

/**
 * Helper function to get authentication headers for API calls
 * @param {Object} user - Firebase user object
 * @returns {Promise<Object>} Headers object with authentication
 */
export const getAuthHeaders = async (user) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    // Try to get Firebase ID token
    if (user && typeof user.getIdToken === 'function') {
      const token = await user.getIdToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.warn('Failed to get ID token:', error);
  }

  // Fallback: Add user info in headers (more reliable)
  if (user) {
    headers['X-User-Email'] = user.email || '';
    headers['X-User-UID'] = user.uid || '';
  }

  return headers;
};

/**
 * Make authenticated API call
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @param {Object} user - Firebase user object
 * @returns {Promise<Response>} Fetch response
 */
export const authenticatedFetch = async (url, options = {}, user) => {
  const headers = await getAuthHeaders(user);
  
  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });
};


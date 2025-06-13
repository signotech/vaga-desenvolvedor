const API_URL = 'http://localhost:8080/api';

export async function apiRequest(endpoint, method = 'GET', data = null, auth = false) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (auth) {
    headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const config = {
    method,
    headers,
  };
  if (data) config.body = JSON.stringify(data);

  const response = await fetch(`${API_URL}/${endpoint}`, config);
  return response.json();
}

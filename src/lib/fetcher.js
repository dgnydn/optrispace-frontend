export const fetcher = async (url) => {
  const headers = { 'Content-Type': 'application/json' };

  let payload = {
    method: 'GET',
    headers: headers,
  }

  const res = await fetch(url, payload);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');

    // Attach extra info to the error object.
    error.info = data;
    error.status = res.status;

    throw error;
  }

  return data;
}

export const fetchWithToken = async (url, token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  let payload = {
    method: 'GET',
    headers: headers,
  }

  const res = await fetch(url, payload);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');

    // Attach extra info to the error object.
    error.info = data;
    error.status = res.status;

    throw error;
  }

  return data;
}

export const postWithToken = async (url, token, body = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  let payload = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  }

  const res = await fetch(url, payload);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error('An error occured while sending the data');

    // Attach extra info to the error object.
    error.info = data;
    error.status = res.status;

    throw error;
  }

  return data;
}

//ts-check
export const instance = axios.create({
  baseURL: 'https://find-all-in.herokuapp.com',
});

export async function getCSRF() {
  return await instance
    .get('/api/csrf')
    .then(res => res.data.csrfToken)
    .catch(err => err.message);
}

export async function isLogged() {
  return await instance
    .get('/api/auth-with-cookie')
    .then(res => res.data)
    .catch(err => err.response.data);
}

export function isEmpty(entry) {
  if (Array.isArray(entry) || typeof entry === 'string') {
    return entry.length === 0 ? true : false;
  }
}

export function splitAdress(fullAdress) {
  const addressObject = {};
  const keys = ['country', 'province', 'street', 'number'];
  const values = fullAdress.split(',');
  for (let i in values) addressObject[keys[i]] = values[i];
  return addressObject;
}

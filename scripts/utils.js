//ts-check
export const instance = axios.create({
  baseURL: 'https://find-all-in.herokuapp.com',
  withCredentials: true,
  headers: {
    common: {
      Authorization: getCookies()
    }
  }
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

export function splitAddress(fullAddress) {
  const keys = ['province', 'county', 'street', 'number'];
  return fullAddress.split(',').reduce((acc, value, index) => { acc[keys[index]] = value.trim(); return acc }, {});
}

export function getCookies() {
  const allCookies = document.cookie.replace(/=/g, `":"`).replace(/; /g, `","`)
  return `{"${allCookies}"}`
}
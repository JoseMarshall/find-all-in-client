import { isEmpty, instance } from '../utils.js';

//ts-check
export default async function submitForm(e) {
  e.preventDefault();
  const user = e.target[0].value;
  const password = e.target[1].value;

  if (isEmpty(user) || isEmpty(password)) {
    console.error({ user, password }, "can't be empty!!");
  } else {
    try {
      await instance
        .post('/api/v1/auth/login', { username: user, password })
        .then(res => {
          const { token } = res.data.payload;
          document.cookie = `${token.name}=${token.value}; SameSite=None Secure`;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }
}

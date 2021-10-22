import { isEmpty, instance, getCSRF } from '../utils.js';

export default async function submitForm(e) {
  e.preventDefault();
  const user = e.target[0].value;
  const password = e.target[1].value;

  if (isEmpty(user) || isEmpty(password)) {
    console.error({ user, password }, "can't be empty!!");
  } else {
    try {
      const token = await getCSRF();
      if (!token) throw new Error('Something went wrong');

      await instance
        .post('/api/v1/auth/login', JSON.stringify({ uername: user, password }))
        .then(res => res.data)
        .catch(err => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }
}

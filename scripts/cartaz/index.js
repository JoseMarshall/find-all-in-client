import { instance, getCSRF, isLogged, splitAdress } from '../utils.js';

const form = document.querySelector('#feedback_form');
async function createPosters(e) {
  e.preventDefault();
  const status = e.target[4].value;
  const data = {
    photo: await upload(e.target[0].files[0], 'Photo'),
    disappearanceParticipation: await upload(e.target[1].files[0], 'disappearance'),
    name: e.target[2].value,
    address: splitAdress(e.target[3].value),
    lastSeenAt: e.target[5].value,
    lastSeenAt: e.target[6].value,
    feedback: e.target[7].value,
  };
  console.log(data);
  try {
    await instance
      .post('/api/v1/missing-posters', data)
      .then(res => console.log(res.data))
      .catch(err => console.error(err.response.data));
  } catch (error) {
    console.error(error);
  }
}

async function upload(file, name) {
  try {
    const data = new FormData();

    data.append('file', file);
    data.append('upload_preset', 'find-all-in');
    data.append('cloud_name', 'dev00000000000');
    data.append('api_key', '676152268377562');
    data.append('api_secret', 'P_ZfiipsDjuFpxD8xTZ7NyfDlzA');
    data.append('public_id', name);

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dev00000000000/image/upload',
      data
    );

    // if (res.response.data) throw new Error(res.response.data);

    return res.data.url;
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener('submit', createPosters);

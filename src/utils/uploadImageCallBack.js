import config from './config';

export default function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', config.uploadPath);
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('file', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        const { url } = response.data;
        const result = { data: { link: url } };
        resolve(result);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
        console.log({ error });
      });
    },
  );
}

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  key: '33255151-1ffd8cd89eb97889bbe1379a3',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (search, page) => {
  const response = await axios.get(`/?q=${search}&page=${page}`);
  return response.data;
}

export function pictureValues(data) {
  return data.map(({ id, largeImageURL, webformatURL, tags }) => ({
    id,
    largeImageURL,
    webformatURL,
    tags,
  }));
}

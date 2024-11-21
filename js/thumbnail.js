import { getDescriptionPhotos } from './data';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const descriptionPhotos = getDescriptionPhotos(25);

const fragment = document.createDocumentFragment();

descriptionPhotos.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');
  imageElement.src = url;
  imageElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  fragment.append(pictureElement);
});

picturesList.append(fragment);

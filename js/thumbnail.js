import { getDescriptionPhotos } from './data';
import { showBigPicture } from './full-picture';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const descriptionPhotos = getDescriptionPhotos();

const fragment = document.createDocumentFragment();

const renderPhoto = (picturesList) => {
  descriptionPhotos.forEach((pictureData) => {
    const {url, description, likes, comments} = pictureData;
    const pictureElement = pictureTemplate.cloneNode(true);
    const imageElement = pictureElement.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;
    const likesElement = pictureElement.querySelector('.picture__likes');
    likesElement.textContent = likes;
    const commentElement = pictureElement.querySelector('.picture__comments');
    commentElement.textContent = comments.length;
    fragment.append(pictureElement);

    const onPictureElementClick = (evt) => {
      evt.preventDefault();
      showBigPicture(pictureData);
    };

    pictureElement.addEventListener('click', onPictureElementClick);
  });

  picturesList.append(fragment);
};


export {renderPhoto};


// import './main.js';
import { getComments } from './data.js';
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentShowCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
const bigPictureSocialCount = bigPicture.querySelector('.social__comment-count');
const buttonCancelContainer = bigPicture.querySelector('.big-picture__cancel');
const buttonLoadMore = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

const commentsData = getComments();

const onDocumentKedown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const showBigPicture = (picture) => {
  const {url, likes, comments, description} = picture;

  bigPicture.classList.remove('hidden');
  bigPictureSocialCount.classList.add('hidden');
  buttonLoadMore.classList.add('hidden');
  body.classList.add('modal-open');


  document.addEventListener('keydown', onDocumentKedown);

  bigPictureImage.src = url;
  bigPictureLikesCount.textContent = likes;
  bigPictureCommentShowCount.textContent = comments.length;
  bigPictureCommentTotalCount.textContent = comments.length;
  bigPictureSocialCaption.textContent = description;
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKedown);
}

buttonCancelContainer.addEventListener('click', () => {
  closeBigPicture();
});

const renderComment = (socialCommentsList) => {
  socialCommentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  commentsData.forEach((commentData) => {
    const {avatar, message, name} = commentData;

    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const commentAvatarImage = document.createElement('img');
    commentAvatarImage.classList.add('social__picture');
    commentAvatarImage.src = avatar;
    commentAvatarImage.alt = name;
    commentElement.append(commentAvatarImage);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;
    commentElement.append(commentText);

    fragment.append(commentElement);
  });

  socialCommentsList.append(fragment);
};

export { showBigPicture };
export { renderComment };

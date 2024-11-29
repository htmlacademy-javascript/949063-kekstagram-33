// import './main.js';
import { getComments } from './data.js';
import { isEscapeKey } from './util.js';

//Сколько комментариев показывать
const MAX_SHOW_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const socialCommentsList = document.querySelector('.social__comments');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentShowCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
const bigPictureSocialCount = bigPicture.querySelector('.social__comment-count');
const buttonCancelContainer = bigPicture.querySelector('.big-picture__cancel');
const buttonLoadMore = bigPicture.querySelector('.comments-loader');
const commentLoader = bigPicture.querySelector('.social__comments-loader');
const body = document.querySelector('body');
//Сколько комментариев показываем
let commentsCount = MAX_SHOW_COMMENTS;
//Копия массива
const currentComments = [];

const commentsData = getComments();

const onDocumentKedown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    oncloseBigPicture();
  }
};

const createBigPictureComment = ({avatar, message, name}) => {
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

  return commentElement;
};

const renderComments = (comments) => {

  socialCommentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createBigPictureComment(comment);
    fragment.append(commentElement);
  });

  socialCommentsList.append(fragment);
  console.log(socialCommentsList);
};

const showBigPicture = (pictureData) => {
  const {url, likes, comments, description} = pictureData;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  renderComments(pictureData.comments);

  bigPictureImage.src = url;
  bigPictureLikesCount.textContent = likes;
  bigPictureCommentShowCount.textContent = comments.length;
  bigPictureCommentTotalCount.textContent = comments.length;
  bigPictureSocialCaption.textContent = description;

  document.addEventListener('keydown', onDocumentKedown);
};

function oncloseBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKedown);
}

buttonCancelContainer.addEventListener('click', () => {
  oncloseBigPicture();
});

// const renderComment = (socialCommentsList) => {
//   socialCommentsList.innerHTML = '';
//   const fragment = document.createDocumentFragment();

//   commentsData.forEach((commentData) => {
//     const {avatar, message, name} = commentData;

// const commentElement = document.createElement('li');
// commentElement.classList.add('social__comment');

// const commentAvatarImage = document.createElement('img');
// commentAvatarImage.classList.add('social__picture');
// commentAvatarImage.src = avatar;
// commentAvatarImage.alt = name;
// commentElement.append(commentAvatarImage);

// const commentText = document.createElement('p');
// commentText.classList.add('social__text');
// commentText.textContent = message;
// commentElement.append(commentText);

// fragment.append(commentElement);
//   });

//   socialCommentsList.append(fragment);
// };

export { showBigPicture };
// export { renderComment };

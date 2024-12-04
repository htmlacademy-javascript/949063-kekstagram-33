import { isEscapeKey } from './util.js';

const HASHTAGS_IS_VALID = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_LENGTH_HASHTAGS = 5;
const MAX_WORDS_COMMENT = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const overlay = imgUploadForm.querySelector('.img-upload__overlay');
const buttonCancelOverlay = overlay.querySelector('.img-upload__cancel');
const inputHashtags = overlay.querySelector('.text__hashtags');
const fieldComment = overlay.querySelector('.text__description');

const body = document.querySelector('body');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  erroTextClass: 'img-upload__field-wrapper--error',
}, false);

// Открытие и закрытие оверлея
const closeOverlay = () => {
  imgUploadForm.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

// const textFieldActive = () => document.activeElement === inputHashtags || document.activeElement === fieldComment;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeOverlay();
  }
}

function onFocusKeydown(evt) {
  evt.stopPropagation();
}

inputHashtags.addEventListener('keydown', onFocusKeydown);
fieldComment.addEventListener('keydown', onFocusKeydown);

const showOverlay = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const onUploadFileChange = () => {
  showOverlay();
};

const onButtonCancelOverlayClick = () => {
  closeOverlay();
};

buttonCancelOverlay.addEventListener('click', onButtonCancelOverlayClick);
uploadFile.addEventListener('change', onUploadFileChange);

// Проверка на валидность максимальной длинны поля ввода комментариев
const validateComment = (comment) => MAX_WORDS_COMMENT >= comment.length;

// Проверка на повторяющиеся хештеги
const isUniqueHashtags = (value) => {
  const hashtagsLowerCase = value.toLowerCase().split(' ');
  return hashtagsLowerCase.length === new Set(hashtagsLowerCase).size;
};

const validateHashtags = (value) => {
  const hashtags = value.split(' ');
  return hashtags.every((hashtag) => (!hashtags[0] || HASHTAGS_IS_VALID.test(hashtag))) && hashtags.length <= MAX_LENGTH_HASHTAGS && isUniqueHashtags(value);
};

pristine.addValidator(inputHashtags, validateHashtags, 'Невырно введенный хештег');
pristine.addValidator(fieldComment, validateComment, `Максимальное количество символов ${MAX_WORDS_COMMENT}`);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    imgUploadForm.submit();
  }
});

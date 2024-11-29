import './full-picture.js';
import './thumbnail.js';
import {renderPhoto} from './thumbnail.js';
// import {renderComment} from './full-picture.js';

const picturesList = document.querySelector('.pictures');
renderPhoto(picturesList);
// const socialCommentsList = document.querySelector('.social__comments');
// renderComment(socialCommentsList);

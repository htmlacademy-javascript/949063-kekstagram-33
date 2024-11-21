import { getRandomElement, getRandomInteger } from './util.js';
import { commentId } from './util.js';
import { randomIdPhoto } from './util.js';
import { randomUrlPhoto } from './util.js';

const DESCRIPTION = [
  'Хорошая погода',
  'Выбрать две',
  'Красивый пейзаж',
  'На закате',
  'На пляже',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Владимир',
  'Света',
  'Олег',
  'Алексей',
  'Наталья',
  'Радион',
  'Мария',
];

const MIN_LIKES = 15;
const MAX_LIKES = 25;

// Создания объекта коментарий
const creatCommentsList = function () {
  return {
    id: commentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg}`,
    message: getRandomElement(MESSAGE),
    name: getRandomElement(NAME),
  };
};

// Создаем 30 новых экзепляров объекта коментарий
const getComments = () => Array.from({length: getRandomInteger(0, 30)}, creatCommentsList);

// Создаем объект описания фотографий
const createDescriptionPhoto = function () {
  return {
    id: randomIdPhoto(),
    url: `photos/${randomUrlPhoto()}.jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: getComments(getRandomInteger(0,30)),
  };
};

// Создаем 25 новых экземпляров объекта описания фотографий
const getDescriptionPhotos = (count) => Array.from({length: count}, createDescriptionPhoto);

export {getDescriptionPhotos};

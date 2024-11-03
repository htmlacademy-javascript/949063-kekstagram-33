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

const MIN_ID_PHOTO = 1;
const MAX_ID_PHOTO = 25;

const MIN_URL_PHOTO = 1;
const MAX_URL_PHOTO = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 25;

// Генерация случайного целочисленного числа с диапозоном
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция создает идентификатор к коментарию
const getNonrepitionInteger = function () {
  let index = 0;
  return function () {
    ++index;
    return index;
  };
};
const nonRepitionInteger = getNonrepitionInteger();

//Функция для случайного неповторяющегося числа
const getRandomNonrepitionInteger = (min,max) => {
  const randomNumber = [];
  return function () {
    let currentNumber = getRandomInteger(min,max);
    if (randomNumber.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (randomNumber.includes(currentNumber)) {
      currentNumber = getRandomInteger(min,max);
    }
    randomNumber.push(currentNumber);
    return currentNumber;
  };
};

const randomIdPhoto = getRandomNonrepitionInteger(MIN_ID_PHOTO, MAX_ID_PHOTO);
const randomUrlPhoto = getRandomNonrepitionInteger(MIN_URL_PHOTO, MAX_URL_PHOTO);

//Функция для чоздания случайного элемента
const getRandomElement = function (element) {
  return element[getRandomInteger(0, element.length - 1)];
};

// Создания объекта коментарий
const creatCommentsList = function () {
  return {
    id: nonRepitionInteger(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg}`,
    message: getRandomElement(MESSAGE),
    name: getRandomElement(NAME),
  };
};

// Создаем 30 новых экзепляров объекта коментарий
const comments = () => Array.from({length: getRandomInteger(0, 30)}, creatCommentsList);

// Создаем объект описания фотографий
const createDescriptionPhoto = function () {
  return {
    id: randomIdPhoto(),
    url: `photos/${randomUrlPhoto()}.jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: comments(getRandomInteger(0,30)),
  };
};

// Создаем 25 новых экземпляров объекта описания фотографий
const descriptionPhotos = Array.from({length: 25}, createDescriptionPhoto);

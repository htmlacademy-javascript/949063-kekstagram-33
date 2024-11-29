const MIN_ID_PHOTO = 1;
const MAX_ID_PHOTO = 25;

const MIN_URL_PHOTO = 1;
const MAX_URL_PHOTO = 25;

// Генерация случайного целочисленного числа с диапозоном
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция создает идентификатор к коментарию
const getCommentId = function () {
  let index = 0;
  return function () {
    ++index;
    return index;
  };
};
const commentId = getCommentId();

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

//Функция для чоздания случайного элемента
const getRandomElement = function (element) {
  return element[getRandomInteger(0, element.length - 1)];
};

const randomIdPhoto = getRandomNonrepitionInteger(MIN_ID_PHOTO, MAX_ID_PHOTO);
const randomUrlPhoto = getRandomNonrepitionInteger(MIN_URL_PHOTO, MAX_URL_PHOTO);

const isEscapeKey = (evt) => evt.key === 'Escape';
export {getRandomInteger, isEscapeKey, commentId, randomIdPhoto, randomUrlPhoto, getRandomElement};

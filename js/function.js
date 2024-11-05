const getLengthString = function (string, maxLength) {
  return string.length <= maxLength;
};

// Строка короче 20 символов
getLengthString('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
getLengthString('проверяемая строка', 18); // true
// Строка длиннее 10 символов
getLengthString('проверяемая строка', 10); // false


const checkStringPalindrome = function (polindromString) {
  const normalString = polindromString.replaceAll(' ', '').toUpperCase();
  let reversString = '';

  for (let i = normalString.length - 1; i >= 0 ; i--) {
    reversString += normalString.at(i);
  }

  const isPolindrom = reversString === normalString;
  return isPolindrom;
};

// Строка является палиндромом
checkStringPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkStringPalindrome('ДовОд'); // true
// Это не палиндром
checkStringPalindrome('Кекс'); // false
// Это палиндром
checkStringPalindrome('Лёша на полке клопа нашёл '); // true

const checkStringOnNumber = function (string) {
  let newString = '';
  for (let i = 0; i < string.length; i++) {

    const parseString = parseInt(string[i], 10);

    if (!Number.isNaN(parseString)) {
      newString += string[i];
    }
  }
  return newString;
};

checkStringOnNumber('2023 год'); // 2023
checkStringOnNumber('ECMAScript 2022'); // 2022
checkStringOnNumber('1 кефир, 0.5 батона'); // 105
checkStringOnNumber('агент 007'); // 7
checkStringOnNumber('а я томат'); // NaN

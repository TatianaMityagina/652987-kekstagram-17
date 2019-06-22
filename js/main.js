'use strict';

var PHOTOS_QUANTITY = 25;

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var AUTHORS = ['Рома', 'Кира', 'Саша', 'Макар', 'Рита', 'Марк'];

// Находим DOM-элемент, куда будем вставлять фото
var similarListElement = document.querySelector('.pictures');


// Находим шаблон изображения случайного пользователя
var photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


// Получаем рандомное число от min до max
var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (arr) {
  return arr[getRandomFromInterval(0, arr.length)];
};

// Создаем комментарий
var createComment = function () {
  var comments = [];
  for (var i = 0; i < getRandomFromInterval(1, 7); i++) {
    comments[i] = {
      avatar: 'img/avatar-{{n}}.svg'.replace('{{n}}', getRandomFromInterval(1, 6)),
      message: getRandomElement(MESSAGES),
      name: getRandomElement(AUTHORS)
    };
  }
  return comments;
};

// Создаем массив фотографий с заполненными данными
var generatePhotosArray = function (quantity) {
  var photos = [];

  for (var i = 0; i < quantity; i++) {
    photos.push({
      url: 'photos/{{i}}.jpg'.replace('{{i}}', i + 1),
      likes: getRandomFromInterval(15, 200),
      comments: createComment()
    });
  }
  return photos;
};

// Создадим новый DOM-элемент с фото
var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

// В функции  создадим цикл с несколькими фото и добавим в DocumentFragment
var renderPhotos = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPhoto(array[i]));
  }
  similarListElement.appendChild(fragment);
};

var photos = generatePhotosArray(PHOTOS_QUANTITY);
renderPhotos(photos);

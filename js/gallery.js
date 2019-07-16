'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var debounce = window.debounce;
  var filtersFormElemet = document.querySelector('.img-filters__form');
  var imgFiltersElement = document.querySelector('.img-filters');
  var picContainerElement = document.querySelector('.pictures');
  var picturesInfo = [];

  // Находим шаблон изображения случайного пользователя
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  // Создадим новый DOM-элемент с фото
  var renderPicture = function (params) {
    var element = pictureTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = params.url;
    element.querySelector('.picture__comments').textContent = params.comments.length;
    element.querySelector('.picture__likes').textContent = params.likes;
    pictureTemplate.appendChild(element);
    return element;
  };

  var renderPictures = function (array) {
    var fragment = document.createDocumentFragment();
    var picturesBlock = document.querySelector('.pictures');

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPicture(array[i]));
    }

    picturesBlock.appendChild(fragment);
  };

  // Функция для удаления всех элементов из родителя
  var removePictures = function () {
    var picturesToRemove = picContainerElement.querySelectorAll('.picture');
    picturesToRemove.forEach(function (item) {
      picContainerElement.removeChild(item);
    });
  };

  var activateFilter = debounce(function (e) {
    removePictures();
    renderPictures(changeFilter(e, picturesInfo));
  });

  var filterPopular = function (enterData) {
    return enterData;
  };

  // Функция для сортировки и показа фотографий по обсуждаемости
  var filterDiscussed = function (enterData) {
    var discussedEnterData = enterData.slice();
    discussedEnterData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedEnterData;
  };

  // Функция для показа новых фотографий (в случайном порядке)
  var filterNew = function (enterData) {
    var randomEnterData = enterData.slice();
    randomEnterData.sort(function () {
      return Math.random() - 0.5;
    });
    randomEnterData.length = 10;
    return randomEnterData;
  };

  var successHandler = function (array) {
    picturesInfo = array;
    imgFiltersElement.classList.remove('img-filters--inactive');
    renderPictures(picturesInfo);
    return picturesInfo;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var idToFilter = {
    'filter-popular': filterPopular,
    'filter-new': filterNew,
    'filter-discussed': filterDiscussed
  };

  // Функция для смены класса на активном элементе и удаления предыдущей выборки фото
  var changeFilter = function (evt, jsonData) {
    var imgFiltersButton = filtersFormElemet.querySelectorAll('.img-filters__button');
    var result = idToFilter[evt.target.id];

    imgFiltersButton.forEach(function (it) {
      it.classList.remove('img-filters__button--active');
    });

    evt.target.classList.add('img-filters__button--active');

    return result(jsonData);
  };

  window.backend.load(DATA_URL, successHandler, errorHandler);

  imgFiltersElement.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('img-filters__button')) {
      activateFilter(evt);
    }
  });

  // Открытие большой версии изображения

  var getPicture = function (node) {
    return picturesInfo.find(function (picture) {
      return picture.url === node.attributes.src.nodeValue;
    });
  };

  picContainerElement.addEventListener('click', function (evt) {

    if (evt.target.classList.contains('picture__img')) {
      var picture = getPicture(evt.target);
      window.showBigPicture(picture);
    }
  });

})();

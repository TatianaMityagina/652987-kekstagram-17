'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var SIZE_STEP = 25;
  var MAX_VALUE = 100;
  var MIN_VALUE = 25;

  var imageSizeElement = document.querySelector('.scale__control--value'); // Масштаб изображения
  var imagePreviewElement = document.querySelector('.img-upload__preview'); // Предварительный просмотр фотографии
  var zoomOutPhoto = document.querySelector('.scale__control--smaller'); // Кнопка уменьшения масштаба
  var zoomInPhoto = document.querySelector('.scale__control--bigger'); // Кнопка увеличения масштаба
  var scaleValue = 100;

  // Функция увеличения масштаба
  var moveUpScale = function (value) {
    value += SIZE_STEP;
    if (value > MAX_VALUE) {
      value = MAX_VALUE;
    }
    return value;
  };

  var moveDownScale = function (value) {
    value -= SIZE_STEP;
    if (value < MIN_VALUE) {
      value = MIN_VALUE;
    }
    return value;
  };

  var onScaleSmallerClick = function () {
    scaleValue = moveDownScale(scaleValue);
    imageSizeElement.value = scaleValue + '%';
    imagePreviewElement.style = 'transform: scale(' + scaleValue / MAX_VALUE + ');';
  };

  var onScaleBiggerClick = function () {
    scaleValue = moveUpScale(scaleValue);
    imageSizeElement.value = scaleValue + '%';
    imagePreviewElement.style = 'transform: scale(' + scaleValue / MAX_VALUE + ');';
  };

  zoomOutPhoto.addEventListener('click', function () {
    onScaleSmallerClick();
  });

  zoomOutPhoto.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onScaleSmallerClick();
    }
  });

  zoomInPhoto.addEventListener('click', function () {
    onScaleBiggerClick();
  });

  zoomInPhoto.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onScaleBiggerClick();
    }
  });
})();

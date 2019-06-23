'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var upload = document.querySelector(' #upload-file');
var overlay = document.querySelector('.img-upload__overlay');
var overlayClose = overlay.querySelector('.img-upload__cancel');
var imageUploadScale = document.querySelector('.img-upload__scale'); // Блок кнопок изменения масштаба
var imageSize = document.querySelector('.scale__control--value'); // Масштаб изображения
var slider = document.querySelector('.effect-level'); // Ползунок изменения глубины эффекта, накладываемого на изображение
var descriptionField = overlay.querySelector('.text__description');
var descriptionFieldFocus = false;

// При нажатии ESC форма редактирования изображения закроется
var onPopupEscPress = function (evt) {
  if (!descriptionFieldFocus && evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Определяем функцию при которой поле комментария в фокусе
var onDescriptionFocus = function () {
  descriptionFieldFocus = true;
};

// Определяем функцию при которой поле комментария не в фокусе
var onDescriptionFocusout = function () {
  descriptionFieldFocus = false;
};

// При открытии окна:
var openPopup = function () {
  overlay.classList.remove('hidden'); // удаляем стили скрывающие окно
  document.addEventListener('keydown', onPopupEscPress); // отлавливаем событие при ктором окно закроется
  descriptionField.addEventListener('focus', onDescriptionFocus);
  descriptionField.addEventListener('focusout', onDescriptionFocusout);
  imageUploadScale.style.visibility = 'visible'; // отображаем блок кнопок масштабирования
  slider.style.visibility = 'hidden'; // скрываем ползунок
  imageSize.value = '100%'; // изначально задаем 100% масштаб изображению
};

upload.addEventListener('change', function (evt) {
  evt.preventDefault();
  openPopup();
});

var closePopup = function () {
  overlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  descriptionField.removeEventListener('focus', onDescriptionFocus);
  descriptionField.removeEventListener('focusout', onDescriptionFocusout);
};

overlayClose.addEventListener('click', function () {
  closePopup();
});

overlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});



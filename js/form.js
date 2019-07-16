'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var uploadBtnElement = document.querySelector(' #upload-file');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var overlayClose = uploadOverlayElement.querySelector('.img-upload__cancel');
  var imageUploadScaleElement = document.querySelector('.img-upload__scale'); // Блок кнопок изменения масштаба
  var imageSizeValueElement = document.querySelector('.scale__control--value'); // Масштаб изображения
  var sliderElement = document.querySelector('.effect-level'); // Ползунок изменения глубины эффекта, накладываемого на изображение
  var descriptionFieldElement = uploadOverlayElement.querySelector('.text__description');
  var hashtagsFieldElement = document.querySelector('.text__hashtags');
  var descriptionFieldFocus = false;

  // При нажатии ESC форма редактирования изображения закроется
  var onPopupEscPress = function (evt) {
    if (!descriptionFieldFocus && evt.keyCode === ESC_KEYCODE && hashtagsFieldElement !== document.activeElement) {
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
    uploadOverlayElement.classList.remove('hidden'); // удаляем стили скрывающие окно
    document.addEventListener('keydown', onPopupEscPress); // отлавливаем событие при ктором окно закроется
    descriptionFieldElement.addEventListener('focus', onDescriptionFocus);
    descriptionFieldElement.addEventListener('focusout', onDescriptionFocusout);
    imageUploadScaleElement.style.visibility = 'visible'; // отображаем блок кнопок масштабирования
    sliderElement.style.visibility = 'hidden'; // скрываем ползунок
    imageSizeValueElement .value = '100%'; // изначально задаем 100% масштаб изображению
  };

  uploadBtnElement.addEventListener('change', function (evt) {
    evt.preventDefault();
    openPopup();
  });

  var closePopup = function () {
    uploadOverlayElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    descriptionFieldElement.removeEventListener('focus', onDescriptionFocus);
    descriptionFieldElement.removeEventListener('focusout', onDescriptionFocusout);
    hashtagsFieldElement.value = '';
  };

  overlayClose.addEventListener('click', function () {
    closePopup();
  });

  overlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
  window.closePopup = closePopup;
})();



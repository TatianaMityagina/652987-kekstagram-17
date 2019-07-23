'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadBtnElement = document.querySelector(' #upload-file');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var overlayClose = uploadOverlayElement.querySelector('.img-upload__cancel');
  var imagePreviewElement = document.querySelector('.img-upload__preview');
  var effectsPreviewElement = document.querySelectorAll('.effects__preview');
  var imageInPreviewElement = document.querySelector('.img-upload__preview img');
  var imageUploadScaleElement = document.querySelector('.img-upload__scale'); // Блок кнопок изменения масштаба
  var imageSizeValueElement = document.querySelector('.scale__control--value'); // Масштаб изображения
  var sliderElement = document.querySelector('.effect-level'); // Ползунок изменения глубины эффекта, накладываемого на изображение
  var descriptionFieldElement = uploadOverlayElement.querySelector('.text__description');
  var hashtagsFieldElement = document.querySelector('.text__hashtags');
  var descriptionFieldFocus = false;

  // При нажатии ESC форма редактирования изображения закроется
  var onPopupEscPress = function (evt) {
    if (!descriptionFieldFocus && hashtagsFieldElement !== document.activeElement) {
      window.util.isEscEvent(evt, function () {
        closePopup();
      });
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
    imagePreviewElement.style.transform = null; // Масштаб изображения при открытии
    imagePreviewElement.style.filter = null; // Убираю style filter:  из блока по нему задается фильтр
    imagePreviewElement.className = 'img-upload__preview'; // Просто переназначаю все стили на один при открытии окна
  };

  uploadBtnElement.addEventListener('change', function (evt) {
    evt.preventDefault();
    var file = uploadBtnElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageInPreviewElement.src = reader.result;
        effectsPreviewElement.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
        openPopup();
      });

      reader.readAsDataURL(file);
    }
  });

  var closePopup = function () {
    uploadOverlayElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    descriptionFieldElement.removeEventListener('focus', onDescriptionFocus);
    descriptionFieldElement.removeEventListener('focusout', onDescriptionFocusout);
    hashtagsFieldElement.value = '';
    descriptionFieldElement.value = '';
    document.getElementById('upload-select-image').reset();
  };

  overlayClose.addEventListener('click', function () {
    closePopup();
  });

  overlayClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      closePopup();
    });
  });
  window.closePopup = closePopup;
})();



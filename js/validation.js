'use strict';

(function () {

  var MAX_HASHTAG_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagFieldElement = document.querySelector('.text__hashtags');

  var onHashtagsFieldValidate = function () {

    var hashtagsArr = hashtagFieldElement.value.toLowerCase().split(' ').filter(Boolean);

    hashtagFieldElement.addEventListener('input', function () {
      hashtagFieldElement.setCustomValidity('');
      hashtagFieldElement.style.outline = 'none';
    });

    if (hashtagsArr.length > MAX_HASHTAG_COUNT) {
      return 'Нельзя внести больше ' + MAX_HASHTAG_COUNT + ' тегов';
    }

    for (var i = 0; i < hashtagsArr.length; i++) {

      if (hashtagsArr[i] === '#') {
        return 'Хэштег не может состоять из одной решетки';
      }

      if (hashtagsArr[i].length === 2) {
        return 'Хэштег не может состоять из одной буквы';
      }

      if (hashtagsArr[i].charAt(0) !== '#') {
        return 'Хэштег должен начинаться с символа #';
      }

      if (hashtagsArr[i].length > MAX_HASHTAG_LENGTH) {
        return 'Хэштег не может содержать больше ' + MAX_HASHTAG_LENGTH + ' символов';
      }

      var doubleElemnt = hashtagsArr.indexOf(hashtagsArr[i], i + 1);

      if (doubleElemnt !== -1) {
        return 'Хэштеги не могут повторяться';
      }

      if (hashtagsArr[i].indexOf('#', 1) !== -1) {
        return 'Хэштеги должны разделяться пробелом';
      }
    }

    return '';
  };

  var highlightValidation = function (validationMessage, validatedField) {
    if (validationMessage) {
      validatedField.style.outline = '2px solid red';
      validatedField.setCustomValidity(validationMessage);
    }
  };

  var onSubmitValidate = function () {
    highlightValidation(onHashtagsFieldValidate(), hashtagFieldElement);
  };

  window.onSubmitValidate = onSubmitValidate;

})();

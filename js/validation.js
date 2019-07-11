'use strict';

(function () {

  var MAX_HASHTAG_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagsField = document.querySelector('.text__hashtags');

  var onHashtagsFieldValidate = function () {

    var hashtagsArray = hashtagsField.value.split(' ').filter(Boolean);

    hashtagsField.addEventListener('input', function () {
      hashtagsField.setCustomValidity('');
      hashtagsField.style.outline = 'none';
    });

    if (hashtagsArray.length > MAX_HASHTAG_COUNT) {
      return 'Нельзя внести больше ' + MAX_HASHTAG_COUNT + ' тегов';
    }

    for (var i = 0; i < hashtagsArray.length; i++) {

      if (hashtagsArray[i] === '#') {
        return 'Хэштег не может состоять из одной решетки';
      } else if (hashtagsArray[i].length === 2) {
        return 'Хэштег не может состоять из одной буквы';
      } else if (hashtagsArray[i].charAt(0) !== '#') {
        return 'Хэштег должен начинаться с символа #';
      } else if (hashtagsArray[i].length > MAX_HASHTAG_LENGTH) {
        return 'Хэштег не может содержать больше ' + MAX_HASHTAG_LENGTH + ' символов';
      }

      var doubleElemnt = hashtagsArray.indexOf(hashtagsArray[i], i + 1);

      if (doubleElemnt !== -1) {
        return 'Хэштеги не могут повторяться';
      }

      if (hashtagsArray[i].indexOf('#', 1) !== -1) {
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
    highlightValidation(onHashtagsFieldValidate(), hashtagsField);
  };

  window.onSubmitValidate = onSubmitValidate;

})();

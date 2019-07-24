'use strict';

(function () {
  var bodyElement = document.querySelector('body');
  var successTypeMessageElement = document.querySelector('#success');
  var errorTypeMessageElement = document.querySelector('#error');
  var cloneGoodMessageElement = successTypeMessageElement.content.cloneNode(true);
  var cloneBadMessageElement = errorTypeMessageElement.content.cloneNode(true);
  var successMessageElement = cloneGoodMessageElement.querySelector('.success');
  var failMessageElement = cloneBadMessageElement.querySelector('.error');
  var successButtonElement = successMessageElement.querySelector('.success__button');
  var successInnerElement = successMessageElement.querySelector('.success__inner');
  var successTitleElement = successMessageElement.querySelector('.success__title');
  var errorInnerElement = failMessageElement.querySelector('.error__inner');
  var errorTitleElement = failMessageElement.querySelector('.error__title');
  var errorButtonsBlockElement = failMessageElement.querySelector('.error__buttons');
  var mainElement = document.querySelector('main');
  var formElement = document.querySelector('.img-upload__form');
  var hashtagFieldElement = document.querySelector('.text__hashtags');
  var submitBtnElement = document.querySelector('.img-upload__submit');
  var backend = window.backend;
  var onSubmitValidate = window.onSubmitValidate;
  var closePopup = window.closePopup;

  window.addEventListener('load', function () {
    successMessageElement.classList.add('visually-hidden');
    failMessageElement.classList.add('visually-hidden');
    mainElement.appendChild(successMessageElement);
    mainElement.appendChild(failMessageElement);
  });

  var onBodyClick = function (evt) {
    if (evt.target !== successInnerElement && evt.target !== errorInnerElement && evt.target !== successTitleElement && evt.target !== errorTitleElement) {
      closePopupMessage();
    }
  };

  var closePopupMessage = function () {
    if (!successMessageElement.classList.contains('visually-hidden')) {
      successMessageElement.classList.add('visually-hidden');
    }

    if (!failMessageElement.classList.contains('visually-hidden')) {
      failMessageElement.classList.add('visually-hidden');
    }

    document.removeEventListener('keydown', onMessageEscPress);
    bodyElement.removeEventListener('click', onBodyClick);
  };

  var onMessageEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      closePopupMessage();
    });
  };

  var openSuccessPopup = function () {
    successMessageElement.classList.remove('visually-hidden');
    document.addEventListener('keydown', onMessageEscPress);
    bodyElement.addEventListener('click', onBodyClick);
  };

  var openErrorPopup = function () {
    failMessageElement.classList.remove('visually-hidden');
    document.addEventListener('keydown', onMessageEscPress);
    bodyElement.addEventListener('click', onBodyClick);
  };

  successButtonElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      closePopupMessage();
    });
  });

  successButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopupMessage();
  });

  errorButtonsBlockElement.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (evt.target.textContent === 'Попробовать снова') {
      closePopupMessage();
      backend.save(new FormData(formElement), sendSuccessHandler, sendErrorHandler);
    } else {
      closePopupMessage();
    }
  });

  errorButtonsBlockElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      if (evt.target.textContent === 'Попробовать снова') {
        closePopupMessage();
        backend.save(new FormData(formElement), sendSuccessHandler, sendErrorHandler);
      } else {
        closePopupMessage();
      }
    });
  });

  // Отправка формы
  var sendSuccessHandler = function () {
    openSuccessPopup();
  };

  var sendErrorHandler = function () {
    openErrorPopup();
  };

  submitBtnElement.addEventListener('click', function () {
    onSubmitValidate();
  });

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (!hashtagFieldElement.validationMessage) {
      backend.save(new FormData(formElement), sendSuccessHandler, sendErrorHandler);
      closePopup();
    }
  });

})();

'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var cancelBigPicture = document.querySelector('.big-picture__cancel');
  var bigPictureElement = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var commentCountElement = document.querySelector('.social__comment-count');
  var commentsLoaderElement = document.querySelector('.comments-loader');
  var createCommentsBlock = window.createCommentsBlock;
  var hideCommentsInfo = window.hideCommentsInfo;

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  window.showBigPicture = function (pictureData) {
    bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
    bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
    bigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = pictureData.description;
    createCommentsBlock(pictureData.comments);
    if (pictureData.comments.length < 5) {
      hideCommentsInfo();
    } else {
      commentCountElement.childNodes[0].data = '5 из ';
    }

    body.classList = 'modal-open';
    bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    document.querySelector('.img-upload__input').value = '';
    body.classList = '';
    document.removeEventListener('keydown', onBigPictureEscPress);
    commentsLoaderElement.classList.remove('visually-hidden');
    commentCountElement.classList.remove('visually-hidden');
  };

  cancelBigPicture.addEventListener('click', function () {
    closeBigPicture();
  });

  cancelBigPicture.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeBigPicture();
    }
  });

})();

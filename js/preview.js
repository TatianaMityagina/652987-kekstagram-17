'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var cancelBigPicture = document.querySelector('.big-picture__cancel');
  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var commentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var createCommentsBlock = window.createCommentsBlock;
  var hideCommentsInfo = window.hideCommentsInfo;

  var onBigPictureEscPress = function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  window.showBigPicture = function (pictureData) {
    bigPicture.querySelector('.big-picture__img img').src = pictureData.url;
    bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
    bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pictureData.description;
    createCommentsBlock(pictureData.comments);
    if (pictureData.comments.length < 5) {
      hideCommentsInfo();
    } else {
      commentCount.childNodes[0].data = '5 из ';
    }

    body.classList = 'modal-open';
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    document.querySelector('.img-upload__input').value = '';
    body.classList = '';
    document.removeEventListener('keydown', onBigPictureEscPress);
    commentsLoader.classList.remove('visually-hidden');
    commentCount.classList.remove('visually-hidden');
  };

  cancelBigPicture.addEventListener('click', function () {
    closeBigPicture();
  });

  cancelBigPicture.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closeBigPicture();
    }
  });

})();

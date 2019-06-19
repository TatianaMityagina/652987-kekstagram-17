'use strict';

(function () {

  var imagePreview = document.querySelector('.img-upload__preview'); // Предварительный просмотр фотографии

  var changeIntensityLevel = function (intensityValue) {
    if (imagePreview.classList.contains('effects__preview--chrome')) {
      imagePreview.style.filter = 'grayscale(' + intensityValue + ')';
    } else if (imagePreview.classList.contains('effects__preview--sepia')) {
      imagePreview.style.filter = 'sepia(' + intensityValue + ')';
    } else if (imagePreview.classList.contains('effects__preview--marvin')) {
      imagePreview.style.filter = 'invert(' + (intensityValue * 100) + '%)';
    } else if (imagePreview.classList.contains('effects__preview--phobos')) {
      imagePreview.style.filter = 'blur(' + (intensityValue * 3) + 'px)';
    } else if (imagePreview.classList.contains('effects__preview--heat')) {
      imagePreview.style.filter = 'brightness(' + (1 + intensityValue * 3) + ')';
    } else if (imagePreview.classList.contains('effects__preview--chrome')) {
      imagePreview.style.filter = 'grayscale(' + intensityValue + ')';
    } else if (imagePreview.classList.contains('effects__preview--none')) {
      imagePreview.style.filter = '';
    }
  };

  window.contentSlider(changeIntensityLevel);

})();

'use strict';

(function () {

  var imageUploadPreviewElement = document.querySelector('.img-upload__preview'); // Предварительный просмотр фотографии

  var changeIntensityLevel = function (intensityValue) { // Для изменения уровня интенсивности

    var classToIntensity = { // Задаем переменную содержащую объект (виды фильтров)
      'effects__preview--chrome': 'grayscale(' + intensityValue + ')',
      'effects__preview--sepia': 'sepia(' + intensityValue + ')',
      'effects__preview--marvin': 'invert(' + (intensityValue * 100) + '%)',
      'effects__preview--phobos': 'blur(' + (intensityValue * 3) + 'px)',
      'effects__preview--heat': 'brightness(' + (1 + intensityValue * 3) + ')',
      'effects__preview--none': 'none'
    };

    imageUploadPreviewElement.classList.forEach(function (className) {
      var result = classToIntensity[className];

      if (result) {
        imageUploadPreviewElement.style.filter = result;
      }
    });
  };

  window.changeIntensityLevel = changeIntensityLevel;

})();

'use strict';

(function () {

  var slider = document.querySelector('.effect-level'); // Окно глубины эффекта, накладываемого на изображение
  var sliderLine = slider.querySelector('.effect-level__line'); // Линия измененимя интенсивности
  var sliderPin = slider.querySelector('.effect-level__pin'); // Ползунок
  var sliderEffect = slider.querySelector('.effect-level__depth'); // Уровень интенсивности
  var effectsList = document.querySelector('.effects__list'); // Список фильтров
  var imagePreview = document.querySelector('.img-upload__preview'); // Предварительный просмотр фотографии

  // При выполнении событий данной функции изменяется фильтр фотографии
  var initSlider = function () {

    // При нажатии на поле с фильтрами происходит следующее:
    effectsList.addEventListener('click', function (evt) {
      sliderPin.style.left = '100%'; // Уровень на котором стоит ползунок
      sliderEffect.style.width = '100%'; // Уровень линии интенсивности

      // Если эффект отсутствует, то
      if (effectsList.querySelector('#effect-none').checked) {
        slider.style.visibility = 'hidden'; // Поле изменения интенсивности скрыто
      } else {
        slider.style.visibility = 'visible'; // В обратном случает поле отображается
      }

      // В случае если при нажатии на поле оно содержит класс 'effects__preview'
      if (evt.target.classList.contains('effects__preview')) {
        imagePreview.classList = 'img-upload__preview';
        imagePreview.classList.add(evt.target.classList[1]); // Мы добавляем класс с эффектом в пердварительный просмотр
        window.changeIntensityLevel(1); // А функции задаем значение интенсивности
      }
    });

    // Обработаем событие начала перетаскивания ползунка
    sliderPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = evt.clientX; // Координаты точки, с которой мы начали перемещать

      // При каждом движении мыши обновляем смещение ползунка относительно первоначальной точки
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoords - moveEvt.clientX; // Вычисляем изменение на которое ползунок передвинулся

        // Вычисляем значение интен. отностительно рпасположения поолзунка
        // и округляем до десятых
        var sliderValue = (sliderPin.offsetLeft / sliderLine.offsetWidth).toFixed(1);

        startCoords = moveEvt.clientX; // Первоначальная точка перемещения равна растоянию на которое она перместилась

        if (sliderPin.offsetLeft - shift >= 0 && sliderPin.offsetLeft - shift <= sliderLine.offsetWidth) {
          sliderPin.style.left = (sliderPin.offsetLeft - shift) + 'px';
          sliderEffect.style.width = (sliderPin.offsetLeft) + 'px';
        }

        window.changeIntensityLevel(sliderValue);
      };

      // При отпускании кнопки мыши нужно переставать слушать события движения мыши
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      // Обработчики события передвижения мыши и отпускания кнопки мыши
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  initSlider();
})();

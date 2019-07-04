'use strict';

(function () {

  var filtersForm = document.querySelector('.img-filters__form');

  var filterPopular = function (enterData) {
    return enterData;
  };

  var filterNew = function (enterData) {
    var randomEnterData = enterData.slice();
    randomEnterData.sort(function () {
      return Math.random() - 0.5;
    });
    randomEnterData.length = 10;
    return randomEnterData;
  };

  var filterDiscussed = function (enterData) {
    var discussedEnterData = enterData.slice();
    discussedEnterData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedEnterData;
  };

  var idToFilter = {
    'filter-popular': filterPopular,
    'filter-new': filterNew,
    'filter-discussed': filterDiscussed
  };

  var changeFilter = function (evt, jsonData) {
    var imgFiltersButton = filtersForm.querySelectorAll('.img-filters__button');
    var result = idToFilter[evt.target.id];

    imgFiltersButton.forEach(imgFiltersButton, function (it) {
      it.classList.remove('img-filters__button--active');
    });

    evt.target.classList.add('img-filters__button--active');

    return result(jsonData);
  };

  window.changeFilter = changeFilter;

})();

'use strict';
var PHOTOS_AMUNT = 25;
var randomInteger = function (pow) {
  return Math.floor(Math.random() * pow);
};

var generatePhoto = function () {
  var photos = [];
  for (var i = 1; i <= PHOTOS_AMUNT; i++) {
    photos.push({
      url: 'photos/' + i + '.jpg',
      deskription: 'описание фотографии',
      likes: randomInteger(15, 200),
      comments: generateComments()
    });
  }
  return photos;
};

var generateComments = function () {
  var createFragment = [];
  for (var i = 1; i < PHOTOS_AMUNT; i++) {
    createFragment.push({
      avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: randomInteger(1, 6)
    });
  }
  return createFragment;
};

var pictures = document.querySelector('#picture');
pictures.append(generatePhoto);

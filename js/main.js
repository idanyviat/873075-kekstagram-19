'use strict';
var PHOTOS_AMUNT = 25;
var BODY_ADD = document.querySelector('body');
var COMMENT_MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var photoList = document.querySelector('.pictures');
var bigphotoElement = document.querySelector('.big-picture');
var bigphotoHidden = document.querySelector('.social__comment-count', '.comments-loader');

var getRandomArbitrary = function (min, max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomFromArray = function (arr) {
  return arr[getRandomArbitrary(0, arr.length)];
};


var generatePhoto = function () {
  var photos = [];
  for (var i = 1; i <= PHOTOS_AMUNT; i++) {
    photos.push({
      url: 'photos/' + i + '.jpg',
      deskription: 'описание фотографии',
      likes: getRandomArbitrary(15, 200),
      comments: generateComments()
    });
  }
  return photos;
};

var generateComments = function () {
  var createFragment = [];
  for (var i = 1; i < PHOTOS_AMUNT; i++) {
    createFragment.push({
      avatar: 'img/avatar-' + getRandomArbitrary(1, 6) + '.svg',
      message: getRandomFromArray(COMMENT_MESSAGE),
      name: getRandomArbitrary(1, 6)
    });
  }
  return createFragment;
};

var renderPhoto = function (photoData) {
  var generateImage = photoTemplate.cloneNode(true);
  generateImage.querySelector('.picture__img').src = photoData.url;
  generateImage.querySelector('.picture__likes').textContent = photoData.likes;
  generateImage.querySelector('.picture__comments').textContent = photoData.comments;
  return generateImage;
};

var bigPhoto = function (bigphotoData) {
  var generateImage = photoTemplate.cloneNode(true);
  generateImage.querySelector('.big-picture__img').src = bigphotoData.url;
  generateImage.querySelector('.likes-count').textContent = bigphotoData.likes;
  generateImage.querySelector('.comments-count').textContent = bigphotoData.comments;
  return generateImage;
};

var craftPhoto = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
    fragment.appendChild(bigPhoto(photos[i]));
  }
  photoList.appendChild(fragment);
};

var init = function () {
  bigphotoElement.classList.remove('hidden');
  bigphotoHidden.classList.add('hidden');
  BODY_ADD.classList.add('.modal-open');
  var photos = generatePhoto();
  craftPhoto(photos);
};

init();

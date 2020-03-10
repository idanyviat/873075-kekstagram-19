'use strict';
var PHOTOS_AMUNT = 25;
var COMMENT_MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var photoList = document.querySelector('.pictures');
var bigphotoElement = document.querySelector('.big-picture');
var bigPhotoCancel = document.querySelector('.big-picture__cancel');
var bigphotoHidden = document.querySelector('.social__comment-count, .comments-loader');
var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');


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
  for (var i = 0; i < getRandomArbitrary(1, 6); i++) {
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
  var generateImage = bigphotoElement;
  generateImage.querySelector('.big-picture__img img').src = bigphotoData.url;
  generateImage.querySelector('.likes-count').textContent = bigphotoData.likes;
  generateImage.querySelector('.social__caption').textContent = bigphotoData.deskription;
  var comments = generateImage.querySelector('.social__comments');
  var commentsNode = craftComments(bigphotoData.comments);
  comments.innerHTML = '';
  comments.appendChild(commentsNode);
  return generateImage;
};

var craftPhoto = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  photoList.appendChild(fragment);
};

var craftComments = function (comments) {
  var commentsFragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    commentsFragment.appendChild(craftComment(comments[i]));
  }

  return commentsFragment;
};

var craftComment = function (commentData) {
  var comment = bigphotoElement.querySelector('.social__comment').cloneNode(true);
  var commentPicture = comment.querySelector('.social__picture');
  commentPicture.src = commentData.avatar;
  commentPicture.alt = commentData.name;
  comment.querySelector('.social__text').textContent = commentData.message;
  return comment;
};

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
});

bigPhotoCancel.addEventListener('click', function () {
  bigphotoElement.classList.add('hidden');
})

var init = function () {
  bigphotoElement.classList.remove('hidden');
  bigphotoHidden.classList.add('hidden');
  document.body.classList.add('.modal-open');
  var photos = generatePhoto();
  craftPhoto(photos);
  bigPhoto(photos[0]);
};

init();

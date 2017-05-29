function getBodyText(el) {
  var reqUrl = 'https://baconipsum.com/api/?type=meat-and-filler&sentences=1';
  var reqObj = {
    method: 'get'
  };

  fetch(reqUrl, reqObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      el.querySelector('p').innerHTML = data;
    })
    .catch(function(err) {
      console.log('There was an error.', err);
    });
}

function getTitleText(el) {
  var reqUrl = 'http://www.randomtext.me/api/lorem/h2/1-5?seed=123';
  var reqHeaders = new Headers({
    'Content-Type': 'text/plain'
  })
  var reqObj = {
    method: 'get',
    mode: 'cors',
    cache: 'no-cache',
    headers: reqHeaders
  };

  fetch(reqUrl, reqObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      el.querySelector('h2').parentElement.href = 'https://www.google.com/#q=' + formatUrl(formatTitle(data.text_out));
      el.querySelector('h2').innerHTML = formatTitle(data.text_out);
    })
    .catch(function(err) {
      console.log('There was an error.', err);
    });
}

function getImages(el) {
  var seed = Math.floor(Math.random() * 1000);
  var reqUrl = 'https://source.unsplash.com/random/?sig=' + seed;
  var reqObj = {
    method: 'get',
    cache: 'no-cache'
  };
  
  fetch(reqUrl, reqObj)
    .then(function(response) {
      return response;
    })
    .then(function(data) {
      el.style.backgroundImage = 'url(' + data.url + ')';
      el.querySelector('.body-image').src = data.url;
    })
    .catch(function(err) {
      console.log('There was an error.', err);
    })
}

function formatTitle(html) {
  var el = document.createElement('div');
  el.innerHTML = html;
  var text = el.firstChild
  return text.outerText;
}

function formatUrl(url) {
  return url.replace(/ /g,'+').toLowerCase()
}

var body = document.querySelector('body');
var btns = document.getElementsByClassName('btn');
var modal = document.querySelector('.modal-overlay');
var modalClose = document.querySelector('.modal-close');

modalClose.onclick = function() {closeModal(modal, body)};
modal.onclick = function() {closeModal(modal, body)};

for (var i = 0; i < btns.length; i++) {
  var btn = btns[i];
  btn.onclick = function() {
    body.className += ' no-scroll';

    var tile = this.parentElement.parentElement
    var img = tile.querySelector('.body-image').src;
    console.log(img);
    modal.style.visibility = 'visible';
    console.log(modal.querySelector('.modal'));
    modal.querySelector('.modal-image').src = img;
  }
};

function closeModal(modal, body) {
  console.log('modal closing', modal);
  modal.style.visibility = 'hidden';
  body.className -= 'no-scroll';
}

window.onload = function() {
  var target = '.tile'
  var btnDarkness = .8 // Percentage
  var element = document.querySelectorAll(target);

  element.forEach(function(el) {
    var rgb = [];
    var rgbDark = [];

    for (i = 0; i < 3; i++) {
      var rgbVal = getRgbVal();
      rgb.push(rgbVal);
      rgbDark.push(Math.floor(rgbVal * btnDarkness));
    }

    var rgbIntensity = rgb.reduce(function(total, num) {
      return total + num
    }, 0);

    el.querySelector('.bg-overlay').style.backgroundColor = 'rgba(' + rgb + ', .75)';
    el.querySelector('.btn').style.backgroundColor = 'rgb(' + rgbDark + ')';

    getTitleText(el);
    getBodyText(el);
    getImages(el);

    if (rgbIntensity < 384) { // (255 * 3) / 2
      el.style.color = '#fff';
      el.querySelector('hr').style.backgroundColor = '#fff';
      el.querySelector('.btn').style.borderColor = '#fff';
    };
  });

};

function getRgbVal() {
  var val = Math.floor((Math.random() * 255) + 1);
  return val
};

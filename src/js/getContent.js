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

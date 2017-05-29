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

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

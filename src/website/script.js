var paragraph = 0;

const specialChars = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
};

function handleKey(key) {
  if (key.length == 1) {
    console.log(key);
    paragraph.textContent += key;
  } else {
    if (key === specialChars.ARROW_RIGHT) {
      document.getElementsByClassName('cursor').item(0).style.left = '8px';
    }

    console.log('special character.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  paragraph = document.getElementById('text');

  document.addEventListener('keydown', event => {
    handleKey(event.key);
  });
});
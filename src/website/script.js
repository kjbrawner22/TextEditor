var paragraph = 0;

var cursorInfo = {row: 0, col: 0};

const specialChars = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
  BACKSPACE: 'Backspace'
};

function handleKey(key) {
  if (key.length == 1) {
    paragraph.textContent += key;
  } else {
    var col = cursorInfo.col;
    if (key === specialChars.ARROW_RIGHT) {
      col += 1;
    } else if (key === specialChars.ARROW_LEFT) {
      if (col > 0) {
        col -= 1;
      }
    } else if (key === specialChars.BACKSPACE) {
      if (col > 0) {
        text = paragraph.textContent;
        paragraph.textContent = text.slice(0, text.length - 1);
        col -= 1;
      }
    }

    if (col != cursorInfo.col) {
      cursorInfo.col = col;
      let left = col * 7.8;
      document.getElementsByClassName('cursor').item(0).style.left = left.toString() + 'px';
    }
  }

  console.log(key);
}

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  paragraph = document.getElementById('text');

  document.addEventListener('keydown', event => {
    handleKey(event.key);
  });
});
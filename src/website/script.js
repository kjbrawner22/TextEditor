import {Rope} from './rope.js';

var rope = new Rope('test');

var paragraph = 0;

var cursorInfo = {row: 0, col: 0};

const specialChars = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
  BACKSPACE: 'Backspace'
};

/**
 * 
 * @param {KeyboardEvent} event 
 */
function handleKey(event) {
  var key = event.key;
  var col = cursorInfo.col;
  if (key.length == 1 && !(event.ctrlKey || event.altKey)) {
    rope.insert(col, key);
    paragraph.textContent = rope.toString();
    col += 1;
  } else {
    if (key === specialChars.ARROW_RIGHT) {
      if (col < paragraph.textContent.length)
      col += 1;
    } else if (key === specialChars.ARROW_LEFT) {
      if (col > 0) {
        col -= 1;
      }
    } else if (key === specialChars.BACKSPACE) {
      if (col > 0) {
        rope.remove(col - 1, col);
        paragraph.textContent = rope.toString();
        col -= 1;
      }
    }

  }

  if (col != cursorInfo.col) {
    cursorInfo.col = col;
    let left = col * 7.8;
    document.getElementsByClassName('cursor').item(0).style.left = left.toString() + 'px';
  }

  console.log(key);
}

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  paragraph = document.getElementById('text');
  paragraph.textContent = rope.toString();

  document.addEventListener('keydown', event => {
    handleKey(event);
  });
});
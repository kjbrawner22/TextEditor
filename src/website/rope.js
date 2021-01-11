/**
 * Construct a new rope object.
 * 
 * @param {String} str - initial string to build the rope with.
 * 
 * @api public
 */
function Rope(str, parent) {
  if (typeof str != 'string') {
    throw new TypeError('Type of `str` must be a string.');
  }

  if (typeof parent == 'undefined') {
    parent = null;
  } else if (typeof parent != 'rope') {
    throw new TypeError('Type of `parent` must be a rope or null');
  }

  this._value  = str;
  this._left   = null;
  this._right  = null;
  this._parent = parent;
  this._weight = str.length;
  this.length  = this._weight;
  adjustRope.call(this);
}

/**
 * Length threshold of a rope node at which to split into 2 child nodes
 * 
 * @api private
 */
Rope.SPLIT_LENGTH = 1000;

/**
 * Length threshold of a rope node at which to join child nodes into the
 * parent and create 1 new leaf
 * 
 * @api private
 */
Rope.JOIN_LENGTH = 500;

/**
 * Adjust the rope structure by joining or splitting nodes, as needed
 */
function adjustRope() {
  if (typeof this._value != null) {
    // leaf node - check if we need to split
    if (this.length >= Rope.SPLIT_LENGTH) {
      var leftLength = Math.floor(this.length / 2);
      this._left = new Rope(this._value.substring(0, leftLength), this);
      this._right = new Rope(this._value.substring(leftLength), this);
      this._weight = leftLength;
      this._value = null;
    }
  } else {
    // node has children - check if we need to join
    if (this.length <= Rope.JOIN_LENGTH) {
      this._value = this._left.toString() + this._right.toString();
      this._weight = this.length;
      this._left = null;
      this._right = null;
    }
  }
}

/**
 * Insert `str` at `pos` in rope.
 * 
 * @param {Number} pos 
 * @param {String} str 
 */
Rope.prototype.insert = function(pos, str) {
  if (pos < 0 || pos > this.length) {
    throw RangeError('pos index out of bounds.');
  }
}

/**
 * Remove substring between `start` (inclusive) and  `end` (exclusive)
 * 
 * @param {Number} start - inclusive starting index
 * @param {Number} end - exclusive ending index 
 */
Rope.prototype.remove = function(start, end) {

}

/**
 * Create a javascript string from the Rope tree.
 * 
 * @api public
 */
Rope.prototype.toString = function() {
  if (this._value != null) {
    return this._value;
  }

  return this._left.toString() + this._right.toString();
}
/**
 * Construct a new rope object.
 * 
 * @param {String} str - initial string to build the rope with.
 * 
 * @api public
 */
function Rope(str, parent = null) {
  if (typeof str != 'string') {
    throw new TypeError('Type of `str` must be a string.');
  } else if ((parent != null) && (typeof parent != 'rope')) {
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
    throw new RangeError('pos index out of bounds.');
  } else if (typeof str != 'string') {
    throw new TypeError('Type of `str` must be a string.');
  }

  if (this._value != null) {
    // leaf - insert string here
    this._value = this._value.substring(0, pos) + str + this._value.substring(pos);
    this._weight = this._value.length;
    this.length = this._weight;
  } else {
    if (pos <= this._weight) {
      this._left.insert(pos, str);
    } else {
      this._right.insert(pos - this._weight, str);
    }

    this._weight = this._left.length;
    this.length = this._left.length + this._right.length;
  }

  adjustRope.call(this);
}

/**
 * Remove substring between `start` (inclusive) and  `end` (exclusive)
 * 
 * @param {Number} start - inclusive starting index
 * @param {Number} end - exclusive ending index 
 */
Rope.prototype.remove = function(start, end) {
  if (start < 0 || start >= this.length) {
    throw new RangeError('`start` out of range.');
  } else if (end < 0 || end > this.length) {
    throw new RangeError('`end` out of range.');
  } else if (start >= end) {
    return;
  } else if (typeof end == 'undefined') {
    end = this.length;
  }

  if (this._value != null) {
    this._value = this._value.substring(0, start) + this._value.substring(end);
    this.length = this._value.length;
    this._weight = this.length;
  } else {
    if (end <= this._weight) {
      // remove string that is entirely on the left side
      this._left.remove(start, end);
    } else if (start >= this._weight) {
      this._right.remove(start - this._weight, end - this._weight);
    } else {
      this._left.remove(start);
      this._right.remove(0, end);
    }

    this._weight = this._left.length;
    this.length = this._left.length + this._right.length;
    adjustRope.call(this);
  }
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

export {Rope};
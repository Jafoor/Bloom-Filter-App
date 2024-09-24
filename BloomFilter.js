const murmur = require('murmurhash3js');

class BloomFilter {
  constructor(size = 1000000, numHashFunctions = 4) {
    this.size = size;
    this.numHashFunctions = numHashFunctions;
    this.bitArray = new Array(size).fill(0);
  }

  _hash(value, seed) {
    const hashValue = murmur.x86.hash32(value, seed);
    return Math.abs(hashValue % this.size);
  }

  add(value) {
    for (let i = 0; i < this.numHashFunctions; i++) {
      const position = this._hash(value, i);
      this.bitArray[position] = 1;
    }
  }

  contains(value) {
    for (let i = 0; i < this.numHashFunctions; i++) {
      const position = this._hash(value, i);
      if (this.bitArray[position] === 0) {
        return false;
      }
    }
    return true;
  }
}

module.exports = BloomFilter;

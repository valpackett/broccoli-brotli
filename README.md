# Broccoli Brotli plugin

[![Build Status](https://travis-ci.org/myfreeweb/broccoli-brotli.svg?branch=master)](https://travis-ci.org/myfreeweb/broccoli-brotli) [![npm version](https://badge.fury.io/js/broccoli-brotli.svg)](https://badge.fury.io/js/broccoli-brotli)

Fork of [broccoli-zopfli](https://github.com/nickbruun/broccoli-zopfli) (which is a fork of [broccoli-gzip](https://github.com/salsify/broccoli-gzip)) to use Brotli instead of Zopfli instead of gzip to perform compression. All credit goes to the original authors of broccoli-{zopfli,gzip}.


## Installation

```bash
$ npm install broccoli-brotli
```


## Example

```javascript
var Brotli = require('broccoli-brotli');

var tree = new Brotli('app', {
  extensions: ['js', 'css', 'svg']
});
```


## Configuration

### `new Brotli(inputNode, options)`

---

`options.extensions` *{Array}* (required)

The file extensions that should be compressed.

---

`options.keepUncompressed` *{Boolean}* (optional, default `false`)

Whether to keep uncompressed versions of the files in the resulting tree.

---

`options.appendSuffix` *{Boolean}* (optional, default `true`)

Whether to append the `.br` extension suffix to compressed files.

---

`options.mode` *{Number}* (optional, default `0`)

Brotli mode

---

`options.quality` *{Number}* (optional, default `11`) 

Compression strength

---

`options.lgwin` *{Number}* (optional, default `22`) 

No idea lol

---

`options.lgblock` *{Number}* (optional, default `0`) 

No idea lol


## License

broccoli-brotli is, like broccoli-zopfli, distributed under the MIT license.

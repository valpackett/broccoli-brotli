[![npm version](https://img.shields.io/npm/v/broccoli-brotli.svg)](https://www.npmjs.com/package/broccoli-brotli)
[![npm downloads](https://img.shields.io/npm/dt/broccoli-brotli.svg)](https://www.npmjs.com/package/broccoli-brotli)
[![MIT License](https://img.shields.io/badge/mit-license-green.svg?style=flat)](https://mit-license.org/)

# Broccoli Brotli plugin

Fork of [broccoli-zopfli](https://github.com/nickbruun/broccoli-zopfli) (which is a fork of [broccoli-gzip](https://github.com/salsify/broccoli-gzip)) to use Brotli instead of Zopfli instead of gzip to perform compression. All credit goes to the original authors of broccoli-{zopfli,gzip}.


## Installation

```bash
$ npm i broccoli-brotli
```


## Example

```javascript
const Brotli = require('broccoli-brotli')

const tree = new Brotli('app', {
  extensions: ['js', 'css', 'svg']
})
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

`options.XXX`

Where `XXX` comes from [BrotliOptions](https://nodejs.org/dist/latest-v15.x/docs/api/zlib.html#zlib_class_brotlioptions).

---

## License

broccoli-brotli is, like broccoli-zopfli, distributed under the MIT license.

/*global require: true, module: true*/
var RSVP = require('rsvp'),
    helpers = require('broccoli-kitchen-sink-helpers'),
    Filter = require('broccoli-filter'),
    Buffer = require('buffer').Buffer,
    zlib = require('zlib');


BrotliFilter.prototype = Object.create(Filter.prototype);
BrotliFilter.prototype.constructor = BrotliFilter;


/**
 * Brotli filter.
 *
 * @constructor
 * @param {object} inputNode - Input node.
 * @param {object} options - Options.
 */
function BrotliFilter(inputNode, options) {
    if (!(this instanceof BrotliFilter))
        return new BrotliFilter(inputNode, options);

    this.brotliOptions = options || {};
    this.keepUncompressed = options.keepUncompressed;
    this.appendSuffix = (options.hasOwnProperty('appendSuffix') ?
                         options.appendSuffix :
                         true);

    // Default file encoding is raw to handle binary files
    this.inputEncoding = options.inputEncoding || null;
    this.outputEncoding = options.outputEncoding || null;

    if (this.keepUncompressed && !this.appendSuffix) {
        throw new Error('Cannot keep uncompressed files without appending suffix. Filenames would be the same.');
    }

    // Translate iltorb to zlib options (eg. quality -> BROTLI_PARAM_QUALITY)
    this.brotliOptions.params = options.params || {};
    for (var opt in options) {
        var param = 'BROTLI_PARAM_' + opt.toUpperCase();
        if (zlib.constants[param] !== undefined) {
          this.brotliOptions.params[zlib.constants[param]] = options[opt];
        }
    }

    Filter.call(this, inputNode, options);
}

BrotliFilter.prototype.processFile = function(srcDir, destDir, relativePath) {
    if (this.keepUncompressed) {
        helpers.copyPreserveSync(srcDir + '/' + relativePath,
                                 destDir + '/' + relativePath);
    }

    return Filter.prototype.processFile.apply(this, arguments);
};

BrotliFilter.prototype.processString = function(str) {
    return RSVP.denodeify(zlib.brotliCompress)(Buffer.from(str), this.brotliOptions);
};

BrotliFilter.prototype.getDestFilePath = function() {
    var destFilePath = Filter.prototype.getDestFilePath.apply(this, arguments);
    if (destFilePath) {
        return this.appendSuffix ? destFilePath + '.br' : destFilePath;
    }
};

module.exports = BrotliFilter;

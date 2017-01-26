var brotli = require('../index');

var RSVP = require('rsvp');
var iltorb = require('iltorb');
var expect = require('expect.js');

var fs = require('fs');
var broccoli = require('broccoli');

var textContent = fs.readFileSync('tests/fixtures/sample-assets/test.txt');
var csvContent = fs.readFileSync('tests/fixtures/sample-assets/test.csv');

var builder;

describe('broccoli-brotli', function(){
    afterEach(function() {
        if (builder) {
            builder.cleanup();
        }
    });

    it('brottles files that match the configured extension', function() {
        var sourcePath = 'tests/fixtures/sample-assets';
        var node = new brotli(sourcePath, {
            extensions: ['txt']
        });

        builder = new broccoli.Builder(node);
        return builder.build().then(function() {
            var brotledText = fs.readFileSync(builder.outputPath + '/test.txt.br');

            return RSVP.hash({
                dir: builder.outputPath,
                actualCsv: fs.readFileSync(sourcePath + '/test.csv'),
                actualText: RSVP.denodeify(iltorb.decompress)(brotledText)
            });
        }).then(function(result) {
            expect(result.actualText).to.eql(textContent);
            expect(result.actualCsv).to.eql(csvContent);
            expect(fs.existsSync(result.dir + '/test.txt')).to.not.be.ok();
        });
    });

    it('keeps the uncompressed files when configured to', function() {
        var sourcePath = 'tests/fixtures/sample-assets';
        var node = new brotli(sourcePath, {
            keepUncompressed: true,
            extensions: ['txt']
        });

        builder = new broccoli.Builder(node);
        return builder.build().then(function() {
            var brotledText = fs.readFileSync(builder.outputPath + '/test.txt.br');
            return RSVP.hash({
                dir: builder.outputPath,
                actualCsv: fs.readFileSync(builder.outputPath + '/test.csv'),
                actualText: RSVP.denodeify(iltorb.decompress)(brotledText)
            });
        }).then(function(result) {
            expect(result.actualText).to.eql(textContent);
            expect(fs.readFileSync(result.dir + '/test.txt')).to.eql(textContent);
            expect(result.actualCsv).to.eql(csvContent);
        });
    });

    it('it does not append the suffix when configured to', function(){
        var sourcePath = 'tests/fixtures/sample-assets';
        var node = new brotli(sourcePath, {
            extensions: ['txt'],
            appendSuffix: false
        });

        builder = new broccoli.Builder(node);
        return builder.build().then(function() {
            var brotledText = fs.readFileSync(builder.outputPath + '/test.txt');
            return RSVP.hash({
                dir: builder.outputPath,
                actualText: RSVP.denodeify(iltorb.decompress)(brotledText)
            });
        }).then(function(result) {
            expect(result.actualText).to.eql(textContent);
            expect(fs.existsSync(result.dir + '/test.txt.br')).to.not.be.ok();
        });
    });

    it('it errors when configured to use incompatible options', function(){
        var sourcePath = 'tests/fixtures/sample-assets';

        expect(function() {
            new brotli(sourcePath, {
                keepUncompressed: true,
                appendSuffix: false
            });
        }).to.throwError();
    });
});

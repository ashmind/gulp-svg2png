///<reference path='../typings/main.d.ts'/>
/*
 * gulp-svg2png
 *
 * Copyright(c) 2014-2015 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */
/**
 * @author André König <andre.koenig@posteo.de>
 *
 */
'use strict';
var helper_1 = require('./helper');
var expect = require('chai').expect;
var pipe = require('multipipe');
var svg2png = require('../');
describe('The "gulp-svg2png" plugin', function () {
    it('should convert a SVG to a PNG', function (done) {
        var filename = 'twitter.svg';
        var stream = svg2png();
        var image = helper_1["default"].createTestFile();
        stream.on('data', function (png) {
            expect(png.path).to.equal('./specs/assets/twitter.png');
            expect(helper_1["default"].isPNG(png.contents)).to.equal(true);
            done();
        });
        stream.on('error', function (err) {
            return console.error(err);
        });
        stream.write(image);
        stream.end();
    });
    it('should convert a SVG to a PNG by a defined scaling factor', function (done) {
        var filename = 'twitter.svg';
        var stream = svg2png({ width: 200, height: 300 });
        var image = helper_1["default"].createTestFile();
        stream.on('data', function (png) {
            helper_1["default"].hasDimensions(png.contents, 300, 200, function (err, has) {
                expect(has).to.equal(true);
                done();
            });
        });
        stream.write(image);
        stream.end();
    });
    it('should finish when executed through multipipe', function (done) {
        var stream = pipe(svg2png());
        var image = helper_1["default"].createTestFile();
        stream.on('finish', function () { return done(); });
        stream.write(image);
        stream.end();
    });
});

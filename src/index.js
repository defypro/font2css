#!/usr/bin/env node
var path = require('path');
var Fontmin = require('fontmin');
var fs = require('fs');
var DIST_PATH = './dist/';

var PATH = cli.flags.path || process.cwd();

var pluginOpts = {
	hinting: false,
	deflate:true,
    text: '',
};

pluginOpts.text = fs.readFileSync(PATH+'/text', 'utf-8');
var fontmin = new Fontmin()
	.src('./*.ttf')
    .use(Fontmin.glyph(pluginOpts))
    .use(Fontmin.ttf2woff(pluginOpts))
    .use(Fontmin.css(pluginOpts))
    .dest(DIST_PATH);
    fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }
    var files = fs.readdirSync(DIST_PATH);
    files.forEach(function (itme, index) {
        if(itme.indexOf('.ttf') > -1){
        	fs.unlinkSync(DIST_PATH+itme);
        }
    });
    console.log('complete success');
});
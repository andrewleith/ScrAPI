var get = require('./js-server/get');
var scrape = require('./js-shared/dom-scraper');
var $ = require('cheerio');
var util = require('util');
var express = require('express');
var app = express();
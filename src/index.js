var $copy = require('./$copy');
var $log = require('./$log');
var $$promise = require('./$$promise');
var $promise = require('./$promise');
var $timeout = require('./$timeout');
var $interval = require('./$interval');
var $immediate = require('./$immediate');
var $typeof = require('./$typeof');

exports.install = function (options) {
  var Jpex = options.Jpex;

  Jpex.register.factory('$copy', ['$typeof'], $copy).lifecycle.application();

  Jpex.register.factory('$log', [], $log).lifecycle.application();

  Jpex.register.factory('$$promise', [], $$promise).lifecycle.application();

  Jpex.register.factory('$promise', ['$$promise'], $promise).lifecycle.application();

  Jpex.register.factory('$timeout', [], $timeout).lifecycle.application();

  Jpex.register.factory('$interval', [], $interval).lifecycle.application();

  Jpex.register.factory('$immediate', ['$timeout'], $immediate).lifecycle.application();

  Jpex.register.factory('$typeof', [], $typeof).lifecycle.application();
};

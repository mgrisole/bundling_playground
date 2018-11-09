(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Hello = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Hello =
  /*#__PURE__*/
  function () {
    function Hello(name) {
      _classCallCheck(this, Hello);

      this.name = name;
    }

    _createClass(Hello, [{
      key: "sayHi",
      value: function sayHi() {
        console.log("Hi ".concat(this.name, " !"));
      }
    }]);

    return Hello;
  }();

  var Yolo =
  /*#__PURE__*/
  function () {
    function Yolo() {
      _classCallCheck(this, Yolo);
    }

    _createClass(Yolo, [{
      key: "run",
      value: function run() {
        var a = new Hello('Mark');
        a.sayHi();
      }
    }]);

    return Yolo;
  }();

  return Yolo;

})));

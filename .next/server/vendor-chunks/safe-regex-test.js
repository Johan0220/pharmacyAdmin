"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/safe-regex-test";
exports.ids = ["vendor-chunks/safe-regex-test"];
exports.modules = {

/***/ "(ssr)/./node_modules/safe-regex-test/index.js":
/*!***********************************************!*\
  !*** ./node_modules/safe-regex-test/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar callBound = __webpack_require__(/*! call-bind/callBound */ \"(ssr)/./node_modules/call-bind/callBound.js\");\nvar GetIntrinsic = __webpack_require__(/*! get-intrinsic */ \"(ssr)/./node_modules/get-intrinsic/index.js\");\nvar isRegex = __webpack_require__(/*! is-regex */ \"(ssr)/./node_modules/is-regex/index.js\");\nvar $exec = callBound(\"RegExp.prototype.exec\");\nvar $TypeError = GetIntrinsic(\"%TypeError%\");\nmodule.exports = function regexTester(regex) {\n    if (!isRegex(regex)) {\n        throw new $TypeError(\"`regex` must be a RegExp\");\n    }\n    return function test(s) {\n        return $exec(regex, s) !== null;\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2FmZS1yZWdleC10ZXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBRUEsSUFBSUEsWUFBWUMsbUJBQU9BLENBQUM7QUFDeEIsSUFBSUMsZUFBZUQsbUJBQU9BLENBQUM7QUFDM0IsSUFBSUUsVUFBVUYsbUJBQU9BLENBQUM7QUFFdEIsSUFBSUcsUUFBUUosVUFBVTtBQUN0QixJQUFJSyxhQUFhSCxhQUFhO0FBRTlCSSxPQUFPQyxPQUFPLEdBQUcsU0FBU0MsWUFBWUMsS0FBSztJQUMxQyxJQUFJLENBQUNOLFFBQVFNLFFBQVE7UUFDcEIsTUFBTSxJQUFJSixXQUFXO0lBQ3RCO0lBQ0EsT0FBTyxTQUFTSyxLQUFLQyxDQUFDO1FBQ3JCLE9BQU9QLE1BQU1LLE9BQU9FLE9BQU87SUFDNUI7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3BoYXJhbWNldXRpdGFscy8uL25vZGVfbW9kdWxlcy9zYWZlLXJlZ2V4LXRlc3QvaW5kZXguanM/ZjNmZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xudmFyIGlzUmVnZXggPSByZXF1aXJlKCdpcy1yZWdleCcpO1xuXG52YXIgJGV4ZWMgPSBjYWxsQm91bmQoJ1JlZ0V4cC5wcm90b3R5cGUuZXhlYycpO1xudmFyICRUeXBlRXJyb3IgPSBHZXRJbnRyaW5zaWMoJyVUeXBlRXJyb3IlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVnZXhUZXN0ZXIocmVnZXgpIHtcblx0aWYgKCFpc1JlZ2V4KHJlZ2V4KSkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgcmVnZXhgIG11c3QgYmUgYSBSZWdFeHAnKTtcblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gdGVzdChzKSB7XG5cdFx0cmV0dXJuICRleGVjKHJlZ2V4LCBzKSAhPT0gbnVsbDtcblx0fTtcbn07XG4iXSwibmFtZXMiOlsiY2FsbEJvdW5kIiwicmVxdWlyZSIsIkdldEludHJpbnNpYyIsImlzUmVnZXgiLCIkZXhlYyIsIiRUeXBlRXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVnZXhUZXN0ZXIiLCJyZWdleCIsInRlc3QiLCJzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/safe-regex-test/index.js\n");

/***/ })

};
;
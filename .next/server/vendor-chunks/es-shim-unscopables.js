"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/es-shim-unscopables";
exports.ids = ["vendor-chunks/es-shim-unscopables"];
exports.modules = {

/***/ "(ssr)/./node_modules/es-shim-unscopables/index.js":
/*!***************************************************!*\
  !*** ./node_modules/es-shim-unscopables/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar hasOwn = __webpack_require__(/*! hasown */ \"(ssr)/./node_modules/hasown/index.js\");\nvar hasUnscopables = typeof Symbol === \"function\" && typeof Symbol.unscopables === \"symbol\";\nvar map = hasUnscopables && Array.prototype[Symbol.unscopables];\nvar $TypeError = TypeError;\nmodule.exports = function shimUnscopables(method) {\n    if (typeof method !== \"string\" || !method) {\n        throw new $TypeError(\"method must be a non-empty string\");\n    }\n    if (!hasOwn(Array.prototype, method)) {\n        throw new $TypeError(\"method must be on Array.prototype\");\n    }\n    if (hasUnscopables) {\n        map[method] = true;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXMtc2hpbS11bnNjb3BhYmxlcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBLElBQUlBLFNBQVNDLG1CQUFPQSxDQUFDO0FBRXJCLElBQUlDLGlCQUFpQixPQUFPQyxXQUFXLGNBQWMsT0FBT0EsT0FBT0MsV0FBVyxLQUFLO0FBRW5GLElBQUlDLE1BQU1ILGtCQUFrQkksTUFBTUMsU0FBUyxDQUFDSixPQUFPQyxXQUFXLENBQUM7QUFFL0QsSUFBSUksYUFBYUM7QUFFakJDLE9BQU9DLE9BQU8sR0FBRyxTQUFTQyxnQkFBZ0JDLE1BQU07SUFDL0MsSUFBSSxPQUFPQSxXQUFXLFlBQVksQ0FBQ0EsUUFBUTtRQUMxQyxNQUFNLElBQUlMLFdBQVc7SUFDdEI7SUFDQSxJQUFJLENBQUNSLE9BQU9NLE1BQU1DLFNBQVMsRUFBRU0sU0FBUztRQUNyQyxNQUFNLElBQUlMLFdBQVc7SUFDdEI7SUFDQSxJQUFJTixnQkFBZ0I7UUFDbkJHLEdBQUcsQ0FBQ1EsT0FBTyxHQUFHO0lBQ2Y7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3BoYXJhbWNldXRpdGFscy8uL25vZGVfbW9kdWxlcy9lcy1zaGltLXVuc2NvcGFibGVzL2luZGV4LmpzPzY3OGMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duID0gcmVxdWlyZSgnaGFzb3duJyk7XG5cbnZhciBoYXNVbnNjb3BhYmxlcyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC51bnNjb3BhYmxlcyA9PT0gJ3N5bWJvbCc7XG5cbnZhciBtYXAgPSBoYXNVbnNjb3BhYmxlcyAmJiBBcnJheS5wcm90b3R5cGVbU3ltYm9sLnVuc2NvcGFibGVzXTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hpbVVuc2NvcGFibGVzKG1ldGhvZCkge1xuXHRpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ3N0cmluZycgfHwgIW1ldGhvZCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdtZXRob2QgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcblx0fVxuXHRpZiAoIWhhc093bihBcnJheS5wcm90b3R5cGUsIG1ldGhvZCkpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignbWV0aG9kIG11c3QgYmUgb24gQXJyYXkucHJvdG90eXBlJyk7XG5cdH1cblx0aWYgKGhhc1Vuc2NvcGFibGVzKSB7XG5cdFx0bWFwW21ldGhvZF0gPSB0cnVlO1xuXHR9XG59O1xuIl0sIm5hbWVzIjpbImhhc093biIsInJlcXVpcmUiLCJoYXNVbnNjb3BhYmxlcyIsIlN5bWJvbCIsInVuc2NvcGFibGVzIiwibWFwIiwiQXJyYXkiLCJwcm90b3R5cGUiLCIkVHlwZUVycm9yIiwiVHlwZUVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyIsInNoaW1VbnNjb3BhYmxlcyIsIm1ldGhvZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/es-shim-unscopables/index.js\n");

/***/ })

};
;
"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-date-object";
exports.ids = ["vendor-chunks/is-date-object"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-date-object/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-date-object/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar getDay = Date.prototype.getDay;\nvar tryDateObject = function tryDateGetDayCall(value) {\n    try {\n        getDay.call(value);\n        return true;\n    } catch (e) {\n        return false;\n    }\n};\nvar toStr = Object.prototype.toString;\nvar dateClass = \"[object Date]\";\nvar hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ \"(ssr)/./node_modules/has-tostringtag/shams.js\")();\nmodule.exports = function isDateObject(value) {\n    if (typeof value !== \"object\" || value === null) {\n        return false;\n    }\n    return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtZGF0ZS1vYmplY3QvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFFQSxJQUFJQSxTQUFTQyxLQUFLQyxTQUFTLENBQUNGLE1BQU07QUFDbEMsSUFBSUcsZ0JBQWdCLFNBQVNDLGtCQUFrQkMsS0FBSztJQUNuRCxJQUFJO1FBQ0hMLE9BQU9NLElBQUksQ0FBQ0Q7UUFDWixPQUFPO0lBQ1IsRUFBRSxPQUFPRSxHQUFHO1FBQ1gsT0FBTztJQUNSO0FBQ0Q7QUFFQSxJQUFJQyxRQUFRQyxPQUFPUCxTQUFTLENBQUNRLFFBQVE7QUFDckMsSUFBSUMsWUFBWTtBQUNoQixJQUFJQyxpQkFBaUJDLG1CQUFPQSxDQUFDO0FBRTdCQyxPQUFPQyxPQUFPLEdBQUcsU0FBU0MsYUFBYVgsS0FBSztJQUMzQyxJQUFJLE9BQU9BLFVBQVUsWUFBWUEsVUFBVSxNQUFNO1FBQ2hELE9BQU87SUFDUjtJQUNBLE9BQU9PLGlCQUFpQlQsY0FBY0UsU0FBU0csTUFBTUYsSUFBSSxDQUFDRCxXQUFXTTtBQUN0RSIsInNvdXJjZXMiOlsid2VicGFjazovL3BoYXJhbWNldXRpdGFscy8uL25vZGVfbW9kdWxlcy9pcy1kYXRlLW9iamVjdC9pbmRleC5qcz8zODljIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGdldERheSA9IERhdGUucHJvdG90eXBlLmdldERheTtcbnZhciB0cnlEYXRlT2JqZWN0ID0gZnVuY3Rpb24gdHJ5RGF0ZUdldERheUNhbGwodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRnZXREYXkuY2FsbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZGF0ZUNsYXNzID0gJ1tvYmplY3QgRGF0ZV0nO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gcmVxdWlyZSgnaGFzLXRvc3RyaW5ndGFnL3NoYW1zJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0RhdGVPYmplY3QodmFsdWUpIHtcblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHwgdmFsdWUgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIGhhc1RvU3RyaW5nVGFnID8gdHJ5RGF0ZU9iamVjdCh2YWx1ZSkgOiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gZGF0ZUNsYXNzO1xufTtcbiJdLCJuYW1lcyI6WyJnZXREYXkiLCJEYXRlIiwicHJvdG90eXBlIiwidHJ5RGF0ZU9iamVjdCIsInRyeURhdGVHZXREYXlDYWxsIiwidmFsdWUiLCJjYWxsIiwiZSIsInRvU3RyIiwiT2JqZWN0IiwidG9TdHJpbmciLCJkYXRlQ2xhc3MiLCJoYXNUb1N0cmluZ1RhZyIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaXNEYXRlT2JqZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-date-object/index.js\n");

/***/ })

};
;
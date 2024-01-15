"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-symbol";
exports.ids = ["vendor-chunks/is-symbol"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-symbol/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-symbol/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar toStr = Object.prototype.toString;\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"(ssr)/./node_modules/has-symbols/index.js\")();\nif (hasSymbols) {\n    var symToStr = Symbol.prototype.toString;\n    var symStringRegex = /^Symbol\\(.*\\)$/;\n    var isSymbolObject = function isRealSymbolObject(value) {\n        if (typeof value.valueOf() !== \"symbol\") {\n            return false;\n        }\n        return symStringRegex.test(symToStr.call(value));\n    };\n    module.exports = function isSymbol(value) {\n        if (typeof value === \"symbol\") {\n            return true;\n        }\n        if (toStr.call(value) !== \"[object Symbol]\") {\n            return false;\n        }\n        try {\n            return isSymbolObject(value);\n        } catch (e) {\n            return false;\n        }\n    };\n} else {\n    module.exports = function isSymbol(value) {\n        // this environment does not support Symbols.\n        return  false && 0;\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtc3ltYm9sL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBRUEsSUFBSUEsUUFBUUMsT0FBT0MsU0FBUyxDQUFDQyxRQUFRO0FBQ3JDLElBQUlDLGFBQWFDLG1CQUFPQSxDQUFDO0FBRXpCLElBQUlELFlBQVk7SUFDZixJQUFJRSxXQUFXQyxPQUFPTCxTQUFTLENBQUNDLFFBQVE7SUFDeEMsSUFBSUssaUJBQWlCO0lBQ3JCLElBQUlDLGlCQUFpQixTQUFTQyxtQkFBbUJDLEtBQUs7UUFDckQsSUFBSSxPQUFPQSxNQUFNQyxPQUFPLE9BQU8sVUFBVTtZQUN4QyxPQUFPO1FBQ1I7UUFDQSxPQUFPSixlQUFlSyxJQUFJLENBQUNQLFNBQVNRLElBQUksQ0FBQ0g7SUFDMUM7SUFFQUksT0FBT0MsT0FBTyxHQUFHLFNBQVNDLFNBQVNOLEtBQUs7UUFDdkMsSUFBSSxPQUFPQSxVQUFVLFVBQVU7WUFDOUIsT0FBTztRQUNSO1FBQ0EsSUFBSVgsTUFBTWMsSUFBSSxDQUFDSCxXQUFXLG1CQUFtQjtZQUM1QyxPQUFPO1FBQ1I7UUFDQSxJQUFJO1lBQ0gsT0FBT0YsZUFBZUU7UUFDdkIsRUFBRSxPQUFPTyxHQUFHO1lBQ1gsT0FBTztRQUNSO0lBQ0Q7QUFDRCxPQUFPO0lBRU5ILE9BQU9DLE9BQU8sR0FBRyxTQUFTQyxTQUFTTixLQUFLO1FBQ3ZDLDZDQUE2QztRQUM3QyxPQUFPLE1BQUssSUFBSUEsQ0FBS0E7SUFDdEI7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3BoYXJhbWNldXRpdGFscy8uL25vZGVfbW9kdWxlcy9pcy1zeW1ib2wvaW5kZXguanM/MzZjNiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzJykoKTtcblxuaWYgKGhhc1N5bWJvbHMpIHtcblx0dmFyIHN5bVRvU3RyID0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIHN5bVN0cmluZ1JlZ2V4ID0gL15TeW1ib2xcXCguKlxcKSQvO1xuXHR2YXIgaXNTeW1ib2xPYmplY3QgPSBmdW5jdGlvbiBpc1JlYWxTeW1ib2xPYmplY3QodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlLnZhbHVlT2YoKSAhPT0gJ3N5bWJvbCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHN5bVN0cmluZ1JlZ2V4LnRlc3Qoc3ltVG9TdHIuY2FsbCh2YWx1ZSkpO1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdGlmICh0b1N0ci5jYWxsKHZhbHVlKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBpc1N5bWJvbE9iamVjdCh2YWx1ZSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fTtcbn0gZWxzZSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuXHRcdC8vIHRoaXMgZW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCBTeW1ib2xzLlxuXHRcdHJldHVybiBmYWxzZSAmJiB2YWx1ZTtcblx0fTtcbn1cbiJdLCJuYW1lcyI6WyJ0b1N0ciIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaGFzU3ltYm9scyIsInJlcXVpcmUiLCJzeW1Ub1N0ciIsIlN5bWJvbCIsInN5bVN0cmluZ1JlZ2V4IiwiaXNTeW1ib2xPYmplY3QiLCJpc1JlYWxTeW1ib2xPYmplY3QiLCJ2YWx1ZSIsInZhbHVlT2YiLCJ0ZXN0IiwiY2FsbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJpc1N5bWJvbCIsImUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-symbol/index.js\n");

/***/ })

};
;
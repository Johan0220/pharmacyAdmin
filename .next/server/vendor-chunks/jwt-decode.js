"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/jwt-decode";
exports.ids = ["vendor-chunks/jwt-decode"];
exports.modules = {

/***/ "(ssr)/./node_modules/jwt-decode/build/esm/index.js":
/*!****************************************************!*\
  !*** ./node_modules/jwt-decode/build/esm/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InvalidTokenError: () => (/* binding */ InvalidTokenError),\n/* harmony export */   jwtDecode: () => (/* binding */ jwtDecode)\n/* harmony export */ });\nclass InvalidTokenError extends Error {\n}\nInvalidTokenError.prototype.name = \"InvalidTokenError\";\nfunction b64DecodeUnicode(str) {\n    return decodeURIComponent(atob(str).replace(/(.)/g, (m, p)=>{\n        let code = p.charCodeAt(0).toString(16).toUpperCase();\n        if (code.length < 2) {\n            code = \"0\" + code;\n        }\n        return \"%\" + code;\n    }));\n}\nfunction base64UrlDecode(str) {\n    let output = str.replace(/-/g, \"+\").replace(/_/g, \"/\");\n    switch(output.length % 4){\n        case 0:\n            break;\n        case 2:\n            output += \"==\";\n            break;\n        case 3:\n            output += \"=\";\n            break;\n        default:\n            throw new Error(\"base64 string is not of the correct length\");\n    }\n    try {\n        return b64DecodeUnicode(output);\n    } catch (err) {\n        return atob(output);\n    }\n}\nfunction jwtDecode(token, options) {\n    if (typeof token !== \"string\") {\n        throw new InvalidTokenError(\"Invalid token specified: must be a string\");\n    }\n    options || (options = {});\n    const pos = options.header === true ? 0 : 1;\n    const part = token.split(\".\")[pos];\n    if (typeof part !== \"string\") {\n        throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);\n    }\n    let decoded;\n    try {\n        decoded = base64UrlDecode(part);\n    } catch (e) {\n        throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);\n    }\n    try {\n        return JSON.parse(decoded);\n    } catch (e) {\n        throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvand0LWRlY29kZS9idWlsZC9lc20vaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxNQUFNQSwwQkFBMEJDO0FBQ3ZDO0FBQ0FELGtCQUFrQkUsU0FBUyxDQUFDQyxJQUFJLEdBQUc7QUFDbkMsU0FBU0MsaUJBQWlCQyxHQUFHO0lBQ3pCLE9BQU9DLG1CQUFtQkMsS0FBS0YsS0FBS0csT0FBTyxDQUFDLFFBQVEsQ0FBQ0MsR0FBR0M7UUFDcEQsSUFBSUMsT0FBT0QsRUFBRUUsVUFBVSxDQUFDLEdBQUdDLFFBQVEsQ0FBQyxJQUFJQyxXQUFXO1FBQ25ELElBQUlILEtBQUtJLE1BQU0sR0FBRyxHQUFHO1lBQ2pCSixPQUFPLE1BQU1BO1FBQ2pCO1FBQ0EsT0FBTyxNQUFNQTtJQUNqQjtBQUNKO0FBQ0EsU0FBU0ssZ0JBQWdCWCxHQUFHO0lBQ3hCLElBQUlZLFNBQVNaLElBQUlHLE9BQU8sQ0FBQyxNQUFNLEtBQUtBLE9BQU8sQ0FBQyxNQUFNO0lBQ2xELE9BQVFTLE9BQU9GLE1BQU0sR0FBRztRQUNwQixLQUFLO1lBQ0Q7UUFDSixLQUFLO1lBQ0RFLFVBQVU7WUFDVjtRQUNKLEtBQUs7WUFDREEsVUFBVTtZQUNWO1FBQ0o7WUFDSSxNQUFNLElBQUloQixNQUFNO0lBQ3hCO0lBQ0EsSUFBSTtRQUNBLE9BQU9HLGlCQUFpQmE7SUFDNUIsRUFDQSxPQUFPQyxLQUFLO1FBQ1IsT0FBT1gsS0FBS1U7SUFDaEI7QUFDSjtBQUNPLFNBQVNFLFVBQVVDLEtBQUssRUFBRUMsT0FBTztJQUNwQyxJQUFJLE9BQU9ELFVBQVUsVUFBVTtRQUMzQixNQUFNLElBQUlwQixrQkFBa0I7SUFDaEM7SUFDQXFCLFdBQVlBLENBQUFBLFVBQVUsQ0FBQztJQUN2QixNQUFNQyxNQUFNRCxRQUFRRSxNQUFNLEtBQUssT0FBTyxJQUFJO0lBQzFDLE1BQU1DLE9BQU9KLE1BQU1LLEtBQUssQ0FBQyxJQUFJLENBQUNILElBQUk7SUFDbEMsSUFBSSxPQUFPRSxTQUFTLFVBQVU7UUFDMUIsTUFBTSxJQUFJeEIsa0JBQWtCLENBQUMsdUNBQXVDLEVBQUVzQixNQUFNLEVBQUUsQ0FBQztJQUNuRjtJQUNBLElBQUlJO0lBQ0osSUFBSTtRQUNBQSxVQUFVVixnQkFBZ0JRO0lBQzlCLEVBQ0EsT0FBT0csR0FBRztRQUNOLE1BQU0sSUFBSTNCLGtCQUFrQixDQUFDLGtEQUFrRCxFQUFFc0IsTUFBTSxFQUFFLEVBQUUsRUFBRUssRUFBRUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3RztJQUNBLElBQUk7UUFDQSxPQUFPQyxLQUFLQyxLQUFLLENBQUNKO0lBQ3RCLEVBQ0EsT0FBT0MsR0FBRztRQUNOLE1BQU0sSUFBSTNCLGtCQUFrQixDQUFDLGdEQUFnRCxFQUFFc0IsTUFBTSxFQUFFLEVBQUUsRUFBRUssRUFBRUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMzRztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGhhcmFtY2V1dGl0YWxzLy4vbm9kZV9tb2R1bGVzL2p3dC1kZWNvZGUvYnVpbGQvZXNtL2luZGV4LmpzPzgzYTgiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEludmFsaWRUb2tlbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuSW52YWxpZFRva2VuRXJyb3IucHJvdG90eXBlLm5hbWUgPSBcIkludmFsaWRUb2tlbkVycm9yXCI7XG5mdW5jdGlvbiBiNjREZWNvZGVVbmljb2RlKHN0cikge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoYXRvYihzdHIpLnJlcGxhY2UoLyguKS9nLCAobSwgcCkgPT4ge1xuICAgICAgICBsZXQgY29kZSA9IHAuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgaWYgKGNvZGUubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgY29kZSA9IFwiMFwiICsgY29kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCIlXCIgKyBjb2RlO1xuICAgIH0pKTtcbn1cbmZ1bmN0aW9uIGJhc2U2NFVybERlY29kZShzdHIpIHtcbiAgICBsZXQgb3V0cHV0ID0gc3RyLnJlcGxhY2UoLy0vZywgXCIrXCIpLnJlcGxhY2UoL18vZywgXCIvXCIpO1xuICAgIHN3aXRjaCAob3V0cHV0Lmxlbmd0aCAlIDQpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIG91dHB1dCArPSBcIj09XCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgb3V0cHV0ICs9IFwiPVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYXNlNjQgc3RyaW5nIGlzIG5vdCBvZiB0aGUgY29ycmVjdCBsZW5ndGhcIik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBiNjREZWNvZGVVbmljb2RlKG91dHB1dCk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGF0b2Iob3V0cHV0KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gand0RGVjb2RlKHRva2VuLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFRva2VuRXJyb3IoXCJJbnZhbGlkIHRva2VuIHNwZWNpZmllZDogbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG4gICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICBjb25zdCBwb3MgPSBvcHRpb25zLmhlYWRlciA9PT0gdHJ1ZSA/IDAgOiAxO1xuICAgIGNvbnN0IHBhcnQgPSB0b2tlbi5zcGxpdChcIi5cIilbcG9zXTtcbiAgICBpZiAodHlwZW9mIHBhcnQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRUb2tlbkVycm9yKGBJbnZhbGlkIHRva2VuIHNwZWNpZmllZDogbWlzc2luZyBwYXJ0ICMke3BvcyArIDF9YCk7XG4gICAgfVxuICAgIGxldCBkZWNvZGVkO1xuICAgIHRyeSB7XG4gICAgICAgIGRlY29kZWQgPSBiYXNlNjRVcmxEZWNvZGUocGFydCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkVG9rZW5FcnJvcihgSW52YWxpZCB0b2tlbiBzcGVjaWZpZWQ6IGludmFsaWQgYmFzZTY0IGZvciBwYXJ0ICMke3BvcyArIDF9ICgke2UubWVzc2FnZX0pYCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRlY29kZWQpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFRva2VuRXJyb3IoYEludmFsaWQgdG9rZW4gc3BlY2lmaWVkOiBpbnZhbGlkIGpzb24gZm9yIHBhcnQgIyR7cG9zICsgMX0gKCR7ZS5tZXNzYWdlfSlgKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiSW52YWxpZFRva2VuRXJyb3IiLCJFcnJvciIsInByb3RvdHlwZSIsIm5hbWUiLCJiNjREZWNvZGVVbmljb2RlIiwic3RyIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiYXRvYiIsInJlcGxhY2UiLCJtIiwicCIsImNvZGUiLCJjaGFyQ29kZUF0IiwidG9TdHJpbmciLCJ0b1VwcGVyQ2FzZSIsImxlbmd0aCIsImJhc2U2NFVybERlY29kZSIsIm91dHB1dCIsImVyciIsImp3dERlY29kZSIsInRva2VuIiwib3B0aW9ucyIsInBvcyIsImhlYWRlciIsInBhcnQiLCJzcGxpdCIsImRlY29kZWQiLCJlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/jwt-decode/build/esm/index.js\n");

/***/ })

};
;
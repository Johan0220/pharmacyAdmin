"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mime-types";
exports.ids = ["vendor-chunks/mime-types"];
exports.modules = {

/***/ "(ssr)/./node_modules/mime-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/mime-types/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/*!\n * mime-types\n * Copyright(c) 2014 Jonathan Ong\n * Copyright(c) 2015 Douglas Christopher Wilson\n * MIT Licensed\n */ \n/**\n * Module dependencies.\n * @private\n */ var db = __webpack_require__(/*! mime-db */ \"(ssr)/./node_modules/mime-db/index.js\");\nvar extname = (__webpack_require__(/*! path */ \"path\").extname);\n/**\n * Module variables.\n * @private\n */ var EXTRACT_TYPE_REGEXP = /^\\s*([^;\\s]*)(?:;|\\s|$)/;\nvar TEXT_TYPE_REGEXP = /^text\\//i;\n/**\n * Module exports.\n * @public\n */ exports.charset = charset;\nexports.charsets = {\n    lookup: charset\n};\nexports.contentType = contentType;\nexports.extension = extension;\nexports.extensions = Object.create(null);\nexports.lookup = lookup;\nexports.types = Object.create(null);\n// Populate the extensions/types maps\npopulateMaps(exports.extensions, exports.types);\n/**\n * Get the default charset for a MIME type.\n *\n * @param {string} type\n * @return {boolean|string}\n */ function charset(type) {\n    if (!type || typeof type !== \"string\") {\n        return false;\n    }\n    // TODO: use media-typer\n    var match = EXTRACT_TYPE_REGEXP.exec(type);\n    var mime = match && db[match[1].toLowerCase()];\n    if (mime && mime.charset) {\n        return mime.charset;\n    }\n    // default text/* to utf-8\n    if (match && TEXT_TYPE_REGEXP.test(match[1])) {\n        return \"UTF-8\";\n    }\n    return false;\n}\n/**\n * Create a full Content-Type header given a MIME type or extension.\n *\n * @param {string} str\n * @return {boolean|string}\n */ function contentType(str) {\n    // TODO: should this even be in this module?\n    if (!str || typeof str !== \"string\") {\n        return false;\n    }\n    var mime = str.indexOf(\"/\") === -1 ? exports.lookup(str) : str;\n    if (!mime) {\n        return false;\n    }\n    // TODO: use content-type or other module\n    if (mime.indexOf(\"charset\") === -1) {\n        var charset = exports.charset(mime);\n        if (charset) mime += \"; charset=\" + charset.toLowerCase();\n    }\n    return mime;\n}\n/**\n * Get the default extension for a MIME type.\n *\n * @param {string} type\n * @return {boolean|string}\n */ function extension(type) {\n    if (!type || typeof type !== \"string\") {\n        return false;\n    }\n    // TODO: use media-typer\n    var match = EXTRACT_TYPE_REGEXP.exec(type);\n    // get extensions\n    var exts = match && exports.extensions[match[1].toLowerCase()];\n    if (!exts || !exts.length) {\n        return false;\n    }\n    return exts[0];\n}\n/**\n * Lookup the MIME type for a file path/extension.\n *\n * @param {string} path\n * @return {boolean|string}\n */ function lookup(path) {\n    if (!path || typeof path !== \"string\") {\n        return false;\n    }\n    // get the extension (\"ext\" or \".ext\" or full path)\n    var extension = extname(\"x.\" + path).toLowerCase().substr(1);\n    if (!extension) {\n        return false;\n    }\n    return exports.types[extension] || false;\n}\n/**\n * Populate the extensions and types maps.\n * @private\n */ function populateMaps(extensions, types) {\n    // source preference (least -> most)\n    var preference = [\n        \"nginx\",\n        \"apache\",\n        undefined,\n        \"iana\"\n    ];\n    Object.keys(db).forEach(function forEachMimeType(type) {\n        var mime = db[type];\n        var exts = mime.extensions;\n        if (!exts || !exts.length) {\n            return;\n        }\n        // mime -> extensions\n        extensions[type] = exts;\n        // extension -> mime\n        for(var i = 0; i < exts.length; i++){\n            var extension = exts[i];\n            if (types[extension]) {\n                var from = preference.indexOf(db[types[extension]].source);\n                var to = preference.indexOf(mime.source);\n                if (types[extension] !== \"application/octet-stream\" && (from > to || from === to && types[extension].substr(0, 12) === \"application/\")) {\n                    continue;\n                }\n            }\n            // set the extension -> mime\n            types[extension] = type;\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWltZS10eXBlcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Q0FLQyxHQUVEO0FBRUE7OztDQUdDLEdBRUQsSUFBSUEsS0FBS0MsbUJBQU9BLENBQUM7QUFDakIsSUFBSUMsVUFBVUQsaURBQXVCO0FBRXJDOzs7Q0FHQyxHQUVELElBQUlFLHNCQUFzQjtBQUMxQixJQUFJQyxtQkFBbUI7QUFFdkI7OztDQUdDLEdBRURDLGVBQWUsR0FBR0M7QUFDbEJELGdCQUFnQixHQUFHO0lBQUVHLFFBQVFGO0FBQVE7QUFDckNELG1CQUFtQixHQUFHSTtBQUN0QkosaUJBQWlCLEdBQUdLO0FBQ3BCTCxrQkFBa0IsR0FBR08sT0FBT0MsTUFBTSxDQUFDO0FBQ25DUixjQUFjLEdBQUdHO0FBQ2pCSCxhQUFhLEdBQUdPLE9BQU9DLE1BQU0sQ0FBQztBQUU5QixxQ0FBcUM7QUFDckNFLGFBQWFWLFFBQVFNLFVBQVUsRUFBRU4sUUFBUVMsS0FBSztBQUU5Qzs7Ozs7Q0FLQyxHQUVELFNBQVNSLFFBQVNVLElBQUk7SUFDcEIsSUFBSSxDQUFDQSxRQUFRLE9BQU9BLFNBQVMsVUFBVTtRQUNyQyxPQUFPO0lBQ1Q7SUFFQSx3QkFBd0I7SUFDeEIsSUFBSUMsUUFBUWQsb0JBQW9CZSxJQUFJLENBQUNGO0lBQ3JDLElBQUlHLE9BQU9GLFNBQVNqQixFQUFFLENBQUNpQixLQUFLLENBQUMsRUFBRSxDQUFDRyxXQUFXLEdBQUc7SUFFOUMsSUFBSUQsUUFBUUEsS0FBS2IsT0FBTyxFQUFFO1FBQ3hCLE9BQU9hLEtBQUtiLE9BQU87SUFDckI7SUFFQSwwQkFBMEI7SUFDMUIsSUFBSVcsU0FBU2IsaUJBQWlCaUIsSUFBSSxDQUFDSixLQUFLLENBQUMsRUFBRSxHQUFHO1FBQzVDLE9BQU87SUFDVDtJQUVBLE9BQU87QUFDVDtBQUVBOzs7OztDQUtDLEdBRUQsU0FBU1IsWUFBYWEsR0FBRztJQUN2Qiw0Q0FBNEM7SUFDNUMsSUFBSSxDQUFDQSxPQUFPLE9BQU9BLFFBQVEsVUFBVTtRQUNuQyxPQUFPO0lBQ1Q7SUFFQSxJQUFJSCxPQUFPRyxJQUFJQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQzdCbEIsUUFBUUcsTUFBTSxDQUFDYyxPQUNmQTtJQUVKLElBQUksQ0FBQ0gsTUFBTTtRQUNULE9BQU87SUFDVDtJQUVBLHlDQUF5QztJQUN6QyxJQUFJQSxLQUFLSSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUc7UUFDbEMsSUFBSWpCLFVBQVVELFFBQVFDLE9BQU8sQ0FBQ2E7UUFDOUIsSUFBSWIsU0FBU2EsUUFBUSxlQUFlYixRQUFRYyxXQUFXO0lBQ3pEO0lBRUEsT0FBT0Q7QUFDVDtBQUVBOzs7OztDQUtDLEdBRUQsU0FBU1QsVUFBV00sSUFBSTtJQUN0QixJQUFJLENBQUNBLFFBQVEsT0FBT0EsU0FBUyxVQUFVO1FBQ3JDLE9BQU87SUFDVDtJQUVBLHdCQUF3QjtJQUN4QixJQUFJQyxRQUFRZCxvQkFBb0JlLElBQUksQ0FBQ0Y7SUFFckMsaUJBQWlCO0lBQ2pCLElBQUlRLE9BQU9QLFNBQVNaLFFBQVFNLFVBQVUsQ0FBQ00sS0FBSyxDQUFDLEVBQUUsQ0FBQ0csV0FBVyxHQUFHO0lBRTlELElBQUksQ0FBQ0ksUUFBUSxDQUFDQSxLQUFLQyxNQUFNLEVBQUU7UUFDekIsT0FBTztJQUNUO0lBRUEsT0FBT0QsSUFBSSxDQUFDLEVBQUU7QUFDaEI7QUFFQTs7Ozs7Q0FLQyxHQUVELFNBQVNoQixPQUFRa0IsSUFBSTtJQUNuQixJQUFJLENBQUNBLFFBQVEsT0FBT0EsU0FBUyxVQUFVO1FBQ3JDLE9BQU87SUFDVDtJQUVBLG1EQUFtRDtJQUNuRCxJQUFJaEIsWUFBWVIsUUFBUSxPQUFPd0IsTUFDNUJOLFdBQVcsR0FDWE8sTUFBTSxDQUFDO0lBRVYsSUFBSSxDQUFDakIsV0FBVztRQUNkLE9BQU87SUFDVDtJQUVBLE9BQU9MLFFBQVFTLEtBQUssQ0FBQ0osVUFBVSxJQUFJO0FBQ3JDO0FBRUE7OztDQUdDLEdBRUQsU0FBU0ssYUFBY0osVUFBVSxFQUFFRyxLQUFLO0lBQ3RDLG9DQUFvQztJQUNwQyxJQUFJYyxhQUFhO1FBQUM7UUFBUztRQUFVQztRQUFXO0tBQU87SUFFdkRqQixPQUFPa0IsSUFBSSxDQUFDOUIsSUFBSStCLE9BQU8sQ0FBQyxTQUFTQyxnQkFBaUJoQixJQUFJO1FBQ3BELElBQUlHLE9BQU9uQixFQUFFLENBQUNnQixLQUFLO1FBQ25CLElBQUlRLE9BQU9MLEtBQUtSLFVBQVU7UUFFMUIsSUFBSSxDQUFDYSxRQUFRLENBQUNBLEtBQUtDLE1BQU0sRUFBRTtZQUN6QjtRQUNGO1FBRUEscUJBQXFCO1FBQ3JCZCxVQUFVLENBQUNLLEtBQUssR0FBR1E7UUFFbkIsb0JBQW9CO1FBQ3BCLElBQUssSUFBSVMsSUFBSSxHQUFHQSxJQUFJVCxLQUFLQyxNQUFNLEVBQUVRLElBQUs7WUFDcEMsSUFBSXZCLFlBQVljLElBQUksQ0FBQ1MsRUFBRTtZQUV2QixJQUFJbkIsS0FBSyxDQUFDSixVQUFVLEVBQUU7Z0JBQ3BCLElBQUl3QixPQUFPTixXQUFXTCxPQUFPLENBQUN2QixFQUFFLENBQUNjLEtBQUssQ0FBQ0osVUFBVSxDQUFDLENBQUN5QixNQUFNO2dCQUN6RCxJQUFJQyxLQUFLUixXQUFXTCxPQUFPLENBQUNKLEtBQUtnQixNQUFNO2dCQUV2QyxJQUFJckIsS0FBSyxDQUFDSixVQUFVLEtBQUssOEJBQ3RCd0IsQ0FBQUEsT0FBT0UsTUFBT0YsU0FBU0UsTUFBTXRCLEtBQUssQ0FBQ0osVUFBVSxDQUFDaUIsTUFBTSxDQUFDLEdBQUcsUUFBUSxjQUFjLEdBQUk7b0JBRW5GO2dCQUNGO1lBQ0Y7WUFFQSw0QkFBNEI7WUFDNUJiLEtBQUssQ0FBQ0osVUFBVSxHQUFHTTtRQUNyQjtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waGFyYW1jZXV0aXRhbHMvLi9ub2RlX21vZHVsZXMvbWltZS10eXBlcy9pbmRleC5qcz9jNmQxIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogbWltZS10eXBlc1xuICogQ29weXJpZ2h0KGMpIDIwMTQgSm9uYXRoYW4gT25nXG4gKiBDb3B5cmlnaHQoYykgMjAxNSBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqIEBwcml2YXRlXG4gKi9cblxudmFyIGRiID0gcmVxdWlyZSgnbWltZS1kYicpXG52YXIgZXh0bmFtZSA9IHJlcXVpcmUoJ3BhdGgnKS5leHRuYW1lXG5cbi8qKlxuICogTW9kdWxlIHZhcmlhYmxlcy5cbiAqIEBwcml2YXRlXG4gKi9cblxudmFyIEVYVFJBQ1RfVFlQRV9SRUdFWFAgPSAvXlxccyooW147XFxzXSopKD86O3xcXHN8JCkvXG52YXIgVEVYVF9UWVBFX1JFR0VYUCA9IC9edGV4dFxcLy9pXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5jaGFyc2V0ID0gY2hhcnNldFxuZXhwb3J0cy5jaGFyc2V0cyA9IHsgbG9va3VwOiBjaGFyc2V0IH1cbmV4cG9ydHMuY29udGVudFR5cGUgPSBjb250ZW50VHlwZVxuZXhwb3J0cy5leHRlbnNpb24gPSBleHRlbnNpb25cbmV4cG9ydHMuZXh0ZW5zaW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbClcbmV4cG9ydHMubG9va3VwID0gbG9va3VwXG5leHBvcnRzLnR5cGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4vLyBQb3B1bGF0ZSB0aGUgZXh0ZW5zaW9ucy90eXBlcyBtYXBzXG5wb3B1bGF0ZU1hcHMoZXhwb3J0cy5leHRlbnNpb25zLCBleHBvcnRzLnR5cGVzKVxuXG4vKipcbiAqIEdldCB0aGUgZGVmYXVsdCBjaGFyc2V0IGZvciBhIE1JTUUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHJldHVybiB7Ym9vbGVhbnxzdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gY2hhcnNldCAodHlwZSkge1xuICBpZiAoIXR5cGUgfHwgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBUT0RPOiB1c2UgbWVkaWEtdHlwZXJcbiAgdmFyIG1hdGNoID0gRVhUUkFDVF9UWVBFX1JFR0VYUC5leGVjKHR5cGUpXG4gIHZhciBtaW1lID0gbWF0Y2ggJiYgZGJbbWF0Y2hbMV0udG9Mb3dlckNhc2UoKV1cblxuICBpZiAobWltZSAmJiBtaW1lLmNoYXJzZXQpIHtcbiAgICByZXR1cm4gbWltZS5jaGFyc2V0XG4gIH1cblxuICAvLyBkZWZhdWx0IHRleHQvKiB0byB1dGYtOFxuICBpZiAobWF0Y2ggJiYgVEVYVF9UWVBFX1JFR0VYUC50ZXN0KG1hdGNoWzFdKSkge1xuICAgIHJldHVybiAnVVRGLTgnXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBmdWxsIENvbnRlbnQtVHlwZSBoZWFkZXIgZ2l2ZW4gYSBNSU1FIHR5cGUgb3IgZXh0ZW5zaW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGNvbnRlbnRUeXBlIChzdHIpIHtcbiAgLy8gVE9ETzogc2hvdWxkIHRoaXMgZXZlbiBiZSBpbiB0aGlzIG1vZHVsZT9cbiAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHZhciBtaW1lID0gc3RyLmluZGV4T2YoJy8nKSA9PT0gLTFcbiAgICA/IGV4cG9ydHMubG9va3VwKHN0cilcbiAgICA6IHN0clxuXG4gIGlmICghbWltZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gVE9ETzogdXNlIGNvbnRlbnQtdHlwZSBvciBvdGhlciBtb2R1bGVcbiAgaWYgKG1pbWUuaW5kZXhPZignY2hhcnNldCcpID09PSAtMSkge1xuICAgIHZhciBjaGFyc2V0ID0gZXhwb3J0cy5jaGFyc2V0KG1pbWUpXG4gICAgaWYgKGNoYXJzZXQpIG1pbWUgKz0gJzsgY2hhcnNldD0nICsgY2hhcnNldC50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICByZXR1cm4gbWltZVxufVxuXG4vKipcbiAqIEdldCB0aGUgZGVmYXVsdCBleHRlbnNpb24gZm9yIGEgTUlNRSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtib29sZWFufHN0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBleHRlbnNpb24gKHR5cGUpIHtcbiAgaWYgKCF0eXBlIHx8IHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gVE9ETzogdXNlIG1lZGlhLXR5cGVyXG4gIHZhciBtYXRjaCA9IEVYVFJBQ1RfVFlQRV9SRUdFWFAuZXhlYyh0eXBlKVxuXG4gIC8vIGdldCBleHRlbnNpb25zXG4gIHZhciBleHRzID0gbWF0Y2ggJiYgZXhwb3J0cy5leHRlbnNpb25zW21hdGNoWzFdLnRvTG93ZXJDYXNlKCldXG5cbiAgaWYgKCFleHRzIHx8ICFleHRzLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIGV4dHNbMF1cbn1cblxuLyoqXG4gKiBMb29rdXAgdGhlIE1JTUUgdHlwZSBmb3IgYSBmaWxlIHBhdGgvZXh0ZW5zaW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKiBAcmV0dXJuIHtib29sZWFufHN0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBsb29rdXAgKHBhdGgpIHtcbiAgaWYgKCFwYXRoIHx8IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gZ2V0IHRoZSBleHRlbnNpb24gKFwiZXh0XCIgb3IgXCIuZXh0XCIgb3IgZnVsbCBwYXRoKVxuICB2YXIgZXh0ZW5zaW9uID0gZXh0bmFtZSgneC4nICsgcGF0aClcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5zdWJzdHIoMSlcblxuICBpZiAoIWV4dGVuc2lvbikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMudHlwZXNbZXh0ZW5zaW9uXSB8fCBmYWxzZVxufVxuXG4vKipcbiAqIFBvcHVsYXRlIHRoZSBleHRlbnNpb25zIGFuZCB0eXBlcyBtYXBzLlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwb3B1bGF0ZU1hcHMgKGV4dGVuc2lvbnMsIHR5cGVzKSB7XG4gIC8vIHNvdXJjZSBwcmVmZXJlbmNlIChsZWFzdCAtPiBtb3N0KVxuICB2YXIgcHJlZmVyZW5jZSA9IFsnbmdpbngnLCAnYXBhY2hlJywgdW5kZWZpbmVkLCAnaWFuYSddXG5cbiAgT2JqZWN0LmtleXMoZGIpLmZvckVhY2goZnVuY3Rpb24gZm9yRWFjaE1pbWVUeXBlICh0eXBlKSB7XG4gICAgdmFyIG1pbWUgPSBkYlt0eXBlXVxuICAgIHZhciBleHRzID0gbWltZS5leHRlbnNpb25zXG5cbiAgICBpZiAoIWV4dHMgfHwgIWV4dHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBtaW1lIC0+IGV4dGVuc2lvbnNcbiAgICBleHRlbnNpb25zW3R5cGVdID0gZXh0c1xuXG4gICAgLy8gZXh0ZW5zaW9uIC0+IG1pbWVcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBleHRlbnNpb24gPSBleHRzW2ldXG5cbiAgICAgIGlmICh0eXBlc1tleHRlbnNpb25dKSB7XG4gICAgICAgIHZhciBmcm9tID0gcHJlZmVyZW5jZS5pbmRleE9mKGRiW3R5cGVzW2V4dGVuc2lvbl1dLnNvdXJjZSlcbiAgICAgICAgdmFyIHRvID0gcHJlZmVyZW5jZS5pbmRleE9mKG1pbWUuc291cmNlKVxuXG4gICAgICAgIGlmICh0eXBlc1tleHRlbnNpb25dICE9PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyAmJlxuICAgICAgICAgIChmcm9tID4gdG8gfHwgKGZyb20gPT09IHRvICYmIHR5cGVzW2V4dGVuc2lvbl0uc3Vic3RyKDAsIDEyKSA9PT0gJ2FwcGxpY2F0aW9uLycpKSkge1xuICAgICAgICAgIC8vIHNraXAgdGhlIHJlbWFwcGluZ1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSBleHRlbnNpb24gLT4gbWltZVxuICAgICAgdHlwZXNbZXh0ZW5zaW9uXSA9IHR5cGVcbiAgICB9XG4gIH0pXG59XG4iXSwibmFtZXMiOlsiZGIiLCJyZXF1aXJlIiwiZXh0bmFtZSIsIkVYVFJBQ1RfVFlQRV9SRUdFWFAiLCJURVhUX1RZUEVfUkVHRVhQIiwiZXhwb3J0cyIsImNoYXJzZXQiLCJjaGFyc2V0cyIsImxvb2t1cCIsImNvbnRlbnRUeXBlIiwiZXh0ZW5zaW9uIiwiZXh0ZW5zaW9ucyIsIk9iamVjdCIsImNyZWF0ZSIsInR5cGVzIiwicG9wdWxhdGVNYXBzIiwidHlwZSIsIm1hdGNoIiwiZXhlYyIsIm1pbWUiLCJ0b0xvd2VyQ2FzZSIsInRlc3QiLCJzdHIiLCJpbmRleE9mIiwiZXh0cyIsImxlbmd0aCIsInBhdGgiLCJzdWJzdHIiLCJwcmVmZXJlbmNlIiwidW5kZWZpbmVkIiwia2V5cyIsImZvckVhY2giLCJmb3JFYWNoTWltZVR5cGUiLCJpIiwiZnJvbSIsInNvdXJjZSIsInRvIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mime-types/index.js\n");

/***/ })

};
;
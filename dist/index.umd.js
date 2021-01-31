(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('stream'), require('http'), require('url'), require('https'), require('zlib')) :
	typeof define === 'function' && define.amd ? define(['stream', 'http', 'url', 'https', 'zlib'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['oxen-rpc-js'] = factory(global.Stream, global.http, global.Url, global.https, global.zlib));
}(this, (function (Stream, http, Url, https, zlib) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
	var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
	var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
	var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
	var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsPunctuationRange = '\\u2000-\\u206f',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]",
	    rsAstral = '[' + rsAstralRange + ']',
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos, 'g');

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([
	  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
	  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
	  rsUpper + '+' + rsOptUpperContr,
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');

	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
	  // Latin-1 Supplement block.
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss',
	  // Latin Extended-A block.
	  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
	  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
	  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
	  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
	  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
	  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
	  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
	  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
	  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
	  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
	  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
	  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
	  '\u0134': 'J',  '\u0135': 'j',
	  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
	  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
	  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
	  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
	  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
	  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
	  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
	  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
	  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
	  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
	  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
	  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
	  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
	  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
	  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
	  '\u0174': 'W',  '\u0175': 'w',
	  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
	  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
	  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
	  '\u0132': 'IJ', '\u0133': 'ij',
	  '\u0152': 'Oe', '\u0153': 'oe',
	  '\u0149': "'n", '\u017f': 'ss'
	};

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}

	/**
	 * Splits an ASCII `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function asciiWords(string) {
	  return string.match(reAsciiWord) || [];
	}

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	 * letters to basic Latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	var deburrLetter = basePropertyOf(deburredLetters);

	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}

	/**
	 * Checks if `string` contains a word composed of Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a word is found, else `false`.
	 */
	function hasUnicodeWord(string) {
	  return reHasUnicodeWord.test(string);
	}

	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return hasUnicode(string)
	    ? unicodeToArray(string)
	    : asciiToArray(string);
	}

	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}

	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	  return string.match(reUnicodeWord) || [];
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var Symbol$1 = root.Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : baseSlice(array, start, end);
	}

	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new case function.
	 */
	function createCaseFirst(methodName) {
	  return function(string) {
	    string = toString(string);

	    var strSymbols = hasUnicode(string)
	      ? stringToArray(string)
	      : undefined;

	    var chr = strSymbols
	      ? strSymbols[0]
	      : string.charAt(0);

	    var trailing = strSymbols
	      ? castSlice(strSymbols, 1).join('')
	      : string.slice(1);

	    return chr[methodName]() + trailing;
	  };
	}

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
	  };
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	/**
	 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the camel cased string.
	 * @example
	 *
	 * _.camelCase('Foo Bar');
	 * // => 'fooBar'
	 *
	 * _.camelCase('--foo-bar--');
	 * // => 'fooBar'
	 *
	 * _.camelCase('__FOO_BAR__');
	 * // => 'fooBar'
	 */
	var camelCase = createCompounder(function(result, word, index) {
	  word = word.toLowerCase();
	  return result + (index ? capitalize(word) : word);
	});

	/**
	 * Converts the first character of `string` to upper case and the remaining
	 * to lower case.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to capitalize.
	 * @returns {string} Returns the capitalized string.
	 * @example
	 *
	 * _.capitalize('FRED');
	 * // => 'Fred'
	 */
	function capitalize(string) {
	  return upperFirst(toString(string).toLowerCase());
	}

	/**
	 * Deburrs `string` by converting
	 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	 * letters to basic Latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
	}

	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */
	var upperFirst = createCaseFirst('toUpperCase');

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
	  }
	  return string.match(pattern) || [];
	}

	var lodash_camelcase = camelCase;

	// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

	// fix for "Readable" isn't a named export issue
	const Readable = Stream__default['default'].Readable;

	const BUFFER = Symbol('buffer');
	const TYPE = Symbol('type');

	class Blob {
		constructor() {
			this[TYPE] = '';

			const blobParts = arguments[0];
			const options = arguments[1];

			const buffers = [];
			let size = 0;

			if (blobParts) {
				const a = blobParts;
				const length = Number(a.length);
				for (let i = 0; i < length; i++) {
					const element = a[i];
					let buffer;
					if (element instanceof Buffer) {
						buffer = element;
					} else if (ArrayBuffer.isView(element)) {
						buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
					} else if (element instanceof ArrayBuffer) {
						buffer = Buffer.from(element);
					} else if (element instanceof Blob) {
						buffer = element[BUFFER];
					} else {
						buffer = Buffer.from(typeof element === 'string' ? element : String(element));
					}
					size += buffer.length;
					buffers.push(buffer);
				}
			}

			this[BUFFER] = Buffer.concat(buffers);

			let type = options && options.type !== undefined && String(options.type).toLowerCase();
			if (type && !/[^\u0020-\u007E]/.test(type)) {
				this[TYPE] = type;
			}
		}
		get size() {
			return this[BUFFER].length;
		}
		get type() {
			return this[TYPE];
		}
		text() {
			return Promise.resolve(this[BUFFER].toString());
		}
		arrayBuffer() {
			const buf = this[BUFFER];
			const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
			return Promise.resolve(ab);
		}
		stream() {
			const readable = new Readable();
			readable._read = function () {};
			readable.push(this[BUFFER]);
			readable.push(null);
			return readable;
		}
		toString() {
			return '[object Blob]';
		}
		slice() {
			const size = this.size;

			const start = arguments[0];
			const end = arguments[1];
			let relativeStart, relativeEnd;
			if (start === undefined) {
				relativeStart = 0;
			} else if (start < 0) {
				relativeStart = Math.max(size + start, 0);
			} else {
				relativeStart = Math.min(start, size);
			}
			if (end === undefined) {
				relativeEnd = size;
			} else if (end < 0) {
				relativeEnd = Math.max(size + end, 0);
			} else {
				relativeEnd = Math.min(end, size);
			}
			const span = Math.max(relativeEnd - relativeStart, 0);

			const buffer = this[BUFFER];
			const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
			const blob = new Blob([], { type: arguments[2] });
			blob[BUFFER] = slicedBuffer;
			return blob;
		}
	}

	Object.defineProperties(Blob.prototype, {
		size: { enumerable: true },
		type: { enumerable: true },
		slice: { enumerable: true }
	});

	Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
		value: 'Blob',
		writable: false,
		enumerable: false,
		configurable: true
	});

	/**
	 * fetch-error.js
	 *
	 * FetchError interface for operational errors
	 */

	/**
	 * Create FetchError instance
	 *
	 * @param   String      message      Error message for human
	 * @param   String      type         Error type for machine
	 * @param   String      systemError  For Node.js system error
	 * @return  FetchError
	 */
	function FetchError(message, type, systemError) {
	  Error.call(this, message);

	  this.message = message;
	  this.type = type;

	  // when err.type is `system`, err.code contains system error code
	  if (systemError) {
	    this.code = this.errno = systemError.code;
	  }

	  // hide custom error implementation details from end-users
	  Error.captureStackTrace(this, this.constructor);
	}

	FetchError.prototype = Object.create(Error.prototype);
	FetchError.prototype.constructor = FetchError;
	FetchError.prototype.name = 'FetchError';

	let convert;
	try {
		convert = require('encoding').convert;
	} catch (e) {}

	const INTERNALS = Symbol('Body internals');

	// fix an issue where "PassThrough" isn't a named export for node <10
	const PassThrough = Stream__default['default'].PassThrough;

	/**
	 * Body mixin
	 *
	 * Ref: https://fetch.spec.whatwg.org/#body
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	function Body(body) {
		var _this = this;

		var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    _ref$size = _ref.size;

		let size = _ref$size === undefined ? 0 : _ref$size;
		var _ref$timeout = _ref.timeout;
		let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

		if (body == null) {
			// body is undefined or null
			body = null;
		} else if (isURLSearchParams(body)) {
			// body is a URLSearchParams
			body = Buffer.from(body.toString());
		} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
			// body is ArrayBuffer
			body = Buffer.from(body);
		} else if (ArrayBuffer.isView(body)) {
			// body is ArrayBufferView
			body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
		} else if (body instanceof Stream__default['default']) ; else {
			// none of the above
			// coerce to string then buffer
			body = Buffer.from(String(body));
		}
		this[INTERNALS] = {
			body,
			disturbed: false,
			error: null
		};
		this.size = size;
		this.timeout = timeout;

		if (body instanceof Stream__default['default']) {
			body.on('error', function (err) {
				const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
				_this[INTERNALS].error = error;
			});
		}
	}

	Body.prototype = {
		get body() {
			return this[INTERNALS].body;
		},

		get bodyUsed() {
			return this[INTERNALS].disturbed;
		},

		/**
	  * Decode response as ArrayBuffer
	  *
	  * @return  Promise
	  */
		arrayBuffer() {
			return consumeBody.call(this).then(function (buf) {
				return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
			});
		},

		/**
	  * Return raw response as Blob
	  *
	  * @return Promise
	  */
		blob() {
			let ct = this.headers && this.headers.get('content-type') || '';
			return consumeBody.call(this).then(function (buf) {
				return Object.assign(
				// Prevent copying
				new Blob([], {
					type: ct.toLowerCase()
				}), {
					[BUFFER]: buf
				});
			});
		},

		/**
	  * Decode response as json
	  *
	  * @return  Promise
	  */
		json() {
			var _this2 = this;

			return consumeBody.call(this).then(function (buffer) {
				try {
					return JSON.parse(buffer.toString());
				} catch (err) {
					return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
				}
			});
		},

		/**
	  * Decode response as text
	  *
	  * @return  Promise
	  */
		text() {
			return consumeBody.call(this).then(function (buffer) {
				return buffer.toString();
			});
		},

		/**
	  * Decode response as buffer (non-spec api)
	  *
	  * @return  Promise
	  */
		buffer() {
			return consumeBody.call(this);
		},

		/**
	  * Decode response as text, while automatically detecting the encoding and
	  * trying to decode to UTF-8 (non-spec api)
	  *
	  * @return  Promise
	  */
		textConverted() {
			var _this3 = this;

			return consumeBody.call(this).then(function (buffer) {
				return convertBody(buffer, _this3.headers);
			});
		}
	};

	// In browsers, all properties are enumerable.
	Object.defineProperties(Body.prototype, {
		body: { enumerable: true },
		bodyUsed: { enumerable: true },
		arrayBuffer: { enumerable: true },
		blob: { enumerable: true },
		json: { enumerable: true },
		text: { enumerable: true }
	});

	Body.mixIn = function (proto) {
		for (const name of Object.getOwnPropertyNames(Body.prototype)) {
			// istanbul ignore else: future proof
			if (!(name in proto)) {
				const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
				Object.defineProperty(proto, name, desc);
			}
		}
	};

	/**
	 * Consume and convert an entire Body to a Buffer.
	 *
	 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
	 *
	 * @return  Promise
	 */
	function consumeBody() {
		var _this4 = this;

		if (this[INTERNALS].disturbed) {
			return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
		}

		this[INTERNALS].disturbed = true;

		if (this[INTERNALS].error) {
			return Body.Promise.reject(this[INTERNALS].error);
		}

		let body = this.body;

		// body is null
		if (body === null) {
			return Body.Promise.resolve(Buffer.alloc(0));
		}

		// body is blob
		if (isBlob(body)) {
			body = body.stream();
		}

		// body is buffer
		if (Buffer.isBuffer(body)) {
			return Body.Promise.resolve(body);
		}

		// istanbul ignore if: should never happen
		if (!(body instanceof Stream__default['default'])) {
			return Body.Promise.resolve(Buffer.alloc(0));
		}

		// body is stream
		// get ready to actually consume the body
		let accum = [];
		let accumBytes = 0;
		let abort = false;

		return new Body.Promise(function (resolve, reject) {
			let resTimeout;

			// allow timeout on slow response body
			if (_this4.timeout) {
				resTimeout = setTimeout(function () {
					abort = true;
					reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
				}, _this4.timeout);
			}

			// handle stream errors
			body.on('error', function (err) {
				if (err.name === 'AbortError') {
					// if the request was aborted, reject with this Error
					abort = true;
					reject(err);
				} else {
					// other errors, such as incorrect content-encoding
					reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
				}
			});

			body.on('data', function (chunk) {
				if (abort || chunk === null) {
					return;
				}

				if (_this4.size && accumBytes + chunk.length > _this4.size) {
					abort = true;
					reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
					return;
				}

				accumBytes += chunk.length;
				accum.push(chunk);
			});

			body.on('end', function () {
				if (abort) {
					return;
				}

				clearTimeout(resTimeout);

				try {
					resolve(Buffer.concat(accum, accumBytes));
				} catch (err) {
					// handle streams that have accumulated too much data (issue #414)
					reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
				}
			});
		});
	}

	/**
	 * Detect buffer encoding and convert to target encoding
	 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
	 *
	 * @param   Buffer  buffer    Incoming buffer
	 * @param   String  encoding  Target encoding
	 * @return  String
	 */
	function convertBody(buffer, headers) {
		if (typeof convert !== 'function') {
			throw new Error('The package `encoding` must be installed to use the textConverted() function');
		}

		const ct = headers.get('content-type');
		let charset = 'utf-8';
		let res, str;

		// header
		if (ct) {
			res = /charset=([^;]*)/i.exec(ct);
		}

		// no charset in content type, peek at response body for at most 1024 bytes
		str = buffer.slice(0, 1024).toString();

		// html5
		if (!res && str) {
			res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
		}

		// html4
		if (!res && str) {
			res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
			if (!res) {
				res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
				if (res) {
					res.pop(); // drop last quote
				}
			}

			if (res) {
				res = /charset=(.*)/i.exec(res.pop());
			}
		}

		// xml
		if (!res && str) {
			res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
		}

		// found charset
		if (res) {
			charset = res.pop();

			// prevent decode issues when sites use incorrect encoding
			// ref: https://hsivonen.fi/encoding-menu/
			if (charset === 'gb2312' || charset === 'gbk') {
				charset = 'gb18030';
			}
		}

		// turn raw buffers into a single utf-8 buffer
		return convert(buffer, 'UTF-8', charset).toString();
	}

	/**
	 * Detect a URLSearchParams object
	 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
	 *
	 * @param   Object  obj     Object to detect by type or brand
	 * @return  String
	 */
	function isURLSearchParams(obj) {
		// Duck-typing as a necessary condition.
		if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
			return false;
		}

		// Brand-checking and more duck-typing as optional condition.
		return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
	}

	/**
	 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
	 * @param  {*} obj
	 * @return {boolean}
	 */
	function isBlob(obj) {
		return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
	}

	/**
	 * Clone body given Res/Req instance
	 *
	 * @param   Mixed  instance  Response or Request instance
	 * @return  Mixed
	 */
	function clone(instance) {
		let p1, p2;
		let body = instance.body;

		// don't allow cloning a used body
		if (instance.bodyUsed) {
			throw new Error('cannot clone body after it is used');
		}

		// check that body is a stream and not form-data object
		// note: we can't clone the form-data object without having it as a dependency
		if (body instanceof Stream__default['default'] && typeof body.getBoundary !== 'function') {
			// tee instance body
			p1 = new PassThrough();
			p2 = new PassThrough();
			body.pipe(p1);
			body.pipe(p2);
			// set instance body to teed body and return the other teed body
			instance[INTERNALS].body = p1;
			body = p2;
		}

		return body;
	}

	/**
	 * Performs the operation "extract a `Content-Type` value from |object|" as
	 * specified in the specification:
	 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
	 *
	 * This function assumes that instance.body is present.
	 *
	 * @param   Mixed  instance  Any options.body input
	 */
	function extractContentType(body) {
		if (body === null) {
			// body is null
			return null;
		} else if (typeof body === 'string') {
			// body is string
			return 'text/plain;charset=UTF-8';
		} else if (isURLSearchParams(body)) {
			// body is a URLSearchParams
			return 'application/x-www-form-urlencoded;charset=UTF-8';
		} else if (isBlob(body)) {
			// body is blob
			return body.type || null;
		} else if (Buffer.isBuffer(body)) {
			// body is buffer
			return null;
		} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
			// body is ArrayBuffer
			return null;
		} else if (ArrayBuffer.isView(body)) {
			// body is ArrayBufferView
			return null;
		} else if (typeof body.getBoundary === 'function') {
			// detect form data input from form-data module
			return `multipart/form-data;boundary=${body.getBoundary()}`;
		} else if (body instanceof Stream__default['default']) {
			// body is stream
			// can't really do much about this
			return null;
		} else {
			// Body constructor defaults other things to string
			return 'text/plain;charset=UTF-8';
		}
	}

	/**
	 * The Fetch Standard treats this as if "total bytes" is a property on the body.
	 * For us, we have to explicitly get it with a function.
	 *
	 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
	 *
	 * @param   Body    instance   Instance of Body
	 * @return  Number?            Number of bytes, or null if not possible
	 */
	function getTotalBytes(instance) {
		const body = instance.body;


		if (body === null) {
			// body is null
			return 0;
		} else if (isBlob(body)) {
			return body.size;
		} else if (Buffer.isBuffer(body)) {
			// body is buffer
			return body.length;
		} else if (body && typeof body.getLengthSync === 'function') {
			// detect form data input from form-data module
			if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
			body.hasKnownLength && body.hasKnownLength()) {
				// 2.x
				return body.getLengthSync();
			}
			return null;
		} else {
			// body is stream
			return null;
		}
	}

	/**
	 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
	 *
	 * @param   Body    instance   Instance of Body
	 * @return  Void
	 */
	function writeToStream(dest, instance) {
		const body = instance.body;


		if (body === null) {
			// body is null
			dest.end();
		} else if (isBlob(body)) {
			body.stream().pipe(dest);
		} else if (Buffer.isBuffer(body)) {
			// body is buffer
			dest.write(body);
			dest.end();
		} else {
			// body is stream
			body.pipe(dest);
		}
	}

	// expose Promise
	Body.Promise = global.Promise;

	/**
	 * headers.js
	 *
	 * Headers class offers convenient helpers
	 */

	const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
	const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

	function validateName(name) {
		name = `${name}`;
		if (invalidTokenRegex.test(name) || name === '') {
			throw new TypeError(`${name} is not a legal HTTP header name`);
		}
	}

	function validateValue(value) {
		value = `${value}`;
		if (invalidHeaderCharRegex.test(value)) {
			throw new TypeError(`${value} is not a legal HTTP header value`);
		}
	}

	/**
	 * Find the key in the map object given a header name.
	 *
	 * Returns undefined if not found.
	 *
	 * @param   String  name  Header name
	 * @return  String|Undefined
	 */
	function find(map, name) {
		name = name.toLowerCase();
		for (const key in map) {
			if (key.toLowerCase() === name) {
				return key;
			}
		}
		return undefined;
	}

	const MAP = Symbol('map');
	class Headers {
		/**
	  * Headers class
	  *
	  * @param   Object  headers  Response headers
	  * @return  Void
	  */
		constructor() {
			let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

			this[MAP] = Object.create(null);

			if (init instanceof Headers) {
				const rawHeaders = init.raw();
				const headerNames = Object.keys(rawHeaders);

				for (const headerName of headerNames) {
					for (const value of rawHeaders[headerName]) {
						this.append(headerName, value);
					}
				}

				return;
			}

			// We don't worry about converting prop to ByteString here as append()
			// will handle it.
			if (init == null) ; else if (typeof init === 'object') {
				const method = init[Symbol.iterator];
				if (method != null) {
					if (typeof method !== 'function') {
						throw new TypeError('Header pairs must be iterable');
					}

					// sequence<sequence<ByteString>>
					// Note: per spec we have to first exhaust the lists then process them
					const pairs = [];
					for (const pair of init) {
						if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
							throw new TypeError('Each header pair must be iterable');
						}
						pairs.push(Array.from(pair));
					}

					for (const pair of pairs) {
						if (pair.length !== 2) {
							throw new TypeError('Each header pair must be a name/value tuple');
						}
						this.append(pair[0], pair[1]);
					}
				} else {
					// record<ByteString, ByteString>
					for (const key of Object.keys(init)) {
						const value = init[key];
						this.append(key, value);
					}
				}
			} else {
				throw new TypeError('Provided initializer must be an object');
			}
		}

		/**
	  * Return combined header value given name
	  *
	  * @param   String  name  Header name
	  * @return  Mixed
	  */
		get(name) {
			name = `${name}`;
			validateName(name);
			const key = find(this[MAP], name);
			if (key === undefined) {
				return null;
			}

			return this[MAP][key].join(', ');
		}

		/**
	  * Iterate over all headers
	  *
	  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
	  * @param   Boolean   thisArg   `this` context for callback function
	  * @return  Void
	  */
		forEach(callback) {
			let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			let pairs = getHeaders(this);
			let i = 0;
			while (i < pairs.length) {
				var _pairs$i = pairs[i];
				const name = _pairs$i[0],
				      value = _pairs$i[1];

				callback.call(thisArg, value, name, this);
				pairs = getHeaders(this);
				i++;
			}
		}

		/**
	  * Overwrite header values given name
	  *
	  * @param   String  name   Header name
	  * @param   String  value  Header value
	  * @return  Void
	  */
		set(name, value) {
			name = `${name}`;
			value = `${value}`;
			validateName(name);
			validateValue(value);
			const key = find(this[MAP], name);
			this[MAP][key !== undefined ? key : name] = [value];
		}

		/**
	  * Append a value onto existing header
	  *
	  * @param   String  name   Header name
	  * @param   String  value  Header value
	  * @return  Void
	  */
		append(name, value) {
			name = `${name}`;
			value = `${value}`;
			validateName(name);
			validateValue(value);
			const key = find(this[MAP], name);
			if (key !== undefined) {
				this[MAP][key].push(value);
			} else {
				this[MAP][name] = [value];
			}
		}

		/**
	  * Check for header name existence
	  *
	  * @param   String   name  Header name
	  * @return  Boolean
	  */
		has(name) {
			name = `${name}`;
			validateName(name);
			return find(this[MAP], name) !== undefined;
		}

		/**
	  * Delete all header values given name
	  *
	  * @param   String  name  Header name
	  * @return  Void
	  */
		delete(name) {
			name = `${name}`;
			validateName(name);
			const key = find(this[MAP], name);
			if (key !== undefined) {
				delete this[MAP][key];
			}
		}

		/**
	  * Return raw headers (non-spec api)
	  *
	  * @return  Object
	  */
		raw() {
			return this[MAP];
		}

		/**
	  * Get an iterator on keys.
	  *
	  * @return  Iterator
	  */
		keys() {
			return createHeadersIterator(this, 'key');
		}

		/**
	  * Get an iterator on values.
	  *
	  * @return  Iterator
	  */
		values() {
			return createHeadersIterator(this, 'value');
		}

		/**
	  * Get an iterator on entries.
	  *
	  * This is the default iterator of the Headers object.
	  *
	  * @return  Iterator
	  */
		[Symbol.iterator]() {
			return createHeadersIterator(this, 'key+value');
		}
	}
	Headers.prototype.entries = Headers.prototype[Symbol.iterator];

	Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
		value: 'Headers',
		writable: false,
		enumerable: false,
		configurable: true
	});

	Object.defineProperties(Headers.prototype, {
		get: { enumerable: true },
		forEach: { enumerable: true },
		set: { enumerable: true },
		append: { enumerable: true },
		has: { enumerable: true },
		delete: { enumerable: true },
		keys: { enumerable: true },
		values: { enumerable: true },
		entries: { enumerable: true }
	});

	function getHeaders(headers) {
		let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

		const keys = Object.keys(headers[MAP]).sort();
		return keys.map(kind === 'key' ? function (k) {
			return k.toLowerCase();
		} : kind === 'value' ? function (k) {
			return headers[MAP][k].join(', ');
		} : function (k) {
			return [k.toLowerCase(), headers[MAP][k].join(', ')];
		});
	}

	const INTERNAL = Symbol('internal');

	function createHeadersIterator(target, kind) {
		const iterator = Object.create(HeadersIteratorPrototype);
		iterator[INTERNAL] = {
			target,
			kind,
			index: 0
		};
		return iterator;
	}

	const HeadersIteratorPrototype = Object.setPrototypeOf({
		next() {
			// istanbul ignore if
			if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
				throw new TypeError('Value of `this` is not a HeadersIterator');
			}

			var _INTERNAL = this[INTERNAL];
			const target = _INTERNAL.target,
			      kind = _INTERNAL.kind,
			      index = _INTERNAL.index;

			const values = getHeaders(target, kind);
			const len = values.length;
			if (index >= len) {
				return {
					value: undefined,
					done: true
				};
			}

			this[INTERNAL].index = index + 1;

			return {
				value: values[index],
				done: false
			};
		}
	}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

	Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
		value: 'HeadersIterator',
		writable: false,
		enumerable: false,
		configurable: true
	});

	/**
	 * Export the Headers object in a form that Node.js can consume.
	 *
	 * @param   Headers  headers
	 * @return  Object
	 */
	function exportNodeCompatibleHeaders(headers) {
		const obj = Object.assign({ __proto__: null }, headers[MAP]);

		// http.request() only supports string as Host header. This hack makes
		// specifying custom Host header possible.
		const hostHeaderKey = find(headers[MAP], 'Host');
		if (hostHeaderKey !== undefined) {
			obj[hostHeaderKey] = obj[hostHeaderKey][0];
		}

		return obj;
	}

	/**
	 * Create a Headers object from an object of headers, ignoring those that do
	 * not conform to HTTP grammar productions.
	 *
	 * @param   Object  obj  Object of headers
	 * @return  Headers
	 */
	function createHeadersLenient(obj) {
		const headers = new Headers();
		for (const name of Object.keys(obj)) {
			if (invalidTokenRegex.test(name)) {
				continue;
			}
			if (Array.isArray(obj[name])) {
				for (const val of obj[name]) {
					if (invalidHeaderCharRegex.test(val)) {
						continue;
					}
					if (headers[MAP][name] === undefined) {
						headers[MAP][name] = [val];
					} else {
						headers[MAP][name].push(val);
					}
				}
			} else if (!invalidHeaderCharRegex.test(obj[name])) {
				headers[MAP][name] = [obj[name]];
			}
		}
		return headers;
	}

	const INTERNALS$1 = Symbol('Response internals');

	// fix an issue where "STATUS_CODES" aren't a named export for node <10
	const STATUS_CODES = http__default['default'].STATUS_CODES;

	/**
	 * Response class
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	class Response {
		constructor() {
			let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			Body.call(this, body, opts);

			const status = opts.status || 200;
			const headers = new Headers(opts.headers);

			if (body != null && !headers.has('Content-Type')) {
				const contentType = extractContentType(body);
				if (contentType) {
					headers.append('Content-Type', contentType);
				}
			}

			this[INTERNALS$1] = {
				url: opts.url,
				status,
				statusText: opts.statusText || STATUS_CODES[status],
				headers,
				counter: opts.counter
			};
		}

		get url() {
			return this[INTERNALS$1].url || '';
		}

		get status() {
			return this[INTERNALS$1].status;
		}

		/**
	  * Convenience property representing if the request ended normally
	  */
		get ok() {
			return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
		}

		get redirected() {
			return this[INTERNALS$1].counter > 0;
		}

		get statusText() {
			return this[INTERNALS$1].statusText;
		}

		get headers() {
			return this[INTERNALS$1].headers;
		}

		/**
	  * Clone this response
	  *
	  * @return  Response
	  */
		clone() {
			return new Response(clone(this), {
				url: this.url,
				status: this.status,
				statusText: this.statusText,
				headers: this.headers,
				ok: this.ok,
				redirected: this.redirected
			});
		}
	}

	Body.mixIn(Response.prototype);

	Object.defineProperties(Response.prototype, {
		url: { enumerable: true },
		status: { enumerable: true },
		ok: { enumerable: true },
		redirected: { enumerable: true },
		statusText: { enumerable: true },
		headers: { enumerable: true },
		clone: { enumerable: true }
	});

	Object.defineProperty(Response.prototype, Symbol.toStringTag, {
		value: 'Response',
		writable: false,
		enumerable: false,
		configurable: true
	});

	const INTERNALS$2 = Symbol('Request internals');

	// fix an issue where "format", "parse" aren't a named export for node <10
	const parse_url = Url__default['default'].parse;
	const format_url = Url__default['default'].format;

	const streamDestructionSupported = 'destroy' in Stream__default['default'].Readable.prototype;

	/**
	 * Check if a value is an instance of Request.
	 *
	 * @param   Mixed   input
	 * @return  Boolean
	 */
	function isRequest(input) {
		return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
	}

	function isAbortSignal(signal) {
		const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
		return !!(proto && proto.constructor.name === 'AbortSignal');
	}

	/**
	 * Request class
	 *
	 * @param   Mixed   input  Url or Request instance
	 * @param   Object  init   Custom options
	 * @return  Void
	 */
	class Request {
		constructor(input) {
			let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			let parsedURL;

			// normalize input
			if (!isRequest(input)) {
				if (input && input.href) {
					// in order to support Node.js' Url objects; though WHATWG's URL objects
					// will fall into this branch also (since their `toString()` will return
					// `href` property anyway)
					parsedURL = parse_url(input.href);
				} else {
					// coerce input to a string before attempting to parse
					parsedURL = parse_url(`${input}`);
				}
				input = {};
			} else {
				parsedURL = parse_url(input.url);
			}

			let method = init.method || input.method || 'GET';
			method = method.toUpperCase();

			if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
				throw new TypeError('Request with GET/HEAD method cannot have body');
			}

			let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

			Body.call(this, inputBody, {
				timeout: init.timeout || input.timeout || 0,
				size: init.size || input.size || 0
			});

			const headers = new Headers(init.headers || input.headers || {});

			if (inputBody != null && !headers.has('Content-Type')) {
				const contentType = extractContentType(inputBody);
				if (contentType) {
					headers.append('Content-Type', contentType);
				}
			}

			let signal = isRequest(input) ? input.signal : null;
			if ('signal' in init) signal = init.signal;

			if (signal != null && !isAbortSignal(signal)) {
				throw new TypeError('Expected signal to be an instanceof AbortSignal');
			}

			this[INTERNALS$2] = {
				method,
				redirect: init.redirect || input.redirect || 'follow',
				headers,
				parsedURL,
				signal
			};

			// node-fetch-only options
			this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
			this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
			this.counter = init.counter || input.counter || 0;
			this.agent = init.agent || input.agent;
		}

		get method() {
			return this[INTERNALS$2].method;
		}

		get url() {
			return format_url(this[INTERNALS$2].parsedURL);
		}

		get headers() {
			return this[INTERNALS$2].headers;
		}

		get redirect() {
			return this[INTERNALS$2].redirect;
		}

		get signal() {
			return this[INTERNALS$2].signal;
		}

		/**
	  * Clone this request
	  *
	  * @return  Request
	  */
		clone() {
			return new Request(this);
		}
	}

	Body.mixIn(Request.prototype);

	Object.defineProperty(Request.prototype, Symbol.toStringTag, {
		value: 'Request',
		writable: false,
		enumerable: false,
		configurable: true
	});

	Object.defineProperties(Request.prototype, {
		method: { enumerable: true },
		url: { enumerable: true },
		headers: { enumerable: true },
		redirect: { enumerable: true },
		clone: { enumerable: true },
		signal: { enumerable: true }
	});

	/**
	 * Convert a Request to Node.js http request options.
	 *
	 * @param   Request  A Request instance
	 * @return  Object   The options object to be passed to http.request
	 */
	function getNodeRequestOptions(request) {
		const parsedURL = request[INTERNALS$2].parsedURL;
		const headers = new Headers(request[INTERNALS$2].headers);

		// fetch step 1.3
		if (!headers.has('Accept')) {
			headers.set('Accept', '*/*');
		}

		// Basic fetch
		if (!parsedURL.protocol || !parsedURL.hostname) {
			throw new TypeError('Only absolute URLs are supported');
		}

		if (!/^https?:$/.test(parsedURL.protocol)) {
			throw new TypeError('Only HTTP(S) protocols are supported');
		}

		if (request.signal && request.body instanceof Stream__default['default'].Readable && !streamDestructionSupported) {
			throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
		}

		// HTTP-network-or-cache fetch steps 2.4-2.7
		let contentLengthValue = null;
		if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
			contentLengthValue = '0';
		}
		if (request.body != null) {
			const totalBytes = getTotalBytes(request);
			if (typeof totalBytes === 'number') {
				contentLengthValue = String(totalBytes);
			}
		}
		if (contentLengthValue) {
			headers.set('Content-Length', contentLengthValue);
		}

		// HTTP-network-or-cache fetch step 2.11
		if (!headers.has('User-Agent')) {
			headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
		}

		// HTTP-network-or-cache fetch step 2.15
		if (request.compress && !headers.has('Accept-Encoding')) {
			headers.set('Accept-Encoding', 'gzip,deflate');
		}

		let agent = request.agent;
		if (typeof agent === 'function') {
			agent = agent(parsedURL);
		}

		if (!headers.has('Connection') && !agent) {
			headers.set('Connection', 'close');
		}

		// HTTP-network fetch step 4.2
		// chunked encoding is handled by Node.js

		return Object.assign({}, parsedURL, {
			method: request.method,
			headers: exportNodeCompatibleHeaders(headers),
			agent
		});
	}

	/**
	 * abort-error.js
	 *
	 * AbortError interface for cancelled requests
	 */

	/**
	 * Create AbortError instance
	 *
	 * @param   String      message      Error message for human
	 * @return  AbortError
	 */
	function AbortError(message) {
	  Error.call(this, message);

	  this.type = 'aborted';
	  this.message = message;

	  // hide custom error implementation details from end-users
	  Error.captureStackTrace(this, this.constructor);
	}

	AbortError.prototype = Object.create(Error.prototype);
	AbortError.prototype.constructor = AbortError;
	AbortError.prototype.name = 'AbortError';

	// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
	const PassThrough$1 = Stream__default['default'].PassThrough;
	const resolve_url = Url__default['default'].resolve;

	/**
	 * Fetch function
	 *
	 * @param   Mixed    url   Absolute url or Request instance
	 * @param   Object   opts  Fetch options
	 * @return  Promise
	 */
	function fetch(url, opts) {

		// allow custom promise
		if (!fetch.Promise) {
			throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
		}

		Body.Promise = fetch.Promise;

		// wrap http.request into fetch
		return new fetch.Promise(function (resolve, reject) {
			// build request object
			const request = new Request(url, opts);
			const options = getNodeRequestOptions(request);

			const send = (options.protocol === 'https:' ? https__default['default'] : http__default['default']).request;
			const signal = request.signal;

			let response = null;

			const abort = function abort() {
				let error = new AbortError('The user aborted a request.');
				reject(error);
				if (request.body && request.body instanceof Stream__default['default'].Readable) {
					request.body.destroy(error);
				}
				if (!response || !response.body) return;
				response.body.emit('error', error);
			};

			if (signal && signal.aborted) {
				abort();
				return;
			}

			const abortAndFinalize = function abortAndFinalize() {
				abort();
				finalize();
			};

			// send request
			const req = send(options);
			let reqTimeout;

			if (signal) {
				signal.addEventListener('abort', abortAndFinalize);
			}

			function finalize() {
				req.abort();
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
				clearTimeout(reqTimeout);
			}

			if (request.timeout) {
				req.once('socket', function (socket) {
					reqTimeout = setTimeout(function () {
						reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
						finalize();
					}, request.timeout);
				});
			}

			req.on('error', function (err) {
				reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
				finalize();
			});

			req.on('response', function (res) {
				clearTimeout(reqTimeout);

				const headers = createHeadersLenient(res.headers);

				// HTTP fetch step 5
				if (fetch.isRedirect(res.statusCode)) {
					// HTTP fetch step 5.2
					const location = headers.get('Location');

					// HTTP fetch step 5.3
					const locationURL = location === null ? null : resolve_url(request.url, location);

					// HTTP fetch step 5.5
					switch (request.redirect) {
						case 'error':
							reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
							finalize();
							return;
						case 'manual':
							// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
							if (locationURL !== null) {
								// handle corrupted header
								try {
									headers.set('Location', locationURL);
								} catch (err) {
									// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
									reject(err);
								}
							}
							break;
						case 'follow':
							// HTTP-redirect fetch step 2
							if (locationURL === null) {
								break;
							}

							// HTTP-redirect fetch step 5
							if (request.counter >= request.follow) {
								reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
								finalize();
								return;
							}

							// HTTP-redirect fetch step 6 (counter increment)
							// Create a new Request object.
							const requestOpts = {
								headers: new Headers(request.headers),
								follow: request.follow,
								counter: request.counter + 1,
								agent: request.agent,
								compress: request.compress,
								method: request.method,
								body: request.body,
								signal: request.signal,
								timeout: request.timeout,
								size: request.size
							};

							// HTTP-redirect fetch step 9
							if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
								reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
								finalize();
								return;
							}

							// HTTP-redirect fetch step 11
							if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
								requestOpts.method = 'GET';
								requestOpts.body = undefined;
								requestOpts.headers.delete('content-length');
							}

							// HTTP-redirect fetch step 15
							resolve(fetch(new Request(locationURL, requestOpts)));
							finalize();
							return;
					}
				}

				// prepare response
				res.once('end', function () {
					if (signal) signal.removeEventListener('abort', abortAndFinalize);
				});
				let body = res.pipe(new PassThrough$1());

				const response_options = {
					url: request.url,
					status: res.statusCode,
					statusText: res.statusMessage,
					headers: headers,
					size: request.size,
					timeout: request.timeout,
					counter: request.counter
				};

				// HTTP-network fetch step 12.1.1.3
				const codings = headers.get('Content-Encoding');

				// HTTP-network fetch step 12.1.1.4: handle content codings

				// in following scenarios we ignore compression support
				// 1. compression support is disabled
				// 2. HEAD request
				// 3. no Content-Encoding header
				// 4. no content response (204)
				// 5. content not modified response (304)
				if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
					response = new Response(body, response_options);
					resolve(response);
					return;
				}

				// For Node v6+
				// Be less strict when decoding compressed responses, since sometimes
				// servers send slightly invalid responses that are still accepted
				// by common browsers.
				// Always using Z_SYNC_FLUSH is what cURL does.
				const zlibOptions = {
					flush: zlib__default['default'].Z_SYNC_FLUSH,
					finishFlush: zlib__default['default'].Z_SYNC_FLUSH
				};

				// for gzip
				if (codings == 'gzip' || codings == 'x-gzip') {
					body = body.pipe(zlib__default['default'].createGunzip(zlibOptions));
					response = new Response(body, response_options);
					resolve(response);
					return;
				}

				// for deflate
				if (codings == 'deflate' || codings == 'x-deflate') {
					// handle the infamous raw deflate response from old servers
					// a hack for old IIS and Apache servers
					const raw = res.pipe(new PassThrough$1());
					raw.once('data', function (chunk) {
						// see http://stackoverflow.com/questions/37519828
						if ((chunk[0] & 0x0F) === 0x08) {
							body = body.pipe(zlib__default['default'].createInflate());
						} else {
							body = body.pipe(zlib__default['default'].createInflateRaw());
						}
						response = new Response(body, response_options);
						resolve(response);
					});
					return;
				}

				// for br
				if (codings == 'br' && typeof zlib__default['default'].createBrotliDecompress === 'function') {
					body = body.pipe(zlib__default['default'].createBrotliDecompress());
					response = new Response(body, response_options);
					resolve(response);
					return;
				}

				// otherwise, use response as-is
				response = new Response(body, response_options);
				resolve(response);
			});

			writeToStream(req, request);
		});
	}
	/**
	 * Redirect code matching
	 *
	 * @param   Number   code  Status code
	 * @return  Boolean
	 */
	fetch.isRedirect = function (code) {
		return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
	};

	// expose Promise
	fetch.Promise = global.Promise;

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': fetch,
		Headers: Headers,
		Request: Request,
		Response: Response,
		FetchError: FetchError
	});

	var addresses = {
	  DEFAULT_DAEMON_ADDR: "http://public.loki.foundation:22023/json_rpc",
	  DEFAULT_SNODE_ADDR: "http://127.0.0.1:38157/json_rpc",
	  DEFAULT_WALLET_ADDR: "http://127.0.0.1:18082/json_rpc",
	};

	var formatParams = {
	  simpleTypeToArray(param) {
	    if (!Array.isArray(param)) return [param];
	    return param;
	  }
	};

	const { simpleTypeToArray } = formatParams;

	const COMMON_STRUCT_BLOCKHEADER = {
	  block_size: Number,
	  depth: Number,
	  difficulty: Number,
	  hash: String,
	  height: Number,
	  major_version: Number,
	  minor_version: Number,
	  nonce: Number,
	  num_txes: Number,
	  orphan_status: Boolean,
	  reward: Number,
	  timestamp: Number
	};

	var rpcdaemonMethods = {
	  /**
	   * @description Look up how many blocks are in the longest chain known to the node.
	   */
	  get_block_count: {
	    output: {
	      count: Number,
	      status: String
	    }
	  },
	  /**
	   * @description Look up a block's hash by its height.
	   */
	  on_get_block_hash: {
	    input: [Number],
	    output: String,
	    formatInput: simpleTypeToArray
	  },
	  /**
	   * @description Get a block template on which mining a new block.
	   */
	  get_block_template: {
	    input: {
	      wallet_address: String,
	      reserve_size: Number
	    },
	    output: {
	      blocktemplate_blob: String,
	      blockhashing_blob: String,
	      difficulty: Number,
	      expected_reward: Number,
	      height: Number,
	      prev_hash: Number,
	      reserved_offset: Number,
	      status: String,
	      untrusted: Boolean
	    }
	  },
	  /**
	   * @description Submit a mined block to the network.
	   */
	  submit_block: {
	    input: [String], // @todo: check blob data integrity ?
	    output: {
	      status: String
	    }
	  },
	  /**
	   * @description get_last_block_header
	   */
	  get_last_block_header: {
	    output: {
	      block_header: COMMON_STRUCT_BLOCKHEADER,
	      status: String,
	      untrusted: Boolean
	    }
	  },
	  get_block_header_by_hash: {
	    input: {
	      hash: String
	    },
	    output: {
	      block_header: COMMON_STRUCT_BLOCKHEADER,
	      status: String,
	      untrusted: Boolean
	    }
	  },
	  get_block_header_by_height: {
	    input: {
	      height: Number
	    },
	    output: {
	      block_header: COMMON_STRUCT_BLOCKHEADER,
	      status: String,
	      untrusted: Boolean
	    }
	  },
	  get_block_headers_range: {
	    input: {
	      start_height: Number,
	      end_height: Number
	    },
	    output: {
	      headers: [COMMON_STRUCT_BLOCKHEADER],
	      status: String,
	      untrusted: Boolean
	    }
	  },
	  get_block: {
	    input: {
	      height: Number,
	      hash: String
	    },
	    output: {
	      blob: String,
	      block_header: COMMON_STRUCT_BLOCKHEADER,
	      json: String,
	      miner_tx_hash: String,
	      tx_hashes: [String],
	      status: String,
	      untrusted: Boolean
	    }
	  },
	  get_connections: {
	    output: {
	      connections: [
	        {
	          address: String,
	          avg_download: Number,
	          avg_upload: Number,
	          connection_id: String,
	          current_download: Number,
	          current_upload: Number,
	          height: Number,
	          host: String,
	          incoming: Boolean,
	          ip: String,
	          live_time: Number,
	          local_ip: Boolean,
	          localhost: Boolean,
	          peer_id: String,
	          port: Number,
	          recv_count: Number,
	          recv_idle_time: Number,
	          send_count: Number,
	          send_idle_time: Number,
	          state: String,
	          support_flags: Number
	        }
	      ]
	    }
	  },
	  get_info: {},
	  hard_fork_info: {},
	  set_bans: {},
	  get_bans: {},
	  flush_txpool: {},
	  get_output_histogram: {},
	  get_coinbase_tx_sum: {},
	  get_fee_estimate: {},
	  get_alternate_chains: {},
	  relay_tx: {},
	  sync_info: {},
	  get_txpool_backlog: {},
	  get_output_distribution: {},
	  get_version: {}
	};

	var rpcsnodeMethods = {
	  /**
	   * @description Get the quorum state which is the list of public keys of the nodes
	   * who are voting, and the list of public keys of the nodes who are being tested.
	   */
	  get_quorum_state: {},

	  /**
	   * @description Get the required amount of $OXEN to become an Oxen Service Node
	   * at the queried height. For stagenet and testnet values, ensure the daemon is
	   * started with the --stagenet or --testnet flags respectively.
	   */
	  get_staking_requirement: {},

	  /**
	   * @description
	   * Get the service node public key of the queried daemon. The daemon must
	   * be started in --service-node mode otherwise this RPC command will fail.
	   */
	  get_service_node_key: {},

	  /**
	   * @description Get the metadata currently associated with the queried service
	   * node public keys such as, registration height and contributors, etc.
	   * If no public key is specified, this returns all the metadata for every service
	   * node the queried daemon currently knows about.
	   */
	  get_service_nodes: {},
	};

	var rpcwalletMethods = {
	  get_version: {}
	};

	var fetch$1 = /*@__PURE__*/getAugmentedNamespace(lib);

	const {
	  DEFAULT_DAEMON_ADDR,
	  DEFAULT_SNODE_ADDR,
	  DEFAULT_WALLET_ADDR,
	} = addresses;




	const DEFAULT_OPTIONS = {
	  address: undefined,
	  camelCase: false,
	  checkInputIntegrity: false,
	  checkOutputIntegrity: false,
	  debug: false,
	};
	const DEFAULT_METHOD_DEFINITION = {
	  input: null,
	  output: null,
	  formatInput: (_) => _, // noop
	};

	class RPCCaller {
	  constructor(methods, defaultAddress, options = DEFAULT_OPTIONS) {
	    this.methods = methods;
	    this.options = Object.assign(
	      {},
	      DEFAULT_OPTIONS,
	      { address: defaultAddress },
	      options
	    );

	    const sanitizeMethodName = (methodName) => {
	      return options.camelCase ? lodash_camelcase(methodName) : methodName;
	    };

	    Object.keys(this.methods).forEach((methodName) => {
	      const definition = Object.assign(
	        {},
	        DEFAULT_METHOD_DEFINITION,
	        this.methods[methodName]
	      );

	      this[sanitizeMethodName(methodName)] = (params) => {
	        // todo: check input integrity ?
	        const formattedParams = definition.formatInput(params);

	        this.__debug("start req:", methodName);
	        this.__debug("params:", formattedParams);
	        return this.call(methodName, formattedParams);
	      };
	    });
	  }

	  get address() {
	    return this.options.address;
	  }

	  call(method, params) {
	    return fetch$1(this.address, {
	      method: "post",
	      body: JSON.stringify({
	        method,
	        params,
	      }),
	    }).then((response) => response.json());
	  }

	  __debug(...messages) {
	    if (this.options.debug) {
	      console.log(...messages);
	    }
	  }
	}

	class RPCDaemon extends RPCCaller {
	  constructor(options) {
	    super(rpcdaemonMethods, DEFAULT_DAEMON_ADDR, options);
	  }
	}

	class RPCSNode extends RPCCaller {
	  constructor(options) {
	    super(rpcsnodeMethods, DEFAULT_SNODE_ADDR, options);
	  }
	}

	class RPCWallet extends RPCCaller {
	  constructor(options) {
	    super(rpcwalletMethods, DEFAULT_WALLET_ADDR, options);
	  }
	}

	var oxenTestrpc = { RPCDaemon, RPCSNode, RPCWallet };

	return oxenTestrpc;

})));

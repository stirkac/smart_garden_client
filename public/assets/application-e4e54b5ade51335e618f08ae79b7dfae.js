/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* jquery.scrollzer v0.2 | (c) n33 | n33.co @n33co | MIT + GPLv2 */

jQuery.scrollzer=function(e,t){var n=!1,r="object",i="clearTimeout",s="setTimeout",o="removeClass",u="scrollzer-locked",a="activeClassName",f=jQuery(window),l=jQuery(document);f.load(function(){var c,h,p,d,v,m,g,y,b,w,E=jQuery.extend({activeClassName:"active",suffix:"-link",pad:50,firstHack:n,lastHack:n},t),S=[],x=jQuery();for(c in e){p=jQuery("#"+e[c]),d=jQuery("#"+e[c]+E.suffix);if(p.length<1||d.length<1)continue;h={},h.link=d,h[r]=p,S[e[c]]=h,x=x.add(d)}y=function(){var e;for(c in S)e=S[c],e.start=Math.ceil(e[r].offset().top)-E.pad,e.end=e.start+Math.ceil(e[r].innerHeight());f.trigger("scroll")},f.resize(function(){window[i](g),g=window[s](y,250)}),w=function(){x[o](u)},f.scroll(function(){var e=0,t=n;v=f.scrollTop(),window[i](b),b=window[s](w,250);for(c in S)c!=m&&v>=S[c].start&&v<=S[c].end&&(m=c,t=!0),e++;E.lastHack&&v+f.height()>=l.height()&&(m=c,t=!0),t&&!x.hasClass(u)&&(x[o](E[a]),S[m].link.addClass(E[a]))}),f.trigger("resize")})};
/* jquery.scrolly v1.0.0-dev | (c) n33 | n33.co @n33co | MIT */

(function(e){function u(s,o){var u,a,f;if((u=e(s))[t]==0)return n;a=u[i]()[r];switch(o.anchor){case"middle":f=a-(e(window).height()-u.outerHeight())/2;break;default:case r:f=Math.max(a,0)}return typeof o[i]=="function"?f-=o[i]():f-=o[i],f}var t="length",n=null,r="top",i="offset",s="click.scrolly",o=e(window);e.fn.scrolly=function(i){var o,a,f,l,c=e(this);if(this[t]==0)return c;if(this[t]>1){for(o=0;o<this[t];o++)e(this[o]).scrolly(i);return c}l=n,f=c.attr("href");if(f.charAt(0)!="#"||f[t]<2)return c;a=jQuery.extend({anchor:r,easing:"swing",offset:0,parent:e("body,html"),pollOnce:!1,speed:1e3},i),a.pollOnce&&(l=u(f,a)),c.off(s).on(s,function(e){var t=l!==n?l:u(f,a);t!==n&&(e.preventDefault(),a.parent.stop().animate({scrollTop:t},a.speed,a.easing))})}})(jQuery);
/* skel.js v2.2.1 | (c) n33 | getskel.com | MIT licensed */

var skel=function(){var e="breakpoints",t="config",n="iterate",r="elements",i="stateId",s="stateElements",o="getElementsByClassName",u=!1,a="getElementsByTagName",f="length",l="gridLevelMax",c=null,h="getCachedElement",p="viewport",d=" 0 -1px ",v="cacheNewElement",m="config_breakpoint",g="createElement",y=!0,b="gutters",w="vars",E="insertBefore",S="newInline",x="substring",T="}",N="parentNode",C="cache",k="locations",L="gridLevelMap",A="orientationChange",O="deviceType",M="className",_=" 0 0 ",D="object",P="isArray",H="match",B="grid",j="+*,",F="replace",I="head",q="newElement",R="canUseProperty_element",U="indexOf",z="_skel_isReversed",W="push",X="extend",V="matchesMedia",$="DOMReady",J="containers",K="onorientationchange",Q="defaults",G="lock",Y="getComputedStyle",Z="addEventListener",et="^head",tt="{display:none!important}",nt="parseMeasurement",rt="isActive",it="charAt",st="registerLocation",ot="trigger",ut="IEVersion",at="documentElement",ft="events",lt="placeholder",ct="level",ht="attachElements",pt="isStatic",dt="attachElement",vt="plugins",mt="DOMContentLoaded",gt="text/css",yt="device-width",bt="states",wt="initial-scale=1",Et="_skel_attach",St="removeEventListener",xt="split",Tt="resize",Nt="attached",Ct="location",kt="change",Lt="normalize",At="collapse",Ot="applyRowTransforms",Mt="media",_t="previousSibling",Dt="(min-width: ",Pt="html",Ht="style",Bt="firstChild",jt="forceDefaultState",Ft="_skel_placeholder",It="querySelectorAll",qt="min-height",Rt="max-height",Ut="min-width",zt="innerHTML",Wt="prototype",Xt="max-width",Vt="nextSibling",$t="hasOwnProperty",Jt="domready",Kt="onresize",Qt="priority",Gt="href",Yt=".\\3$1 ",Zt="android",en="readyState",tn="height=",nn={breakpoints:[],breakpointList:[],cache:{elements:{},states:{},stateElements:{}},config:{breakpoints:{"*":{href:u,media:""}},containers:1140,defaultState:c,events:{},grid:{level:1,collapse:u,gutters:[40,0]},lock:{path:u,permanent:y},plugins:{},pollOnce:u,preload:u,reset:Lt,RTL:u,viewport:{width:yt,height:"",scalable:y}},css:{bm:"*,*:before,*:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}",n:"html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}",r:"html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}body{-webkit-text-size-adjust:none}",gc:function(e){return".\\31 2u"+e+",.\\31 2u\\24"+e+"{width:100%;clear:none;margin-left:0}"+".\\31 1u"+e+",.\\31 1u\\24"+e+"{width:91.6666666667%;clear:none;margin-left:0}"+".\\31 0u"+e+",.\\31 0u\\24"+e+"{width:83.3333333333%;clear:none;margin-left:0}"+".\\39 u"+e+",.\\39 u\\24"+e+"{width:75%;clear:none;margin-left:0}"+".\\38 u"+e+",.\\38 u\\24"+e+"{width:66.6666666667%;clear:none;margin-left:0}"+".\\37 u"+e+",.\\37 u\\24"+e+"{width:58.3333333333%;clear:none;margin-left:0}"+".\\36 u"+e+",.\\36 u\\24"+e+"{width:50%;clear:none;margin-left:0}"+".\\35 u"+e+",.\\35 u\\24"+e+"{width:41.6666666667%;clear:none;margin-left:0}"+".\\34 u"+e+",.\\34 u\\24"+e+"{width:33.3333333333%;clear:none;margin-left:0}"+".\\33 u"+e+",.\\33 u\\24"+e+"{width:25%;clear:none;margin-left:0}"+".\\32 u"+e+",.\\32 u\\24"+e+"{width:16.6666666667%;clear:none;margin-left:0}"+".\\31 u"+e+",.\\31 u\\24"+e+"{width:8.3333333333%;clear:none;margin-left:0}"+".\\31 2u\\24"+e+j+".\\31 1u\\24"+e+j+".\\31 0u\\24"+e+j+".\\39 u\\24"+e+j+".\\38 u\\24"+e+j+".\\37 u\\24"+e+j+".\\36 u\\24"+e+j+".\\35 u\\24"+e+j+".\\34 u\\24"+e+j+".\\33 u\\24"+e+j+".\\32 u\\24"+e+j+".\\31 u\\24"+e+"+*{"+"clear:left;"+T+".\\-11u"+e+"{margin-left:91.6666666667%}"+".\\-10u"+e+"{margin-left:83.3333333333%}"+".\\-9u"+e+"{margin-left:75%}"+".\\-8u"+e+"{margin-left:66.6666666667%}"+".\\-7u"+e+"{margin-left:58.3333333333%}"+".\\-6u"+e+"{margin-left:50%}"+".\\-5u"+e+"{margin-left:41.6666666667%}"+".\\-4u"+e+"{margin-left:33.3333333333%}"+".\\-3u"+e+"{margin-left:25%}"+".\\-2u"+e+"{margin-left:16.6666666667%}"+".\\-1u"+e+"{margin-left:8.3333333333%}"}},defaults:{breakpoint:{config:c,elements:c,test:c},config_breakpoint:{containers:"100%",grid:{},href:u,media:"",viewport:{}}},events:[],forceDefaultState:u,gridLevelMap:{k:{},v:{}},gridLevelMax:1,isInit:u,isStatic:u,locations:{body:c,head:c,html:c},lcn:"_skel_lock",me:c,plugins:{},sd:"/",stateId:"",vars:{},DOMReady:c,getElementsByClassName:c,indexOf:c,isArray:c,iterate:c,matchesMedia:c,extend:function(e,t){var r;nn[n](t,function(n){nn[P](t[n])?(nn[P](e[n])||(e[n]=[]),nn[X](e[n],t[n])):typeof t[n]==D?(typeof e[n]!=D&&(e[n]={}),nn[X](e[n],t[n])):e[n]=t[n]})},getArray:function(e){return nn[P](e)?e:[e]},parseMeasurement:function(e){var t,n;if(typeof e!="string")t=[e,"px"];else if(e=="fluid")t=[100,"%"];else{var n;n=e[H](/([0-9\.]+)([^\s]*)/),n[f]<3||!n[2]?t=[parseFloat(e),"px"]:t=[parseFloat(n[1]),n[2]]}return t},canUseProperty_element:c,canUse:function(t){return nn[e][t]&&nn[e][t].test()},canUseProperty:function(e){nn[R]||(nn[R]=document[g]("div"));var t=nn[R][Ht],n=e[it](0).toUpperCase()+e.slice(1);return e in t||"Moz"+n in t||"Webkit"+n in t||"O"+n in t||"ms"+n in t},hasActive:function(e){var t=u;return nn[n](e,function(n){t=t||nn[rt](e[n])}),t},isActive:function(e){return nn[U](nn[i],nn.sd+e)!==-1},isLocked:function(){return!!nn[w][G]&&nn[P](nn[w][G])},lock:function(e,n){nn[w][G]=[e,n],document.cookie=nn.lcn+"="+nn[w][G].join("_")+(nn[t][G].path?";path="+nn[t][G].path:"")+(nn[t][G].permanent?";expires=Tue, 19 Jan 2038 03:14:07 GMT":""),window[Ct].reload()},unlock:function(){nn[w][G]=c,document.cookie=nn.lcn+"="+(nn[t][G].path?";path="+nn[t][G].path:"")+";expires=Thu, 01 Jan 1970 01:02:03 GMT",window[Ct].reload()},useActive:function(e){if(typeof e!==D)return e;var t=c;return nn[n](e,function(n){if(t!==c)return;nn[rt](n)&&(t=e[n])}),t},wasActive:function(e){return nn[U](nn[w].lastStateId,nn.sd+e)!==-1},applyRowTransforms:function(e){nn[t].RTL&&(nn.unreverseRows(),e[t][B][At]&&nn.reverseRows());var r="_skel_important",i=[],s,a;for(s=1;s<=nn[l];s++)a=nn[o]("important("+nn[L].k[s]+")"),nn[n](a,function(e){i[W](a[e])});a=nn[o]("important(collapse)"),nn[n](a,function(e){i[W](a[e])}),nn[n](i,function(n){if(n===f)return;var s=i[n],o=s[N],a,l=u,c,h;if(!o)return;if(!s[$t](r)||s[r]===u){e[t][B][At]&&s[M][H](/important\(collapse\)/)?l="c":s[M][H](/important\((.+)\)/)&&(h=parseInt(nn[L].v[RegExp.$1]))<=e[t][B][ct]&&(l="l");if(!l)return;c=nn[t].RTL?Vt:_t,a=s[c];while(a&&a.nodeName=="#text")a=a[c];if(!a)return;o[E](s,nn[t].RTL&&l=="l"?o.lastChild:o[Bt]),s[r]={placeholder:a,mode:l,level:h}}else{a=s[r][lt],l=s[r].mode;if(l=="c"&&e[t][B][At]||l=="l"&&s[r][ct]<=e[t][B][ct])return;o[E](s,nn[t].RTL&&l=="l"?a[_t]:a[Vt]),s[r]=u}})},reverseRows:function(){var e=nn[o]("row");nn[n](e,function(t){if(t===f)return;var n=e[t];if(n[z])return;var r=n.children,i;for(i=1;i<r[f];i++)n[E](r[i],r[0]);n[z]=y})},unreverseRows:function(){var e=nn[o]("row");nn[n](e,function(t){if(t===f)return;var n=e[t];if(!n[z])return;var r=n.children,i;for(i=1;i<r[f];i++)n[E](r[i],r[0]);n[z]=u})},bind:function(e,t){return nn.on(e,t)},on:function(e,t){var r=e[xt](/[\s]+/);nn[n](r,function(e){var n=r[e];if(nn.isInit){if(n=="init"){t();return}if(n==kt)t();else if(n[it](0)=="+"&&nn[rt](n[x](1)))t();else if(n[it](0)=="!"&&!nn[rt](n[x](1))){t();return}}nn[ft][n]||(nn[ft][n]=[]),nn[ft][n][W](t)})},change:function(e){nn.on(kt,e)},ready:function(e){nn.on("ready",e)},trigger:function(e){if(!nn[ft][e]||nn[ft][e][f]==0)return;var t;nn[n](nn[ft][e],function(t){nn[ft][e][t]()})},registerLocation:function(e,t){e==I?t[Et]=function(e,t){t?this[E](e,this[Bt]):this===nn.me[N]?this[E](e,nn.me):this.appendChild(e)}:t[Et]=function(e,t){t?this[E](e,this[Bt]):this.appendChild(e)},nn[k][e]=t},addCachedElementToBreakpoint:function(t,n){nn[e][t]&&nn[e][t][r][W](n)},addCachedElementToState:function(e,t){nn[C][s][e]?nn[C][s][e][W](t):nn[C][s][e]=[t]},attachElement:function(e){var t,n=e[Ct],r=u;return e[Nt]?y:(n[0]=="^"&&(n=n[x](1),r=y),n in nn[k]?(t=nn[k][n],t[Et](e[D],r),e[Nt]=y,e.onAttach&&e.onAttach(),y):u)},attachElements:function(e){var t=[],r=[],i,s,o;nn[n](e,function(n){t[e[n][Qt]]||(t[e[n][Qt]]=[]),t[e[n][Qt]][W](e[n])}),nn[n](t,function(e){if(t[e][f]==0)return;nn[n](t[e],function(n){nn[dt](t[e][n])||r[W](t[e][n])})}),r[f]>0&&nn[$](function(){nn[n](r,function(e){nn[dt](r[e])})})},cacheElement:function(e){return nn[C][r][e.id]=e,e},cacheNewElement:function(e,t,n,r){var i;return t[N]&&t[N].removeChild(t),i=nn[q](e,t,n,r),nn.cacheElement(i)},detachAllElements:function(e){var t,i,s={};nn[n](e,function(t){s[e[t].id]=y}),nn[n](nn[C][r],function(e){if(e in s)return;nn.detachElement(e)})},detachElement:function(e){var t=nn[C][r][e],n;if(!t[Nt])return;n=t[D];if(!n[N]||n[N]&&!n[N].tagName)return;n[N].removeChild(n),t[Nt]=u,t.onDetach&&t.onDetach()},getCachedElement:function(e){return nn[C][r][e]?nn[C][r][e]:c},newElement:function(e,t,n,r){return{id:e,object:t,location:n,priority:r,attached:u}},removeCachedElementFromBreakpoint:function(t,i){return nn[n](nn[e][t][r],function(n){nn[e][t][r][n].id==i&&delete nn[e][t][r][n]}),y},removeCachedElementFromState:function(e,t){return nn[n](nn[C][s][e],function(n){nn[C][s][e][n].id==t&&delete nn[C][s][e][n]}),y},uncacheElement:function(e){return e in nn[C][r]?(delete nn[C][r][e],y):u},changeState:function(o){var a,l,c,g,E,N,k,A,O;nn[w].lastStateId=nn[i],nn[i]=o;if(!nn[C][bt][nn[i]]){nn[C][bt][nn[i]]={config:{},elements:[],values:{}},c=nn[C][bt][nn[i]],nn[i]===nn.sd?a=[]:a=nn[i][x](1)[xt](nn.sd),nn[X](c[t],nn[Q][m]),nn[n](a,function(n){nn[X](c[t],nn[e][a[n]][t])}),k="mV"+nn[i],c[t][p].content?A=c[t][p].content:nn.isLocked()?(g=[],g[W]("user-scalable=yes"),nn[w][G][0]&&g[W]("width="+nn[w][G][0]),nn[w][G][1]&&g[W](tn+nn[w][G][1]),A=g.join(","),window.setTimeout(function(){nn.poll()},0)):(g=[],g[W]("user-scalable="+(c[t][p].scalable?"yes":"no")),c[t][p].width&&g[W]("width="+c[t][p].width),c[t][p].height&&g[W](tn+c[t][p].height),c[t][p].width==yt&&g[W](wt),A=g.join(",")),(E=nn[h](k))||(E=nn[v](k,nn.newMeta(p,A),et,4)),c[r][W](E);var M,D,P=u;g=nn[nt](c[t][J]),M=g[0],D=g[1],c.values[J]=M+D,k="iC"+c.values[J],D.substr(-1)=="!"&&(P=y,D=D.substr(0,D[f]-1)),(E=nn[h](k))||(E=nn[v](k,nn[S](".container{margin-left:auto;margin-right:auto;width:"+M*1+D+(P?"!important;max-width:none!important;min-width:0!important"+T:T+".container.\\31 25\\25{width:100%;max-width:"+M*1.25+D+";min-width:"+M+D+T+".container.\\37 5\\25{width:"+M*.75+D+T+".container.\\35 0\\25{width:"+M*.5+D+T+".container.\\32 5\\25{width:"+M*.25+D+T)),I,3)),c[r][W](E),k="iGG"+c[t][B][b][0]+"_"+c[t][B][b][1];if(!(E=nn[h](k))){var H,j;g=nn[nt](c[t][B][b][0]),H=g[0],j=g[1];var q,R;g=nn[nt](c[t][B][b][1]),q=g[0],R=g[1],E=nn[v]("iGG"+c[t][B][b][0]+"_"+c[t][B][b][1],nn[S](".row>*{padding:"+q*1+R+_+H*1+j+T+".row{margin:"+q*-1+R+d+H*-1+j+T+".row.uniform>*{padding:"+H*1+j+_+H*1+j+T+".row.uniform{margin:"+H*-1+j+d+H*-1+j+T+".row.\\32 00\\25>*{padding:"+q*2+R+_+H*2+j+T+".row.\\32 00\\25{margin:"+q*-2+R+d+H*-2+j+T+".row.uniform.\\32 00\\25>*{padding:"+H*2+j+_+H*2+j+T+".row.uniform.\\32 00\\25{margin:"+H*-2+j+d+H*-2+j+T+".row.\\31 50\\25>*{padding:"+q*1.5+R+_+H*1.5+j+T+".row.\\31 50\\25{margin:"+q*-1.5+R+d+H*-1.5+j+T+".row.uniform.\\31 50\\25>*{padding:"+H*1.5+j+_+H*1.5+j+T+".row.uniform.\\31 50\\25{margin:"+H*-1.5+j+d+H*-1.5+j+T+".row.\\35 0\\25>*{padding:"+q*.5+R+_+H*.5+j+T+".row.\\35 0\\25{margin:"+q*-0.5+R+d+H*-0.5+j+T+".row.uniform.\\35 0\\25>*{padding:"+H*.5+j+_+H*.5+j+T+".row.uniform.\\35 0\\25{margin:"+H*-0.5+j+d+H*-0.5+j+T+".row.\\32 5\\25>*{padding:"+q*.25+R+_+H*.25+j+T+".row.\\32 5\\25{margin:"+q*-0.25+R+d+H*-0.25+j+T+".row.uniform.\\32 5\\25>*{padding:"+H*.25+j+_+H*.25+j+T+".row.uniform.\\32 5\\25{margin:"+H*-0.25+j+d+H*-0.25+j+T+".row.\\30 \\25>*{padding:0}"+".row.\\30 \\25{margin:0 0 -1px 0}"),I,3)}c[r][W](E);if(c[t][B][ct]>1){k="igZ"+c[t][B][ct];if(!(E=nn[h](k))){A="";for(N=2;N<=c[t][B][ct];N++)A+=nn.css.gc("\\28 "+nn[L].k[N]+"\\29");E=nn[v](k,nn[S](A),I,3)}c[r][W](E)}c[t][B][At]&&(k="igC"+c[t][J],(E=nn[h](k))||(E=nn[v](k,nn[S](".row:not(.no-collapse)>*{width:100%!important;margin-left:0!important"+T),I,3)),c[r][W](E));if(!nn[pt]){k="iCd"+nn[i];if(!(E=nn[h](k))){A=[],O=[],nn[n](nn[e],function(e){nn[U](a,e)!==-1?A[W](".not-"+e):O[W](".only-"+e)});var z=(A[f]>0?A.join(",")+tt:"")+(O[f]>0?O.join(",")+tt:"");E=nn[v](k,nn[S](z[F](/\.([0-9])/,Yt)),I,3),c[r][W](E)}}nn[n](a,function(i){nn[e][a[i]][t][Gt]&&(k="ss"+a[i],(E=nn[h](k))||(E=nn[v](k,nn.newStyleSheet(nn[e][a[i]][t][Gt]),I,5)),c[r][W](E)),nn[e][a[i]][r][f]>0&&nn[n](nn[e][a[i]][r],function(t){c[r][W](nn[e][a[i]][r][t])})}),nn[C][s][nn[i]]&&(nn[n](nn[C][s][nn[i]],function(e){c[r][W](nn[C][s][nn[i]][e])}),nn[C][s][nn[i]]=[])}else c=nn[C][bt][nn[i]];nn.detachAllElements(c[r]),nn[ht](c[r]),nn[$](function(){nn[Ot](c)}),nn[w].state=nn[C][bt][nn[i]],nn[w][i]=nn[i],nn[ot](kt),nn[n](nn[e],function(e){nn[rt](e)?nn.wasActive(e)||nn[ot]("+"+e):nn.wasActive(e)&&nn[ot]("-"+e)})},getStateId:function(){if(nn[jt]&&nn[t].defaultState)return nn[t].defaultState;var r="";return nn[n](nn[e],function(t){nn[e][t].test()&&(r+=nn.sd+t)}),r},poll:function(){var e="";e=nn.getStateId(),e===""&&(e=nn.sd),e!==nn[i]&&(nn[pt]?nn.changeState(e):(nn[k][Pt][M]=nn[k][Pt][M][F](nn[i][x](1)[F](new RegExp(nn.sd,"g")," "),""),nn.changeState(e),nn[k][Pt][M]=nn[k][Pt][M]+" "+nn[i][x](1)[F](new RegExp(nn.sd,"g")," "),nn[k][Pt][M][it](0)==" "&&(nn[k][Pt][M]=nn[k][Pt][M][x](1))))},updateState:function(){var t,o,u,a,l=[];if(nn[i]==nn.sd)return;t=nn[i][x](1)[xt](nn.sd),nn[n](t,function(s){o=nn[e][t[s]];if(o[r][f]==0)return;nn[n](o[r],function(e){nn[C][bt][nn[i]][r][W](o[r][e]),l[W](o[r][e])})}),nn[C][s][nn[i]]&&(nn[n](nn[C][s][nn[i]],function(e){nn[C][bt][nn[i]][r][W](nn[C][s][nn[i]][e]),l[W](nn[C][s][nn[i]][e])}),nn[C][s][nn[i]]=[]),l[f]>0&&nn[ht](l)},newDiv:function(e){var t=document[g]("div");return t[zt]=e,t},newInline:function(e){var t;return t=document[g](Ht),t.type=gt,t[zt]=e,t},newMeta:function(e,t){var n=document[g]("meta");return n.name=e,n.content=t,n},newStyleSheet:function(e){var t=document[g]("link");return t.rel="stylesheet",t.type=gt,t[Gt]=e,t},initPlugin:function(e,n){typeof n==D&&nn[X](e[t],n),e.init&&e.init()},registerPlugin:function(e,t){if(!t)return u;nn[vt][e]=t,t._=this,t.register&&t.register()},init:function(e,r){nn.initConfig(e),nn.initElements(),nn.initEvents(),nn.poll(),r&&typeof r==D&&(nn[t][vt]=r),nn[n](nn[vt],function(e){nn.initPlugin(nn[vt][e],e in nn[t][vt]?nn[t][vt][e]:c)}),nn.isInit=y,nn[ot]("init")},initAPI:function(){var e,t,r=navigator.userAgent;nn[w][ut]=99,e="other",r[H](/Firefox/)?e="firefox":r[H](/Chrome/)?e="chrome":r[H](/Safari/)&&!r[H](/Chrome/)?e="safari":r[H](/(OPR|Opera)/)?e="opera":r[H](/MSIE ([0-9]+)/)?(e="ie",nn[w][ut]=RegExp.$1):r[H](/Trident\/.+rv:([0-9]+)/)&&(e="ie",nn[w][ut]=RegExp.$1),nn[w].browser=e,nn[w][O]="other",t={ios:"(iPad|iPhone|iPod)",android:"Android",mac:"Macintosh",wp:"Windows Phone",windows:"Windows NT"},nn[n](t,function(e){r[H](new RegExp(t[e],"g"))&&(nn[w][O]=e)});switch(nn[w][O]){case"ios":r[H](/([0-9_]+) like Mac OS X/),e=parseFloat(RegExp.$1[F]("_",".")[F]("_",""));break;case Zt:r[H](/Android ([0-9\.]+)/),e=parseFloat(RegExp.$1);break;case"mac":r[H](/Mac OS X ([0-9_]+)/),e=parseFloat(RegExp.$1[F]("_",".")[F]("_",""));break;case"wp":r[H](/IEMobile\/([0-9\.]+)/),e=parseFloat(RegExp.$1);break;case"windows":r[H](/Windows NT ([0-9\.]+)/),e=parseFloat(RegExp.$1);break;default:e=99}nn[w].deviceVersion=e,nn[w].isTouch=nn[w][O]=="wp"?navigator.msMaxTouchPoints>0:"ontouchstart"in window,nn[w].isMobile=nn[w][O]=="wp"||nn[w][O]==Zt||nn[w][O]=="ios",e=document.cookie[xt](";"),nn[n](e,function(t){var n=e[t][xt]("=");if(n[0][F](/^\s+|\s+$/g,"")==nn.lcn&&n[1][f]>0){nn[w][G]=n[1][xt]("_");return}})},initConfig:function(i){var s=[],o=[],c;if(!i||!(e in i))nn[pt]=y,nn[t][p].width="",nn[t][p].height="",nn[t][p].scalable=y;typeof i==D&&(i[e]&&(nn[t][e]={}),nn[X](nn[t],i)),B in nn[t]&&b in nn[t][B]&&!nn[P](nn[t][B][b])&&(nn[t][B][b]=[nn[t][B][b],nn[t][B][b]]),nn[X](nn[Q][m][B],nn[t][B]),nn[l]=Math.max(nn[l],nn[t][B][ct]),nn[X](nn[Q][m][p],nn[t][p]),nn[Q][m][J]=nn[t][J],nn[n](nn[t][e],function(n){var i,s={},u,a;nn[X](s,nn[t][e][n]),Gt in s||(s[Gt]=nn[Q][m][Gt]),Mt in s||(s[Mt]=nn[Q][m][Mt]),"range"in s&&(u=s.range,u=="*"?a="":u[it](0)=="-"?a="(max-width: "+parseInt(u[x](1))+"px)":u[it](u[f]-1)=="-"?a=Dt+parseInt(u[x](0,u[f]-1))+"px)":nn[U](u,"-")!=-1&&(u=u[xt]("-"),a=Dt+parseInt(u[0])+"px) and (max-width: "+parseInt(u[1])+"px)"),s[Mt]=a),B in s&&(b in s[B]&&!nn[P](s[B][b])&&(s[B][b]=[s[B][b],s[B][b]]),"zoom"in s[B]&&(s[B][ct]=s[B].zoom),ct in s[B]&&(nn[l]=Math.max(nn[l],s[B][ct]))),nn[t][e][n]=s,i={},nn[X](i,nn[Q].breakpoint),i[t]=nn[t][e][n],i.test=function(){return nn[V](s[Mt])},i[r]=[],nn[t].preload&&i[t][Gt]&&o[W](i[t][Gt]),nn[e][n]=i,nn.breakpointList[W](n)});if(nn[l]>1||nn[pt])for(c=2;c<=nn[l];c++)nn[L].k[c]=nn[L].v[c]=c;else nn[n](nn[t][e],function(n){var r=nn[t][e][n];nn[l]++,B in r||(r[B]={}),r[B][ct]=nn[l],nn[L].k[nn[l]]=n,nn[L].v[n]=nn[l]});nn[n](nn[t][ft],function(e){nn.on(e,nn[t][ft][e])}),o[f]>0&&window[Ct].protocol!="file:"&&nn[$](function(){var e,t=document[a](I)[0],r=new XMLHttpRequest;nn[n](o,function(e){r.open("GET",o[e],u),r.send("")})})},initElements:function(){var e=[];e[W](nn[q]("mV",nn.newMeta(p,wt),et,1));switch(nn[t].reset){case"full":e[W](nn[q]("iR",nn[S](nn.css.r),et,2));break;case Lt:e[W](nn[q]("iN",nn[S](nn.css.n),et,2))}e[W](nn[q]("iBM",nn[S](nn.css.bm),et,1)),e[W](nn[q]("iG",nn[S]('.row{border-bottom:solid 1px transparent}.row>*{float:left}.row:after,.row:before{content:"";display:block;clear:both;height:0}.row.uniform>*>:first-child{margin-top:0}.row.uniform>*>:last-child{margin-bottom:0}'+nn.css.gc("")),I,3)),nn[ht](e)},initEvents:function(){var e;!nn[t].pollOnce&&!nn[pt]&&(nn.on(Tt,function(){nn.poll()}),nn.on(A,function(){nn.poll()})),nn[w][O]=="ios"&&nn[$](function(){nn.on(A,function(){var e=document[a]("input");nn[n](e,function(t){e[t][Ft]=e[t][lt],e[t][lt]=""}),window.setTimeout(function(){nn[n](e,function(t){e[t][lt]=e[t][Ft]})},100)})}),nn[$](function(){nn[ot]("ready")}),window[Kt]&&nn.on(Tt,window[Kt]),window[Kt]=function(){nn[ot](Tt)},window[K]&&nn.on(A,window[K]),window[K]=function(){nn[ot](A)}},initUtilityMethods:function(){document[Z]?!function(e,t){nn[$]=t()}(Jt,function(){function e(e){s=1;while(e=t.shift())e()}var t=[],n,r=document,i=mt,s=/^loaded|^c/.test(r[en]);return r[Z](i,n=function(){r[St](i,n),e()}),function(e){s?e():t[W](e)}}):!function(e,t){nn[$]=t()}(Jt,function(e){function t(e){p=1;while(e=n.shift())e()}var n=[],r,i=!1,s=document,o=s[at],u=o.doScroll,a=mt,f=Z,l="onreadystatechange",c=en,h=u?/^loaded|^c/:/^loaded|c/,p=h.test(s[c]);return s[f]&&s[f](a,r=function(){s[St](a,r,i),t()},i),u&&s.attachEvent(l,r=function(){/^c/.test(s[c])&&(s.detachEvent(l,r),t())}),e=u?function(t){self!=top?p?t():n[W](t):function(){try{o.doScroll("left")}catch(n){return setTimeout(function(){e(t)},50)}t()}()}:function(e){p?e():n[W](e)}}),document[o]?nn[o]=function(e){return document[o](e)}:nn[o]=function(e){var t=document;return t[It]?t[It](("."+e[F](" "," ."))[F](/\.([0-9])/,Yt)):[]},Array[Wt][U]?nn[U]=function(e,t){return e[U](t)}:nn[U]=function(e,t){if(typeof e=="string")return e[U](t);var n,r=t?t:0,i;if(!this)throw new TypeError;i=this[f];if(i===0||r>=i)return-1;r<0&&(r=i-Math.abs(r));for(n=r;n<i;n++)if(this[n]===e)return n;return-1},Array[P]?nn[P]=function(e){return Array[P](e)}:nn[P]=function(e){return Object[Wt].toString.call(e)==="[object Array]"},Object.keys?nn[n]=function(e,t){if(!e)return[];var n,r=Object.keys(e);for(n=0;r[n];n++)t(r[n])}:nn[n]=function(e,t){if(!e)return[];var n;for(n in e)Object[Wt][$t].call(e,n)&&t(n)},window.matchMedia?nn[V]=function(e){return e==""?y:window.matchMedia(e).matches}:window.styleMedia||window[Mt]?nn[V]=function(e){if(e=="")return y;var t=window.styleMedia||window[Mt];return t.matchMedium(e||"all")}:window[Y]?nn[V]=function(e){if(e=="")return y;var t=document[g](Ht),n=document[a]("script")[0],r=c;t.type=gt,t.id="matchmediajs-test",n[N][E](t,n),r=Y in window&&window[Y](t,c)||t.currentStyle;var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=i:t.textContent=i,r.width==="1px"}:(nn[jt]=y,nn[V]=function(e){if(e=="")return y;var t,n,r,i,s={"min-width":c,"max-width":c},o=u;n=e[xt](/\s+and\s+/);for(i in n)t=n[i],t[it](0)=="("&&(t=t[x](1,t[f]-1),r=t[xt](/:\s+/),r[f]==2&&(s[r[0][F](/^\s+|\s+$/g,"")]=parseInt(r[1]),o=y));if(!o)return u;var a=document[at].clientWidth,l=document[at].clientHeight;return s[Ut]!==c&&a<s[Ut]||s[Xt]!==c&&a>s[Xt]||s[qt]!==c&&l<s[qt]||s[Rt]!==c&&l>s[Rt]?u:y})},preInit:function(){var e=document[a]("script");nn.me=e[e[f]-1],nn.initUtilityMethods(),nn.initAPI(),nn[st](Pt,document[a](Pt)[0]),nn[st](I,document[a](I)[0]),nn[$](function(){nn[st]("body",document[a]("body")[0])}),nn[w].browser=="ie"&&nn[w][ut]>=10&&nn[dt](nn[q]("msie-viewport-fix",nn[S]("@-ms-viewport{width:device-width}"),et,1))}};return nn.preInit(),nn[w][ut]<9&&(nn[Ot]=function(e){},nn[S]=function(e){var t;return t=document[g]("span"),t[zt]='&nbsp;<style type="text/css">'+e+"</style>",t}),nn}();(function(e,t){typeof define=="function"&&define.amd?define([],t):typeof exports=="object"?module.exports=t():e.skel=t()})(this,function(){return skel});
/* skel-layers.js v2.0.2 | (c) n33 | getskel.com | MIT licensed */

(function(e){typeof define=="function"&&define.amd?define(["jquery","skel"],e):e(jQuery,skel)})(function(e,t){var n="config",r="cache",i="setTimeout",s="_skel_layers_translateOrigin",o="_skel_layers_resetForms",u="trigger",f="position",l="_skel_layers_translate",c="visibleWrapper",h="_skel_layers_promote",p="skel-layers-moved",d="_skel_layers_demote",v="$element",m="moveToVisibleWrapper",g="_skel_layers_resume",y="moveToHiddenWrapper",b="exclusiveLayer",w="exclusive",E="_skel_layers_cssNumericValue",S="center",x="css",T="right",N="bottom",C="prototype",k="skel-layers-css-values",L="width",A="_skel_layers_init",O="_skel_layers_suspend",M="left",_="_skel_layers_doTranslate",D="overflow-x",P="layers",H="wrapper",B="speed",j="skel-layers-layer-z-index",F="showstart",I="hidestart",q="transform",R="iterate",U="children",z="_height",W="transition",X="skel-layers-css",V=null,$="hiddenWrapper",J="scrollTop",K="parent",Q="length",G=".skel-layers-fixed:not(.skel-layers-moved)",Y=!1,Z="hideend",et="showend",tt="height",nt="auto",rt="deviceType",it="resetForms",st="unlockView",ot="top",ut="touchstart.lock click.lock scroll.lock",at="skel-layers-handled",ft="recalcW",lt="element",ct="hidden",ht="_width",pt=!0,dt='<div id="skel-layers-placeholder-',vt="data",mt="_skel_layers_uncss",gt="_skel_layers_fadeOut",yt="_skel_layers_recss",bt="-webkit-",wt="_skel_layers_fadeIn",Et="100%",St="blur",xt="padding-bottom",Tt="skel-layers-exclusiveVisible",Nt="originalEvent",Ct="easing",kt="lockView",Lt="useActive",At="animation",Ot="isInitialized",Mt="-webkit-tap-highlight-color",_t="skel-layers-layer-position",Dt="z-index",Pt="skel-layers-layer-index",Ht="animations",Bt="animate",jt="#skel-layers-placeholder-",Ft="skel_layers_hiddenWrapper",It="_skel_layers_initializeCell",qt="append",Rt="resize.lock scroll.lock",Ut="find",zt="registerLocation",Wt="hasClass",Xt="undefined",Vt="orientationchange.lock",$t="positions",Jt="breakpoints",Kt="stopPropagation",Qt="touchPosX",Gt="touchPosY",Yt="hide",Zt="-moz-",en="_skel_layers_expandCell",tn="preventDefault",nn="canUseProperty",rn="_skel_layers_hasParent",sn="backface-visibility",on="attr",un="events",an="window",fn="-webkit-transition",ln="addClass",cn="recalcH",hn="visible",pn="-ms-",dn="absolute",vn="none",mn="-moz-transition",gn="_skel_layers_xcss",yn="-o-",bn="-ms-transition",wn="opacity",En="removeClass",Sn="rgba(0,0,0,0)",xn="show",Tn="-o-transition",Nn="cell-size",Cn="ios",kn="object",Ln="states",An="getArray",On="appendTo",Mn="s ",_n="perspective",Dn="x",Pn="mode",Hn="fixed",Bn="overflow-y",jn="px",Fn="-",In="touches",qn="isVisible",Rn="*",Un="side",zn="opacity ",Wn="relative",Xn="body",Vn="htmlbody",$n="#",Jn="html";t.registerPlugin(P,function(e){function lr(e,t,r){var i,s,o=this;this.id=e,this.index=r,this[un]={},this[n]={breakpoints:V,states:V,position:V,side:V,animation:vn,orientation:vn,width:nt,height:nt,maxWidth:Et,maxHeight:Et,zIndex:this.index,html:"",hidden:Y,exclusive:V,resetScroll:pt,resetForms:pt,swipeToHide:pt,clickToHide:Y},fr._.extend(this[n],t),this[n][w]===V&&(this[n][w]=this[n][ct]),this[lt]=fr._.newDiv(this[n][Jn]),this[lt].id=e,this[lt]._layer=this,this[v]=V,this[Qt]=V,this[Gt]=V,this[hn]=Y,s=fr._.newElement(this.id,this[lt],Ft,1),s.onAttach=function(){var e=this[kn]._layer;e[Ot]()||e.init(),e.resume()},s.onDetach=function(){var e=this[kn]._layer;e.suspend()},o[n][Ln]&&o[n][Ln]!=fr._.sd?(fr._.cacheElement(s),i=fr._[An](o[n][Ln]),fr._[R](i,function(e){fr._.addCachedElementToState(i[e],s)})):o[n][Jt]?(fr._.cacheElement(s),i=fr._[An](o[n][Jt]),fr._[R](i,function(e){fr._.addCachedElementToBreakpoint(i[e],s)})):fr._.attachElement(s)}var fr;return typeof e==Xt?Y:(e.fn[d]=function(){var t,n;if(this[Q]>1){for(t=0;t<this[Q];t++)e(this[t])[d]();return e(this)}return n=e(this),n[x](Dt,n[vt](j))[vt](j,""),n},e.fn[en]=function(){var t=e(this),n=t[K](),r=12;n[U]().each(function(){var t=e(this),n=t[on]("class");n&&n.match(/(\s+|^)([0-9]+)u(\s+|$)/)&&(r-=parseInt(RegExp.$2))}),r>0&&(t[It](),t[x](L,(t[vt](Nn)+r)/12*100+"%"))},e.fn[rn]=function(){return e(this).parents()[Q]>0},e.fn[It]=function(){var t=e(this);t[on]("class").match(/(\s+|^)([0-9]+)u(\s+|$)/)&&t[vt](Nn,parseInt(RegExp.$2))},e.fn[h]=function(t){var r,i,s;if(this[Q]>1){for(r=0;r<this[Q];r++)e(this[r])[h](t);return e(this)}return i=e(this),isNaN(s=parseInt(i[vt](Pt)))&&(s=0),i[vt](j,i[x](Dt))[x](Dt,fr[n].baseZIndex+s+(t?t:1)),i},e.fn[o]=function(){var t=e(this);return e(this)[Ut]("form").each(function(){this.reset()}),t},e.fn[gn]=function(t,n){return e(this)[x](t,n)[x](Zt+t,Zt+n)[x](bt+t,bt+n)[x](yn+t,yn+n)[x](pn+t,pn+n)},e.fn._skel_layers_xcssProperty=function(t,n){return e(this)[x](t,n)[x](Zt+t,n)[x](bt+t,n)[x](yn+t,n)[x](pn+t,n)},e.fn._skel_layers_xcssValue=function(t,n){return e(this)[x](t,n)[x](t,Zt+n)[x](t,bt+n)[x](t,yn+n)[x](t,pn+n)},e.fn[mt]=function(){var n=e(this),r=n[vt](X),i={};if(!r||n[vt](k))return n;t[R](r,function(e){var t=n[x](r[e]);t&&(i[r[e]]=t,n[x](r[e],""))}),n[vt](k,i)},e.fn[yt]=function(){var n=e(this),r=n[vt](k);if(!r)return n;t[R](r,function(e){n[x](e,r[e])}),n.removeData(k)},lr[C][Ht]={none:{show:function(e){var t=e[n],r=e[v];r[J](0)[h](t.zIndex)[xn](),t[it]&&r[o](),t[w]&&fr[kt](Dn),e[m](),e[u](F),e[u](et)},hide:function(e){var t=e[n],r=e[v];r[Ut](Rn)[u](St,[pt]),t[w]&&fr[st](Dn),e[y](),r[d]()[Yt](),e[u](I),e[u](Z)}},fade:{show:function(e){var t=e[n],r=e[v];r[J](0)[h](t.zIndex)[x](wn,0)[xn](),t[it]&&r[o](),t[w]&&fr[kt](Dn),e[m](),e[u](F),window[i](function(){r[wt](function(){e[u](et)})},50)},hide:function(e){var t=e[n],r=e[v];r[Ut](Rn)[u](St,[pt]),e[u](I),r[gt](function(){t[w]&&fr[st](Dn),e[y](),r[d]()[Yt](),e[u](Z)})}},overlayX:{show:function(e){var t=e[n],r=e[v];r[J](0)[h](t.zIndex)[x](t[Un],Fn+fr[ft](t[ht])+jn)[xn](),t[it]&&r[o](),t[w]&&fr[kt](Dn),e[m](),e[u](F),window[i](function(){r[l]((t[Un]==T?Fn:"")+fr[ft](t[ht]),0),window[i](function(){e[u](et)},fr[n][B])},50)},hide:function(e){var t=e[n],r=e[v];r[Ut](Rn)[u](St,[pt]),e[u](I),r[s](),window[i](function(){t[w]&&fr[st](Dn),e[y](),r[d]()[Yt](),e[u](Z)},fr[n][B]+50)}},overlayY:{show:function(e){var t=e[n],r=e[v];r[J](0)[h](t.zIndex)[x](t[Un],Fn+fr[ft](t[z])+jn)[xn](),t[it]&&r[o](),t[w]&&fr[kt]("y"),e[m](),e[u](F),window[i](function(){r[l](0,(t[Un]==N?Fn:"")+fr[ft](t[z])),window[i](function(){e[u](et)},fr[n][B])},50)},hide:function(e){var t=e[n],r=e[v];r[Ut](Rn)[u](St,[pt]),e[u](I),r[s](),window[i](function(){t[w]&&fr[st]("y"),e[y](),r[d]()[Yt](),e[u](Z)},fr[n][B]+50)}},pushX:{show:function(e){var t=e[n],s=e[v],a=fr[r][H].add(fr[r][c][U]());s[J](0)[x](t[Un],Fn+fr[ft](t[ht])+jn)[xn](),t[it]&&s[o](),a[h](),t[w]&&fr[kt](Dn),e[m](),e[u](F),window[i](function(){s.add(a)[l]((t[Un]==T?Fn:"")+fr[ft](t[ht]),0),window[i](function(){e[u](et)},fr[n][B])},50)},hide:function(e){var t=e[n],o=e[v],a=fr[r][H].add(fr[r][c][U]());o[Ut](Rn)[u](St,[pt]),e[u](I),o.add(a)[s](),window[i](function(){t[w]&&fr[st](Dn),o[Yt](),e[y](),a[d](),e[u](Z)},fr[n][B]+50)}},pushY:{show:function(e){var t=e[n],s=e[v],a=fr[r][H].add(fr[r][c][U]());s[J](0)[x](t[Un],Fn+fr[cn](t[z])+jn)[xn](),t[it]&&s[o](),t[w]&&fr[kt]("y"),e[m](),e[u](F),window[i](function(){s.add(a)[l](0,(t[Un]==N?Fn:"")+fr[cn](t[z])),window[i](function(){e[u](et)},fr[n][B])},50)},hide:function(e){var t=e[n],o=e[v],a=fr[r][H].add(fr[r][c][U]());o[Ut](Rn)[u](St,[pt]),e[u](I),o.add(a)[s](),window[i](function(){t[w]&&fr[st]("y"),o[Yt](),e[y](),e[u](Z)},fr[n][B]+50)}},revealX:{show:function(e){var t=e[n],s=e[v],a=fr[r][H].add(fr[r][c][U]());s[J](0)[xn](),t[it]&&s[o](),a[h](),t[w]&&fr[kt](Dn),e[m](),e[u](F),window[i](function(){a[l]((t[Un]==T?Fn:"")+fr[ft](t[ht]),0),window[i](function(){e[u](et)},fr[n][B])},50)},hide:function(e){var t=e[n],o=e[v],a=fr[r][H].add(fr[r][c][U]());o[Ut](Rn)[u](St,[pt]),e[u](I),a[s](),window[i](function(){t[w]&&fr[st](Dn),o[Yt](),a[d](),e[y](),e[u](Z)},fr[n][B]+50)}}},lr[C][$t]={"top-left":{v:ot,h:M,side:M},"top-right":{v:ot,h:T,side:T},top:{v:ot,h:S,side:ot},"top-center":{v:ot,h:S,side:ot},"bottom-left":{v:N,h:M,side:M},"bottom-right":{v:N,h:T,side:T},bottom:{v:N,h:S,side:N},"bottom-center":{v:N,h:S,side:N},left:{v:S,h:M,side:M},"center-left":{v:S,h:M,side:M},right:{v:S,h:T,side:T},"center-right":{v:S,h:T,side:T},center:{v:S,h:S,side:Y},"center-center":{v:S,h:S,side:Y}},lr[C].on=function(e,t){this[un][e]||(this[un][e]=[]),this[un][e].push(t)},lr[C][u]=function(e){var t;if(!this[un][e]||this[un][e][Q]==0)return;t=this,fr._[R](this[un][e],function(n){t[un][e][n]()})},lr[C][xn]=function(){var e,t,s,o,a;if(this[hn]){fr[r][c][qt](this[lt]);return}e=this,t=this[n],s=fr._[Lt](t[At]),o=this[v],o[x]("max-width","")[x]("max-height","")[x](L,"")[x](tt,""),t[ht]=fr._[Lt](t[L]),t[z]=fr._[Lt](t[tt]),t[ht]==nt&&(t[ht]=o.outerWidth()+1),t[z]==nt&&(t[z]=o.outerHeight()+1);if(t.maxWidth!=Et||t[L]==nt)t[ht]=fr[ft](t[ht]),t._maxWidth=fr[ft](fr._[Lt](t.maxWidth)),t[ht]=Math.min(t[ht],t._maxWidth);if(t.maxHeight!=Et||t[tt]==nt)t[z]=fr[cn](t[z]),t._maxHeight=fr[cn](fr._[Lt](t.maxHeight)),t[z]=Math.min(t[z],t._maxHeight);o[x](L,t[ht])[x](tt,t[z]),fr._.vars[rt]==Cn&&(t[z]==Et&&!t[ct]&&o[x](tt,"-webkit-calc("+t[z]+" + 70px)"),o.on(St,"input,select,textarea",function(t,n){if(n)return;window[i](function(){fr[r][$][qt](e[lt]),window[i](function(){fr[r][c][qt](e[lt])},500)},500)})),a=this[$t][t[f]],o[ln]("skel-layer-"+t[f])[vt](_t,t[f]);switch(a.v){case ot:o[x](ot,0);break;case N:o[x](N,0);break;case S:o[x](ot,"50%")[x]("margin-top",Fn+fr.getHalf(t[z]))}switch(a.h){case M:o[x](M,0);break;case T:o[x](T,0);break;case S:o[x](M,"50%")[x]("margin-left",Fn+fr.getHalf(t[ht]))}this[Ht][s][xn](this),t[w]&&(fr[r][Xn][ln](Tt),fr[r][b]=this),this[hn]=pt,this[u](xn)},lr[C][Yt]=function(){var e,t;if(!this[hn]){fr[r][$][qt](this[lt]);return}e=this[n],t=fr._[Lt](e[At]),t in this[Ht]||(t=vn),this[Ht][t][Yt](this),e[w]&&fr[r][b]===this&&(fr[r][Xn][En](Tt),fr[r][b]=V),this[u](Yt),this[hn]=Y},lr[C].init=function(){var t=this[n],r=e(this[lt]),s=this;r[A](),r[Ut](Rn).each(function(){fr.parseInit(e(this))}),r[ln]("skel-layer")[vt](Pt,this.index)[x](Dt,fr[n].baseZIndex)[x](f,Hn)[x]("-ms-overflow-style","-ms-autohiding-scrollbar")[x]("-webkit-overflow-scrolling","touch")[Yt]();switch(t.orientation){case"vertical":r[x](Bn,nt)[x](D,ct);break;case"horizontal":r[x](D,nt)[x](Bn,ct);break;case vn:default:}if(!t[f]||!(t[f]in this[$t]))t[f]="top-left";t[Un]||(t[Un]=this[$t][t[f]][Un]);if(!t[At]||typeof t[At]!==kn&&!(t[At]in this[Ht]))t[At]=vn;t.clickToHide&&r[Ut]("a")[x](Mt,Sn).on("click.skel-layers",function(t){var r,o,u=e(this);if(u[Wt]("skel-layers-ignore"))return;t[tn](),t[Kt](),s[Yt]();if(u[Wt]("skel-layers-ignoreHref"))return;r=u[on]("href"),o=u[on]("target"),typeof r!==Xt&&r!=""&&window[i](function(){o=="_blank"&&fr._.vars[rt]!="wp"?window.open(r):window.location.href=r},fr[n][B]+10)}),r.on("touchstart",function(e){s[Qt]=e[Nt][In][0].pageX,s[Gt]=e[Nt][In][0].pageY}).on("touchmove",function(e){var n,i,o,u,a,f,l;if(s[Qt]===V||s[Gt]===V)return;n=s[Qt]-e[Nt][In][0].pageX,i=s[Gt]-e[Nt][In][0].pageY,o=r.outerHeight(),u=r.get(0).scrollHeight-r[J]();if(t[ct]&&t.swipeToHide){a=Y,f=20,l=50;switch(t[Un]){case M:a=i<f&&i>-1*f&&n>l;break;case T:a=i<f&&i>-1*f&&n<-1*l;break;case ot:a=n<f&&n>-1*f&&i>l;break;case N:a=n<f&&n>-1*f&&i<-1*l}if(a)return s[Qt]=V,s[Gt]=V,s[Yt](),Y}if(r[J]()==0&&i<0||u>o-2&&u<o+2&&i>0)return Y}),this[v]=r},lr[C][Ot]=function(){return this[v]!==V},lr[C][qn]=function(){return this[v].is(":visible")},lr[C][m]=function(){fr[r][c][qt](this[v])},lr[C][y]=function(){if(!this[v][rn]())return;fr[r][$][qt](this[v])},lr[C].resume=function(t){if(!this[Ot]())return;this[v][Ut](Rn).each(function(){fr.parseResume(e(this))}),this[n][ct]||this[xn](t)},lr[C].suspend=function(){if(!this[Ot]())return;this[v][s](),this[v][Ut](Rn).each(function(){fr.parseSuspend(e(this))}),this[hn]&&this[Yt]()},fr={cache:{visibleWrapper:V,body:V,exclusiveLayer:V,document:V,html:V,htmlbody:V,hiddenWrapper:V,layers:{},parent:V,window:V,wrapper:V},config:{baseZIndex:1e4,layers:{},mode:f,speed:500,easing:"ease",wrap:pt},layerIndex:1,create:function(t,i,s){var o,u;if(t in fr[r][P])return;if(f in i){if(!i[Jn]&&(o=e($n+t))[Q]==0)return;return fr[n].wrap||(fr[n].wrap=pt,fr.initWrappers()),u=new lr(t,i,fr.layerIndex++),fr[r][P][t]=u,o&&(o[U]()[On](u[lt]),o.remove()),s||fr._.updateState(),u}return},destroy:function(i){if(i in fr[r][P]){var s=fr[r][P][i];return s.suspend(),s[n][Ln]&&s[n][Ln]!=fr._.sd&&(a=fr._[An](s[n][Ln]),fr._[R](a,function(e){fr._.removeCachedElementFromState(a[e],i)})),s[n][Jt]&&(a=fr._[An](s[n][Jt]),fr._[R](a,function(e){fr._.removeCachedElementFromBreakpoint(a[e],i)})),e(s[lt]).remove(),delete fr[r][P][i],t.uncacheElement(i),pt}return},get:function(e){if(e in fr[r][P])return fr[r][P][e];return},hide:function(e){fr[r][P][e][Yt]()},show:function(e){fr[r][P][e][xn]()},toggle:function(e){var t=fr[r][P][e];t[qn]()?t[Yt]():t[xn]()},getBaseFontSize:function(){return fr._.vars.IEVersion<9?16.5:parseFloat(getComputedStyle(fr[r][Xn].get(0)).fontSize)},getHalf:function(e){var t=parseInt(e);return typeof e=="string"&&e.charAt(e[Q]-1)=="%"?Math.floor(t/2)+"%":Math.floor(t/2)+jn},lockView:function(e){e==Dn&&fr[r][Vn][x](D,ct),fr[n][Pn]!=q&&t.vars[rt]==Cn&&fr[r][K][x](tt,fr[r].document[tt]()),fr[r][H].on(ut,function(e){e[tn](),e[Kt](),fr[r][b]&&fr[r][b][Yt]()}),fr[r][an].on(Vt,function(e){fr[r][b]&&fr[r][b][Yt]()}),fr._.vars.isMobile||window[i](function(){fr[r][an].on(Rt,function(e){fr[r][b]&&fr[r][b][Yt]()})},fr[n][B]+50)},parseInit:function(t){var n,s,o=t.get(0),u=t[on]("data-action"),a=t[on]("data-args"),f,l;u&&a&&(a=a.split(","));switch(u){case"toggleLayer":case"layerToggle":t[x](Mt,Sn)[x]("cursor","pointer").on("touchend click",function(t){var n=e(this);t[tn](),t[Kt]();if(n[vt](at)===pt)return;n[vt](at,pt),window[i](function(){n.removeData(at)},500);if(fr[r][b])return fr[r][b][Yt](),Y;var s=fr[r][P][a[0]];s[qn]()?s[Yt]():s[xn]()});break;case"navList":f=e($n+a[0]),n=f[Ut]("a"),s=[],n.each(function(){var t=e(this),n,r;n=Math.max(0,t.parents("li")[Q]-1),r=t[on]("href"),s.push('<a class="link depth-'+n+'"'+(typeof r!==Xt&&r!=""?' href="'+r+'"':"")+'><span class="indent-'+n+'"></span>'+t.text()+"</a>")}),s[Q]>0&&t[Jn]("<nav>"+s.join("")+"</nav>");break;case"copyText":f=e($n+a[0]),t[Jn](f.text());break;case"copyHTML":f=e($n+a[0]),t[Jn](f[Jn]());break;case"moveElementContents":f=e($n+a[0]),o[g]=function(){f[U]().each(function(){var n=e(this);if(n[Wt](p))return;t[qt](n),n[ln](p),n[mt]()})},o[O]=function(){t[U]().each(function(){var t=e(this);if(!t[Wt](p))return;f[qt](t),t[En](p),fr.refresh(t),t[yt]()})},o[g]();break;case"moveElement":f=e($n+a[0]),o[g]=function(){if(f[Wt](p))return;e(dt+f[on]("id")+'" />').insertBefore(f),t[qt](f),f[ln](p),f[mt]()},o[O]=function(){if(!f[Wt](p))return;e(jt+f[on]("id")).replaceWith(f),f[En](p),fr.refresh(f),f[yt]()},o[g]();break;case"moveCell":f=e($n+a[0]),l=e($n+a[1]),o[g]=function(){e(dt+f[on]("id")+'" />').insertBefore(f),t[qt](f),f[x](L,nt),l&&l[en]()},o[O]=function(){e(jt+f[on]("id")).replaceWith(f),f[x](L,""),l&&l[x](L,"")},o[g]();break;default:}},parseResume:function(e){var t=e.get(0);t[g]&&t[g]()},parseSuspend:function(e){var t=e.get(0);t[O]&&t[O]()},recalc:function(e,t){var n=fr._.parseMeasurement(e),r;switch(n[1]){case"%":r=Math.floor(t*(n[0]/100));break;case"em":r=fr.getBaseFontSize()*n[0];break;default:case jn:r=n[0]}return r},recalcH:function(t){return fr.recalc(t,e(window)[tt]())},recalcW:function(t){return fr.recalc(t,e(window)[L]())},refresh:function(t){var n;t?n=t.filter(G):n=e(G),n[A](pt)[On](fr[r][c])},unlockView:function(e){e==Dn&&fr[r][Vn][x](D,""),fr[n][Pn]!=q&&t.vars[rt]==Cn&&fr[r][K][x](tt,""),fr[r][H].off(ut),fr[r][an].off(Vt),fr._.vars.isMobile||fr[r][an].off(Rt)},init:function(){n in fr[n]&&(fr._.extend(fr[n],fr[n][n]),delete fr[n][n]),fr._[R](fr[n],function(e){fr[n][e]&&typeof fr[n][e]==kn&&f in fr[n][e]&&(fr[n][P][e]=fr[n][e],delete fr[n][e])}),typeof fr[n][Pn]=="function"&&(fr[n][Pn]=fr[n][Pn]()),fr[n][Pn]==q&&(!fr._[nn](q)||!fr._[nn](W))&&(fr[n][Pn]=f),fr[n][Pn]==f&&!fr._[nn](W)&&(fr[n][Pn]=Bt),fr._.vars[rt]=="wp"&&(fr[n][Pn]=Bt),fr[r][an]=e(window),e(function(){fr.initAnimation(),fr.initObjects(),fr[n].wrap&&fr.initWrappers(),fr.initLayers(),fr.initIncludes(),fr._.updateState()})},initIncludes:function(){e(".skel-layers-include").each(function(){fr.parseInit(e(this))})},initLayers:function(){fr._[R](fr[n][P],function(e){fr.create(e,fr[n][P][e],pt)})},initObjects:function(){fr[r].document=e(document),fr[r][Jn]=e(Jn),fr[r][Xn]=e(Xn),fr[r][Vn]=e("html,body")},initAnimation:function(){fr[n][Pn]==Bt?(e.fn[wt]=function(t){e(this).fadeTo(fr[n][B],1,t)},e.fn[gt]=function(t){e(this).fadeTo(fr[n][B],0,t)}):(e.fn[wt]=function(t){e(this)[x](wn,1),t&&window[i](t,fr[n][B]+50)},e.fn[gt]=function(t){e(this)[x](wn,0),t&&window[i](t,fr[n][B]+50)});if(fr[n][Pn]==q)e.fn[s]=function(){return e(this)[l](0,0)},e.fn[l]=function(t,n){return e(this)[x](q,"translate("+t+"px, "+n+"px)")},e.fn[A]=function(){return e(this)[x](sn,ct)[x](_n,"500")[gn](W,"transform "+fr[n][B]/1e3+Mn+fr[n][Ct]+","+zn+fr[n][B]/1e3+Mn+fr[n][Ct])[vt](X,[sn,_n,mn,fn,Tn,bn,W])};else{var o=[];fr[n][Pn]==Bt?(fr[r][an].resize(function(){if(fr[n][B]!=0){var e=fr[n][B];fr[n][B]=0,window[i](function(){fr[n][B]=e,o=[]},0)}}),fr[n][Ct].substr(0,4)=="ease"?(fr[n][Ct]="swing",fr[n][B]=fr[n][B]*.65):fr[n][Ct]="linear",e.fn[_]=function(t,r){e(this)[Bt](t,fr[n][B],fr[n][Ct],r)},e.fn[A]=function(t){return e(this)[x](f,t?Hn:dn)[vt](X,[f])}):(fr[r][an].resize(function(){window[i](function(){o=[]},0)}),e.fn[_]=function(t,r){var s=e(this);fr._[R](t,function(e){s[x](e,t[e])}),window[i](r,fr[n][B])},e.fn[A]=function(t){return e(this)[x](W,"top "+fr[n][B]/1e3+Mn+fr[n][Ct]+","+"right "+fr[n][B]/1e3+Mn+fr[n][Ct]+","+"bottom "+fr[n][B]/1e3+Mn+fr[n][Ct]+","+"left "+fr[n][B]/1e3+Mn+fr[n][Ct]+","+zn+fr[n][B]/1e3+Mn+fr[n][Ct])[x](f,t?Hn:dn)[vt](X,[mn,fn,Tn,bn,W,f])}),e[E]=function(e){return e&&e.slice(-1)=="%"?e:parseInt(e)},e.fn[s]=function(){for(var t=0;t<this[Q];t++){var n=this[t],i=e(n);o[n.id]&&i[_](o[n.id],function(){fr._[R](o[n.id],function(e){i[x](e,o[n.id][e])}),fr[r][K][x](D,""),fr[r][H][x](L,nt)[x](xt,0)})}return e(this)},e.fn[l]=function(n,i){var s,u,l,c;n=parseInt(n),i=parseInt(i),n!=0?((t.vars[rt]==Cn?fr[r][K]:fr[r][Xn])[x](D,ct),fr[r][H][x](L,fr[r][an][L]())):l=function(){(t.vars[rt]==Cn?fr[r][K]:fr[r][Xn])[x](D,""),fr[r][H][x](L,nt)},i<0?fr[r][H][x](xt,Math.abs(i)):c=function(){fr[r][H][x](xt,0)};for(s=0;s<this[Q];s++){var h=this[s],p=e(h),d;if(!o[h.id])if(d=lr[C][$t][p[vt](_t)]){o[h.id]={};switch(d.v){case S:case ot:o[h.id][ot]=e[E](h.style[ot]);break;case N:o[h.id][N]=e[E](h.style[N])}switch(d.h){case S:case M:o[h.id][M]=e[E](h.style[M]);break;case T:o[h.id][T]=e[E](h.style[T])}}else d=p[f](),o[h.id]={top:d[ot],left:d[M]};a={},fr._[R](o[h.id],function(e){var t;switch(e){case ot:t=fr[cn](o[h.id][e])+i;break;case N:t=fr[cn](o[h.id][e])-i;break;case M:t=fr[ft](o[h.id][e])+n;break;case T:t=fr[ft](o[h.id][e])-n}a[e]=t}),p[_](a,function(){l&&l(),c&&c()})}return e(this)}}},initWrappers:function(){fr[n][Pn]!=q?(fr[r][Xn].wrapInner('<div id="skel-layers-parent" />'),fr[r][K]=e("#skel-layers-parent"),fr[r][K][x](f,dn)[x](M,0)[x](ot,0)[x]("min-height",Et)[x](L,Et)):fr[r][K]=fr[r][Xn],fr[r][K].wrapInner('<div id="skel-layers-wrapper" />'),fr[r][H]=e("#skel-layers-wrapper"),fr[r][H][x](f,Wn)[x](M,0)[x](T,0)[x](ot,0)[A](),fr[r][$]=e('<div id="skel-layers-hiddenWrapper" />')[On](fr[r][K]),fr[r][$][x](tt,Et),fr[r][c]=e('<div id="skel-layers-visibleWrapper" />')[On](fr[r][K]),fr[r][c][x](f,Wn),fr._[zt](Ft,fr[r][$][0]),fr._[zt]("skel_layers_visibleWrapper",fr[r][c][0]),fr._[zt]("skel_layers_wrapper",fr[r][H][0]),e("[autofocus]").focus(),fr.refresh()}},fr)}(jQuery))});

(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			global: { href: '/assets/skel/style.css', containers: '45em', grid: { gutters: ['2em', 0] } },
			xlarge: { media: '(max-width: 1680px)', href: '/assets/skel/style-xlarge.css' },
			large: { media: '(max-width: 1280px)', href: '/assets/skel/style-large.css', containers: '42em', grid: { gutters: ['1.5em', 0] }, viewport: { scalable: false } },
			medium: { media: '(max-width: 1024px)', href: '/assets/skel/style-medium.css', containers: '85%!' },
			small: { media: '(max-width: 736px)', href: '/assets/skel/style-small.css', containers: '90%!', grid: { gutters: ['1.25em', 0] } },
			xsmall: { media: '(max-width: 480px)', href: '/assets/skel/style-xsmall.css' }
		},
		plugins: {
			layers: {
				config: {
					mode: 'transform'
				},
				titleBar: {
					breakpoints: 'medium',
					width: '100%',
					height: 44,
					position: 'top-left',
					side: 'top',
					html: '<span class="toggle" data-action="toggleLayer" data-args="sidePanel"></span><span class="title" data-action="copyText" data-args="logo"></span>'
				},
				sidePanel: {
					breakpoints: 'medium',
					hidden: true,
					width: { small: 275, medium: '20em' },
					height: '100%',
					animation: 'pushX',
					position: 'top-right',
					side: 'right',
					orientation: 'vertical',
					clickToHide: true,
					html: '<div data-action="moveElement" data-args="header"></div>'
				}
			}
		}
	});

	$(function() {

		var $body = $('body'),
			$header = $('#header'),
			$nav = $('#nav'), $nav_a = $nav.find('a'),
			$wrapper = $('#wrapper');

		// Forms (IE<10).
			var $form = $('form');
			if ($form.length > 0) {

				$form.find('.form-button-submit')
					.on('click', function() {
						$(this).parents('form').submit();
						return false;
					});

				if (skel.vars.IEVersion < 10) {
					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();
				}

			}

		// Header.
			var ids = [];

			// Set up nav items.
				$nav_a
					.scrolly()
					.on('click', function(event) {

						var $this = $(this),
							href = $this.attr('href');

						// Not an internal link? Bail.
							if (href.charAt(0) != '#')
								return;

						// Prevent default behavior.
							event.preventDefault();

						// Remove active class from all links and mark them as locked (so scrollzer leaves them alone).
							$nav_a
								.removeClass('active')
								.addClass('scrollzer-locked');

						// Set active class on this link.
							$this.addClass('active');

					})
					.each(function() {

						var $this = $(this),
							href = $this.attr('href'),
							id;

						// Not an internal link? Bail.
							if (href.charAt(0) != '#')
								return;

						// Add to scrollzer ID list.
							id = href.substring(1);
							$this.attr('id', id + '-link');
							ids.push(id);

					});

			// Initialize scrollzer.
				$.scrollzer(ids, { pad: 300, lastHack: true });

	});

})(jQuery);
if(!AmCharts)var AmCharts={themes:{},maps:{},inheriting:{},charts:[],onReadyArray:[],useUTC:!1,updateRate:40,uid:0,lang:{},translations:{},mapTranslations:{},windows:{},initHandlers:[]};
AmCharts.Class=function(a){var b=function(){arguments[0]!==AmCharts.inheriting&&(this.events={},this.construct.apply(this,arguments))};a.inherits?(b.prototype=new a.inherits(AmCharts.inheriting),b.base=a.inherits.prototype,delete a.inherits):(b.prototype.createEvents=function(){for(var a=0,b=arguments.length;a<b;a++)this.events[arguments[a]]=[]},b.prototype.listenTo=function(a,b,c){this.removeListener(a,b,c);a.events[b].push({handler:c,scope:this})},b.prototype.addListener=function(a,b,c){this.removeListener(this,
a,b);this.events[a].push({handler:b,scope:c})},b.prototype.removeListener=function(a,b,c){if(a&&a.events)for(a=a.events[b],b=a.length-1;0<=b;b--)a[b].handler===c&&a.splice(b,1)},b.prototype.fire=function(a,b){for(var c=this.events[a],g=0,h=c.length;g<h;g++){var k=c[g];k.handler.call(k.scope,b)}});for(var c in a)b.prototype[c]=a[c];return b};AmCharts.addChart=function(a){AmCharts.charts.push(a)};AmCharts.removeChart=function(a){for(var b=AmCharts.charts,c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)};
AmCharts.isModern=!0;AmCharts.getIEVersion=function(){var a=0;if("Microsoft Internet Explorer"==navigator.appName){var b=navigator.userAgent,c=/MSIE ([0-9]{1,}[.0-9]{0,})/;null!=c.exec(b)&&(a=parseFloat(RegExp.$1))}else"Netscape"==navigator.appName&&(b=navigator.userAgent,c=/Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/,null!=c.exec(b)&&(a=parseFloat(RegExp.$1)));return a};
AmCharts.applyLang=function(a,b){var c=AmCharts.translations;b.dayNames=AmCharts.dayNames;b.shortDayNames=AmCharts.shortDayNames;b.monthNames=AmCharts.monthNames;b.shortMonthNames=AmCharts.shortMonthNames;c&&(c=c[a])&&(AmCharts.lang=c,c.monthNames&&(b.dayNames=c.dayNames,b.shortDayNames=c.shortDayNames,b.monthNames=c.monthNames,b.shortMonthNames=c.shortMonthNames))};AmCharts.IEversion=AmCharts.getIEVersion();9>AmCharts.IEversion&&0<AmCharts.IEversion&&(AmCharts.isModern=!1,AmCharts.isIE=!0);
AmCharts.dx=0;AmCharts.dy=0;if(document.addEventListener||window.opera)AmCharts.isNN=!0,AmCharts.isIE=!1,AmCharts.dx=.5,AmCharts.dy=.5;document.attachEvent&&(AmCharts.isNN=!1,AmCharts.isIE=!0,AmCharts.isModern||(AmCharts.dx=0,AmCharts.dy=0));window.chrome&&(AmCharts.chrome=!0);AmCharts.handleResize=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var c=a[b];c&&c.div&&c.handleResize()}};
AmCharts.handleMouseUp=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];d&&d.handleReleaseOutside&&d.handleReleaseOutside(a)}};AmCharts.handleMouseMove=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];d&&d.handleMouseMove&&d.handleMouseMove(a)}};
AmCharts.handleWheel=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];if(d&&d.mouseIsOver){d.mouseWheelScrollEnabled||d.mouseWheelZoomEnabled?d.handleWheel&&d.handleWheel(a):a.stopPropagation&&a.stopPropagation();break}}};AmCharts.resetMouseOver=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var c=a[b];c&&(c.mouseIsOver=!1)}};AmCharts.ready=function(a){AmCharts.onReadyArray.push(a)};
AmCharts.handleLoad=function(){AmCharts.isReady=!0;for(var a=AmCharts.onReadyArray,b=0;b<a.length;b++){var c=a[b];isNaN(AmCharts.processDelay)?c():setTimeout(c,AmCharts.processDelay*b)}};AmCharts.addInitHandler=function(a,b){AmCharts.initHandlers.push({method:a,types:b})};AmCharts.callInitHandler=function(a){var b=AmCharts.initHandlers;if(AmCharts.initHandlers)for(var c=0;c<b.length;c++){var d=b[c];d.types?AmCharts.isInArray(d.types,a.type)&&d.method(a):d.method(a)}};
AmCharts.getUniqueId=function(){AmCharts.uid++;return"AmChartsEl-"+AmCharts.uid};
AmCharts.isNN&&(document.addEventListener("mousemove",AmCharts.handleMouseMove,!0),window.addEventListener("resize",AmCharts.handleResize,!0),window.addEventListener("orientationchange",AmCharts.handleResize,!0),document.addEventListener("mouseup",AmCharts.handleMouseUp,!0),window.addEventListener("load",AmCharts.handleLoad,!0),window.addEventListener("DOMMouseScroll",AmCharts.handleWheel,!0),document.addEventListener("mousewheel",AmCharts.handleWheel,!0));
AmCharts.isIE&&(document.attachEvent("onmousemove",AmCharts.handleMouseMove),window.attachEvent("onresize",AmCharts.handleResize),document.attachEvent("onmouseup",AmCharts.handleMouseUp),window.attachEvent("onload",AmCharts.handleLoad));
AmCharts.clear=function(){var a=AmCharts.charts;if(a)for(var b=0;b<a.length;b++)a[b].clear();AmCharts.charts=null;AmCharts.isNN&&(document.removeEventListener("mousemove",AmCharts.handleMouseMove,!0),window.removeEventListener("resize",AmCharts.handleResize,!0),document.removeEventListener("mouseup",AmCharts.handleMouseUp,!0),window.removeEventListener("load",AmCharts.handleLoad,!0),window.removeEventListener("DOMMouseScroll",AmCharts.handleWheel,!0),document.removeEventListener("mousewheel",AmCharts.handleWheel,
!0));AmCharts.isIE&&(document.detachEvent("onmousemove",AmCharts.handleMouseMove),window.detachEvent("onresize",AmCharts.handleResize),document.detachEvent("onmouseup",AmCharts.handleMouseUp),window.detachEvent("onload",AmCharts.handleLoad))};
AmCharts.makeChart=function(a,b,c){var d=b.type,e=b.theme;AmCharts.isString(e)&&(e=AmCharts.themes[e],b.theme=e);var f;switch(d){case "serial":f=new AmCharts.AmSerialChart(e);break;case "xy":f=new AmCharts.AmXYChart(e);break;case "pie":f=new AmCharts.AmPieChart(e);break;case "radar":f=new AmCharts.AmRadarChart(e);break;case "gauge":f=new AmCharts.AmAngularGauge(e);break;case "funnel":f=new AmCharts.AmFunnelChart(e);break;case "map":f=new AmCharts.AmMap(e);break;case "stock":f=new AmCharts.AmStockChart(e)}AmCharts.extend(f,
b);AmCharts.isReady?isNaN(c)?f.write(a):setTimeout(function(){AmCharts.realWrite(f,a)},c):AmCharts.ready(function(){isNaN(c)?f.write(a):setTimeout(function(){AmCharts.realWrite(f,a)},c)});return f};AmCharts.realWrite=function(a,b){a.write(b)};AmCharts.toBoolean=function(a,b){if(void 0===a)return b;switch(String(a).toLowerCase()){case "true":case "yes":case "1":return!0;case "false":case "no":case "0":case null:return!1;default:return Boolean(a)}};AmCharts.removeFromArray=function(a,b){var c;if(void 0!=b&&void 0!=a)for(c=a.length-1;0<=c;c--)a[c]==b&&a.splice(c,1)};AmCharts.isInArray=function(a,b){for(var c=0;c<a.length;c++)if(a[c]==b)return!0;return!1};
AmCharts.getDecimals=function(a){var b=0;isNaN(a)||(a=String(a),-1!=a.indexOf("e-")?b=Number(a.split("-")[1]):-1!=a.indexOf(".")&&(b=a.split(".")[1].length));return b};
AmCharts.wrappedText=function(a,b,c,d,e,f,g,h,k){var l=AmCharts.text(a,b,c,d,e,f,g),m="\n";AmCharts.isModern||(m="<br>");if(10<k)return l;if(l){var n=l.getBBox();if(n.width>h){n=Math.ceil(n.width/h);l.remove();for(var l=[],p=0;-1<(index=b.indexOf(" ",p));)l.push(index),p=index+1;Math.round(b.length/2);for(var r,p=0;p<l.length;p+=Math.ceil(l.length/n))r=l[p],b=b.substr(0,r)+m+b.substr(r+1);if(isNaN(r)){if(0==k)for(p=1;p<n;p++)r=Math.round(b.length/n*p),b=b.substr(0,r)+m+b.substr(r);return AmCharts.text(a,
b,c,d,e,f,g)}return AmCharts.wrappedText(a,b,c,d,e,f,g,h,k+1)}return l}};AmCharts.getStyle=function(a,b){var c="";document.defaultView&&document.defaultView.getComputedStyle?c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),c=a.currentStyle[b]);return c};AmCharts.removePx=function(a){if(void 0!=a)return Number(a.substring(0,a.length-2))};
AmCharts.getURL=function(a,b){if(a)if("_self"!=b&&b)if("_top"==b&&window.top)window.top.location.href=a;else if("_parent"==b&&window.parent)window.parent.location.href=a;else if("_blank"==b)window.open(a);else{var c=document.getElementsByName(b)[0];c?c.src=a:(c=AmCharts.windows[b])?c.opener&&!c.opener.closed?c.location.href=a:AmCharts.windows[b]=window.open(a):AmCharts.windows[b]=window.open(a)}else window.location.href=a};AmCharts.ifArray=function(a){return a&&0<a.length?!0:!1};
AmCharts.callMethod=function(a,b){var c;for(c=0;c<b.length;c++){var d=b[c];if(d){if(d[a])d[a]();var e=d.length;if(0<e){var f;for(f=0;f<e;f++){var g=d[f];if(g&&g[a])g[a]()}}}}};AmCharts.toNumber=function(a){return"number"==typeof a?a:Number(String(a).replace(/[^0-9\-.]+/g,""))};
AmCharts.toColor=function(a){if(""!==a&&void 0!==a)if(-1!=a.indexOf(",")){a=a.split(",");var b;for(b=0;b<a.length;b++){var c=a[b].substring(a[b].length-6,a[b].length);a[b]="#"+c}}else a=a.substring(a.length-6,a.length),a="#"+a;return a};AmCharts.toCoordinate=function(a,b,c){var d;void 0!==a&&(a=String(a),c&&c<b&&(b=c),d=Number(a),-1!=a.indexOf("!")&&(d=b-Number(a.substr(1))),-1!=a.indexOf("%")&&(d=b*Number(a.substr(0,a.length-1))/100));return d};
AmCharts.fitToBounds=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};AmCharts.isDefined=function(a){return void 0===a?!1:!0};AmCharts.stripNumbers=function(a){return a.replace(/[0-9]+/g,"")};AmCharts.roundTo=function(a,b){if(0>b)return a;var c=Math.pow(10,b);return Math.round(a*c)/c};AmCharts.toFixed=function(a,b){var c=String(Math.round(a*Math.pow(10,b)));if(0<b){var d=c.length;if(d<b){var e;for(e=0;e<b-d;e++)c="0"+c}d=c.substring(0,c.length-b);""===d&&(d=0);return d+"."+c.substring(c.length-b,c.length)}return String(c)};
AmCharts.formatDuration=function(a,b,c,d,e,f){var g=AmCharts.intervals,h=f.decimalSeparator;if(a>=g[b].contains){var k=a-Math.floor(a/g[b].contains)*g[b].contains;"ss"==b&&(k=AmCharts.formatNumber(k,f),1==k.split(h)[0].length&&(k="0"+k));("mm"==b||"hh"==b)&&10>k&&(k="0"+k);c=k+""+d[b]+""+c;a=Math.floor(a/g[b].contains);b=g[b].nextInterval;return AmCharts.formatDuration(a,b,c,d,e,f)}"ss"==b&&(a=AmCharts.formatNumber(a,f),1==a.split(h)[0].length&&(a="0"+a));("mm"==b||"hh"==b)&&10>a&&(a="0"+a);c=a+""+
d[b]+""+c;if(g[e].count>g[b].count)for(a=g[b].count;a<g[e].count;a++)b=g[b].nextInterval,"ss"==b||"mm"==b||"hh"==b?c="00"+d[b]+""+c:"DD"==b&&(c="0"+d[b]+""+c);":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-1));return c};
AmCharts.formatNumber=function(a,b,c,d,e){a=AmCharts.roundTo(a,b.precision);isNaN(c)&&(c=b.precision);var f=b.decimalSeparator;b=b.thousandsSeparator;var g;g=0>a?"-":"";a=Math.abs(a);var h=String(a),k=!1;-1!=h.indexOf("e")&&(k=!0);0<=c&&!k&&(h=AmCharts.toFixed(a,c));var l="";if(k)l=h;else{var h=h.split("."),k=String(h[0]),m;for(m=k.length;0<=m;m-=3)l=m!=k.length?0!==m?k.substring(m-3,m)+b+l:k.substring(m-3,m)+l:k.substring(m-3,m);void 0!==h[1]&&(l=l+f+h[1]);void 0!==c&&0<c&&"0"!=l&&(l=AmCharts.addZeroes(l,
f,c))}l=g+l;""===g&&!0===d&&0!==a&&(l="+"+l);!0===e&&(l+="%");return l};AmCharts.addZeroes=function(a,b,c){a=a.split(b);void 0===a[1]&&0<c&&(a[1]="0");return a[1].length<c?(a[1]+="0",AmCharts.addZeroes(a[0]+b+a[1],b,c)):void 0!==a[1]?a[0]+b+a[1]:a[0]};
AmCharts.scientificToNormal=function(a){var b;a=String(a).split("e");var c;if("-"==a[1].substr(0,1)){b="0.";for(c=0;c<Math.abs(Number(a[1]))-1;c++)b+="0";b+=a[0].split(".").join("")}else{var d=0;b=a[0].split(".");b[1]&&(d=b[1].length);b=a[0].split(".").join("");for(c=0;c<Math.abs(Number(a[1]))-d;c++)b+="0"}return b};
AmCharts.toScientific=function(a,b){if(0===a)return"0";var c=Math.floor(Math.log(Math.abs(a))*Math.LOG10E);Math.pow(10,c);mantissa=String(mantissa).split(".").join(b);return String(mantissa)+"e"+c};AmCharts.randomColor=function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6)};
AmCharts.hitTest=function(a,b,c){var d=!1,e=a.x,f=a.x+a.width,g=a.y,h=a.y+a.height,k=AmCharts.isInRectangle;d||(d=k(e,g,b));d||(d=k(e,h,b));d||(d=k(f,g,b));d||(d=k(f,h,b));d||!0===c||(d=AmCharts.hitTest(b,a,!0));return d};AmCharts.isInRectangle=function(a,b,c){return a>=c.x-5&&a<=c.x+c.width+5&&b>=c.y-5&&b<=c.y+c.height+5?!0:!1};AmCharts.isPercents=function(a){if(-1!=String(a).indexOf("%"))return!0};
AmCharts.findPosX=function(a){var b=a,c=a.offsetLeft;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetLeft;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollLeft||0}return c};AmCharts.findPosY=function(a){var b=a,c=a.offsetTop;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetTop;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollTop||0}return c};AmCharts.findIfFixed=function(a){if(a.offsetParent)for(;a=a.offsetParent;)if("fixed"==AmCharts.getStyle(a,"position"))return!0;return!1};
AmCharts.findIfAuto=function(a){return a.style&&"auto"==AmCharts.getStyle(a,"overflow")?!0:a.parentNode?AmCharts.findIfAuto(a.parentNode):!1};AmCharts.findScrollLeft=function(a,b){a.scrollLeft&&(b+=a.scrollLeft);return a.parentNode?AmCharts.findScrollLeft(a.parentNode,b):b};AmCharts.findScrollTop=function(a,b){a.scrollTop&&(b+=a.scrollTop);return a.parentNode?AmCharts.findScrollTop(a.parentNode,b):b};
AmCharts.formatValue=function(a,b,c,d,e,f,g,h){if(b){void 0===e&&(e="");var k;for(k=0;k<c.length;k++){var l=c[k],m=b[l];void 0!==m&&(m=f?AmCharts.addPrefix(m,h,g,d):AmCharts.formatNumber(m,d),a=a.replace(new RegExp("\\[\\["+e+""+l+"\\]\\]","g"),m))}}return a};AmCharts.formatDataContextValue=function(a,b){if(a){var c=a.match(/\[\[.*?\]\]/g),d;for(d=0;d<c.length;d++){var e=c[d],e=e.substr(2,e.length-4);void 0!==b[e]&&(a=a.replace(new RegExp("\\[\\["+e+"\\]\\]","g"),b[e]))}}return a};
AmCharts.massReplace=function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];void 0===d&&(d="");a=a.replace(c,d)}return a};AmCharts.cleanFromEmpty=function(a){return a.replace(/\[\[[^\]]*\]\]/g,"")};
AmCharts.addPrefix=function(a,b,c,d,e){var f=AmCharts.formatNumber(a,d),g="",h,k,l;if(0===a)return"0";0>a&&(g="-");a=Math.abs(a);if(1<a)for(h=b.length-1;-1<h;h--){if(a>=b[h].number&&(k=a/b[h].number,l=Number(d.precision),1>l&&(l=1),c=AmCharts.roundTo(k,l),l=AmCharts.formatNumber(c,{precision:-1,decimalSeparator:d.decimalSeparator,thousandsSeparator:d.thousandsSeparator}),!e||k==c)){f=g+""+l+""+b[h].prefix;break}}else for(h=0;h<c.length;h++)if(a<=c[h].number){k=a/c[h].number;l=Math.abs(Math.round(Math.log(k)*
Math.LOG10E));k=AmCharts.roundTo(k,l);f=g+""+k+""+c[h].prefix;break}return f};AmCharts.remove=function(a){a&&a.remove()};AmCharts.recommended=function(){var a="js";document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")||swfobject&&swfobject.hasFlashPlayerVersion("8")&&(a="flash");return a};AmCharts.getEffect=function(a){">"==a&&(a="easeOutSine");"<"==a&&(a="easeInSine");"elastic"==a&&(a="easeOutElastic");return a};
AmCharts.getObjById=function(a,b){var c,d;for(d=0;d<a.length;d++){var e=a[d];e.id==b&&(c=e)}return c};AmCharts.applyTheme=function(a,b,c){b||(b=AmCharts.theme);b&&b[c]&&AmCharts.extend(a,b[c])};AmCharts.isString=function(a){return"string"==typeof a?!0:!1};AmCharts.extend=function(a,b,c){for(var d in b)c?a.hasOwnProperty(d)||(a[d]=b[d]):a[d]=b[d];return a};
AmCharts.copyProperties=function(a,b){for(var c in a)a.hasOwnProperty(c)&&"events"!=c&&void 0!==a[c]&&"function"!=typeof a[c]&&"cname"!=c&&(b[c]=a[c])};AmCharts.processObject=function(a,b,c){!1===a instanceof b&&(a=AmCharts.extend(new b(c),a));return a};AmCharts.fixNewLines=function(a){var b=RegExp("\\n","g");a&&(a=a.replace(b,"<br />"));return a};AmCharts.fixBrakes=function(a){if(AmCharts.isModern){var b=RegExp("<br>","g");a&&(a=a.replace(b,"\n"))}else a=AmCharts.fixNewLines(a);return a};
AmCharts.deleteObject=function(a,b){if(a){if(void 0===b||null===b)b=20;if(0!==b)if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)AmCharts.deleteObject(a[c],b-1),a[c]=null;else if(a&&!a.tagName)try{for(c in a)a[c]&&("object"==typeof a[c]&&AmCharts.deleteObject(a[c],b-1),"function"!=typeof a[c]&&(a[c]=null))}catch(d){}}};
AmCharts.bounce=function(a,b,c,d,e){return(b/=e)<1/2.75?7.5625*d*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c};AmCharts.easeInSine=function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c};AmCharts.easeOutSine=function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c};
AmCharts.easeOutElastic=function(a,b,c,d,e){a=1.70158;var f=0,g=d;if(0===b)return c;if(1==(b/=e))return c+d;f||(f=.3*e);g<Math.abs(d)?(g=d,a=f/4):a=f/(2*Math.PI)*Math.asin(d/g);return g*Math.pow(2,-10*b)*Math.sin(2*(b*e-a)*Math.PI/f)+d+c};AmCharts.fixStepE=function(a){a=a.toExponential(0).split("e");var b=Number(a[1]);9==Number(a[0])&&b++;return AmCharts.generateNumber(1,b)};
AmCharts.generateNumber=function(a,b){var c="",d;d=0>b?Math.abs(b)-1:Math.abs(b);var e;for(e=0;e<d;e++)c+="0";return 0>b?Number("0."+c+String(a)):Number(String(a)+c)};AmCharts.setCN=function(a,b,c,d){if(a.addClassNames&&b&&(b=b.node)&&c){var e=b.getAttribute("class");a=a.classNamePrefix+"-";d&&(a="");e?b.setAttribute("class",e+" "+a+c):b.setAttribute("class",a+c)}};
AmCharts.parseDefs=function(a,b){for(var c in a){var d=typeof a[c];if(0<a[c].length&&"object"==d)for(d=0;d<a[c].length;d++){var e=document.createElementNS(AmCharts.SVG_NS,c);b.appendChild(e);AmCharts.parseDefs(a[c][d],e)}else"object"==d?(e=document.createElementNS(AmCharts.SVG_NS,c),b.appendChild(e),AmCharts.parseDefs(a[c],e)):b.setAttribute(c,a[c])}};AmCharts.AxisBase=AmCharts.Class({construct:function(a){this.createEvents("clickItem","rollOverItem","rollOutItem");this.viY=this.viX=this.y=this.x=this.dy=this.dx=0;this.axisThickness=1;this.axisColor="#000000";this.axisAlpha=1;this.gridCount=this.tickLength=5;this.gridAlpha=.15;this.gridThickness=1;this.gridColor="#000000";this.dashLength=0;this.labelFrequency=1;this.showLastLabel=this.showFirstLabel=!0;this.fillColor="#FFFFFF";this.fillAlpha=0;this.labelsEnabled=!0;this.labelRotation=0;this.autoGridCount=
!0;this.offset=0;this.guides=[];this.visible=!0;this.counter=0;this.guides=[];this.ignoreAxisWidth=this.inside=!1;this.minHorizontalGap=75;this.minVerticalGap=35;this.titleBold=!0;this.minorGridEnabled=!1;this.minorGridAlpha=.07;this.autoWrap=!1;this.titleAlign="middle";this.labelOffset=0;this.bcn="axis-";AmCharts.applyTheme(this,a,"AxisBase")},zoom:function(a,b){this.start=a;this.end=b;this.dataChanged=!0;this.draw()},fixAxisPosition:function(){var a=this.position;"H"==this.orientation?("left"==
a&&(a="bottom"),"right"==a&&(a="top")):("bottom"==a&&(a="left"),"top"==a&&(a="right"));this.position=a},draw:function(){var a=this.chart;this.allLabels=[];this.counter=0;this.destroy();this.fixAxisPosition();this.labels=[];var b=a.container,c=b.set();a.gridSet.push(c);this.set=c;b=b.set();a.axesLabelsSet.push(b);this.labelsSet=b;this.axisLine=new this.axisRenderer(this);this.autoGridCount?("V"==this.orientation?(a=this.height/this.minVerticalGap,3>a&&(a=3)):a=this.width/this.minHorizontalGap,this.gridCountR=
Math.max(a,1)):this.gridCountR=this.gridCount;this.axisWidth=this.axisLine.axisWidth;this.addTitle()},setOrientation:function(a){this.orientation=a?"H":"V"},addTitle:function(){var a=this.title;this.titleLabel=null;if(a){var b=this.chart,c=this.titleColor;void 0===c&&(c=b.color);var d=this.titleFontSize;isNaN(d)&&(d=b.fontSize+1);a=AmCharts.text(b.container,a,c,b.fontFamily,d,this.titleAlign,this.titleBold);AmCharts.setCN(b,a,this.bcn+"title");this.titleLabel=a}},positionTitle:function(){var a=this.titleLabel;
if(a){var b,c,d=this.labelsSet,e={};0<d.length()?e=d.getBBox():(e.x=0,e.y=0,e.width=this.viW,e.height=this.viH);d.push(a);var d=e.x,f=e.y;AmCharts.VML&&(this.rotate?d-=this.x:f-=this.y);var g=e.width,e=e.height,h=this.viW,k=this.viH,l=0,m=a.getBBox().height/2,n=this.inside,p=this.titleAlign;switch(this.position){case "top":b="left"==p?-1:"right"==p?h:h/2;c=f-10-m;break;case "bottom":b="left"==p?-1:"right"==p?h:h/2;c=f+e+10+m;break;case "left":b=d-10-m;n&&(b-=5);c="left"==p?k+1:"right"==p?-1:k/2;l=
-90;break;case "right":b=d+g+10+m-3,n&&(b+=7),c="left"==p?k+2:"right"==p?-2:k/2,l=-90}this.marginsChanged?(a.translate(b,c),this.tx=b,this.ty=c):a.translate(this.tx,this.ty);this.marginsChanged=!1;0!==l&&a.rotate(l)}},pushAxisItem:function(a,b){var c=this,d=a.graphics();0<d.length()&&(b?c.labelsSet.push(d):c.set.push(d));if(d=a.getLabel())this.labelsSet.push(d),d.click(function(b){c.handleMouse(b,a,"clickItem")}).mouseover(function(b){c.handleMouse(b,a,"rollOverItem")}).mouseout(function(b){c.handleMouse(b,
a,"rollOutItem")})},handleMouse:function(a,b,c){this.fire(c,{type:c,value:b.value,serialDataItem:b.serialDataItem,axis:this,target:b.label,chart:this.chart,event:a})},addGuide:function(a){for(var b=this.guides,c=!1,d=b.length,e=0;e<b.length;e++)b[e]==a&&(c=!0,d=e);a.id||(a.id="guideAuto"+d+"_"+(new Date).getTime());c||b.push(a)},removeGuide:function(a){var b=this.guides,c;for(c=0;c<b.length;c++)b[c]==a&&b.splice(c,1)},handleGuideOver:function(a){clearTimeout(this.chart.hoverInt);var b=a.graphics.getBBox(),
c=b.x+b.width/2,b=b.y+b.height/2,d=a.fillColor;void 0===d&&(d=a.lineColor);this.chart.showBalloon(a.balloonText,d,!0,c,b)},handleGuideOut:function(a){this.chart.hideBalloon()},addEventListeners:function(a,b){var c=this;a.mouseover(function(){c.handleGuideOver(b)});a.mouseout(function(){c.handleGuideOut(b)})},getBBox:function(){var a=this.labelsSet.getBBox();AmCharts.VML||(a={x:a.x+this.x,y:a.y+this.y,width:a.width,height:a.height});return a},destroy:function(){AmCharts.remove(this.set);AmCharts.remove(this.labelsSet);
var a=this.axisLine;a&&AmCharts.remove(a.set);AmCharts.remove(this.grid0)}});AmCharts.ValueAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(a){this.cname="ValueAxis";this.createEvents("axisChanged","logarithmicAxisFailed","axisSelfZoomed","axisZoomed");AmCharts.ValueAxis.base.construct.call(this,a);this.dataChanged=!0;this.stackType="none";this.position="left";this.unitPosition="right";this.recalculateToPercents=this.includeHidden=this.includeGuidesInMinMax=this.integersOnly=!1;this.durationUnits={DD:"d. ",hh:":",mm:":",ss:""};this.scrollbar=!1;this.baseValue=
0;this.radarCategoriesEnabled=!0;this.gridType="polygons";this.useScientificNotation=!1;this.axisTitleOffset=10;this.minMaxMultiplier=1;this.logGridLimit=2;this.totalTextOffset=this.treatZeroAs=0;AmCharts.applyTheme(this,a,this.cname)},updateData:function(){0>=this.gridCountR&&(this.gridCountR=1);this.totals=[];this.data=this.chart.chartData;var a=this.chart;"xy"!=a.type&&(this.stackGraphs("smoothedLine"),this.stackGraphs("line"),this.stackGraphs("column"),this.stackGraphs("step"));this.recalculateToPercents&&
this.recalculate();this.synchronizationMultiplier&&this.synchronizeWith?(AmCharts.isString(this.synchronizeWith)&&(this.synchronizeWith=a.getValueAxisById(this.synchronizeWith)),this.synchronizeWith&&(this.synchronizeWithAxis(this.synchronizeWith),this.foundGraphs=!0)):(this.foundGraphs=!1,this.getMinMax())},draw:function(){AmCharts.ValueAxis.base.draw.call(this);var a=this.chart,b=this.set;AmCharts.setCN(a,this.set,"value-axis value-axis-"+this.id);AmCharts.setCN(a,this.labelsSet,"value-axis value-axis-"+
this.id);AmCharts.setCN(a,this.axisLine.axisSet,"value-axis value-axis-"+this.id);"duration"==this.type&&(this.duration="ss");!0===this.dataChanged&&(this.updateData(),this.dataChanged=!1);if(this.logarithmic){var c=this.treatZeroAs,d=this.getMin(0,this.data.length-1);0<c&&0==d&&(this.minReal=d=c);if(0>=d||0>=this.minimum){this.fire("logarithmicAxisFailed",{type:"logarithmicAxisFailed",chart:a});return}}this.grid0=null;var e,f,g=a.dx,h=a.dy,c=!1,d=this.logarithmic;if(isNaN(this.min)||isNaN(this.max)||
!this.foundGraphs||Infinity==this.min||-Infinity==this.max)c=!0;else{var k=this.labelFrequency,l=this.showFirstLabel,m=this.showLastLabel,n=1,p=0,r=Math.round((this.max-this.min)/this.step)+1,q;!0===d?(q=Math.log(this.max)*Math.LOG10E-Math.log(this.minReal)*Math.LOG10E,this.stepWidth=this.axisWidth/q,q>this.logGridLimit&&(r=Math.ceil(Math.log(this.max)*Math.LOG10E)+1,p=Math.round(Math.log(this.minReal)*Math.LOG10E),r>this.gridCountR&&(n=Math.ceil(r/this.gridCountR)))):this.stepWidth=this.axisWidth/
(this.max-this.min);var t=0;1>this.step&&-1<this.step&&(t=AmCharts.getDecimals(this.step));this.integersOnly&&(t=0);t>this.maxDecCount&&(t=this.maxDecCount);var z=this.precision;isNaN(z)||(t=z);this.max=AmCharts.roundTo(this.max,this.maxDecCount);this.min=AmCharts.roundTo(this.min,this.maxDecCount);f={};f.precision=t;f.decimalSeparator=a.nf.decimalSeparator;f.thousandsSeparator=a.nf.thousandsSeparator;this.numberFormatter=f;var x,u=this.guides;e=u.length;if(0<e){var w=this.fillAlpha;for(f=this.fillAlpha=
0;f<e;f++){var y=u[f],A=NaN,C=y.above;isNaN(y.toValue)||(A=this.getCoordinate(y.toValue),x=new this.axisItemRenderer(this,A,"",!0,NaN,NaN,y),this.pushAxisItem(x,C));var B=NaN;isNaN(y.value)||(B=this.getCoordinate(y.value),x=new this.axisItemRenderer(this,B,y.label,!0,NaN,(A-B)/2,y),this.pushAxisItem(x,C));isNaN(A-B)||(x=new this.guideFillRenderer(this,B,A,y),this.pushAxisItem(x,C),x=x.graphics(),y.graphics=x,y.balloonText&&this.addEventListeners(x,y))}this.fillAlpha=w}this.exponential=!1;for(f=p;f<
r;f+=n)u=AmCharts.roundTo(this.step*f+this.min,t),-1!=String(u).indexOf("e")&&(this.exponential=!0,String(u).split("e"));this.duration&&(this.maxInterval=AmCharts.getMaxInterval(this.max,this.duration));var t=this.step,H,u=this.minorGridAlpha;this.minorGridEnabled&&(H=this.getMinorGridStep(t,this.stepWidth*t));for(f=p;f<r;f+=n)if(p=t*f+this.min,d&&this.max-this.min>5*this.min&&(p-=this.min),p=AmCharts.roundTo(p,this.maxDecCount+1),!this.integersOnly||Math.round(p)==p)if(isNaN(z)||Number(AmCharts.toFixed(p,
z))==p){!0===d&&(0===p&&(p=this.minReal),q>this.logGridLimit&&(p=Math.pow(10,f)));x=this.formatValue(p,!1,f);Math.round(f/k)!=f/k&&(x=void 0);if(0===f&&!l||f==r-1&&!m)x=" ";e=this.getCoordinate(p);x=new this.axisItemRenderer(this,e,x,void 0,void 0,void 0,void 0,this.boldLabels);this.pushAxisItem(x);if(p==this.baseValue&&"radar"!=a.type){var D,I,y=this.viW,C=this.viH;x=this.viX;w=this.viY;"H"==this.orientation?0<=e&&e<=y+1&&(D=[e,e,e+g],I=[C,0,h]):0<=e&&e<=C+1&&(D=[0,y,y+g],I=[e,e,e+h]);D&&(e=AmCharts.fitToBounds(2*
this.gridAlpha,0,1),e=AmCharts.line(a.container,D,I,this.gridColor,e,1,this.dashLength),e.translate(x,w),this.grid0=e,a.axesSet.push(e),e.toBack(),AmCharts.setCN(a,e,this.bcn+"zero-grid-"+this.id),AmCharts.setCN(a,e,this.bcn+"zero-grid"))}if(!isNaN(H)&&0<u&&f<r-1){x=this.gridAlpha;this.gridAlpha=this.minorGridAlpha;for(e=1;e<t/H;e++)w=this.getCoordinate(p+H*e),w=new this.axisItemRenderer(this,w,"",!1,0,0,!1,!1,0,!0),this.pushAxisItem(w);this.gridAlpha=x}}q=this.baseValue;this.min>this.baseValue&&
this.max>this.baseValue&&(q=this.min);this.min<this.baseValue&&this.max<this.baseValue&&(q=this.max);d&&q<this.minReal&&(q=this.minReal);this.baseCoord=this.getCoordinate(q);q={type:"axisChanged",target:this,chart:a};q.min=d?this.minReal:this.min;q.max=this.max;this.fire("axisChanged",q);this.axisCreated=!0}d=this.axisLine.set;q=this.labelsSet;this.positionTitle();"radar"!=a.type?(a=this.viX,H=this.viY,b.translate(a,H),q.translate(a,H)):d.toFront();!this.visible||c?(b.hide(),d.hide(),q.hide()):(b.show(),
d.show(),q.show());this.axisY=this.y-this.viY;this.axisX=this.x-this.viX},formatValue:function(a,b,c){var d=this.exponential,e=this.logarithmic,f=this.numberFormatter,g=this.chart;!0===this.logarithmic&&(d=-1!=String(a).indexOf("e")?!0:!1);this.useScientificNotation&&(d=!0);this.usePrefixes&&(d=!1);d?(b=-1==String(a).indexOf("e")?a.toExponential(15):String(a),c=b.split("e"),b=Number(c[0]),c=Number(c[1]),b=AmCharts.roundTo(b,14),10==b&&(b=1,c+=1),b=b+"e"+c,0===a&&(b="0"),1==a&&(b="1")):(e&&(d=String(a).split("."),
d[1]?(f.precision=d[1].length,0>c&&(f.precision=Math.abs(c))):f.precision=-1),b=this.usePrefixes?AmCharts.addPrefix(a,g.prefixesOfBigNumbers,g.prefixesOfSmallNumbers,f,!b):AmCharts.formatNumber(a,f,f.precision));this.duration&&(b=AmCharts.formatDuration(a,this.duration,"",this.durationUnits,this.maxInterval,f));this.recalculateToPercents?b+="%":(f=this.unit)&&(b="left"==this.unitPosition?f+b:b+f);this.labelFunction&&(b=this.labelFunction(a,b,this).toString());return b},getMinorGridStep:function(a,
b){var c=[5,4,2];60>b&&c.shift();for(var d=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),e=0;e<c.length;e++){var f=a/c[e],g=Math.floor(Math.log(Math.abs(f))*Math.LOG10E);if(!(0<Math.abs(d-g)))if(1>a){if(g=Math.pow(10,-g)*f,g==Math.round(g))return f}else if(f==Math.round(f))return f}},stackGraphs:function(a){var b=this.stackType;"stacked"==b&&(b="regular");"line"==b&&(b="none");"100% stacked"==b&&(b="100%");this.stackType=b;var c=[],d=[],e=[],f=[],g,h=this.chart.graphs,k,l,m,n,p=this.baseValue,r=!1;
if("line"==a||"step"==a||"smoothedLine"==a)r=!0;if(r&&("regular"==b||"100%"==b))for(n=0;n<h.length;n++)m=h[n],m.hidden||(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable&&(k&&(m.stackGraph=k),k=m));for(k=this.start;k<=this.end;k++){var q=0;for(n=0;n<h.length;n++)if(m=h[n],m.hidden)m.newStack&&(e[k]=NaN,d[k]=NaN);else if(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable)if(l=this.data[k].axes[this.id].graphs[m.id],g=l.values.value,isNaN(g))m.newStack&&(e[k]=NaN,d[k]=
NaN);else{var t=AmCharts.getDecimals(g);q<t&&(q=t);isNaN(f[k])?f[k]=Math.abs(g):f[k]+=Math.abs(g);f[k]=AmCharts.roundTo(f[k],q);t=m.fillToGraph;r&&t&&(t=this.data[k].axes[this.id].graphs[t.id])&&(l.values.open=t.values.value);"regular"==b&&(r&&(isNaN(c[k])?(c[k]=g,l.values.close=g,l.values.open=this.baseValue):(isNaN(g)?l.values.close=c[k]:l.values.close=g+c[k],l.values.open=c[k],c[k]=l.values.close)),"column"==a&&(m.newStack&&(e[k]=NaN,d[k]=NaN),l.values.close=g,0>g?(l.values.close=g,isNaN(d[k])?
l.values.open=p:(l.values.close+=d[k],l.values.open=d[k]),d[k]=l.values.close):(l.values.close=g,isNaN(e[k])?l.values.open=p:(l.values.close+=e[k],l.values.open=e[k]),e[k]=l.values.close)))}}for(k=this.start;k<=this.end;k++)for(n=0;n<h.length;n++)(m=h[n],m.hidden)?m.newStack&&(e[k]=NaN,d[k]=NaN):(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable&&(l=this.data[k].axes[this.id].graphs[m.id],g=l.values.value,isNaN(g)||(c=g/f[k]*100,l.values.percents=c,l.values.total=f[k],m.newStack&&
(e[k]=NaN,d[k]=NaN),"100%"==b&&(isNaN(d[k])&&(d[k]=0),isNaN(e[k])&&(e[k]=0),0>c?(l.values.close=AmCharts.fitToBounds(c+d[k],-100,100),l.values.open=d[k],d[k]=l.values.close):(l.values.close=AmCharts.fitToBounds(c+e[k],-100,100),l.values.open=e[k],e[k]=l.values.close)))))},recalculate:function(){var a=this.chart,b=a.graphs,c;for(c=0;c<b.length;c++){var d=b[c];if(d.valueAxis==this){var e="value";if("candlestick"==d.type||"ohlc"==d.type)e="open";var f,g,h=this.end+2,h=AmCharts.fitToBounds(this.end+1,
0,this.data.length-1),k=this.start;0<k&&k--;var l;g=this.start;d.compareFromStart&&(g=0);if(!isNaN(a.startTime)&&(l=a.categoryAxis)){var m=l.minDuration(),m=new Date(a.startTime+m/2),n=AmCharts.resetDateToMin(new Date(a.startTime),l.minPeriod).getTime();AmCharts.resetDateToMin(new Date(m),l.minPeriod).getTime()>n&&g++}if(l=a.recalculateFromDate)a.dataDateFormat&&(l=AmCharts.stringToDate(l,a.dataDateFormat)),g=a.getClosestIndex(a.chartData,"time",l.getTime(),!0,0,a.chartData.length),h=a.chartData.length-
1;for(l=g;l<=h&&(g=this.data[l].axes[this.id].graphs[d.id],f=g.values[e],isNaN(f));l++);this.recBaseValue=f;for(e=k;e<=h;e++){g=this.data[e].axes[this.id].graphs[d.id];g.percents={};var k=g.values,p;for(p in k)g.percents[p]="percents"!=p?k[p]/f*100-100:k[p]}}}},getMinMax:function(){var a=!1,b=this.chart,c=b.graphs,d;for(d=0;d<c.length;d++){var e=c[d].type;("line"==e||"step"==e||"smoothedLine"==e)&&this.expandMinMax&&(a=!0)}a&&(0<this.start&&this.start--,this.end<this.data.length-1&&this.end++);"serial"==
b.type&&(!0!==b.categoryAxis.parseDates||a||this.end<this.data.length-1&&this.end++);a=this.minMaxMultiplier;this.min=this.getMin(this.start,this.end);this.max=this.getMax();a=(this.max-this.min)*(a-1);this.min-=a;this.max+=a;a=this.guides.length;if(this.includeGuidesInMinMax&&0<a)for(b=0;b<a;b++)c=this.guides[b],c.toValue<this.min&&(this.min=c.toValue),c.value<this.min&&(this.min=c.value),c.toValue>this.max&&(this.max=c.toValue),c.value>this.max&&(this.max=c.value);isNaN(this.minimum)||(this.min=
this.minimum);isNaN(this.maximum)||(this.max=this.maximum);this.min>this.max&&(a=this.max,this.max=this.min,this.min=a);isNaN(this.minTemp)||(this.min=this.minTemp);isNaN(this.maxTemp)||(this.max=this.maxTemp);this.minReal=this.min;this.maxReal=this.max;0===this.min&&0===this.max&&(this.max=9);this.min>this.max&&(this.min=this.max-1);a=this.min;b=this.max;c=this.max-this.min;d=0===c?Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10:Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/
10;isNaN(this.maximum)&&isNaN(this.maxTemp)&&(this.max=Math.ceil(this.max/d)*d+d);isNaN(this.minimum)&&isNaN(this.minTemp)&&(this.min=Math.floor(this.min/d)*d-d);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);"100%"==this.stackType&&(this.min=0>this.min?-100:0,this.max=0>this.max?0:100);c=this.max-this.min;d=Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;this.step=Math.ceil(c/this.gridCountR/d)*d;c=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));c=
AmCharts.fixStepE(c);d=Math.ceil(this.step/c);5<d&&(d=10);5>=d&&2<d&&(d=5);this.step=Math.ceil(this.step/(c*d))*c*d;1>c?(this.maxDecCount=Math.abs(Math.log(Math.abs(c))*Math.LOG10E),this.maxDecCount=Math.round(this.maxDecCount),this.step=AmCharts.roundTo(this.step,this.maxDecCount+1)):this.maxDecCount=0;this.min=this.step*Math.floor(this.min/this.step);this.max=this.step*Math.ceil(this.max/this.step);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);1<this.minReal&&1<this.max-this.minReal&&
(this.minReal=Math.floor(this.minReal));c=Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E));0===this.min&&(this.minReal=c);0===this.min&&1<this.minReal&&(this.minReal=1);0<this.min&&0<this.minReal-this.step&&(this.minReal=this.min+this.step<this.minReal?this.min+this.step:this.min);c=Math.log(b)*Math.LOG10E-Math.log(a)*Math.LOG10E;this.logarithmic&&(2<c?(this.minReal=this.min=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E)),this.max=Math.pow(10,Math.ceil(Math.log(Math.abs(b))*
Math.LOG10E))):(b=Math.pow(10,Math.floor(Math.log(Math.abs(this.min))*Math.LOG10E))/10,a=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E))/10,b<a&&(this.minReal=this.min=10*a)))},getMin:function(a,b){var c,d;for(d=a;d<=b;d++){var e=this.data[d].axes[this.id].graphs,f;for(f in e)if(e.hasOwnProperty(f)){var g=this.chart.getGraphById(f);if(g.includeInMinMax&&(!g.hidden||this.includeHidden)){isNaN(c)&&(c=Infinity);this.foundGraphs=!0;g=e[f].values;this.recalculateToPercents&&(g=e[f].percents);
var h;if(this.minMaxField)h=g[this.minMaxField],h<c&&(c=h);else for(var k in g)g.hasOwnProperty(k)&&"percents"!=k&&"total"!=k&&(h=g[k],h<c&&(c=h))}}}return c},getMax:function(){var a,b;for(b=this.start;b<=this.end;b++){var c=this.data[b].axes[this.id].graphs,d;for(d in c)if(c.hasOwnProperty(d)){var e=this.chart.getGraphById(d);if(e.includeInMinMax&&(!e.hidden||this.includeHidden)){isNaN(a)&&(a=-Infinity);this.foundGraphs=!0;e=c[d].values;this.recalculateToPercents&&(e=c[d].percents);var f;if(this.minMaxField)f=
e[this.minMaxField],f>a&&(a=f);else for(var g in e)e.hasOwnProperty(g)&&"percents"!=g&&"total"!=g&&(f=e[g],f>a&&(a=f))}}}return a},dispatchZoomEvent:function(a,b){var c={type:"axisZoomed",startValue:a,endValue:b,target:this,chart:this.chart};this.fire(c.type,c)},zoomToValues:function(a,b){if(b<a){var c=b;b=a;a=c}a<this.min&&(a=this.min);b>this.max&&(b=this.max);c={type:"axisSelfZoomed"};c.chart=this.chart;c.valueAxis=this;c.multiplier=this.axisWidth/Math.abs(this.getCoordinate(b)-this.getCoordinate(a));
c.position="V"==this.orientation?this.reversed?this.getCoordinate(a):this.getCoordinate(b):this.reversed?this.getCoordinate(b):this.getCoordinate(a);this.fire(c.type,c)},coordinateToValue:function(a){if(isNaN(a))return NaN;var b=this.axisWidth,c=this.stepWidth,d=this.reversed,e=this.rotate,f=this.min,g=this.minReal;return!0===this.logarithmic?Math.pow(10,(e?!0===d?(b-a)/c:a/c:!0===d?a/c:(b-a)/c)+Math.log(g)*Math.LOG10E):!0===d?e?f-(a-b)/c:a/c+f:e?a/c+f:f-(a-b)/c},getCoordinate:function(a){if(isNaN(a))return NaN;
var b=this.rotate,c=this.reversed,d=this.axisWidth,e=this.stepWidth,f=this.min,g=this.minReal;!0===this.logarithmic?(0==a&&(a=this.treatZeroAs),a=Math.log(a)*Math.LOG10E-Math.log(g)*Math.LOG10E,b=b?!0===c?d-e*a:e*a:!0===c?e*a:d-e*a):b=!0===c?b?d-e*(a-f):e*(a-f):b?e*(a-f):d-e*(a-f);b=this.rotate?b+(this.x-this.viX):b+(this.y-this.viY);1E7<Math.abs(b)&&(b=1E7*(b/Math.abs(b)));return Math.round(b)},synchronizeWithAxis:function(a){this.synchronizeWith=a;this.listenTo(this.synchronizeWith,"axisChanged",
this.handleSynchronization)},handleSynchronization:function(a){var b=this.synchronizeWith;a=b.min;var c=b.max,b=b.step,d=this.synchronizationMultiplier;d&&(this.min=a*d,this.max=c*d,this.step=b*d,a=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E)),a=Math.abs(Math.log(Math.abs(a))*Math.LOG10E),this.maxDecCount=a=Math.round(a),this.draw())}});AmCharts.RecAxis=AmCharts.Class({construct:function(a){var b=a.chart,c=a.axisThickness,d=a.axisColor,e=a.axisAlpha,f=a.offset,g=a.dx,h=a.dy,k=a.viX,l=a.viY,m=a.viH,n=a.viW,p=b.container;"H"==a.orientation?(d=AmCharts.line(p,[0,n],[0,0],d,e,c),this.axisWidth=a.width,"bottom"==a.position?(h=c/2+f+m+l-1,c=k):(h=-c/2-f+l+h,c=g+k)):(this.axisWidth=a.height,"right"==a.position?(d=AmCharts.line(p,[0,0,-g],[0,m,m-h],d,e,c),h=l+h,c=c/2+f+g+n+k-1):(d=AmCharts.line(p,[0,0],[0,m],d,e,c),h=l,c=-c/2-f+k));d.translate(c,
h);c=b.container.set();c.push(d);b.axesSet.push(c);AmCharts.setCN(b,d,a.bcn+"line");this.axisSet=c;this.set=d}});AmCharts.RecItem=AmCharts.Class({construct:function(a,b,c,d,e,f,g,h,k,l,m,n){b=Math.round(b);var p=a.chart;this.value=c;void 0==c&&(c="");k||(k=0);void 0==d&&(d=!0);var r=p.fontFamily,q=a.fontSize;void 0==q&&(q=p.fontSize);var t=a.color;void 0==t&&(t=p.color);void 0!==m&&(t=m);var z=a.chart.container,x=z.set();this.set=x;var u=a.axisThickness,w=a.axisColor,y=a.axisAlpha,A=a.tickLength,C=a.gridAlpha,B=a.gridThickness,H=a.gridColor,D=a.dashLength,I=a.fillColor,X=a.fillAlpha,ca=a.labelsEnabled;m=a.labelRotation;
var oa=a.counter,S=a.inside,ma=a.labelOffset,pa=a.dx,ia=a.dy,Oa=a.orientation,Z=a.position,Y=a.previousCoord,T=a.viH,ra=a.viW,aa=a.offset,ba,sa;g?(void 0!=g.id&&(n=p.classNamePrefix+"-guide-"+g.id),ca=!0,isNaN(g.tickLength)||(A=g.tickLength),void 0!=g.lineColor&&(H=g.lineColor),void 0!=g.color&&(t=g.color),isNaN(g.lineAlpha)||(C=g.lineAlpha),isNaN(g.dashLength)||(D=g.dashLength),isNaN(g.lineThickness)||(B=g.lineThickness),!0===g.inside&&(S=!0),isNaN(g.labelRotation)||(m=g.labelRotation),isNaN(g.fontSize)||
(q=g.fontSize),g.position&&(Z=g.position),void 0!==g.boldLabel&&(h=g.boldLabel),isNaN(g.labelOffset)||(ma=g.labelOffset)):""===c&&(A=0);var ha="start";e&&(ha="middle");var O=m*Math.PI/180,U,va,G=0,v=0,ja=0,da=U=0,Pa=0;"V"==Oa&&(m=0);var W;ca&&(W=a.autoWrap&&0===m?AmCharts.wrappedText(z,c,t,r,q,ha,h,e,0):AmCharts.text(z,c,t,r,q,ha,h),ha=W.getBBox(),da=ha.width,Pa=ha.height);if("H"==Oa){if(0<=b&&b<=ra+1&&(0<A&&0<y&&b+k<=ra+1&&(ba=AmCharts.line(z,[b+k,b+k],[0,A],w,y,B),x.push(ba)),0<C&&(sa=AmCharts.line(z,
[b,b+pa,b+pa],[T,T+ia,ia],H,C,B,D),x.push(sa))),v=0,G=b,g&&90==m&&S&&(G-=q),!1===d?(ha="start",v="bottom"==Z?S?v+A:v-A:S?v-A:v+A,G+=3,e&&(G+=e/2-3,ha="middle"),0<m&&(ha="middle")):ha="middle",1==oa&&0<X&&!g&&!l&&Y<ra&&(d=AmCharts.fitToBounds(b,0,ra),Y=AmCharts.fitToBounds(Y,0,ra),U=d-Y,0<U&&(va=AmCharts.rect(z,U,a.height,I,X),va.translate(d-U+pa,ia),x.push(va))),"bottom"==Z?(v+=T+q/2+aa,S?(0<m?(v=T-da/2*Math.sin(O)-A-3,G+=da/2*Math.cos(O)-4+2):0>m?(v=T+da*Math.sin(O)-A-3+2,G+=-da*Math.cos(O)-Pa*Math.sin(O)-
4):v-=A+q+3+3,v-=ma):(0<m?(v=T+da/2*Math.sin(O)+A+3,G-=da/2*Math.cos(O)):0>m?(v=T+A+3-da/2*Math.sin(O)+2,G+=da/2*Math.cos(O)):v+=A+u+3+3,v+=ma)):(v+=ia+q/2-aa,G+=pa,S?(0<m?(v=da/2*Math.sin(O)+A+3,G-=da/2*Math.cos(O)):v+=A+3,v+=ma):(0<m?(v=-(da/2)*Math.sin(O)-A-6,G+=da/2*Math.cos(O)):v-=A+q+3+u+3,v-=ma)),"bottom"==Z?U=(S?T-A-1:T+u-1)+aa:(ja=pa,U=(S?ia:ia-A-u+1)-aa),f&&(G+=f),f=G,0<m&&(f+=da/2*Math.cos(O)),W&&(q=0,S&&(q=da/2*Math.cos(O)),f+q>ra+2||0>f))W.remove(),W=null}else{0<=b&&b<=T+1&&(0<A&&0<y&&
b+k<=T+1&&(ba=AmCharts.line(z,[0,A],[b+k,b+k],w,y,B),x.push(ba)),0<C&&(sa=AmCharts.line(z,[0,pa,ra+pa],[b,b+ia,b+ia],H,C,B,D),x.push(sa)));ha="end";if(!0===S&&"left"==Z||!1===S&&"right"==Z)ha="start";v=b-q/2;1==oa&&0<X&&!g&&!l&&(d=AmCharts.fitToBounds(b,0,T),Y=AmCharts.fitToBounds(Y,0,T),O=d-Y,va=AmCharts.polygon(z,[0,a.width,a.width,0],[0,0,O,O],I,X),va.translate(pa,d-O+ia),x.push(va));v+=q/2;"right"==Z?(G+=pa+ra+aa,v+=ia,S?(f||(v-=q/2+3),G=G-(A+4)-ma):(G+=A+4+u,v-=2,G+=ma)):S?(G+=A+4-aa,f||(v-=
q/2+3),g&&(G+=pa,v+=ia),G+=ma):(G+=-A-u-4-2-aa,v-=2,G-=ma);ba&&("right"==Z?(ja+=pa+aa+ra,U+=ia,ja=S?ja-u:ja+u):(ja-=aa,S||(ja-=A+u)));f&&(v+=f);S=-3;"right"==Z&&(S+=ia);W&&(v>T+1||v<S)&&(W.remove(),W=null)}ba&&(ba.translate(ja,U),AmCharts.setCN(p,ba,a.bcn+"tick"),AmCharts.setCN(p,ba,n,!0),g&&AmCharts.setCN(p,ba,"guide"));!1===a.visible&&(ba&&ba.remove(),W&&(W.remove(),W=null));W&&(W.attr({"text-anchor":ha}),W.translate(G,v),0!==m&&W.rotate(-m,a.chart.backgroundColor),a.allLabels.push(W),this.label=
W,AmCharts.setCN(p,W,a.bcn+"label"),AmCharts.setCN(p,W,n,!0),g&&AmCharts.setCN(p,W,"guide"));sa&&(AmCharts.setCN(p,sa,a.bcn+"grid"),AmCharts.setCN(p,sa,n,!0),g&&AmCharts.setCN(p,sa,"guide"));va&&(AmCharts.setCN(p,va,a.bcn+"fill"),AmCharts.setCN(p,va,n,!0));l?sa&&AmCharts.setCN(p,sa,a.bcn+"grid-minor"):(a.counter=0===oa?1:0,a.previousCoord=b);0===this.set.node.childNodes.length&&this.set.remove()},graphics:function(){return this.set},getLabel:function(){return this.label}});AmCharts.RecFill=AmCharts.Class({construct:function(a,b,c,d){var e=a.dx,f=a.dy,g=a.orientation,h=0;if(c<b){var k=b;b=c;c=k}var l=d.fillAlpha;isNaN(l)&&(l=0);var k=a.chart.container,m=d.fillColor;"V"==g?(b=AmCharts.fitToBounds(b,0,a.viH),c=AmCharts.fitToBounds(c,0,a.viH)):(b=AmCharts.fitToBounds(b,0,a.viW),c=AmCharts.fitToBounds(c,0,a.viW));c-=b;isNaN(c)&&(c=4,h=2,l=0);0>c&&"object"==typeof m&&(m=m.join(",").split(",").reverse());"V"==g?(g=AmCharts.rect(k,a.viW,c,m,l),g.translate(e,b-h+f)):(g=AmCharts.rect(k,
c,a.viH,m,l),g.translate(b-h+e,f));AmCharts.setCN(a.chart,g,"guide-fill");d.id&&AmCharts.setCN(a.chart,g,"guide-fill-"+d.id);this.set=k.set([g])},graphics:function(){return this.set},getLabel:function(){}});AmCharts.AmChart=AmCharts.Class({construct:function(a){this.theme=a;this.classNamePrefix="amcharts";this.addClassNames=!1;this.version="3.13.0";AmCharts.addChart(this);this.createEvents("dataUpdated","init","rendered","drawn","failed","resized");this.height=this.width="100%";this.dataChanged=!0;this.chartCreated=!1;this.previousWidth=this.previousHeight=0;this.backgroundColor="#FFFFFF";this.borderAlpha=this.backgroundAlpha=0;this.color=this.borderColor="#000000";this.fontFamily="Verdana";this.fontSize=
11;this.usePrefixes=!1;this.precision=-1;this.percentPrecision=2;this.decimalSeparator=".";this.thousandsSeparator=",";this.labels=[];this.allLabels=[];this.titles=[];this.marginRight=this.marginLeft=this.autoMarginOffset=0;this.timeOuts=[];this.creditsPosition="top-left";var b=document.createElement("div"),c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.chartDiv=b;b=document.createElement("div");c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.legendDiv=
b;this.titleHeight=0;this.hideBalloonTime=150;this.handDrawScatter=2;this.handDrawThickness=1;this.prefixesOfBigNumbers=[{number:1E3,prefix:"k"},{number:1E6,prefix:"M"},{number:1E9,prefix:"G"},{number:1E12,prefix:"T"},{number:1E15,prefix:"P"},{number:1E18,prefix:"E"},{number:1E21,prefix:"Z"},{number:1E24,prefix:"Y"}];this.prefixesOfSmallNumbers=[{number:1E-24,prefix:"y"},{number:1E-21,prefix:"z"},{number:1E-18,prefix:"a"},{number:1E-15,prefix:"f"},{number:1E-12,prefix:"p"},{number:1E-9,prefix:"n"},
{number:1E-6,prefix:"\u03bc"},{number:.001,prefix:"m"}];this.panEventsEnabled=!0;AmCharts.bezierX=3;AmCharts.bezierY=6;this.product="amcharts";this.animations=[];this.balloon=new AmCharts.AmBalloon(this.theme);this.balloon.chart=this;AmCharts.applyTheme(this,a,"AmChart")},drawChart:function(){this.drawBackground();this.redrawLabels();this.drawTitles();this.brr()},drawBackground:function(){AmCharts.remove(this.background);var a=this.container,b=this.backgroundColor,c=this.backgroundAlpha,d=this.set;
AmCharts.isModern||0!==c||(c=.001);var e=this.updateWidth();this.realWidth=e;var f=this.updateHeight();this.realHeight=f;b=AmCharts.polygon(a,[0,e-1,e-1,0],[0,0,f-1,f-1],b,c,1,this.borderColor,this.borderAlpha);AmCharts.setCN(this,b,"bg");this.background=b;d.push(b);if(b=this.backgroundImage)this.path&&(b=this.path+b),a=a.image(b,0,0,e,f),AmCharts.setCN(this,b,"bg-image"),this.bgImg=a,d.push(a)},drawTitles:function(){var a=this.titles;if(AmCharts.ifArray(a)){var b=20,c;for(c=0;c<a.length;c++){var d=
a[c];if(!1!==d.enabled){var e=d.color;void 0===e&&(e=this.color);var f=d.size;isNaN(f)&&(f=this.fontSize+2);isNaN(d.alpha);var g=this.marginLeft,e=AmCharts.text(this.container,d.text,e,this.fontFamily,f);e.translate(g+(this.realWidth-this.marginRight-g)/2,b);e.node.style.pointerEvents="none";AmCharts.setCN(this,e,"title");d.id&&AmCharts.setCN(this,e,"title-"+d.id);g=!0;void 0!==d.bold&&(g=d.bold);g&&e.attr({"font-weight":"bold"});e.attr({opacity:d.alpha});b+=f+6;this.freeLabelsSet.push(e)}}}},write:function(a){if(a=
"object"!=typeof a?document.getElementById(a):a){for(;a.firstChild;)a.removeChild(a.firstChild);this.div=a;a.style.overflow="hidden";a.style.textAlign="left";var b=this.chartDiv,c=this.legendDiv,d=this.legend,e=c.style,f=b.style;this.measure();var g,h=document.createElement("div");g=h.style;g.position="relative";this.containerDiv=h;h.className=this.classNamePrefix+"-main-div";b.className=this.classNamePrefix+"-chart-div";a.appendChild(h);var k=this.exportConfig;k&&AmCharts.AmExport&&!this.AmExport&&
(this.AmExport=new AmCharts.AmExport(this,k));this.amExport&&AmCharts.AmExport&&(this.AmExport=AmCharts.extend(this.amExport,new AmCharts.AmExport(this),!0));this.AmExport&&this.AmExport.init&&this.AmExport.init();if(d)if(d=this.addLegend(d,d.divId),d.enabled)switch(d.position){case "bottom":h.appendChild(b);h.appendChild(c);break;case "top":h.appendChild(c);h.appendChild(b);break;case "absolute":g.width=a.style.width;g.height=a.style.height;e.position="absolute";f.position="absolute";void 0!==d.left&&
(e.left=d.left+"px");void 0!==d.right&&(e.right=d.right+"px");void 0!==d.top&&(e.top=d.top+"px");void 0!==d.bottom&&(e.bottom=d.bottom+"px");d.marginLeft=0;d.marginRight=0;h.appendChild(b);h.appendChild(c);break;case "right":g.width=a.style.width;g.height=a.style.height;e.position="relative";f.position="absolute";h.appendChild(b);h.appendChild(c);break;case "left":g.width=a.style.width;g.height=a.style.height;e.position="absolute";f.position="relative";h.appendChild(b);h.appendChild(c);break;case "outside":h.appendChild(b)}else h.appendChild(b);
else h.appendChild(b);this.listenersAdded||(this.addListeners(),this.listenersAdded=!0);this.initChart()}},createLabelsSet:function(){AmCharts.remove(this.labelsSet);this.labelsSet=this.container.set();this.freeLabelsSet.push(this.labelsSet)},initChart:function(){this.initHC||(AmCharts.callInitHandler(this),this.initHC=!0);this.renderFix();AmCharts.applyLang(this.language,this);var a=this.numberFormatter;a&&(isNaN(a.precision)||(this.precision=a.precision),void 0!==a.thousandsSeparator&&(this.thousandsSeparator=
a.thousandsSeparator),void 0!==a.decimalSeparator&&(this.decimalSeparator=a.decimalSeparator));(a=this.percentFormatter)&&!isNaN(a.precision)&&(this.percentPrecision=a.precision);this.nf={precision:this.precision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.pf={precision:this.percentPrecision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.divIsFixed=AmCharts.findIfFixed(this.chartDiv);this.previousHeight=this.divRealHeight;
this.previousWidth=this.divRealWidth;this.destroy();this.startInterval();a=0;document.attachEvent&&!window.opera&&(a=1);this.dmouseX=this.dmouseY=0;var b=document.getElementsByTagName("html")[0];b&&window.getComputedStyle&&(b=window.getComputedStyle(b,null))&&(this.dmouseY=AmCharts.removePx(b.getPropertyValue("margin-top")),this.dmouseX=AmCharts.removePx(b.getPropertyValue("margin-left")));this.mouseMode=a;(a=this.container)?(a.container.innerHTML="",a.width=this.realWidth,a.height=this.realHeight,
a.addDefs(this),this.chartDiv.appendChild(a.container)):a=new AmCharts.AmDraw(this.chartDiv,this.realWidth,this.realHeight,this);a.chart=this;AmCharts.VML||AmCharts.SVG?(a.handDrawn=this.handDrawn,a.handDrawScatter=this.handDrawScatter,a.handDrawThickness=this.handDrawThickness,this.container=a,this.set&&this.set.remove(),this.set=a.set(),this.gridSet&&this.gridSet.remove(),this.gridSet=a.set(),this.cursorLineSet&&this.cursorLineSet.remove(),this.cursorLineSet=a.set(),this.graphsBehindSet&&this.graphsBehindSet.remove(),
this.graphsBehindSet=a.set(),this.bulletBehindSet&&this.bulletBehindSet.remove(),this.bulletBehindSet=a.set(),this.columnSet&&this.columnSet.remove(),this.columnSet=a.set(),this.graphsSet&&this.graphsSet.remove(),this.graphsSet=a.set(),this.trendLinesSet&&this.trendLinesSet.remove(),this.trendLinesSet=a.set(),this.axesSet&&this.axesSet.remove(),this.axesSet=a.set(),this.cursorSet&&this.cursorSet.remove(),this.cursorSet=a.set(),this.scrollbarsSet&&this.scrollbarsSet.remove(),this.scrollbarsSet=a.set(),
this.bulletSet&&this.bulletSet.remove(),this.bulletSet=a.set(),this.freeLabelsSet&&this.freeLabelsSet.remove(),this.axesLabelsSet&&this.axesLabelsSet.remove(),this.axesLabelsSet=a.set(),this.freeLabelsSet=a.set(),this.balloonsSet&&this.balloonsSet.remove(),this.balloonsSet=a.set(),this.zoomButtonSet&&this.zoomButtonSet.remove(),this.zoomButtonSet=a.set(),this.linkSet&&this.linkSet.remove(),this.linkSet=a.set()):this.fire("failed",{type:"failed",chart:this})},measure:function(){var a=this.div;if(a){var b=
this.chartDiv,c=a.offsetWidth,d=a.offsetHeight,e=this.container;a.clientHeight&&(c=a.clientWidth,d=a.clientHeight);var f=AmCharts.removePx(AmCharts.getStyle(a,"padding-left")),g=AmCharts.removePx(AmCharts.getStyle(a,"padding-right")),h=AmCharts.removePx(AmCharts.getStyle(a,"padding-top")),k=AmCharts.removePx(AmCharts.getStyle(a,"padding-bottom"));isNaN(f)||(c-=f);isNaN(g)||(c-=g);isNaN(h)||(d-=h);isNaN(k)||(d-=k);f=a.style;a=f.width;f=f.height;-1!=a.indexOf("px")&&(c=AmCharts.removePx(a));-1!=f.indexOf("px")&&
(d=AmCharts.removePx(f));a=AmCharts.toCoordinate(this.width,c);f=AmCharts.toCoordinate(this.height,d);this.balloon=AmCharts.processObject(this.balloon,AmCharts.AmBalloon,this.theme);this.balloon.chart=this;(a!=this.previousWidth||f!=this.previousHeight)&&0<a&&0<f&&(b.style.width=a+"px",b.style.height=f+"px",e&&e.setSize(a,f));this.balloon.setBounds(2,2,a-2,f);this.realWidth=a;this.realHeight=f;this.divRealWidth=c;this.divRealHeight=d}},destroy:function(){this.chartDiv.innerHTML="";this.clearTimeOuts();
this.interval&&clearInterval(this.interval);this.interval=NaN},clearTimeOuts:function(){var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},clear:function(a){AmCharts.callMethod("clear",[this.chartScrollbar,this.scrollbarV,this.scrollbarH,this.chartCursor]);this.chartCursor=this.scrollbarH=this.scrollbarV=this.chartScrollbar=null;this.clearTimeOuts();this.interval&&clearInterval(this.interval);this.container&&(this.container.remove(this.chartDiv),this.container.remove(this.legendDiv));
a||AmCharts.removeChart(this)},setMouseCursor:function(a){"auto"==a&&AmCharts.isNN&&(a="default");this.chartDiv.style.cursor=a;this.legendDiv.style.cursor=a},redrawLabels:function(){this.labels=[];var a=this.allLabels;this.createLabelsSet();var b;for(b=0;b<a.length;b++)this.drawLabel(a[b])},drawLabel:function(a){if(this.container&&!1!==a.enabled){var b=a.y,c=a.text,d=a.align,e=a.size,f=a.color,g=a.rotation,h=a.alpha,k=a.bold,l=AmCharts.toCoordinate(a.x,this.realWidth),b=AmCharts.toCoordinate(b,this.realHeight);
l||(l=0);b||(b=0);void 0===f&&(f=this.color);isNaN(e)&&(e=this.fontSize);d||(d="start");"left"==d&&(d="start");"right"==d&&(d="end");"center"==d&&(d="middle",g?b=this.realHeight-b+b/2:l=this.realWidth/2-l);void 0===h&&(h=1);void 0===g&&(g=0);b+=e/2;c=AmCharts.text(this.container,c,f,this.fontFamily,e,d,k,h);c.translate(l,b);AmCharts.setCN(this,c,"label");a.id&&AmCharts.setCN(this,c,"label-"+a.id);0!==g&&c.rotate(g);a.url?(c.setAttr("cursor","pointer"),c.click(function(){AmCharts.getURL(a.url)})):
c.node.style.pointerEvents="none";this.labelsSet.push(c);this.labels.push(c)}},addLabel:function(a,b,c,d,e,f,g,h,k,l){a={x:a,y:b,text:c,align:d,size:e,color:f,alpha:h,rotation:g,bold:k,url:l,enabled:!0};this.container&&this.drawLabel(a);this.allLabels.push(a)},clearLabels:function(){var a=this.labels,b;for(b=a.length-1;0<=b;b--)a[b].remove();this.labels=[];this.allLabels=[]},updateHeight:function(){var a=this.divRealHeight,b=this.legend;if(b){var c=this.legendDiv.offsetHeight,b=b.position;if("top"==
b||"bottom"==b){a-=c;if(0>a||isNaN(a))a=0;this.chartDiv.style.height=a+"px"}}return a},updateWidth:function(){var a=this.divRealWidth,b=this.divRealHeight,c=this.legend;if(c){var d=this.legendDiv,e=d.offsetWidth;isNaN(c.width)||(e=c.width);var f=d.offsetHeight,d=d.style,g=this.chartDiv.style,c=c.position;if("right"==c||"left"==c){a-=e;if(0>a||isNaN(a))a=0;g.width=a+"px";"left"==c?(g.left=e+"px",d.left="0px"):(g.left="0px",d.left=a+"px");b>f&&(d.top=(b-f)/2+"px")}}return a},getTitleHeight:function(){var a=
0,b=this.titles,c=!0;if(0<b.length){var a=15,d;for(d=0;d<b.length;d++){var e=b[d];!1!==e.enabled&&(c=!1,e=e.size,isNaN(e)&&(e=this.fontSize+2),a+=e+6)}c&&(a=0)}return a},addTitle:function(a,b,c,d,e){isNaN(b)&&(b=this.fontSize+2);a={text:a,size:b,color:c,alpha:d,bold:e,enabled:!0};this.titles.push(a);return a},handleWheel:function(a){var b=0;a||(a=window.event);a.wheelDelta?b=a.wheelDelta/120:a.detail&&(b=-a.detail/3);b&&this.handleWheelReal(b,a.shiftKey);a.preventDefault&&a.preventDefault()},handleWheelReal:function(a){},
addListeners:function(){var a=this,b=a.chartDiv;document.addEventListener?(a.panEventsEnabled&&(b.style.msTouchAction="none"),"ontouchstart"in document.documentElement&&(b.addEventListener("touchstart",function(b){a.handleTouchMove.call(a,b);a.handleTouchStart.call(a,b)},!0),b.addEventListener("touchmove",function(b){a.handleTouchMove.call(a,b)},!0),b.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)},!0)),b.addEventListener("mousedown",function(b){a.mouseIsOver=!0;a.handleMouseMove.call(a,
b);a.handleMouseDown.call(a,b)},!0),b.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,b)},!0),b.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,b)},!0)):(b.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)}),b.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)}),b.attachEvent("onmouseout",function(b){a.handleMouseOut.call(a,b)}))},dispDUpd:function(){if(!this.skipEvents){var a;this.dispatchDataUpdated&&(this.dispatchDataUpdated=!1,a=
"dataUpdated",this.fire(a,{type:a,chart:this}));this.chartCreated||(a="init",this.fire(a,{type:a,chart:this}));this.chartRendered||(a="rendered",this.fire(a,{type:a,chart:this}),this.chartRendered=!0);a="drawn";this.fire(a,{type:a,chart:this})}this.skipEvents=!1},validateSize:function(){var a=this;a.measure();var b=a.legend;if(a.realWidth!=a.previousWidth||a.realHeight!=a.previousHeight){if(0<a.realWidth&&0<a.realHeight){a.sizeChanged=!0;if(b){clearTimeout(a.legendInitTO);var c=setTimeout(function(){b.invalidateSize()},
100);a.timeOuts.push(c);a.legendInitTO=c}"xy"!=a.type?a.marginsUpdated=!1:(a.marginsUpdated=!0,a.selfZoom=!0);clearTimeout(a.initTO);c=setTimeout(function(){a.initChart()},150);a.timeOuts.push(c);a.initTO=c}a.fire("resized",{type:"resized",chart:a})}a.renderFix();b&&b.renderFix()},invalidateSize:function(){this.previousHeight=this.previousWidth=NaN;this.invalidateSizeReal()},invalidateSizeReal:function(){var a=this;a.marginsUpdated=!1;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateSize()},
5);a.timeOuts.push(b);a.validateTO=b},validateData:function(a){this.chartCreated&&(this.dataChanged=!0,this.marginsUpdated="xy"!=this.type?!1:!0,this.initChart(a))},validateNow:function(a,b){this.initTO&&clearTimeout(this.initTO);a&&(this.dataChanged=!0);this.skipEvents=b;this.chartRendered=!1;this.write(this.div)},showItem:function(a){a.hidden=!1;this.initChart()},hideItem:function(a){a.hidden=!0;this.initChart()},hideBalloon:function(){var a=this;clearInterval(a.hoverInt);clearTimeout(a.balloonTO);
a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},a.hideBalloonTime)},cleanChart:function(){},hideBalloonReal:function(){var a=this.balloon;a&&a.hide()},showBalloon:function(a,b,c,d,e){var f=this;clearTimeout(f.balloonTO);clearInterval(f.hoverInt);f.balloonTO=setTimeout(function(){f.showBalloonReal.call(f,a,b,c,d,e)},1)},showBalloonReal:function(a,b,c,d,e){this.handleMouseMove();var f=this.balloon;f.enabled&&(f.followCursor(!1),f.changeColor(b),!c||f.fixedPosition?(f.setPosition(d,e),f.followCursor(!1)):
f.followCursor(!0),a&&f.showBalloon(a))},handleTouchMove:function(a){this.hideBalloon();var b=this.chartDiv;a.touches&&(a=a.touches.item(0),this.mouseX=a.pageX-AmCharts.findPosX(b),this.mouseY=a.pageY-AmCharts.findPosY(b))},handleMouseOver:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!0},handleMouseOut:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!1},handleMouseMove:function(a){if(this.mouseIsOver){var b=this.chartDiv;a||(a=window.event);var c,d;if(a){this.posX=AmCharts.findPosX(b);
this.posY=AmCharts.findPosY(b);switch(this.mouseMode){case 1:c=a.clientX-this.posX;d=a.clientY-this.posY;if(!this.divIsFixed){var b=document.body,e,f;b&&(e=b.scrollLeft,y1=b.scrollTop);if(b=document.documentElement)f=b.scrollLeft,y2=b.scrollTop;e=Math.max(e,f);f=Math.max(y1,y2);c+=e;d+=f}break;case 0:this.divIsFixed?(c=a.clientX-this.posX,d=a.clientY-this.posY):(c=a.pageX-this.posX,d=a.pageY-this.posY)}a.touches&&(a=a.touches.item(0),c=a.pageX-this.posX,d=a.pageY-this.posY);this.mouseX=c-this.dmouseX;
this.mouseY=d-this.dmouseY}}},handleTouchStart:function(a){this.handleMouseDown(a)},handleTouchEnd:function(a){AmCharts.resetMouseOver();this.handleReleaseOutside(a)},handleReleaseOutside:function(a){},handleMouseDown:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!0;a&&a.preventDefault&&(this.panEventsEnabled?a.preventDefault():a.touches||a.preventDefault())},addLegend:function(a,b){a=AmCharts.processObject(a,AmCharts.AmLegend,this.theme);a.divId=b;var c;c="object"!=typeof b&&b?document.getElementById(b):
b;this.legend=a;a.chart=this;c?(a.div=c,a.position="outside",a.autoMargins=!1):a.div=this.legendDiv;c=this.handleLegendEvent;this.listenTo(a,"showItem",c);this.listenTo(a,"hideItem",c);this.listenTo(a,"clickMarker",c);this.listenTo(a,"rollOverItem",c);this.listenTo(a,"rollOutItem",c);this.listenTo(a,"rollOverMarker",c);this.listenTo(a,"rollOutMarker",c);this.listenTo(a,"clickLabel",c);return a},removeLegend:function(){this.legend=void 0;this.legendDiv.innerHTML=""},handleResize:function(){(AmCharts.isPercents(this.width)||
AmCharts.isPercents(this.height))&&this.invalidateSizeReal();this.renderFix()},renderFix:function(){if(!AmCharts.VML){var a=this.container;a&&a.renderFix()}},getSVG:function(){if(AmCharts.hasSVG)return this.container},animate:function(a,b,c,d,e,f,g){a["an_"+b]&&AmCharts.removeFromArray(this.animations,a["an_"+b]);c={obj:a,frame:0,attribute:b,from:c,to:d,time:e,effect:f,suffix:g};a["an_"+b]=c;this.animations.push(c);return c},setLegendData:function(a){var b=this.legend;b&&b.setData(a)},startInterval:function(){var a=
this;clearInterval(a.interval);a.interval=setInterval(function(){a.updateAnimations.call(a)},AmCharts.updateRate)},stopAnim:function(a){AmCharts.removeFromArray(this.animations,a)},updateAnimations:function(){var a;this.container&&this.container.update();for(a=this.animations.length-1;0<=a;a--){var b=this.animations[a],c=1E3*b.time/AmCharts.updateRate,d=b.frame+1,e=b.obj,f=b.attribute;if(d<=c){b.frame++;var g=Number(b.from),h=Number(b.to)-g,c=AmCharts[b.effect](0,d,g,h,c);0===h?(this.animations.splice(a,
1),e.node.style[f]=Number(b.to)+b.suffix):e.node.style[f]=c+b.suffix}else e.node.style[f]=Number(b.to)+b.suffix,this.animations.splice(a,1)}},inIframe:function(){try{return window.self!==window.top}catch(a){return!0}},brr:function(){var a=window.location.hostname.split("."),b;2<=a.length&&(b=a[a.length-2]+"."+a[a.length-1]);this.amLink&&(a=this.amLink.parentNode)&&a.removeChild(this.amLink);a=this.creditsPosition;if("amcharts.com"!=b||!0===this.inIframe()){var c=b=0,d=this.realWidth,e=this.realHeight;
if("serial"==this.type||"xy"==this.type)b=this.marginLeftReal,c=this.marginTopReal,d=b+this.plotAreaWidth,e=c+this.plotAreaHeight;var f="http://www.amcharts.com/javascript-charts/",g="JavaScript charts",h="JS chart by amCharts";"ammap"==this.product&&(f="http://www.ammap.com/javascript-maps/",g="Interactive JavaScript maps",h="JS map by amCharts");var k=document.createElement("a"),h=document.createTextNode(h);k.setAttribute("href",f);k.setAttribute("title",g);k.appendChild(h);this.chartDiv.appendChild(k);
this.amLink=k;f=k.style;f.position="absolute";f.textDecoration="none";f.color=this.color;f.fontFamily=this.fontFamily;f.fontSize=this.fontSize+"px";f.opacity=.7;f.display="block";var g=k.offsetWidth,k=k.offsetHeight,h=5+b,l=c+5;"bottom-left"==a&&(h=5+b,l=e-k-3);"bottom-right"==a&&(h=d-g-5,l=e-k-3);"top-right"==a&&(h=d-g-5,l=c+5);f.left=h+"px";f.top=l+"px"}}});AmCharts.Slice=AmCharts.Class({construct:function(){}});AmCharts.SerialDataItem=AmCharts.Class({construct:function(){}});
AmCharts.GraphDataItem=AmCharts.Class({construct:function(){}});AmCharts.Guide=AmCharts.Class({construct:function(a){this.cname="Guide";AmCharts.applyTheme(this,a,this.cname)}});AmCharts.AmGraph=AmCharts.Class({construct:function(a){this.cname="AmGraph";this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.type="line";this.stackable=!0;this.columnCount=1;this.columnIndex=0;this.centerCustomBullets=this.showBalloon=!0;this.maxBulletSize=50;this.minBulletSize=4;this.balloonText="[[value]]";this.hidden=this.scrollbar=this.animationPlayed=!1;this.pointPosition="middle";
this.depthCount=1;this.includeInMinMax=!0;this.negativeBase=0;this.visibleInLegend=!0;this.showAllValueLabels=!1;this.showBulletsAt=this.showBalloonAt="close";this.lineThickness=1;this.dashLength=0;this.connect=!0;this.lineAlpha=1;this.bullet="none";this.bulletBorderThickness=2;this.bulletBorderAlpha=0;this.bulletAlpha=1;this.bulletSize=8;this.cornerRadiusTop=this.hideBulletsCount=this.bulletOffset=0;this.cursorBulletAlpha=1;this.gradientOrientation="vertical";this.dy=this.dx=0;this.periodValue="";
this.clustered=!0;this.periodSpan=1;this.y=this.x=0;this.switchable=!0;this.tcc=this.minDistance=1;this.labelRotation=0;this.labelAnchor="auto";this.labelOffset=3;this.bcn="graph-";AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this.chart,b=a.type;isNaN(this.precision)||(this.numberFormatter?this.numberFormatter.precision=this.precision:this.numberFormatter={precision:this.precision,decimalSeparator:a.decimalSeparator,thousandsSeparator:a.thousandsSeparator});var c=a.container;this.container=
c;this.destroy();var d=c.set(),e=c.set();this.behindColumns?(a.graphsBehindSet.push(d),a.bulletBehindSet.push(e)):(a.graphsSet.push(d),a.bulletSet.push(e));var f=this.bulletAxis;AmCharts.isString(f)&&(this.bulletAxis=a.getValueAxisById(f));this.bulletSet=e;if(!this.scrollbar){var f=a.marginLeftReal,g=a.marginTopReal;d.translate(f,g);e.translate(f,g)}c=c.set();AmCharts.remove(this.columnsSet);d.push(c);this.set=d;AmCharts.setCN(a,d,"graph-"+this.type);AmCharts.setCN(a,d,"graph-"+this.id);AmCharts.setCN(a,
e,"graph-"+this.type);AmCharts.setCN(a,e,"graph-"+this.id);this.columnsSet=c;this.columnsArray=[];this.ownColumns=[];this.allBullets=[];this.animationArray=[];d=this.labelPosition;d||(e=this.valueAxis.stackType,d="top","column"==this.type&&(a.rotate&&(d="right"),"100%"==e||"regular"==e)&&(d="middle"),this.labelPosition=d);AmCharts.ifArray(this.data)&&(a=!1,"xy"==b?this.xAxis.axisCreated&&this.yAxis.axisCreated&&(a=!0):this.valueAxis.axisCreated&&(a=!0),!this.hidden&&a&&this.createGraph())},createGraph:function(){var a=
this,b=a.chart;a.startAlpha=b.startAlpha;a.seqAn=b.sequencedAnimation;a.baseCoord=a.valueAxis.baseCoord;void 0===a.fillAlphas&&(a.fillAlphas=0);a.bulletColorR=a.bulletColor;void 0===a.bulletColorR&&(a.bulletColorR=a.lineColorR,a.bulletColorNegative=a.negativeLineColor);void 0===a.bulletAlpha&&(a.bulletAlpha=a.lineAlpha);clearTimeout(a.playedTO);if(!isNaN(a.valueAxis.min)&&!isNaN(a.valueAxis.max)){switch(b.type){case "serial":a.categoryAxis&&(a.createSerialGraph(),"candlestick"==a.type&&1>a.valueAxis.minMaxMultiplier&&
a.positiveClip(a.set));break;case "radar":a.createRadarGraph();break;case "xy":a.createXYGraph(),a.positiveClip(a.set)}a.playedTO=setTimeout(function(){a.setAnimationPlayed.call(a)},500*a.chart.startDuration)}},setAnimationPlayed:function(){this.animationPlayed=!0},createXYGraph:function(){var a=[],b=[],c=this.xAxis,d=this.yAxis;this.pmh=d.viH+1;this.pmw=c.viW+1;this.pmy=this.pmx=0;var e;for(e=this.start;e<=this.end;e++){var f=this.data[e].axes[c.id].graphs[this.id],g=f.values,h=g.x,k=g.y,g=c.getCoordinate(h),
l=d.getCoordinate(k);!isNaN(h)&&!isNaN(k)&&(a.push(g),b.push(l),h=this.createBullet(f,g,l,e),k=this.labelText)&&(f=this.createLabel(f,g,l,k),this.positionLabel(g,l,f,h),this.allBullets.push(f))}this.drawLineGraph(a,b);this.launchAnimation()},createRadarGraph:function(){var a=this.valueAxis.stackType,b=[],c=[],d,e,f;for(f=this.start;f<=this.end;f++){var g=this.data[f].axes[this.valueAxis.id].graphs[this.id],h;h="none"==a||"3d"==a?g.values.value:g.values.close;if(isNaN(h))this.drawLineGraph(b,c),b=
[],c=[];else{var k=this.y-(this.valueAxis.getCoordinate(h)-this.height),l=180-360/(this.end-this.start+1)*f;h=k*Math.sin(l/180*Math.PI);k*=Math.cos(l/180*Math.PI);b.push(h);c.push(k);var l=this.createBullet(g,h,k,f),m=this.labelText;m&&(g=this.createLabel(g,h,k,m),this.positionLabel(h,k,g,l),this.allBullets.push(g));isNaN(d)&&(d=h);isNaN(e)&&(e=k)}}b.push(d);c.push(e);this.drawLineGraph(b,c);this.launchAnimation()},positionLabel:function(a,b,c,d,e,f){e="middle";f=!1;var g=this.labelPosition,h=c.getBBox(),
k=d.graphDataItem,l=this.chart.rotate,m=k.isNegative;b-=h.height/4/2;switch(g){case "top":g=l?"top":m?"bottom":"top";break;case "right":g=l?m?"left":"right":"right";break;case "bottom":g=l?"bottom":m?"top":"bottom";break;case "left":g=l?m?"right":"left":"left"}var n=k.columnGraphics,p=0,r=0;n&&(p=n.x,r=n.y);var q=this.labelOffset;switch(g){case "top":b-=d.size/2+h.height/2+q;break;case "right":e="start";a+=d.size/2+q;break;case "bottom":b+=d.size/2+h.height/2+q;break;case "left":e="end";a-=d.size/
2+q;break;case "inside":"column"==this.type&&(f=!0,l?m?(e="end",a=p-3-q):(e="start",a=p+3+q):b=m?r+7+q:r-10-q);break;case "middle":"column"==this.type&&(f=!0,l?a-=(a-p)/2+q-3:b-=(b-r)/2+q-3)}"auto"!=this.labelAnchor&&(e=this.labelAnchor);c.attr({"text-anchor":e});this.labelRotation&&c.rotate(this.labelRotation);c.translate(a,b);h=c.getBBox();n&&f&&(h.height>k.columnHeight||h.width>k.columnWidth)&&(c.remove(),c=!1);if(c&&"serial"==this.chart.type)if(l){if(0>b||b>this.height)c.remove(),c=!1}else if(0>
a||a>this.width)c.remove(),c=!1;return c},getGradRotation:function(){var a=270;"horizontal"==this.gradientOrientation&&(a=0);return this.gradientRotation=a},createSerialGraph:function(){this.dashLengthSwitched=this.fillColorsSwitched=this.lineColorSwitched=void 0;var a=this.chart,b=this.id,c=this.index,d=this.data,e=this.chart.container,f=this.valueAxis,g=this.type,h=this.columnWidthReal,k=this.showBulletsAt;isNaN(this.columnWidth)||(h=this.columnWidth);isNaN(h)&&(h=.8);var l=this.useNegativeColorIfDown,
m=this.width,n=this.height,p=this.y,r=this.rotate,q=this.columnCount,t=AmCharts.toCoordinate(this.cornerRadiusTop,h/2),z=this.connect,x=[],u=[],w,y,A,C,B=this.chart.graphs.length,H,D=this.dx/this.tcc,I=this.dy/this.tcc,X=f.stackType,ca=this.start,oa=this.end,S=this.scrollbar,ma="graph-column-";S&&(ma="scrollbar-graph-column-");var pa=this.categoryAxis,ia=this.baseCoord,Oa=this.negativeBase,Z=this.columnIndex,Y=this.lineThickness,T=this.lineAlpha,ra=this.lineColorR,aa=this.dashLength,ba=this.set,sa,
ha=this.getGradRotation(),O=this.chart.columnSpacing,U=pa.cellWidth,va=(U*h-q)/q;O>va&&(O=va);var G,v,ja,da=n+1,Pa=m+1,W=0,pb=0,qb,rb,db,eb,sb=this.fillColorsR,Ia=this.negativeFillColors,Ba=this.negativeLineColor,Va=this.fillAlphas,Wa=this.negativeFillAlphas;"object"==typeof Va&&(Va=Va[0]);"object"==typeof Wa&&(Wa=Wa[0]);var fb=f.getCoordinate(f.min);f.logarithmic&&(fb=f.getCoordinate(f.minReal));this.minCoord=fb;this.resetBullet&&(this.bullet="none");if(!(S||"line"!=g&&"smoothedLine"!=g&&"step"!=
g||(1==d.length&&"step"!=g&&"none"==this.bullet&&(this.bullet="round",this.resetBullet=!0),!Ia&&void 0==Ba||l))){var Qa=Oa;Qa>f.max&&(Qa=f.max);Qa<f.min&&(Qa=f.min);f.logarithmic&&(Qa=f.minReal);var Fa=f.getCoordinate(Qa),Hb=f.getCoordinate(f.max);r?(da=n,Pa=Math.abs(Hb-Fa)+1,qb=n,rb=Math.abs(fb-Fa)+1,eb=pb=0,f.reversed?(W=0,db=Fa):(W=Fa,db=0)):(Pa=m,da=Math.abs(Hb-Fa)+1,rb=m,qb=Math.abs(fb-Fa)+1,db=W=0,f.reversed?(eb=p,pb=Fa):eb=Fa+1)}var Ga=Math.round;this.pmx=Ga(W);this.pmy=Ga(pb);this.pmh=Ga(da);
this.pmw=Ga(Pa);this.nmx=Ga(db);this.nmy=Ga(eb);this.nmh=Ga(qb);this.nmw=Ga(rb);AmCharts.isModern||(this.nmy=this.nmx=0,this.nmh=this.height);this.clustered||(q=1);h="column"==g?(U*h-O*(q-1))/q:U*h;1>h&&(h=1);var Ib=this.fixedColumnWidth;isNaN(Ib)||(h=Ib);var J;if("line"==g||"step"==g||"smoothedLine"==g){if(0<ca){for(J=ca-1;-1<J;J--)if(G=d[J],v=G.axes[f.id].graphs[b],ja=v.values.value,!isNaN(ja)){ca=J;break}if(this.lineColorField)for(J=ca;-1<J;J--)if(G=d[J],v=G.axes[f.id].graphs[b],v.lineColor){this.bulletColorSwitched=
this.lineColorSwitched=v.lineColor;break}if(this.fillColorsField)for(J=ca;-1<J;J--)if(G=d[J],v=G.axes[f.id].graphs[b],v.fillColors){this.fillColorsSwitched=v.fillColors;break}if(this.dashLengthField)for(J=ca;-1<J;J--)if(G=d[J],v=G.axes[f.id].graphs[b],!isNaN(v.dashLength)){this.dashLengthSwitched=v.dashLength;break}}if(oa<d.length-1)for(J=oa+1;J<d.length;J++)if(G=d[J],v=G.axes[f.id].graphs[b],ja=v.values.value,!isNaN(ja)){oa=J;break}}oa<d.length-1&&oa++;var P=[],Q=[],Ja=!1;if("line"==g||"step"==g||
"smoothedLine"==g)if(this.stackable&&"regular"==X||"100%"==X||this.fillToGraph)Ja=!0;var Jb=this.noStepRisers,gb=-1E3,hb=-1E3,ib=this.minDistance,Ka=!0,Xa=!1;for(J=ca;J<=oa;J++){G=d[J];v=G.axes[f.id].graphs[b];v.index=J;var Ya,La=NaN;if(l&&void 0==this.openField)for(var tb=J+1;tb<d.length&&(!d[tb]||!(Ya=d[J+1].axes[f.id].graphs[b])||!Ya.values||(La=Ya.values.value,isNaN(La)));tb++);var R,N,L,ea,ka=NaN,F=NaN,E=NaN,M=NaN,K=NaN,Ma=NaN,Ca=NaN,Na=NaN,Da=NaN,xa=NaN,ya=NaN,fa=NaN,ga=NaN,V=NaN,ub=NaN,vb=
NaN,la=NaN,na=void 0,Ha=sb,Ra=Va,za=ra,ta,wa,wb=this.proCandlesticks,jb=this.topRadius,Za=this.pattern;void 0!=v.pattern&&(Za=v.pattern);void 0!=v.color&&(Ha=v.color);v.fillColors&&(Ha=v.fillColors);isNaN(v.alpha)||(Ra=v.alpha);isNaN(v.dashLength)||(aa=v.dashLength);var Aa=v.values;f.recalculateToPercents&&(Aa=v.percents);if(Aa){V=this.stackable&&"none"!=X&&"3d"!=X?Aa.close:Aa.value;if("candlestick"==g||"ohlc"==g)V=Aa.close,vb=Aa.low,Ca=f.getCoordinate(vb),ub=Aa.high,Da=f.getCoordinate(ub);la=Aa.open;
E=f.getCoordinate(V);isNaN(la)||(K=f.getCoordinate(la),l&&(La=la,la=K=NaN));l&&(void 0==this.openField?Ya&&(Ya.isNegative=La<V?!0:!1,isNaN(La)&&(v.isNegative=!Ka)):v.isNegative=La>V?!0:!1);if(!S)switch(this.showBalloonAt){case "close":v.y=E;break;case "open":v.y=K;break;case "high":v.y=Da;break;case "low":v.y=Ca}var ka=G.x[pa.id],Sa=this.periodSpan-1,qa=Math.floor(U/2)+Math.floor(Sa*U/2),Ea=qa,kb=0;"left"==this.stepDirection&&(kb=(2*U+Sa*U)/2,ka-=kb);"center"==this.stepDirection&&(kb=U/2,ka-=kb);
"start"==this.pointPosition&&(ka-=U/2+Math.floor(Sa*U/2),qa=0,Ea=Math.floor(U)+Math.floor(Sa*U));"end"==this.pointPosition&&(ka+=U/2+Math.floor(Sa*U/2),qa=Math.floor(U)+Math.floor(Sa*U),Ea=0);if(Jb){var xb=this.columnWidth;isNaN(xb)||(qa*=xb,Ea*=xb)}S||(v.x=ka);-1E5>ka&&(ka=-1E5);ka>m+1E5&&(ka=m+1E5);r?(F=E,M=K,K=E=ka,isNaN(la)&&!this.fillToGraph&&(M=ia),Ma=Ca,Na=Da):(M=F=ka,isNaN(la)&&!this.fillToGraph&&(K=ia));if(!wb&&V<la||wb&&V<sa)v.isNegative=!0,Ia&&(Ha=Ia),Wa&&(Ra=Wa),void 0!=Ba&&(za=Ba);Xa=
!1;isNaN(V)||(l?V>La?(Ka&&(Xa=!0),Ka=!1):(Ka||(Xa=!0),Ka=!0):v.isNegative=V<Oa?!0:!1,sa=V);switch(g){case "line":if(isNaN(V))z||(this.drawLineGraph(x,u,P,Q),x=[],u=[],P=[],Q=[]);else{if(Math.abs(F-gb)>=ib||Math.abs(E-hb)>=ib)x.push(F),u.push(E),gb=F,hb=E;xa=F;ya=E;fa=F;ga=E;!Ja||isNaN(K)||isNaN(M)||(P.push(M),Q.push(K));if(Xa||void 0!=v.lineColor||void 0!=v.fillColors||!isNaN(v.dashLength))this.drawLineGraph(x,u,P,Q),x=[F],u=[E],P=[],Q=[],!Ja||isNaN(K)||isNaN(M)||(P.push(M),Q.push(K)),l?Ka?(this.lineColorSwitched=
ra,this.fillColorsSwitched=sb):(this.lineColorSwitched=Ba,this.fillColorsSwitched=Ia):(this.lineColorSwitched=v.lineColor,this.fillColorsSwitched=v.fillColors),this.dashLengthSwitched=v.dashLength;v.gap&&(this.drawLineGraph(x,u,P,Q),x=[],u=[],P=[],Q=[])}break;case "smoothedLine":if(isNaN(V))z||(this.drawSmoothedGraph(x,u,P,Q),x=[],u=[],P=[],Q=[]);else{if(Math.abs(F-gb)>=ib||Math.abs(E-hb)>=ib)x.push(F),u.push(E),gb=F,hb=E;xa=F;ya=E;fa=F;ga=E;!Ja||isNaN(K)||isNaN(M)||(P.push(M),Q.push(K));void 0==
v.lineColor&&void 0==v.fillColors&&isNaN(v.dashLength)||(this.drawSmoothedGraph(x,u,P,Q),x=[F],u=[E],P=[],Q=[],!Ja||isNaN(K)||isNaN(M)||(P.push(M),Q.push(K)),this.lineColorSwitched=v.lineColor,this.fillColorsSwitched=v.fillColors,this.dashLengthSwitched=v.dashLength);v.gap&&(this.drawSmoothedGraph(x,u,P,Q),x=[],u=[],P=[],Q=[])}break;case "step":if(!isNaN(V)){r?(isNaN(w)||(x.push(w),u.push(E-qa)),u.push(E-qa),x.push(F),u.push(E+Ea),x.push(F),!Ja||isNaN(K)||isNaN(M)||(isNaN(A)||(P.push(A),Q.push(K-
qa)),P.push(M),Q.push(K-qa),P.push(M),Q.push(K+Ea))):(isNaN(y)||(u.push(y),x.push(w),u.push(y),x.push(F-qa)),x.push(F-qa),u.push(E),x.push(F+Ea),u.push(E),!Ja||isNaN(K)||isNaN(M)||(isNaN(C)||(P.push(M-qa),Q.push(C)),P.push(M-qa),Q.push(K),P.push(M+Ea),Q.push(K)));w=F;y=E;A=M;C=K;xa=F;ya=E;fa=F;ga=E;if(Xa||void 0!=v.lineColor||void 0!=v.fillColors||!isNaN(v.dashLength)){var Wb=x[x.length-2],Xb=u[u.length-2];x.pop();u.pop();this.drawLineGraph(x,u,P,Q);x=[Wb];u=[Xb];P=[];Q=[];this.lineColorSwitched=
v.lineColor;this.fillColorsSwitched=v.fillColors;this.dashLengthSwitched=v.dashLength;l&&(Ka?(this.lineColorSwitched=ra,this.fillColorsSwitched=sb):(this.lineColorSwitched=Ba,this.fillColorsSwitched=Ia))}if(Jb||v.gap)w=y=NaN,this.drawLineGraph(x,u,P,Q),x=[],u=[],P=[],Q=[]}else if(!z){if(1>=this.periodSpan||1<this.periodSpan&&F-w>qa+Ea)w=y=NaN;this.drawLineGraph(x,u,P,Q);x=[];u=[];P=[];Q=[]}break;case "column":ta=za;void 0!=v.lineColor&&(ta=v.lineColor);if(!isNaN(V)){l||(v.isNegative=V<Oa?!0:!1);v.isNegative&&
(Ia&&(Ha=Ia),void 0!=Ba&&(ta=Ba));var Kb=f.min,Lb=f.max;if(!(V<Kb&&la<Kb||V>Lb&&la>Lb)){var ua;if(r){"3d"==X?(N=E-(q/2-this.depthCount+1)*(h+O)+O/2+I*Z,R=M+D*Z,ua=Z):(N=Math.floor(E-(q/2-Z)*(h+O)+O/2),R=M,ua=0);L=h;xa=F;ya=N+h/2;isNaN(M)||M>F&&!v.isNegative&&(xa=M);fa=F;ga=N+h/2;N+L>n+ua*I&&(L=n-N+ua*I);N<ua*I&&(L+=N,N=ua*I);ea=F-M;var Yb=R;R=AmCharts.fitToBounds(R,0,m);ea+=Yb-R;ea=AmCharts.fitToBounds(ea,-R,m-R+D*Z);N<n&&0<L&&(na=new AmCharts.Cuboid(e,ea,L,D-a.d3x,I-a.d3y,Ha,Ra,Y,ta,T,ha,t,r,aa,
Za,jb,ma),v.columnWidth=Math.abs(ea),v.columnHeight=Math.abs(L))}else{"3d"==X?(R=F-(q/2-this.depthCount+1)*(h+O)+O/2+D*Z,N=K+I*Z,ua=Z):(R=F-(q/2-Z)*(h+O)+O/2,N=K,ua=0);L=h;xa=R+h/2;ya=E;isNaN(K)||K<E&&!v.isNegative&&(ya=K);fa=R+h/2;ga=E;R+L>m+ua*D&&(L=m-R+ua*D);R<ua*D&&(L+=R-ua*D,R=ua*D);ea=E-K;var Zb=N;N=AmCharts.fitToBounds(N,this.dy,n);ea+=Zb-N;ea=AmCharts.fitToBounds(ea,-N+I*Z,n-N);R<m+Z*D&&0<L&&(this.showOnAxis&&(N-=I/2),na=new AmCharts.Cuboid(e,L,ea,D-a.d3x,I-a.d3y,Ha,Ra,Y,ta,this.lineAlpha,
ha,t,r,aa,Za,jb,ma),v.columnHeight=Math.abs(ea),v.columnWidth=Math.abs(L))}}if(na&&(wa=na.set,AmCharts.setCN(a,na.set,"graph-"+this.type),AmCharts.setCN(a,na.set,"graph-"+this.id),v.className&&AmCharts.setCN(a,na.set,v.className,!0),v.columnGraphics=wa,wa.translate(R,N),this.columnsSet.push(wa),(v.url||this.showHandOnHover)&&wa.setAttr("cursor","pointer"),!S)){"none"==X&&(H=r?(this.end+1-J)*B-c:B*J+c);"3d"==X&&(r?(H=(this.end+1-J)*B-c-1E3*this.depthCount,xa+=D*this.columnIndex,fa+=D*this.columnIndex,
v.y+=D*this.columnIndex):(H=(B-c)*(J+1)+1E3*this.depthCount,ya+=I*this.columnIndex,ga+=I*this.columnIndex,v.y+=I*this.columnIndex));if("regular"==X||"100%"==X)H=r?0<Aa.value?(this.end+1-J)*B+c:(this.end+1-J)*B-c:0<Aa.value?B*J+c:B*J-c;this.columnsArray.push({column:na,depth:H});v.x=r?N+L/2:R+L/2;this.ownColumns.push(na);this.animateColumns(na,J,F,M,E,K);this.addListeners(wa,v)}}break;case "candlestick":if(!isNaN(la)&&!isNaN(V)){var Ta,$a;ta=za;void 0!=v.lineColor&&(ta=v.lineColor);if(r){if(N=E-h/
2,R=M,L=h,N+L>n&&(L=n-N),0>N&&(L+=N,N=0),N<n&&0<L){var yb,zb;V>la?(yb=[F,Na],zb=[M,Ma]):(yb=[M,Na],zb=[F,Ma]);!isNaN(Na)&&!isNaN(Ma)&&E<n&&0<E&&(Ta=AmCharts.line(e,yb,[E,E],ta,T,Y),$a=AmCharts.line(e,zb,[E,E],ta,T,Y));ea=F-M;na=new AmCharts.Cuboid(e,ea,L,D,I,Ha,Va,Y,ta,T,ha,t,r,aa,Za,jb,ma)}}else if(R=F-h/2,N=K+Y/2,L=h,R+L>m&&(L=m-R),0>R&&(L+=R,R=0),ea=E-K,R<m&&0<L){wb&&V>=la&&(Ra=0);var na=new AmCharts.Cuboid(e,L,ea,D,I,Ha,Ra,Y,ta,T,ha,t,r,aa,Za,jb,ma),Ab,Bb;V>la?(Ab=[E,Da],Bb=[K,Ca]):(Ab=[K,Da],
Bb=[E,Ca]);!isNaN(Da)&&!isNaN(Ca)&&F<m&&0<F&&(Ta=AmCharts.line(e,[F,F],Ab,ta,T,Y),$a=AmCharts.line(e,[F,F],Bb,ta,T,Y),AmCharts.setCN(a,Ta,this.bcn+"line-high"),v.className&&AmCharts.setCN(a,Ta,v.className,!0),AmCharts.setCN(a,$a,this.bcn+"line-low"),v.className&&AmCharts.setCN(a,$a,v.className,!0))}na&&(wa=na.set,v.columnGraphics=wa,ba.push(wa),wa.translate(R,N-Y/2),(v.url||this.showHandOnHover)&&wa.setAttr("cursor","pointer"),Ta&&(ba.push(Ta),ba.push($a)),xa=F,ya=E,r?(ga=E,fa=F,"open"==k&&(fa=M),
"high"==k&&(fa=Na),"low"==k&&(fa=Ma)):(ga=E,"open"==k&&(ga=K),"high"==k&&(ga=Da),"low"==k&&(ga=Ca),fa=F),S||(v.x=r?N+L/2:R+L/2,this.animateColumns(na,J,F,M,E,K),this.addListeners(wa,v)))}break;case "ohlc":if(!(isNaN(la)||isNaN(ub)||isNaN(vb)||isNaN(V))){var Mb=e.set();ba.push(Mb);V<la&&(v.isNegative=!0,void 0!=Ba&&(za=Ba));var lb,mb,nb;if(r){var Cb=E-h/2,Cb=AmCharts.fitToBounds(Cb,0,n),Nb=AmCharts.fitToBounds(E,0,n),Db=E+h/2,Db=AmCharts.fitToBounds(Db,0,n);mb=AmCharts.line(e,[M,M],[Cb,Nb],za,T,Y,
aa);0<E&&E<n&&(lb=AmCharts.line(e,[Ma,Na],[E,E],za,T,Y,aa));nb=AmCharts.line(e,[F,F],[Nb,Db],za,T,Y,aa);ga=E;fa=F;"open"==k&&(fa=M);"high"==k&&(fa=Na);"low"==k&&(fa=Ma)}else{var Eb=F-h/2,Eb=AmCharts.fitToBounds(Eb,0,m),Ob=AmCharts.fitToBounds(F,0,m),Fb=F+h/2,Fb=AmCharts.fitToBounds(Fb,0,m);mb=AmCharts.line(e,[Eb,Ob],[K,K],za,T,Y,aa);0<F&&F<m&&(lb=AmCharts.line(e,[F,F],[Ca,Da],za,T,Y,aa));nb=AmCharts.line(e,[Ob,Fb],[E,E],za,T,Y,aa);ga=E;"open"==k&&(ga=K);"high"==k&&(ga=Da);"low"==k&&(ga=Ca);fa=F}ba.push(mb);
ba.push(lb);ba.push(nb);AmCharts.setCN(a,mb,this.bcn+"stroke-open");AmCharts.setCN(a,nb,this.bcn+"stroke-close");AmCharts.setCN(a,lb,this.bcn+"stroke");v.className&&AmCharts.setCN(a,Mb,v.className,!0);xa=F;ya=E}}if(!S&&!isNaN(V)){var Pb=this.hideBulletsCount;if(this.end-this.start<=Pb||0===Pb){var $b=this.createBullet(v,fa,ga,J),Qb=this.labelText;if(Qb){var Gb=this.createLabel(v,fa,ga,Qb);(Gb=this.positionLabel(xa,ya,Gb,$b,L,ea))&&this.allBullets.push(Gb)}if("regular"==X||"100%"==X){var Rb=f.totalText;
if(Rb){var Ua=this.createLabel(v,0,0,Rb,f.totalTextColor);this.allBullets.push(Ua);var Sb=Ua.getBBox(),Tb=Sb.width,Ub=Sb.height,ab,bb,ob=f.totalTextOffset,Vb=f.totals[J];Vb&&Vb.remove();var cb=0;"column"!=g&&(cb=this.bulletSize);r?(bb=E,ab=0>V?F-Tb/2-2-cb-ob:F+Tb/2+3+cb+ob):(ab=F,bb=0>V?E+Ub/2+cb+ob:E-Ub/2-3-cb-ob);Ua.translate(ab,bb);f.totals[J]=Ua;r?(0>bb||bb>n)&&Ua.remove():(0>ab||ab>m)&&Ua.remove()}}}}}}if("line"==g||"step"==g||"smoothedLine"==g)"smoothedLine"==g?this.drawSmoothedGraph(x,u,P,
Q):this.drawLineGraph(x,u,P,Q),S||this.launchAnimation();this.bulletsHidden&&this.hideBullets();this.customBulletsHidden&&this.hideCustomBullets()},animateColumns:function(a,b,c,d,e,f){var g=this;c=g.chart.startDuration;0<c&&!g.animationPlayed&&(g.seqAn?(a.set.hide(),g.animationArray.push(a),a=setTimeout(function(){g.animate.call(g)},c/(g.end-g.start+1)*(b-g.start)*1E3),g.timeOuts.push(a)):g.animate(a))},createLabel:function(a,b,c,d,e){var f=this.chart,g=a.labelColor;g||(g=this.color);g||(g=f.color);
e&&(g=e);e=this.fontSize;void 0===e&&(this.fontSize=e=f.fontSize);var h=this.labelFunction;d=f.formatString(d,a);d=AmCharts.cleanFromEmpty(d);h&&(d=h(a,d));a=AmCharts.text(this.container,d,g,f.fontFamily,e);a.node.style.pointerEvents="none";a.translate(b,c);this.bulletSet.push(a);return a},positiveClip:function(a){a.clipRect(this.pmx,this.pmy,this.pmw,this.pmh)},negativeClip:function(a){a.clipRect(this.nmx,this.nmy,this.nmw,this.nmh)},drawLineGraph:function(a,b,c,d){var e=this;if(1<a.length){var f=
e.set,g=e.chart,h=e.container,k=h.set(),l=h.set();f.push(l);f.push(k);var m=e.lineAlpha,n=e.lineThickness,f=e.fillAlphas,p=e.lineColorR,r=e.negativeLineAlpha;isNaN(r)&&(r=m);var q=e.lineColorSwitched;q&&(p=q);var q=e.fillColorsR,t=e.fillColorsSwitched;t&&(q=t);var z=e.dashLength;(t=e.dashLengthSwitched)&&(z=t);var t=e.negativeLineColor,x=e.negativeFillColors,u=e.negativeFillAlphas,w=e.baseCoord;0!==e.negativeBase&&(w=e.valueAxis.getCoordinate(e.negativeBase));m=AmCharts.line(h,a,b,p,m,n,z,!1,!0);
AmCharts.setCN(g,m,e.bcn+"stroke");k.push(m);k.click(function(a){e.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){e.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){e.handleGraphEvent(a,"rollOutGraph")});void 0===t||e.useNegativeColorIfDown||(n=AmCharts.line(h,a,b,t,r,n,z,!1,!0),AmCharts.setCN(g,n,e.bcn+"stroke"),AmCharts.setCN(g,n,e.bcn+"stroke-negative"),l.push(n));if(0<f||0<u)if(n=a.join(";").split(";"),r=b.join(";").split(";"),m=g.type,"serial"==m?0<c.length?(c.reverse(),d.reverse(),
n=a.concat(c),r=b.concat(d)):e.rotate?(r.push(r[r.length-1]),n.push(w),r.push(r[0]),n.push(w),r.push(r[0]),n.push(n[0])):(n.push(n[n.length-1]),r.push(w),n.push(n[0]),r.push(w),n.push(a[0]),r.push(r[0])):"xy"==m&&(b=e.fillToAxis)&&(AmCharts.isString(b)&&(b=g.getValueAxisById(b)),"H"==b.orientation?(w="top"==b.position?0:b.viH,n.push(n[n.length-1]),r.push(w),n.push(n[0]),r.push(w),n.push(a[0]),r.push(r[0])):(w="left"==b.position?0:b.viW,r.push(r[r.length-1]),n.push(w),r.push(r[0]),n.push(w),r.push(r[0]),
n.push(n[0]))),a=e.gradientRotation,0<f&&(b=AmCharts.polygon(h,n,r,q,f,1,"#000",0,a),b.pattern(e.pattern),AmCharts.setCN(g,b,e.bcn+"fill"),k.push(b)),x||void 0!==t)isNaN(u)&&(u=f),x||(x=t),h=AmCharts.polygon(h,n,r,x,u,1,"#000",0,a),AmCharts.setCN(g,h,e.bcn+"fill"),AmCharts.setCN(g,h,e.bcn+"fill-negative"),h.pattern(e.pattern),l.push(h),l.click(function(a){e.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){e.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){e.handleGraphEvent(a,"rollOutGraph")});
e.applyMask(l,k)}},applyMask:function(a,b){var c=a.length();"serial"!=this.chart.type||this.scrollbar||(this.positiveClip(b),0<c&&this.negativeClip(a))},drawSmoothedGraph:function(a,b,c,d){if(1<a.length){var e=this.set,f=this.chart,g=this.container,h=g.set(),k=g.set();e.push(k);e.push(h);var l=this.lineAlpha,m=this.lineThickness,e=this.dashLength,n=this.fillAlphas,p=this.lineColorR,r=this.fillColorsR,q=this.negativeLineColor,t=this.negativeFillColors,z=this.negativeFillAlphas,x=this.baseCoord,u=this.lineColorSwitched;
u&&(p=u);(u=this.fillColorsSwitched)&&(r=u);u=this.negativeLineAlpha;isNaN(u)&&(u=l);l=new AmCharts.Bezier(g,a,b,p,l,m,r,0,e);AmCharts.setCN(f,l,this.bcn+"stroke");h.push(l.path);void 0!==q&&(m=new AmCharts.Bezier(g,a,b,q,u,m,r,0,e),AmCharts.setCN(f,m,this.bcn+"stroke"),AmCharts.setCN(f,m,this.bcn+"stroke-negative"),k.push(m.path));0<n&&(l=a.join(";").split(";"),p=b.join(";").split(";"),m="",0<c.length?(c.push("M"),d.push("M"),c.reverse(),d.reverse(),l=a.concat(c),p=b.concat(d)):(this.rotate?(m+=
" L"+x+","+b[b.length-1],m+=" L"+x+","+b[0]):(m+=" L"+a[a.length-1]+","+x,m+=" L"+a[0]+","+x),m+=" L"+a[0]+","+b[0]),c=new AmCharts.Bezier(g,l,p,NaN,0,0,r,n,e,m),AmCharts.setCN(f,c,this.bcn+"fill"),c.path.pattern(this.pattern),h.push(c.path),t||void 0!==q)&&(z||(z=n),t||(t=q),a=new AmCharts.Bezier(g,a,b,NaN,0,0,t,z,e,m),a.path.pattern(this.pattern),AmCharts.setCN(f,a,this.bcn+"fill"),AmCharts.setCN(f,a,this.bcn+"fill-negative"),k.push(a.path));this.applyMask(k,h)}},launchAnimation:function(){var a=
this,b=a.chart.startDuration;if(0<b&&!a.animationPlayed){var c=a.set,d=a.bulletSet;AmCharts.VML||(c.attr({opacity:a.startAlpha}),d.attr({opacity:a.startAlpha}));c.hide();d.hide();a.seqAn?(b=setTimeout(function(){a.animateGraphs.call(a)},a.index*b*1E3),a.timeOuts.push(b)):a.animateGraphs()}},animateGraphs:function(){var a=this.chart,b=this.set,c=this.bulletSet,d=this.x,e=this.y;b.show();c.show();var f=a.startDuration,a=a.startEffect;b&&(this.rotate?(b.translate(-1E3,e),c.translate(-1E3,e)):(b.translate(d,
-1E3),c.translate(d,-1E3)),b.animate({opacity:1,translate:d+","+e},f,a),c.animate({opacity:1,translate:d+","+e},f,a))},animate:function(a){var b=this.chart,c=this.animationArray;!a&&0<c.length&&(a=c[0],c.shift());c=AmCharts[AmCharts.getEffect(b.startEffect)];b=b.startDuration;a&&(this.rotate?a.animateWidth(b,c):a.animateHeight(b,c),a.set.show())},legendKeyColor:function(){var a=this.legendColor,b=this.lineAlpha;void 0===a&&(a=this.lineColorR,0===b&&(b=this.fillColorsR)&&(a="object"==typeof b?b[0]:
b));return a},legendKeyAlpha:function(){var a=this.legendAlpha;void 0===a&&(a=this.lineAlpha,this.fillAlphas>a&&(a=this.fillAlphas),0===a&&(a=this.bulletAlpha),0===a&&(a=1));return a},createBullet:function(a,b,c,d){if(!isNaN(b)&&!isNaN(c)){d=this.chart;var e=this.container,f=this.bulletOffset,g=this.bulletSize;isNaN(a.bulletSize)||(g=a.bulletSize);var h=a.values.value,k=this.maxValue,l=this.minValue,m=this.maxBulletSize,n=this.minBulletSize;isNaN(k)||(isNaN(h)||(g=(h-l)/(k-l)*(m-n)+n),l==k&&(g=m));
k=g;this.bulletAxis&&(g=a.values.error,isNaN(g)||(h=g),g=this.bulletAxis.stepWidth*h);g<this.minBulletSize&&(g=this.minBulletSize);this.rotate?b=a.isNegative?b-f:b+f:c=a.isNegative?c+f:c-f;var p,n=this.bulletColorR;a.lineColor&&(this.bulletColorSwitched=a.lineColor);this.bulletColorSwitched&&(n=this.bulletColorSwitched);a.isNegative&&void 0!==this.bulletColorNegative&&(n=this.bulletColorNegative);void 0!==a.color&&(n=a.color);var r;"xy"==d.type&&this.valueField&&(r=this.pattern,a.pattern&&(r=a.pattern));
f=this.bullet;a.bullet&&(f=a.bullet);var h=this.bulletBorderThickness,l=this.bulletBorderColorR,m=this.bulletBorderAlpha,q=this.bulletAlpha;l||(l=n);this.useLineColorForBulletBorder&&(l=this.lineColorR);var t=a.alpha;isNaN(t)||(q=t);if("none"!=this.bullet||a.bullet)p=AmCharts.bullet(e,f,g,n,q,h,l,m,k,0,r);if(this.customBullet||a.customBullet)r=this.customBullet,a.customBullet&&(r=a.customBullet),r&&(p&&p.remove(),"function"==typeof r?(p=new r,p.chart=d,a.bulletConfig&&(p.availableSpace=c,p.graph=
this,p.graphDataItem=a,p.bulletY=c,a.bulletConfig.minCoord=this.minCoord-c,p.bulletConfig=a.bulletConfig),p.write(e),p=p.set):(d.path&&(r=d.path+r),p=e.set(),e=e.image(r,0,0,g,g),p.push(e),this.centerCustomBullets&&e.translate(-g/2,-g/2)));p&&((a.url||this.showHandOnHover)&&p.setAttr("cursor","pointer"),"serial"==d.type&&(0>b-0||b-0>this.width||c<-g/2||c-0>this.height)&&(p.remove(),p=null),p&&(this.bulletSet.push(p),p.translate(b,c),this.addListeners(p,a),this.allBullets.push(p)),a.bx=b,a.by=c,AmCharts.setCN(d,
p,this.bcn+"bullet"),a.className&&AmCharts.setCN(d,p,a.className,!0));p?(p.size=g||0,a.bulletGraphics=p):p={size:0};p.graphDataItem=a;return p}},showBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!1;for(b=0;b<a.length;b++)a[b].show()},hideBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!0;for(b=0;b<a.length;b++)a[b].hide()},showCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!1;for(b=0;b<a.length;b++)a[b].graphDataItem.customBullet&&a[b].show()},
hideCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!0;for(b=0;b<a.length;b++)a[b].graphDataItem.customBullet&&a[b].hide()},addListeners:function(a,b){var c=this;a.mouseover(function(a){c.handleRollOver(b,a)}).mouseout(function(a){c.handleRollOut(b,a)}).touchend(function(a){c.handleRollOver(b,a);c.chart.panEventsEnabled&&c.handleClick(b,a)}).touchstart(function(a){c.handleRollOver(b,a)}).click(function(a){c.handleClick(b,a)}).dblclick(function(a){c.handleDoubleClick(b,a)}).contextmenu(function(a){c.handleRightClick(b,
a)})},handleRollOver:function(a,b){if(a){var c=this.chart,d={type:"rollOverGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOverGraphItem",d);c.fire("rollOverGraphItem",d);clearTimeout(c.hoverInt);d=this.showBalloon;c.chartCursor&&"serial"==c.type&&(d=!1,!c.chartCursor.valueBalloonsEnabled&&this.showBalloon&&(d=!0));if(d){var d=c.formatString(this.balloonText,a,!0),e=this.balloonFunction;e&&(d=e(a,a.graph));d=AmCharts.cleanFromEmpty(d);e=c.getBalloonColor(this,
a);c.balloon.showBullet=!1;c.balloon.pointerOrientation="V";var f=a.x,g=a.y;c.rotate&&(f=a.y,g=a.x);c.showBalloon(d,e,!0,f+c.marginLeftReal,g+c.marginTopReal)}}this.handleGraphEvent(b,"rollOverGraph")},handleRollOut:function(a,b){this.chart.hideBalloon();if(a){var c={type:"rollOutGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOutGraphItem",c);this.chart.fire("rollOutGraphItem",c)}this.handleGraphEvent(b,"rollOutGraph")},handleClick:function(a,b){if(a){var c=
{type:"clickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("clickGraphItem",c);this.chart.fire("clickGraphItem",c);AmCharts.getURL(a.url,this.urlTarget)}this.handleGraphEvent(b,"clickGraph")},handleGraphEvent:function(a,b){var c={type:b,graph:this,target:this,chart:this.chart,event:a};this.fire(b,c);this.chart.fire(b,c)},handleRightClick:function(a,b){if(a){var c={type:"rightClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};
this.fire("rightClickGraphItem",c);this.chart.fire("rightClickGraphItem",c)}},handleDoubleClick:function(a,b){if(a){var c={type:"doubleClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("doubleClickGraphItem",c);this.chart.fire("doubleClickGraphItem",c)}},zoom:function(a,b){this.start=a;this.end=b;this.draw()},changeOpacity:function(a){var b=this.set;b&&b.setAttr("opacity",a);if(b=this.ownColumns){var c;for(c=0;c<b.length;c++){var d=b[c].set;d&&d.setAttr("opacity",
a)}}(b=this.bulletSet)&&b.setAttr("opacity",a)},destroy:function(){AmCharts.remove(this.set);AmCharts.remove(this.bulletSet);var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]}});AmCharts.ChartCursor=AmCharts.Class({construct:function(a){this.cname="ChartCursor";this.createEvents("changed","zoomed","onHideCursor","draw","selected","moved");this.enabled=!0;this.cursorAlpha=1;this.selectionAlpha=.2;this.cursorColor="#CC0000";this.categoryBalloonAlpha=1;this.color="#FFFFFF";this.type="cursor";this.zoomed=!1;this.zoomable=!0;this.pan=!1;this.categoryBalloonDateFormat="MMM DD, YYYY";this.categoryBalloonEnabled=this.valueBalloonsEnabled=!0;this.rolledOver=!1;this.cursorPosition=
"middle";this.bulletsEnabled=this.skipZoomDispatch=!1;this.bulletSize=8;this.selectWithoutZooming=this.oneBalloonOnly=!1;this.graphBulletSize=1.7;this.animationDuration=.3;this.zooming=!1;this.adjustment=0;this.avoidBalloonOverlapping=!0;AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container;a.rotate=b.rotate;a.container=c;c=c.set();c.translate(a.x,a.y);a.set=c;b.cursorSet.push(c);c=new AmCharts.AmBalloon;c.className="category";c.chart=b;a.categoryBalloon=
c;AmCharts.copyProperties(b.balloon,c);c.cornerRadius=0;c.shadowAlpha=0;c.borderThickness=1;c.borderAlpha=1;c.showBullet=!1;var d=a.categoryBalloonColor;void 0===d&&(d=a.cursorColor);c.fillColor=d;c.fillAlpha=a.categoryBalloonAlpha;c.borderColor=d;c.color=a.color;d=a.valueLineAxis;AmCharts.isString(d)&&(d=b.getValueAxisById(d));d||(d=b.valueAxes[0]);a.valueLineAxis=d;a.valueLineBalloonEnabled&&(d=new AmCharts.AmBalloon,a.vaBalloon=d,AmCharts.copyProperties(c,d),d.animationDuration=0,a.rotate||(d.pointerOrientation=
"H"));a.rotate&&(c.pointerOrientation="H");a.extraWidth=0;a.prevX=[];a.prevY=[];a.prevTX=[];a.prevTY=[];if(a.valueBalloonsEnabled)for(c=0;c<b.graphs.length;c++)d=new AmCharts.AmBalloon,d.className=b.graphs[c].id,d.chart=b,AmCharts.copyProperties(b.balloon,d),b.graphs[c].valueBalloon=d;"cursor"==a.type?a.createCursor():a.createCrosshair();a.interval=setInterval(function(){a.detectMovement.call(a)},40)},updateData:function(){var a=this.chart;this.data=a.chartData;this.firstTime=a.firstTime;this.lastTime=
a.lastTime},createCursor:function(){var a=this.chart,b=this.cursorAlpha,c=a.categoryAxis,d=this.categoryBalloon,e,f,g,h;g=a.dx;h=a.dy;var k=this.width,l=this.height,m=a.rotate;d.pointerWidth=c.tickLength;m?(e=[0,k,k+g],f=[0,0,h],g=[g,0,0],h=[h,0,l]):(e=[g,0,0],f=[h,0,l],g=[0,k,k+g],h=[0,0,h]);e=AmCharts.line(this.container,e,f,this.cursorColor,b,1);AmCharts.setCN(a,e,"cursor-line");this.line=e;(f=this.fullRectSet)?(f.push(e),f.translate(this.x,this.y)):this.set.push(e);this.valueLineEnabled&&(e=this.valueLineAlpha,
isNaN(e)||(b=e),b=AmCharts.line(this.container,g,h,this.cursorColor,b,1),AmCharts.setCN(a,b,"cursor-value-line"),this.vLine=b,this.set.push(b));this.setBalloonBounds(d,c,m);(a=this.vaBalloon)&&this.setBalloonBounds(a,this.valueLineAxis,!m);this.hideCursor()},createCrosshair:function(){var a=this.cursorAlpha,b=this.container,c=AmCharts.line(b,[0,0],[0,this.height],this.cursorColor,a,1),a=AmCharts.line(b,[0,this.width],[0,0],this.cursorColor,a,1);AmCharts.setCN(this.chart,c,"cursor-line");AmCharts.setCN(this.chart,
a,"cursor-line");this.set.push(c);this.set.push(a);this.vLine=c;this.hLine=a;this.hideCursor()},detectMovement:function(){var a=this.chart;if(a.mouseIsOver){var b=a.mouseX-this.x,c=a.mouseY-this.y;-.5<b&&b<this.width+1&&0<c&&c<this.height?(this.drawing?this.rolledOver||a.setMouseCursor("crosshair"):this.pan&&(this.rolledOver||a.setMouseCursor("move")),this.rolledOver=!0,(this.valueLineEnabled||this.valueLineBalloonEnabled)&&this.updateVLine(b,c),this.setPosition()):this.rolledOver&&(this.handleMouseOut(),
this.rolledOver=!1)}else this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)},updateVLine:function(a,b){var c=this.vLine,d=this.vaBalloon;if((c||d)&&!this.panning&&!this.drawing){c&&c.show();var e=this.valueLineAxis,f,g=this.rotate;g?(c&&c.translate(a,0),e&&(f=e.coordinateToValue(a)),c=a):(c&&c.translate(0,b),e&&(f=e.coordinateToValue(b)),c=b-1);if(d&&!isNaN(f)&&this.prevLineValue!=f){var h=e.formatValue(f,!0);d&&(this.setBalloonPosition(d,e,c,!g),d.showBalloon(h))}this.prevLineValue=f}},
getMousePosition:function(){var a,b=this.width,c=this.height;a=this.chart;this.rotate?(a=a.mouseY-this.y,0>a&&(a=0),a>c&&(a=c)):(a=a.mouseX-this.x-1,0>a&&(a=0),a>b&&(a=b));return a},updateCrosshair:function(){var a=this.chart,b=a.mouseX-this.x,c=a.mouseY-this.y,d=this.vLine,e=this.hLine,b=AmCharts.fitToBounds(b,0,this.width),c=AmCharts.fitToBounds(c,0,this.height);0<this.cursorAlpha&&(d.show(),e.show(),d.translate(b,0),e.translate(0,c));this.zooming&&(a.hideXScrollbar&&(b=NaN),a.hideYScrollbar&&(c=
NaN),this.updateSelectionSize(b,c));this.fireMoved();a.mouseIsOver||this.zooming||this.hideCursor()},fireMoved:function(){var a=this.chart,b={type:"moved",target:this};b.chart=a;b.zooming=this.zooming;b.x=a.mouseX-this.x;b.y=a.mouseY-this.y;this.fire("moved",b)},updateSelectionSize:function(a,b){AmCharts.remove(this.selection);var c=this.selectionPosX,d=this.selectionPosY,e=0,f=0,g=this.width,h=this.height;isNaN(a)||(c>a&&(e=a,g=c-a),c<a&&(e=c,g=a-c),c==a&&(e=a,g=0),g+=this.extraWidth,e-=this.extraWidth/
2);isNaN(b)||(d>b&&(f=b,h=d-b),d<b&&(f=d,h=b-d),d==b&&(f=b,h=0),h+=this.extraWidth,f-=this.extraWidth/2);0<g&&0<h&&(c=AmCharts.rect(this.container,g,h,this.cursorColor,this.selectionAlpha),AmCharts.setCN(this.chart,c,"cursor-selection"),c.translate(e+this.x,f+this.y),this.selection=c)},arrangeBalloons:function(){var a=this.valueBalloons,b=this.x,c=this.y,d=this.height+c;a.sort(this.compareY);var e;for(e=0;e<a.length;e++){var f=a[e].balloon;f.setBounds(b,c,b+this.width,d);f.prevX=this.prevX[e];f.prevY=
this.prevY[e];f.prevTX=this.prevTX[e];f.prevTY=this.prevTY[e];f.draw();d=f.yPos-3}this.arrangeBalloons2()},compareY:function(a,b){return a.yy<b.yy?1:-1},arrangeBalloons2:function(){var a=this.valueBalloons;a.reverse();var b,c=this.x,d,e,f=a.length;for(e=0;e<f;e++){var g=a[e].balloon;b=g.bottom;var h=g.bottom-g.yPos,k=f-e-1;0<e&&b-h<d+3&&(g.setBounds(c,d+3,c+this.width,d+h+3),g.prevX=this.prevX[k],g.prevY=this.prevY[k],g.prevTX=this.prevTX[k],g.prevTY=this.prevTY[k],g.draw());g.set&&g.set.show();this.prevX[k]=
g.prevX;this.prevY[k]=g.prevY;this.prevTX[k]=g.prevTX;this.prevTY[k]=g.prevTY;d=g.bottom}},showBullets:function(){AmCharts.remove(this.allBullets);var a=this.container,b=a.set();this.set.push(b);this.set.show();this.allBullets=b;var b=this.chart.graphs,c;for(c=0;c<b.length;c++){var d=b[c];if(!d.hidden&&d.balloonText){var e=this.data[this.index].axes[d.valueAxis.id].graphs[d.id],f=e.y;if(!isNaN(f)){var g,h;g=e.x;this.rotate?(h=f,f=g):h=g;d=AmCharts.circle(a,this.bulletSize/2,this.chart.getBalloonColor(d,
e,!0),d.cursorBulletAlpha);d.translate(h,f);this.allBullets.push(d)}}}},destroy:function(){this.clear();AmCharts.remove(this.selection);this.selection=null;var a=this.categoryBalloon;a&&a.destroy();(a=this.vaBalloon)&&a.destroy();this.destroyValueBalloons();AmCharts.remove(this.set)},clear:function(){clearInterval(this.interval)},destroyValueBalloons:function(){var a=this.valueBalloons;if(a){var b;for(b=0;b<a.length;b++)a[b].balloon.hide()}},zoom:function(a,b,c,d){var e=this.chart;this.destroyValueBalloons();
this.zooming=!1;var f;this.rotate?this.selectionPosY=f=e.mouseY:this.selectionPosX=f=e.mouseX;this.start=a;this.end=b;this.startTime=c;this.endTime=d;this.zoomed=!0;d=e.categoryAxis;f=this.rotate;b=this.width;c=this.height;a=d.stepWidth;if(this.fullWidth){var g=1;d.parseDates&&!d.equalSpacing&&(g=d.minDuration());f?this.extraWidth=c=a*g:(this.extraWidth=b=a*g,this.categoryBalloon.minWidth=b);this.line&&this.line.remove();this.line=AmCharts.rect(this.container,b,c,this.cursorColor,this.cursorAlpha,
0);AmCharts.setCN(e,this.line,"cursor-fill");this.fullRectSet&&this.fullRectSet.push(this.line)}this.stepWidth=a;this.tempVal=this.valueBalloonsEnabled;this.valueBalloonsEnabled=!1;this.setPosition();this.valueBalloonsEnabled=this.tempVal;this.hideCursor()},hideObj:function(a){a&&a.hide()},hideCursor:function(a){void 0===a&&(a=!0);this.hideObj(this.set);this.hideObj(this.categoryBalloon);this.hideObj(this.line);this.hideObj(this.vLine);this.hideObj(this.hLine);this.hideObj(this.vaBalloon);this.hideObj(this.allBullets);
this.destroyValueBalloons();this.selectWithoutZooming||AmCharts.remove(this.selection);this.previousIndex=NaN;a&&this.fire("onHideCursor",{type:"onHideCursor",chart:this.chart,target:this});this.drawing||this.chart.setMouseCursor("auto");this.normalizeBulletSize()},setPosition:function(a,b,c){void 0===b&&(b=!0);if("cursor"==this.type){if(this.tempPosition=NaN,AmCharts.ifArray(this.data))isNaN(a)&&(a=this.getMousePosition()),(a!=this.previousMousePosition||!0===this.zoomed||this.oneBalloonOnly)&&!isNaN(a)&&
("mouse"==this.cursorPosition&&(this.tempPosition=a),isNaN(c)&&(c=this.chart.categoryAxis.xToIndex(a)),c!=this.previousIndex||this.zoomed||"mouse"==this.cursorPosition||this.oneBalloonOnly)&&(this.updateCursor(c,b),this.zoomed=!1),this.previousMousePosition=a}else this.updateCrosshair()},normalizeBulletSize:function(){var a=this.resizedBullets;if(a)for(var b=0;b<a.length;b++){var c=a[b],d=c.bulletGraphics;d&&(d.translate(c.bx,c.by,1),c=c.graph,isNaN(this.graphBulletAlpha)||(d.setAttr("fill-opacity",
c.bulletAlpha),d.setAttr("stroke-opacity",c.bulletBorderAlpha)))}},updateCursor:function(a,b){var c=this.chart,d=this.fullWidth,e=c.mouseX-this.x,f=c.mouseY-this.y;this.drawingNow&&(AmCharts.remove(this.drawingLine),this.drawingLine=AmCharts.line(this.container,[this.x+this.drawStartX,this.x+e],[this.y+this.drawStartY,this.y+f],this.cursorColor,1,1));if(this.enabled){void 0===b&&(b=!0);this.index=a+=this.adjustment;var g=c.categoryAxis,h=c.dx,k=c.dy,l=this.x+1,m=this.y+1,n=this.width,p=this.height,
r=this.data[a];this.fireMoved();if(r){var q=r.x[g.id],t=c.rotate,z=this.stepWidth,x=this.categoryBalloon,u=this.firstTime,w=this.lastTime,y=this.cursorPosition,A=this.zooming,C=this.panning,B=c.graphs;if(c.mouseIsOver||A||C||this.forceShow)if(this.forceShow=!1,C){var h=this.panClickPos,c=this.panClickEndTime,A=this.panClickStartTime,H=this.panClickEnd,l=this.panClickStart,e=(t?h-f:h-e)/z;if(!g.parseDates||g.equalSpacing)e=Math.round(e);0!==e&&(h={type:"zoomed",target:this},h.chart=this.chart,g.parseDates&&
!g.equalSpacing?(c+e>w&&(e=w-c),A+e<u&&(e=u-A),h.start=Math.round(A+e),h.end=Math.round(c+e),this.fire(h.type,h)):H+e>=this.data.length||0>l+e||(h.start=l+e,h.end=H+e,this.fire(h.type,h)))}else{"start"==y?q-=g.cellWidth/2:"mouse"==y&&(c.mouseIsOver?q=t?f-2:e-2:isNaN(this.tempPosition)||(q=this.tempPosition-2));if(t){if(0>q)if(A)q=0;else{this.hideCursor();return}if(q>p+1)if(A)q=p+1;else{this.hideCursor();return}}else{if(0>q)if(A)q=0;else{this.hideCursor();return}if(q>n)if(A)q=n;else{this.hideCursor();
return}}if(0<this.cursorAlpha){var D=this.line;t?(u=0,w=q+k,d&&(w-=g.cellWidth/2)):(u=q,w=0,d&&(u-=g.cellWidth/2));z=this.animationDuration;0<z&&!this.zooming?isNaN(this.previousX)?D.translate(u,w):(D.translate(this.previousX,this.previousY),D.animate({translate:u+","+w},z,"easeOutSine")):D.translate(u,w);this.previousX=u;this.previousY=w;D.show()}this.linePos=t?q+k:q;A&&(d&&D.hide(),t?this.updateSelectionSize(NaN,q):this.updateSelectionSize(q,NaN));z=!0;A&&(z=!1);this.categoryBalloonEnabled&&z?(this.setBalloonPosition(x,
g,q,t),(u=this.categoryBalloonFunction)?x.showBalloon(u(r.category)):g.parseDates?(g=AmCharts.formatDate(r.category,this.categoryBalloonDateFormat,c),-1!=g.indexOf("fff")&&(g=AmCharts.formatMilliseconds(g,r.category)),x.showBalloon(g)):x.showBalloon(AmCharts.fixNewLines(r.category))):x.hide();B&&this.bulletsEnabled&&this.showBullets();if(this.oneBalloonOnly){q=Infinity;for(g=0;g<B.length;g++)u=B[g],u.showBalloon&&!u.hidden&&u.balloonText&&(w=r.axes[u.valueAxis.id].graphs[u.id],x=w.y,isNaN(x)||(t?
Math.abs(e-x)<q&&(q=Math.abs(e-x),H=u):Math.abs(f-x)<q&&(q=Math.abs(f-x),H=u)));this.mostCloseGraph&&(H=this.mostCloseGraph)}if(a!=this.previousIndex||H!=this.previousMostCloseGraph)if(this.normalizeBulletSize(),this.destroyValueBalloons(),this.resizedBullets=[],B&&this.valueBalloonsEnabled&&z&&c.balloon.enabled){this.valueBalloons=z=[];for(g=0;g<B.length;g++)if(u=B[g],x=NaN,(!this.oneBalloonOnly||u==H)&&u.showBalloon&&!u.hidden&&u.balloonText&&("step"==u.type&&"left"==u.stepDirection&&(r=this.data[a+
1]),r)){if(w=r.axes[u.valueAxis.id].graphs[u.id])x=w.y;if(this.showNextAvailable&&isNaN(x)&&a+1<this.data.length)for(q=a+1;q<this.data.length;q++)if(d=this.data[q])if(w=d.axes[u.valueAxis.id].graphs[u.id],x=w.y,!isNaN(x))break;if(!isNaN(x)){d=w.x;k=!0;if(t){if(q=x,0>d||d>p)k=!1}else if(q=d,d=x,0>q||q>n+h+1)k=!1;k&&(k=this.graphBulletSize,D=this.graphBulletAlpha,1==k&&isNaN(D)||!AmCharts.isModern||!(y=w.bulletGraphics)||(y.getBBox(),y.translate(w.bx,w.by,k),this.resizedBullets.push(w),isNaN(D)||(y.setAttr("fill-opacity",
D),y.setAttr("stroke-opacity",D))),k=u.valueBalloon,D=c.getBalloonColor(u,w),k.setBounds(l,m,l+n,m+p),k.pointerOrientation="H",y=this.balloonPointerOrientation,"vertical"==y&&(k.pointerOrientation="V"),"horizontal"==y&&(k.pointerOrientation="H"),k.changeColor(D),void 0!==u.balloonAlpha&&(k.fillAlpha=u.balloonAlpha),void 0!==u.balloonTextColor&&(k.color=u.balloonTextColor),k.setPosition(q+l,d+m),q=c.formatString(u.balloonText,w,!0),(d=u.balloonFunction)&&(q=d(w,u).toString()),""!==q&&(t?k.showBalloon(q):
(k.text=q,k.show=!0),z.push({yy:x,balloon:k})),!t&&k.set&&(k.set.hide(),u=k.textDiv)&&(u.style.visibility="hidden"))}}this.avoidBalloonOverlapping&&this.arrangeBalloons()}b?(h={type:"changed"},h.index=a,h.chart=this.chart,h.zooming=A,h.mostCloseGraph=H,h.position=t?f:e,h.target=this,c.fire("changed",h),this.fire("changed",h),this.skipZoomDispatch=!1):(this.skipZoomDispatch=!0,c.updateLegendValues(a));this.previousIndex=a;this.previousMostCloseGraph=H}}}else this.hideCursor()},setBalloonPosition:function(a,
b,c,d){var e=b.position,f=b.inside;b=b.axisThickness;var g=this.chart,h=g.dx,g=g.dy,k=this.x,l=this.y,m=this.width,n=this.height;d?(f&&("right"==e?a.setBounds(k,l+g,k+m+h,l+c+g):a.setBounds(k,l+g,k+m+h,l+c)),"right"==e?f?a.setPosition(k+m+h,l+c+g):a.setPosition(k+m+h+b,l+c+g):f?a.setPosition(k,l+c):a.setPosition(k-b,l+c)):"top"==e?f?a.setPosition(k+c+h,l+g):a.setPosition(k+c+h,l+g-b+1):f?a.setPosition(k+c,l+n):a.setPosition(k+c,l+n+b-1)},setBalloonBounds:function(a,b,c){var d=b.position,e=b.inside,
f=b.axisThickness,g=b.tickLength,h=this.chart,k=h.dx,h=h.dy,l=this.x,m=this.y,n=this.width,p=this.height;c?(e&&(a.pointerWidth=0),"right"==d?e?a.setBounds(l,m+h,l+n+k,m+p+h):a.setBounds(l+n+k+f,m+h,l+n+1E3,m+p+h):e?a.setBounds(l,m,n+l,p+m):a.setBounds(-1E3,-1E3,l-g-f,m+p+15)):(a.maxWidth=n,b.parseDates&&(g=0,a.pointerWidth=0),"top"==d?e?a.setBounds(l+k,m+h,n+k+l,p+m):a.setBounds(l+k,-1E3,n+k+l,m+h-g-f):e?a.setBounds(l,m,n+l,p+m-g):a.setBounds(l,m+p+g+f-1,l+n,m+p+g+f))},enableDrawing:function(a){this.enabled=
!a;this.hideCursor();this.rolledOver=!1;this.drawing=a},isZooming:function(a){a&&a!=this.zooming&&this.handleMouseDown("fake");a||a==this.zooming||this.handleMouseUp()},handleMouseOut:function(){if(this.enabled)if(this.zooming)this.setPosition();else{this.index=void 0;var a={type:"changed",index:void 0,target:this};a.chart=this.chart;this.fire("changed",a);this.hideCursor()}},handleReleaseOutside:function(){this.handleMouseUp()},handleMouseUp:function(){var a=this.chart,b=this.data,c;if(a){var d=
a.mouseX-this.x,e=a.mouseY-this.y;if(this.drawingNow){this.drawingNow=!1;AmCharts.remove(this.drawingLine);c=this.drawStartX;var f=this.drawStartY;if(2<Math.abs(c-d)||2<Math.abs(f-e))c={type:"draw",target:this,chart:a,initialX:c,initialY:f,finalX:d,finalY:e},this.fire(c.type,c)}if(this.enabled&&0<b.length){if(this.pan)this.rolledOver=!1;else if(this.zoomable&&this.zooming){c=this.selectWithoutZooming?{type:"selected"}:{type:"zoomed"};c.target=this;c.chart=a;if("cursor"==this.type)this.rotate?this.selectionPosY=
e:this.selectionPosX=e=d,4>Math.abs(e-this.initialMouse)&&this.fromIndex==this.index||(this.index<this.fromIndex?(c.end=this.fromIndex,c.start=this.index):(c.end=this.index,c.start=this.fromIndex),e=a.categoryAxis,e.parseDates&&!e.equalSpacing&&(b[c.start]&&(c.start=b[c.start].time),b[c.end]&&(c.end=a.getEndTime(b[c.end].time))),this.skipZoomDispatch||this.fire(c.type,c));else{var g=this.initialMouseX,h=this.initialMouseY;3>Math.abs(d-g)&&3>Math.abs(e-h)||(b=Math.min(g,d),f=Math.min(h,e),d=Math.abs(g-
d),e=Math.abs(h-e),a.hideXScrollbar&&(b=0,d=this.width),a.hideYScrollbar&&(f=0,e=this.height),c.selectionHeight=e,c.selectionWidth=d,c.selectionY=f,c.selectionX=b,this.skipZoomDispatch||this.fire(c.type,c))}this.selectWithoutZooming||AmCharts.remove(this.selection)}this.skipZoomDispatch=!1}}this.panning=this.zooming=!1},showCursorAt:function(a){var b=this.chart.categoryAxis;a=b.parseDates?b.dateToCoordinate(a):b.categoryToCoordinate(a);this.previousMousePosition=NaN;this.forceShow=!0;this.setPosition(a,
!1)},clearSelection:function(){AmCharts.remove(this.selection)},handleMouseDown:function(a){if(this.zoomable||this.pan||this.drawing){var b=this.rotate,c=this.chart,d=c.mouseX-this.x,e=c.mouseY-this.y;if(0<d&&d<this.width&&0<e&&e<this.height||"fake"==a)this.setPosition(),this.selectWithoutZooming&&AmCharts.remove(this.selection),this.drawing?(this.drawStartY=e,this.drawStartX=d,this.drawingNow=!0):this.pan?(this.zoomable=!1,c.setMouseCursor("move"),this.panning=!0,this.panClickPos=b?e:d,this.panClickStart=
this.start,this.panClickEnd=this.end,this.panClickStartTime=this.startTime,this.panClickEndTime=this.endTime):this.zoomable&&("cursor"==this.type?(this.fromIndex=this.index,b?(this.initialMouse=e,this.selectionPosY=this.linePos):(this.initialMouse=d,this.selectionPosX=this.linePos)):(this.initialMouseX=d,this.initialMouseY=e,this.selectionPosX=d,this.selectionPosY=e),this.zooming=!0)}}});AmCharts.SimpleChartScrollbar=AmCharts.Class({construct:function(a){this.createEvents("zoomed");this.backgroundColor="#D4D4D4";this.backgroundAlpha=1;this.selectedBackgroundColor="#EFEFEF";this.scrollDuration=this.selectedBackgroundAlpha=1;this.resizeEnabled=!0;this.hideResizeGrips=!1;this.scrollbarHeight=20;this.updateOnReleaseOnly=!1;9>document.documentMode&&(this.updateOnReleaseOnly=!0);this.dragIconWidth=18;this.dragIconHeight=25;AmCharts.applyTheme(this,a,"SimpleChartScrollbar")},draw:function(){var a=
this;a.destroy();if(a.enabled){a.interval=setInterval(function(){a.updateScrollbar.call(a)},40);var b=a.chart.container,c=a.rotate,d=a.chart,e=b.set();a.set=e;d.scrollbarsSet.push(e);var f,g;c?(f=a.scrollbarHeight,g=d.plotAreaHeight):(g=a.scrollbarHeight,f=d.plotAreaWidth);a.width=f;if((a.height=g)&&f){var h=AmCharts.rect(b,f,g,a.backgroundColor,a.backgroundAlpha,1,a.backgroundColor,a.backgroundAlpha);AmCharts.setCN(d,h,"scrollbar-bg");a.bg=h;e.push(h);h=AmCharts.rect(b,f,g,"#000",.005);e.push(h);
a.invisibleBg=h;h.click(function(){a.handleBgClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()}).touchend(function(){a.handleBgClick()});h=AmCharts.rect(b,f,g,a.selectedBackgroundColor,a.selectedBackgroundAlpha);AmCharts.setCN(d,h,"scrollbar-bg-selected");a.selectedBG=h;e.push(h);f=AmCharts.rect(b,f,g,"#000",.005);a.dragger=f;e.push(f);f.mousedown(function(b){a.handleDragStart(b)}).mouseup(function(){a.handleDragStop()}).mouseover(function(){a.handleDraggerOver()}).mouseout(function(){a.handleMouseOut()}).touchstart(function(b){a.handleDragStart(b)}).touchend(function(){a.handleDragStop()});
f=d.pathToImages;c?(h=f+"dragIconH.gif",f=a.dragIconWidth,c=a.dragIconHeight):(h=f+"dragIcon.gif",c=a.dragIconWidth,f=a.dragIconHeight);g=b.image(h,0,0,c,f);AmCharts.setCN(d,g,"scrollbar-grip-left");h=b.image(h,0,0,c,f);AmCharts.setCN(d,h,"scrollbar-grip-right");var k=10,l=20;d.panEventsEnabled&&(k=25,l=a.scrollbarHeight);var m=AmCharts.rect(b,k,l,"#000",.005),n=AmCharts.rect(b,k,l,"#000",.005);n.translate(-(k-c)/2,-(l-f)/2);m.translate(-(k-c)/2,-(l-f)/2);c=b.set([g,n]);b=b.set([h,m]);a.iconLeft=
c;e.push(a.iconLeft);a.iconRight=b;e.push(b);c.mousedown(function(){a.leftDragStart()}).mouseup(function(){a.leftDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(b){a.leftDragStart()}).touchend(function(){a.leftDragStop()});b.mousedown(function(){a.rightDragStart()}).mouseup(function(){a.rightDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(b){a.rightDragStart()}).touchend(function(){a.rightDragStop()});
AmCharts.ifArray(d.chartData)?e.show():e.hide();a.hideDragIcons();a.clipDragger(!1)}e.translate(a.x,a.y);e.node.style.msTouchAction="none"}},updateScrollbarSize:function(a,b){a=Math.round(a);b=Math.round(b);var c=this.dragger,d,e,f,g;this.rotate?(d=0,e=a,f=this.width+1,g=b-a,c.setAttr("height",b-a),c.setAttr("y",e)):(d=a,e=0,f=b-a,g=this.height+1,c.setAttr("width",b-a),c.setAttr("x",d));this.clipAndUpdate(d,e,f,g)},updateScrollbar:function(){var a,b=!1,c,d,e=this.x,f=this.y,g=this.dragger,h=this.getDBox();
if(h){c=h.x+e;d=h.y+f;var k=h.width,h=h.height,l=this.rotate,m=this.chart,n=this.width,p=this.height,r=m.mouseX,q=m.mouseY;a=this.initialMouse;this.forceClip&&this.clipDragger(!0);m.mouseIsOver&&(this.dragging&&(m=this.initialCoord,l?(a=m+(q-a),0>a&&(a=0),m=p-h,a>m&&(a=m),g.setAttr("y",a)):(a=m+(r-a),0>a&&(a=0),m=n-k,a>m&&(a=m),g.setAttr("x",a)),this.clipDragger(!0)),this.resizingRight&&(l?(a=q-d,a+d>p+f&&(a=p-d+f),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=.1),g.setAttr("height",
a))):(a=r-c,a+c>n+e&&(a=n-c+e),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=.1),g.setAttr("width",a))),this.clipDragger(!0)),this.resizingLeft&&(l?(c=d,d=q,d<f&&(d=f),d>p+f&&(d=p+f),a=!0===b?c-d:h+c-d,0>a?(this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("y",c+h-f)):(0===a&&(a=.1),g.setAttr("y",d-f),g.setAttr("height",a))):(d=r,d<e&&(d=e),d>n+e&&(d=n+e),a=!0===b?c-d:k+c-d,0>a?(this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("x",c+k-e)):(0===a&&(a=.1),g.setAttr("x",d-e),g.setAttr("width",
a))),this.clipDragger(!0)))}},stopForceClip:function(){this.forceClip=!1},clipDragger:function(a){var b=this.getDBox();if(b){var c=b.x,d=b.y,e=b.width,b=b.height,f=!1;if(this.rotate){if(c=0,e=this.width+1,this.clipY!=d||this.clipH!=b)f=!0}else if(d=0,b=this.height+1,this.clipX!=c||this.clipW!=e)f=!0;f&&(this.clipAndUpdate(c,d,e,b),a&&(this.updateOnReleaseOnly||this.dispatchScrollbarEvent()))}},maskGraphs:function(){},clipAndUpdate:function(a,b,c,d){this.clipX=a;this.clipY=b;this.clipW=c;this.clipH=
d;this.selectedBG.clipRect(a,b,c,d);this.updateDragIconPositions();this.maskGraphs(a,b,c,d)},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart;a.hideBalloon();var b=this.getDBox(),c=b.x,d=b.y,e=b.width,b=b.height;this.rotate?(c=d,e=this.height/b):e=this.width/e;a={type:"zoomed",position:c,chart:a,target:this,multiplier:e};this.fire(a.type,a)}},updateDragIconPositions:function(){var a=this.getDBox(),b=a.x,c=a.y,d=this.iconLeft,e=this.iconRight,f,g,h=this.scrollbarHeight;
this.rotate?(f=this.dragIconWidth,g=this.dragIconHeight,d.translate((h-g)/2,c-f/2),e.translate((h-g)/2,c+a.height-f/2)):(f=this.dragIconHeight,g=this.dragIconWidth,d.translate(b-g/2,(h-f)/2),e.translate(b-g/2+a.width,(h-f)/2))},showDragIcons:function(){this.resizeEnabled&&(this.iconLeft.show(),this.iconRight.show())},hideDragIcons:function(){if(!this.resizingLeft&&!this.resizingRight&&!this.dragging){if(this.hideResizeGrips||!this.resizeEnabled)this.iconLeft.hide(),this.iconRight.hide();this.removeCursors()}},
removeCursors:function(){this.chart.setMouseCursor("auto")},relativeZoom:function(a,b){this.dragger.stop();this.multiplier=a;this.position=b;this.updateScrollbarSize(b,this.rotate?b+this.height/a:b+this.width/a)},destroy:function(){this.clear();AmCharts.remove(this.set);AmCharts.remove(this.iconRight);AmCharts.remove(this.iconLeft)},clear:function(){clearInterval(this.interval)},handleDragStart:function(){var a=this.chart;this.dragger.stop();this.removeCursors();this.dragging=!0;var b=this.getDBox();
this.rotate?(this.initialCoord=b.y,this.initialMouse=a.mouseY):(this.initialCoord=b.x,this.initialMouse=a.mouseX)},handleDragStop:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=!1,this.dispatchScrollbarEvent());this.dragging=!1;this.mouseIsOver&&this.removeCursors();this.updateScrollbar()},handleDraggerOver:function(){this.handleMouseOver()},leftDragStart:function(){this.dragger.stop();this.resizingLeft=!0},leftDragStop:function(){this.resizingLeft=!1;this.mouseIsOver||
this.removeCursors();this.updateOnRelease()},rightDragStart:function(){this.dragger.stop();this.resizingRight=!0},rightDragStop:function(){this.resizingRight=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},iconRollOut:function(){this.removeCursors()},iconRollOver:function(){this.rotate?this.chart.setMouseCursor("n-resize"):this.chart.setMouseCursor("e-resize");this.handleMouseOver()},getDBox:function(){if(this.dragger)return this.dragger.getBBox()},handleBgClick:function(){var a=
this;if(!a.resizingRight&&!a.resizingLeft){a.zooming=!0;var b,c,d=a.scrollDuration,e=a.dragger;b=a.getDBox();var f=b.height,g=b.width;c=a.chart;var h=a.y,k=a.x,l=a.rotate;l?(b="y",c=c.mouseY-f/2-h,c=AmCharts.fitToBounds(c,0,a.height-f)):(b="x",c=c.mouseX-g/2-k,c=AmCharts.fitToBounds(c,0,a.width-g));a.updateOnReleaseOnly?(a.skipEvent=!1,e.setAttr(b,c),a.dispatchScrollbarEvent(),a.clipDragger()):(c=Math.round(c),l?e.animate({y:c},d,">"):e.animate({x:c},d,">"),a.forceClip=!0,clearTimeout(a.forceTO),
a.forceTO=setTimeout(function(){a.stopForceClip.call(a)},5E3*d))}},updateOnRelease:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=!1,this.dispatchScrollbarEvent())},handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||this.resizingRight||this.dragging)this.updateOnRelease(),this.removeCursors();this.mouseIsOver=this.dragging=this.resizingRight=this.resizingLeft=!1;this.hideDragIcons();this.updateScrollbar()}},handleMouseOver:function(){this.mouseIsOver=!0;
this.showDragIcons()},handleMouseOut:function(){this.mouseIsOver=!1;this.hideDragIcons()}});AmCharts.ChartScrollbar=AmCharts.Class({inherits:AmCharts.SimpleChartScrollbar,construct:function(a){this.cname="ChartScrollbar";AmCharts.ChartScrollbar.base.construct.call(this,a);this.enabled=!0;this.graphLineColor="#BBBBBB";this.graphLineAlpha=0;this.graphFillColor="#BBBBBB";this.graphFillAlpha=1;this.selectedGraphLineColor="#888888";this.selectedGraphLineAlpha=0;this.selectedGraphFillColor="#888888";this.selectedGraphFillAlpha=1;this.gridCount=0;this.gridColor="#FFFFFF";this.gridAlpha=.7;this.skipEvent=
this.autoGridCount=!1;this.color="#FFFFFF";this.scrollbarCreated=!1;this.offset=0;AmCharts.applyTheme(this,a,this.cname)},init:function(){var a=this.categoryAxis,b=this.chart;a||(this.categoryAxis=a=new AmCharts.CategoryAxis);a.chart=b;a.id="scrollbar";a.dateFormats=b.categoryAxis.dateFormats;a.markPeriodChange=b.categoryAxis.markPeriodChange;a.boldPeriodBeginning=b.categoryAxis.boldPeriodBeginning;a.axisItemRenderer=AmCharts.RecItem;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;
a.inside=!0;a.fontSize=this.fontSize;a.tickLength=0;a.axisAlpha=0;AmCharts.isString(this.graph)&&(this.graph=AmCharts.getObjById(b.graphs,this.graph));if(a=this.graph){var c=this.valueAxis;c||(this.valueAxis=c=new AmCharts.ValueAxis,c.visible=!1,c.scrollbar=!0,c.axisItemRenderer=AmCharts.RecItem,c.axisRenderer=AmCharts.RecAxis,c.guideFillRenderer=AmCharts.RecFill,c.labelsEnabled=!1,c.chart=b);b=this.unselectedGraph;b||(b=new AmCharts.AmGraph,b.scrollbar=!0,this.unselectedGraph=b,b.negativeBase=a.negativeBase,
b.noStepRisers=a.noStepRisers);b=this.selectedGraph;b||(b=new AmCharts.AmGraph,b.scrollbar=!0,this.selectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers)}this.scrollbarCreated=!0},draw:function(){var a=this;AmCharts.ChartScrollbar.base.draw.call(a);a.scrollbarCreated||a.init();var b=a.chart,c=b.chartData,d=a.categoryAxis,e=a.rotate,f=a.x,g=a.y,h=a.width,k=a.height,l=b.categoryAxis,m=a.set;d.setOrientation(!e);d.parseDates=l.parseDates;d.rotate=e;d.equalSpacing=l.equalSpacing;
d.minPeriod=l.minPeriod;d.startOnAxis=l.startOnAxis;d.viW=h;d.viH=k;d.width=h;d.height=k;d.gridCount=a.gridCount;d.gridColor=a.gridColor;d.gridAlpha=a.gridAlpha;d.color=a.color;d.tickLength=0;d.axisAlpha=0;d.autoGridCount=a.autoGridCount;d.parseDates&&!d.equalSpacing&&d.timeZoom(b.firstTime,b.lastTime);d.zoom(0,c.length-1);if(l=a.graph){var n=a.valueAxis,p=l.valueAxis;n.id=p.id;n.rotate=e;n.setOrientation(e);n.width=h;n.height=k;n.viW=h;n.viH=k;n.dataProvider=c;n.reversed=p.reversed;n.logarithmic=
p.logarithmic;n.gridAlpha=0;n.axisAlpha=0;m.push(n.set);e?(n.y=g,n.x=0):(n.x=f,n.y=0);var f=Infinity,g=-Infinity,r;for(r=0;r<c.length;r++){var q=c[r].axes[p.id].graphs[l.id].values,t;for(t in q)if(q.hasOwnProperty(t)&&"percents"!=t&&"total"!=t){var z=q[t];z<f&&(f=z);z>g&&(g=z)}}Infinity!=f&&(n.minimum=f);-Infinity!=g&&(n.maximum=g+.1*(g-f));f==g&&(--n.minimum,n.maximum+=1);void 0!==a.minimum&&(n.minimum=a.minimum);void 0!==a.maximum&&(n.maximum=a.maximum);n.zoom(0,c.length-1);t=a.unselectedGraph;
t.id=l.id;t.bcn="scrollbar-graph-";t.rotate=e;t.chart=b;t.data=c;t.valueAxis=n;t.chart=l.chart;t.categoryAxis=a.categoryAxis;t.periodSpan=l.periodSpan;t.valueField=l.valueField;t.openField=l.openField;t.closeField=l.closeField;t.highField=l.highField;t.lowField=l.lowField;t.lineAlpha=a.graphLineAlpha;t.lineColorR=a.graphLineColor;t.fillAlphas=a.graphFillAlpha;t.fillColorsR=a.graphFillColor;t.connect=l.connect;t.hidden=l.hidden;t.width=h;t.height=k;t.pointPosition=l.pointPosition;t.stepDirection=l.stepDirection;
t.periodSpan=l.periodSpan;p=a.selectedGraph;p.id=l.id;p.bcn=t.bcn+"-selected";p.rotate=e;p.chart=b;p.data=c;p.valueAxis=n;p.chart=l.chart;p.categoryAxis=d;p.periodSpan=l.periodSpan;p.valueField=l.valueField;p.openField=l.openField;p.closeField=l.closeField;p.highField=l.highField;p.lowField=l.lowField;p.lineAlpha=a.selectedGraphLineAlpha;p.lineColorR=a.selectedGraphLineColor;p.fillAlphas=a.selectedGraphFillAlpha;p.fillColorsR=a.selectedGraphFillColor;p.connect=l.connect;p.hidden=l.hidden;p.width=
h;p.height=k;p.pointPosition=l.pointPosition;p.stepDirection=l.stepDirection;p.periodSpan=l.periodSpan;b=a.graphType;b||(b=l.type);t.type=b;p.type=b;c=c.length-1;t.zoom(0,c);p.zoom(0,c);p.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});t.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});m.push(t.set);m.push(p.set)}m.push(d.set);m.push(d.labelsSet);
a.bg.toBack();a.invisibleBg.toFront();a.dragger.toFront();a.iconLeft.toFront();a.iconRight.toFront()},timeZoom:function(a,b,c){this.startTime=a;this.endTime=b;this.timeDifference=b-a;this.skipEvent=!AmCharts.toBoolean(c);this.zoomScrollbar();this.skipEvent||this.dispatchScrollbarEvent()},zoom:function(a,b){this.start=a;this.end=b;this.skipEvent=!0;this.zoomScrollbar()},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart.chartData,b,c,d=this.dragger.getBBox();
b=d.x;var e=d.y,f=d.width,d=d.height,g=this.chart;this.rotate?(b=e,c=d):c=f;f={type:"zoomed",target:this};f.chart=g;var h=this.categoryAxis,k=this.stepWidth,e=g.minSelectedTime,d=!1;if(h.parseDates&&!h.equalSpacing){if(a=g.lastTime,g=g.firstTime,h.minDuration(),h=Math.round(b/k)+g,b=this.dragging?h+this.timeDifference:Math.round((b+c)/k)+g,h>b&&(h=b),0<e&&b-h<e&&(b=Math.round(h+(b-h)/2),d=Math.round(e/2),h=b-d,b+=d,d=!0),b>a&&(b=a),b-e<h&&(h=b-e),h<g&&(h=g),h+e>b&&(b=h+e),h!=this.startTime||b!=this.endTime)this.startTime=
h,this.endTime=b,f.start=h,f.end=b,f.startDate=new Date(h),f.endDate=new Date(b),this.fire(f.type,f)}else if(h.startOnAxis||(b+=k/2),c-=this.stepWidth/2,e=h.xToIndex(b),b=h.xToIndex(b+c),e!=this.start||this.end!=b)h.startOnAxis&&(this.resizingRight&&e==b&&b++,this.resizingLeft&&e==b&&(0<e?e--:b=1)),this.start=e,this.end=this.dragging?this.start+this.difference:b,f.start=this.start,f.end=this.end,h.parseDates&&(a[this.start]&&(f.startDate=new Date(a[this.start].time)),a[this.end]&&(f.endDate=new Date(a[this.end].time))),
this.fire(f.type,f);d&&this.zoomScrollbar()}},zoomScrollbar:function(){var a,b;a=this.chart;var c=a.chartData,d=this.categoryAxis;d.parseDates&&!d.equalSpacing?(c=d.stepWidth,d=a.firstTime,a=c*(this.startTime-d),b=c*(this.endTime-d)):(a=c[this.start].x[d.id],b=c[this.end].x[d.id],c=d.stepWidth,d.startOnAxis||(d=c/2,a-=d,b+=d));this.stepWidth=c;this.updateScrollbarSize(a,b)},maskGraphs:function(a,b,c,d){var e=this.selectedGraph;e&&e.set.clipRect(a,b,c,d)},handleDragStart:function(){AmCharts.ChartScrollbar.base.handleDragStart.call(this);
this.difference=this.end-this.start;this.timeDifference=this.endTime-this.startTime;0>this.timeDifference&&(this.timeDifference=0)},handleBackgroundClick:function(){AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);this.dragging||(this.difference=this.end-this.start,this.timeDifference=this.endTime-this.startTime,0>this.timeDifference&&(this.timeDifference=0))}});AmCharts.AmBalloon=AmCharts.Class({construct:function(a){this.cname="AmBalloon";this.enabled=!0;this.fillColor="#FFFFFF";this.fillAlpha=.8;this.borderThickness=2;this.borderColor="#FFFFFF";this.borderAlpha=1;this.cornerRadius=0;this.maxWidth=220;this.horizontalPadding=8;this.verticalPadding=4;this.pointerWidth=6;this.pointerOrientation="V";this.color="#000000";this.adjustBorderColor=!0;this.show=this.follow=this.showBullet=!1;this.bulletSize=3;this.shadowAlpha=.4;this.shadowColor="#000000";this.fadeOutDuration=
this.animationDuration=.3;this.fixedPosition=!1;this.offsetY=6;this.offsetX=1;this.textAlign="center";AmCharts.isModern||(this.offsetY*=1.5);AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this.pointToX,b=this.pointToY;this.deltaSignX=this.deltaSignY=1;var c=this.chart;AmCharts.VML&&(this.fadeOutDuration=0);this.xAnim&&c.stopAnim(this.xAnim);this.yAnim&&c.stopAnim(this.yAnim);if(!isNaN(a)){var d=this.follow,e=c.container,f=this.set;AmCharts.remove(f);this.removeDiv();f=e.set();f.node.style.pointerEvents=
"none";this.set=f;c.balloonsSet.push(f);if(this.show){var g=this.l,h=this.t,k=this.r,l=this.b,m=this.balloonColor,n=this.fillColor,p=this.borderColor,r=n;void 0!=m&&(this.adjustBorderColor?r=p=m:n=m);var q=this.horizontalPadding,t=this.verticalPadding,z=this.pointerWidth,x=this.pointerOrientation,u=this.cornerRadius,w=c.fontFamily,y=this.fontSize;void 0==y&&(y=c.fontSize);var m=document.createElement("div"),A=c.classNamePrefix;m.className=A+"-balloon-div";this.className&&(m.className=m.className+
" "+A+"-balloon-div-"+this.className);A=m.style;A.pointerEvents="none";A.position="absolute";var C=this.minWidth,B="";isNaN(C)||(B="min-width:"+(C-2*q)+"px; ");m.innerHTML='<div style="text-align:'+this.textAlign+"; "+B+"max-width:"+this.maxWidth+"px; font-size:"+y+"px; color:"+this.color+"; font-family:"+w+'">'+this.text+"</div>";c.chartDiv.appendChild(m);this.textDiv=m;y=m.offsetWidth;w=m.offsetHeight;m.clientHeight&&(y=m.clientWidth,w=m.clientHeight);w+=2*t;B=y+2*q;!isNaN(C)&&B<C&&(B=C);window.opera&&
(w+=2);var H=!1,y=this.offsetY;c.handDrawn&&(y+=c.handDrawScatter+2);"H"!=x?(C=a-B/2,b<h+w+10&&"down"!=x?(H=!0,d&&(b+=y),y=b+z,this.deltaSignY=-1):(d&&(b-=y),y=b-w-z,this.deltaSignY=1)):(2*z>w&&(z=w/2),y=b-w/2,a<g+(k-g)/2?(C=a+z,this.deltaSignX=-1):(C=a-B-z,this.deltaSignX=1));y+w>=l&&(y=l-w);y<h&&(y=h);C<g&&(C=g);C+B>k&&(C=k-B);var h=y+t,l=C+q,t=this.shadowAlpha,D=this.shadowColor,q=this.borderThickness,I=this.bulletSize,X;0<u||0===z?(0<t&&(a=AmCharts.rect(e,B,w,n,0,q+1,D,t,this.cornerRadius),AmCharts.isModern?
a.translate(1,1):a.translate(4,4),f.push(a)),n=AmCharts.rect(e,B,w,n,this.fillAlpha,q,p,this.borderAlpha,this.cornerRadius),this.showBullet&&(X=AmCharts.circle(e,I,r,this.fillAlpha),f.push(X))):(r=[],u=[],"H"!=x?(g=a-C,g>B-z&&(g=B-z),g<z&&(g=z),r=[0,g-z,a-C,g+z,B,B,0,0],u=H?[0,0,b-y,0,0,w,w,0]:[w,w,b-y,w,w,0,0,w]):(r=b-y,r>w-z&&(r=w-z),r<z&&(r=z),u=[0,r-z,b-y,r+z,w,w,0,0],r=a<g+(k-g)/2?[0,0,C<a?0:a-C,0,0,B,B,0]:[B,B,C+B>a?B:a-C,B,B,0,0,B]),0<t&&(a=AmCharts.polygon(e,r,u,n,0,q,D,t),a.translate(1,1),
f.push(a)),n=AmCharts.polygon(e,r,u,n,this.fillAlpha,q,p,this.borderAlpha));this.bg=n;f.push(n);n.toFront();AmCharts.setCN(c,n,"balloon-bg");this.className&&AmCharts.setCN(c,n,"balloon-bg-"+this.className);e=1*this.deltaSignX;A.left=l+"px";A.top=h+"px";f.translate(C-e,y);n=n.getBBox();this.bottom=y+w+1;this.yPos=n.y+y;X&&X.translate(this.pointToX-C+e,b-y);b=this.animationDuration;0<this.animationDuration&&!d&&!isNaN(this.prevX)&&(f.translate(this.prevX,this.prevY),f.animate({translate:C-e+","+y},
b,"easeOutSine"),m&&(A.left=this.prevTX+"px",A.top=this.prevTY+"px",this.xAnim=c.animate({node:m},"left",this.prevTX,l,b,"easeOutSine","px"),this.yAnim=c.animate({node:m},"top",this.prevTY,h,b,"easeOutSine","px")));this.prevX=C-e;this.prevY=y;this.prevTX=l;this.prevTY=h}}},followMouse:function(){if(this.follow&&this.show){var a=this.chart.mouseX-this.offsetX*this.deltaSignX,b=this.chart.mouseY;this.pointToX=a;this.pointToY=b;if(a!=this.previousX||b!=this.previousY)if(this.previousX=a,this.previousY=
b,0===this.cornerRadius)this.draw();else{var c=this.set;if(c){var d=c.getBBox(),a=a-d.width/2,e=b-d.height-10;a<this.l&&(a=this.l);a>this.r-d.width&&(a=this.r-d.width);e<this.t&&(e=b+10);c.translate(a,e);b=this.textDiv.style;b.left=a+this.horizontalPadding+"px";b.top=e+this.verticalPadding+"px"}}}},changeColor:function(a){this.balloonColor=a},setBounds:function(a,b,c,d){this.l=a;this.t=b;this.r=c;this.b=d;this.destroyTO&&clearTimeout(this.destroyTO)},showBalloon:function(a){this.text=a;this.show=
!0;this.destroyTO&&clearTimeout(this.destroyTO);a=this.chart;this.fadeAnim1&&a.stopAnim(this.fadeAnim1);this.fadeAnim2&&a.stopAnim(this.fadeAnim2);this.draw()},hide:function(){var a=this,b=a.fadeOutDuration,c=a.chart;if(0<b){a.destroyTO=setTimeout(function(){a.destroy.call(a)},1E3*b);a.follow=!1;a.show=!1;var d=a.set;d&&(d.setAttr("opacity",a.fillAlpha),a.fadeAnim1=d.animate({opacity:0},b,"easeInSine"));a.textDiv&&(a.fadeAnim2=c.animate({node:a.textDiv},"opacity",1,0,b,"easeInSine",""))}else a.show=
!1,a.follow=!1,a.destroy()},setPosition:function(a,b,c){this.pointToX=a;this.pointToY=b;c&&(a==this.previousX&&b==this.previousY||this.draw());this.previousX=a;this.previousY=b},followCursor:function(a){var b=this;(b.follow=a)?(b.pShowBullet=b.showBullet,b.showBullet=!1):void 0!==b.pShowBullet&&(b.showBullet=b.pShowBullet);clearInterval(b.interval);var c=b.chart.mouseX,d=b.chart.mouseY;!isNaN(c)&&a&&(b.pointToX=c-b.offsetX*b.deltaSignX,b.pointToY=d,b.followMouse(),b.interval=setInterval(function(){b.followMouse.call(b)},
40))},removeDiv:function(){if(this.textDiv){var a=this.textDiv.parentNode;a&&a.removeChild(this.textDiv)}},destroy:function(){clearInterval(this.interval);AmCharts.remove(this.set);this.removeDiv();this.set=null}});AmCharts.AmCoordinateChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(a){AmCharts.AmCoordinateChart.base.construct.call(this,a);this.theme=a;this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.startAlpha=1;this.startDuration=0;this.startEffect="elastic";this.sequencedAnimation=!0;this.colors="#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
this.balloonDateFormat="MMM DD, YYYY";this.valueAxes=[];this.graphs=[];this.guides=[];this.gridAboveGraphs=!1;AmCharts.applyTheme(this,a,"AmCoordinateChart")},initChart:function(){AmCharts.AmCoordinateChart.base.initChart.call(this);var a=this.categoryAxis;a&&(this.categoryAxis=AmCharts.processObject(a,AmCharts.CategoryAxis,this.theme));this.processValueAxes();this.createValueAxes();this.processGraphs();this.processGuides();AmCharts.VML&&(this.startAlpha=1);this.setLegendData(this.graphs);this.gridAboveGraphs&&
this.gridSet.toFront()},createValueAxes:function(){if(0===this.valueAxes.length){var a=new AmCharts.ValueAxis;this.addValueAxis(a)}},parseData:function(){this.processValueAxes();this.processGraphs()},parseSerialData:function(){var a=this.graphs,b,c={},d=this.seriesIdField;d||(d=this.categoryField);this.chartData=[];var e=this.dataProvider;if(e){var f=!1,g,h=this.categoryAxis,k,l,m;h&&(f=h.parseDates,k=h.forceShowField,m=h.classNameField,l=h.labelColorField,g=h.categoryFunction);var n,p,r={},q;f&&
(b=AmCharts.extractPeriod(h.minPeriod),n=b.period,p=b.count,q=AmCharts.getPeriodDuration(n,p));var t={};this.lookupTable=t;var z,x=this.dataDateFormat,u={};for(z=0;z<e.length;z++){var w={},y=e[z];b=y[this.categoryField];w.dataContext=y;w.category=g?g(b,y,h):String(b);k&&(w.forceShow=y[k]);m&&(w.className=y[m]);l&&(w.labelColor=y[l]);t[y[d]]=w;if(f&&(b=h.categoryFunction?h.categoryFunction(b,y,h):b instanceof Date?AmCharts.newDate(b,h.minPeriod):x?AmCharts.stringToDate(b,x):new Date(b),b=AmCharts.resetDateToMin(b,
n,p,h.firstDayOfWeek),w.category=b,w.time=b.getTime(),isNaN(w.time)))continue;var A=this.valueAxes;w.axes={};w.x={};var C;for(C=0;C<A.length;C++){var B=A[C].id;w.axes[B]={};w.axes[B].graphs={};var H;for(H=0;H<a.length;H++){b=a[H];var D=b.id,I=1.1;isNaN(b.gapPeriod)||(I=b.gapPeriod);var X=b.periodValue;if(b.valueAxis.id==B){w.axes[B].graphs[D]={};var ca={};ca.index=z;var oa=y;b.dataProvider&&(oa=c);ca.values=this.processValues(oa,b,X);!b.connect&&u&&u[D]&&w.time-r[D]>=q*I&&(u[D].gap=!0);this.processFields(b,
ca,oa);ca.category=w.category;ca.serialDataItem=w;ca.graph=b;w.axes[B].graphs[D]=ca;r[D]=w.time;u[D]=ca}}}this.chartData[z]=w}}for(c=0;c<a.length;c++)b=a[c],b.dataProvider&&this.parseGraphData(b)},processValues:function(a,b,c){var d={},e,f=!1;"candlestick"!=b.type&&"ohlc"!=b.type||""===c||(f=!0);e=Number(a[b.valueField+c]);isNaN(e)||(d.value=e);e=Number(a[b.errorField+c]);isNaN(e)||(d.error=e);f&&(c="Open");e=Number(a[b.openField+c]);isNaN(e)||(d.open=e);f&&(c="Close");e=Number(a[b.closeField+c]);
isNaN(e)||(d.close=e);f&&(c="Low");e=Number(a[b.lowField+c]);isNaN(e)||(d.low=e);f&&(c="High");e=Number(a[b.highField+c]);isNaN(e)||(d.high=e);return d},parseGraphData:function(a){var b=a.dataProvider,c=a.seriesIdField;c||(c=this.seriesIdField);c||(c=this.categoryField);var d;for(d=0;d<b.length;d++){var e=b[d],f=this.lookupTable[String(e[c])],g=a.valueAxis.id;f&&(g=f.axes[g].graphs[a.id],g.serialDataItem=f,g.values=this.processValues(e,a,a.periodValue),this.processFields(a,g,e))}},addValueAxis:function(a){a.chart=
this;this.valueAxes.push(a);this.validateData()},removeValueAxesAndGraphs:function(){var a=this.valueAxes,b;for(b=a.length-1;-1<b;b--)this.removeValueAxis(a[b])},removeValueAxis:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--){var d=b[c];d&&d.valueAxis==a&&this.removeGraph(d)}b=this.valueAxes;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);this.validateData()},addGraph:function(a){this.graphs.push(a);this.chooseGraphColor(a,this.graphs.length-1);this.validateData()},removeGraph:function(a){var b=
this.graphs,c;for(c=b.length-1;0<=c;c--)b[c]==a&&(b.splice(c,1),a.destroy());this.validateData()},processValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],c=AmCharts.processObject(c,AmCharts.ValueAxis,this.theme);a[b]=c;c.chart=this;c.id||(c.id="valueAxisAuto"+b+"_"+(new Date).getTime());void 0===c.usePrefixes&&(c.usePrefixes=this.usePrefixes)}},processGuides:function(){var a=this.guides,b=this.categoryAxis;if(a)for(var c=0;c<a.length;c++){var d=a[c];(void 0!==d.category||
void 0!==d.date)&&b&&b.addGuide(d);d.id||(d.id="guideAuto"+c+"_"+(new Date).getTime());var e=d.valueAxis;e?(AmCharts.isString(e)&&(e=this.getValueAxisById(e)),e?e.addGuide(d):this.valueAxes[0].addGuide(d)):isNaN(d.value)||this.valueAxes[0].addGuide(d)}},processGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b],c=AmCharts.processObject(c,AmCharts.AmGraph,this.theme);a[b]=c;this.chooseGraphColor(c,b);c.chart=this;AmCharts.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));
c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.id||(c.id="graphAuto"+b+"_"+(new Date).getTime())}},formatString:function(a,b,c){var d=b.graph,e=d.valueAxis;e.duration&&b.values.value&&(e=AmCharts.formatDuration(b.values.value,e.duration,"",e.durationUnits,e.maxInterval,e.numberFormatter),a=a.split("[[value]]").join(e));a=AmCharts.massReplace(a,{"[[title]]":d.title,"[[description]]":b.description});a=c?AmCharts.fixNewLines(a):AmCharts.fixBrakes(a);return a=AmCharts.cleanFromEmpty(a)},getBalloonColor:function(a,
b,c){var d=a.lineColor,e=a.balloonColor;c&&(e=d);c=a.fillColorsR;"object"==typeof c?d=c[0]:void 0!==c&&(d=c);b.isNegative&&(c=a.negativeLineColor,a=a.negativeFillColors,"object"==typeof a?c=a[0]:void 0!==a&&(c=a),void 0!==c&&(d=c));void 0!==b.color&&(d=b.color);void 0===e&&(e=d);return e},getGraphById:function(a){return AmCharts.getObjById(this.graphs,a)},getValueAxisById:function(a){return AmCharts.getObjById(this.valueAxes,a)},processFields:function(a,b,c){if(a.itemColors){var d=a.itemColors,e=
b.index;b.color=e<d.length?d[e]:AmCharts.randomColor()}d="lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className".split(" ");for(e=0;e<d.length;e++){var f=d[e],g=a[f+"Field"];g&&(g=c[g],AmCharts.isDefined(g)&&(b[f]=g))}b.dataContext=c},chooseGraphColor:function(a,b){if(a.lineColor)a.lineColorR=a.lineColor;else{var c;c=this.colors.length>b?this.colors[b]:AmCharts.randomColor();a.lineColorR=c}a.fillColorsR=a.fillColors?
a.fillColors:a.lineColorR;a.bulletBorderColorR=a.bulletBorderColor?a.bulletBorderColor:a.useLineColorForBulletBorder?a.lineColorR:a.bulletColor;a.bulletColorR=a.bulletColor?a.bulletColor:a.lineColorR;if(c=this.patterns)a.pattern=c[b]},handleLegendEvent:function(a){var b=a.type;a=a.dataItem;if(!this.legend.data&&a){var c=a.hidden,d=a.showBalloon;switch(b){case "clickMarker":this.textClickEnabled&&(d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a));break;case "clickLabel":d?this.hideGraphsBalloon(a):
this.showGraphsBalloon(a);break;case "rollOverItem":c||this.highlightGraph(a);break;case "rollOutItem":c||this.unhighlightGraph();break;case "hideItem":this.hideGraph(a);break;case "showItem":this.showGraph(a)}}},highlightGraph:function(a){var b=this.graphs,c,d=.2;this.legend&&(d=this.legend.rollOverGraphAlpha);if(1!=d)for(c=0;c<b.length;c++){var e=b[c];e!=a&&e.changeOpacity(d)}},unhighlightGraph:function(){var a;this.legend&&(a=this.legend.rollOverGraphAlpha);if(1!=a){a=this.graphs;var b;for(b=0;b<
a.length;b++)a[b].changeOpacity(1)}},showGraph:function(a){a.switchable&&(a.hidden=!1,this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),this.chartCreated&&this.initChart())},hideGraph:function(a){a.switchable&&(this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),a.hidden=!0,this.chartCreated&&this.initChart())},hideGraphsBalloon:function(a){a.showBalloon=!1;this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=!0;this.updateLegend()},updateLegend:function(){this.legend&&
this.legend.invalidateSize()},resetAnimation:function(){var a=this.graphs;if(a){var b;for(b=0;b<a.length;b++)a[b].animationPlayed=!1}},animateAgain:function(){this.resetAnimation();this.validateNow()}});AmCharts.AmSlicedChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(a){this.createEvents("rollOverSlice","rollOutSlice","clickSlice","pullOutSlice","pullInSlice","rightClickSlice");AmCharts.AmSlicedChart.base.construct.call(this,a);this.colors="#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");this.alpha=1;this.groupPercent=0;this.groupedTitle="Other";this.groupedPulled=
!1;this.groupedAlpha=1;this.marginLeft=0;this.marginBottom=this.marginTop=10;this.marginRight=0;this.hoverAlpha=1;this.outlineColor="#FFFFFF";this.outlineAlpha=0;this.outlineThickness=1;this.startAlpha=0;this.startDuration=1;this.startEffect="bounce";this.sequencedAnimation=!0;this.pullOutDuration=1;this.pullOutEffect="bounce";this.pullOnHover=this.pullOutOnlyOne=!1;this.labelsEnabled=!0;this.labelTickColor="#000000";this.labelTickAlpha=.2;this.hideLabelsPercent=0;this.urlTarget="_self";this.autoMarginOffset=
10;this.gradientRatio=[];this.maxLabelWidth=200;AmCharts.applyTheme(this,a,"AmSlicedChart")},initChart:function(){AmCharts.AmSlicedChart.base.initChart.call(this);this.dataChanged&&(this.parseData(),this.dispatchDataUpdated=!0,this.dataChanged=!1,this.setLegendData(this.chartData));this.drawChart()},handleLegendEvent:function(a){var b=a.type,c=a.dataItem,d=this.legend;if(!d.data&&c){var e=c.hidden;a=a.event;switch(b){case "clickMarker":e||d.switchable||this.clickSlice(c,a);break;case "clickLabel":e||
this.clickSlice(c,a,!1);break;case "rollOverItem":e||this.rollOverSlice(c,!1,a);break;case "rollOutItem":e||this.rollOutSlice(c,a);break;case "hideItem":this.hideSlice(c,a);break;case "showItem":this.showSlice(c,a)}}},invalidateVisibility:function(){this.recalculatePercents();this.initChart();var a=this.legend;a&&a.invalidateSize()},addEventListeners:function(a,b){var c=this;a.mouseover(function(a){c.rollOverSlice(b,!0,a)}).mouseout(function(a){c.rollOutSlice(b,a)}).touchend(function(a){c.rollOverSlice(b,
a);c.panEventsEnabled&&c.clickSlice(b,a)}).touchstart(function(a){c.rollOverSlice(b,a)}).click(function(a){c.clickSlice(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},formatString:function(a,b,c){a=AmCharts.formatValue(a,b,["value"],this.nf,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,b,["percents"],this.pf);a=AmCharts.massReplace(a,{"[[title]]":b.title,"[[description]]":b.description});-1!=a.indexOf("[[")&&(a=AmCharts.formatDataContextValue(a,
b.dataContext));a=c?AmCharts.fixNewLines(a):AmCharts.fixBrakes(a);return a=AmCharts.cleanFromEmpty(a)},startSlices:function(){var a;for(a=0;a<this.chartData.length;a++)0<this.startDuration&&this.sequencedAnimation?this.setStartTO(a):this.startSlice(this.chartData[a])},setStartTO:function(a){var b=this;a=setTimeout(function(){b.startSequenced.call(b)},b.startDuration/b.chartData.length*500*a);b.timeOuts.push(a)},pullSlices:function(a){var b=this.chartData,c;for(c=0;c<b.length;c++){var d=b[c];d.pulled&&
this.pullSlice(d,1,a)}},startSequenced:function(){var a=this.chartData,b;for(b=0;b<a.length;b++)if(!a[b].started){this.startSlice(this.chartData[b]);break}},startSlice:function(a){a.started=!0;var b=a.wedge,c=this.startDuration;b&&0<c&&(0<a.alpha&&b.show(),b.translate(a.startX,a.startY),b.animate({opacity:1,translate:"0,0"},c,this.startEffect))},showLabels:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(0<c.alpha){var d=c.label;d&&d.show();(c=c.tick)&&c.show()}}},showSlice:function(a){isNaN(a)?
a.hidden=!1:this.chartData[a].hidden=!1;this.invalidateVisibility()},hideSlice:function(a){isNaN(a)?a.hidden=!0:this.chartData[a].hidden=!0;this.hideBalloon();this.invalidateVisibility()},rollOverSlice:function(a,b,c){isNaN(a)||(a=this.chartData[a]);clearTimeout(this.hoverInt);if(!a.hidden){this.pullOnHover&&this.pullSlice(a,1);1>this.hoverAlpha&&a.wedge&&a.wedge.attr({opacity:this.hoverAlpha});var d=a.balloonX,e=a.balloonY;a.pulled&&(d+=a.pullX,e+=a.pullY);var f=this.formatString(this.balloonText,
a,!0),g=this.balloonFunction;g&&(f=g(a,f));g=AmCharts.adjustLuminosity(a.color,-.15);f?this.showBalloon(f,g,b,d,e):this.hideBalloon();a={type:"rollOverSlice",dataItem:a,chart:this,event:c};this.fire(a.type,a)}},rollOutSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);a.wedge&&a.wedge.attr({opacity:1});this.hideBalloon();var c={type:"rollOutSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},clickSlice:function(a,b,c){isNaN(a)||(a=this.chartData[a]);a.pulled?this.pullSlice(a,0):this.pullSlice(a,
1);AmCharts.getURL(a.url,this.urlTarget);c||(a={type:"clickSlice",dataItem:a,chart:this,event:b},this.fire(a.type,a))},handleRightClick:function(a,b){isNaN(a)||(a=this.chartData[a]);var c={type:"rightClickSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},drawTicks:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(c.label){var d=c.ty,d=AmCharts.line(this.container,[c.tx0,c.tx,c.tx2],[c.ty0,d,d],this.labelTickColor,this.labelTickAlpha);AmCharts.setCN(this,d,this.type+
"-tick");AmCharts.setCN(this,d,c.className,!0);c.tick=d;c.wedge.push(d)}}},initialStart:function(){var a=this,b=a.startDuration,c=setTimeout(function(){a.showLabels.call(a)},1E3*b);a.timeOuts.push(c);a.chartCreated?a.pullSlices(!0):(a.startSlices(),0<b?(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b)):a.pullSlices(!0))},pullSlice:function(a,b,c){var d=this.pullOutDuration;!0===c&&(d=0);(c=a.wedge)&&(0<d?c.animate({translate:b*a.pullX+","+b*a.pullY},d,this.pullOutEffect):c.translate(b*
a.pullX,b*a.pullY));1==b?(a.pulled=!0,this.pullOutOnlyOne&&this.pullInAll(a.index),a={type:"pullOutSlice",dataItem:a,chart:this}):(a.pulled=!1,a={type:"pullInSlice",dataItem:a,chart:this});this.fire(a.type,a)},pullInAll:function(a){var b=this.chartData,c;for(c=0;c<this.chartData.length;c++)c!=a&&b[c].pulled&&this.pullSlice(b[c],0)},pullOutAll:function(a){a=this.chartData;var b;for(b=0;b<a.length;b++)a[b].pulled||this.pullSlice(a[b],1)},parseData:function(){var a=[];this.chartData=a;var b=this.dataProvider;
isNaN(this.pieAlpha)||(this.alpha=this.pieAlpha);if(void 0!==b){var c=b.length,d=0,e,f,g;for(e=0;e<c;e++){f={};var h=b[e];f.dataContext=h;f.value=Number(h[this.valueField]);(g=h[this.titleField])||(g="");f.title=g;f.pulled=AmCharts.toBoolean(h[this.pulledField],!1);(g=h[this.descriptionField])||(g="");f.description=g;f.labelRadius=Number(h[this.labelRadiusField]);f.switchable=!0;f.className=h[this.classNameField];f.url=h[this.urlField];g=h[this.patternField];!g&&this.patterns&&(g=this.patterns[e]);
f.pattern=g;f.visibleInLegend=AmCharts.toBoolean(h[this.visibleInLegendField],!0);g=h[this.alphaField];f.alpha=void 0!==g?Number(g):this.alpha;g=h[this.colorField];void 0!==g&&(f.color=AmCharts.toColor(g));f.labelColor=AmCharts.toColor(h[this.labelColorField]);d+=f.value;f.hidden=!1;a[e]=f}for(e=b=0;e<c;e++)f=a[e],f.percents=f.value/d*100,f.percents<this.groupPercent&&b++;1<b&&(this.groupValue=0,this.removeSmallSlices(),a.push({title:this.groupedTitle,value:this.groupValue,percents:this.groupValue/
d*100,pulled:this.groupedPulled,color:this.groupedColor,url:this.groupedUrl,description:this.groupedDescription,alpha:this.groupedAlpha,pattern:this.groupedPattern,className:this.groupedClassName,dataContext:{}}));c=this.baseColor;c||(c=this.pieBaseColor);d=this.brightnessStep;d||(d=this.pieBrightnessStep);for(e=0;e<a.length;e++)c?g=AmCharts.adjustLuminosity(c,e*d/100):(g=this.colors[e],void 0===g&&(g=AmCharts.randomColor())),void 0===a[e].color&&(a[e].color=g);this.recalculatePercents()}},recalculatePercents:function(){var a=
this.chartData,b=0,c,d;for(c=0;c<a.length;c++)d=a[c],!d.hidden&&0<d.value&&(b+=d.value);for(c=0;c<a.length;c++)d=this.chartData[c],d.percents=!d.hidden&&0<d.value?100*d.value/b:0},removeSmallSlices:function(){var a=this.chartData,b;for(b=a.length-1;0<=b;b--)a[b].percents<this.groupPercent&&(this.groupValue+=a[b].value,a.splice(b,1))},animateAgain:function(){var a=this;a.startSlices();for(var b=0;b<a.chartData.length;b++){var c=a.chartData[b];c.started=!1;var d=c.wedge;d&&d.translate(c.startX,c.startY)}b=
a.startDuration;0<b?(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b)):a.pullSlices()},measureMaxLabel:function(){var a=this.chartData,b=0,c;for(c=0;c<a.length;c++){var d=a[c],e=this.formatString(this.labelText,d),f=this.labelFunction;f&&(e=f(d,e));d=AmCharts.text(this.container,e,this.color,this.fontFamily,this.fontSize);e=d.getBBox().width;e>b&&(b=e);d.remove()}return b}});AmCharts.AmRectangularChart=AmCharts.Class({inherits:AmCharts.AmCoordinateChart,construct:function(a){AmCharts.AmRectangularChart.base.construct.call(this,a);this.theme=a;this.createEvents("zoomed");this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=20;this.verticalPosition=this.horizontalPosition=this.depth3D=this.angle=0;this.heightMultiplier=this.widthMultiplier=1;this.plotAreaFillColors="#FFFFFF";this.plotAreaFillAlphas=0;this.plotAreaBorderColor="#000000";this.plotAreaBorderAlpha=
0;this.zoomOutButtonImageSize=17;this.zoomOutButtonImage="lens.png";this.zoomOutText="Show all";this.zoomOutButtonColor="#e5e5e5";this.zoomOutButtonAlpha=0;this.zoomOutButtonRollOverAlpha=1;this.zoomOutButtonPadding=8;this.trendLines=[];this.autoMargins=!0;this.marginsUpdated=!1;this.autoMarginOffset=10;AmCharts.applyTheme(this,a,"AmRectangularChart")},initChart:function(){AmCharts.AmRectangularChart.base.initChart.call(this);this.updateDxy();var a=!0;!this.marginsUpdated&&this.autoMargins&&(this.resetMargins(),
a=!1);this.processScrollbars();this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();a&&(this.scrollbarOnly||this.updateGraphs())},drawChart:function(){AmCharts.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();if(AmCharts.ifArray(this.chartData)){var a=this.chartCursor;a&&a.draw();a=this.zoomOutText;""!==a&&a&&this.drawZoomOutButton()}},resetMargins:function(){var a={},b;if("serial"==this.type){var c=
this.valueAxes;for(b=0;b<c.length;b++){var d=c[b];d.ignoreAxisWidth||(d.setOrientation(this.rotate),d.fixAxisPosition(),a[d.position]=!0)}(b=this.categoryAxis)&&!b.ignoreAxisWidth&&(b.setOrientation(!this.rotate),b.fixAxisPosition(),b.fixAxisPosition(),a[b.position]=!0)}else{d=this.xAxes;c=this.yAxes;for(b=0;b<d.length;b++){var e=d[b];e.ignoreAxisWidth||(e.setOrientation(!0),e.fixAxisPosition(),a[e.position]=!0)}for(b=0;b<c.length;b++)d=c[b],d.ignoreAxisWidth||(d.setOrientation(!1),d.fixAxisPosition(),
a[d.position]=!0)}a.left&&(this.marginLeft=0);a.right&&(this.marginRight=0);a.top&&(this.marginTop=0);a.bottom&&(this.marginBottom=0);this.fixMargins=a},measureMargins:function(){var a=this.valueAxes,b,c=this.autoMarginOffset,d=this.fixMargins,e=this.realWidth,f=this.realHeight,g=c,h=c,k=e;b=f;var l;for(l=0;l<a.length;l++)b=this.getAxisBounds(a[l],g,k,h,b),g=Math.round(b.l),k=Math.round(b.r),h=Math.round(b.t),b=Math.round(b.b);if(a=this.categoryAxis)b=this.getAxisBounds(a,g,k,h,b),g=Math.round(b.l),
k=Math.round(b.r),h=Math.round(b.t),b=Math.round(b.b);d.left&&g<c&&(this.marginLeft=Math.round(-g+c));d.right&&k>=e-c&&(this.marginRight=Math.round(k-e+c));d.top&&h<c+this.titleHeight&&(this.marginTop=Math.round(this.marginTop-h+c+this.titleHeight));d.bottom&&b>f-c&&(this.marginBottom=Math.round(this.marginBottom+b-f+c));this.initChart()},getAxisBounds:function(a,b,c,d,e){if(!a.ignoreAxisWidth){var f=a.labelsSet,g=a.tickLength;a.inside&&(g=0);if(f)switch(f=a.getBBox(),a.position){case "top":a=f.y;
d>a&&(d=a);break;case "bottom":a=f.y+f.height;e<a&&(e=a);break;case "right":a=f.x+f.width+g+3;c<a&&(c=a);break;case "left":a=f.x-g,b>a&&(b=a)}}return{l:b,t:d,r:c,b:e}},drawZoomOutButton:function(){var a=this,b=a.container.set();a.zoomButtonSet.push(b);var c=a.color,d=a.fontSize,e=a.zoomOutButtonImageSize,f=a.zoomOutButtonImage,g=AmCharts.lang.zoomOutText||a.zoomOutText,h=a.zoomOutButtonColor,k=a.zoomOutButtonAlpha,l=a.zoomOutButtonFontSize,m=a.zoomOutButtonPadding;isNaN(l)||(d=l);(l=a.zoomOutButtonFontColor)&&
(c=l);var l=a.zoomOutButton,n;l&&(l.fontSize&&(d=l.fontSize),l.color&&(c=l.color),l.backgroundColor&&(h=l.backgroundColor),isNaN(l.backgroundAlpha)||(a.zoomOutButtonRollOverAlpha=l.backgroundAlpha));var p=l=0;void 0!==a.pathToImages&&f&&(n=a.container.image(a.pathToImages+f,0,0,e,e),AmCharts.setCN(a,n,"zoom-out-image"),b.push(n),n=n.getBBox(),l=n.width+5);void 0!==g&&(c=AmCharts.text(a.container,g,c,a.fontFamily,d,"start"),AmCharts.setCN(a,c,"zoom-out-label"),d=c.getBBox(),p=n?n.height/2-3:d.height/
2,c.translate(l,p),b.push(c));n=b.getBBox();c=1;AmCharts.isModern||(c=0);h=AmCharts.rect(a.container,n.width+2*m+5,n.height+2*m-2,h,1,1,h,c);h.setAttr("opacity",k);h.translate(-m,-m);AmCharts.setCN(a,h,"zoom-out-bg");b.push(h);h.toBack();a.zbBG=h;n=h.getBBox();b.translate(a.marginLeftReal+a.plotAreaWidth-n.width+m,a.marginTopReal+m);b.hide();b.mouseover(function(){a.rollOverZB()}).mouseout(function(){a.rollOutZB()}).click(function(){a.clickZB()}).touchstart(function(){a.rollOverZB()}).touchend(function(){a.rollOutZB();
a.clickZB()});for(k=0;k<b.length;k++)b[k].attr({cursor:"pointer"});a.zbSet=b},rollOverZB:function(){this.zbBG.setAttr("opacity",this.zoomOutButtonRollOverAlpha)},rollOutZB:function(){this.zbBG.setAttr("opacity",this.zoomOutButtonAlpha)},clickZB:function(){this.zoomOut()},zoomOut:function(){this.updateScrollbar=!0;this.zoom()},drawPlotArea:function(){var a=this.dx,b=this.dy,c=this.marginLeftReal,d=this.marginTopReal,e=this.plotAreaWidth-1,f=this.plotAreaHeight-1,g=this.plotAreaFillColors,h=this.plotAreaFillAlphas,
k=this.plotAreaBorderColor,l=this.plotAreaBorderAlpha;this.trendLinesSet.clipRect(c,d,e,f);"object"==typeof h&&(h=h[0]);g=AmCharts.polygon(this.container,[0,e,e,0,0],[0,0,f,f,0],g,h,1,k,l,this.plotAreaGradientAngle);AmCharts.setCN(this,g,"plot-area");g.translate(c+a,d+b);this.set.push(g);0!==a&&0!==b&&(g=this.plotAreaFillColors,"object"==typeof g&&(g=g[0]),g=AmCharts.adjustLuminosity(g,-.15),e=AmCharts.polygon(this.container,[0,a,e+a,e,0],[0,b,b,0,0],g,h,1,k,l),AmCharts.setCN(this,e,"plot-area-bottom"),
e.translate(c,d+f),this.set.push(e),a=AmCharts.polygon(this.container,[0,0,a,a,0],[0,f,f+b,b,0],g,h,1,k,l),AmCharts.setCN(this,a,"plot-area-left"),a.translate(c,d),this.set.push(a));(c=this.bbset)&&this.scrollbarOnly&&c.remove()},updatePlotArea:function(){var a=this.updateWidth(),b=this.updateHeight(),c=this.container;this.realWidth=a;this.realWidth=b;c&&this.container.setSize(a,b);a=a-this.marginLeftReal-this.marginRightReal-this.dx;b=b-this.marginTopReal-this.marginBottomReal;1>a&&(a=1);1>b&&(b=
1);this.plotAreaWidth=Math.round(a);this.plotAreaHeight=Math.round(b)},updateDxy:function(){this.dx=Math.round(this.depth3D*Math.cos(this.angle*Math.PI/180));this.dy=Math.round(-this.depth3D*Math.sin(this.angle*Math.PI/180));this.d3x=Math.round(this.columnSpacing3D*Math.cos(this.angle*Math.PI/180));this.d3y=Math.round(-this.columnSpacing3D*Math.sin(this.angle*Math.PI/180))},updateMargins:function(){var a=this.getTitleHeight();this.titleHeight=a;this.marginTopReal=this.marginTop-this.dy+a;this.marginBottomReal=
this.marginBottom;this.marginLeftReal=this.marginLeft;this.marginRightReal=this.marginRight},updateValueAxes:function(){var a=this.valueAxes,b=this.marginLeftReal,c=this.marginTopReal,d=this.plotAreaHeight,e=this.plotAreaWidth,f;for(f=0;f<a.length;f++){var g=a[f];g.axisRenderer=AmCharts.RecAxis;g.guideFillRenderer=AmCharts.RecFill;g.axisItemRenderer=AmCharts.RecItem;g.dx=this.dx;g.dy=this.dy;g.viW=e-1;g.viH=d-1;g.marginsChanged=!0;g.viX=b;g.viY=c;this.updateObjectSize(g)}},updateObjectSize:function(a){a.width=
(this.plotAreaWidth-1)*this.widthMultiplier;a.height=(this.plotAreaHeight-1)*this.heightMultiplier;a.x=this.marginLeftReal+this.horizontalPosition;a.y=this.marginTopReal+this.verticalPosition},updateGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.x=this.marginLeftReal+this.horizontalPosition;c.y=this.marginTopReal+this.verticalPosition;c.width=this.plotAreaWidth*this.widthMultiplier;c.height=this.plotAreaHeight*this.heightMultiplier;c.index=b;c.dx=this.dx;c.dy=this.dy;c.rotate=
this.rotate}},updateChartCursor:function(){var a=this.chartCursor;a&&(a=AmCharts.processObject(a,AmCharts.ChartCursor,this.theme),this.addChartCursor(a),a.x=this.marginLeftReal,a.y=this.marginTopReal,a.width=this.plotAreaWidth-1,a.height=this.plotAreaHeight-1,a.chart=this)},processScrollbars:function(){var a=this.chartScrollbar;a&&(a=AmCharts.processObject(a,AmCharts.ChartScrollbar,this.theme),this.addChartScrollbar(a))},updateScrollbars:function(){},addChartCursor:function(a){AmCharts.callMethod("destroy",
[this.chartCursor]);a&&(this.listenTo(a,"changed",this.handleCursorChange),this.listenTo(a,"zoomed",this.handleCursorZoom));this.chartCursor=a},removeChartCursor:function(){AmCharts.callMethod("destroy",[this.chartCursor]);this.chartCursor=null},zoomTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b];c.valueAxis.recalculateToPercents?c.set&&c.set.hide():(c.x=this.marginLeftReal+this.horizontalPosition,c.y=this.marginTopReal+this.verticalPosition,c.draw())}},addTrendLine:function(a){this.trendLines.push(a)},
removeTrendLine:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},adjustMargins:function(a,b){var c=a.position,d=a.scrollbarHeight+a.offset;a.enabled&&("top"==c?b?this.marginLeftReal+=d:this.marginTopReal+=d:b?this.marginRightReal+=d:this.marginBottomReal+=d)},getScrollbarPosition:function(a,b,c){a.position=b?"bottom"==c||"left"==c?"bottom":"top":"top"==c||"right"==c?"bottom":"top"},updateChartScrollbar:function(a,b){if(a){a.rotate=b;var c=this.marginTopReal,d=
this.marginLeftReal,e=a.scrollbarHeight,f=this.dx,g=this.dy,h=a.offset;"top"==a.position?b?(a.y=c,a.x=d-e-h):(a.y=c-e+g-1-h,a.x=d+f):b?(a.y=c+g,a.x=d+this.plotAreaWidth+f+h):(a.y=c+this.plotAreaHeight+h,a.x=this.marginLeftReal)}},showZB:function(a){var b=this.zbSet;b&&(a?b.show():b.hide(),this.rollOutZB())},handleReleaseOutside:function(a){AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this,a);(a=this.chartCursor)&&a.handleReleaseOutside()},handleMouseDown:function(a){AmCharts.AmRectangularChart.base.handleMouseDown.call(this,
a);var b=this.chartCursor;b&&b.handleMouseDown(a)},handleCursorChange:function(a){}});AmCharts.TrendLine=AmCharts.Class({construct:function(a){this.cname="TrendLine";this.createEvents("click");this.isProtected=!1;this.dashLength=0;this.lineColor="#00CC00";this.lineThickness=this.lineAlpha=1;AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container,d,e,f,g,h=a.categoryAxis,k=a.initialDate,l=a.initialCategory,m=a.finalDate,n=a.finalCategory,p=a.valueAxis,r=a.valueAxisX,q=a.initialXValue,t=a.finalXValue,z=a.initialValue,x=a.finalValue,
u=p.recalculateToPercents,w=b.dataDateFormat;h&&(k&&(k instanceof Date||(k=w?AmCharts.stringToDate(k,w):new Date(k)),a.initialDate=k,d=h.dateToCoordinate(k)),l&&(d=h.categoryToCoordinate(l)),m&&(m instanceof Date||(m=w?AmCharts.stringToDate(m,w):new Date(m)),a.finalDate=m,e=h.dateToCoordinate(m)),n&&(e=h.categoryToCoordinate(n)));r&&!u&&(isNaN(q)||(d=r.getCoordinate(q)),isNaN(t)||(e=r.getCoordinate(t)));p&&!u&&(isNaN(z)||(f=p.getCoordinate(z)),isNaN(x)||(g=p.getCoordinate(x)));isNaN(d)||isNaN(e)||
isNaN(f)||isNaN(f)||(b.rotate?(h=[f,g],e=[d,e]):(h=[d,e],e=[f,g]),f=a.lineColor,d=AmCharts.line(c,h,e,f,a.lineAlpha,a.lineThickness,a.dashLength),g=h,k=e,n=h[1]-h[0],p=e[1]-e[0],0===n&&(n=.01),0===p&&(p=.01),l=n/Math.abs(n),m=p/Math.abs(p),p=n*p/Math.abs(n*p)*Math.sqrt(Math.pow(n,2)+Math.pow(p,2)),n=Math.asin(n/p),p=90*Math.PI/180-n,n=Math.abs(5*Math.cos(p)),p=Math.abs(5*Math.sin(p)),g.push(h[1]-l*p,h[0]-l*p),k.push(e[1]+m*n,e[0]+m*n),h=AmCharts.polygon(c,g,k,f,.005,0),c=c.set([h,d]),c.translate(b.marginLeftReal,
b.marginTopReal),b.trendLinesSet.push(c),AmCharts.setCN(b,d,"trend-line"),AmCharts.setCN(b,d,"trend-line-"+a.id),a.line=d,a.set=c,h.mouseup(function(){a.handleLineClick()}).mouseover(function(){a.handleLineOver()}).mouseout(function(){a.handleLineOut()}),h.touchend&&h.touchend(function(){a.handleLineClick()}))},handleLineClick:function(){var a={type:"click",trendLine:this,chart:this.chart};this.fire(a.type,a)},handleLineOver:function(){var a=this.rollOverColor;void 0!==a&&this.line.attr({stroke:a})},
handleLineOut:function(){this.line.attr({stroke:this.lineColor})},destroy:function(){AmCharts.remove(this.set)}});AmCharts.circle=function(a,b,c,d,e,f,g,h,k){if(void 0==e||0===e)e=.01;void 0===f&&(f="#000000");void 0===g&&(g=0);d={fill:c,stroke:f,"fill-opacity":d,"stroke-width":e,"stroke-opacity":g};a=isNaN(k)?a.circle(0,0,b).attr(d):a.ellipse(0,0,b,k).attr(d);h&&a.gradient("radialGradient",[c,AmCharts.adjustLuminosity(c,-.6)]);return a};
AmCharts.text=function(a,b,c,d,e,f,g,h){f||(f="middle");"right"==f&&(f="end");"left"==f&&(f="start");isNaN(h)&&(h=1);void 0!==b&&(b=String(b),AmCharts.isIE&&!AmCharts.isModern&&(b=b.replace("&amp;","&"),b=b.replace("&","&amp;")));c={fill:c,"font-family":d,"font-size":e,opacity:h};!0===g&&(c["font-weight"]="bold");c["text-anchor"]=f;return a.text(b,c)};
AmCharts.polygon=function(a,b,c,d,e,f,g,h,k,l,m){isNaN(f)&&(f=.01);isNaN(h)&&(h=e);var n=d,p=!1;"object"==typeof n&&1<n.length&&(p=!0,n=n[0]);void 0===g&&(g=n);e={fill:n,stroke:g,"fill-opacity":e,"stroke-width":f,"stroke-opacity":h};void 0!==m&&0<m&&(e["stroke-dasharray"]=m);m=AmCharts.dx;f=AmCharts.dy;a.handDrawn&&(c=AmCharts.makeHD(b,c,a.handDrawScatter),b=c[0],c=c[1]);g=Math.round;l&&(g=AmCharts.doNothing);l="M"+(g(b[0])+m)+","+(g(c[0])+f);for(h=1;h<b.length;h++)l+=" L"+(g(b[h])+m)+","+(g(c[h])+
f);a=a.path(l+" Z").attr(e);p&&a.gradient("linearGradient",d,k);return a};
AmCharts.rect=function(a,b,c,d,e,f,g,h,k,l,m){isNaN(f)&&(f=0);void 0===k&&(k=0);void 0===l&&(l=270);isNaN(e)&&(e=0);var n=d,p=!1;"object"==typeof n&&(n=n[0],p=!0);void 0===g&&(g=n);void 0===h&&(h=e);b=Math.round(b);c=Math.round(c);var r=0,q=0;0>b&&(b=Math.abs(b),r=-b);0>c&&(c=Math.abs(c),q=-c);r+=AmCharts.dx;q+=AmCharts.dy;e={fill:n,stroke:g,"fill-opacity":e,"stroke-opacity":h};void 0!==m&&0<m&&(e["stroke-dasharray"]=m);a=a.rect(r,q,b,c,k,f).attr(e);p&&a.gradient("linearGradient",d,l);return a};
AmCharts.bullet=function(a,b,c,d,e,f,g,h,k,l,m){var n;"circle"==b&&(b="round");switch(b){case "round":n=AmCharts.circle(a,c/2,d,e,f,g,h);break;case "square":n=AmCharts.polygon(a,[-c/2,c/2,c/2,-c/2],[c/2,c/2,-c/2,-c/2],d,e,f,g,h,l-180);break;case "rectangle":n=AmCharts.polygon(a,[-c,c,c,-c],[c/2,c/2,-c/2,-c/2],d,e,f,g,h,l-180);break;case "diamond":n=AmCharts.polygon(a,[-c/2,0,c/2,0],[0,-c/2,0,c/2],d,e,f,g,h);break;case "triangleUp":n=AmCharts.triangle(a,c,0,d,e,f,g,h);break;case "triangleDown":n=AmCharts.triangle(a,
c,180,d,e,f,g,h);break;case "triangleLeft":n=AmCharts.triangle(a,c,270,d,e,f,g,h);break;case "triangleRight":n=AmCharts.triangle(a,c,90,d,e,f,g,h);break;case "bubble":n=AmCharts.circle(a,c/2,d,e,f,g,h,!0);break;case "line":n=AmCharts.line(a,[-c/2,c/2],[0,0],d,e,f,g,h);break;case "yError":n=a.set();n.push(AmCharts.line(a,[0,0],[-c/2,c/2],d,e,f));n.push(AmCharts.line(a,[-k,k],[-c/2,-c/2],d,e,f));n.push(AmCharts.line(a,[-k,k],[c/2,c/2],d,e,f));break;case "xError":n=a.set(),n.push(AmCharts.line(a,[-c/
2,c/2],[0,0],d,e,f)),n.push(AmCharts.line(a,[-c/2,-c/2],[-k,k],d,e,f)),n.push(AmCharts.line(a,[c/2,c/2],[-k,k],d,e,f))}n&&n.pattern(m);return n};
AmCharts.triangle=function(a,b,c,d,e,f,g,h){if(void 0===f||0===f)f=1;void 0===g&&(g="#000");void 0===h&&(h=0);d={fill:d,stroke:g,"fill-opacity":e,"stroke-width":f,"stroke-opacity":h};b/=2;var k;0===c&&(k=" M"+-b+","+b+" L0,"+-b+" L"+b+","+b+" Z");180==c&&(k=" M"+-b+","+-b+" L0,"+b+" L"+b+","+-b+" Z");90==c&&(k=" M"+-b+","+-b+" L"+b+",0 L"+-b+","+b+" Z");270==c&&(k=" M"+-b+",0 L"+b+","+b+" L"+b+","+-b+" Z");return a.path(k).attr(d)};
AmCharts.line=function(a,b,c,d,e,f,g,h,k,l,m){if(a.handDrawn&&!m)return AmCharts.handDrawnLine(a,b,c,d,e,f,g,h,k,l,m);f={fill:"none","stroke-width":f};void 0!==g&&0<g&&(f["stroke-dasharray"]=g);isNaN(e)||(f["stroke-opacity"]=e);d&&(f.stroke=d);d=Math.round;l&&(d=AmCharts.doNothing);l=AmCharts.dx;e=AmCharts.dy;g="M"+(d(b[0])+l)+","+(d(c[0])+e);for(h=1;h<b.length;h++)g+=" L"+(d(b[h])+l)+","+(d(c[h])+e);if(AmCharts.VML)return a.path(g,void 0,!0).attr(f);k&&(g+=" M0,0 L0,0");return a.path(g).attr(f)};
AmCharts.makeHD=function(a,b,c){for(var d=[],e=[],f=1;f<a.length;f++)for(var g=Number(a[f-1]),h=Number(b[f-1]),k=Number(a[f]),l=Number(b[f]),m=Math.sqrt(Math.pow(k-g,2)+Math.pow(l-h,2)),m=Math.round(m/50)+1,k=(k-g)/m,l=(l-h)/m,n=0;n<=m;n++){var p=g+n*k+Math.random()*c,r=h+n*l+Math.random()*c;d.push(p);e.push(r)}return[d,e]};
AmCharts.handDrawnLine=function(a,b,c,d,e,f,g,h,k,l,m){var n=a.set();for(m=1;m<b.length;m++)for(var p=[b[m-1],b[m]],r=[c[m-1],c[m]],r=AmCharts.makeHD(p,r,a.handDrawScatter),p=r[0],r=r[1],q=1;q<p.length;q++)n.push(AmCharts.line(a,[p[q-1],p[q]],[r[q-1],r[q]],d,e,f+Math.random()*a.handDrawThickness-a.handDrawThickness/2,g,h,k,l,!0));return n};AmCharts.doNothing=function(a){return a};
AmCharts.wedge=function(a,b,c,d,e,f,g,h,k,l,m,n){var p=Math.round;f=p(f);g=p(g);h=p(h);var r=p(g/f*h),q=AmCharts.VML,t=359.5+f/100;359.94<t&&(t=359.94);e>=t&&(e=t);var z=1/180*Math.PI,t=b+Math.sin(d*z)*h,x=c-Math.cos(d*z)*r,u=b+Math.sin(d*z)*f,w=c-Math.cos(d*z)*g,y=b+Math.sin((d+e)*z)*f,A=c-Math.cos((d+e)*z)*g,C=b+Math.sin((d+e)*z)*h,z=c-Math.cos((d+e)*z)*r,B={fill:AmCharts.adjustLuminosity(l.fill,-.2),"stroke-opacity":0,"fill-opacity":l["fill-opacity"]},H=0;180<Math.abs(e)&&(H=1);d=a.set();var D;
q&&(t=p(10*t),u=p(10*u),y=p(10*y),C=p(10*C),x=p(10*x),w=p(10*w),A=p(10*A),z=p(10*z),b=p(10*b),k=p(10*k),c=p(10*c),f*=10,g*=10,h*=10,r*=10,1>Math.abs(e)&&1>=Math.abs(y-u)&&1>=Math.abs(A-w)&&(D=!0));e="";var I;n&&(B["fill-opacity"]=0,B["stroke-opacity"]=l["stroke-opacity"]/2,B.stroke=l.stroke);0<k&&(I=" M"+t+","+(x+k)+" L"+u+","+(w+k),q?(D||(I+=" A"+(b-f)+","+(k+c-g)+","+(b+f)+","+(k+c+g)+","+u+","+(w+k)+","+y+","+(A+k)),I+=" L"+C+","+(z+k),0<h&&(D||(I+=" B"+(b-h)+","+(k+c-r)+","+(b+h)+","+(k+c+r)+
","+C+","+(k+z)+","+t+","+(k+x)))):(I+=" A"+f+","+g+",0,"+H+",1,"+y+","+(A+k)+" L"+C+","+(z+k),0<h&&(I+=" A"+h+","+r+",0,"+H+",0,"+t+","+(x+k))),I=a.path(I+" Z",void 0,void 0,"1000,1000").attr(B),d.push(I),I=a.path(" M"+t+","+x+" L"+t+","+(x+k)+" L"+u+","+(w+k)+" L"+u+","+w+" L"+t+","+x+" Z",void 0,void 0,"1000,1000").attr(B),k=a.path(" M"+y+","+A+" L"+y+","+(A+k)+" L"+C+","+(z+k)+" L"+C+","+z+" L"+y+","+A+" Z",void 0,void 0,"1000,1000").attr(B),d.push(I),d.push(k));q?(D||(e=" A"+p(b-f)+","+p(c-g)+
","+p(b+f)+","+p(c+g)+","+p(u)+","+p(w)+","+p(y)+","+p(A)),f=" M"+p(t)+","+p(x)+" L"+p(u)+","+p(w)+e+" L"+p(C)+","+p(z)):f=" M"+t+","+x+" L"+u+","+w+(" A"+f+","+g+",0,"+H+",1,"+y+","+A)+" L"+C+","+z;0<h&&(q?D||(f+=" B"+(b-h)+","+(c-r)+","+(b+h)+","+(c+r)+","+C+","+z+","+t+","+x):f+=" A"+h+","+r+",0,"+H+",0,"+t+","+x);a.handDrawn&&(b=AmCharts.line(a,[t,u],[x,w],l.stroke,l.thickness*Math.random()*a.handDrawThickness,l["stroke-opacity"]),d.push(b));a=a.path(f+" Z",void 0,void 0,"1000,1000").attr(l);
if(m){b=[];for(c=0;c<m.length;c++)b.push(AmCharts.adjustLuminosity(l.fill,m[c]));0<b.length&&a.gradient("linearGradient",b)}a.pattern(n);d.wedge=a;d.push(a);return d};AmCharts.adjustLuminosity=function(a,b){a=String(a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=String(a[0])+String(a[0])+String(a[1])+String(a[1])+String(a[2])+String(a[2]));b=b||0;var c="#",d,e;for(e=0;3>e;e++)d=parseInt(a.substr(2*e,2),16),d=Math.round(Math.min(Math.max(0,d+d*b),255)).toString(16),c+=("00"+d).substr(d.length);return c};AmCharts.Bezier=AmCharts.Class({construct:function(a,b,c,d,e,f,g,h,k,l){"object"==typeof g&&(g=g[0]);"object"==typeof h&&(h=h[0]);f={fill:g,"fill-opacity":h,"stroke-width":f};void 0!==k&&0<k&&(f["stroke-dasharray"]=k);isNaN(e)||(f["stroke-opacity"]=e);d&&(f.stroke=d);d="M"+Math.round(b[0])+","+Math.round(c[0]);e=[];for(k=0;k<b.length;k++)e.push({x:Number(b[k]),y:Number(c[k])});1<e.length&&(b=this.interpolate(e),d+=this.drawBeziers(b));l?d+=l:AmCharts.VML||(d+="M0,0 L0,0");this.path=a.path(d).attr(f);
this.node=this.path.node},interpolate:function(a){var b=[];b.push({x:a[0].x,y:a[0].y});var c=a[1].x-a[0].x,d=a[1].y-a[0].y,e=AmCharts.bezierX,f=AmCharts.bezierY;b.push({x:a[0].x+c/e,y:a[0].y+d/f});var g;for(g=1;g<a.length-1;g++){var h=a[g-1],k=a[g],d=a[g+1];isNaN(d.x)&&(d=k);isNaN(k.x)&&(k=h);isNaN(h.x)&&(h=k);c=d.x-k.x;d=d.y-h.y;h=k.x-h.x;h>c&&(h=c);b.push({x:k.x-h/e,y:k.y-d/f});b.push({x:k.x,y:k.y});b.push({x:k.x+h/e,y:k.y+d/f})}d=a[a.length-1].y-a[a.length-2].y;c=a[a.length-1].x-a[a.length-2].x;
b.push({x:a[a.length-1].x-c/e,y:a[a.length-1].y-d/f});b.push({x:a[a.length-1].x,y:a[a.length-1].y});return b},drawBeziers:function(a){var b="",c;for(c=0;c<(a.length-1)/3;c++)b+=this.drawBezierMidpoint(a[3*c],a[3*c+1],a[3*c+2],a[3*c+3]);return b},drawBezierMidpoint:function(a,b,c,d){var e=Math.round,f=this.getPointOnSegment(a,b,.75),g=this.getPointOnSegment(d,c,.75),h=(d.x-a.x)/16,k=(d.y-a.y)/16,l=this.getPointOnSegment(a,b,.375);a=this.getPointOnSegment(f,g,.375);a.x-=h;a.y-=k;b=this.getPointOnSegment(g,
f,.375);b.x+=h;b.y+=k;c=this.getPointOnSegment(d,c,.375);h=this.getMiddle(l,a);f=this.getMiddle(f,g);g=this.getMiddle(b,c);l=" Q"+e(l.x)+","+e(l.y)+","+e(h.x)+","+e(h.y);l+=" Q"+e(a.x)+","+e(a.y)+","+e(f.x)+","+e(f.y);l+=" Q"+e(b.x)+","+e(b.y)+","+e(g.x)+","+e(g.y);return l+=" Q"+e(c.x)+","+e(c.y)+","+e(d.x)+","+e(d.y)},getMiddle:function(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}},getPointOnSegment:function(a,b,c){return{x:a.x+(b.x-a.x)*c,y:a.y+(b.y-a.y)*c}}});AmCharts.AmDraw=AmCharts.Class({construct:function(a,b,c,d){AmCharts.SVG_NS="http://www.w3.org/2000/svg";AmCharts.SVG_XLINK="http://www.w3.org/1999/xlink";AmCharts.hasSVG=!!document.createElementNS&&!!document.createElementNS(AmCharts.SVG_NS,"svg").createSVGRect;1>b&&(b=10);1>c&&(c=10);this.div=a;this.width=b;this.height=c;this.rBin=document.createElement("div");AmCharts.hasSVG?(AmCharts.SVG=!0,b=this.createSvgElement("svg"),a.appendChild(b),this.container=b,this.addDefs(d),this.R=new AmCharts.SVGRenderer(this)):
AmCharts.isIE&&AmCharts.VMLRenderer&&(AmCharts.VML=!0,AmCharts.vmlStyleSheet||(document.namespaces.add("amvml","urn:schemas-microsoft-com:vml"),31>document.styleSheets.length?(b=document.createStyleSheet(),b.addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true"),AmCharts.vmlStyleSheet=b):document.styleSheets[0].addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true")),this.container=a,this.R=new AmCharts.VMLRenderer(this,d),this.R.disableSelection(a))},
createSvgElement:function(a){return document.createElementNS(AmCharts.SVG_NS,a)},circle:function(a,b,c,d){var e=new AmCharts.AmDObject("circle",this);e.attr({r:c,cx:a,cy:b});this.addToContainer(e.node,d);return e},ellipse:function(a,b,c,d,e){var f=new AmCharts.AmDObject("ellipse",this);f.attr({rx:c,ry:d,cx:a,cy:b});this.addToContainer(f.node,e);return f},setSize:function(a,b){0<a&&0<b&&(this.container.style.width=a+"px",this.container.style.height=b+"px")},rect:function(a,b,c,d,e,f,g){var h=new AmCharts.AmDObject("rect",
this);AmCharts.VML&&(e=Math.round(100*e/Math.min(c,d)),c+=2*f,d+=2*f,h.bw=f,h.node.style.marginLeft=-f,h.node.style.marginTop=-f);1>c&&(c=1);1>d&&(d=1);h.attr({x:a,y:b,width:c,height:d,rx:e,ry:e,"stroke-width":f});this.addToContainer(h.node,g);return h},image:function(a,b,c,d,e,f){var g=new AmCharts.AmDObject("image",this);g.attr({x:b,y:c,width:d,height:e});this.R.path(g,a);this.addToContainer(g.node,f);return g},addToContainer:function(a,b){b||(b=this.container);b.appendChild(a)},text:function(a,
b,c){return this.R.text(a,b,c)},path:function(a,b,c,d){var e=new AmCharts.AmDObject("path",this);d||(d="100,100");e.attr({cs:d});c?e.attr({dd:a}):e.attr({d:a});this.addToContainer(e.node,b);return e},set:function(a){return this.R.set(a)},remove:function(a){if(a){var b=this.rBin;b.appendChild(a);b.innerHTML=""}},renderFix:function(){var a=this.container,b=a.style,c;try{c=a.getScreenCTM()||a.createSVGMatrix()}catch(d){c=a.createSVGMatrix()}a=1-c.e%1;c=1-c.f%1;.5<a&&--a;.5<c&&--c;a&&(b.left=a+"px");
c&&(b.top=c+"px")},update:function(){this.R.update()},addDefs:function(a){if(AmCharts.hasSVG){var b=this.createSvgElement("desc"),c=this.container;c.setAttribute("version","1.1");c.style.position="absolute";this.setSize(this.width,this.height);AmCharts.rtl&&(c.setAttribute("direction","rtl"),c.style.left="auto",c.style.right="0px");b.appendChild(document.createTextNode("JavaScript chart by amCharts "+a.version));c.appendChild(b);a.defs&&(b=this.createSvgElement("defs"),c.appendChild(b),AmCharts.parseDefs(a.defs,
b),this.defs=b)}}});AmCharts.AmDObject=AmCharts.Class({construct:function(a,b){this.D=b;this.R=b.R;this.node=this.R.create(this,a);this.y=this.x=0;this.scale=1},attr:function(a){this.R.attr(this,a);return this},getAttr:function(a){return this.node.getAttribute(a)},setAttr:function(a,b){this.R.setAttr(this,a,b);return this},clipRect:function(a,b,c,d){this.R.clipRect(this,a,b,c,d)},translate:function(a,b,c,d){d||(a=Math.round(a),b=Math.round(b));this.R.move(this,a,b,c);this.x=a;this.y=b;this.scale=c;this.angle&&this.rotate(this.angle)},
rotate:function(a,b){this.R.rotate(this,a,b);this.angle=a},animate:function(a,b,c){for(var d in a)if(a.hasOwnProperty(d)){var e=d,f=a[d];c=AmCharts.getEffect(c);this.R.animate(this,e,f,b,c)}},push:function(a){if(a){var b=this.node;b.appendChild(a.node);var c=a.clipPath;c&&b.appendChild(c);(a=a.grad)&&b.appendChild(a)}},text:function(a){this.R.setText(this,a)},remove:function(){this.R.remove(this)},clear:function(){var a=this.node;if(a.hasChildNodes())for(;1<=a.childNodes.length;)a.removeChild(a.firstChild)},
hide:function(){this.setAttr("visibility","hidden")},show:function(){this.setAttr("visibility","visible")},getBBox:function(){return this.R.getBBox(this)},toFront:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;b&&b.appendChild(a)}},toPrevious:function(){var a=this.node;a&&this.prevNextNode&&(a=a.parentNode)&&a.insertBefore(this.prevNextNode,null)},toBack:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;if(b){var c=b.firstChild;
c&&b.insertBefore(a,c)}}},mouseover:function(a){this.R.addListener(this,"mouseover",a);return this},mouseout:function(a){this.R.addListener(this,"mouseout",a);return this},click:function(a){this.R.addListener(this,"click",a);return this},dblclick:function(a){this.R.addListener(this,"dblclick",a);return this},mousedown:function(a){this.R.addListener(this,"mousedown",a);return this},mouseup:function(a){this.R.addListener(this,"mouseup",a);return this},touchstart:function(a){this.R.addListener(this,
"touchstart",a);return this},touchend:function(a){this.R.addListener(this,"touchend",a);return this},contextmenu:function(a){this.node.addEventListener?this.node.addEventListener("contextmenu",a,!0):this.R.addListener(this,"contextmenu",a);return this},stop:function(a){AmCharts.removeFromArray(this.R.animations,this.an_x);AmCharts.removeFromArray(this.R.animations,this.an_y)},length:function(){return this.node.childNodes.length},gradient:function(a,b,c){this.R.gradient(this,a,b,c)},pattern:function(a,
b){a&&this.R.pattern(this,a,b)}});AmCharts.VMLRenderer=AmCharts.Class({construct:function(a,b){this.chart=b;this.D=a;this.cNames={circle:"oval",ellipse:"oval",rect:"roundrect",path:"shape"};this.styleMap={x:"left",y:"top",width:"width",height:"height","font-family":"fontFamily","font-size":"fontSize",visibility:"visibility"}},create:function(a,b){var c;if("group"==b)c=document.createElement("div"),a.type="div";else if("text"==b)c=document.createElement("div"),a.type="text";else if("image"==b)c=document.createElement("img"),a.type=
"image";else{a.type="shape";a.shapeType=this.cNames[b];c=document.createElement("amvml:"+this.cNames[b]);var d=document.createElement("amvml:stroke");c.appendChild(d);a.stroke=d;var e=document.createElement("amvml:fill");c.appendChild(e);a.fill=e;e.className="amvml";d.className="amvml";c.className="amvml"}c.style.position="absolute";c.style.top=0;c.style.left=0;return c},path:function(a,b){a.node.setAttribute("src",b)},setAttr:function(a,b,c){if(void 0!==c){var d;8===document.documentMode&&(d=!0);
var e=a.node,f=a.type,g=e.style;"r"==b&&(g.width=2*c,g.height=2*c);"oval"==a.shapeType&&("rx"==b&&(g.width=2*c),"ry"==b&&(g.height=2*c));"roundrect"==a.shapeType&&("width"!=b&&"height"!=b||--c);"cursor"==b&&(g.cursor=c);"cx"==b&&(g.left=c-AmCharts.removePx(g.width)/2);"cy"==b&&(g.top=c-AmCharts.removePx(g.height)/2);var h=this.styleMap[b];void 0!==h&&(g[h]=c);"text"==f&&("text-anchor"==b&&(a.anchor=c,h=e.clientWidth,"end"==c&&(g.marginLeft=-h+"px"),"middle"==c&&(g.marginLeft=-(h/2)+"px",g.textAlign=
"center"),"start"==c&&(g.marginLeft="0px")),"fill"==b&&(g.color=c),"font-weight"==b&&(g.fontWeight=c));if(g=a.children)for(h=0;h<g.length;h++)g[h].setAttr(b,c);if("shape"==f){"cs"==b&&(e.style.width="100px",e.style.height="100px",e.setAttribute("coordsize",c));"d"==b&&e.setAttribute("path",this.svgPathToVml(c));"dd"==b&&e.setAttribute("path",c);f=a.stroke;a=a.fill;"stroke"==b&&(d?f.color=c:f.setAttribute("color",c));"stroke-width"==b&&(d?f.weight=c:f.setAttribute("weight",c));"stroke-opacity"==b&&
(d?f.opacity=c:f.setAttribute("opacity",c));"stroke-dasharray"==b&&(g="solid",0<c&&3>c&&(g="dot"),3<=c&&6>=c&&(g="dash"),6<c&&(g="longdash"),d?f.dashstyle=g:f.setAttribute("dashstyle",g));if("fill-opacity"==b||"opacity"==b)0===c?d?a.on=!1:a.setAttribute("on",!1):d?a.opacity=c:a.setAttribute("opacity",c);"fill"==b&&(d?a.color=c:a.setAttribute("color",c));"rx"==b&&(d?e.arcSize=c+"%":e.setAttribute("arcsize",c+"%"))}}},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},text:function(a,
b,c){var d=new AmCharts.AmDObject("text",this.D),e=d.node;e.style.whiteSpace="pre";e.innerHTML=a;this.D.addToContainer(e,c);this.attr(d,b);return d},getBBox:function(a){return this.getBox(a.node)},getBox:function(a){var b=a.offsetLeft,c=a.offsetTop,d=a.offsetWidth,e=a.offsetHeight,f;if(a.hasChildNodes()){var g,h,k;for(k=0;k<a.childNodes.length;k++){f=this.getBox(a.childNodes[k]);var l=f.x;isNaN(l)||(isNaN(g)?g=l:l<g&&(g=l));var m=f.y;isNaN(m)||(isNaN(h)?h=m:m<h&&(h=m));l=f.width+l;isNaN(l)||(d=Math.max(d,
l));f=f.height+m;isNaN(f)||(e=Math.max(e,f))}0>g&&(b+=g);0>h&&(c+=h)}return{x:b,y:c,width:d,height:e}},setText:function(a,b){var c=a.node;c&&(c.innerHTML=b);this.setAttr(a,"text-anchor",a.anchor)},addListener:function(a,b,c){a.node["on"+b]=c},move:function(a,b,c){var d=a.node,e=d.style;"text"==a.type&&(c-=AmCharts.removePx(e.fontSize)/2-1);"oval"==a.shapeType&&(b-=AmCharts.removePx(e.width)/2,c-=AmCharts.removePx(e.height)/2);a=a.bw;isNaN(a)||(b-=a,c-=a);isNaN(b)||isNaN(c)||(d.style.left=b+"px",d.style.top=
c+"px")},svgPathToVml:function(a){var b=a.split(" ");a="";var c,d=Math.round,e;for(e=0;e<b.length;e++){var f=b[e],g=f.substring(0,1),f=f.substring(1),h=f.split(","),k=d(h[0])+","+d(h[1]);"M"==g&&(a+=" m "+k);"L"==g&&(a+=" l "+k);"Z"==g&&(a+=" x e");if("Q"==g){var l=c.length,m=c[l-1],n=h[0],p=h[1],k=h[2],r=h[3];c=d(c[l-2]/3+2/3*n);m=d(m/3+2/3*p);n=d(2/3*n+k/3);p=d(2/3*p+r/3);a+=" c "+c+","+m+","+n+","+p+","+k+","+r}"A"==g&&(a+=" wa "+f);"B"==g&&(a+=" at "+f);c=h}return a},animate:function(a,b,c,d,
e){var f=a.node,g=this.chart;if("translate"==b){b=c.split(",");c=b[1];var h=f.offsetTop;g.animate(a,"left",f.offsetLeft,b[0],d,e,"px");g.animate(a,"top",h,c,d,e,"px")}},clipRect:function(a,b,c,d,e){a=a.node;0===b&&0===c?(a.style.width=d+"px",a.style.height=e+"px",a.style.overflow="hidden"):a.style.clip="rect("+c+"px "+(b+d)+"px "+(c+e)+"px "+b+"px)"},rotate:function(a,b,c){if(0!==Number(b)){var d=a.node;a=d.style;c||(c=this.getBGColor(d.parentNode));a.backgroundColor=c;a.paddingLeft=1;c=b*Math.PI/
180;var e=Math.cos(c),f=Math.sin(c),g=AmCharts.removePx(a.left),h=AmCharts.removePx(a.top),k=d.offsetWidth,d=d.offsetHeight;b/=Math.abs(b);a.left=g+k/2-k/2*Math.cos(c)-b*d/2*Math.sin(c)+3;a.top=h-b*k/2*Math.sin(c)+b*d/2*Math.sin(c);a.cssText=a.cssText+"; filter:progid:DXImageTransform.Microsoft.Matrix(M11='"+e+"', M12='"+-f+"', M21='"+f+"', M22='"+e+"', sizingmethod='auto expand');"}},getBGColor:function(a){var b="#FFFFFF";if(a.style){var c=a.style.backgroundColor;""!==c?b=c:a.parentNode&&(b=this.getBGColor(a.parentNode))}return b},
set:function(a){var b=new AmCharts.AmDObject("group",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},gradient:function(a,b,c,d){var e="";"radialGradient"==b&&(b="gradientradial",c.reverse());"linearGradient"==b&&(b="gradient");var f;for(f=0;f<c.length;f++){var g=Math.round(100*f/(c.length-1)),e=e+(g+"% "+c[f]);f<c.length-1&&(e+=",")}a=a.fill;90==d?d=0:270==d?d=180:180==d?d=90:0===d&&(d=270);8===document.documentMode?(a.type=b,a.angle=d):(a.setAttribute("type",
b),a.setAttribute("angle",d));e&&(a.colors.value=e)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);this.D.remove(a.node)},disableSelection:function(a){void 0!==typeof a.onselectstart&&(a.onselectstart=function(){return!1});a.style.cursor="default"},pattern:function(a,b){var c=a.node,d=a.fill,e="none";b.color&&(e=b.color);c.fillColor=e;8===document.documentMode?(d.type="tile",d.src=b.url):(d.setAttribute("type","tile"),d.setAttribute("src",b.url))},update:function(){}});AmCharts.SVGRenderer=AmCharts.Class({construct:function(a){this.D=a;this.animations=[]},create:function(a,b){return document.createElementNS(AmCharts.SVG_NS,b)},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},setAttr:function(a,b,c){void 0!==c&&a.node.setAttribute(b,c)},animate:function(a,b,c,d,e){var f=a.node;a["an_"+b]&&AmCharts.removeFromArray(this.animations,a["an_"+b]);"translate"==b?(f=(f=f.getAttribute("transform"))?String(f).substring(10,f.length-1):"0,0",f=
f.split(", ").join(" "),f=f.split(" ").join(","),0===f&&(f="0,0")):f=Number(f.getAttribute(b));c={obj:a,frame:0,attribute:b,from:f,to:c,time:d,effect:e};this.animations.push(c);a["an_"+b]=c},update:function(){var a,b=this.animations;for(a=b.length-1;0<=a;a--){var c=b[a],d=1E3*c.time/AmCharts.updateRate,e=c.frame+1,f=c.obj,g=c.attribute,h,k,l;e<=d?(c.frame++,"translate"==g?(h=c.from.split(","),g=Number(h[0]),h=Number(h[1]),isNaN(h)&&(h=0),k=c.to.split(","),l=Number(k[0]),k=Number(k[1]),l=0===l-g?l:
Math.round(AmCharts[c.effect](0,e,g,l-g,d)),c=0===k-h?k:Math.round(AmCharts[c.effect](0,e,h,k-h,d)),g="transform",c="translate("+l+","+c+")"):(k=Number(c.from),h=Number(c.to),l=h-k,c=AmCharts[c.effect](0,e,k,l,d),isNaN(c)&&(c=h),0===l&&this.animations.splice(a,1)),this.setAttr(f,g,c)):("translate"==g?(k=c.to.split(","),l=Number(k[0]),k=Number(k[1]),f.translate(l,k)):(h=Number(c.to),this.setAttr(f,g,h)),this.animations.splice(a,1))}},getBBox:function(a){if(a=a.node)try{return a.getBBox()}catch(b){}return{width:0,
height:0,x:0,y:0}},path:function(a,b){a.node.setAttributeNS(AmCharts.SVG_XLINK,"xlink:href",b)},clipRect:function(a,b,c,d,e){var f=a.node,g=a.clipPath;g&&this.D.remove(g);var h=f.parentNode;h&&(f=document.createElementNS(AmCharts.SVG_NS,"clipPath"),g=AmCharts.getUniqueId(),f.setAttribute("id",g),this.D.rect(b,c,d,e,0,0,f),h.appendChild(f),b="#",AmCharts.baseHref&&!AmCharts.isIE&&(b=this.removeTarget(window.location.href)+b),this.setAttr(a,"clip-path","url("+b+g+")"),this.clipPathC++,a.clipPath=f)},
text:function(a,b,c){var d=new AmCharts.AmDObject("text",this.D);a=String(a).split("\n");var e=b["font-size"],f;for(f=0;f<a.length;f++){var g=this.create(null,"tspan");g.appendChild(document.createTextNode(a[f]));g.setAttribute("y",(e+2)*f+Math.round(e/2));g.setAttribute("x",0);g.style.fontSize=e+"px";d.node.appendChild(g)}d.node.setAttribute("y",Math.round(e/2));this.attr(d,b);this.D.addToContainer(d.node,c);return d},setText:function(a,b){var c=a.node;c&&(c.removeChild(c.firstChild),c.appendChild(document.createTextNode(b)))},
move:function(a,b,c,d){isNaN(b)&&(b=0);isNaN(c)&&(c=0);b="translate("+b+","+c+")";d&&(b=b+" scale("+d+")");this.setAttr(a,"transform",b)},rotate:function(a,b){var c=a.node.getAttribute("transform"),d="rotate("+b+")";c&&(d=c+" "+d);this.setAttr(a,"transform",d)},set:function(a){var b=new AmCharts.AmDObject("g",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},addListener:function(a,b,c){a.node["on"+b]=c},gradient:function(a,b,c,d){var e=a.node,f=
a.grad;f&&this.D.remove(f);b=document.createElementNS(AmCharts.SVG_NS,b);f=AmCharts.getUniqueId();b.setAttribute("id",f);if(!isNaN(d)){var g=0,h=0,k=0,l=0;90==d?k=100:270==d?l=100:180==d?g=100:0===d&&(h=100);b.setAttribute("x1",g+"%");b.setAttribute("x2",h+"%");b.setAttribute("y1",k+"%");b.setAttribute("y2",l+"%")}for(d=0;d<c.length;d++)g=document.createElementNS(AmCharts.SVG_NS,"stop"),h=100*d/(c.length-1),0===d&&(h=0),g.setAttribute("offset",h+"%"),g.setAttribute("stop-color",c[d]),b.appendChild(g);
e.parentNode.appendChild(b);c="#";AmCharts.baseHref&&!AmCharts.isIE&&(c=this.removeTarget(window.location.href)+c);e.setAttribute("fill","url("+c+f+")");a.grad=b},removeTarget:function(a){urlArr=a.split("#");return urlArr[0]},pattern:function(a,b,c){var d=a.node;isNaN(c)&&(c=1);var e=a.patternNode;e&&this.D.remove(e);var e=document.createElementNS(AmCharts.SVG_NS,"pattern"),f=AmCharts.getUniqueId(),g=b;b.url&&(g=b.url);var h=Number(b.width);isNaN(h)&&(h=4);var k=Number(b.height);isNaN(k)&&(k=4);h/=
c;k/=c;c=b.x;isNaN(c)&&(c=0);var l=-Math.random()*Number(b.randomX);isNaN(l)||(c=l);l=b.y;isNaN(l)&&(l=0);var m=-Math.random()*Number(b.randomY);isNaN(m)||(l=m);e.setAttribute("id",f);e.setAttribute("width",h);e.setAttribute("height",k);e.setAttribute("patternUnits","userSpaceOnUse");e.setAttribute("xlink:href",g);b.color&&(m=document.createElementNS(AmCharts.SVG_NS,"rect"),m.setAttributeNS(null,"height",h),m.setAttributeNS(null,"width",k),m.setAttributeNS(null,"fill",b.color),e.appendChild(m));this.D.image(g,
0,0,h,k,e).translate(c,l);g="#";AmCharts.baseHref&&!AmCharts.isIE&&(g=this.removeTarget(window.location.href)+g);d.setAttribute("fill","url("+g+f+")");a.patternNode=e;d.parentNode.appendChild(e)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);a.grad&&this.D.remove(a.grad);a.patternNode&&this.D.remove(a.patternNode);this.D.remove(a.node)}});AmCharts.AmDSet=AmCharts.Class({construct:function(a){this.create("g")},attr:function(a){this.R.attr(this.node,a)},move:function(a,b){this.R.move(this.node,a,b)}});AmCharts.AmLegend=AmCharts.Class({construct:function(a){this.enabled=!0;this.cname="AmLegend";this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","rollOverItem","rollOutItem","clickLabel");this.position="bottom";this.borderColor=this.color="#000000";this.borderAlpha=0;this.markerLabelGap=5;this.verticalGap=10;this.align="left";this.horizontalGap=0;this.spacing=10;this.markerDisabledColor="#AAB3B3";this.markerType="square";this.markerSize=
16;this.markerBorderThickness=this.markerBorderAlpha=1;this.marginBottom=this.marginTop=0;this.marginLeft=this.marginRight=20;this.autoMargins=!0;this.valueWidth=50;this.switchable=!0;this.switchType="x";this.switchColor="#FFFFFF";this.rollOverColor="#CC0000";this.reversedOrder=!1;this.labelText="[[title]]";this.valueText="[[value]]";this.useMarkerColorForLabels=!1;this.rollOverGraphAlpha=1;this.textClickEnabled=!1;this.equalWidths=!0;this.dateFormat="DD-MM-YYYY";this.backgroundColor="#FFFFFF";this.backgroundAlpha=
0;this.useGraphSettings=!1;this.showEntries=!0;AmCharts.applyTheme(this,a,this.cname)},setData:function(a){this.legendData=a;this.invalidateSize()},invalidateSize:function(){this.destroy();this.entries=[];this.valueLabels=[];var a=this.legendData;this.enabled&&(AmCharts.ifArray(a)||AmCharts.ifArray(this.data))&&this.drawLegend()},drawLegend:function(){var a=this.chart,b=this.position,c=this.width,d=a.divRealWidth,e=a.divRealHeight,f=this.div,g=this.legendData;this.data&&(g=this.data);isNaN(this.fontSize)&&
(this.fontSize=a.fontSize);if("right"==b||"left"==b)this.maxColumns=1,this.autoMargins&&(this.marginLeft=this.marginRight=10);else if(this.autoMargins){this.marginRight=a.marginRight;this.marginLeft=a.marginLeft;var h=a.autoMarginOffset;"bottom"==b?(this.marginBottom=h,this.marginTop=0):(this.marginTop=h,this.marginBottom=0)}c=void 0!==c?AmCharts.toCoordinate(c,d):a.realWidth;"outside"==b?(c=f.offsetWidth,e=f.offsetHeight,f.clientHeight&&(c=f.clientWidth,e=f.clientHeight)):(isNaN(c)||(f.style.width=
c+"px"),f.className="amChartsLegend "+a.classNamePrefix+"-legend-div");this.divWidth=c;(b=this.container)?(b.container.innerHTML="",f.appendChild(b.container),b.width=c,b.height=e,b.addDefs(a)):b=new AmCharts.AmDraw(f,c,e,a);this.container=b;this.lx=0;this.ly=8;e=this.markerSize;e>this.fontSize&&(this.ly=e/2-1);0<e&&(this.lx+=e+this.markerLabelGap);this.titleWidth=0;if(e=this.title)e=AmCharts.text(this.container,e,this.color,a.fontFamily,this.fontSize,"start",!0),AmCharts.setCN(a,e,"legend-title"),
e.translate(this.marginLeft,this.marginTop+this.verticalGap+this.ly+1),a=e.getBBox(),this.titleWidth=a.width+15,this.titleHeight=a.height+6;this.index=this.maxLabelWidth=0;if(this.showEntries){for(a=0;a<g.length;a++)this.createEntry(g[a]);for(a=this.index=0;a<g.length;a++)this.createValue(g[a])}this.arrangeEntries();this.updateValues()},arrangeEntries:function(){var a=this.position,b=this.marginLeft+this.titleWidth,c=this.marginRight,d=this.marginTop,e=this.marginBottom,f=this.horizontalGap,g=this.div,
h=this.divWidth,k=this.maxColumns,l=this.verticalGap,m=this.spacing,n=h-c-b,p=0,r=0,q=this.container;this.set&&this.set.remove();var t=q.set();this.set=t;var z=q.set();t.push(z);var x=this.entries,u,w;for(w=0;w<x.length;w++){u=x[w].getBBox();var y=u.width;y>p&&(p=y);u=u.height;u>r&&(r=u)}var y=r=0,A=f,C=0,B=0;for(w=0;w<x.length;w++){var H=x[w];this.reversedOrder&&(H=x[x.length-w-1]);u=H.getBBox();var D;this.equalWidths?D=f+y*(p+m+this.markerLabelGap):(D=A,A=A+u.width+f+m);u.height>B&&(B=u.height);
D+u.width>n&&0<w&&0!==y&&(r++,y=0,D=f,A=D+u.width+f+m,C=C+B+l,B=0);H.translate(D,C);y++;!isNaN(k)&&y>=k&&(y=0,r++,C=C+B+l,B=0);z.push(H)}u=z.getBBox();k=u.height+2*l-1;"left"==a||"right"==a?(h=u.width+2*f,g.style.width=h+b+c+"px"):h=h-b-c-1;c=AmCharts.polygon(this.container,[0,h,h,0],[0,0,k,k],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);AmCharts.setCN(this.chart,c,"legend-bg");t.push(c);t.translate(b,d);c.toBack();b=f;if("top"==a||"bottom"==a||"absolute"==a||"outside"==
a)"center"==this.align?b=f+(h-u.width)/2:"right"==this.align&&(b=f+h-u.width);z.translate(b,l+1);this.titleHeight>k&&(k=this.titleHeight);a=k+d+e+1;0>a&&(a=0);a>this.chart.divRealHeight&&(g.style.top="0px");g.style.height=Math.round(a)+"px";q.setSize(this.divWidth,a)},createEntry:function(a){if(!1!==a.visibleInLegend){var b=this.chart,c=a.markerType;a.legendEntryWidth=this.markerSize;c||(c=this.markerType);var d=a.color,e=a.alpha;a.legendKeyColor&&(d=a.legendKeyColor());a.legendKeyAlpha&&(e=a.legendKeyAlpha());
var f;!0===a.hidden&&(f=d=this.markerDisabledColor);var g=a.pattern,h=a.customMarker;h||(h=this.customMarker);var k=this.container,l=this.markerSize,m=0,n=0,p=l/2;if(this.useGraphSettings){c=a.type;this.switchType=void 0;if("line"==c||"step"==c||"smoothedLine"==c||"ohlc"==c)g=k.set(),a.hidden||(d=a.lineColorR,f=a.bulletBorderColorR),m=AmCharts.line(k,[0,2*l],[l/2,l/2],d,a.lineAlpha,a.lineThickness,a.dashLength),AmCharts.setCN(b,m,"graph-stroke"),g.push(m),a.bullet&&(a.hidden||(d=a.bulletColorR),m=
AmCharts.bullet(k,a.bullet,a.bulletSize,d,a.bulletAlpha,a.bulletBorderThickness,f,a.bulletBorderAlpha))&&(AmCharts.setCN(b,m,"graph-bullet"),m.translate(l+1,l/2),g.push(m)),p=0,m=l,n=l/3;else{var r;a.getGradRotation&&(r=a.getGradRotation());m=a.fillColorsR;!0===a.hidden&&(m=d);if(g=this.createMarker("rectangle",m,a.fillAlphas,a.lineThickness,d,a.lineAlpha,r,g))p=l,g.translate(p,l/2);m=l}AmCharts.setCN(b,g,"graph-"+c);AmCharts.setCN(b,g,"graph-"+a.id)}else h?(b.path&&(h=b.path+h),g=k.image(h,0,0,l,
l)):(g=this.createMarker(c,d,e,void 0,void 0,void 0,void 0,g))&&g.translate(l/2,l/2);AmCharts.setCN(b,g,"legend-marker");this.addListeners(g,a);k=k.set([g]);this.switchable&&a.switchable&&k.setAttr("cursor","pointer");void 0!=a.id&&AmCharts.setCN(b,k,"legend-item-"+a.id);AmCharts.setCN(b,k,a.className,!0);(f=this.switchType)&&"none"!=f&&("x"==f?(c=this.createX(),c.translate(l/2,l/2)):c=this.createV(),c.dItem=a,!0!==a.hidden?"x"==f?c.hide():c.show():"x"!=f&&c.hide(),this.switchable||c.hide(),this.addListeners(c,
a),a.legendSwitch=c,k.push(c),AmCharts.setCN(b,c,"legend-switch"));f=this.color;a.showBalloon&&this.textClickEnabled&&void 0!==this.selectedColor&&(f=this.selectedColor);this.useMarkerColorForLabels&&(f=d);!0===a.hidden&&(f=this.markerDisabledColor);d=AmCharts.massReplace(this.labelText,{"[[title]]":a.title});c=this.fontSize;g&&(l<=c&&g.translate(p,l/2+this.ly-c/2+(c+2-l)/2-n),a.legendEntryWidth=g.getBBox().width);var q;d&&(d=AmCharts.fixBrakes(d),a.legendTextReal=d,q=this.labelWidth,q=isNaN(q)?AmCharts.text(this.container,
d,f,b.fontFamily,c,"start"):AmCharts.wrappedText(this.container,d,f,b.fontFamily,c,"start",!1,q,0),AmCharts.setCN(b,q,"legend-label"),q.translate(this.lx+m,this.ly),k.push(q),b=q.getBBox().width,this.maxLabelWidth<b&&(this.maxLabelWidth=b));this.entries[this.index]=k;a.legendEntry=this.entries[this.index];a.legendLabel=q;this.index++}},addListeners:function(a,b){var c=this;a&&a.mouseover(function(a){c.rollOverMarker(b,a)}).mouseout(function(a){c.rollOutMarker(b,a)}).click(function(a){c.clickMarker(b,
a)})},rollOverMarker:function(a,b){this.switchable&&this.dispatch("rollOverMarker",a,b);this.dispatch("rollOverItem",a,b)},rollOutMarker:function(a,b){this.switchable&&this.dispatch("rollOutMarker",a,b);this.dispatch("rollOutItem",a,b)},clickMarker:function(a,b){this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b));this.dispatch("clickMarker",a,b)},rollOverLabel:function(a,b){a.hidden||(this.textClickEnabled&&a.legendLabel&&a.legendLabel.attr({fill:this.rollOverColor}),
this.dispatch("rollOverItem",a,b))},rollOutLabel:function(a,b){if(!a.hidden){if(this.textClickEnabled&&a.legendLabel){var c=this.color;void 0!==this.selectedColor&&a.showBalloon&&(c=this.selectedColor);this.useMarkerColorForLabels&&(c=a.lineColor,void 0===c&&(c=a.color));a.legendLabel.attr({fill:c})}this.dispatch("rollOutItem",a,b)}},clickLabel:function(a,b){this.textClickEnabled?a.hidden||this.dispatch("clickLabel",a,b):this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",
a,b))},dispatch:function(a,b,c){this.fire(a,{type:a,dataItem:b,target:this,event:c,chart:this.chart})},createValue:function(a){var b=this,c=b.fontSize,d=b.chart;if(!1!==a.visibleInLegend){var e=b.maxLabelWidth;b.equalWidths||(b.valueAlign="left");"left"==b.valueAlign&&(e=a.legendEntry.getBBox().width);var f=e;if(b.valueText&&0<b.valueWidth){var g=b.color;b.useMarkerColorForValues&&(g=a.color,a.legendKeyColor&&(g=a.legendKeyColor()));!0===a.hidden&&(g=b.markerDisabledColor);var h=b.valueText,e=e+b.lx+
b.markerLabelGap+b.valueWidth,k="end";"left"==b.valueAlign&&(e-=b.valueWidth,k="start");g=AmCharts.text(b.container,h,g,b.chart.fontFamily,c,k);AmCharts.setCN(d,g,"legend-value");g.translate(e,b.ly);b.entries[b.index].push(g);f+=b.valueWidth+2*b.markerLabelGap;g.dItem=a;b.valueLabels.push(g)}b.index++;d=b.markerSize;d<c+7&&(d=c+7,AmCharts.VML&&(d+=3));c=b.container.rect(a.legendEntryWidth,0,f,d,0,0).attr({stroke:"none",fill:"#fff","fill-opacity":.005});c.dItem=a;b.entries[b.index-1].push(c);c.mouseover(function(c){b.rollOverLabel(a,
c)}).mouseout(function(c){b.rollOutLabel(a,c)}).click(function(c){b.clickLabel(a,c)})}},createV:function(){var a=this.markerSize;return AmCharts.polygon(this.container,[a/5,a/2,a-a/5,a/2],[a/3,a-a/5,a/5,a/1.7],this.switchColor)},createX:function(){var a=(this.markerSize-4)/2,b={stroke:this.switchColor,"stroke-width":3},c=this.container,d=AmCharts.line(c,[-a,a],[-a,a]).attr(b),a=AmCharts.line(c,[-a,a],[a,-a]).attr(b);return this.container.set([d,a])},createMarker:function(a,b,c,d,e,f,g,h){var k=this.markerSize,
l=this.container;e||(e=this.markerBorderColor);e||(e=b);isNaN(d)&&(d=this.markerBorderThickness);isNaN(f)&&(f=this.markerBorderAlpha);return AmCharts.bullet(l,a,k,b,c,d,e,f,k,g,h)},validateNow:function(){this.invalidateSize()},updateValues:function(){var a=this.valueLabels,b=this.chart,c,d=this.data;for(c=0;c<a.length;c++){var e=a[c],f=e.dItem,g=" ";if(d)f.value?e.text(f.value):e.text("");else{if(void 0!==f.type){var h=f.currentDataItem,k=this.periodValueText;f.legendPeriodValueText&&(k=f.legendPeriodValueText);
h?(g=this.valueText,f.legendValueText&&(g=f.legendValueText),g=b.formatString(g,h)):k&&(g=b.formatPeriodString(k,f))}else g=b.formatString(this.valueText,f);if(k=this.valueFunction)h&&(f=h),g=k(f,g);e.text(g)}}},renderFix:function(){if(!AmCharts.VML){var a=this.container;a&&a.renderFix()}},destroy:function(){this.div.innerHTML="";AmCharts.remove(this.set)}});AmCharts.formatMilliseconds=function(a,b){if(-1!=a.indexOf("fff")){var c=b.getMilliseconds(),d=String(c);10>c&&(d="00"+c);10<=c&&100>c&&(d="0"+c);a=a.replace(/fff/g,d)}return a};AmCharts.extractPeriod=function(a){var b=AmCharts.stripNumbers(a),c=1;b!=a&&(c=Number(a.slice(0,a.indexOf(b))));return{period:b,count:c}};
AmCharts.newDate=function(a,b){return"fff"==b?AmCharts.useUTC?new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds()):new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds()):new Date(a)};
AmCharts.resetDateToMin=function(a,b,c,d){void 0===d&&(d=1);var e,f,g,h,k,l,m;AmCharts.useUTC?(e=a.getUTCFullYear(),f=a.getUTCMonth(),g=a.getUTCDate(),h=a.getUTCHours(),k=a.getUTCMinutes(),l=a.getUTCSeconds(),m=a.getUTCMilliseconds(),a=a.getUTCDay()):(e=a.getFullYear(),f=a.getMonth(),g=a.getDate(),h=a.getHours(),k=a.getMinutes(),l=a.getSeconds(),m=a.getMilliseconds(),a=a.getDay());switch(b){case "YYYY":e=Math.floor(e/c)*c;f=0;g=1;m=l=k=h=0;break;case "MM":f=Math.floor(f/c)*c;g=1;m=l=k=h=0;break;case "WW":0===
a&&0<d&&(a=7);g=g-a+d;m=l=k=h=0;break;case "DD":m=l=k=h=0;break;case "hh":h=Math.floor(h/c)*c;m=l=k=0;break;case "mm":k=Math.floor(k/c)*c;m=l=0;break;case "ss":l=Math.floor(l/c)*c;m=0;break;case "fff":m=Math.floor(m/c)*c}AmCharts.useUTC?(a=new Date,a.setUTCFullYear(e,f,g),a.setUTCHours(h,k,l,m)):a=new Date(e,f,g,h,k,l,m);return a};
AmCharts.getPeriodDuration=function(a,b){void 0===b&&(b=1);var c;switch(a){case "YYYY":c=316224E5;break;case "MM":c=26784E5;break;case "WW":c=6048E5;break;case "DD":c=864E5;break;case "hh":c=36E5;break;case "mm":c=6E4;break;case "ss":c=1E3;break;case "fff":c=1}return c*b};AmCharts.intervals={s:{nextInterval:"ss",contains:1E3},ss:{nextInterval:"mm",contains:60,count:0},mm:{nextInterval:"hh",contains:60,count:1},hh:{nextInterval:"DD",contains:24,count:2},DD:{nextInterval:"",contains:Infinity,count:3}};
AmCharts.getMaxInterval=function(a,b){var c=AmCharts.intervals;return a>=c[b].contains?(a=Math.round(a/c[b].contains),b=c[b].nextInterval,AmCharts.getMaxInterval(a,b)):"ss"==b?c[b].nextInterval:b};AmCharts.dayNames="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");AmCharts.shortDayNames="Sun Mon Tue Wed Thu Fri Sat".split(" ");AmCharts.monthNames="January February March April May June July August September October November December".split(" ");AmCharts.shortMonthNames="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
AmCharts.getWeekNumber=function(a){a=new Date(a);a.setHours(0,0,0);a.setDate(a.getDate()+4-(a.getDay()||7));var b=new Date(a.getFullYear(),0,1);return Math.ceil(((a-b)/864E5+1)/7)};
AmCharts.stringToDate=function(a,b){var c={},d=[{pattern:"YYYY",period:"year"},{pattern:"YY",period:"year"},{pattern:"MM",period:"month"},{pattern:"M",period:"month"},{pattern:"DD",period:"date"},{pattern:"D",period:"date"},{pattern:"JJ",period:"hours"},{pattern:"J",period:"hours"},{pattern:"HH",period:"hours"},{pattern:"H",period:"hours"},{pattern:"KK",period:"hours"},{pattern:"K",period:"hours"},{pattern:"LL",period:"hours"},{pattern:"L",period:"hours"},{pattern:"NN",period:"minutes"},{pattern:"N",
period:"minutes"},{pattern:"SS",period:"seconds"},{pattern:"S",period:"seconds"},{pattern:"QQQ",period:"milliseconds"},{pattern:"QQ",period:"milliseconds"},{pattern:"Q",period:"milliseconds"}],e=!0,f=b.indexOf("AA");-1!=f&&(a.substr(f,2),"pm"==a.toLowerCase&&(e=!1));var f=b,g,h,k;for(k=0;k<d.length;k++)h=d[k].period,c[h]=0,"date"==h&&(c[h]=1);for(k=0;k<d.length;k++)if(g=d[k].pattern,h=d[k].period,-1!=b.indexOf(g)){var l=AmCharts.getFromDateString(g,a,f);b=b.replace(g,"");if("KK"==g||"K"==g||"LL"==
g||"L"==g)e||(l+=12);c[h]=l}AmCharts.useUTC?(d=new Date,d.setUTCFullYear(c.year,c.month,c.date),d.setUTCHours(c.hours,c.minutes,c.seconds,c.milliseconds)):d=new Date(c.year,c.month,c.date,c.hours,c.minutes,c.seconds,c.milliseconds);return d};AmCharts.getFromDateString=function(a,b,c){if(void 0!==b)return c=c.indexOf(a),b=String(b),b=b.substr(c,a.length),"0"==b.charAt(0)&&(b=b.substr(1,b.length-1)),b=Number(b),isNaN(b)&&(b=0),-1!=a.indexOf("M")&&b--,b};
AmCharts.formatDate=function(a,b,c){c||(c=AmCharts);var d,e,f,g,h,k,l,m=AmCharts.getWeekNumber(a);AmCharts.useUTC?(d=a.getUTCFullYear(),e=a.getUTCMonth(),f=a.getUTCDate(),g=a.getUTCDay(),h=a.getUTCHours(),k=a.getUTCMinutes(),l=a.getUTCSeconds(),a=a.getUTCMilliseconds()):(d=a.getFullYear(),e=a.getMonth(),f=a.getDate(),g=a.getDay(),h=a.getHours(),k=a.getMinutes(),l=a.getSeconds(),a=a.getMilliseconds());var n=String(d).substr(2,2),p=e+1;9>e&&(p="0"+p);var r="0"+g;b=b.replace(/W/g,m);m=h;24==m&&(m=0);
var q=m;10>q&&(q="0"+q);b=b.replace(/JJ/g,q);b=b.replace(/J/g,m);q=h;0===q&&(q=24,-1!=b.indexOf("H")&&f--);m=f;10>f&&(m="0"+f);var t=q;10>t&&(t="0"+t);b=b.replace(/HH/g,t);b=b.replace(/H/g,q);q=h;11<q&&(q-=12);t=q;10>t&&(t="0"+t);b=b.replace(/KK/g,t);b=b.replace(/K/g,q);q=h;0===q&&(q=12);12<q&&(q-=12);t=q;10>t&&(t="0"+t);b=b.replace(/LL/g,t);b=b.replace(/L/g,q);q=k;10>q&&(q="0"+q);b=b.replace(/NN/g,q);b=b.replace(/N/g,k);k=l;10>k&&(k="0"+k);b=b.replace(/SS/g,k);b=b.replace(/S/g,l);l=a;10>l&&(l="00"+
l);100>l&&(l="0"+l);k=a;10>k&&(k="00"+k);b=b.replace(/QQQ/g,l);b=b.replace(/QQ/g,k);b=b.replace(/Q/g,a);b=12>h?b.replace(/A/g,"am"):b.replace(/A/g,"pm");b=b.replace(/YYYY/g,"@IIII@");b=b.replace(/YY/g,"@II@");b=b.replace(/MMMM/g,"@XXXX@");b=b.replace(/MMM/g,"@XXX@");b=b.replace(/MM/g,"@XX@");b=b.replace(/M/g,"@X@");b=b.replace(/DD/g,"@RR@");b=b.replace(/D/g,"@R@");b=b.replace(/EEEE/g,"@PPPP@");b=b.replace(/EEE/g,"@PPP@");b=b.replace(/EE/g,"@PP@");b=b.replace(/E/g,"@P@");b=b.replace(/@IIII@/g,d);b=
b.replace(/@II@/g,n);b=b.replace(/@XXXX@/g,c.monthNames[e]);b=b.replace(/@XXX@/g,c.shortMonthNames[e]);b=b.replace(/@XX@/g,p);b=b.replace(/@X@/g,e+1);b=b.replace(/@RR@/g,m);b=b.replace(/@R@/g,f);b=b.replace(/@PPPP@/g,c.dayNames[g]);b=b.replace(/@PPP@/g,c.shortDayNames[g]);b=b.replace(/@PP@/g,r);return b=b.replace(/@P@/g,g)};
AmCharts.changeDate=function(a,b,c,d,e){if(AmCharts.useUTC)return AmCharts.changeUTCDate(a,b,c,d,e);var f=-1;void 0===d&&(d=!0);void 0===e&&(e=!1);!0===d&&(f=1);switch(b){case "YYYY":a.setFullYear(a.getFullYear()+c*f);d||e||a.setDate(a.getDate()+1);break;case "MM":b=a.getMonth();a.setMonth(a.getMonth()+c*f);a.getMonth()>b+c*f&&a.setDate(a.getDate()-1);d||e||a.setDate(a.getDate()+1);break;case "DD":a.setDate(a.getDate()+c*f);break;case "WW":a.setDate(a.getDate()+c*f*7);break;case "hh":a.setHours(a.getHours()+
c*f);break;case "mm":a.setMinutes(a.getMinutes()+c*f);break;case "ss":a.setSeconds(a.getSeconds()+c*f);break;case "fff":a.setMilliseconds(a.getMilliseconds()+c*f)}return a};
AmCharts.changeUTCDate=function(a,b,c,d,e){var f=-1;void 0===d&&(d=!0);void 0===e&&(e=!1);!0===d&&(f=1);switch(b){case "YYYY":a.setUTCFullYear(a.getUTCFullYear()+c*f);d||e||a.setUTCDate(a.getUTCDate()+1);break;case "MM":b=a.getUTCMonth();a.setUTCMonth(a.getUTCMonth()+c*f);a.getUTCMonth()>b+c*f&&a.setUTCDate(a.getUTCDate()-1);d||e||a.setUTCDate(a.getUTCDate()+1);break;case "DD":a.setUTCDate(a.getUTCDate()+c*f);break;case "WW":a.setUTCDate(a.getUTCDate()+c*f*7);break;case "hh":a.setUTCHours(a.getUTCHours()+
c*f);break;case "mm":a.setUTCMinutes(a.getUTCMinutes()+c*f);break;case "ss":a.setUTCSeconds(a.getUTCSeconds()+c*f);break;case "fff":a.setUTCMilliseconds(a.getUTCMilliseconds()+c*f)}return a};
AmCharts.AmSerialChart=AmCharts.Class({inherits:AmCharts.AmRectangularChart,construct:function(a){this.type="serial";AmCharts.AmSerialChart.base.construct.call(this,a);this.cname="AmSerialChart";this.theme=a;this.createEvents("changed");this.columnSpacing=5;this.columnSpacing3D=0;this.columnWidth=.8;this.updateScrollbar=!0;var b=new AmCharts.CategoryAxis(a);b.chart=this;this.categoryAxis=b;this.zoomOutOnDataUpdate=!0;this.mouseWheelZoomEnabled=this.mouseWheelScrollEnabled=this.rotate=this.skipZoom=
!1;this.minSelectedTime=0;AmCharts.applyTheme(this,a,this.cname)},initChart:function(){AmCharts.AmSerialChart.base.initChart.call(this);this.updateCategoryAxis(this.categoryAxis,this.rotate,"categoryAxis");this.dataChanged&&(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);var a=this.chartCursor;a&&(a.updateData(),a.fullWidth&&(a.fullRectSet=this.cursorLineSet));var a=this.countColumns(),b=this.graphs,d;for(d=0;d<b.length;d++)b[d].columnCount=a;this.updateScrollbar=!0;this.drawChart();
this.autoMargins&&!this.marginsUpdated&&(this.marginsUpdated=!0,this.measureMargins())},handleWheelReal:function(a,b){if(!this.wheelBusy){var d=this.categoryAxis,c=d.parseDates,e=d.minDuration(),f=d=1;this.mouseWheelZoomEnabled?b||(d=-1):b&&(d=-1);var h=this.chartData.length,n=this.lastTime,g=this.firstTime;0>a?c?(h=this.endTime-this.startTime,c=this.startTime+d*e,e=this.endTime+f*e,0<f&&0<d&&e>=n&&(e=n,c=n-h),this.zoomToDates(new Date(c),new Date(e))):(0<f&&0<d&&this.end>=h-1&&(d=f=0),c=this.start+
d,e=this.end+f,this.zoomToIndexes(c,e)):c?(h=this.endTime-this.startTime,c=this.startTime-d*e,e=this.endTime-f*e,0<f&&0<d&&c<=g&&(c=g,e=g+h),this.zoomToDates(new Date(c),new Date(e))):(0<f&&0<d&&1>this.start&&(d=f=0),c=this.start-d,e=this.end-f,this.zoomToIndexes(c,e))}},validateData:function(a){this.marginsUpdated=!1;this.zoomOutOnDataUpdate&&!a&&(this.endTime=this.end=this.startTime=this.start=NaN);AmCharts.AmSerialChart.base.validateData.call(this)},drawChart:function(){AmCharts.AmSerialChart.base.drawChart.call(this);
var a=this.chartData;if(AmCharts.ifArray(a)){var b=this.chartScrollbar;b&&b.draw();if(0<this.realWidth&&0<this.realHeight){var a=a.length-1,d,b=this.categoryAxis;if(b.parseDates&&!b.equalSpacing){if(b=this.startTime,d=this.endTime,isNaN(b)||isNaN(d))b=this.firstTime,d=this.lastTime}else if(b=this.start,d=this.end,isNaN(b)||isNaN(d))b=0,d=a;this.endTime=this.startTime=this.end=this.start=void 0;this.zoom(b,d)}}else this.cleanChart();this.dispDUpd();this.chartCreated=!0},cleanChart:function(){AmCharts.callMethod("destroy",
[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor])},updateCategoryAxis:function(a,b,d){a.chart=this;a.id=d;a.rotate=b;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;a.axisItemRenderer=AmCharts.RecItem;a.setOrientation(!this.rotate);a.x=this.marginLeftReal;a.y=this.marginTopReal;a.dx=this.dx;a.dy=this.dy;a.width=this.plotAreaWidth-1;a.height=this.plotAreaHeight-1;a.viW=this.plotAreaWidth-1;a.viH=this.plotAreaHeight-1;a.viX=this.marginLeftReal;
a.viY=this.marginTopReal;a.marginsChanged=!0},updateValueAxes:function(){AmCharts.AmSerialChart.base.updateValueAxes.call(this);var a=this.valueAxes,b;for(b=0;b<a.length;b++){var d=a[b],c=this.rotate;d.rotate=c;d.setOrientation(c);c=this.categoryAxis;if(!c.startOnAxis||c.parseDates)d.expandMinMax=!0}},updateData:function(){this.parseData();var a=this.graphs,b,d=this.chartData;for(b=0;b<a.length;b++)a[b].data=d;0<d.length&&(this.firstTime=this.getStartTime(d[0].time),this.lastTime=this.getEndTime(d[d.length-
1].time))},getStartTime:function(a){var b=this.categoryAxis;return AmCharts.resetDateToMin(new Date(a),b.minPeriod,1,b.firstDayOfWeek).getTime()},getEndTime:function(a){var b=AmCharts.extractPeriod(this.categoryAxis.minPeriod);return AmCharts.changeDate(new Date(a),b.period,b.count,!0).getTime()-1},updateMargins:function(){AmCharts.AmSerialChart.base.updateMargins.call(this);var a=this.chartScrollbar;a&&(this.getScrollbarPosition(a,this.rotate,this.categoryAxis.position),this.adjustMargins(a,this.rotate))},
updateScrollbars:function(){AmCharts.AmSerialChart.base.updateScrollbars.call(this);this.updateChartScrollbar(this.chartScrollbar,this.rotate)},zoom:function(a,b){var d=this.categoryAxis;d.parseDates&&!d.equalSpacing?this.timeZoom(a,b):this.indexZoom(a,b);this.updateLegendValues()},timeZoom:function(a,b){var d=this.maxSelectedTime;isNaN(d)||(b!=this.endTime&&b-a>d&&(a=b-d,this.updateScrollbar=!0),a!=this.startTime&&b-a>d&&(b=a+d,this.updateScrollbar=!0));var c=this.minSelectedTime;if(0<c&&b-a<c){var e=
Math.round(a+(b-a)/2),c=Math.round(c/2);a=e-c;b=e+c}var f=this.chartData,e=this.categoryAxis;if(AmCharts.ifArray(f)&&(a!=this.startTime||b!=this.endTime)){var h=e.minDuration(),c=this.firstTime,n=this.lastTime;a||(a=c,isNaN(d)||(a=n-d));b||(b=n);a>n&&(a=n);b<c&&(b=c);a<c&&(a=c);b>n&&(b=n);b<a&&(b=a+h);b-a<h/5&&(b<n?b=a+h/5:a=b-h/5);this.startTime=a;this.endTime=b;d=f.length-1;h=this.getClosestIndex(f,"time",a,!0,0,d);f=this.getClosestIndex(f,"time",b,!1,h,d);e.timeZoom(a,b);e.zoom(h,f);this.start=
AmCharts.fitToBounds(h,0,d);this.end=AmCharts.fitToBounds(f,0,d);this.zoomAxesAndGraphs();this.zoomScrollbar();a!=c||b!=n?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchTimeZoomEvent()}},indexZoom:function(a,b){var d=this.maxSelectedSeries;isNaN(d)||(b!=this.end&&b-a>d&&(a=b-d,this.updateScrollbar=!0),a!=this.start&&b-a>d&&(b=a+d,this.updateScrollbar=!0));if(a!=this.start||b!=this.end){var c=this.chartData.length-1;isNaN(a)&&(a=0,isNaN(d)||(a=c-d));isNaN(b)&&(b=c);b<a&&(b=
a);b>c&&(b=c);a>c&&(a=c-1);0>a&&(a=0);this.start=a;this.end=b;this.categoryAxis.zoom(a,b);this.zoomAxesAndGraphs();this.zoomScrollbar();0!==a||b!=this.chartData.length-1?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchIndexZoomEvent()}},updateGraphs:function(){AmCharts.AmSerialChart.base.updateGraphs.call(this);var a=this.graphs,b;for(b=0;b<a.length;b++){var d=a[b];d.columnWidthReal=this.columnWidth;d.categoryAxis=this.categoryAxis;AmCharts.isString(d.fillToGraph)&&(d.fillToGraph=
this.getGraphById(d.fillToGraph))}},updateColumnsDepth:function(){var a,b=this.graphs,d;AmCharts.remove(this.columnsSet);this.columnsArray=[];for(a=0;a<b.length;a++){d=b[a];var c=d.columnsArray;if(c){var e;for(e=0;e<c.length;e++)this.columnsArray.push(c[e])}}this.columnsArray.sort(this.compareDepth);if(0<this.columnsArray.length){b=this.container.set();this.columnSet.push(b);for(a=0;a<this.columnsArray.length;a++)b.push(this.columnsArray[a].column.set);d&&b.translate(d.x,d.y);this.columnsSet=b}},
compareDepth:function(a,b){return a.depth>b.depth?1:-1},zoomScrollbar:function(){var a=this.chartScrollbar,b=this.categoryAxis;a&&this.updateScrollbar&&(a.dragger.stop(),b.parseDates&&!b.equalSpacing?a.timeZoom(this.startTime,this.endTime):a.zoom(this.start,this.end),this.updateScrollbar=!0)},updateTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var d=a[b],d=AmCharts.processObject(d,AmCharts.TrendLine,this.theme);a[b]=d;d.chart=this;d.id||(d.id="trendLineAuto"+b+"_"+(new Date).getTime());
AmCharts.isString(d.valueAxis)&&(d.valueAxis=this.getValueAxisById(d.valueAxis));d.valueAxis||(d.valueAxis=this.valueAxes[0]);d.categoryAxis=this.categoryAxis}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){var a=this.valueAxes,b;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);a=this.graphs;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);this.zoomTrendLines();(b=this.chartCursor)&&b.zoom(this.start,this.end,this.startTime,this.endTime)}},countColumns:function(){var a=0,b=this.valueAxes.length,
d=this.graphs.length,c,e,f=!1,h,n;for(n=0;n<b;n++){e=this.valueAxes[n];var g=e.stackType;if("100%"==g||"regular"==g)for(f=!1,h=0;h<d;h++)c=this.graphs[h],c.tcc=1,c.valueAxis==e&&"column"==c.type&&(!f&&c.stackable&&(a++,f=!0),(!c.stackable&&c.clustered||c.newStack)&&a++,c.columnIndex=a-1,c.clustered||(c.columnIndex=0));if("none"==g||"3d"==g){f=!1;for(h=0;h<d;h++)c=this.graphs[h],c.valueAxis==e&&"column"==c.type&&(c.clustered?(c.tcc=1,c.newStack&&(a=0),c.hidden||(c.columnIndex=a,a++)):c.hidden||(f=
!0,c.tcc=1,c.columnIndex=0));f&&0==a&&(a=1)}if("3d"==g){e=1;for(n=0;n<d;n++)c=this.graphs[n],c.newStack&&e++,c.depthCount=e,c.tcc=a;a=e}}return a},parseData:function(){AmCharts.AmSerialChart.base.parseData.call(this);this.parseSerialData()},getCategoryIndexByValue:function(a){var b=this.chartData,d,c;for(c=0;c<b.length;c++)b[c].category==a&&(d=c);return d},handleCursorChange:function(a){this.updateLegendValues(a.index)},handleCursorZoom:function(a){this.updateScrollbar=!0;this.zoom(a.start,a.end)},
handleScrollbarZoom:function(a){this.updateScrollbar=!1;this.zoom(a.start,a.end)},dispatchTimeZoomEvent:function(){if(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime){var a={type:"zoomed"};a.startDate=new Date(this.startTime);a.endDate=new Date(this.endTime);a.startIndex=this.start;a.endIndex=this.end;this.startIndex=this.start;this.endIndex=this.end;this.startDate=a.startDate;this.endDate=a.endDate;this.prevStartTime=this.startTime;this.prevEndTime=this.endTime;var b=this.categoryAxis,
d=AmCharts.extractPeriod(b.minPeriod).period,b=b.dateFormatsObject[d];a.startValue=AmCharts.formatDate(a.startDate,b,this);a.endValue=AmCharts.formatDate(a.endDate,b,this);a.chart=this;a.target=this;this.fire(a.type,a)}},dispatchIndexZoomEvent:function(){if(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end){this.startIndex=this.start;this.endIndex=this.end;var a=this.chartData;if(AmCharts.ifArray(a)&&!isNaN(this.start)&&!isNaN(this.end)){var b={chart:this,target:this,type:"zoomed"};b.startIndex=
this.start;b.endIndex=this.end;b.startValue=a[this.start].category;b.endValue=a[this.end].category;this.categoryAxis.parseDates&&(this.startTime=a[this.start].time,this.endTime=a[this.end].time,b.startDate=new Date(this.startTime),b.endDate=new Date(this.endTime));this.prevStartIndex=this.start;this.prevEndIndex=this.end;this.fire(b.type,b)}}},updateLegendValues:function(a){var b=this.graphs,d;for(d=0;d<b.length;d++){var c=b[d];isNaN(a)?c.currentDataItem=void 0:c.currentDataItem=this.chartData[a].axes[c.valueAxis.id].graphs[c.id]}this.legend&&
this.legend.updateValues()},getClosestIndex:function(a,b,d,c,e,f){0>e&&(e=0);f>a.length-1&&(f=a.length-1);var h=e+Math.round((f-e)/2),n=a[h][b];if(1>=f-e){if(c)return e;c=a[f][b];return Math.abs(a[e][b]-d)<Math.abs(c-d)?e:f}return d==n?h:d<n?this.getClosestIndex(a,b,d,c,e,h):this.getClosestIndex(a,b,d,c,h,f)},zoomToIndexes:function(a,b){this.updateScrollbar=!0;var d=this.chartData;if(d){var c=d.length;0<c&&(0>a&&(a=0),b>c-1&&(b=c-1),c=this.categoryAxis,c.parseDates&&!c.equalSpacing?this.zoom(d[a].time,
this.getEndTime(d[b].time)):this.zoom(a,b))}},zoomToDates:function(a,b){this.updateScrollbar=!0;var d=this.chartData;if(this.categoryAxis.equalSpacing){var c=this.getClosestIndex(d,"time",a.getTime(),!0,0,d.length);b=AmCharts.resetDateToMin(b,this.categoryAxis.minPeriod,1);d=this.getClosestIndex(d,"time",b.getTime(),!1,0,d.length);this.zoom(c,d)}else this.zoom(a.getTime(),b.getTime())},zoomToCategoryValues:function(a,b){this.updateScrollbar=!0;this.zoom(this.getCategoryIndexByValue(a),this.getCategoryIndexByValue(b))},
formatPeriodString:function(a,b){if(b){var d=["value","open","low","high","close"],c="value open low high close average sum count".split(" "),e=b.valueAxis,f=this.chartData,h=b.numberFormatter;h||(h=this.nf);for(var n=0;n<d.length;n++){for(var g=d[n],k=0,l=0,m,u,w,t,p,x=0,r=0,A,q,v,y,C,D=this.start;D<=this.end;D++){var z=f[D];if(z&&(z=z.axes[e.id].graphs[b.id])){if(z.values){var B=z.values[g];if(this.rotate){if(0>z.x||z.x>z.graph.height)B=NaN}else if(0>z.x||z.x>z.graph.width)B=NaN;if(!isNaN(B)){isNaN(m)&&
(m=B);u=B;if(isNaN(w)||w>B)w=B;if(isNaN(t)||t<B)t=B;p=AmCharts.getDecimals(k);var F=AmCharts.getDecimals(B),k=k+B,k=AmCharts.roundTo(k,Math.max(p,F));l++;p=k/l}}if(z.percents&&(z=z.percents[g],!isNaN(z))){isNaN(A)&&(A=z);q=z;if(isNaN(v)||v>z)v=z;if(isNaN(y)||y<z)y=z;C=AmCharts.getDecimals(x);B=AmCharts.getDecimals(z);x+=z;x=AmCharts.roundTo(x,Math.max(C,B));r++;C=x/r}}}x={open:A,close:q,high:y,low:v,average:C,sum:x,count:r};a=AmCharts.formatValue(a,{open:m,close:u,high:t,low:w,average:p,sum:k,count:l},
c,h,g+"\\.",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,x,c,this.pf,"percents\\."+g+"\\.")}}return a=AmCharts.cleanFromEmpty(a)},formatString:function(a,b,d){var c=b.graph;if(-1!=a.indexOf("[[category]]")){var e=b.serialDataItem.category;if(this.categoryAxis.parseDates){var f=this.balloonDateFormat,h=this.chartCursor;h&&(f=h.categoryBalloonDateFormat);-1!=a.indexOf("[[category]]")&&(f=AmCharts.formatDate(e,f,this),-1!=f.indexOf("fff")&&(f=AmCharts.formatMilliseconds(f,
e)),e=f)}a=a.replace(/\[\[category\]\]/g,String(e))}c=c.numberFormatter;c||(c=this.nf);e=b.graph.valueAxis;(f=e.duration)&&!isNaN(b.values.value)&&(e=AmCharts.formatDuration(b.values.value,f,"",e.durationUnits,e.maxInterval,c),a=a.replace(RegExp("\\[\\[value\\]\\]","g"),e));e="value open low high close total".split(" ");f=this.pf;a=AmCharts.formatValue(a,b.percents,e,f,"percents\\.");a=AmCharts.formatValue(a,b.values,e,c,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=
AmCharts.formatValue(a,b.values,["percents"],f);-1!=a.indexOf("[[")&&(a=AmCharts.formatDataContextValue(a,b.dataContext));return a=AmCharts.AmSerialChart.base.formatString.call(this,a,b,d)},addChartScrollbar:function(a){AmCharts.callMethod("destroy",[this.chartScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",this.handleScrollbarZoom));this.rotate?void 0===a.width&&(a.width=a.scrollbarHeight):void 0===a.height&&(a.height=a.scrollbarHeight);this.chartScrollbar=a},removeChartScrollbar:function(){AmCharts.callMethod("destroy",
[this.chartScrollbar]);this.chartScrollbar=null},handleReleaseOutside:function(a){AmCharts.AmSerialChart.base.handleReleaseOutside.call(this,a);AmCharts.callMethod("handleReleaseOutside",[this.chartScrollbar])}});AmCharts.Cuboid=AmCharts.Class({construct:function(a,b,d,c,e,f,h,n,g,k,l,m,u,w,t,p,x){this.set=a.set();this.container=a;this.h=Math.round(d);this.w=Math.round(b);this.dx=c;this.dy=e;this.colors=f;this.alpha=h;this.bwidth=n;this.bcolor=g;this.balpha=k;this.dashLength=w;this.topRadius=p;this.pattern=t;this.rotate=u;this.bcn=x;u?0>b&&0===l&&(l=180):0>d&&270==l&&(l=90);this.gradientRotation=l;0===c&&0===e&&(this.cornerRadius=m);this.draw()},draw:function(){var a=this.set;a.clear();var b=this.container,
d=b.chart,c=this.w,e=this.h,f=this.dx,h=this.dy,n=this.colors,g=this.alpha,k=this.bwidth,l=this.bcolor,m=this.balpha,u=this.gradientRotation,w=this.cornerRadius,t=this.dashLength,p=this.pattern,x=this.topRadius,r=this.bcn,A=n,q=n;"object"==typeof n&&(A=n[0],q=n[n.length-1]);var v,y,C,D,z,B,F,K,L,P=g;p&&(g=0);var E,G,H,I,J=this.rotate;if(0<Math.abs(f)||0<Math.abs(h))if(isNaN(x))F=q,q=AmCharts.adjustLuminosity(A,-.2),q=AmCharts.adjustLuminosity(A,-.2),v=AmCharts.polygon(b,[0,f,c+f,c,0],[0,h,h,0,0],
q,g,1,l,0,u),0<m&&(L=AmCharts.line(b,[0,f,c+f],[0,h,h],l,m,k,t)),y=AmCharts.polygon(b,[0,0,c,c,0],[0,e,e,0,0],q,g,1,l,0,u),y.translate(f,h),0<m&&(C=AmCharts.line(b,[f,f],[h,h+e],l,m,k,t)),D=AmCharts.polygon(b,[0,0,f,f,0],[0,e,e+h,h,0],q,g,1,l,0,u),z=AmCharts.polygon(b,[c,c,c+f,c+f,c],[0,e,e+h,h,0],q,g,1,l,0,u),0<m&&(B=AmCharts.line(b,[c,c+f,c+f,c],[0,h,e+h,e],l,m,k,t)),q=AmCharts.adjustLuminosity(F,.2),F=AmCharts.polygon(b,[0,f,c+f,c,0],[e,e+h,e+h,e,e],q,g,1,l,0,u),0<m&&(K=AmCharts.line(b,[0,f,c+
f],[e,e+h,e+h],l,m,k,t));else{var M,N,O;J?(M=e/2,q=f/2,O=e/2,N=c+f/2,G=Math.abs(e/2),E=Math.abs(f/2)):(q=c/2,M=h/2,N=c/2,O=e+h/2+1,E=Math.abs(c/2),G=Math.abs(h/2));H=E*x;I=G*x;.1<E&&.1<E&&(v=AmCharts.circle(b,E,A,g,k,l,m,!1,G),v.translate(q,M));.1<H&&.1<H&&(F=AmCharts.circle(b,H,AmCharts.adjustLuminosity(A,.5),g,k,l,m,!1,I),F.translate(N,O))}g=P;1>Math.abs(e)&&(e=0);1>Math.abs(c)&&(c=0);!isNaN(x)&&(0<Math.abs(f)||0<Math.abs(h))?(n=[A],n={fill:n,stroke:l,"stroke-width":k,"stroke-opacity":m,"fill-opacity":g},
J?(g="M0,0 L"+c+","+(e/2-e/2*x),k=" B",0<c&&(k=" A"),AmCharts.VML?(g+=k+Math.round(c-H)+","+Math.round(e/2-I)+","+Math.round(c+H)+","+Math.round(e/2+I)+","+c+",0,"+c+","+e,g=g+(" L0,"+e)+(k+Math.round(-E)+","+Math.round(e/2-G)+","+Math.round(E)+","+Math.round(e/2+G)+",0,"+e+",0,0")):(g+="A"+H+","+I+",0,0,0,"+c+","+(e-e/2*(1-x))+"L0,"+e,g+="A"+E+","+G+",0,0,1,0,0"),E=90):(k=c/2-c/2*x,g="M0,0 L"+k+","+e,AmCharts.VML?(g="M0,0 L"+k+","+e,k=" B",0>e&&(k=" A"),g+=k+Math.round(c/2-H)+","+Math.round(e-I)+
","+Math.round(c/2+H)+","+Math.round(e+I)+",0,"+e+","+c+","+e,g+=" L"+c+",0",g+=k+Math.round(c/2+E)+","+Math.round(G)+","+Math.round(c/2-E)+","+Math.round(-G)+","+c+",0,0,0"):(g+="A"+H+","+I+",0,0,0,"+(c-c/2*(1-x))+","+e+"L"+c+",0",g+="A"+E+","+G+",0,0,1,0,0"),E=180),b=b.path(g).attr(n),b.gradient("linearGradient",[A,AmCharts.adjustLuminosity(A,-.3),AmCharts.adjustLuminosity(A,-.3),A],E),J?b.translate(f/2,0):b.translate(0,h/2)):b=0===e?AmCharts.line(b,[0,c],[0,0],l,m,k,t):0===c?AmCharts.line(b,[0,
0],[0,e],l,m,k,t):0<w?AmCharts.rect(b,c,e,n,g,k,l,m,w,u,t):AmCharts.polygon(b,[0,0,c,c,0],[0,e,e,0,0],n,g,k,l,m,u,!1,t);c=isNaN(x)?0>e?[v,L,y,C,D,z,B,F,K,b]:[F,K,y,C,D,z,v,L,B,b]:J?0<c?[v,b,F]:[F,b,v]:0>e?[v,b,F]:[F,b,v];AmCharts.setCN(d,b,r+"front");AmCharts.setCN(d,y,r+"back");AmCharts.setCN(d,F,r+"top");AmCharts.setCN(d,v,r+"bottom");AmCharts.setCN(d,D,r+"left");AmCharts.setCN(d,z,r+"right");for(v=0;v<c.length;v++)if(y=c[v])a.push(y),AmCharts.setCN(d,y,r+"element");p&&b.pattern(p)},width:function(a){isNaN(a)&&
(a=0);this.w=Math.round(a);this.draw()},height:function(a){isNaN(a)&&(a=0);this.h=Math.round(a);this.draw()},animateHeight:function(a,b){var d=this;d.easing=b;d.totalFrames=Math.round(1E3*a/AmCharts.updateRate);d.rh=d.h;d.frame=0;d.height(1);setTimeout(function(){d.updateHeight.call(d)},AmCharts.updateRate)},updateHeight:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rh-1,b),a.height(b),setTimeout(function(){a.updateHeight.call(a)},AmCharts.updateRate))},
animateWidth:function(a,b){var d=this;d.easing=b;d.totalFrames=Math.round(1E3*a/AmCharts.updateRate);d.rw=d.w;d.frame=0;d.width(1);setTimeout(function(){d.updateWidth.call(d)},AmCharts.updateRate)},updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),setTimeout(function(){a.updateWidth.call(a)},AmCharts.updateRate))}});AmCharts.CategoryAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(a){this.cname="CategoryAxis";AmCharts.CategoryAxis.base.construct.call(this,a);this.minPeriod="DD";this.equalSpacing=this.parseDates=!1;this.position="bottom";this.startOnAxis=!1;this.firstDayOfWeek=1;this.gridPosition="middle";this.markPeriodChange=this.boldPeriodBeginning=!0;this.safeDistance=30;this.centerLabelOnFullPeriod=!0;this.periods=[{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",
count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"DD",count:2},{period:"DD",count:3},{period:"DD",count:4},{period:"DD",count:5},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},
{period:"YYYY",count:50},{period:"YYYY",count:100}];this.dateFormats=[{period:"fff",format:"JJ:NN:SS"},{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}];this.nextPeriod={};this.nextPeriod.fff="ss";this.nextPeriod.ss="mm";this.nextPeriod.mm="hh";this.nextPeriod.hh="DD";this.nextPeriod.DD="MM";this.nextPeriod.MM="YYYY";AmCharts.applyTheme(this,
a,this.cname)},draw:function(){AmCharts.CategoryAxis.base.draw.call(this);this.generateDFObject();var a=this.chart.chartData;this.data=a;if(AmCharts.ifArray(a)){var b,d=this.chart;"scrollbar"!=this.id?(AmCharts.setCN(d,this.set,"category-axis"),AmCharts.setCN(d,this.labelsSet,"category-axis"),AmCharts.setCN(d,this.axisLine.axisSet,"category-axis")):this.bcn=this.id+"-";var c=this.start,e=this.labelFrequency,f=0;b=this.end-c+1;var h=this.gridCountR,n=this.showFirstLabel,g=this.showLastLabel,k,l="",
m=AmCharts.extractPeriod(this.minPeriod);k=AmCharts.getPeriodDuration(m.period,m.count);var u,w,t,p,x,r;u=this.rotate;var A=this.firstDayOfWeek,q=this.boldPeriodBeginning,a=AmCharts.resetDateToMin(new Date(a[a.length-1].time+1.05*k),this.minPeriod,1,A).getTime(),v;this.endTime>a&&(this.endTime=a);r=this.minorGridEnabled;var y,a=this.gridAlpha,C;if(this.parseDates&&!this.equalSpacing){this.timeDifference=this.endTime-this.startTime;c=this.choosePeriod(0);e=c.period;u=c.count;w=AmCharts.getPeriodDuration(e,
u);w<k&&(e=m.period,u=m.count,w=k);t=e;"WW"==t&&(t="DD");this.stepWidth=this.getStepWidth(this.timeDifference);var h=Math.ceil(this.timeDifference/w)+5,D=l=AmCharts.resetDateToMin(new Date(this.startTime-w),e,u,A).getTime();t==e&&1==u&&this.centerLabelOnFullPeriod&&(x=w*this.stepWidth);this.cellWidth=k*this.stepWidth;b=Math.round(l/w);c=-1;b/2==Math.round(b/2)&&(c=-2,l-=w);var z=d.firstTime,B=0;r&&1<u&&(y=this.chooseMinorFrequency(u),C=AmCharts.getPeriodDuration(e,y));if(0<this.gridCountR)for(b=c;b<=
h;b++){m=z+w*(b+Math.floor((D-z)/w))-B;"DD"==e&&(m+=36E5);m=AmCharts.resetDateToMin(new Date(m),e,u,A).getTime();"MM"==e&&(r=(m-l)/w,1.5<=(m-l)/w&&(m=m-(r-1)*w+AmCharts.getPeriodDuration("DD",3),m=AmCharts.resetDateToMin(new Date(m),e,1).getTime(),B+=w));k=(m-this.startTime)*this.stepWidth;r=!1;this.nextPeriod[t]&&(r=this.checkPeriodChange(this.nextPeriod[t],1,m,l,t));v=!1;r&&this.markPeriodChange?(r=this.dateFormatsObject[this.nextPeriod[t]],this.twoLineMode&&(r=this.dateFormatsObject[t]+"\n"+r,
r=AmCharts.fixBrakes(r)),v=!0):r=this.dateFormatsObject[t];q||(v=!1);l=AmCharts.formatDate(new Date(m),r,d);if(b==c&&!n||b==h&&!g)l=" ";this.labelFunction&&(l=this.labelFunction(l,new Date(m),this,e,u,p).toString());this.boldLabels&&(v=!0);p=new this.axisItemRenderer(this,k,l,!1,x,0,!1,v);this.pushAxisItem(p);p=l=m;if(!isNaN(y))for(k=1;k<u;k+=y)this.gridAlpha=this.minorGridAlpha,r=m+C*k,r=AmCharts.resetDateToMin(new Date(r),e,y,A).getTime(),r=new this.axisItemRenderer(this,(r-this.startTime)*this.stepWidth),
this.pushAxisItem(r);this.gridAlpha=a}}else if(!this.parseDates){if(this.cellWidth=this.getStepWidth(b),b<h&&(h=b),f+=this.start,this.stepWidth=this.getStepWidth(b),0<h)for(q=Math.floor(b/h),y=this.chooseMinorFrequency(q),k=f,k/2==Math.round(k/2)&&k--,0>k&&(k=0),h=0,this.end-k+1>=this.autoRotateCount&&(this.labelRotation=this.autoRotateAngle),b=k;b<=this.end+2;b++){p=!1;0<=b&&b<this.data.length?(t=this.data[b],l=t.category,p=t.forceShow):l="";if(r&&!isNaN(y))if(b/y==Math.round(b/y)||p)b/q==Math.round(b/
q)||p||(this.gridAlpha=this.minorGridAlpha,l=void 0);else continue;else if(b/q!=Math.round(b/q)&&!p)continue;k=this.getCoordinate(b-f);p=0;"start"==this.gridPosition&&(k-=this.cellWidth/2,p=this.cellWidth/2);A=!0;D=p;"start"==this.tickPosition&&(D=0,A=!1,p=0);if(b==c&&!n||b==this.end&&!g)l=void 0;Math.round(h/e)!=h/e&&(l=void 0);h++;x=this.cellWidth;u&&(x=NaN);this.labelFunction&&t&&(l=this.labelFunction(l,t,this));l=AmCharts.fixBrakes(l);v=!1;this.boldLabels&&(v=!0);b>this.end&&"start"==this.tickPosition&&
(l=" ");p=new this.axisItemRenderer(this,k,l,A,x,p,void 0,v,D,!1,t.labelColor,t.className);p.serialDataItem=t;this.pushAxisItem(p);this.gridAlpha=a}}else if(this.parseDates&&this.equalSpacing){f=this.start;this.startTime=this.data[this.start].time;this.endTime=this.data[this.end].time;this.timeDifference=this.endTime-this.startTime;c=this.choosePeriod(0);e=c.period;u=c.count;w=AmCharts.getPeriodDuration(e,u);w<k&&(e=m.period,u=m.count,w=k);t=e;"WW"==t&&(t="DD");this.stepWidth=this.getStepWidth(b);
h=Math.ceil(this.timeDifference/w)+1;l=AmCharts.resetDateToMin(new Date(this.startTime-w),e,u,A).getTime();this.cellWidth=this.getStepWidth(b);b=Math.round(l/w);c=-1;b/2==Math.round(b/2)&&(c=-2,l-=w);k=this.start;k/2==Math.round(k/2)&&k--;0>k&&(k=0);x=this.end+2;x>=this.data.length&&(x=this.data.length);C=!1;C=!n;this.previousPos=-1E3;20<this.labelRotation&&(this.safeDistance=5);w=k;if(this.data[k].time!=AmCharts.resetDateToMin(new Date(this.data[k].time),e,u,A).getTime())for(A=0,v=l,b=k;b<x;b++)m=
this.data[b].time,this.checkPeriodChange(e,u,m,v)&&(A++,2<=A&&(w=b,b=x),v=m);r&&1<u&&(y=this.chooseMinorFrequency(u),AmCharts.getPeriodDuration(e,y));if(0<this.gridCountR)for(b=k;b<x;b++)if(m=this.data[b].time,this.checkPeriodChange(e,u,m,l)&&b>=w){k=this.getCoordinate(b-this.start);r=!1;this.nextPeriod[t]&&(r=this.checkPeriodChange(this.nextPeriod[t],1,m,l,t));v=!1;r&&this.markPeriodChange?(r=this.dateFormatsObject[this.nextPeriod[t]],v=!0):r=this.dateFormatsObject[t];l=AmCharts.formatDate(new Date(m),
r,d);if(b==c&&!n||b==h&&!g)l=" ";C?C=!1:(q||(v=!1),k-this.previousPos>this.safeDistance*Math.cos(this.labelRotation*Math.PI/180)&&(this.labelFunction&&(l=this.labelFunction(l,new Date(m),this,e,u,p)),this.boldLabels&&(v=!0),p=new this.axisItemRenderer(this,k,l,void 0,void 0,void 0,void 0,v),r=p.graphics(),this.pushAxisItem(p),p=r.getBBox().width,AmCharts.isModern||(p-=k),this.previousPos=k+p));p=l=m}else isNaN(y)||(this.checkPeriodChange(e,y,m,D)&&(this.gridAlpha=this.minorGridAlpha,k=this.getCoordinate(b-
this.start),r=new this.axisItemRenderer(this,k),this.pushAxisItem(r),D=m),this.gridAlpha=a)}for(b=0;b<this.data.length;b++)if(n=this.data[b])g=this.parseDates&&!this.equalSpacing?Math.round((n.time-this.startTime)*this.stepWidth+this.cellWidth/2):this.getCoordinate(b-f),n.x[this.id]=g;n=this.guides.length;for(b=0;b<n;b++)g=this.guides[b],q=q=q=a=c=NaN,y=g.above,g.toCategory&&(q=d.getCategoryIndexByValue(g.toCategory),isNaN(q)||(c=this.getCoordinate(q-f),g.expand&&(c+=this.cellWidth/2),p=new this.axisItemRenderer(this,
c,"",!0,NaN,NaN,g),this.pushAxisItem(p,y))),g.category&&(q=d.getCategoryIndexByValue(g.category),isNaN(q)||(a=this.getCoordinate(q-f),g.expand&&(a-=this.cellWidth/2),q=(c-a)/2,p=new this.axisItemRenderer(this,a,g.label,!0,NaN,q,g),this.pushAxisItem(p,y))),g.toDate&&(g.toDate instanceof Date||(g.toDate=AmCharts.stringToDate(g.toDate,d.dataDateFormat)),this.equalSpacing?(q=d.getClosestIndex(this.data,"time",g.toDate.getTime(),!1,0,this.data.length-1),isNaN(q)||(c=this.getCoordinate(q-f))):c=(g.toDate.getTime()-
this.startTime)*this.stepWidth,p=new this.axisItemRenderer(this,c,"",!0,NaN,NaN,g),this.pushAxisItem(p,y)),g.date&&(g.date instanceof Date||(g.date=AmCharts.stringToDate(g.date,d.dataDateFormat)),this.equalSpacing?(q=d.getClosestIndex(this.data,"time",g.date.getTime(),!1,0,this.data.length-1),isNaN(q)||(a=this.getCoordinate(q-f))):a=(g.date.getTime()-this.startTime)*this.stepWidth,q=(c-a)/2,p="H"==this.orientation?new this.axisItemRenderer(this,a,g.label,!1,2*q,NaN,g):new this.axisItemRenderer(this,
a,g.label,!1,NaN,q,g),this.pushAxisItem(p,y)),(0<c||0<a)&&(c<this.width||a<this.width)&&(c=new this.guideFillRenderer(this,a,c,g),a=c.graphics(),this.pushAxisItem(c,y),g.graphics=a,a.index=b,g.balloonText&&this.addEventListeners(a,g))}this.axisCreated=!0;d=this.x;f=this.y;this.set.translate(d,f);this.labelsSet.translate(d,f);this.positionTitle();(d=this.axisLine.set)&&d.toFront();d=this.getBBox().height;2<d-this.previousHeight&&this.autoWrap&&!this.parseDates&&(this.axisCreated=this.chart.marginsUpdated=
!1);this.previousHeight=d},chooseMinorFrequency:function(a){for(var b=10;0<b;b--)if(a/b==Math.round(a/b))return a/b},choosePeriod:function(a){var b=AmCharts.getPeriodDuration(this.periods[a].period,this.periods[a].count),d=Math.ceil(this.timeDifference/b),c=this.periods;return this.timeDifference<b&&0<a?c[a-1]:d<=this.gridCountR?c[a]:a+1<c.length?this.choosePeriod(a+1):c[a]},getStepWidth:function(a){var b;this.startOnAxis?(b=this.axisWidth/(a-1),1==a&&(b=this.axisWidth)):b=this.axisWidth/a;return b},
getCoordinate:function(a){a*=this.stepWidth;this.startOnAxis||(a+=this.stepWidth/2);return Math.round(a)},timeZoom:function(a,b){this.startTime=a;this.endTime=b},minDuration:function(){var a=AmCharts.extractPeriod(this.minPeriod);return AmCharts.getPeriodDuration(a.period,a.count)},checkPeriodChange:function(a,b,d,c,e){d=new Date(d);var f=new Date(c),h=this.firstDayOfWeek;c=b;"DD"==a&&(b=1);d=AmCharts.resetDateToMin(d,a,b,h).getTime();b=AmCharts.resetDateToMin(f,a,b,h).getTime();return"DD"==a&&"hh"!=
e&&d-b<=AmCharts.getPeriodDuration(a,c)?!1:d!=b?!0:!1},generateDFObject:function(){this.dateFormatsObject={};var a;for(a=0;a<this.dateFormats.length;a++){var b=this.dateFormats[a];this.dateFormatsObject[b.period]=b.format}},xToIndex:function(a){var b=this.data,d=this.chart,c=d.rotate,e=this.stepWidth;this.parseDates&&!this.equalSpacing?(a=this.startTime+Math.round(a/e)-this.minDuration()/2,d=d.getClosestIndex(b,"time",a,!1,this.start,this.end+1)):(this.startOnAxis||(a-=e/2),d=this.start+Math.round(a/
e));var d=AmCharts.fitToBounds(d,0,b.length-1),f;b[d]&&(f=b[d].x[this.id]);c?f>this.height+1&&d--:f>this.width+1&&d--;0>f&&d++;return d=AmCharts.fitToBounds(d,0,b.length-1)},dateToCoordinate:function(a){return this.parseDates&&!this.equalSpacing?(a.getTime()-this.startTime)*this.stepWidth:this.parseDates&&this.equalSpacing?(a=this.chart.getClosestIndex(this.data,"time",a.getTime(),!1,0,this.data.length-1),this.getCoordinate(a-this.start)):NaN},categoryToCoordinate:function(a){return this.chart?(a=
this.chart.getCategoryIndexByValue(a),this.getCoordinate(a-this.start)):NaN},coordinateToDate:function(a){return this.equalSpacing?(a=this.xToIndex(a),new Date(this.data[a].time)):new Date(this.startTime+a/this.stepWidth)}});
$(function() {
  $.ajax({
    url:  "http://62.84.231.88"+"/current",
    success:function(data) {
      $("#current_temp").text(data['temperature'].toFixed(1)+"°C");
      $("#current_hum").text(data['humidity'].toFixed(1)+"%");
    }
  });
});

getData().done(requestSuccess).fail(requestFailed);

function getData() {
    return $.ajax({
        url : "http://62.84.231.88"+"/statuses",
        type: 'GET'
    });
}

function requestSuccess(data) {
    var chartData = [];
    for (var i = 0; i < data.length; i++) {
      chartData.push({
          date: new Date(data[i]['created_at']),
          temperature: data[i]['temperature'].toFixed(1),
          humidity: data[i]['humidity'].toFixed(1)
      });
    };
    makeChart(chartData);
}

function requestFailed (argument) {
  $("#chartdiv").html("<h1 class='center'>Unable to get data! Please double check your settings.</h1>")
}

function makeChart (data) {
  var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "none",
    "dataProvider": data,
    "valueAxes": [{
        "position": "left",
        "title": ""
    }],
    "graphs": [{
        "type": "smoothedLine",
        "lineColor": "#4acaa8",
        "fillAlphas": 0.4,
        "balloonText": "<b><span style='font-size:12px;'>[[value]]&deg;C </span></b>",
        "valueField": "temperature"
    },
    {
        "type": "smoothedLine",
        "lineColor": "#999",
        "fillAlphas": 0.1,
        "balloonText": "<b><span style='font-size:10px;'>[[value]]% </span></b>",
        "valueField": "humidity"
    }
    ],
    "chartCursor": {
        "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
        "cursorPosition": "mouse",
        "cursorColor": "#4acaa8"
    },
    "categoryField": "date",
    "categoryAxis": {
        "minPeriod": "mm",
        "parseDates": true
    }
  });
}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//











;

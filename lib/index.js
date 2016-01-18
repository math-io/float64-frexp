'use strict';

// MODULES //

var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var normalize = require( 'math-float64-normalize' );
var floatExp = require( 'math-float64-exponent' );
var toWords = require( 'math-float64-to-words' );
var fromWords = require( 'math-float64-from-words' );


// CONSTANTS //

// Exponent all 0s: 10000000000011111111111111111111
var CLEAR_EXP_MASK = 0x800fffff; // 2148532223

// Exponent equal to 1022 (BIAS-1): 00111111111000000000000000000000
var SET_EXP_MASK = 0x3fe00000; // 1071644672


// FREXP //

/**
* FUNCTION: frexp( x )
*	Splits a double-precision floating-point number into a normalized fraction and an integer power of two.
*
* @param {Number} x - input value
* @returns {Number[]} two element array containing a normalized fraction and an exponent
*/
function frexp( x ) {
	var high;
	var exp;
	var w;
	if (
		x === 0 ||    // handles -0
		x !== x ||
		x === pinf ||
		x === ninf
	) {
		return [ x, 0 ];
	}
	// If `x` is subnormal, normalize it...
	x = normalize( x );

	// Extract the exponent from `x` and add the normalization exponent:
	exp = floatExp( x[0] ) + x[ 1 ] + 1;

	// Break `x` into two unsigned 32-bit integers (higher and lower order words):
	w = toWords( x[ 0 ] );
	high = w[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits within the higher order word to BIAS-1 (1023-1=1022):
	high |= SET_EXP_MASK;

	// Create a new floating-point number:
	x = fromWords( high, w[ 1 ] );

	return [ x, exp ];
} // end FUNCTION frexp()


// EXPORTS //

module.exports = frexp;

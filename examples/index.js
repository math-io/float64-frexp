'use strict';

var round = require( 'math-round' );
var pow = require( 'math-power' );
var frexp = require( './../lib' );

var sign;
var frac;
var exp;
var x;
var f;
var i;

// Generate random numbers and break each into a normalized fraction and an integer power of two...
for ( i = 0; i < 100; i++ ) {
	if ( Math.random() < 0.5 ) {
		sign = -1;
	} else {
		sign = 1;
	}
	frac = Math.random() * 10;
	exp = round( Math.random()*616 ) - 308;
	x = sign * frac * pow( 10, exp );
	f = frexp( x );
	console.log( '%d = %d * 2^%d = %d', x, f[ 0 ], f[ 1 ], f[0]*pow(2,f[1]) );
}

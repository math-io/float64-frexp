'use strict';

// MODULES //

var tape = require( 'tape' );
var ninf = require( 'const-ninf-float64' );
var pinf = require( 'const-pinf-float64' );
var round = require( 'math-round' );
var pow = require( 'math-power' );
var abs = require( 'math-abs' );
var getKeys = require( 'object-keys' );
var frexp = require( './../lib' );


// FIXTURES //

var small = require( './fixtures/x_1e-200_1e-308.json' );
var medium = require( './fixtures/x_-1e3_1e3.json' );
var large = require( './fixtures/x_1e200_1e308.json' );
var subnormal = require( './fixtures/x_1e-310_5e-324.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof frexp === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (small `x`)', function test( t ) {
	var keys;
	var key;
	var x;
	var f;
	var i;

	keys = getKeys( small );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		x = parseFloat( key );
		f = frexp( x );
		t.deepEqual( f, small[ key ], 'returns expected results for ' + key );
	}
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (medium `x`)', function test( t ) {
	var keys;
	var key;
	var x;
	var f;
	var i;

	keys = getKeys( medium );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		x = parseFloat( key );
		f = frexp( x );
		t.deepEqual( f, medium[ key ], 'returns expected results for ' + key );
	}
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (large `x`)', function test( t ) {
	var keys;
	var key;
	var x;
	var f;
	var i;

	keys = getKeys( large );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		x = parseFloat( key );
		f = frexp( x );
		t.deepEqual( f, large[ key ], 'returns expected results for ' + key );
	}
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (subnormal `x`)', function test( t ) {
	var keys;
	var key;
	var x;
	var f;
	var i;

	keys = getKeys( subnormal );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		x = parseFloat( key );
		f = frexp( x );
		t.deepEqual( f, subnormal[ key ], 'returns expected results for ' + key );
	}
	t.end();
});

tape( 'the returned normalized fraction and exponent satisfy the relation `x = frac * 2**exp`', function test( t ) {
	var total;
	var sign;
	var frac;
	var exp;
	var x;
	var f;
	var i;

	if ( typeof window === 'undefined' ) {
		total = 1e3;
	} else {
		total = 200;
	}
	for ( i = 0; i < total; i++ ) {
		if ( Math.random() < 0.5 ) {
			sign = -1;
		} else {
			sign = 1;
		}
		frac = Math.random() * 10;
		exp = round( Math.random()*616 ) - 308;
		x = sign * frac * pow( 10, exp );
		f = frexp( x );

		if ( f[ 1 ] > 1023 ) {
			f = f[ 0 ] * pow( 2, 1023 ) * pow( 2, f[1]-1023 );
		} else {
			f = f[ 0 ] * pow( 2, f[ 1 ] );
		}
		t.equal( f, x, 'frac * 2^exp equals ' + x );
	}
	t.end();
});

tape( 'the absolute value of the normalized fraction is on the interval [1/2,1)', function test( t ) {
	var total;
	var sign;
	var frac;
	var exp;
	var x;
	var f;
	var i;

	if ( typeof window === 'undefined' ) {
		total = 1e3;
	} else {
		total = 200;
	}
	for ( i = 0; i < total; i++ ) {
		if ( Math.random() < 0.5 ) {
			sign = -1;
		} else {
			sign = 1;
		}
		frac = Math.random() * 10;
		exp = round( Math.random()*614 ) - 307;
		x = sign * frac * pow( 10, exp );
		f = frexp( x );

		// Compute the absolute value of the normalized fraction:
		f = abs( f[ 0 ] );

		t.ok( f >= 0.5 && f < 1, 'absolute value of the normalized fraction is on the interval [1/2,1). x: ' + x + '.' );
	}
	t.end();
});

tape( 'if provided `+0`, the function returns [0,0]', function test( t ) {
	var f = frexp( 0 );
	t.deepEqual( f, [0,0], 'returns [0,0]' );
	t.end();
});

tape( 'if provided `-0`, the function returns [-0,0]', function test( t ) {
	var f = frexp( -0 );
	t.equal( 1/f[0], ninf, 'first element is -0' );
	t.deepEqual( f, [-0,0], 'returns [-0,0]' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns [+infinity,0]', function test( t ) {
	var f = frexp( pinf );
	t.deepEqual( f, [pinf,0], 'returns [+inf,0]' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns [-infinity,0]', function test( t ) {
	var f = frexp( ninf );
	t.deepEqual( f, [ninf,0], 'returns [-inf,0]' );
	t.end();
});

tape( 'if provided `NaN`, the function returns [NaN,0]', function test( t ) {
	var f = frexp( NaN );
	t.ok( f[ 0 ] !== f[ 0 ], 'first element is NaN' );
	t.equal( f[ 1 ], 0, 'second element is 0' );
	t.end();
});

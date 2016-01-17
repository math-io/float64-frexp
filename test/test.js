'use strict';

// MODULES //

var tape = require( 'tape' );
var ninf = require( 'const-ninf-float64' );
var pinf = require( 'const-pinf-float64' );
var frexp = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof frexp === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function splits a float-point number into a normalized fraction and an integer power of two', function test( t ) {
	// TODO: compare against Julia
	t.ok( false );
	t.end();
});

tape( 'the returned normalized fraction and exponent satisfy the relation `x = frac * 2**exp`', function test( t ) {
	// TODO: basically run example code here and check for equality
	t.ok( false );
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
	var f = frexp( pinf );
	t.deepEqual( f, [ninf,0], 'returns [-inf,0]' );
	t.end();
});

tape( 'if provided `NaN`, the function returns [NaN,0]', function test( t ) {
	var f = frexp( NaN );
	t.ok( f[ 0 ] !== f[ 0 ], 'first element is NaN' );
	t.equal( f[ 1 ], 0, 'second element is 0' );
	t.end();
});

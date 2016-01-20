frexp
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Splits a [double-precision floating-point number][ieee754] into a normalized fraction and an integer power of two.


## Installation

``` bash
$ npm install math-float64-frexp
```


## Usage

``` javascript
var frexp = require( 'math-float64-frexp' );
```

#### frexp( x )

Splits a [double-precision floating-point number][ieee754] into a normalized fraction and an integer power of two.

``` javascript
var out = frexp( 4 );
// returns [ 0.5, 3 ]
```

The first element of the returned `array` is the normalized fraction and the second is the exponent. The normalized fraction and exponent satisfy the relation `x = frac * 2**exp`.

``` javascript
var pow = require( 'math-power' );

var x = 4;
var out = frexp( x );
// returns [ 0.5, 3 ]

var frac = out[ 0 ];
var exp = out[ 1 ];

var bool = ( x === frac * pow(2,exp) );
// returns true
```

If provided positive or negative `zero`, `NaN`, or positive or negative `infinity`, the `function` returns a two-element `array` containing the input value and an exponent equal to `0`.

``` javascript
var out = frexp( 0 );
// returns [ 0, 0 ]

out = frexp( -0 );
// returns [ -0, 0 ]

out = frexp( NaN );
// returns [ NaN, 0 ]

out = frexp( Number.POSITIVE_INFINITY );
// returns [ +infinity, 0 ]

out = frexp( Number.NEGATIVE_INFINITY );
// returns [ -infinity, 0 ]
```

For all other `numeric` input values, the [absolute value][math-abs] of the normalized fraction resides on the interval `[1/2,1)`.


## Notes

*	Care should be taken when reconstituting a [double-precision floating-point number][ieee754] from a normalized fraction and an exponent. For example,

	``` javascript
	var pow = require( 'math-power' );

	// x ~ 2**1023
	var x = 8.988939926493918e+307;

	var out = frexp( x );
	// returns [ 0.5000263811533315, 1024 ]

	// Naive reconstitution:
	var y = out[ 0 ] * pow( 2, out[ 1 ] );
	// returns +infinity

	// Account for 2**1024 evaluating as infinity by recognizing 2**1024 = 2**1 * 2**1023:
	y = out[ 0 ] * pow( 2, out[1]-1023 ) * pow( 2, 1023 );
	// returns 8.988939926493918e+307
	```


## Examples

``` javascript
var round = require( 'math-round' );
var pow = require( 'math-power' );
var frexp = require( 'math-float64-frexp' );

var sign;
var frac;
var exp;
var x;
var f;
var v;
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
	if ( f[ 1 ] > 1023 ) {
		v = f[ 0 ] * pow( 2, f[1]-1023 ) * pow( 2, 1023 );
	} else {
		v = f[ 0 ] * pow( 2, f[ 1 ] );
	}
	console.log( '%d = %d * 2^%d = %d', x, f[ 0 ], f[ 1 ], v );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-float64-frexp.svg
[npm-url]: https://npmjs.org/package/math-float64-frexp

[build-image]: http://img.shields.io/travis/math-io/float64-frexp/master.svg
[build-url]: https://travis-ci.org/math-io/float64-frexp

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/float64-frexp/master.svg
[coverage-url]: https://codecov.io/github/math-io/float64-frexp?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/float64-frexp.svg
[dependencies-url]: https://david-dm.org/math-io/float64-frexp

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/float64-frexp.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/float64-frexp

[github-issues-image]: http://img.shields.io/github/issues/math-io/float64-frexp.svg
[github-issues-url]: https://github.com/math-io/float64-frexp/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[ieee754]: https://en.wikipedia.org/wiki/IEEE_754-1985
[math-abs]: https://github.com/math-io/abs

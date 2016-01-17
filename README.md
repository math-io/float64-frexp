frexp
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Splits a double-precision floating-point number into a normalized fraction and an integer power of two.


## Installation

``` bash
$ npm install math-frexp
```


## Usage

``` javascript
var frexp = require( 'math-frexp' );
```

#### frexp( x )

Splits a double-precision floating-point number into a normalized fraction and an integer power of two.

``` javascript
var out = frexp( 4 );
// returns [ , ] // TODO
```

The first element of the returned `array` is the normalized fraction and the second is the exponent. The normalized fraction and exponent satisfy the relation `x = frac * 2**exp`.

``` javascript
var pow = require( 'math-power' );

var x = 4;
var out = frexp( x );
// returns [ , ] // TODO

var frac = out[ 0 ];
var exp = out[ 1 ];

var bool = ( x === frac * pow(2,exp) );
// returns true
```

If provided positive or negative `zero`, `NaN`, or positive or negative `infinity`, the `function` returns a two-element `array` containing the input value and an exponent equal to `0`.

``` javascript
var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );

var out = frexp( 0 );
// returns [ 0, 0 ]

out = frexp( -0 );
// returns [ -0, 0 ]

out = frexp( NaN );
// returns [ NaN, 0 ]

out = frexp( pinf );
// returns [ +infinity, 0 ]

out = frexp( ninf );
// returns [ -infinity, 0 ]
```

For all other `numeric` input values, the absolute value of the normalized fraction resides on the interval `[1/2,1)`.


## Examples

``` javascript
// TODO
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


[npm-image]: http://img.shields.io/npm/v/math-frexp.svg
[npm-url]: https://npmjs.org/package/math-frexp

[build-image]: http://img.shields.io/travis/math-io/frexp/master.svg
[build-url]: https://travis-ci.org/math-io/frexp

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/frexp/master.svg
[coverage-url]: https://codecov.io/github/math-io/frexp?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/frexp.svg
[dependencies-url]: https://david-dm.org/math-io/frexp

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/frexp.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/frexp

[github-issues-image]: http://img.shields.io/github/issues/math-io/frexp.svg
[github-issues-url]: https://github.com/math-io/frexp/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/